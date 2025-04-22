/*
*   @author Alex Helton (@dinnerbird)
    Yes, I am for hire.
*/
const path = require('path'); // is that 211 bytes?
var mysql = require('mysql2'); // adam was here :)
const port = 3030;
//           ^^^^ Do NOT touch this unless you want to have a really long afternoon
const expressApp = require('./express_init.js');

const bcrypt = require('bcrypt');
const pathwayConfig = require('./config.js');


// be careful with the require stuff, it can cause circular references
// ask me how I know!

// This is a sanity check to make sure the database is up and running
// and that the table is accessible

// So instead of a "sanity check" this just became the table init function
// the quickest fixes are the longest features, amirite fellas?



// I ain't no callaback girl
// I heard that you were POSTing shit and you didn't think that I would GET it
// People hear you query like that, getting all the endpoints fired up

function offToSeeTheWizard(callback) {
    const selectTest = `SELECT * FROM ${pathwayConfig.databaseName}.EMPLOYEE_DATA`; // Need a way to pretty print it
    connection.query(selectTest, (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        console.log("DB entries loaded")
        callback(null, results);
    });
}

function DodgeSecondGenDashboard(callback) {
    // CRUNCH CRUNCH CRUNCH CRUNCH
    const selectTest = `
    SELECT 
    EMPLOYEE_DATA.EMPLOYEE_ID AS 'Employee ID', 
    FIRST_NAME AS 'First Name', 
    LAST_NAME AS 'Last Name', 
    CASE COMPLETION_STATUS
        WHEN 0 THEN 'Not Started'
        WHEN 1 THEN 'Complete'
        WHEN 2 THEN 'INCOMPLETE'
        ELSE 'UNKNOWN'
    END AS 'Completion Status', 
    COMPLETION_DATE AS 'Completion Date' 
FROM EMPLOYEE_DATA 
INNER JOIN TRAINING_STATUS 
    ON EMPLOYEE_DATA.EMPLOYEE_ID = TRAINING_STATUS.EMPLOYEE_ID;`
    // Honestly, my favorite part of SQL is getting to SCREAM AT YOUR COMPUTER... in style.
    connection.query(selectTest, (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        console.log("DB entries loaded")
        callback(null, results);
    });
}

expressApp.get('/overview-init', (req, res) => {
    DodgeSecondGenDashboard((err, results) => {
        if (err) {
            res.status(500).send('Error executing query: ' + err.message);
        } else {
            res.json(results);
        }
    });
})

expressApp.get('/page-init', (req, res) => {
    offToSeeTheWizard((err, results) => {
        if (err) {
            res.status(500).send('Error executing query: ' + err.message);
        } else {
            res.json(results);
        }
    });
})



// "Make your connection, now"

// This does the actual connection business.

var connection = mysql.createConnection({
    host: pathwayConfig.host,
    user: pathwayConfig.user,
    password: pathwayConfig.password,
    database: pathwayConfig.databaseName
});


connection.connect(function (err) {
    if (err) {
        switch (err.code) {
            case 'ECONNREFUSED':
                throw new Error("Connection refused. Is the database running?");
            default:
                throw new Error("NUTS!!! An error occurred:" + err.message);
            case 'ER_PARSE_ERROR':
                throw new Error("Please recheck your query. I won't accept that garglemesh.");
            case 'ER_NOT_SUPPORTED_AUTH_MODE':
                throw new Error("Your client doesn't support the auth protocol the I'm looking for. Replace the loose screw behind the keyboard.");
            case 'ER_DBACCESS_DENIED_ERROR':
                throw new Error('Access denied. Have you considered kicking rocks?' + err.message);
            // I have had to waste a week of my time getting these morons to set up their dev environments

        }
    }
    console.log("[INFO] Database manager loaded");
});




