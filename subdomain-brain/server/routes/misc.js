const path = require('path');
const express = require('express');

const router = express.Router();

router.get('/misc/:miscPage', function(req, res, next) {
  let miscURL = '/../../app/views/misc/' + req.params.miscPage + '.html';
  res.sendFile( path.join(__dirname + miscURL) );
});

module.exports = router;
