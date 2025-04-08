/*
*   @author Alex Helton (@dinnerbird)
    Yes, I am for hire.
*/
const path = require('path'); // is that 211 bytes?
var mysql = require('mysql2'); // adam was here :)
const port = 3030;
//           ^^^^ Do NOT touch this unless you want to have a really long afternoon
const expressApp = require('./express_init.js');
const DBusername = "dinnerbird"
const DBhostName = "localhost"
const DBpassword = "buttsauce"
const DBname = "bogus_data"

// be careful with this, it can cause circular references
// ask me how I know!

expressApp.get('/page-init', (req, res) => {
    sanityCheck((err, results) => {
        if (err) {
            res.status(500).send('Error executing query: ' + err.message);
        } else {
            res.json(results);
        }
    });
})

// need to figure out why the firstname is not being passed
// throws a NULL in the database
expressApp.get('/submit', (req, res) => {
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;

    console.log('Received firstName:', firstName);
    console.log('Received lastName:', lastName);

    const query = `
              INSERT INTO ${DBname} (FIRST_NAME, LAST_NAME, DESIGNATION) 
              VALUES (?, ?, 'NEW')
            `;

    connection.query(query, [firstName, lastName], (err, results) => {
        if (err) throw err;
        console.log("Employee added:", results);
        console.log(query);
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        } else {
            console.log(results);
            res.json(results);
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
        query = 'SELECT * FROM ' + DBname + ' WHERE DESIGNATION = "HR"';
    } else if (option === 'opt_NEW') {
        query = 'SELECT * FROM ' + DBname + ' WHERE DESIGNATION = "NEW"';
    } else if (option === 'opt_CURRENT') {
        query = 'SELECT * FROM ' + DBname + ' WHERE DESIGNATION = "CURRENT"';
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
    console.log('QUERY DEBUG: ' + query);
    console.log('EXTRA PARAMS: ' + queryParams);


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
    const checkQuery = `SELECT EMPLOYEE_ID FROM ${DBname} WHERE EMPLOYEE_ID IN (${placeholders}) AND DESIGNATION = 'HR'`;

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
        const updateQuery = `UPDATE ${DBname} SET DESIGNATION = 'CURRENT' WHERE EMPLOYEE_ID IN (${placeholders})`;

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


// Add a new endpoint for deleting employees
expressApp.post('/delete_employees', (req, res) => {
    const { employees } = req.body; // Expecting an array of employee objects or JSON strings

    if (!Array.isArray(employees) || employees.length === 0) {
        return res.status(400).json({ error: 'No employees provided for deletion' });
    }

    // Parse the employees array to extract EMPLOYEE_IDs
    const employeeIds = employees.map(employee => {
        if (typeof employee === 'string') {
            employee = JSON.parse(employee); // Parse JSON string
        }
        return employee.EMPLOYEE_ID; // Extract EMPLOYEE_ID
    });

    if (employeeIds.some(id => id == null)) {
        return res.status(400).json({ error: 'Invalid employee data provided' });
    }

    // Construct the query to delete multiple employees
    const placeholders = employeeIds.map(() => '?').join(','); // Create placeholders for the query
    const query = `DELETE FROM ${DBname} WHERE EMPLOYEE_ID IN (${placeholders})`;

    console.log('DELETE QUERY DEBUG:', query);
    console.log('EMPLOYEES TO DELETE:', employeeIds);

    connection.query(query, employeeIds, (err, results) => {
        if (err) {
            console.error('Error deleting employees:', err.message, err.code);
            return res.status(500).json({ error: 'Database query failed', details: err.message });
        }

        console.log('Deleted employees:', results.affectedRows);
        res.json({ message: 'Employees deleted successfully', affectedRows: results.affectedRows });
    });
});

// This is a sanity check to make sure the database is up and running
// and that the table is accessible
function sanityCheck(callback) {
    const selectTest = "SELECT * FROM bogus_data";
    connection.query(selectTest, (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        console.log("DB entries loaded")
        callback(null, results);
    });
}

// When you're doing your own dev, you can change these to your own values
// ...but please remember to change them back before you commit
// or you're gonna have a bad time.

// actually it'll probably just throw me on a wild goose chase next morning

var connection = mysql.createConnection({
    host: DBhostName,
    user: DBusername,  // You would OBVIOUSLY change these. This is for my own personal dev environment
    password: DBpassword, // The danger zone. You should NEVER have a password in plain text like this
    database: DBname
});

// I ain't no callaback girl
// I heard that you were POSTing shit and you didn't think that I would GET it
// People hear you query like that, getting all the endpoints fired up

// "Make your connection, now"

// This does the actual connection business.
// With a convenient error handler, of course
connection.connect(function (err) {
    if (err) {
        switch (err.code) {
            case 'ECONNREFUSED':
                throw new Error("Connection refused. Is the database running?");
            default:
                throw new Error("OUCH! An error occurred:" + err.message);
            case 'ER_PARSE_ERROR':
                throw new Error("Check your spelling?");
            case 'ER_NOT_SUPPORTED_AUTH_MODE':
                throw new Error("Your client doesn't support the auth protocol the server wants. Get it sorted and then come back.");
            case 'ER_DBACCESS_DENIED_ERROR':
                throw new Error('Access denied.' + err.message);
            //note to self: 
            // ALTER USER 'youruser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'whatever';
            // Probably need to figure out a way to do caching_sha2_password instead but eeeeehhhhhh
        }
    }
    console.log("Database manager loaded!");
});

