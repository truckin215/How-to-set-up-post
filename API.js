const express = require('express');
const mysql      = require('mysql');

const api = express();

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin',
  password : 'student',
});

db.connect(function(err){
    if(err) throw err
    console.log('MySQl is connected, looking good!')
});

api.listen(5000);

console.log("server is live and on port 5000");