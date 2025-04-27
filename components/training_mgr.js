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

expressApp.get('/training-materials/:itemID', async (req, res) => {
    const { itemID } = req.params; // Extract itemID from the request parameters

    try {
        // Create a connection to the database
        const connection = mysql.createConnection({
            host: pathwayConfig.host,
            user: pathwayConfig.user,
            password: pathwayConfig.password,
            database: pathwayConfig.databaseName
        });

        // Query the database for the training materials
        const query = `
            SELECT * FROM ${pathwayConfig.databaseName}.TRAINING_PROGRAM
            WHERE TRAINING_ID = ?
        `;

        connection.query(query, [itemID], (err, results) => {
            if (err) {
                console.error('[ERROR] Failed to fetch training materials:', err);
                return res.status(500).json({ error: 'Failed to fetch training materials.' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'No training materials found for the given ID.' });
            }

            console.log('[INFO] Training materials fetched successfully:', results);
            res.json(results); // Send the results as a JSON response
        });

        // Close the connection
        connection.end();
    } catch (error) {
        console.error('[ERROR] Unexpected error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});