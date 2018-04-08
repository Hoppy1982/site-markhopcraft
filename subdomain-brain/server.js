//MODULES
const path = require('path');
const express = require('express');
const serverConfig = require( path.join(__dirname, '/server-config.js') );

//CONFIG
const PORT = serverConfig.PORT;

//DEFINE ROUTES
const routes = require( path.join(__dirname, '/server/routes/index') );

//SERVER SETUP
const server = express();
server.set( 'views', path.join(__dirname, 'app/views') );
server.use('/', routes);


//LOG
server.listen(PORT);
console.log('Server listening on: ' + PORT);
