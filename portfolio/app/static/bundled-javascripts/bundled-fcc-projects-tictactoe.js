(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//portfolio
//fcc-projects-tictactoe.js

const fccTictactoe = require('./utils/fcc-tictactoe-utils');


resetGame = function() {
  fccTictactoe.resetGame();
}

},{"./utils/fcc-tictactoe-utils":2}],2:[function(require,module,exports){
//portfolio
//fcc-tictactoe-utils.js

//FCC TIC TAC TOE GAME

//********************************************************
//********************************************************

//GAME STATE
var gameData = {
  p1: {
    being: 'Human',
    hasWon: false,
    shape: 'Noughts'
  },
  p2: {
    being: 'Human',
    hasWon: false,
    shape: 'Crosses'
  },
  whoseTurn: 'p1',
  currentStage: 0,
  board: [
    {owner: 'none', row: 0, col: 0},
    {owner: 'none', row: 0, col: 1},
    {owner: 'none', row: 0, col: 2},
    {owner: 'none', row: 1, col: 0},
    {owner: 'none', row: 1, col: 1},
    {owner: 'none', row: 1, col: 2},
    {owner: 'none', row: 2, col: 0},
    {owner: 'none', row: 2, col: 1},
    {owner: 'none', row: 2, col: 2},
  ],
  gameEnded: false
}

//********************************************************
//********************************************************

//RESET
function resetGame() {
  gameData.p1.being = 'Human';
  gameData.p1.hasWon = false;
  gameData.p1.shape = 'Noughts';
  gameData.p2.being = 'Human';
  gameData.p2.hasWon = false;
  gameData.p2.shape = 'Crosses';
  gameData.whoseTurn = 'p1';
  gameData.currentStage = 0;
  gameData.gameEnded = false;
  gameData.board.forEach(function(element) {
    element.owner = 'none';
  });
  wipeScreen();
  renderOptionsScreen();
}

//********************************************************
//********************************************************

//WIPE SCREEN CLEAN
function wipeScreen() {
    while (gameCentral.firstChild) {
      gameCentral.removeChild(gameCentral.firstChild);
    }
    gameCentral.className = '';
    gameCentral.classList.add('gameCentralDefault');
}

//********************************************************
//********************************************************

//UPDATE SCREEN
function updateScreen() {
  checkGameEnded();
  wipeScreen();

  switch (gameData.currentStage) {
    case 0:
      renderOptionsScreen();
      break;
    case 1:
      renderGameBoard();
      break;
    case 2:
      console.log('p1: ' + gameData.p1.hasWon + ' ,p2: ' + gameData.p2.hasWon);
      renderEndGame();
      break;
    default:
      console.log('Entered unexpected stage');
  }

  if (gameData[gameData.whoseTurn].being === 'AI' && gameData.gameEnded === false) {
    window.setTimeout(AITurn, 1000);
  }
}

//********************************************************
//********************************************************

//RENDER OPTIONS SCREEN
function renderOptionsScreen() {
  var gameCentral = document.getElementById('gameCentral');
  var fragment = document.createDocumentFragment();

  var startButton = document.createElement('div');
  var p1Being = document.createElement('div');
  var p2Being = document.createElement('div');
  var p1Shape = document.createElement('div');

  var startButtonText = document.createTextNode('START GAME');
  var p1BeingText = document.createTextNode('P1: ' + gameData.p1.being);
  var p2BeingText = document.createTextNode('P2: ' + gameData.p2.being);
  var p1ShapeText = document.createTextNode('P1: ' + gameData.p1.shape);

  startButton.onclick = function() {
    gameData.currentStage = 1;
    updateScreen();
  }

  p1Being.onclick = function() {
    gameData.p1.being === 'Human' ? gameData.p1.being = 'AI' : gameData.p1.being = 'Human';
    updateScreen();
  }

  p2Being.onclick = function() {
    gameData.p2.being === 'Human' ? gameData.p2.being = 'AI' : gameData.p2.being = 'Human';
    updateScreen();
  }

  p1Shape.onclick = function() {
    gameData.p1.shape === 'Noughts' ? (
      gameData.p1.shape = 'Crosses',
      gameData.p2.shape = 'Noughts'
    ) : (
      gameData.p1.shape = 'Noughts',
      gameData.p2.shape = 'Crosses'
    );
    updateScreen();
  }

  gameCentral.classList.add('gameCentralOptions');
  startButton.classList.add('startButton');
  p1Being.classList.add('optionsButton');
  p2Being.classList.add('optionsButton');
  p1Shape.classList.add('optionsButton');

  startButton.appendChild(startButtonText);
  p1Being.appendChild(p1BeingText);
  p2Being.appendChild(p2BeingText);
  p1Shape.appendChild(p1ShapeText);

  fragment.appendChild(startButton);
  fragment.appendChild(p1Being);
  fragment.appendChild(p2Being);
  fragment.appendChild(p1Shape);
  gameCentral.appendChild(fragment);
}

//********************************************************
//********************************************************

//RENDER GAME BOARD
function renderGameBoard() {
  var gameCentral = document.getElementById('gameCentral');
  var fragment = document.createDocumentFragment();

  var p1Piece;
  var p2Piece;

  var boardSquare;
  var boardSquareShape;
  var boardSquareContent;

  gameData.p1.shape === 'Noughts' ? (
    p1Piece = 'O',
    p2Piece = 'X'
  ) : (
    p1Piece = 'X',
    p2Piece = 'O'
  );

  gameData.board.forEach(function(element, index) {
    boardSquare = document.createElement('div');
    boardSquare.id = 'square' + index;

    if (element.owner === 'none') {
      boardSquareShape = '';
    } else if (element.owner === 'p1') {
      boardSquareShape = p1Piece;
    } else if (element.owner === 'p2') {
      boardSquareShape = p2Piece;
    }

    boardSquare.onclick = function() {
      humanTurn(element.row, element.col);
    }

    boardSquare.classList.add('boardSquare');
    boardSquareContent = document.createTextNode(boardSquareShape);
    boardSquare.appendChild(boardSquareContent);
    fragment.appendChild(boardSquare);
  });

  gameCentral.classList.add('gameCentralPlaying');
  gameCentral.appendChild(fragment);
}

//********************************************************
//********************************************************

//RENDER END GAME SCREEN
function renderEndGame() {
  var gameCentral = document.getElementById('gameCentral');
  var fragment = document.createDocumentFragment();
  var endGameMsgBox = document.createElement('div');
  var msgText = '';
  var msgTextNode;

  if (gameData.p1.hasWon === true) {
    msgText = 'P1 WON!';
  }

  if (gameData.p2.hasWon === true) {
    msgText = 'P2 WON!';
  }

  if (gameData.p1.hasWon === false && gameData.p2.hasWon === false) {
    msgText = 'DRAW!';
  }
  gameCentral.classList.add('gameCentralOptions');
  endGameMsgBox.classList.add('optionsButton');
  msgTextNode = document.createTextNode(msgText);
  endGameMsgBox.appendChild(msgTextNode);
  fragment.appendChild(endGameMsgBox);
  gameCentral.appendChild(fragment);
}

//********************************************************
//********************************************************

//HANDLE USER CLICKING A BOARD SQUARE
function humanTurn(r,c) {
  if (gameData[gameData.whoseTurn].being === 'Human' && gameData.board[(r * 3) + c].owner === 'none') {

    gameData.board[(r * 3) + c].owner = gameData.whoseTurn;
    gameData.whoseTurn === 'p1' ? gameData.whoseTurn = 'p2' : gameData.whoseTurn = 'p1';
    updateScreen();
  }
}

//********************************************************
//********************************************************

//CHECK IF GAME ENDED
function checkGameEnded() {
  //Avoid lines 57km long
  var lowRight = gameData.board[8].owner;
  var midMid = gameData.board[4].owner;
  var upLeft = gameData.board[0].owner;
  var lowLeft = gameData.board[6].owner;
  var upRight = gameData.board[2].owner;
  //Evaluate to true if all 3 squares of a diagonal same owner
  var diagA = (lowRight === midMid ) && (upLeft === midMid) && (midMid !== 'none');
  var diagB = (lowLeft === midMid ) && (upRight === midMid) && (midMid !== 'none');
  //If an element reaches 3 or -3 then a player has won
  var upDownLeftRightWin = [
    0,//top
    0,//middle row
    0,//bottom row
    0,//left col
    0,//midle col
    0//right col
  ];
  var boardFilled = false;


  //Check diagonal victories
  if ( diagA || diagB ) {
    gameData.board[4].owner === 'p1' ? gameData.p1.hasWon = true : gameData.p2.hasWon = true;
  }
  //Check for uppydownyleftyrighty victories
  gameData.board.forEach(function(element) {
    if (element.owner === 'p1') {
      upDownLeftRightWin[element.row]++;
      upDownLeftRightWin[element.col + 3]++;
    } else if (element.owner === 'p2') {
      upDownLeftRightWin[element.row]--;
      upDownLeftRightWin[element.col + 3]--;
    }
  });

  upDownLeftRightWin.forEach(function(element) {
    if (element === 3) {
      gameData.p1.hasWon = true;
    } else if (element === -3) {
      gameData.p2.hasWon = true;
    }
  });

  if (gameData.p1.hasWon === true || gameData.p2.hasWon === true) {
    gameData.currentStage = 2;
    gameData.gameEnded = true;
  }

  //Check no empty squares
  boardFilled = gameData.board.every(function(element) {
    return element.owner !== 'none';
  });

  if (boardFilled) {
    gameData.currentStage = 2;
    gameData.gameEnded = true;
  }
}

//********************************************************
//********************************************************

//TAKE AI's TURN
function AITurn() {
  //work out where the holy blue smeg balls to place piece***
  var hasMoved = false;
  var freeCorner = [0, 2, 6, 8];
  var freeSide = [1, 3, 5, 7];
  //1st 3 elements are squares in gameData.board, 4th element is counter
  //for how close to victory on that line, 3 for this player, -3 for other player
  var possibleWins = [
    [0, 1, 2, 0],
    [3, 4, 5, 0],
    [6, 7, 8, 0],
    [0, 3, 6, 0],
    [1, 4, 7, 0],
    [2, 5, 8, 0],
    [0, 4, 8, 0],
    [2, 4, 6, 0]
  ];
  //4th element in a sub arr of possibleWins will either be 2 or -2 if a win is possible.
  //target is either 2 or -2 depending on if AI is p1 or p2.
  var target;

  gameData.whoseTurn === 'p1' ? target = 2 : target = -2;

  for (let i = 0; i < possibleWins.length; i++) {
    for (let j =0; j < possibleWins[i].length - 1; j++) {
      if (gameData.board[possibleWins[i][j]].owner === 'p1') {
        possibleWins[i][3]++;
      } else if (gameData.board[possibleWins[i][j]].owner === 'p2') {
        possibleWins[i][3]--;
      }
    }
  }
  //win
  for (let i = 0; i < possibleWins.length; i++) {
    if (possibleWins[i][3] === target) {
      for (let j = 0; j < possibleWins[i].length - 1; j++) {
        if (gameData.board[possibleWins[i][j]].owner === 'none' && hasMoved === false) {
          gameData.board[possibleWins[i][j]].owner = gameData.whoseTurn;
          hasMoved = true;
        }
      }
    }
  }
  //block win
  if (hasMoved === false) {
    for (let i = 0; i < possibleWins.length; i++) {
    if (possibleWins[i][3] === target * -1) {
      for (let j = 0; j < possibleWins[i].length - 1; j++) {
        if (gameData.board[possibleWins[i][j]].owner === 'none' && hasMoved === false) {
          gameData.board[possibleWins[i][j]].owner = gameData.whoseTurn;
          hasMoved = true;
        }
      }
    }
  }
}
  //fork
  //Seems unbeatable without adding this
  //block fork
  //Seems unbeatable without adding this
  //center
  if (hasMoved === false && gameData.board[4].owner === 'none') {
    gameData.board[4].owner = gameData.whoseTurn;
    hasMoved = true;
  }
  //opposite corner
  //Seems unbeatable without adding this
  //empty corner
  if (hasMoved === false) {
    for (let i = 0; i < freeCorner.length; i++) {
      if (gameData.board[freeCorner[i]].owner === 'none') {
        gameData.board[freeCorner[i]].owner = gameData.whoseTurn;
        hasMoved = true;
        break;
      }
    }
  }
  //empty side
  if (hasMoved === false) {
    for (let i = 0; i < freeSide.length; i++) {
      if (gameData.board[freeSide[i]].owner === 'none') {
        gameData.board[freeSide[i]].owner = gameData.whoseTurn;
        hasMoved = true;
        break;
      }
    }
  }

  gameData.whoseTurn === 'p1' ? gameData.whoseTurn = 'p2' : gameData.whoseTurn = 'p1';
  updateScreen();
}

//********************************************************
//********************************************************


module.exports = {
  resetGame
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc3RhdGljL3Jhdy1qYXZhc2NyaXB0cy9mY2MtcHJvamVjdHMtdGljdGFjdG9lLmpzIiwiYXBwL3N0YXRpYy9yYXctamF2YXNjcmlwdHMvdXRpbHMvZmNjLXRpY3RhY3RvZS11dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvL3BvcnRmb2xpb1xyXG4vL2ZjYy1wcm9qZWN0cy10aWN0YWN0b2UuanNcclxuXHJcbmNvbnN0IGZjY1RpY3RhY3RvZSA9IHJlcXVpcmUoJy4vdXRpbHMvZmNjLXRpY3RhY3RvZS11dGlscycpO1xyXG5cclxuXHJcbnJlc2V0R2FtZSA9IGZ1bmN0aW9uKCkge1xyXG4gIGZjY1RpY3RhY3RvZS5yZXNldEdhbWUoKTtcclxufVxyXG4iLCIvL3BvcnRmb2xpb1xyXG4vL2ZjYy10aWN0YWN0b2UtdXRpbHMuanNcclxuXHJcbi8vRkNDIFRJQyBUQUMgVE9FIEdBTUVcclxuXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuLy9HQU1FIFNUQVRFXHJcbnZhciBnYW1lRGF0YSA9IHtcclxuICBwMToge1xyXG4gICAgYmVpbmc6ICdIdW1hbicsXHJcbiAgICBoYXNXb246IGZhbHNlLFxyXG4gICAgc2hhcGU6ICdOb3VnaHRzJ1xyXG4gIH0sXHJcbiAgcDI6IHtcclxuICAgIGJlaW5nOiAnSHVtYW4nLFxyXG4gICAgaGFzV29uOiBmYWxzZSxcclxuICAgIHNoYXBlOiAnQ3Jvc3NlcydcclxuICB9LFxyXG4gIHdob3NlVHVybjogJ3AxJyxcclxuICBjdXJyZW50U3RhZ2U6IDAsXHJcbiAgYm9hcmQ6IFtcclxuICAgIHtvd25lcjogJ25vbmUnLCByb3c6IDAsIGNvbDogMH0sXHJcbiAgICB7b3duZXI6ICdub25lJywgcm93OiAwLCBjb2w6IDF9LFxyXG4gICAge293bmVyOiAnbm9uZScsIHJvdzogMCwgY29sOiAyfSxcclxuICAgIHtvd25lcjogJ25vbmUnLCByb3c6IDEsIGNvbDogMH0sXHJcbiAgICB7b3duZXI6ICdub25lJywgcm93OiAxLCBjb2w6IDF9LFxyXG4gICAge293bmVyOiAnbm9uZScsIHJvdzogMSwgY29sOiAyfSxcclxuICAgIHtvd25lcjogJ25vbmUnLCByb3c6IDIsIGNvbDogMH0sXHJcbiAgICB7b3duZXI6ICdub25lJywgcm93OiAyLCBjb2w6IDF9LFxyXG4gICAge293bmVyOiAnbm9uZScsIHJvdzogMiwgY29sOiAyfSxcclxuICBdLFxyXG4gIGdhbWVFbmRlZDogZmFsc2VcclxufVxyXG5cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG4vL1JFU0VUXHJcbmZ1bmN0aW9uIHJlc2V0R2FtZSgpIHtcclxuICBnYW1lRGF0YS5wMS5iZWluZyA9ICdIdW1hbic7XHJcbiAgZ2FtZURhdGEucDEuaGFzV29uID0gZmFsc2U7XHJcbiAgZ2FtZURhdGEucDEuc2hhcGUgPSAnTm91Z2h0cyc7XHJcbiAgZ2FtZURhdGEucDIuYmVpbmcgPSAnSHVtYW4nO1xyXG4gIGdhbWVEYXRhLnAyLmhhc1dvbiA9IGZhbHNlO1xyXG4gIGdhbWVEYXRhLnAyLnNoYXBlID0gJ0Nyb3NzZXMnO1xyXG4gIGdhbWVEYXRhLndob3NlVHVybiA9ICdwMSc7XHJcbiAgZ2FtZURhdGEuY3VycmVudFN0YWdlID0gMDtcclxuICBnYW1lRGF0YS5nYW1lRW5kZWQgPSBmYWxzZTtcclxuICBnYW1lRGF0YS5ib2FyZC5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgIGVsZW1lbnQub3duZXIgPSAnbm9uZSc7XHJcbiAgfSk7XHJcbiAgd2lwZVNjcmVlbigpO1xyXG4gIHJlbmRlck9wdGlvbnNTY3JlZW4oKTtcclxufVxyXG5cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG4vL1dJUEUgU0NSRUVOIENMRUFOXHJcbmZ1bmN0aW9uIHdpcGVTY3JlZW4oKSB7XHJcbiAgICB3aGlsZSAoZ2FtZUNlbnRyYWwuZmlyc3RDaGlsZCkge1xyXG4gICAgICBnYW1lQ2VudHJhbC5yZW1vdmVDaGlsZChnYW1lQ2VudHJhbC5maXJzdENoaWxkKTtcclxuICAgIH1cclxuICAgIGdhbWVDZW50cmFsLmNsYXNzTmFtZSA9ICcnO1xyXG4gICAgZ2FtZUNlbnRyYWwuY2xhc3NMaXN0LmFkZCgnZ2FtZUNlbnRyYWxEZWZhdWx0Jyk7XHJcbn1cclxuXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuLy9VUERBVEUgU0NSRUVOXHJcbmZ1bmN0aW9uIHVwZGF0ZVNjcmVlbigpIHtcclxuICBjaGVja0dhbWVFbmRlZCgpO1xyXG4gIHdpcGVTY3JlZW4oKTtcclxuXHJcbiAgc3dpdGNoIChnYW1lRGF0YS5jdXJyZW50U3RhZ2UpIHtcclxuICAgIGNhc2UgMDpcclxuICAgICAgcmVuZGVyT3B0aW9uc1NjcmVlbigpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMTpcclxuICAgICAgcmVuZGVyR2FtZUJvYXJkKCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAyOlxyXG4gICAgICBjb25zb2xlLmxvZygncDE6ICcgKyBnYW1lRGF0YS5wMS5oYXNXb24gKyAnICxwMjogJyArIGdhbWVEYXRhLnAyLmhhc1dvbik7XHJcbiAgICAgIHJlbmRlckVuZEdhbWUoKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBjb25zb2xlLmxvZygnRW50ZXJlZCB1bmV4cGVjdGVkIHN0YWdlJyk7XHJcbiAgfVxyXG5cclxuICBpZiAoZ2FtZURhdGFbZ2FtZURhdGEud2hvc2VUdXJuXS5iZWluZyA9PT0gJ0FJJyAmJiBnYW1lRGF0YS5nYW1lRW5kZWQgPT09IGZhbHNlKSB7XHJcbiAgICB3aW5kb3cuc2V0VGltZW91dChBSVR1cm4sIDEwMDApO1xyXG4gIH1cclxufVxyXG5cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG4vL1JFTkRFUiBPUFRJT05TIFNDUkVFTlxyXG5mdW5jdGlvbiByZW5kZXJPcHRpb25zU2NyZWVuKCkge1xyXG4gIHZhciBnYW1lQ2VudHJhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lQ2VudHJhbCcpO1xyXG4gIHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgdmFyIHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgdmFyIHAxQmVpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB2YXIgcDJCZWluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIHZhciBwMVNoYXBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gIHZhciBzdGFydEJ1dHRvblRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnU1RBUlQgR0FNRScpO1xyXG4gIHZhciBwMUJlaW5nVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdQMTogJyArIGdhbWVEYXRhLnAxLmJlaW5nKTtcclxuICB2YXIgcDJCZWluZ1RleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnUDI6ICcgKyBnYW1lRGF0YS5wMi5iZWluZyk7XHJcbiAgdmFyIHAxU2hhcGVUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1AxOiAnICsgZ2FtZURhdGEucDEuc2hhcGUpO1xyXG5cclxuICBzdGFydEJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICBnYW1lRGF0YS5jdXJyZW50U3RhZ2UgPSAxO1xyXG4gICAgdXBkYXRlU2NyZWVuKCk7XHJcbiAgfVxyXG5cclxuICBwMUJlaW5nLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgIGdhbWVEYXRhLnAxLmJlaW5nID09PSAnSHVtYW4nID8gZ2FtZURhdGEucDEuYmVpbmcgPSAnQUknIDogZ2FtZURhdGEucDEuYmVpbmcgPSAnSHVtYW4nO1xyXG4gICAgdXBkYXRlU2NyZWVuKCk7XHJcbiAgfVxyXG5cclxuICBwMkJlaW5nLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgIGdhbWVEYXRhLnAyLmJlaW5nID09PSAnSHVtYW4nID8gZ2FtZURhdGEucDIuYmVpbmcgPSAnQUknIDogZ2FtZURhdGEucDIuYmVpbmcgPSAnSHVtYW4nO1xyXG4gICAgdXBkYXRlU2NyZWVuKCk7XHJcbiAgfVxyXG5cclxuICBwMVNoYXBlLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgIGdhbWVEYXRhLnAxLnNoYXBlID09PSAnTm91Z2h0cycgPyAoXHJcbiAgICAgIGdhbWVEYXRhLnAxLnNoYXBlID0gJ0Nyb3NzZXMnLFxyXG4gICAgICBnYW1lRGF0YS5wMi5zaGFwZSA9ICdOb3VnaHRzJ1xyXG4gICAgKSA6IChcclxuICAgICAgZ2FtZURhdGEucDEuc2hhcGUgPSAnTm91Z2h0cycsXHJcbiAgICAgIGdhbWVEYXRhLnAyLnNoYXBlID0gJ0Nyb3NzZXMnXHJcbiAgICApO1xyXG4gICAgdXBkYXRlU2NyZWVuKCk7XHJcbiAgfVxyXG5cclxuICBnYW1lQ2VudHJhbC5jbGFzc0xpc3QuYWRkKCdnYW1lQ2VudHJhbE9wdGlvbnMnKTtcclxuICBzdGFydEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdzdGFydEJ1dHRvbicpO1xyXG4gIHAxQmVpbmcuY2xhc3NMaXN0LmFkZCgnb3B0aW9uc0J1dHRvbicpO1xyXG4gIHAyQmVpbmcuY2xhc3NMaXN0LmFkZCgnb3B0aW9uc0J1dHRvbicpO1xyXG4gIHAxU2hhcGUuY2xhc3NMaXN0LmFkZCgnb3B0aW9uc0J1dHRvbicpO1xyXG5cclxuICBzdGFydEJ1dHRvbi5hcHBlbmRDaGlsZChzdGFydEJ1dHRvblRleHQpO1xyXG4gIHAxQmVpbmcuYXBwZW5kQ2hpbGQocDFCZWluZ1RleHQpO1xyXG4gIHAyQmVpbmcuYXBwZW5kQ2hpbGQocDJCZWluZ1RleHQpO1xyXG4gIHAxU2hhcGUuYXBwZW5kQ2hpbGQocDFTaGFwZVRleHQpO1xyXG5cclxuICBmcmFnbWVudC5hcHBlbmRDaGlsZChzdGFydEJ1dHRvbik7XHJcbiAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQocDFCZWluZyk7XHJcbiAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQocDJCZWluZyk7XHJcbiAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQocDFTaGFwZSk7XHJcbiAgZ2FtZUNlbnRyYWwuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG59XHJcblxyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbi8vUkVOREVSIEdBTUUgQk9BUkRcclxuZnVuY3Rpb24gcmVuZGVyR2FtZUJvYXJkKCkge1xyXG4gIHZhciBnYW1lQ2VudHJhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lQ2VudHJhbCcpO1xyXG4gIHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgdmFyIHAxUGllY2U7XHJcbiAgdmFyIHAyUGllY2U7XHJcblxyXG4gIHZhciBib2FyZFNxdWFyZTtcclxuICB2YXIgYm9hcmRTcXVhcmVTaGFwZTtcclxuICB2YXIgYm9hcmRTcXVhcmVDb250ZW50O1xyXG5cclxuICBnYW1lRGF0YS5wMS5zaGFwZSA9PT0gJ05vdWdodHMnID8gKFxyXG4gICAgcDFQaWVjZSA9ICdPJyxcclxuICAgIHAyUGllY2UgPSAnWCdcclxuICApIDogKFxyXG4gICAgcDFQaWVjZSA9ICdYJyxcclxuICAgIHAyUGllY2UgPSAnTydcclxuICApO1xyXG5cclxuICBnYW1lRGF0YS5ib2FyZC5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQsIGluZGV4KSB7XHJcbiAgICBib2FyZFNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgYm9hcmRTcXVhcmUuaWQgPSAnc3F1YXJlJyArIGluZGV4O1xyXG5cclxuICAgIGlmIChlbGVtZW50Lm93bmVyID09PSAnbm9uZScpIHtcclxuICAgICAgYm9hcmRTcXVhcmVTaGFwZSA9ICcnO1xyXG4gICAgfSBlbHNlIGlmIChlbGVtZW50Lm93bmVyID09PSAncDEnKSB7XHJcbiAgICAgIGJvYXJkU3F1YXJlU2hhcGUgPSBwMVBpZWNlO1xyXG4gICAgfSBlbHNlIGlmIChlbGVtZW50Lm93bmVyID09PSAncDInKSB7XHJcbiAgICAgIGJvYXJkU3F1YXJlU2hhcGUgPSBwMlBpZWNlO1xyXG4gICAgfVxyXG5cclxuICAgIGJvYXJkU3F1YXJlLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgaHVtYW5UdXJuKGVsZW1lbnQucm93LCBlbGVtZW50LmNvbCk7XHJcbiAgICB9XHJcblxyXG4gICAgYm9hcmRTcXVhcmUuY2xhc3NMaXN0LmFkZCgnYm9hcmRTcXVhcmUnKTtcclxuICAgIGJvYXJkU3F1YXJlQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGJvYXJkU3F1YXJlU2hhcGUpO1xyXG4gICAgYm9hcmRTcXVhcmUuYXBwZW5kQ2hpbGQoYm9hcmRTcXVhcmVDb250ZW50KTtcclxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGJvYXJkU3F1YXJlKTtcclxuICB9KTtcclxuXHJcbiAgZ2FtZUNlbnRyYWwuY2xhc3NMaXN0LmFkZCgnZ2FtZUNlbnRyYWxQbGF5aW5nJyk7XHJcbiAgZ2FtZUNlbnRyYWwuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG59XHJcblxyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbi8vUkVOREVSIEVORCBHQU1FIFNDUkVFTlxyXG5mdW5jdGlvbiByZW5kZXJFbmRHYW1lKCkge1xyXG4gIHZhciBnYW1lQ2VudHJhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lQ2VudHJhbCcpO1xyXG4gIHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICB2YXIgZW5kR2FtZU1zZ0JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIHZhciBtc2dUZXh0ID0gJyc7XHJcbiAgdmFyIG1zZ1RleHROb2RlO1xyXG5cclxuICBpZiAoZ2FtZURhdGEucDEuaGFzV29uID09PSB0cnVlKSB7XHJcbiAgICBtc2dUZXh0ID0gJ1AxIFdPTiEnO1xyXG4gIH1cclxuXHJcbiAgaWYgKGdhbWVEYXRhLnAyLmhhc1dvbiA9PT0gdHJ1ZSkge1xyXG4gICAgbXNnVGV4dCA9ICdQMiBXT04hJztcclxuICB9XHJcblxyXG4gIGlmIChnYW1lRGF0YS5wMS5oYXNXb24gPT09IGZhbHNlICYmIGdhbWVEYXRhLnAyLmhhc1dvbiA9PT0gZmFsc2UpIHtcclxuICAgIG1zZ1RleHQgPSAnRFJBVyEnO1xyXG4gIH1cclxuICBnYW1lQ2VudHJhbC5jbGFzc0xpc3QuYWRkKCdnYW1lQ2VudHJhbE9wdGlvbnMnKTtcclxuICBlbmRHYW1lTXNnQm94LmNsYXNzTGlzdC5hZGQoJ29wdGlvbnNCdXR0b24nKTtcclxuICBtc2dUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG1zZ1RleHQpO1xyXG4gIGVuZEdhbWVNc2dCb3guYXBwZW5kQ2hpbGQobXNnVGV4dE5vZGUpO1xyXG4gIGZyYWdtZW50LmFwcGVuZENoaWxkKGVuZEdhbWVNc2dCb3gpO1xyXG4gIGdhbWVDZW50cmFsLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxufVxyXG5cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG4vL0hBTkRMRSBVU0VSIENMSUNLSU5HIEEgQk9BUkQgU1FVQVJFXHJcbmZ1bmN0aW9uIGh1bWFuVHVybihyLGMpIHtcclxuICBpZiAoZ2FtZURhdGFbZ2FtZURhdGEud2hvc2VUdXJuXS5iZWluZyA9PT0gJ0h1bWFuJyAmJiBnYW1lRGF0YS5ib2FyZFsociAqIDMpICsgY10ub3duZXIgPT09ICdub25lJykge1xyXG5cclxuICAgIGdhbWVEYXRhLmJvYXJkWyhyICogMykgKyBjXS5vd25lciA9IGdhbWVEYXRhLndob3NlVHVybjtcclxuICAgIGdhbWVEYXRhLndob3NlVHVybiA9PT0gJ3AxJyA/IGdhbWVEYXRhLndob3NlVHVybiA9ICdwMicgOiBnYW1lRGF0YS53aG9zZVR1cm4gPSAncDEnO1xyXG4gICAgdXBkYXRlU2NyZWVuKCk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbi8vQ0hFQ0sgSUYgR0FNRSBFTkRFRFxyXG5mdW5jdGlvbiBjaGVja0dhbWVFbmRlZCgpIHtcclxuICAvL0F2b2lkIGxpbmVzIDU3a20gbG9uZ1xyXG4gIHZhciBsb3dSaWdodCA9IGdhbWVEYXRhLmJvYXJkWzhdLm93bmVyO1xyXG4gIHZhciBtaWRNaWQgPSBnYW1lRGF0YS5ib2FyZFs0XS5vd25lcjtcclxuICB2YXIgdXBMZWZ0ID0gZ2FtZURhdGEuYm9hcmRbMF0ub3duZXI7XHJcbiAgdmFyIGxvd0xlZnQgPSBnYW1lRGF0YS5ib2FyZFs2XS5vd25lcjtcclxuICB2YXIgdXBSaWdodCA9IGdhbWVEYXRhLmJvYXJkWzJdLm93bmVyO1xyXG4gIC8vRXZhbHVhdGUgdG8gdHJ1ZSBpZiBhbGwgMyBzcXVhcmVzIG9mIGEgZGlhZ29uYWwgc2FtZSBvd25lclxyXG4gIHZhciBkaWFnQSA9IChsb3dSaWdodCA9PT0gbWlkTWlkICkgJiYgKHVwTGVmdCA9PT0gbWlkTWlkKSAmJiAobWlkTWlkICE9PSAnbm9uZScpO1xyXG4gIHZhciBkaWFnQiA9IChsb3dMZWZ0ID09PSBtaWRNaWQgKSAmJiAodXBSaWdodCA9PT0gbWlkTWlkKSAmJiAobWlkTWlkICE9PSAnbm9uZScpO1xyXG4gIC8vSWYgYW4gZWxlbWVudCByZWFjaGVzIDMgb3IgLTMgdGhlbiBhIHBsYXllciBoYXMgd29uXHJcbiAgdmFyIHVwRG93bkxlZnRSaWdodFdpbiA9IFtcclxuICAgIDAsLy90b3BcclxuICAgIDAsLy9taWRkbGUgcm93XHJcbiAgICAwLC8vYm90dG9tIHJvd1xyXG4gICAgMCwvL2xlZnQgY29sXHJcbiAgICAwLC8vbWlkbGUgY29sXHJcbiAgICAwLy9yaWdodCBjb2xcclxuICBdO1xyXG4gIHZhciBib2FyZEZpbGxlZCA9IGZhbHNlO1xyXG5cclxuXHJcbiAgLy9DaGVjayBkaWFnb25hbCB2aWN0b3JpZXNcclxuICBpZiAoIGRpYWdBIHx8IGRpYWdCICkge1xyXG4gICAgZ2FtZURhdGEuYm9hcmRbNF0ub3duZXIgPT09ICdwMScgPyBnYW1lRGF0YS5wMS5oYXNXb24gPSB0cnVlIDogZ2FtZURhdGEucDIuaGFzV29uID0gdHJ1ZTtcclxuICB9XHJcbiAgLy9DaGVjayBmb3IgdXBweWRvd255bGVmdHlyaWdodHkgdmljdG9yaWVzXHJcbiAgZ2FtZURhdGEuYm9hcmQuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICBpZiAoZWxlbWVudC5vd25lciA9PT0gJ3AxJykge1xyXG4gICAgICB1cERvd25MZWZ0UmlnaHRXaW5bZWxlbWVudC5yb3ddKys7XHJcbiAgICAgIHVwRG93bkxlZnRSaWdodFdpbltlbGVtZW50LmNvbCArIDNdKys7XHJcbiAgICB9IGVsc2UgaWYgKGVsZW1lbnQub3duZXIgPT09ICdwMicpIHtcclxuICAgICAgdXBEb3duTGVmdFJpZ2h0V2luW2VsZW1lbnQucm93XS0tO1xyXG4gICAgICB1cERvd25MZWZ0UmlnaHRXaW5bZWxlbWVudC5jb2wgKyAzXS0tO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICB1cERvd25MZWZ0UmlnaHRXaW4uZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICBpZiAoZWxlbWVudCA9PT0gMykge1xyXG4gICAgICBnYW1lRGF0YS5wMS5oYXNXb24gPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmIChlbGVtZW50ID09PSAtMykge1xyXG4gICAgICBnYW1lRGF0YS5wMi5oYXNXb24gPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBpZiAoZ2FtZURhdGEucDEuaGFzV29uID09PSB0cnVlIHx8IGdhbWVEYXRhLnAyLmhhc1dvbiA9PT0gdHJ1ZSkge1xyXG4gICAgZ2FtZURhdGEuY3VycmVudFN0YWdlID0gMjtcclxuICAgIGdhbWVEYXRhLmdhbWVFbmRlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICAvL0NoZWNrIG5vIGVtcHR5IHNxdWFyZXNcclxuICBib2FyZEZpbGxlZCA9IGdhbWVEYXRhLmJvYXJkLmV2ZXJ5KGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgIHJldHVybiBlbGVtZW50Lm93bmVyICE9PSAnbm9uZSc7XHJcbiAgfSk7XHJcblxyXG4gIGlmIChib2FyZEZpbGxlZCkge1xyXG4gICAgZ2FtZURhdGEuY3VycmVudFN0YWdlID0gMjtcclxuICAgIGdhbWVEYXRhLmdhbWVFbmRlZCA9IHRydWU7XHJcbiAgfVxyXG59XHJcblxyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbi8vVEFLRSBBSSdzIFRVUk5cclxuZnVuY3Rpb24gQUlUdXJuKCkge1xyXG4gIC8vd29yayBvdXQgd2hlcmUgdGhlIGhvbHkgYmx1ZSBzbWVnIGJhbGxzIHRvIHBsYWNlIHBpZWNlKioqXHJcbiAgdmFyIGhhc01vdmVkID0gZmFsc2U7XHJcbiAgdmFyIGZyZWVDb3JuZXIgPSBbMCwgMiwgNiwgOF07XHJcbiAgdmFyIGZyZWVTaWRlID0gWzEsIDMsIDUsIDddO1xyXG4gIC8vMXN0IDMgZWxlbWVudHMgYXJlIHNxdWFyZXMgaW4gZ2FtZURhdGEuYm9hcmQsIDR0aCBlbGVtZW50IGlzIGNvdW50ZXJcclxuICAvL2ZvciBob3cgY2xvc2UgdG8gdmljdG9yeSBvbiB0aGF0IGxpbmUsIDMgZm9yIHRoaXMgcGxheWVyLCAtMyBmb3Igb3RoZXIgcGxheWVyXHJcbiAgdmFyIHBvc3NpYmxlV2lucyA9IFtcclxuICAgIFswLCAxLCAyLCAwXSxcclxuICAgIFszLCA0LCA1LCAwXSxcclxuICAgIFs2LCA3LCA4LCAwXSxcclxuICAgIFswLCAzLCA2LCAwXSxcclxuICAgIFsxLCA0LCA3LCAwXSxcclxuICAgIFsyLCA1LCA4LCAwXSxcclxuICAgIFswLCA0LCA4LCAwXSxcclxuICAgIFsyLCA0LCA2LCAwXVxyXG4gIF07XHJcbiAgLy80dGggZWxlbWVudCBpbiBhIHN1YiBhcnIgb2YgcG9zc2libGVXaW5zIHdpbGwgZWl0aGVyIGJlIDIgb3IgLTIgaWYgYSB3aW4gaXMgcG9zc2libGUuXHJcbiAgLy90YXJnZXQgaXMgZWl0aGVyIDIgb3IgLTIgZGVwZW5kaW5nIG9uIGlmIEFJIGlzIHAxIG9yIHAyLlxyXG4gIHZhciB0YXJnZXQ7XHJcblxyXG4gIGdhbWVEYXRhLndob3NlVHVybiA9PT0gJ3AxJyA/IHRhcmdldCA9IDIgOiB0YXJnZXQgPSAtMjtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3NzaWJsZVdpbnMubGVuZ3RoOyBpKyspIHtcclxuICAgIGZvciAobGV0IGogPTA7IGogPCBwb3NzaWJsZVdpbnNbaV0ubGVuZ3RoIC0gMTsgaisrKSB7XHJcbiAgICAgIGlmIChnYW1lRGF0YS5ib2FyZFtwb3NzaWJsZVdpbnNbaV1bal1dLm93bmVyID09PSAncDEnKSB7XHJcbiAgICAgICAgcG9zc2libGVXaW5zW2ldWzNdKys7XHJcbiAgICAgIH0gZWxzZSBpZiAoZ2FtZURhdGEuYm9hcmRbcG9zc2libGVXaW5zW2ldW2pdXS5vd25lciA9PT0gJ3AyJykge1xyXG4gICAgICAgIHBvc3NpYmxlV2luc1tpXVszXS0tO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vd2luXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3NzaWJsZVdpbnMubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmIChwb3NzaWJsZVdpbnNbaV1bM10gPT09IHRhcmdldCkge1xyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHBvc3NpYmxlV2luc1tpXS5sZW5ndGggLSAxOyBqKyspIHtcclxuICAgICAgICBpZiAoZ2FtZURhdGEuYm9hcmRbcG9zc2libGVXaW5zW2ldW2pdXS5vd25lciA9PT0gJ25vbmUnICYmIGhhc01vdmVkID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgZ2FtZURhdGEuYm9hcmRbcG9zc2libGVXaW5zW2ldW2pdXS5vd25lciA9IGdhbWVEYXRhLndob3NlVHVybjtcclxuICAgICAgICAgIGhhc01vdmVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgLy9ibG9jayB3aW5cclxuICBpZiAoaGFzTW92ZWQgPT09IGZhbHNlKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvc3NpYmxlV2lucy5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKHBvc3NpYmxlV2luc1tpXVszXSA9PT0gdGFyZ2V0ICogLTEpIHtcclxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBwb3NzaWJsZVdpbnNbaV0ubGVuZ3RoIC0gMTsgaisrKSB7XHJcbiAgICAgICAgaWYgKGdhbWVEYXRhLmJvYXJkW3Bvc3NpYmxlV2luc1tpXVtqXV0ub3duZXIgPT09ICdub25lJyAmJiBoYXNNb3ZlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIGdhbWVEYXRhLmJvYXJkW3Bvc3NpYmxlV2luc1tpXVtqXV0ub3duZXIgPSBnYW1lRGF0YS53aG9zZVR1cm47XHJcbiAgICAgICAgICBoYXNNb3ZlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiAgLy9mb3JrXHJcbiAgLy9TZWVtcyB1bmJlYXRhYmxlIHdpdGhvdXQgYWRkaW5nIHRoaXNcclxuICAvL2Jsb2NrIGZvcmtcclxuICAvL1NlZW1zIHVuYmVhdGFibGUgd2l0aG91dCBhZGRpbmcgdGhpc1xyXG4gIC8vY2VudGVyXHJcbiAgaWYgKGhhc01vdmVkID09PSBmYWxzZSAmJiBnYW1lRGF0YS5ib2FyZFs0XS5vd25lciA9PT0gJ25vbmUnKSB7XHJcbiAgICBnYW1lRGF0YS5ib2FyZFs0XS5vd25lciA9IGdhbWVEYXRhLndob3NlVHVybjtcclxuICAgIGhhc01vdmVkID0gdHJ1ZTtcclxuICB9XHJcbiAgLy9vcHBvc2l0ZSBjb3JuZXJcclxuICAvL1NlZW1zIHVuYmVhdGFibGUgd2l0aG91dCBhZGRpbmcgdGhpc1xyXG4gIC8vZW1wdHkgY29ybmVyXHJcbiAgaWYgKGhhc01vdmVkID09PSBmYWxzZSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmcmVlQ29ybmVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChnYW1lRGF0YS5ib2FyZFtmcmVlQ29ybmVyW2ldXS5vd25lciA9PT0gJ25vbmUnKSB7XHJcbiAgICAgICAgZ2FtZURhdGEuYm9hcmRbZnJlZUNvcm5lcltpXV0ub3duZXIgPSBnYW1lRGF0YS53aG9zZVR1cm47XHJcbiAgICAgICAgaGFzTW92ZWQgPSB0cnVlO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vZW1wdHkgc2lkZVxyXG4gIGlmIChoYXNNb3ZlZCA9PT0gZmFsc2UpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnJlZVNpZGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGdhbWVEYXRhLmJvYXJkW2ZyZWVTaWRlW2ldXS5vd25lciA9PT0gJ25vbmUnKSB7XHJcbiAgICAgICAgZ2FtZURhdGEuYm9hcmRbZnJlZVNpZGVbaV1dLm93bmVyID0gZ2FtZURhdGEud2hvc2VUdXJuO1xyXG4gICAgICAgIGhhc01vdmVkID0gdHJ1ZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2FtZURhdGEud2hvc2VUdXJuID09PSAncDEnID8gZ2FtZURhdGEud2hvc2VUdXJuID0gJ3AyJyA6IGdhbWVEYXRhLndob3NlVHVybiA9ICdwMSc7XHJcbiAgdXBkYXRlU2NyZWVuKCk7XHJcbn1cclxuXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIHJlc2V0R2FtZVxyXG59XHJcbiJdfQ==
