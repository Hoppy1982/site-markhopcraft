// portfolio
// index.js

// File description:
// Entry point to application, run this with node to start app.

//--------CONFIG--------//
var port = 3000;

//--------MODULES-------//
const express = require('express');
const pug = require('pug');
const bodyParser = require('body-parser');
const path = require('path');

//----DEFINE ROUTES-----//
const routes = require( path.join(__dirname, '/server/routes/index') );

//-----CREATE SERVER----//
var server = express();

//-----SETUP EXPRESS----//
server.set('view engine', 'pug');
server.set( 'views', path.join(__dirname, '/app/views') );
server.use( express.static( path.join(__dirname, '/app/static/') ) );
server.use( bodyParser.urlencoded({ extended: true }) );
server.use( bodyParser.json() );

//--------ROUTES--------//
server.use('/', routes);

//----START SERVER-----//
server.listen(port);
console.log('Server listening on port: ' + port);
