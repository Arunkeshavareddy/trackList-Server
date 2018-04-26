//This application is Connected to  MYSQL DATABASE If you want use another DATABASE like MongoDB just change MYSQL commands in the application

var mysql = require('mysql');
var http = require('http');
var trackListController = require('./controllers/trackListController');
var express = require('express');
var app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: "*****", //Please enter your MYSQL User ID
  password: "*********", //Please enter you Password
  database: "trackList"
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

/**  // The below comand lines helps to create a DATABASE for the trackList applocation. This should be done initially while starting the application to create the Database for the application
     //Please dont forget to run this line before getting into the application
  con.query("CREATE DATABASE trackList", function(err, result){
    if(err) throw err;
    console.log("Database created");
  }); **/

  //fire controllers
  trackListController(app, con);


});
app.listen(4300);
