// Pathway Config File

const DEBUG_INFO = true;
// GOOD

const DISPLAY_SPLASH = true;

const mysql = require('mysql');

// This should be edited by the end user.
// This is for my own personal dev environment. But you'll inevitably use it in production and blame me for it.
const pathwayConfig = {
    host: 'localhost', 
    user: 'dinnerbird',    
    password: 'buttsauce', 
    databaseName: 'bogus_data'
};

const GREEN = "\u001b[32m"; // <-- Are these really necessary?
const WHITE = "\u001b[37m";

const BOLD = "\u001b[1m"
// Create and export the MySQL connection. This is an object

// 
// \_/ <- THIS is a BUCKET

const connection = mysql.createConnection({
    host: pathwayConfig.host,
    user: pathwayConfig.user,
    password: pathwayConfig.password,
    database: pathwayConfig.databaseName
});


const splashScreen = `${GREEN} ${BOLD}
█▀▀▀▄  ▄▀▀█ ▀▀█▀▀ █   █ █   █  ▄▀▀█ █   █ TM
█  ▄▀ █   █   █   █ ▄▄█ █   █ █   █ █   █  
█▄▀   █▄▀▀█   █   █▀  █ █ █ █ █▄▀▀█  ▀▄▀   
█     █   █   █   █   █ █▄▀▄▀ █   █   █

Employee Management and Onboarding System`


module.exports = {
    pathwayConfig,
    connection,
    DEBUG_INFO,
    splashScreen,
    DISPLAY_SPLASH, GREEN, WHITE, BOLD
};

