// portfolio
// fcc-projects-pomodoro.js

// File description:
// Route handlers for everything to /fcc-projects-pomodoro.js

const express = require('express');
const router = express.Router();

router.route('/fcc-projects-pomodoro')
  .get(function(req, res, next) {
    console.log("GET request to '/fcc-projects-pomodoro': Rendering fcc-projects-pomodoro.pug");
    res.render( 'fcc-projects-pomodoro', {title: "FCC Pomodoro"} );
  });

module.exports = router;
