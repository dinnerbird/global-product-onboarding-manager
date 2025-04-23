

/* 

Acknowledgements:

This program is dedicated to the naysayers, the doubters, and the downers that thought I'd never graduate from college.

Here's to my bird, Roger, for being my best bud during the development. 

My girlfriend, Celeste, for encouraging words and shared colorful resentments towards JavaScript.

My homie, Sev, for the laughs and positive reinforcement.

*/
const GREEN = "\u001b[32m";
const WHITE= "\u001b[37m";
const BOLD = "\u001b[1m";
const database_mgr = require('./database_mgr.js');
const logon_mgr = require('./logon_mgr.js');
const training_mgr = require('./training_mgr.js');
const path = require('path');

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

        console.log(GREEN + BOLD +
            `
█▀▀▀▄  ▄▀▀█ ▀▀█▀▀ █   █ █   █  ▄▀▀█ █   █ TM
█  ▄▀ █   █   █   █ ▄▄█ █   █ █   █ █   █  
█▄▀   █▄▀▀█   █   █▀  █ █ █ █ █▄▀▀█  ▀▄▀   
█     █   █   █   █   █ █▄▀▄▀ █   █   █

Employee Management and Onboarding System`
        );
        console.log(WHITE)
        console.log('\u001b[0m')
    } catch (error) {
        console.error('Error initializing modules:', error);
    }
}

initializeModules();
// Off to the races.