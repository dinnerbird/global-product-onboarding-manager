/*
*   @author Alex Helton (@dinnerbird)
    Yes, I am for hire.
*/
const path = require('path');
var mysql = require('mysql');
const port = 3030;
//           ^^^^ Don't touch unless you want to have a Long Afternoon

const DBusername = "dinnerbird"
const DBhostName = "localhost"
const DBpassword = "buttsauce"
const DBname = "bogus_data"

let expressApp;

function initializeExpressApp() {
    expressApp = require('./enterprise_onboarding');
    expressApp.listen(port, () => {
        console.log(`Express is ready. Listening on ${port}`);
    });

    expressApp.get('/page-init', (req, res) => {
        sanityCheck((err, results) => {
            if (err) {
                res.status(500).send('Error executing query: ' + err.message);
            } else {
                res.json(results);
            }
        });
    })
    
    expressApp.get('/add-new', (req, res) => {
        const firstName = req.query.firstName;
        const lastName = req.query.lastName;
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
                console.log(results)
                console.log(query);
            }
    
        })
    })
    
    // hot filtering action in your area
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
            return res.status(400).json({ error: 'Invalid option' });
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
    
    expressApp.get('/hr_interface', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'hr', 'hr_interface.html'));
    });

    expressApp.get('/new_employee', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'hr', 'new_employee.html'));
    });
}


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


// Call me Kenny the way I got these Logins
var connection = mysql.createConnection({
    host: DBhostName,
    user: DBusername,  // You would OBVIOUSLY change these. This is for my own personal dev environment
    password: DBpassword, // The danger zone. You should NEVER have a password in plain text like this
    database: DBname
});




// I ain't no callaback girl
// I heard that you were POSTing shit and you didn't think that I would GET it
// People hear you query like that, getting all the endpoints fired up



// WOO YEAH WOO YEAH WOO YEAH
// "Make your connection, now"
connection.connect(function (err) {
    if (err) {
        switch (err.code) {
            case 'ECONNREFUSED':
                throw new Error("Connection refused. Is the database running?");
            case 'ER_ACCESS_DENIED_ERROR':
                throw new Error("Access denied. Please check permissions and all that.");
            case 'ER_DUP_ENTRY':
                throw new Error("Duplicate entry. Ensure unique values only");
            default:
                throw new Error("OUCH! An error occurred:" + err.message);
            case 'ER_PARSE_ERROR':
                throw new Error("...fat fingers?");
        }
    }
    console.log("Database manager loaded!");
    initializeExpressApp();
});