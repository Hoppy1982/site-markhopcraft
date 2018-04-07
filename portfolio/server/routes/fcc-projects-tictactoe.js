// portfolio
// fcc-projects-tictactoe.js

// File description:
// Route handlers for everything to /fcc-projects-tictactoe

const express = require('express');
const router = express.Router();

router.route('/fcc-projects-tictactoe')
  .get(function(req, res, next) {
    console.log("GET request to '/fcc-projects-tictactoe': Rendering fcc-projects-tictactoe.pug");
    res.render( 'fcc-projects-tictactoe', {title: "FCC Tic Tac Toe"} );
  });

module.exports = router;
