const express = require('express');
const path = require('path');
const serverConfig = require( path.join(__dirname + '/../../server-config.js') );

const router = express.Router();

router.get('/', function(req, res, next) {
  console.log("GET request to " + serverConfig.PORT + ":/\nRendering home.html");
  res.sendFile( path.join(__dirname + '/../../app/views/home.html') );
});

module.exports = router;
