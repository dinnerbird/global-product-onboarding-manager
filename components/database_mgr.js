// Pathway Database Manager
// You're telling me a dolphin wrote this database software?

const bcrypt = require('bcrypt');
const path = require('path');
const port = 3030;
const expressApp = require('./express_init.js');
const { pathwayConfig, DEBUG_INFO } = require('./config.js');
const { connection } = require('./config.js')
const { getLoginName } = require('./logon_mgr.js');

// be careful with the require stuff, it can cause circular references
// ask me how I know!


function yeet(error) {
    throw error;
}

// Edit employees interface
function offToSeeTheWizard(callback) {
    const selectTest = `SELECT * FROM ${pathwayConfig.databaseName}.no_passes_for_you`; // Need a way to pretty print it
    connection.query(selectTest, (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        console.log("DB entries loaded")
        callback(null, results);
    });
}

// SELECT CONCAT(COUNT(*), ' ', 'items') AS `Unfinished Training` FROM bogus_data.DASHBOARD_VIEW WHERE `Completion Status` = 'Not Started' AND `First Name` = 'Alex' AND `Last Name` = 'Helton'
// This is a surprise tool that'll help us later.



// HR dashboard query function
// Those who know the reference: more power to you.
function DodgeSecondGenDashboard(callback) {
    // CRUNCH CRUNCH CRUNCH CRUNCH
    const dashboardSelect = `SELECT * FROM
    bogus_data.DASHBOARD_VIEW`
    // Honestly, my favorite part of SQL is getting to SCREAM AT YOUR COMPUTER... in style.

    connection.query(dashboardSelect, (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        console.log("Dashboard entries loaded")
        callback(null, results);
    });
}

function prepareTheKrabbyPatty(callback) {
    const trainingSelect = ``

    connection.query(trainingSelect, (err, results) => {

        if (err) {
            callback(err, null);
            return;
        }
        console.log("training entries loaded");
        callback(null, results);
    })
}


// ABANDON ALL HOPE, YE WHO ENTER HERE
// specifically, ye who scroll below these lines

expressApp.get('/overview-init', (req, res) => {
    DodgeSecondGenDashboard((err, results) => {
        if (err) {
/* nice */             res.status(500).send('Error executing query: ' + err.message);
        } else {
            res.json(results);
        }
    });
});

expressApp.get('/page-init', (req, res) => {
    offToSeeTheWizard((err, results) => {
        if (err) {
            res.status(500).send('Error executing query: ' + err.message);
        } else {
            res.json(results);
        }
    });
});

expressApp.get('/training-page-init', (req, res) => {
    prepareTheKrabbyPatty((err, results) => {
        if (err) {
            res.status(500).send('Plankton stole the secret formula: ' + err.message);
        } else {
            res.json(results);
        }
    })
});
// "Make your connection, now"

// This does the actual connection business.

connection.connect(function (err) {
    if (err) {
        switch (err.code) {
            case 'ECONNREFUSED':
                throw new Error("Connection refused. Is the database running?");
            default:
                throw new Error("NUTS!!! An error occurred:" + err.message);
            case 'ER_NOT_SUPPORTED_AUTH_MODE':
                throw new Error("Your client doesn't support the auth protocol the I'm looking for. Replace the loose screw behind the keyboard.");
            case 'ER_DBACCESS_DENIED_ERROR':
                throw new Error('Access denied. Have you considered kicking rocks?' + err.message);
        }
    }
    console.log("[INFO] Database manager loaded.");
});

