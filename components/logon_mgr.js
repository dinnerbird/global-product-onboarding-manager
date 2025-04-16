console.log("[INFO] Logon manager loaded");

const expressApp = require('./express_init.js');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost', // Replace with your database host
    user: 'dinnerbird',      // Replace with your database user
    password: 'buttsauce', // Replace with your database password
    database: 'bogus_data'  // Replace with your database name
};



expressApp.post('/login', async (req, res) => {
    const { loginName, password } = req.body;

    if (!loginName || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        const connection = await mysql.createConnection(dbConfig);

        // Query the database for the user
        const [rows] = await connection.execute(
            `SELECT PASS FROM LOGIN_INFO WHERE USER = ?`,
            [loginName]
        );

        // Ensure PASS is a string
        const storedHash = rows[0].PASS;

        // Compare the provided password with the stored hash
        const isMatch = await bcrypt.compare(password, storedHash);

        if (isMatch) {
            return res.status(200).json({ message: "Login successful", token: "fake-jwt-token" });
        } else {
            return res.status(401).json({ error: "Invalid username or password" });
        }
    } catch (error) {
        console.error("[ERROR]", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});