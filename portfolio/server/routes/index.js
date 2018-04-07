// portfolio
// index.js

// File description:
// Index of all indivual route files

const express = require('express');
const router = express.Router();
const validator = require('../utils/validator');
const dbInterfacer = require('../utils/db-interfacer');

// route includes
const home = require('./home');
const searchPage = require('./search-page');
const fccProjects = require('./fcc-projects');
const fccProjectsSimon = require('./fcc-projects-simon');
const fccProjectsTictactoe = require('./fcc-projects-tictactoe')
const fccProjectsPomodoro = require('./fcc-projects-pomodoro');
const fccProjectsCalculator = require('./fcc-projects-calculator');
const widgetrons = require('./widgetrons');
const campervan = require('./campervan');

// routes used
router.all('/', home);
router.all('/search-page', searchPage);
router.all('/fcc-projects', fccProjects);
router.all('/fcc-projects-simon', fccProjectsSimon);
router.all('/fcc-projects-pomodoro', fccProjectsPomodoro);
router.all('/fcc-projects-tictactoe', fccProjectsTictactoe);
router.all('/fcc-projects-calculator', fccProjectsCalculator);
router.all('/widgetrons', widgetrons);
router.all('/campervan', campervan);

module.exports = router;
