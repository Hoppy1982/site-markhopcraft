//--MIDDLEWARES--
//My own custom middlewares

//MODULES
const path = require('path');
const serverConfig = require( path.join(__dirname + '/../../server-config.js') );

//logs to console basic info about the http request
let logReq = function(req, res, next) {
  console.log('HTTP ' + req.method + ' req to ' + serverConfig.PORT + ':' + req.url + ' from ' +  req.headers['x-forwarded-for']);
  next();
};

//EXPORTS
module.exports = {
  logReq
}
