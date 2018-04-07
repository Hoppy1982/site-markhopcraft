// portfolio
// search-page.js

// File description:
// Route handlers for everything to /search-page.

const express = require('express');
const router = express.Router();
const validator = require('../utils/validator');
const dbInterfacer = require('../utils/db-interfacer');

router.route('/search-page')
  // get requests
  .get(function(req, res, next) {
    console.log("GET request to '/': Rendering search-page.pug");
    res.render( 'search-page', {title: "Search Page"} );
  })// end of get requests


  // post requests
  .post(function(req, res, next) {
    console.log("POST request to '/search-page': ");

    let inputFormData = [
      req.body.id,
    ];

    console.log("is complete: " + req.body.complete);
    console.log("is outstanding: " + req.body.outstanding);

    if ( validateStatus = validator.validate(inputFormData) ) {
      let matchingData = dbInterfacer.find(inputFormData);

      res.send(matchingData);
    }

  });// end of post requests



module.exports = router;
