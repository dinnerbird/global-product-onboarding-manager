
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "dinnerbird",
    password: "buttsauce"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("It works?!");
    var useStatement = "USE bogus_data"
    con.query(useStatement, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    })
    var selectTest = "SELECT * FROM bogus_data"
    con.query(selectTest, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    })
  });

