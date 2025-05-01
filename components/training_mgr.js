console.log('[INFO] Training manager loaded');

// Here's the plan:
// One employee will have several training "materials" --> assign all however many at once to that employee
// For demonstration purposes it's however many god damn materials as listed in TRAINING_PROGRAM
const path = require('path');
const expressApp = require('./express_init.js');
const { pathwayConfig, DEBUG_INFO } = require('./config.js');

const { connection } = require('./config.js');
const { getLoginName } = require('./logon_mgr.js');


// Training materials request. This is a big one
expressApp.get('/training-materials-request', (req, res) => {
    const itemCategory = req.query.itemCategory;
    if (DEBUG_INFO) {
        console.log('[DEBUG] Received itemCategory:', itemCategory);
        // This is probably a security risk. Who cares at this point?
    }

    trainingMaterialsGet(req, itemCategory, (err, results) => {
        if (err) {
            res.status(500).send('FIDDLESTICKS! ' + err.message);
        } else {
            res.json(results);
        }
    });
});

function trainingMaterialsGet(req, itemCategory, callback) {
    const loginDetails = getLoginName(req);

    // Debugging logs
    console.log(loginDetails);
    console.log(loginDetails.loginName);

    // Use the itemCategory passed from the route handler
    const query = `SELECT ID, \`Training Title\`, \`Category\` FROM ${pathwayConfig.databaseName}.NICERLOOKINGTABLE WHERE \`Username\` = '${loginDetails.loginName}' AND \`Category\` LIKE '%${itemCategory}%'`;
    connection.query(query, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
}
expressApp.get('/training-page-request', (req, res) => {
    return res.status(418).json({ error: 'yeah this is just an empty endpoint for now, stay tuned...I think' })
});


// THIS IS THE BIG ONE

expressApp.post('/complete-training', (req, res) => {
    const { materials } = req.body; // Expecting an array of training objects or JSON strings
    const sessionUsername = req.session?.user?.loginName;

    console.log('MATERIALS:', materials);

    if (!sessionUsername) {
        return res.status(401).json({ error: 'Unauthorized: Employee session not found.' });
    }

    const parsedMaterials = materials.map(material => {
        try {
            return JSON.parse(material);
        } catch (err) {
            console.error('SIGH', material, err.message);
            return null;
        }
    }).filter(material => material !== null);


    if (!Array.isArray(materials) || materials.length === 0) {
        return res.status(400).json({ error: 'AINT GOT NO GAS IN IT.' });
    }

    console.log('Parsed materials:', parsedMaterials)

    const trainingIDs = parsedMaterials.map(material => material.ID);

    if (trainingIDs.length === 0) {
        return res.status(400).json({ error: 'No training IDs provided.' });
    }

    console.log('Extracted Training IDs:', trainingIDs);

    // Proceed with the rest of your logic.

    // Query to fetch EMPLOYEE_ID based on USERNAME
    const employeeIdQuery = `SELECT EMPLOYEE_ID FROM ${pathwayConfig.databaseName}.ID_NAMES WHERE USERNAME = ?`;

    connection.query(employeeIdQuery, [sessionUsername], (err, results) => {
        if (err) {
            console.error('Error fetching EMPLOYEE_ID:', err.message);
            return res.status(500).json({ error: 'Database query failed', details: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Employee not found for the given username.' });
        }

        const sessionEmployeeId = results[0].EMPLOYEE_ID;
        console.log('Found employee ID:', sessionEmployeeId);


    // Hot single triple-equal signs in your area looking for some comparison action
    if (trainingIDs.length === 0) {
        return res.status(400).json({ error: 'Nothing provided for deletion' });
    }

    // Generate placeholders for the IN clause
    const placeholders = trainingIDs.map(() => '?').join(','); // e.g., "?, ?, ?"
    const deleteTrainingQuery = `DELETE FROM ?? WHERE EMPLOYEE_ID = ? AND TRAINING_ID IN (${placeholders})`;

    // Log query only in debug mode (avoid in production)
    if (DEBUG_INFO) {
        console.log('[DEBUG] Executing query:', deleteTrainingQuery);
    }

    // Execute the query with properly parameterized inputs
    connection.query(
        deleteTrainingQuery,
        [pathwayConfig.databaseName + '.TRAINING_STATUS', sessionEmployeeId, ...trainingIDs],
        (err, results) => {
            if (err) {
                console.error('Error deleting training IDs:', err.message, err.code);
                return res.status(500).json({ error: 'Database query failed', details: err.message });
            }

            console.log('Fired Check-Off\'s gun:', results.affectedRows);
            res.status(200).json({ message: 'Training IDs successfully deleted for the current employee.' });
        }
    );
    
})});