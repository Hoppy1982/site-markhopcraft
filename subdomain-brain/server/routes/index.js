//MODULES
const express = require('express');

//CREATE A ROUTER
const router = express.Router();

//DEFINE INDIVIDUAL ROUTES MODULES
const home = require('./home');
const guides = require('./guides');

//USE INDIVIDUAL ROUTES
router.get('/', home);
router.get('/guides/:guide?', guides);

//EXPORT THE ROUTER
module.exports = router;