// This is a BIG ASS FUNCTION with lots of moving parts. Things CAN and WILL go wrong here.
// Just ask my homie Murphy, he'll tell you all about it
expressApp.get('/submit', async (req, res) => {
    try {
        const firstName = req.query.firstName;
        const lastName = req.query.lastName;
        const phoneNum = req.query.phoneNum;
        const emailAddress = req.query.emailAddress;
        const tempClientPassword = req.query.phoneNum;

        const saltRounds = 10;
        const THE_BIG_ONE = await bcrypt.hash(tempClientPassword, saltRounds);
        const TempUserName = `${firstName}${lastName}`;

        const checkUsernameQuery = `
            SELECT COUNT(*) AS count 
            FROM ${pathwayConfig.databaseName}.EMPLOYEE_DATA 
            WHERE USERNAME LIKE ?`;

        connection.query(checkUsernameQuery, [`${TempUserName}%`], (err, results) => {
            if (err) {
                console.error('Error checking username:', err);
                return res.status(500).json({ error: 'Database query failed' });
            }

            const count = results[0].count;
            const uniqueUserName = count > 0 ? `${TempUserName}${count + 1}` : TempUserName;

            const query = `
                INSERT INTO ${pathwayConfig.databaseName}.EMPLOYEE_DATA 
                (FIRST_NAME, LAST_NAME, DESIGNATION, EMAIL, PHONE, USERNAME, PASS) 
                VALUES (?, ?, 'NEW', ?, ?, ?, ?);`;

            connection.query(query, [firstName, lastName, emailAddress, phoneNum, uniqueUserName, THE_BIG_ONE], (err, results) => {
                if (err) {
                    console.error('Query error:', err);
                    return res.status(500).json({ error: 'Database query failed' });
                }

                const trainingQuery = `
                    INSERT INTO ${pathwayConfig.databaseName}.TRAINING_STATUS (EMPLOYEE_ID, TRAINING_ID, COMPLETION_STATUS, COMPLETION_DATE)
                    SELECT 
                        (SELECT EMPLOYEE_ID 
                         FROM bogus_data.EMPLOYEE_DATA 
                         ORDER BY EMPLOYEE_ID DESC 
                         LIMIT 1),
                        TRAINING_ID,
                        0,
                        NULL
                    FROM TRAINING_PROGRAM;`;

                connection.query(trainingQuery, (err, trainingResults) => {
                    if (err) {
                        console.error('Training assignment error:', err);
                        return res.status(500).json({ error: 'Training assignment failed' });
                    }

                    console.log('Submit endpoint processed successfully');
                    res.json({
                        message: 'Employee added and training assignments completed successfully',
                        employeeResults: results,
                        trainingResults: trainingResults,
                    });
                });
            });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
});


// Jones BIG ASS Endpoints and Object Mapping
// Better come down here, GET some of this S$&#T

// this is a GET request because we're not changing anything in the database

expressApp.get('/filter', (req, res) => {
    const option = req.query.option;
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;

    // Turning if-else spaghetti into nice orderly object-mapping lasagna
    // Doesn't this look nicer?
    const filterOptions = {
        opt_HR: {
            table: 'EMPLOYEE_DATA',
            condition: 'DESIGNATION = "HR"',
        },
        opt_NEW: {
            table: 'EMPLOYEE_DATA',
            condition: 'DESIGNATION = "NEW"',
        },
        opt_CURRENT: {
            table: 'EMPLOYEE_DATA',
            condition: 'DESIGNATION = "CURRENT"',
        },
        opt_INCOMPLETE: {
            table: 'FILTER_RESULTS',
            condition: '`Completion Status` = "Incomplete"',
        },
        opt_NOTSTARTED: {
            table: 'FILTER_RESULTS',
            condition: '`Completion Status` = "Not Started"',
        },
        opt_COMPLETED: {
            table: 'FILTER_RESULTS',
            condition: '`Completion Status` = "Complete"',
        },
        opt_GENERAL: {
            table: 'TRAINING_PROGRAM',
            condition: 'CATEGORY = "General"',
        },
        opt_COHORT: {
            table: 'TRAINING_PROGRAM',
            condition: 'CATEGORY = "Cohort Training"',
        },
        opt_SKILLS: {
            table: 'TRAINING_PROGRAM',
            condition: 'CATEGORY = "Skills Workshop"'

            // These last three are being unused currently. Don't.
        }
    };

    // Validate the option
    const filter = filterOptions[option];
    if (!filter) {
        return res.status(400).json({ error: 'Invalid filter option. Please stop trying to further break my duct tape and paperclips.' });
    }

    // Build the base query
    // I worry that SELECT * might cause performance issues down the line
    let query = `SELECT * FROM ${pathwayConfig.databaseName}.${filter.table} WHERE ${filter.condition}`;
    const queryParams = [];

    // Add optional filters for firstName and lastName. Mainly to help assist with improper capitalization
    // LIKE allows for "close enough" guesses
    // Database is overall case-insensitive but still mostly cares about spelling.
    if (firstName) {
        query += ' AND LOWER(`First Name`) LIKE ?';
        queryParams.push(`%${firstName.toLowerCase()}%`);
    }
    if (lastName) {
        query += ' AND LOWER(`Last Name`) LIKE ?';
        queryParams.push(`%${lastName.toLowerCase()}%`);
    }

    // Debugging logs

    if (DEBUG_INFO) {
        console.log('QUERY DEBUG:', query);
        console.log('EXTRA PARAMS:', queryParams);
    }

    // Did that work?
    connection.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

// This is a POST request because we're changing the database
// it's not even 1pm yet and I want to consider drinking

// add a new endpoint for updating employees
expressApp.post('/promote_employees', (req, res) => {
    const { employees } = req.body;
    if (!Array.isArray(employees) || employees.length === 0) {
        return res.status(400).json({ error: 'No employees provided for promotion' });
    }

    const employeeIds = employees.map(employee => {
        if (typeof employee === 'string') {
            employee = JSON.parse(employee);
        }
        return employee.EMPLOYEE_ID;
    });

    if (employeeIds.some(id => id == null)) {
        return res.status(400).json({ error: 'Invalid employee data provided' });
    }

    // Query to check if any employee is part of HR
    const placeholders = employeeIds.map(() => '?').join(',');
    const checkQuery = `SELECT EMPLOYEE_ID FROM ${pathwayConfig.databaseName}.EMPLOYEE_DATA WHERE "EMPLOYEE_ID" IN (${placeholders}) AND DESIGNATION = 'HR'`;

    connection.query(checkQuery, employeeIds, (err, results) => {
        if (err) {
            console.error('Error checking HR employees:', err.message, err.code);
            return res.status(500).json({ error: 'Database query failed', details: err.message });
        }

        if (results.length > 0) {
            console.log('HR employees found:', results);
            return res.status(403).json({ error: 'Cannot promote HR employees', hrEmployees: results });
        }

        // Proceed with the promotion if no HR employees are found
        const updateQuery = `UPDATE ${pathwayConfig.databaseName}.EMPLOYEE_DATA SET DESIGNATION = 'CURRENT' WHERE EMPLOYEE_ID IN (${placeholders}) AND DESIGNATION = 'HR'`;

        connection.query(updateQuery, employeeIds, (err, results) => {
            if (err) {
                console.error('Error promoting employees:', err.message, err.code);
                return res.status(500).json({ error: 'Database query failed', details: err.message });
            }

            console.log('Promoted employees:', results.affectedRows);
            res.json({ message: 'Employees promoted successfully', affectedRows: results.affectedRows });
        });
    });
});

// Promoted back to NEW
expressApp.post('/DEMOTE_employees', (req, res) => {
    const { employees } = req.body;
    if (!Array.isArray(employees) || employees.length === 0) {
        return res.status(400).json({ error: 'No employees provided for demotion' });
    }

    const employeeIds = employees.map(employee => {
        if (typeof employee === 'string') {
            employee = JSON.parse(employee);
        }
        return employee.EMPLOYEE_ID;
    });

    if (employeeIds.some(id => id == null)) {
        return res.status(400).json({ error: 'Invalid employee data provided' });
    }

    // Query to check if any employee is part of HR
    const placeholders = employeeIds.map(() => '?').join(',');
    const checkQuery = `SELECT EMPLOYEE_ID FROM ${pathwayConfig.databaseName}.EMPLOYEE_DATA WHERE "EMPLOYEE_ID" IN (${placeholders}) AND DESIGNATION = 'HR'`;

    connection.query(checkQuery, employeeIds, (err, results) => {
        if (err) {
            console.error('Error checking HR employees:', err.message, err.code);
            return res.status(500).json({ error: 'Database query failed', details: err.message });
        }

        if (results.length > 0) {
            console.log('HR employees found:', results);
            return res.status(403).json({ error: 'Cannot promote HR employees', hrEmployees: results });
        }

        // Proceed with the promotion if no HR employees are found
        const updateQuery = `UPDATE ${pathwayConfig.databaseName}.EMPLOYEE_DATA SET DESIGNATION = 'NEW' WHERE EMPLOYEE_ID IN (${placeholders}) AND DESIGNATION != 'HR';`

        connection.query(updateQuery, employeeIds, (err, results) => {
            if (err) {
                console.error('Error promoting employees:', err.message, err.code);
                return res.status(500).json({ error: 'Database query failed', details: err.message });
            }

            console.log('Promoted employees:', results.affectedRows);
            res.json({ message: 'Employees demoted successfully', affectedRows: results.affectedRows });
        });
    });
});

// Add a new endpoint for deleting employees
expressApp.post('/delete_employees', (req, res) => {
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

    if (DEBUG_INFO) {

        console.log('DELETE EMPLOYEES QUERY DEBUG:', deleteEmployeesQuery);
        console.log('EMPLOYEES TO DELETE:', employeeIds);
    }

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

expressApp.get('/client-reporter', (req, res) => {
    const reportingUser = getLoginName(req);
    console.log('Reporting User: ', reportingUser.loginName);
    const clientRemainderQuery = `SELECT 
    CONCAT(COUNT(*), ' ', 'items') AS \`Unfinished Training\`
FROM
    bogus_data.NICERLOOKINGTABLE
WHERE
    \`Completion Status\` = 'Incomplete' AND \`Username\` = '${reportingUser.loginName}'`

    connection.query(clientRemainderQuery, reportingUser, (err, results) => {
        res.json(results);
        if (DEBUG_INFO) {
            console.log('Jank ass query results: ', results)

        }
    }
    )
});

// JANK ALERT: Use with caution.
// Preformatted garglemesh on the receiving end of this. Not my first choice but works for now.
expressApp.get('/filter-reporter', (req, res) => {
    const firstNameReport = req.query.firstName;
    const lastNameReport = req.query.lastName;

    if (DEBUG_INFO) {
        console.log(firstNameReport, lastNameReport);
    }
    const filter_reporter_query = `SELECT
  CONCAT(COUNT(CASE WHEN \`Completion Status\` = 'Incomplete' THEN 1 END), ' items') AS \`Incomplete\`,
  CONCAT(COUNT(CASE WHEN \`Completion Status\` = 'Complete' THEN 1 END), ' items') AS \`Complete\`
FROM NICERLOOKINGTABLE
WHERE \`First Name\` = '${firstNameReport}' OR \`Last Name\` = '${lastNameReport}';`


    connection.query(filter_reporter_query, (err, results) => {
        res.json(results);
        if (DEBUG_INFO) {
            console.log('More jank ass query results: ', results)

        }
    }
    )
});