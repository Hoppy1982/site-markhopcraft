const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', function(req, res, next) {
  res.sendFile( path.join(__dirname + '/../../app/views/home.html') );
});

module.exports = router;
