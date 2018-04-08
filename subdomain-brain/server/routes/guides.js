const express = require('express');
const path = require('path');
const serverConfig = require( path.join(__dirname + '/../../server-config.js') );

const router = express.Router();

router.get('/guides/:guide', function(req, res, next) {
  console.log('req to /guides');
  res.send(req.params);
});

module.exports = router;
