// Pathway Database Manager
// You're telling me a dolphin wrote this database software?


const path = require('path'); // is that 211 bytes?
var mysql = require('mysql2'); // adam was here :)
const port = 3030;
//           ^^^^ Do NOT touch this unless you want to have a really long afternoon
const expressApp = require('./express_init.js');

const bcrypt = require('bcrypt');
const pathwayConfig = require('./config.js');


// be careful with the require stuff, it can cause circular references
// ask me how I know!

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

function DodgeSecondGenDashboard(callback) {
    // CRUNCH CRUNCH CRUNCH CRUNCH
    const dashboardSelect = `
    SELECT
    EMPLOYEE_DATA.EMPLOYEE_ID AS 'Employee ID',
    FIRST_NAME AS 'First Name',
    LAST_NAME AS 'Last Name',
    CASE TRAINING_STATUS.COMPLETION_STATUS
        WHEN 0 THEN 'Not Started'
        WHEN 1 THEN 'Complete'
        WHEN 2 THEN 'Incomplete'
        ELSE 'Unknown'
    END AS 'Completion Status',
    TRAINING_PROGRAM.TITLE AS 'Training Title',
    DATE_FORMAT(TRAINING_STATUS.COMPLETION_DATE, '%M %d, %Y') AS 'Completion Date',
CASE 
        WHEN DATEDIFF(CURDATE(), COMPLETION_DATE) = 0 THEN 'Today'
        WHEN DATEDIFF(CURDATE(), COMPLETION_DATE) = 1 THEN 'Yesterday'
        WHEN DATEDIFF(CURDATE(), COMPLETION_DATE) < 7 THEN 
            CONCAT(DATEDIFF(CURDATE(), COMPLETION_DATE), ' days ago')
        WHEN DATEDIFF(CURDATE(), COMPLETION_DATE) < 30 THEN 
            CONCAT(FLOOR(DATEDIFF(CURDATE(), COMPLETION_DATE) / 7), ' weeks ago')
        WHEN DATEDIFF(CURDATE(), COMPLETION_DATE) < 365 THEN 
            CONCAT(FLOOR(DATEDIFF(CURDATE(), COMPLETION_DATE) / 30), ' months ago')
        ELSE 
            CONCAT(FLOOR(DATEDIFF(CURDATE(), COMPLETION_DATE) / 365), ' years ago')
    END AS 'Relative Date'
FROM EMPLOYEE_DATA
INNER JOIN TRAINING_STATUS
    ON EMPLOYEE_DATA.EMPLOYEE_ID = TRAINING_STATUS.EMPLOYEE_ID
INNER JOIN TRAINING_PROGRAM
    ON TRAINING_STATUS.TRAINING_ID = TRAINING_PROGRAM.TRAINING_ID;
    `
    // Honestly, my favorite part of SQL is getting to SCREAM AT YOUR COMPUTER... in style.

    // TODO: Map TRAINING_IDs to pretty names
    connection.query(dashboardSelect, (err, results) => {
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

// This is a BIG ASS FUNCTION with lots of moving parts. Things can go wrong here.
expressApp.get('/submit', async (req, res) => {

    // Get the heaping spaghetti pile of informacione
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    const phoneNum = req.query.phoneNum;
    const emailAddress = req.query.emailAddress;
    const tempClientPassword = req.query.phoneNum; // Use phone number as the password

    // Begin hashing
    const saltRounds = 10;
    const THE_BIG_ONE = await bcrypt.hash(tempClientPassword, saltRounds);

    // If you can't remember your own first and last name, God help you
    const TempUserName = firstName + lastName;

    // Debug
    console.log(`RECEIVED: ${firstName} ${lastName} (NEW EMPLOYEE) ${emailAddress} ${phoneNum} ${TempUserName} ${THE_BIG_ONE}`);

    // The question marks perfectly sum up my confusion here.
    // Seems to work well enough
    const query = `
        INSERT INTO ${pathwayConfig.databaseName}.EMPLOYEE_DATA (FIRST_NAME, LAST_NAME, DESIGNATION, EMAIL, PHONE, USERNAME, PASS) VALUES (?, ?, 'NEW', ?, ?, ?, ?);`;

    connection.query(query, [firstName, lastName, emailAddress, phoneNum, TempUserName, THE_BIG_ONE], async (err, results) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        console.log('Employee added:', results);
            // "Now, are you ready? It's showtime!"
    });

    // TRAINING MATERIALS ASSIGNMENT!
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
FROM TRAINING_PROGRAM;

    `; // THIS IS GOOD DO NOT TOUCH FOR THE LOVE OF GOD PLEEEEEAAAASEEEE
    connection.query(trainingQuery, [firstName, lastName], (err, results) => {
        if (err) {
            console.error('Training assignment error:', err);
            return res.status(500).json({ error: 'Training assignment failed' });
        }
        console.log('Training assignments added:', results);
        res.json({ message: 'Training assignments added successfully', results });
    });
    // I don't know why this is here, but it seems to work

    console.log('Submit endpoint processed successfully');
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

    // First, delete employees from EMPLOYEE_DATA
    connection.query(deleteEmployeesQuery, employeeIds, (err, results) => {
        if (err) {
            console.error('Error deleting employees:', err.message, err.code);
            return res.status(500).json({ error: 'Database query failed', details: err.message });
        }

        console.log('Deleted employees:', results.affectedRows);

        // Now delete corresponding login info from LOGIN_INFO
    })});