// portfolio
// fcc-projects-calculator.js

// File description:
// Route handlers for everything to /fcc-projects-calculator.js

const express = require('express');
const router = express.Router();

router.route('/fcc-projects-calculator')
  .get(function(req, res, next) {
    console.log("GET request to '/fcc-projects-calculator': Rendering fcc-projects-calculator.pug");
    res.render( 'fcc-projects-calculator', {title: "FCC calculator"} );
  });

module.exports = router;
