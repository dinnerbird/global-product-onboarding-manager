const express = require('express');
const path = require('path');
const expressApp = express();

const port = 3030;

expressApp.listen(port, () => {
    console.log(`Express is ready. Listening on ${port}`);
});

// Serve static files from the 'hr' directory
expressApp.use(express.static(path.join(__dirname, '..')));


// These routes are for general pages.
// Fun fact: if you forget the "req" parameter, the server will crash.
expressApp.get('/client', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'client_interface.html'));
});

expressApp.get('/', (req, res) => {
    res.send('Nothing to see here. Move along.');
});

expressApp.get('/teapot', (req, res) => {
    res.status(418).send('I am a teapot');
    console.log('short and stout, here is my handle, here is my spout');
});

expressApp.get('/hr_interface', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'hr', 'hr_interface.html'));
});

expressApp.get('/new_employee', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'hr', 'new_employee.html'));
});

module.exports = expressApp;