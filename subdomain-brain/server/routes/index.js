//MODULES
const path = require('path');
const express = require('express');
const middlewares = require( path.join(__dirname, '/../utils/middlewares.js') );

//CREATE A ROUTER
const router = express.Router();

//DEFINE INDIVIDUAL ROUTES MODULES
const home = require('./home');
const misc = require('./misc');
const guides = require('./guides');

//USE INDIVIDUAL ROUTES
router.use(middlewares.logReq);
//middleware to reroute '/' to '/home'
router.get('/', home);
router.get('/misc/:misc?', misc);
router.get('/guides/:guide?', guides);

//EXPORT THE ROUTER
module.exports = router;


//Consolidate into just this routes index and one other file that contains all these routes.
