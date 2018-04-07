// portfolio
// fcc-projects.js

// File description:
// Route handlers for everything to /fcc-projects.js

const express = require('express');
const router = express.Router();

router.route('/fcc-projects')
  .get(function(req, res, next) {
    console.log("GET request to '/fcc-projects': Rendering fcc-projects.pug");
    res.render( 'fcc-projects', {title: "FCC Projects"} );
  });

module.exports = router;
