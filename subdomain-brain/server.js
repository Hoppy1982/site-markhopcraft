//MODULES
const express = require('express');
const path = require('path');

//CONFIG
const PORT = 3001;

//SERVER SETUP
const server = express();

//ROUTES
server.get('/', function(req, res) {
  res.sendFile(__dirname + '/home.html');
});

//LOG
server.listen(PORT);
console.log('Listening on: ' + PORT);
