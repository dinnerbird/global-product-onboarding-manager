console.log('[INFO] Training manager loaded');

// Here's the plan:
// One employee will have several training "materials" --> assign all however many at once to that employee
// For demonstration purposes it's however many god damn materials as listed in TRAINING_PROGRAM
const path = require('path');
const expressApp = require('./express_init.js');
const { pathwayConfig } = require('./config.js');

const { connection } = require('./config.js');
const { getLoginName } = require('./logon_mgr.js');


// Training materials request. This is a big one
expressApp.get('/training-materials-request', (req, res) => {
    const itemCategory = req.query.itemCategory; 
    console.log('[DEBUG] Received itemCategory:', itemCategory);

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
    const query = `SELECT  \`Training Title\`, \`Category\` FROM ${pathwayConfig.databaseName}.NICERLOOKINGTABLE WHERE \`Username\` = '${loginDetails.loginName}' AND \`Category\` LIKE '%${itemCategory}%'`;
    connection.query(query, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
}
expressApp.get('/training-page-request', (req, res) => {
    // uhhhhhhhh
});

expressApp.post('/complete-training', (req, res) => {
    const { employees } = req.body; // Expecting an array of employee objects or JSON strings

    if (!Array.isArray(employees) || employees.length === 0) {
        return res.status(400).json({ error: 'No employees provided for deletion' });
    }

    // Validate the employees array before processing
    const invalidEmployee = employees.find(employee => {
        if (typeof employee === 'string') {
            employee = JSON.parse(employee); // Parse JSON string
        }
        return !employee.EMPLOYEE_ID || !employee.FIRST_NAME || !employee.LAST_NAME;
    });

    if (invalidEmployee) {
        return res.status(400).json({ error: 'Invalid employee data provided' });
    }

    // Parse the employees array to extract EMPLOYEE_IDs and validate FIRST_NAME and LAST_NAME
    const employeeIds = [];
    const userNames = [];

    employees.forEach(employee => {
        if (typeof employee === 'string') {
            employee = JSON.parse(employee); // Parse JSON string
        }
        employeeIds.push(employee.EMPLOYEE_ID);
        userNames.push(`${employee.FIRST_NAME}${employee.LAST_NAME}`); // Generate TempUserName
    });

    if (employeeIds.length === 0 || userNames.length === 0) {
        return res.status(400).json({ error: 'No valid employees provided for deletion' });
    }

    // Construct the query to delete employees
    const placeholders = employeeIds.map(() => '?').join(','); // Create placeholders for the query
    const deleteEmployeesQuery = `DELETE FROM ${pathwayConfig.databaseName}.EMPLOYEE_DATA WHERE EMPLOYEE_ID IN (${placeholders})`;

    console.log('DELETE EMPLOYEES QUERY DEBUG:', deleteEmployeesQuery);
    console.log('EMPLOYEES TO DELETE:', employeeIds);


    const deleteTrainingQuery = `DELETE FROM ${pathwayConfig.databaseName}.TRAINING_STATUS WHERE EMPLOYEE_ID IN (${placeholders})`

    connection.query(deleteTrainingQuery, employeeIds, (err, results) => {
        if (err) {
            console.error('DAG NABIT: ', err.message, err.code);
            return res.status(500).json({ error: 'Database query failed', details: err.message });

        }
    })
    // First, delete employees from EMPLOYEE_DATA
    connection.query(deleteEmployeesQuery, employeeIds, (err, results) => {
        if (err) {
            console.error('Error deleting employees:', err.message, err.code);
            return res.status(500).json({ error: 'Database query failed', details: err.message });
        }

        console.log('Deleted employees:', results.affectedRows);

        // Now delete corresponding login info from LOGIN_INFO and TRAINING_STATUS
    })
});