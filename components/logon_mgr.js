console.log("[INFO] Logon manager loaded");

const expressApp = require('./express_init.js');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const path = require('path');

const pathwayConfig = require('./config.js');

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
            `SELECT PASS FROM LOGIN_INFO WHERE USER = ?`,
            [loginName]
        );

        if (rows.length === 0 ) { 
            return res.status(401).json({ error: "Unauthorized. Probably invalid login or something"})
        }

        // Ensure PASS is a string
        const storedHash = rows[0].PASS;

        // Compare the provided password with the stored hash
        const isMatch = await bcrypt.compare(password, storedHash);

        if (isMatch) {
            return res.sendFile(path.join(__dirname, '../client/client_interface.html'));        } 
        else {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        // TODO:
        // Check if user is a client or HR. Right now everyone is sent to CLIENT interface


    } catch (error) {
        console.error("[ERROR]", error);
        return res.status(500).json({ error: "Infernal server error." });
    }
});