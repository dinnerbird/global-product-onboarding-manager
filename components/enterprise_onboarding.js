const enterprise_DB = require('./database_mgr.js');
//const enterprise_logon_mgr = require('./logon_mgr.js');
//const enterprise_training_mgr = require('./training_mgr.js');
const path = require('path');
const express = require('express');
const expressApp = express();

// Serve static files from the 'hr' directory
expressApp.use(express.static(path.join(__dirname, '..')));

expressApp.get('/', (res) => {
    res.send('Nothing to see here. Move along.');
});

expressApp.get('/client', (res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'client_interface.html'));
});

expressApp.get('/teapot', (res) => {
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