var express = require('express');
//var auth = require('basic-auth');
var bodyParser = require('body-parser');
//var promisify = require("promisify-node");

// create a new express server
var app = express();
app.use(bodyParser.json());

require('./routes/bookmarks.js')(app);

// API root
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// 404 error handler
app.use(function(req, res) {
  res.status(404).send('404 - Not found');
});

// 500 error handler
app.use(function(error, req, res, next) {
  console.error(error.stack);
  res.status(500).send('500 - Internal Server Error');
});

// start server on the specified port and binding host
var port = '8000';
app.listen(port, '0.0.0.0', function() {
  console.log("server starting on " + port);
});


module.exports = app;

