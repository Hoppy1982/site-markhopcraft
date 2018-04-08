const path = require('path');
const express = require('express');

const router = express.Router();

router.get('/guides/:guide', function(req, res, next) {
  let guideURL = '/../../app/views/guides/' + req.params.guide + '.html';
  res.sendFile( path.join(__dirname + guideURL) );
});

module.exports = router;
