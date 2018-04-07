// portfolio
// home.js

// File description:
// Route handlers for everything to /home

const express = require('express');
const router = express.Router();

router.route('/')
  .get(function(req, res, next) {
    console.log("GET request to '/': Rendering home.pug");
    res.render( 'home', {title: "Home"} );
  });


module.exports = router;
