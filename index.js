var express = require('express');
var app = express();

var db = require('db.json');

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
});
