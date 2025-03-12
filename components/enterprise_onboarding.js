const enterprise_DB = require('./database_mgr.js');
//const enterprise_logon_mgr = require('./logon_mgr.js');
//const enterprise_training_mgr = require('./training_mgr.js');
const path = require('path');
const express = require('express');
const expressApp = express();

// Serve static files from the 'hr' directory
expressApp.use(express.static(path.join(__dirname, '..')));

expressApp.get('/', (req, res) => {
    res.send('hello');
});

module.exports = expressApp;