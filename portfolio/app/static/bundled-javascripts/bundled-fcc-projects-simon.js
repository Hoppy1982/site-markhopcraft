(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// portfolio
// fcc-projects-simon.js

// File description:
//

const mh_fcc_simon = require('./utils/fcc-simon-utils');

simonToggleoffOn = function() {
  mh_fcc_simon.toggleoffOn();
}

simonStrictMode = function(cmd) {
  mh_fcc_simon.strictMode(cmd);
}

simonStart = function() {
  mh_fcc_simon.start();
}

simonUserCornerPress = function(cornerId) {
  mh_fcc_simon.userCornerPress(cornerId);
}

},{"./utils/fcc-simon-utils":2}],2:[function(require,module,exports){
// portfolio
// fcc-simon-utils.js

// File description:
//

//*********************************************************//
//*********************************************************//
//OBJECT TO HOLD GAME STATE
var gameData = {
  powerOn: false,
  strictMode: false,
  counter: 0,
  winningSequence: [],
  userSequence: [],
  inputEnabled: false
};

//*********************************************************//
//*********************************************************//
//FUNCTION TO GENERATE RANDOM TARGET SEQUENCE OF 20 MOVES & START NEW GAME
resetSequences = function() {
  var nextMove

  gameData.winningSequence = [];
  gameData.userSequence = [];
  gameData.counter = 0;
  gameData.inputEnabled = false;

  for (let i = 0; i < 20; i++) {
    nextMove = Math.floor(Math.random() * 4);
    gameData.winningSequence.push(nextMove);
  }
}

//*********************************************************//
//*********************************************************//
//FUNCTION TO TOGGLE POWER OFF & ON
toggleoffOn = function() {
  var offOnSwitch = document.getElementById('offOnSwitch');

  gameData.powerOn === false ? gameData.powerOn = true : gameData.powerOn = false;

  gameData.powerOn === false ? (
    offOnSwitch.classList.remove('switchRight'),
    strictMode('off'),
    gameData.counter = 0,
    counter('off')
  ) : (
    offOnSwitch.classList.add('switchRight'),
    counter('currentCount')
  )
}

//*********************************************************//
//*********************************************************//
//FUNCTION TO CHANGE STATE OF STRICT MODE
strictMode = function(cmd) {
  var strictStatus = document.getElementById('strictStatus');

  switch (cmd) {
    case 'off':
      strictOff();
      break;
    case 'on':
      strictOn();
      break;
    case 'toggle':
      if (gameData.powerOn === true) {
        gameData.strictMode === true ? strictOff() : strictOn();
      }
      break;
    default:
      console.log('unexpected arg to function strictMode(cmd)')
  }

  function strictOff() {
    gameData.strictMode = false;
    strictStatus.classList.remove('strictModeOn');
    strictStatus.classList.add('strictModeOff');
  }

  function strictOn() {
    gameData.strictMode = true;
    strictStatus.classList.remove('strictModeOff');
    strictStatus.classList.add('strictModeOn');
  }

}

//*********************************************************//
//*********************************************************//
//FUNCTION TO CHANGE STATE OF COUNTER
counter = function(cmd) {
  var counterDispEl = document.getElementById('counter');

  switch(cmd) {
    case 'off':
      counterDispEl.innerHTML = '';
      break;
    case 'currentCount':
      gameData.counter === 0 ? counterDispEl.innerHTML = '- -' : counterDispEl.innerHTML =gameData.counter;
      break;
    case 'incorrectSeq':
      counterDispEl.innerHTML = '! !';
      break;
    case 'victory':
      counterDispEl.innerHTML = 'win';
      break;
    default:
      console.log('unexpected arg to function counter(cmd)');
  }

}

//*********************************************************//
//*********************************************************//
//FUNCTION TO START
start = function() {
  if (gameData.powerOn === true) {
    resetSequences();
    gameLoop();
  }

}

//*********************************************************//
//*********************************************************//
//FUNCTION TO ALTERNATE DEMO SEQ AND USER SEQ UNTIL GAME ENDS
gameLoop = function() {
  counter('currentCount');
  demoSeq();
  gameData.inputEnabled = true;

}

//*********************************************************//
//*********************************************************//
//FUNCTION TO DEMO APPROPRIATE SECTION OF WINNING SEQUENCE
demoSeq = function() {
  var i = 0;

  timeoutWrapper();

  function timeoutWrapper() {
    setTimeout(function() {
      highlightCorner(gameData.winningSequence[i]);
      i++;
      if (i <= gameData.counter) {
        timeoutWrapper();
      }
    }, 1000);
  }

}

//*********************************************************//
//*********************************************************//
//FUNCTION TO HIGHLIGHT A CORNER
function highlightCorner(corner) {
  //Takes 1 arg corresponding to a corner.
  //Sets applicable style class and plays applicable sound. Sound not yet implemented*
  //Corners: green is 0, red is 1, yellow is 2, blue is 3
  var soundUrl;

  switch (corner) {
    case 0:
      soundUrl = 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3';
      buzzCorner('Green');
      break;
    case 1:
      soundUrl = 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3';
      buzzCorner('Red');
      break;
    case 2:
      soundUrl = 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3';
      buzzCorner('Yellow');
      break;
    case 3:
      soundUrl = 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3';
      buzzCorner('Blue');
      break;
  }

  function buzzCorner(color) {
    var domCorner;
    var styleClassOn;
    var styleClassOff;

    var aSound = new Audio(soundUrl);
    aSound.play();

    domCorner = document.getElementById('corner' + color);
    styleClassOn = 'corner' + color + 'On';
    styleClassOff = 'corner' + color + 'Off';

    domCorner.classList.remove(styleClassOff);
    domCorner.classList.add(styleClassOn);

    setTimeout(function() {
      domCorner.classList.remove(styleClassOn);
      domCorner.classList.add(styleClassOff);
    }, 700);
  }

}

//*********************************************************//
//*********************************************************//
//FUNCTION TO HANDLE A SINGLE USER CORNER BUTTON PRESS
userCornerPress = function(cornerId) {
  var usermove;

  if (gameData.inputEnabled === true) {
    switch (cornerId) {
      case 'cornerGreen':
        highlightCorner(0);
        userMove = 0;
        break;
      case 'cornerRed':
        highlightCorner(1);
        userMove = 1;
        break;
      case 'cornerYellow':
        highlightCorner(2);
        userMove = 2;
        break;
      case 'cornerBlue':
        highlightCorner(3);
        userMove = 3;
        break;
      default:
        console.log('unhandled arg to userCornerPress');
    }

    gameData.userSequence.push(userMove);
    compareSequences();
  }

}

//*********************************************************//
//*********************************************************//
//FUNCTION TO COMPARE WHAT THE USER HAS ENTERED WITH THE WINNING SEQUENCE
function compareSequences() {
  var sequenceIncorrect = false;

  for (let i = 0; i < gameData.userSequence.length; i++) {
    if (gameData.userSequence[i] !== gameData.winningSequence[i]) {
      sequenceIncorrect = true;
    }
  }

  let logic1 = sequenceIncorrect === false;
  let logic2 = gameData.userSequence.length === gameData.counter + 1;
  let logic3 = gameData.userSequence.length > 0;

  console.log('userSeq: ' + gameData.userSequence + ', winningSeq: ' +gameData.winningSequence);

  //Sequence correct.
  if (logic1 && logic2 && logic3) {
    gameData.counter++;
    gameData.inputEnabled = false;
    counter('currentCount');
    gameData.userSequence = [];
    setTimeout(function() {
      gameLoop();
    }, 2000);
  }

  //Someones' only gone and bloody well won.
  if (gameData.counter === 20) {
    counter('victory');
    gameData.inputEnabled = false;
  }

  //Sequence incorrect.
  if (sequenceIncorrect === true) {
    //incorrect in strict mode
    if (gameData.strictMode === true) {
      counter('incorrectSeq');
      setTimeout(function() {
        start();
      }, 2000);
    //Incorrect in coward mode
    } else {
      console.log('seq wrong');
      counter('incorrectSeq');
      gameData.userSequence = [];
      setTimeout(function() {
        gameLoop();
      }, 2000);
    }
  }

}

//*********************************************************//
//*********************************************************//
//EXPORTS
module.exports = {
  toggleoffOn: toggleoffOn,
  start: start,
  strictMode: strictMode,
  userCornerPress
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc3RhdGljL3Jhdy1qYXZhc2NyaXB0cy9mY2MtcHJvamVjdHMtc2ltb24uanMiLCJhcHAvc3RhdGljL3Jhdy1qYXZhc2NyaXB0cy91dGlscy9mY2Mtc2ltb24tdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIHBvcnRmb2xpb1xyXG4vLyBmY2MtcHJvamVjdHMtc2ltb24uanNcclxuXHJcbi8vIEZpbGUgZGVzY3JpcHRpb246XHJcbi8vXHJcblxyXG5jb25zdCBtaF9mY2Nfc2ltb24gPSByZXF1aXJlKCcuL3V0aWxzL2ZjYy1zaW1vbi11dGlscycpO1xyXG5cclxuc2ltb25Ub2dnbGVvZmZPbiA9IGZ1bmN0aW9uKCkge1xyXG4gIG1oX2ZjY19zaW1vbi50b2dnbGVvZmZPbigpO1xyXG59XHJcblxyXG5zaW1vblN0cmljdE1vZGUgPSBmdW5jdGlvbihjbWQpIHtcclxuICBtaF9mY2Nfc2ltb24uc3RyaWN0TW9kZShjbWQpO1xyXG59XHJcblxyXG5zaW1vblN0YXJ0ID0gZnVuY3Rpb24oKSB7XHJcbiAgbWhfZmNjX3NpbW9uLnN0YXJ0KCk7XHJcbn1cclxuXHJcbnNpbW9uVXNlckNvcm5lclByZXNzID0gZnVuY3Rpb24oY29ybmVySWQpIHtcclxuICBtaF9mY2Nfc2ltb24udXNlckNvcm5lclByZXNzKGNvcm5lcklkKTtcclxufVxyXG4iLCIvLyBwb3J0Zm9saW9cclxuLy8gZmNjLXNpbW9uLXV0aWxzLmpzXHJcblxyXG4vLyBGaWxlIGRlc2NyaXB0aW9uOlxyXG4vL1xyXG5cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8vXHJcbi8vT0JKRUNUIFRPIEhPTEQgR0FNRSBTVEFURVxyXG52YXIgZ2FtZURhdGEgPSB7XHJcbiAgcG93ZXJPbjogZmFsc2UsXHJcbiAgc3RyaWN0TW9kZTogZmFsc2UsXHJcbiAgY291bnRlcjogMCxcclxuICB3aW5uaW5nU2VxdWVuY2U6IFtdLFxyXG4gIHVzZXJTZXF1ZW5jZTogW10sXHJcbiAgaW5wdXRFbmFibGVkOiBmYWxzZVxyXG59O1xyXG5cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8vXHJcbi8vRlVOQ1RJT04gVE8gR0VORVJBVEUgUkFORE9NIFRBUkdFVCBTRVFVRU5DRSBPRiAyMCBNT1ZFUyAmIFNUQVJUIE5FVyBHQU1FXHJcbnJlc2V0U2VxdWVuY2VzID0gZnVuY3Rpb24oKSB7XHJcbiAgdmFyIG5leHRNb3ZlXHJcblxyXG4gIGdhbWVEYXRhLndpbm5pbmdTZXF1ZW5jZSA9IFtdO1xyXG4gIGdhbWVEYXRhLnVzZXJTZXF1ZW5jZSA9IFtdO1xyXG4gIGdhbWVEYXRhLmNvdW50ZXIgPSAwO1xyXG4gIGdhbWVEYXRhLmlucHV0RW5hYmxlZCA9IGZhbHNlO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDIwOyBpKyspIHtcclxuICAgIG5leHRNb3ZlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNCk7XHJcbiAgICBnYW1lRGF0YS53aW5uaW5nU2VxdWVuY2UucHVzaChuZXh0TW92ZSk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cclxuLy9GVU5DVElPTiBUTyBUT0dHTEUgUE9XRVIgT0ZGICYgT05cclxudG9nZ2xlb2ZmT24gPSBmdW5jdGlvbigpIHtcclxuICB2YXIgb2ZmT25Td2l0Y2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb2ZmT25Td2l0Y2gnKTtcclxuXHJcbiAgZ2FtZURhdGEucG93ZXJPbiA9PT0gZmFsc2UgPyBnYW1lRGF0YS5wb3dlck9uID0gdHJ1ZSA6IGdhbWVEYXRhLnBvd2VyT24gPSBmYWxzZTtcclxuXHJcbiAgZ2FtZURhdGEucG93ZXJPbiA9PT0gZmFsc2UgPyAoXHJcbiAgICBvZmZPblN3aXRjaC5jbGFzc0xpc3QucmVtb3ZlKCdzd2l0Y2hSaWdodCcpLFxyXG4gICAgc3RyaWN0TW9kZSgnb2ZmJyksXHJcbiAgICBnYW1lRGF0YS5jb3VudGVyID0gMCxcclxuICAgIGNvdW50ZXIoJ29mZicpXHJcbiAgKSA6IChcclxuICAgIG9mZk9uU3dpdGNoLmNsYXNzTGlzdC5hZGQoJ3N3aXRjaFJpZ2h0JyksXHJcbiAgICBjb3VudGVyKCdjdXJyZW50Q291bnQnKVxyXG4gIClcclxufVxyXG5cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8vXHJcbi8vRlVOQ1RJT04gVE8gQ0hBTkdFIFNUQVRFIE9GIFNUUklDVCBNT0RFXHJcbnN0cmljdE1vZGUgPSBmdW5jdGlvbihjbWQpIHtcclxuICB2YXIgc3RyaWN0U3RhdHVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0cmljdFN0YXR1cycpO1xyXG5cclxuICBzd2l0Y2ggKGNtZCkge1xyXG4gICAgY2FzZSAnb2ZmJzpcclxuICAgICAgc3RyaWN0T2ZmKCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnb24nOlxyXG4gICAgICBzdHJpY3RPbigpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ3RvZ2dsZSc6XHJcbiAgICAgIGlmIChnYW1lRGF0YS5wb3dlck9uID09PSB0cnVlKSB7XHJcbiAgICAgICAgZ2FtZURhdGEuc3RyaWN0TW9kZSA9PT0gdHJ1ZSA/IHN0cmljdE9mZigpIDogc3RyaWN0T24oKTtcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGNvbnNvbGUubG9nKCd1bmV4cGVjdGVkIGFyZyB0byBmdW5jdGlvbiBzdHJpY3RNb2RlKGNtZCknKVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc3RyaWN0T2ZmKCkge1xyXG4gICAgZ2FtZURhdGEuc3RyaWN0TW9kZSA9IGZhbHNlO1xyXG4gICAgc3RyaWN0U3RhdHVzLmNsYXNzTGlzdC5yZW1vdmUoJ3N0cmljdE1vZGVPbicpO1xyXG4gICAgc3RyaWN0U3RhdHVzLmNsYXNzTGlzdC5hZGQoJ3N0cmljdE1vZGVPZmYnKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHN0cmljdE9uKCkge1xyXG4gICAgZ2FtZURhdGEuc3RyaWN0TW9kZSA9IHRydWU7XHJcbiAgICBzdHJpY3RTdGF0dXMuY2xhc3NMaXN0LnJlbW92ZSgnc3RyaWN0TW9kZU9mZicpO1xyXG4gICAgc3RyaWN0U3RhdHVzLmNsYXNzTGlzdC5hZGQoJ3N0cmljdE1vZGVPbicpO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xyXG4vL0ZVTkNUSU9OIFRPIENIQU5HRSBTVEFURSBPRiBDT1VOVEVSXHJcbmNvdW50ZXIgPSBmdW5jdGlvbihjbWQpIHtcclxuICB2YXIgY291bnRlckRpc3BFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb3VudGVyJyk7XHJcblxyXG4gIHN3aXRjaChjbWQpIHtcclxuICAgIGNhc2UgJ29mZic6XHJcbiAgICAgIGNvdW50ZXJEaXNwRWwuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnY3VycmVudENvdW50JzpcclxuICAgICAgZ2FtZURhdGEuY291bnRlciA9PT0gMCA/IGNvdW50ZXJEaXNwRWwuaW5uZXJIVE1MID0gJy0gLScgOiBjb3VudGVyRGlzcEVsLmlubmVySFRNTCA9Z2FtZURhdGEuY291bnRlcjtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdpbmNvcnJlY3RTZXEnOlxyXG4gICAgICBjb3VudGVyRGlzcEVsLmlubmVySFRNTCA9ICchICEnO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ3ZpY3RvcnknOlxyXG4gICAgICBjb3VudGVyRGlzcEVsLmlubmVySFRNTCA9ICd3aW4nO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGNvbnNvbGUubG9nKCd1bmV4cGVjdGVkIGFyZyB0byBmdW5jdGlvbiBjb3VudGVyKGNtZCknKTtcclxuICB9XHJcblxyXG59XHJcblxyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cclxuLy9GVU5DVElPTiBUTyBTVEFSVFxyXG5zdGFydCA9IGZ1bmN0aW9uKCkge1xyXG4gIGlmIChnYW1lRGF0YS5wb3dlck9uID09PSB0cnVlKSB7XHJcbiAgICByZXNldFNlcXVlbmNlcygpO1xyXG4gICAgZ2FtZUxvb3AoKTtcclxuICB9XHJcblxyXG59XHJcblxyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cclxuLy9GVU5DVElPTiBUTyBBTFRFUk5BVEUgREVNTyBTRVEgQU5EIFVTRVIgU0VRIFVOVElMIEdBTUUgRU5EU1xyXG5nYW1lTG9vcCA9IGZ1bmN0aW9uKCkge1xyXG4gIGNvdW50ZXIoJ2N1cnJlbnRDb3VudCcpO1xyXG4gIGRlbW9TZXEoKTtcclxuICBnYW1lRGF0YS5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG5cclxufVxyXG5cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8vXHJcbi8vRlVOQ1RJT04gVE8gREVNTyBBUFBST1BSSUFURSBTRUNUSU9OIE9GIFdJTk5JTkcgU0VRVUVOQ0VcclxuZGVtb1NlcSA9IGZ1bmN0aW9uKCkge1xyXG4gIHZhciBpID0gMDtcclxuXHJcbiAgdGltZW91dFdyYXBwZXIoKTtcclxuXHJcbiAgZnVuY3Rpb24gdGltZW91dFdyYXBwZXIoKSB7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICBoaWdobGlnaHRDb3JuZXIoZ2FtZURhdGEud2lubmluZ1NlcXVlbmNlW2ldKTtcclxuICAgICAgaSsrO1xyXG4gICAgICBpZiAoaSA8PSBnYW1lRGF0YS5jb3VudGVyKSB7XHJcbiAgICAgICAgdGltZW91dFdyYXBwZXIoKTtcclxuICAgICAgfVxyXG4gICAgfSwgMTAwMCk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8vXHJcbi8vRlVOQ1RJT04gVE8gSElHSExJR0hUIEEgQ09STkVSXHJcbmZ1bmN0aW9uIGhpZ2hsaWdodENvcm5lcihjb3JuZXIpIHtcclxuICAvL1Rha2VzIDEgYXJnIGNvcnJlc3BvbmRpbmcgdG8gYSBjb3JuZXIuXHJcbiAgLy9TZXRzIGFwcGxpY2FibGUgc3R5bGUgY2xhc3MgYW5kIHBsYXlzIGFwcGxpY2FibGUgc291bmQuIFNvdW5kIG5vdCB5ZXQgaW1wbGVtZW50ZWQqXHJcbiAgLy9Db3JuZXJzOiBncmVlbiBpcyAwLCByZWQgaXMgMSwgeWVsbG93IGlzIDIsIGJsdWUgaXMgM1xyXG4gIHZhciBzb3VuZFVybDtcclxuXHJcbiAgc3dpdGNoIChjb3JuZXIpIHtcclxuICAgIGNhc2UgMDpcclxuICAgICAgc291bmRVcmwgPSAnaHR0cHM6Ly9zMy5hbWF6b25hd3MuY29tL2ZyZWVjb2RlY2FtcC9zaW1vblNvdW5kMS5tcDMnO1xyXG4gICAgICBidXp6Q29ybmVyKCdHcmVlbicpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTpcclxuICAgICAgc291bmRVcmwgPSAnaHR0cHM6Ly9zMy5hbWF6b25hd3MuY29tL2ZyZWVjb2RlY2FtcC9zaW1vblNvdW5kMi5tcDMnO1xyXG4gICAgICBidXp6Q29ybmVyKCdSZWQnKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDI6XHJcbiAgICAgIHNvdW5kVXJsID0gJ2h0dHBzOi8vczMuYW1hem9uYXdzLmNvbS9mcmVlY29kZWNhbXAvc2ltb25Tb3VuZDMubXAzJztcclxuICAgICAgYnV6ekNvcm5lcignWWVsbG93Jyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAzOlxyXG4gICAgICBzb3VuZFVybCA9ICdodHRwczovL3MzLmFtYXpvbmF3cy5jb20vZnJlZWNvZGVjYW1wL3NpbW9uU291bmQ0Lm1wMyc7XHJcbiAgICAgIGJ1enpDb3JuZXIoJ0JsdWUnKTtcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBidXp6Q29ybmVyKGNvbG9yKSB7XHJcbiAgICB2YXIgZG9tQ29ybmVyO1xyXG4gICAgdmFyIHN0eWxlQ2xhc3NPbjtcclxuICAgIHZhciBzdHlsZUNsYXNzT2ZmO1xyXG5cclxuICAgIHZhciBhU291bmQgPSBuZXcgQXVkaW8oc291bmRVcmwpO1xyXG4gICAgYVNvdW5kLnBsYXkoKTtcclxuXHJcbiAgICBkb21Db3JuZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29ybmVyJyArIGNvbG9yKTtcclxuICAgIHN0eWxlQ2xhc3NPbiA9ICdjb3JuZXInICsgY29sb3IgKyAnT24nO1xyXG4gICAgc3R5bGVDbGFzc09mZiA9ICdjb3JuZXInICsgY29sb3IgKyAnT2ZmJztcclxuXHJcbiAgICBkb21Db3JuZXIuY2xhc3NMaXN0LnJlbW92ZShzdHlsZUNsYXNzT2ZmKTtcclxuICAgIGRvbUNvcm5lci5jbGFzc0xpc3QuYWRkKHN0eWxlQ2xhc3NPbik7XHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgZG9tQ29ybmVyLmNsYXNzTGlzdC5yZW1vdmUoc3R5bGVDbGFzc09uKTtcclxuICAgICAgZG9tQ29ybmVyLmNsYXNzTGlzdC5hZGQoc3R5bGVDbGFzc09mZik7XHJcbiAgICB9LCA3MDApO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xyXG4vL0ZVTkNUSU9OIFRPIEhBTkRMRSBBIFNJTkdMRSBVU0VSIENPUk5FUiBCVVRUT04gUFJFU1NcclxudXNlckNvcm5lclByZXNzID0gZnVuY3Rpb24oY29ybmVySWQpIHtcclxuICB2YXIgdXNlcm1vdmU7XHJcblxyXG4gIGlmIChnYW1lRGF0YS5pbnB1dEVuYWJsZWQgPT09IHRydWUpIHtcclxuICAgIHN3aXRjaCAoY29ybmVySWQpIHtcclxuICAgICAgY2FzZSAnY29ybmVyR3JlZW4nOlxyXG4gICAgICAgIGhpZ2hsaWdodENvcm5lcigwKTtcclxuICAgICAgICB1c2VyTW92ZSA9IDA7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2Nvcm5lclJlZCc6XHJcbiAgICAgICAgaGlnaGxpZ2h0Q29ybmVyKDEpO1xyXG4gICAgICAgIHVzZXJNb3ZlID0gMTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnY29ybmVyWWVsbG93JzpcclxuICAgICAgICBoaWdobGlnaHRDb3JuZXIoMik7XHJcbiAgICAgICAgdXNlck1vdmUgPSAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdjb3JuZXJCbHVlJzpcclxuICAgICAgICBoaWdobGlnaHRDb3JuZXIoMyk7XHJcbiAgICAgICAgdXNlck1vdmUgPSAzO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnNvbGUubG9nKCd1bmhhbmRsZWQgYXJnIHRvIHVzZXJDb3JuZXJQcmVzcycpO1xyXG4gICAgfVxyXG5cclxuICAgIGdhbWVEYXRhLnVzZXJTZXF1ZW5jZS5wdXNoKHVzZXJNb3ZlKTtcclxuICAgIGNvbXBhcmVTZXF1ZW5jZXMoKTtcclxuICB9XHJcblxyXG59XHJcblxyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cclxuLy9GVU5DVElPTiBUTyBDT01QQVJFIFdIQVQgVEhFIFVTRVIgSEFTIEVOVEVSRUQgV0lUSCBUSEUgV0lOTklORyBTRVFVRU5DRVxyXG5mdW5jdGlvbiBjb21wYXJlU2VxdWVuY2VzKCkge1xyXG4gIHZhciBzZXF1ZW5jZUluY29ycmVjdCA9IGZhbHNlO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVEYXRhLnVzZXJTZXF1ZW5jZS5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKGdhbWVEYXRhLnVzZXJTZXF1ZW5jZVtpXSAhPT0gZ2FtZURhdGEud2lubmluZ1NlcXVlbmNlW2ldKSB7XHJcbiAgICAgIHNlcXVlbmNlSW5jb3JyZWN0ID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxldCBsb2dpYzEgPSBzZXF1ZW5jZUluY29ycmVjdCA9PT0gZmFsc2U7XHJcbiAgbGV0IGxvZ2ljMiA9IGdhbWVEYXRhLnVzZXJTZXF1ZW5jZS5sZW5ndGggPT09IGdhbWVEYXRhLmNvdW50ZXIgKyAxO1xyXG4gIGxldCBsb2dpYzMgPSBnYW1lRGF0YS51c2VyU2VxdWVuY2UubGVuZ3RoID4gMDtcclxuXHJcbiAgY29uc29sZS5sb2coJ3VzZXJTZXE6ICcgKyBnYW1lRGF0YS51c2VyU2VxdWVuY2UgKyAnLCB3aW5uaW5nU2VxOiAnICtnYW1lRGF0YS53aW5uaW5nU2VxdWVuY2UpO1xyXG5cclxuICAvL1NlcXVlbmNlIGNvcnJlY3QuXHJcbiAgaWYgKGxvZ2ljMSAmJiBsb2dpYzIgJiYgbG9naWMzKSB7XHJcbiAgICBnYW1lRGF0YS5jb3VudGVyKys7XHJcbiAgICBnYW1lRGF0YS5pbnB1dEVuYWJsZWQgPSBmYWxzZTtcclxuICAgIGNvdW50ZXIoJ2N1cnJlbnRDb3VudCcpO1xyXG4gICAgZ2FtZURhdGEudXNlclNlcXVlbmNlID0gW107XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICBnYW1lTG9vcCgpO1xyXG4gICAgfSwgMjAwMCk7XHJcbiAgfVxyXG5cclxuICAvL1NvbWVvbmVzJyBvbmx5IGdvbmUgYW5kIGJsb29keSB3ZWxsIHdvbi5cclxuICBpZiAoZ2FtZURhdGEuY291bnRlciA9PT0gMjApIHtcclxuICAgIGNvdW50ZXIoJ3ZpY3RvcnknKTtcclxuICAgIGdhbWVEYXRhLmlucHV0RW5hYmxlZCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLy9TZXF1ZW5jZSBpbmNvcnJlY3QuXHJcbiAgaWYgKHNlcXVlbmNlSW5jb3JyZWN0ID09PSB0cnVlKSB7XHJcbiAgICAvL2luY29ycmVjdCBpbiBzdHJpY3QgbW9kZVxyXG4gICAgaWYgKGdhbWVEYXRhLnN0cmljdE1vZGUgPT09IHRydWUpIHtcclxuICAgICAgY291bnRlcignaW5jb3JyZWN0U2VxJyk7XHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc3RhcnQoKTtcclxuICAgICAgfSwgMjAwMCk7XHJcbiAgICAvL0luY29ycmVjdCBpbiBjb3dhcmQgbW9kZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coJ3NlcSB3cm9uZycpO1xyXG4gICAgICBjb3VudGVyKCdpbmNvcnJlY3RTZXEnKTtcclxuICAgICAgZ2FtZURhdGEudXNlclNlcXVlbmNlID0gW107XHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZ2FtZUxvb3AoKTtcclxuICAgICAgfSwgMjAwMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG5cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8vXHJcbi8vRVhQT1JUU1xyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICB0b2dnbGVvZmZPbjogdG9nZ2xlb2ZmT24sXHJcbiAgc3RhcnQ6IHN0YXJ0LFxyXG4gIHN0cmljdE1vZGU6IHN0cmljdE1vZGUsXHJcbiAgdXNlckNvcm5lclByZXNzXHJcbn1cclxuIl19
