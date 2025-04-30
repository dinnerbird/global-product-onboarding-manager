console.log("[INFO] Logon manager loaded");

const bcrypt = require('bcrypt');
const path = require('path');

const expressApp = require('./express_init.js');

const { connection } = require('./config.js');
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

    // Query the database for the user
    connection.query(`SELECT * FROM EMPLOYEE_DATA WHERE USERNAME = ?`, [loginName], async (err, rows) => {
        if (err) {
            console.error("Database query failed.", err);
            return res.status(500).json({ error: "Internal server error." })
        }
        if (rows.length === 0) {
            return res.status(401).json({ error: "Unauthorized. Invalid username or password." });
        }

        const userData = rows[0];
        console.log(userData);
        // Ensure PASS is a string
        const storedHash = userData.PASS;
        const userRole = userData.DESIGNATION;

        // Compare the provided password with the stored hash
        const isMatch = await bcrypt.compare(password, storedHash);

        if (isMatch) {
            console.log(`USER LOGGED IN AS: ${userRole}`); // Logs the raw role
            req.session.user = { loginName, role: userRole };

            if (userRole === 'HR') {
                return res.redirect('/hr/hr_interface.html');
            } else if (userRole === 'NEW' || userRole === 'CURRENT') {
                return res.redirect('/client/client_interface.html');
            }
        }
    })
})

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

    console.log('GET LOGIN NAME REQUEST: ', loginName);
    return { loginName }; // Return as an object
}

module.exports = {
    getLoginName
}