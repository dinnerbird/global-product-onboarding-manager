console.log("[INFO] Logon manager loaded");

const expressApp = require('./express_init.js');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const path = require('path');

const pathwayConfig = require('./config.js');

const session = require('express-session');

expressApp.use(session({
    secret: 'your_secret_key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));

const { isAuthenticated, authorizeRole } = require('./auth.js');

// L@@K ***PLEASE READ*** L@@K
// NOTE: All admin passwords are "password123" for ease of demonstration
// alex_admin adam_admin

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
            `SELECT * FROM LOGIN_INFO WHERE USER = ?`,
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
            console.log(userRole);
            // Store user role in session
            req.session.user = { loginName, role: userRole };

            if (userRole === 'HR') {
                return res.sendFile(path.join(__dirname, '../hr/hr_interface.html'));
            } else if (userRole === 'NEW') {
                return res.sendFile(path.join(__dirname, '../client/client_interface.html'));
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

