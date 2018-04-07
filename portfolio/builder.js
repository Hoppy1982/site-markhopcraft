// portfolio
// builder.js

//File description:
//Does all bundling, pre-processing etc.
//Could be done simpler in npm scripts but done it this way to learn.

//--------MODULES-------//
const copydir = require('copy-dir');
const browserify = require('browserify');
const fs = require('fs');
const path = require('path');

//------CONFIG---------//
var builderConfig = {
  rawJsDir: path.join(__dirname, '/app/static/raw-javascripts/'),
  bundledJsDir: path.join(__dirname, '/app/static/bundled-javascripts/'),
  logMsgPrepend: "builder.js - ",
  jsFilesToDelete: [],
  jsFilesToBundle: [],
  browserifyObjects: []
}

//---BROWSERIFY FRONTEND JS FILES---//
//Populate an array with all the files in the bundle directory
builderConfig.jsFilesToDelete = fs.readdirSync(builderConfig.bundledJsDir);

//Clear out old files in bundle directory
builderConfig.jsFilesToDelete.forEach((element, index) => {
  element = builderConfig.bundledJsDir + element;
  fs.unlink(element, () => {
    console.log(builderConfig.logMsgPrepend + "Deleted file: " + element + "...");
  });

});

//Populate an array with all files to be browserified
builderConfig.jsFilesToBundle = fs.readdirSync(builderConfig.rawJsDir);

//Remove from the array anything that doesn't end in .js (utils folder or whatever it happens to be called)
builderConfig.jsFilesToBundle = builderConfig.jsFilesToBundle.filter(el => el.match(/\.js$/g));

//For each file to browserified create a browserify object in a different array.
//Add the full path to that object, then bundle the object with a new name to the bundles directory.
builderConfig.jsFilesToBundle.forEach((element, index) => {
  builderConfig.browserifyObjects[index] = browserify({
    entries: builderConfig.rawJsDir + element,
    debug: true//generate source map
  });
  builderConfig.browserifyObjects[index].bundle(function(err, buff) {
    if (err) throw err;
    fs.writeFile(builderConfig.bundledJsDir + "bundled-" + element, buff, function() {
      console.log(builderConfig.logMsgPrepend + "WriteFile success: " + element + "...");
    });
  });//End of .bundle(callback)
});//End of builderConfig.jsFilesToBundle.forEach


//var files = builderConfig.jsFilesToBundle[index];
//builderConfig.browserifyObjects[index] = browserify(files, {opts: {debug: true}});