// Simple and Accessible Hash (SAHash)
// listens for the crunchatizeMeCaptain function call and does some wizardry here
expressApp.get('/submit', async (req, res) => {
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    const phoneNum = req.query.phoneNum;
    const emailAddress = req.query.emailAddress;

    const TempUserName = firstName + lastName;
    console.log('Temporary Username:', TempUserName);

    console.log('Received firstName:', firstName);
    console.log('Received lastName:', lastName);
    console.log('Received email:', emailAddress);
    console.log('Received phone:', phoneNum);

    const query = `
        INSERT INTO ${pathwayConfig.databaseName}.EMPLOYEE_DATA (FIRST_NAME, LAST_NAME, DESIGNATION, EMAIL, PHONE) VALUES (?, ?, 'NEW', ?, ?);
    `;

    connection.query(query, [firstName, lastName, emailAddress, phoneNum], async (err, results) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        console.log('Employee added:', results);

        const tempClientPassword = req.query.phoneNum; // Use phone number as the password
        const saltRounds = 10;

        try {
            // Wait for the hash to be generated
            const THE_BIG_ONE = await bcrypt.hash(tempClientPassword, saltRounds);

            // Insert the hashed password into the LOGIN_INFO table

            // "Now, are you ready? It's showtime!"
            const SAHASH_QUERY = `
                INSERT INTO ${pathwayConfig.databaseName}.LOGIN_INFO (USER, PASS, DESIGNATION) VALUES (?, ?, 'NEW');
            `;
            connection.query(SAHASH_QUERY, [TempUserName, THE_BIG_ONE], (err, results) => {
                if (err) {
                    console.error('Failed to add new user:', err);
                    return res.status(500).json({ error: 'Failed to add new user' });
                }
                console.log('User added to LOGIN_INFO:', results);
                res.json({ message: 'Employee and login info added successfully' });
            });
        } catch (hashError) {
            console.error('Error generating hash:', hashError);
            res.status(500).json({ error: 'Failed to generate password hash' });
        }
    });
});

// hot damn, this is a lot of code for a simple filter
// this is a GET request because we're not changing anything in the database
expressApp.get('/filter', (req, res) => {
    const option = req.query.option;
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    let query = '';
    const queryParams = [];

    // This probably could be done better
    if (option === 'opt_HR') {
        query = `SELECT * FROM ${pathwayConfig.databaseName}.EMPLOYEE_DATA WHERE DESIGNATION = "HR"`;
    } else if (option === 'opt_NEW') {
        query = `SELECT * FROM ${pathwayConfig.databaseName}.EMPLOYEE_DATA WHERE DESIGNATION = "NEW"`;
    } else if (option === 'opt_CURRENT') {
        query = `SELECT * FROM ${pathwayConfig.databaseName}.EMPLOYEE_DATA WHERE DESIGNATION = "CURRENT"`;
    }
    else {
        return res.status(400).json({ error: 'Bad request' });
    }

    // Handle case-insensitive and partial matches. You know how people's spelling skills are
    if (firstName) {
        query += ' AND LOWER(first_name) LIKE ?';
        queryParams.push(`%${firstName.toLowerCase()}%`);
    }
    if (lastName) {
        query += ' AND LOWER(last_name) LIKE ?';
        queryParams.push(`%${lastName.toLowerCase()}%`);
    }
    // who needs silly debuggers when you can just log everything???
    console.log('QUERY DEBUG:' + query);
    console.log('EXTRA PARAMS:' + queryParams);


    connection.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    })
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
        const updateQuery = `UPDATE ${pathwayConfig.databaseName}.EMPLOYEE_DATA SET DESIGNATION = 'CURRENT' WHERE EMPLOYEE_ID IN (${placeholders})`;

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
        const updateQuery = `UPDATE ${pathwayConfig.databaseName}.EMPLOYEE_DATA SET DESIGNATION = 'NEW' WHERE EMPLOYEE_ID IN (${placeholders})`;

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

    // Parse the employees array to extract EMPLOYEE_IDs and validate FIRST_NAME and LAST_NAME
    const employeeIds = [];
    const userNames = [];

    employees.forEach(employee => {
        if (typeof employee === 'string') {
            employee = JSON.parse(employee); // Parse JSON string
        }

        if (!employee.EMPLOYEE_ID || !employee.FIRST_NAME || !employee.LAST_NAME) {
            return res.status(400).json({ error: 'Invalid employee data provided' });
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

    // First, delete employees from EMPLOYEE_DATA
    connection.query(deleteEmployeesQuery, employeeIds, (err, results) => {
        if (err) {
            console.error('Error deleting employees:', err.message, err.code);
            return res.status(500).json({ error: 'Database query failed', details: err.message });
        }

        console.log('Deleted employees:', results.affectedRows);

        // Now delete corresponding login info from LOGIN_INFO
        const deleteLoginsQuery = `DELETE FROM ${pathwayConfig.databaseName}.LOGIN_INFO WHERE USER IN (${userNames.map(() => '?').join(',')})`;

        console.log('DELETE LOGIN INFO QUERY DEBUG:', deleteLoginsQuery);
        console.log('USERS TO DELETE:', userNames);

        connection.query(deleteLoginsQuery, userNames, (err, results) => {
            if (err) {
                console.error('Error deleting login info:', err.message, err.code);
                return res.status(500).json({ error: 'Database query failed', details: err.message });
            }

            console.log('Deleted login info:', results.affectedRows);
            res.json({
                message: 'Employees and corresponding login info deleted successfully',
                affectedRows: {
                    employees: results.affectedRows,
                    logins: results.affectedRows,
                },
            });
        });
    });
});
