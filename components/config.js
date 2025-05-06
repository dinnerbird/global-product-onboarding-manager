// Pathway Config File

const DEBUG_INFO = true;
// GOOD

const mysql = require('mysql');

// This should be edited by the end user.
// This is for my own personal dev environment. But you'll inevitably use it in production and blame me for it.
const pathwayConfig = {
    host: 'localhost', 
    user: 'dinnerbird',    
    password: 'buttsauce', 
    databaseName: 'bogus_data'
};

// Create and export the MySQL connection. This is an object

// 
// \_/ <- THIS is a BUCKET

const connection = mysql.createConnection({
    host: pathwayConfig.host,
    user: pathwayConfig.user,
    password: pathwayConfig.password,
    database: pathwayConfig.databaseName
});
// ___/=====/
// \_/
// This ain't a pipe, chief.
module.exports = {
    pathwayConfig,
    connection,
    DEBUG_INFO
};