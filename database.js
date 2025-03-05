
var mysql = require('mysql');
var useStatement = "USE bogus_data"
const express = require('express');
const expressApp = express();
const port = 3030;
//           ^^^^ Don't touch unless you want to have a Long Afternoon
/* Note to future self:

VS Code's internal html preview thing runs on 3000 which seems to piss off Node because it's in use
For testing these silly things in the browser, use 3030 instead.

*/



expressApp.use(express.static(__dirname));
// I ain't no callaback girl
function sanityCheck(callback) {
    const selectTest = "SELECT * FROM bogus_data";
    connection.query(selectTest, (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, results);
    });
}

// API route to trigger the query
expressApp.get('/sanity-check', (req, res) => {
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


// Call me Kenny the way I got these Logins
  var connection = mysql.createConnection({
    host: "localhost",
    user: "dinnerbird",  // You would OBVIOUSLY change these. This is for my own personal dev environment
    password: "buttsauce", // The danger zone
	database: "bogus_data"
  });

// WOO YEAH WOO YEAH WOO YEAH
// "Make your connection, now"
  connection.connect(function(err) {
    if (err) throw err;
    console.log("It works?!");
  });

expressApp.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
});