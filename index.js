var express = require('express');
var exp = express();
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({ extended: false });
var mysql = require('mysql');

exp.use('/public', express.static('public'));

exp.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
})

exp.post('/add_data', urlencodeParser, function(req, res) {
  var con = mysql.createConnection({
    host: "82.200.170.122",
    port: "3306",
    user: "testuser",
    password: "qwerty123123",
    database: "test"
  });
//
  var sql = "INSERT INTO users VALUES (?,?,?,?)";
  con.query(sql, [req.body.name1, req.body.name2, req.body.name3, req.body.name4], function(err, result, fields) {
    if (err) res.send(err);
    res.send('it`s ok!');
  });
})

exp.get('/data', function(req, res) {
  var con = mysql.createConnection({
    host: "82.200.170.122",
    port: "3306",
    user: "testuser",
    password: "qwerty123123",
    database: "test"
  });

  con.query("SELECT * FROM users ORDER BY id ASC LIMIT 15", function(err, result, fields) {
    if (err) throw err;

    data = {
      'data': []
    };
    result.forEach(function(entry) {
      hh = [entry.first_name, entry.last_name, '', entry.last_name, entry.first_name, entry.last_name];
      data.data.push(hh);
    });

    res.send(data);
  });

})


exp.listen(3000);
console.log('OK LISTEN 3000 good ok');
