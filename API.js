const express = require('express');
const mysql      = require('mysql');

const db = mysql.createConnection({
host     : 'localhost',
user     : 'admin',
password : 'student',
database : 'blogapi'
});

db.connect(function(err){
  if (err) throw err
  console.log("My SQL is connected")
})
const api = express();

// creating db
api.get('/createdb' , (res, req)=> {
  let sql = 'CREATE DATABASE blogapi'
  db.query(sql, (err, result)=> {
      if(err) throw err;
      console.log(result);
      res.send('Database created ... ')
  });
})


// create a table
api.get("/createposttable", (req, res)=> {
  // create table call post
  // id auto increment integer
  // title string
  // body string
  // primary key will be id
  let sql = 'CREATE TABLE post(ID int NOT NULL AUTO_INCREMENT, title varchar(255), body varchar(255),PRIMARY KEY (ID) );'
  db.query(sql, (err, result) =>{
      if(err) throw err;
      console.log(result);
      res.send("created table");
  })
})

// inserts a post into the post table
api.get("/addpost", (req, res) => {
  let post = {title: "My first post", body: "Hello, today was a good day in Indian River"}
  let sql = 'INSERT INTO post SET ?'
  db.query(sql, post,(err, result) =>{
      if(err) throw err;
      console.log(result);
      res.send("first post added ...")
  })
});

api.get("/addpost2", (req, res) => {
  let post = {title: "My second post", body: "Hello, today was a good day in Indian River"}
  let sql = 'INSERT INTO post SET ?'
  db.query(sql, post,(err, result) =>{
      if(err) throw err;
      console.log(result);
      res.send("second post added ...")
  })
});
// select all posts
api.get("/getpost/:id", (req, res) => {
  let sql = 'SELECT * FROM post WHERE ID=' + req.params.id;
  db.query(sql, (err, result) =>{
      if(err) throw err;
      console.log(result);
      res.send(result)
  })
});

//delete a post
api.get("/deletepost/:id", (req, res) => {
  let sql = 'DELETE  FROM post WHERE ID=' + req.params.id;
  db.query(sql, (err, result) =>{
      if(err) throw err;
      console.log(result);
      res.send(result)
  })
});

api.listen(5000);
console.log("Server is live on port 5000....")
