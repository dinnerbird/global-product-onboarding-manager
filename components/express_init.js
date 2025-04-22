const express = require('express');
const path = require('path');
const expressApp = express();

const port = 3030;
// Does the do...
expressApp.listen(port, () => {
    console.log(`Express is ready. Listening on ${port}`);
});

// Serve static files from the 'hr' directory
expressApp.use(express.static(path.join(__dirname, '..')));


// These routes are for general pages.
// FUN FACT! If you forget the "req" parameter, the server will crash.
expressApp.get('/client', (req, res) => {
    const referer = req.get('Referer');
    if (!referer || !referer.startsWith('http://localhost:3030')) {
        return res.status(403).send(`You shall not pass!`);
    }
    res.sendFile(path.join(__dirname, '..', 'client', 'client_interface.html'));
});

// *puts on sunglasses*
expressApp.get('/', (req, res) => {
    res.send('Looks like your request...just got slashed.');
    // [CSI theme plays]
});

// Teapot handler
expressApp.get('/teapot', (req, res) => {
    res.status(418).sendFile(path.join(__dirname, '..', 'res', 'teapot.html'), (err) => {
        if (err) {
            res.status(418).send(`I'm a teapot`);
        }
    });
});

// The main shebang
expressApp.get('/hr_interface', (req, res) => {
    const referer = req.get('Referer');
    if (!referer || !referer.startsWith('http://localhost:3030')) {
        return res.status(403).send(`You can't just go typing in addresses like that...`);
    }
    res.sendFile(path.join(__dirname, '..', 'hr', 'hr_interface.html'));
});

// Employee Manager
expressApp.get('/employee_manager', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'hr', 'employee_manager.html'));
    const referer = req.get('Referer');
    if (!referer || !referer.startsWith('http://localhost:3030')) {
        return res.status(403).send(`Not quite...`);
    }
});

// Add Employee popup box
expressApp.get('/add_employee', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'hr', 'add_employee_popup.html'));
    const referer = req.get('Referer');
    if (!referer || !referer.startsWith('http://localhost:3030')) {
        return res.status(403).send(`Just what do you think you're doing?`);
    }
})

expressApp.use(express.json());

module.exports = expressApp; // exports EURGHHHHH