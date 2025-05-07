

/* 

This program is dedicated to the naysayers, the doubters, and the downers that thought I'd never graduate from college.

*/

const database_mgr = require('./database_mgr.js');
const logon_mgr = require('./logon_mgr.js');
const training_mgr = require('./training_mgr.js');

const path = require('path'); // is that 211 bytes?
var mysql = require('mysql2'); // adam was here :)
const port = 3030;
//           ^^^^ Do NOT touch this unless you want to have a really long afternoon
const expressApp = require('./express_init.js');

const bcrypt = require('bcrypt');
const pathwayConfig = require('./config.js');


// ** STOP DOING ASYNC **

// await
//
//
//
// They have played us for absolute FOOLS
async function initializeModules() {
    try {
        if (database_mgr.initialize) {
            await database_mgr.initialize(); // Wait for database_mgr to initialize
        }
        if (logon_mgr.initialize) {
            await logon_mgr.initialize(); // Wait for logon_mgr to initialize
        }
        if (training_mgr.initialize) {
            await training_mgr.initialize(); // Wait for training_mgr to initialize
        }
        console.log('\u001b[0m') // reset formatting
        if (pathwayConfig.DEBUG_INFO) {
            console.log(`\u001b[1m\u001b[35m\u001b[35mDebug info is enabled...it's time to JANK IT UP! :^D`);
        }
        if (pathwayConfig.DISPLAY_SPLASH) {
            console.log(pathwayConfig.splashScreen);
            console.log('\u001b[0m');

        } else {
            console.log(`Pathway Employee Management and Onboarding System`);
        }
    } catch (error) {
        console.error('Error initializing modules:', error);
    }
}



initializeModules();
// Off to the races.