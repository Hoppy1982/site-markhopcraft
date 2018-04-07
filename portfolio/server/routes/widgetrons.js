// portfolio
// widgetrons.js

// File description:
// Route handlers for everything to /widgetrons

const express = require('express');
const router = express.Router();

router.route('/widgetrons')
  .get(function(req, res, next) {
    console.log("GET request to '/widgetrons': Rendering widgetrons.pug");
    res.render( 'widgetrons', {title: "Widgetrons"} );
  });


module.exports = router;
