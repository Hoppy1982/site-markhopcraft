// portfolio
// fcc-projects-simon.js

// File description:
// Route handlers for everything to /fcc-projects-simon

const express = require('express');
const router = express.Router();

router.route('/fcc-projects-simon')
  .get(function(req, res, next) {
    console.log("GET request to '/fcc-projects-simon': Rendering fcc-projects-simon.pug");
    res.render( 'fcc-projects-simon', {title: "FCC Simon"} );
  });

module.exports = router;
