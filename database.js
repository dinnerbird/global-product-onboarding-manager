
var mysql = require('mysql');
const express = require('express');
const expressApp = express();
const port = 3030;
//           ^^^^ Don't touch unless you want to have a Long Afternoon

const DBusername = "dinnerbird"
const DBhostName = "localhost"
const DBpassword = "buttsauce"

/* Note to future self:

VS Code's internal html preview thing runs on 3000 which seems to piss off Node because it's in use
For testing these silly things in the browser, use 3030 instead.

*/

// Call me Kenny the way I got these Logins
var connection = mysql.createConnection({
    host: DBhostName,
    user: DBusername,  // You would OBVIOUSLY change these. This is for my own personal dev environment
    password: DBpassword, // The danger zone. You should NEVER have a password in plain text like this
	database: "bogus_data"
  });


// I ain't no callaback girl
// I heard that you were POSTing shit and you didn't think that I would GET it
// People hear you query like that, getting all the endpoints fired up

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

// API route to trigger the query
expressApp.get('/page-init', (req, res) => {
    sanityCheck((err, results) => {
        if (err) {
            res.status(500).send('Error executing query: ' + err.message);
        } else {
            res.json(results);
        }
    });
});

//This is important for some bizarre reason. Something about serving static filenames?
expressApp.use(express.static(__dirname));
expressApp.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
});

// WOO YEAH WOO YEAH WOO YEAH
// "Make your connection, now"
  connection.connect(function(err) {
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
       }
    }
    console.log("MySQL interface ready");
  });