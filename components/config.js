// Pathway Config File

const DEBUG_INFO = true;
// GOOD

const mysql = require('mysql');

// This should be edited by the end user.
// This is for my own personal dev environment. Do not test the gods.
const pathwayConfig = {
    host: 'localhost', 
    user: 'dinnerbird',    
    password: 'buttsauce', 
    databaseName: 'bogus_data'
};

// Create and export the MySQL connection. This is an object
const connection = mysql.createConnection({
    host: pathwayConfig.host,
    user: pathwayConfig.user,
    password: pathwayConfig.password,
    database: pathwayConfig.databaseName
});

module.exports = {
    pathwayConfig,
    connection,
    DEBUG_INFO
};