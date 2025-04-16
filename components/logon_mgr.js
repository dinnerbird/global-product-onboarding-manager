console.log("[INFO] Logon manager loaded");

const expressApp = require('./express_init.js');

expressApp.post('/login', (req, res) => {
    const { loginName, password } = req.body;

    if (!loginName || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    // That's the kind of password an idiot would put on his luggage
    if (loginName === "admin" && password === "password123") {
        return res.status(200).json({ message: "Login successful", token: "fake-jwt-token" });
        // I need to look into generating *real* JWT tokens :)
    } else {
        return res.status(401).json({ error: "Invalid username or password" });
    }
});