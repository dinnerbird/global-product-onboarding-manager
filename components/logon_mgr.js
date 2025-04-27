console.log("[INFO] Logon manager loaded");

const bcrypt = require('bcrypt');
const path = require('path');
const mysql = require('mysql2/promise');
const port = 3030;
const expressApp = require('./express_init.js');
const pathwayConfig = require('./config.js');
const session = require('express-session');

expressApp.use(session({
    secret: 'bologna', // Replace with a strong secret key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));

const { isAuthenticated, authorizeRole } = require('./auth.js');

expressApp.post('/login', async (req, res) => {
    const { loginName, password } = req.body;

    if (!loginName || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        const connection = await mysql.createConnection({
            host: pathwayConfig.host,
            user: pathwayConfig.user,
            password: pathwayConfig.password,
            database: pathwayConfig.databaseName
        });

        // Query the database for the user
        const [rows] = await connection.execute(
            `SELECT * FROM EMPLOYEE_DATA WHERE USERNAME = ?`,
            [loginName]
        );

        if (rows.length === 0) {
            return res.status(401).json({ error: "Unauthorized. Probably invalid login or something" })
        }

        // Ensure PASS is a string
        const storedHash = rows[0].PASS;

        // Compare the provided password with the stored hash
        const isMatch = await bcrypt.compare(password, storedHash);

        if (isMatch) {
            const userRole = rows[0].DESIGNATION;
            console.log(`USER LOGGED IN AS: ${userRole}`); // Logs the raw role
            req.session.user = { loginName, role: userRole };

            if (userRole === 'HR') {
                res.redirect('/hr/hr_interface.html');

            // Checks if NEW or CURRENT
            } else if (userRole === 'NEW' || userRole === 'CURRENT') {
                res.redirect('/client/client_interface.html');

            } else {
                return res.status(401).json({ error: "Invalid username or password" });
            }
        }
    } catch (error) {
        console.error("[ERROR]", error);
        return res.status(500).json({ error: "Internal server error." });
    }
});

expressApp.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: "Failed to log out." });
        }
        res.status(200).json({ message: "Logged out successfully." });
    });
});

// Protect HR interface
expressApp.get('/hr/hr_interface.html', isAuthenticated, authorizeRole('HR'), (req, res) => {
    res.sendFile(path.join(__dirname, '../hr/hr_interface.html'));
});

// Protect Client interface
expressApp.get('/client/client_interface.html', isAuthenticated, authorizeRole('NEW'), (req, res) => {
    res.sendFile(path.join(__dirname, '../client/client_interface.html'));
});

expressApp.get('/get-login-name', (req, res) => {
    const loginName = req.session?.user?.loginName; // Assuming session stores user info
    if (loginName) {
        res.json({ loginName });
    } else {
        res.status(401).json({ error: 'User not logged in' });
    }
});

function getLoginName(req) {
    const loginName = req.session?.user?.loginName; // Assuming session stores user info

    if (!loginName) {
        return null;
    }
    // Use regex to split the loginName into first and last name
    const match = loginName.match(/([A-Z][^A-Z]*)([A-Z][^A-Z]*)/);

    if (!match) {
        return null; // Return null if the regex doesn't match
    }

    const loginFirstName = match[1];
    const loginLastName = match[2];

    console.log('GET LOGIN NAME REQUEST: ', loginFirstName, loginLastName);
    return { loginFirstName, loginLastName }; // Return as an object
}

module.exports = {
    getLoginName
}