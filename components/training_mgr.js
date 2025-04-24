console.log('[INFO] Training manager loaded');

/*  Training is a "series of videos"
// > General training videos
// > Specified training videos
// For totally unboarded people
// --> Verify access to services. Might be out of scope for this
*/

// Here's the plan:
// One employee will have several training "materials" --> assign all however many at once to that employee
// For demonstration purposes it's all 4 materials as listed in TRAINING_PROGRAM
const path = require('path');
const mysql = require('mysql');
const port = 3030;
const expressApp = require('./express_init.js');
const pathwayConfig = require('./config.js');

