// portfolio
// campervan.js

// File description:
// Route handlers for everything to /campervan

const express = require('express');
const router = express.Router();

router.route('/campervan')
  .get(function(req, res, next) {
    console.log("GET request to '/campervan': Rendering campervan.pug");
    res.render( 'campervan', {title: "Campervan"} );
  });


module.exports = router;
