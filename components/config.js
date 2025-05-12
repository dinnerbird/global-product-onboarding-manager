// Pathway Config File

const DEBUG_INFO = true;
// GOOD

const DISPLAY_SPLASH = true;

const mysql = require('mysql2');

// This should be edited by the end user.
// This is for my own personal dev environment. But you'll inevitably use it in production and blame me for it.
const pathwayConfig = {
// This object intentionally left empty.
};

const GREEN = "\u001b[32m"; // <-- Are these really necessary?
const WHITE = "\u001b[37m";

const BOLD = "\u001b[1m"
// Create and export the MySQL connection. This is an object

// 
// \_/ <- THIS is a BUCKET

if (Object.keys(pathwayConfig).length === 0) {
    console.error("Please provide your login info in the Pathway config.")
}

const connection = mysql.createConnection({
    host: pathwayConfig.host,
    user: pathwayConfig.user,
    password: pathwayConfig.password,
    database: pathwayConfig.databaseName,
    port: pathwayConfig.portNumber
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

