(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// portfolio
// animation-bouncing-colored-dots.js

//passed in via opts
let canvas;
let nCircles;
let radius;
let areaOfEffect;
//later expose to opts
let defaultCircleColor = [255, 255, 255];
let targetCircleColor1 = [255, 0, 0];
let targetCircleColor2 = [0, 255, 0];
let targetCircleColor3 = [0, 0, 255];
//calculated
let ctx;
let canvasWidth;
let canvasHeight;
let frameId;
let isPaused = false;
//animated objects
let circlesArr = [];
let targetCirclesArr = [];

//------------------------------------------------------------exported functions
function init(opts) {
  cancelAnimation();
  clearArrays();
  canvas = document.getElementById(opts.canvas);
  nCircles = opts.nCircles;
  radius = opts.radius;
  areaOfEffect = opts.areaOfEffect;
  ctx = canvas.getContext('2d');
  canvasWidth = canvas.width;
  canvasHeight = canvas.height;
  initCircleArr();
  initTargetCirclesArr();
}

function animate() {
  isPaused = false;
  frameId = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  for (let i = 0; i < circlesArr.length; i++) {
    circlesArr[i].updatePos();
    circlesArr[i].updateColor();
    circlesArr[i].draw();
  }
  for (let i = 0; i < targetCirclesArr.length; i++) {
    targetCirclesArr[i].draw();
    targetCirclesArr[i].updatePos();
  }
}

function cancelAnimation() {
  cancelAnimationFrame(frameId);
  isPaused = true;
}

function toggleRunAnimation() {
  isPaused === false ?( isPaused = true, cancelAnimation() ) : ( isPaused = false, animate()  );
  return isPaused;
}

//------------------------------------------------------------internal functions
function clearArrays() {
  circlesArr.length = 0;
  targetCirclesArr.length = 0;
}

function initCircleArr() {
  for (let i = 0; i < nCircles; i++) {
    let x = Math.random() * (canvasWidth - radius * 2) + radius;
    let y = Math.random() * (canvasHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 6;
    let dy = (Math.random() - 0.5) * 6;
    circlesArr.push( new Circle(x, y, dx, dy, radius, defaultCircleColor.slice() ) );
  }
}

function initTargetCirclesArr() {
  targetCirclesArr.push( new Circle(50, 75, 2, 3, 12, targetCircleColor1) );
  targetCirclesArr.push( new Circle(90, 40, 3, -2, 12, targetCircleColor2) );
  targetCirclesArr.push( new Circle(120, 105, -2, -3, 12, targetCircleColor3) );
}

//constructor for Circle objects
function Circle(x, y, dx, dy, radius, colorArr) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.colorArr = colorArr;
  this.color = 'rgb(' + this.colorArr[0] + ', ' + this.colorArr[1] + ', ' + this.colorArr[2] + ')';
}
Circle.prototype.constructor = Circle;

Circle.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = this.color;
  ctx.fill();
}

Circle.prototype.updatePos = function() {
  if (this.x + radius > canvasWidth || this.x - radius < 0) {this.dx = -this.dx};
  if (this.y + radius > canvasHeight || this.y - radius < 0) {this.dy = -this.dy};
  this.x += this.dx;
  this.y += this.dy;
}

Circle.prototype.updateColor= function() {
  var nEffectedBy = 0;
  for (let i = 0; i < targetCirclesArr.length; i++) {
    let distanceBetween = Math.sqrt( Math.pow( (this.x - targetCirclesArr[i].x), 2) + Math.pow( (this.y - targetCirclesArr[i].y), 2) );
    if (distanceBetween < areaOfEffect) {
      if (nEffectedBy == 0) {
        this.colorArr[0] = targetCirclesArr[i].colorArr[0];
        this.colorArr[1] = targetCirclesArr[i].colorArr[1];
        this.colorArr[2] = targetCirclesArr[i].colorArr[2];
      } else {
        this.colorArr[0] = Math.round( (this.colorArr[0] + targetCirclesArr[i].colorArr[0]) / nEffectedBy );
        this.colorArr[1] = Math.round( (this.colorArr[1] + targetCirclesArr[i].colorArr[1]) / nEffectedBy );
        this.colorArr[2] = Math.round( (this.colorArr[2] + targetCirclesArr[i].colorArr[2]) / nEffectedBy );
      }
      nEffectedBy++;
    }
  }
  if (nEffectedBy == 0) {
    this.colorArr = defaultCircleColor.slice();
  }
  this.color = 'rgb(' + this.colorArr[0] + ', ' + this.colorArr[1] + ', ' + this.colorArr[2] + ')';
}

//-----------------------------------------------------------------------exports
exports.init = init;
exports.animate = animate;
exports.cancelAnimation = cancelAnimation;
exports.toggleRunAnimation = toggleRunAnimation;

},{}],2:[function(require,module,exports){
// portfolio
// animation-lozenge-spirrograph.js

const animationUtils = require('./animation-utils');

//state
let canvas;
let ctx;
let frameId;
let isPaused;
let lozengeRadius;
let lozengeLineWidth;
let speed;
let strokeColor = '#16305b';
let fillColor = 'transparent';
//animated objects
let movingLozenges = [];

//------------------------------------------------------------exported functions
function init(opts) {
  canvas = document.getElementById(opts.canvas);
  ctx = canvas.getContext('2d');
  cancelAnimation();
  movingLozenges.length = 0;
  isPaused = false;
  lozengeRadius = Math.round(canvas.width / 20);
  lozengeLineWidth = Math.round(canvas.width / 40);
  speed = Math.round(canvas.width / 400);
  movingLozengesInit()
}

function animate() {
  isPaused = false;
  frameId = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  movingLozenges.forEach(function(element) {
    element.updatePos();
    element.draw();
  });
  ctx.beginPath();
  ctx.lineWidth = lozengeLineWidth;
  ctx.strokeStyle = strokeColor;
  ctx.fillStyle = fillColor;
  animationUtils.drawLozenge(ctx, movingLozenges[0].x1, movingLozenges[0].y1, movingLozenges[1].x1, movingLozenges[1].y1, lozengeRadius);
  animationUtils.drawLozenge(ctx, movingLozenges[0].x2, movingLozenges[0].y2, movingLozenges[1].x2, movingLozenges[1].y2, lozengeRadius);
  animationUtils.drawLozenge(ctx, movingLozenges[2].x1, movingLozenges[2].y1, movingLozenges[3].x1, movingLozenges[3].y1, lozengeRadius);
  animationUtils.drawLozenge(ctx, movingLozenges[2].x2, movingLozenges[2].y2, movingLozenges[3].x2, movingLozenges[3].y2, lozengeRadius);
  ctx.stroke();
  ctx.fill();
}

function cancelAnimation() {
  cancelAnimationFrame(frameId);
  isPaused = true;
}

function reverseDX() {
  console.log('reverseDX');
  movingLozenges.forEach(function(element) {
    element.dx1 = -element.dx1;
    element.dx2 = -element.dx2;
  });
}

function reverseDY() {
  movingLozenges.forEach(function(element) {
    element.dy1 = -element.dy1;
    element.dy2 = -element.dy2;
  });
}

function switchXY() {
  movingLozenges.forEach(function(element){
    let x1 = element.x1;
    let y1 = element.y1;
    let x2 = element.x2;
    let y2 = element.y2;
    let dx1 = element.dx1;
    let dy1 = element.dy1;
    let dx2 = element.dx2;
    let dy2 = element.dy2;
    element.x1 = y1;
    element.y1 = x1;
    element.x2 = y2;
    element.y2 = x2;
    element.dx1 = dy1;
    element.dy1 = dx1;
    element.dx2 = dy2;
    element.dy2 = dx2;
  });
}

//------------------------------------------------------------internal functions
//movingLozenges initialiser
function movingLozengesInit() {
  movingLozenges.push( new MovingLozenge(lozengeRadius, canvas.height / 2, canvas.width / 2, canvas.height - lozengeRadius, speed, -speed, speed, -speed) );
  movingLozenges.push( new MovingLozenge(canvas.width -lozengeRadius, canvas.height / 2, canvas.width / 2, canvas.height - lozengeRadius, -speed, -speed, -speed, -speed) );
  movingLozenges.push( new MovingLozenge(lozengeRadius, canvas.height / 2, canvas.width / 2, lozengeRadius, speed, speed, speed, speed) );
  movingLozenges.push( new MovingLozenge(canvas.width - lozengeRadius, canvas.height / 2, canvas.width / 2, lozengeRadius, -speed, speed, -speed, speed) );
}

//constructor for MovingLozenge
function MovingLozenge(x1, y1, x2, y2, dx1, dy1, dx2, dy2) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  this.dx1 = dx1;
  this.dy1 = dy1;
  this.dx2 = dx2;
  this.dy2 = dy2;
}
MovingLozenge.prototype.constructor = MovingLozenge;

MovingLozenge.prototype.updatePos = function() {
  if (this.x1 + lozengeRadius > canvas.width || this.x1 - lozengeRadius < 0) {this.dx1 = -this.dx1};
  if (this.y1 + lozengeRadius > canvas.height || this.y1 - lozengeRadius < 0) {this.dy1 = -this.dy1};
  if (this.x2 + lozengeRadius > canvas.width || this.x2 - lozengeRadius < 0) {this.dx2 = -this.dx2};
  if (this.y2 + lozengeRadius > canvas.height || this.y2 - lozengeRadius < 0) {this.dy2 = -this.dy2};
  this.x1 += this.dx1;
  this.y1 += this.dy1;
  this.x2 += this.dx2;
  this.y2 += this.dy2;
}

MovingLozenge.prototype.draw = function() {
  ctx.beginPath();
  ctx.lineWidth = lozengeLineWidth;
  ctx.strokeStyle = strokeColor;
  ctx.fillStyle = fillColor;
  animationUtils.drawLozenge(ctx, this.x1, this.y1, this.x2, this.y2, lozengeRadius);
  ctx.stroke();
  ctx.fill();
}

//-----------------------------------------------------------------------exports
exports.init =init;
exports.animate = animate;
exports.cancelAnimation = cancelAnimation;
//temp
exports.reverseDX = reverseDX;
exports.reverseDY = reverseDY;
exports.switchXY = switchXY;

},{"./animation-utils":5}],3:[function(require,module,exports){
// portfolio
// animation-lozenge-tester.js

const animationUtils = require('./animation-utils');

//state
let canvas;
let ctx;

//------------------------------------------------------------exported functions
function init(opts) {
  canvas = document.getElementById(opts.canvas);
  ctx = canvas.getContext('2d');
  let x1 = opts.x1;
  let y1 = opts.y1;
  let x2 = opts.x2;
  let y2 = opts.y2;
  ctx.clearRect(0, 0, 400, 400);
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.strokeStyle = '#000000';
  ctx.fillStyle = 'transparent';
  animationUtils.drawLozenge(ctx, x1, y1, x2, y2, 20);
  ctx.stroke();
  ctx.fill();
}
//------------------------------------------------------------internal functions

//-----------------------------------------------------------------------exports
exports.init = init;

},{"./animation-utils":5}],4:[function(require,module,exports){
// portfolio
// animation-mechanical-letters.js

//passed in via opts
let canvas;
let str;
//later expose to opts
const colorOne = '#d18017';
const colorTwo = '#8b8d91';
const colorThree = '#ffffff';//temp
const overallAnimationSpeed = 1;
const letterPadding = 7; // As a ratio of letterWidth & letterHeight
const letterLineWidthRatio = 8;
//calculated
let ctx;
let letterWidth;
let letterHeight;
let frameId;
let isPaused = false;
//animated objects
let mechLettersArr = [];
let letterLineWidth;

//------------------------------------------------------------exported functions
function init(opts) {
  cancelAnimation();
  clearArrays();
  canvas = document.getElementById(opts.canvas);
  str = opts.str;
  ctx = canvas.getContext('2d');
  letterWidth = Math.round(canvas.width / opts.str.length);
  letterHeight = canvas.height;
  letterLineWidth = Math.round(letterWidth / letterLineWidthRatio);
  mechLettersArr = initMechLettersArr(opts.str);
}

function animate() {
  isPaused = false;
  frameId = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var nPaused = 0;
  for (let i = 0; i < mechLettersArr.length; i++) {
    mechLettersArr[i].animateLetter();
    mechLettersArr[i].draw();
    if (mechLettersArr[i].paused == true) {nPaused++;}
  }
  if (nPaused == mechLettersArr.length) {cancelAnimation();}
}

function cancelAnimation() {
  cancelAnimationFrame(frameId);
  isPaused = true;
}

function toggleRunAnimation() {
  isPaused === false ?( isPaused = true, cancelAnimation() ) : ( isPaused = false, animate()  );
  return isPaused;
}

//------------------------------------------------------------internal functions
function clearArrays() {
  mechLettersArr.length = 0;
}

function initMechLettersArr(str) {
  let arr = [];
  arr.length = 0;
  for (let i =0; i < str.length; i++) {
    switch (str[i]) {
      case 'h':
      arr.push( new LetterH(i * letterWidth) );
      break;
    }
  }
  return arr;
}

//constructor for prototype of base Letter object
function Letter() {
  this.nMovementsBeforePause = 1;
  this.individualAnimationSpeed = 1;
  this.speed = overallAnimationSpeed * this.individualAnimationSpeed;
  this.nMovements = 0;
  this.paused = false;
}
Letter.prototype.constructor = Letter;

Letter.prototype.calcEdges = function(offset) {
  let edges = {
    left: offset + (letterWidth / letterPadding),
    right: offset + letterWidth - (letterWidth / letterPadding),
    top: letterHeight / letterPadding,
    bottom: letterHeight - (letterHeight / letterPadding)
  };
  return edges;
}

//constructor for the letter 'H' objects
function LetterH(offset) {
  Letter.call(this);
  let edges = this.calcEdges(offset);
  //overwrite prototype properties if want different values from defaults
  this.nMovementsBeforePause = 3;
  //randomise animation direction
  if (Math.random() >= 0.5) {this.speed = -this.speed;}
  //vertex definitions
  this.leftVerticalP1 = { x: edges.left, y: edges.bottom };
  this.leftVerticalP2 = { x: edges.left, y: edges.top };
  this.leftVerticalP3 = { x: edges.left + letterLineWidth, y: edges.top };
  this.leftVerticalP4 = { x: edges.left + letterLineWidth, y: edges.bottom };

  this.rightVerticalP1 = { x: edges.right - letterLineWidth, y: edges.bottom };
  this.rightVerticalP2 = { x: edges.right - letterLineWidth, y: edges.top };
  this.rightVerticalP3 = { x: edges.right, y: edges.top };
  this.rightVerticalP4 = { x: edges.right, y: edges.bottom };

  this.horizontalP1 = { x: edges.left + letterLineWidth, y: (letterHeight / 2) - (letterLineWidth / 2) };
  this.horizontalP2 = { x: edges.left + letterLineWidth, y: (letterHeight / 2) + (letterLineWidth / 2) };
  this.horizontalP3 = { x: edges.right - letterLineWidth, y: (letterHeight / 2) + (letterLineWidth / 2) };
  this.horizontalP4 = { x: edges.right - letterLineWidth, y: (letterHeight / 2) - (letterLineWidth / 2) };
}
LetterH.prototype = Object.create(Letter.prototype);
LetterH.prototype.constructor = LetterH;

LetterH.prototype.draw = function() {
  ctx.beginPath();
  ctx.strokeStyle = colorOne;
  ctx.fillStyle = colorTwo;
  ctx.lineWidth = letterLineWidth / 4;
  //left vertical
  ctx.moveTo(this.leftVerticalP1.x, this.leftVerticalP1.y);
  ctx.lineTo(this.leftVerticalP2.x, this.leftVerticalP2.y);
  ctx.arc(this.leftVerticalP2.x + letterLineWidth / 2, this.leftVerticalP2.y, letterLineWidth / 2, Math.PI, 0, false);
  ctx.lineTo(this.leftVerticalP4.x, this.leftVerticalP4.y);
  ctx.arc(this.leftVerticalP2.x + letterLineWidth / 2, this.leftVerticalP1.y, letterLineWidth / 2, 0, Math.PI, false);
  //right vertical
  ctx.moveTo(this.rightVerticalP1.x, this.rightVerticalP1.y);
  ctx.lineTo(this.rightVerticalP2.x, this.rightVerticalP2.y);
  ctx.arc(this.rightVerticalP2.x + letterLineWidth / 2, this.rightVerticalP2.y, letterLineWidth / 2, Math.PI, 0, false);
  ctx.lineTo(this.rightVerticalP4.x, this.rightVerticalP4.y);
  ctx.arc(this.rightVerticalP2.x + letterLineWidth / 2, this.rightVerticalP1.y, letterLineWidth / 2, 0, Math.PI, false);
  //horizontal
  ctx.moveTo(this.horizontalP1.x, this.horizontalP1.y);
  ctx.lineTo(this.horizontalP2.x, this.horizontalP2.y);
  ctx.lineTo(this.horizontalP3.x, this.horizontalP3.y);
  ctx.lineTo(this.horizontalP4.x, this.horizontalP4.y);
  ctx.lineTo(this.horizontalP1.x, this.horizontalP1.y);
  //color eerything in
  ctx.fill();
  ctx.stroke();
}

LetterH.prototype.animateLetter = function() {
  if ( this.nMovements >= this.nMovementsBeforePause && Math.round(this.horizontalP1.y) == Math.round(letterHeight / 2 - letterLineWidth / 2) ) {
    this.paused = true;
    this.nMovements = 0;
  }
  if (this.horizontalP2.y > letterHeight - letterHeight / letterPadding || this.horizontalP1.y < letterHeight / letterPadding) {
    this.speed = -this.speed;
    this.nMovements++;
  }
  if (this.paused == false ) {
    this.horizontalP1.y += this.speed;
    this.horizontalP2.y += this.speed;
    this.horizontalP3.y += this.speed;
    this.horizontalP4.y += this.speed;
  }
};

//-----------------------------------------------------------------------exports
exports.init = init;
exports.animate = animate;
exports.cancelAnimation = cancelAnimation;
exports.toggleRunAnimation = toggleRunAnimation;

},{}],5:[function(require,module,exports){
// portfolio
// animation-utils.js

//to wrtite
function randomColorInRange(redLow, redUp, greenLow, greenUp, blueLow, blueUp) {

}

function randomColors(num) {
  var chars = '0123456789ABCDEF';
  var hex;
  var colors = [];
  for (let i = 0; i < num; i++) {
    hex = '#';
    for (let j = 0; j < 6; j++) {
      hex += chars[Math.floor(Math.random() * 16)];
    }
    colors.push(hex);
  }
  return colors;
}

function drawLozenge(ctx, x1, y1, x2, y2, radius) {
  let tangentAngle = Math.atan( (y2 - y1) / (x2 - x1) );
  let preCalcDx = (Math.sin(tangentAngle) * radius);
  let preCalcDy = (Math.cos(tangentAngle) * radius);
  let corner1 = { x: x1 + preCalcDx, y: y1 - preCalcDy };
  let corner2 = { x: x1 - preCalcDx, y: y1 + preCalcDy };
  let corner3 = { x: x2 - preCalcDx, y: y2 + preCalcDy };
  let corner4 = { x: x2 + preCalcDx, y: y2 - preCalcDy };
  let apex1 = { x: x1 - preCalcDy, y: y1 - preCalcDx };
  let apex2 = { x: x2 + preCalcDy, y: y2 + preCalcDx };
  let extCorner1 = { x: corner1.x + preCalcDy, y: corner1.y + preCalcDx };
  let extCorner2 = { x: corner2.x + preCalcDy, y: corner2.y + preCalcDx };
  let extCorner3 = { x: corner3.x - preCalcDy, y: corner3.y - preCalcDx };
  let extCorner4 = { x: corner4.x - preCalcDy, y: corner4.y - preCalcDx };
  if (x1 > x2) {
    apex1 = { x: x1 + preCalcDy, y: y1 + preCalcDx };
    apex2 = { x: x2 - preCalcDy, y: y2 - preCalcDx };
  }
  if (x1 <= x2) {
    extCorner1 = { x: corner1.x - preCalcDy, y: corner1.y - preCalcDx };
    extCorner2 = { x: corner2.x - preCalcDy, y: corner2.y - preCalcDx };
    extCorner3 = { x: corner3.x + preCalcDy, y: corner3.y + preCalcDx };
    extCorner4 = { x: corner4.x + preCalcDy, y: corner4.y + preCalcDx };
  }

  ctx.moveTo(corner2.x, corner2.y);
  ctx.lineTo(corner3.x, corner3.y);
  ctx.arcTo(extCorner3.x, extCorner3.y, apex2.x, apex2.y, radius);
  ctx.arcTo(extCorner4.x, extCorner4.y, corner4.x, corner4.y, radius);
  ctx.lineTo(corner1.x, corner1.y);
  ctx.arcTo(extCorner1.x, extCorner1.y, apex1.x, apex1.y, radius);
  ctx.arcTo(extCorner2.x, extCorner2.y, corner2.x, corner2.y, radius);

/*debugging stuff, leave commented out*/
/*
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#0000ff';
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#ff00ff';
  ctx.moveTo(apex1.x, apex1.y);
  ctx.lineTo(apex2.x, apex2.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#ff0000';
  ctx.moveTo(corner1.x, corner1.y);
  ctx.lineTo(corner2.x, corner2.y);
  ctx.lineTo(corner3.x, corner3.y);
  ctx.lineTo(corner4.x, corner4.y);
  ctx.lineTo(corner1.x, corner1.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#00ff00';
  ctx.moveTo(extCorner1.x, extCorner1.y);
  ctx.lineTo(extCorner2.x, extCorner2.y);
  ctx.lineTo(extCorner3.x, extCorner3.y);
  ctx.lineTo(extCorner4.x, extCorner4.y);
  ctx.lineTo(extCorner1.x, extCorner1.y);
  ctx.stroke();
  */
  /*end of debugging stuff*/
}

//-----------------------------------------------------------------------exports
exports.randomColors = randomColors;
exports.drawLozenge = drawLozenge;

},{}],6:[function(require,module,exports){
// portfolio
// widgetrons.js

// File description:
// Script file linked to widgetrons.pug

const bouncingColoredDots = require('./utils/animation-bouncing-colored-dots');
const mechanicalLetters = require('./utils/animation-mechanical-letters');
const lozengeTester = require('./utils/animation-lozenge-tester');
const lozengeSpirrograph = require('./utils/animation-lozenge-spirrograph');
//const mechanicalLetters2 = require('./utils/animation-mechanical-letters-2');

let selectedAnimationsIndex = 0;
let animations = [
  {
    text: 'Bouncing Colored Dots',
    module: bouncingColoredDots,
    parentElementId: 'bouncingColoredDots',
    pauseButt: 'BCDTogglePause',
    reRunButt: 'BCDReRun',
    nCirclesInput: 'BCDInputNCircles',
    radiusInput: 'BCDInputRadius',
    areaOfEffectInput: 'BCDInputAoE',
    opts: {
      canvas: 'BCDCanvas',
      nCircles: 200,
      radius: 2,
      areaOfEffect: 80
    }
  },
  {
    text: 'Mechancial Letters',
    module: mechanicalLetters,
    parentElementId: 'mechanicalLetters',
    pauseButt: 'MLTogglePause',
    reRunButt: 'MLReRun',
    opts: {
      canvas: 'MLCanvas',
      str: 'hhhh'
    }
  },
  {
    text: 'Lozenge Tester',
    module: lozengeTester,
    parentElementId: 'lozengeTester',
    x1Slider: 'LTx1',
    y1Slider: 'LTy1',
    x2Slider: 'LTx2',
    y2Slider: 'LTy2',
    opts: {
      canvas: 'LTCanvas',
      x1: 200,
      y1: 200,
      x2: 250,
      y2: 250
    }
  },
  {
    text: 'Lozenge Spirrograph',
    module: lozengeSpirrograph,
    parentElementId: 'lozengeSpirrograph',
    reverseDXButt: 'LSReverseDXButt',
    reverseDYButt: 'LSReverseDYButt',
    switchXYButt: 'LSSwitchXYButt',
    opts: {
      canvas: 'LSCanvas'
    }
  }
];

//initialise after DOM loaded
document.addEventListener('DOMContentLoaded', function(event) {
  initAnimationPicker();
  bouncingColoredDots.init(animations[0]['opts']);
  addBCDEventListenerPause();
  addBCDEventListenerReRun();
  mechanicalLetters.init(animations[1]['opts']);
  addMLEventListenerPause();
  addMLEventListenerReRun();
  lozengeTester.init(animations[2]['opts']);
  addLTEventListenerX1Slider();
  addLTEventListenerY1Slider();
  addLTEventListenerX2Slider();
  addLTEventListenerY2Slider();
  lozengeSpirrograph.init(animations[3]['opts']);
  lozengeSpirrograph.animate();
  addLSEventListenerReverseDX();
  addLSEventListenerReverseDY();
  addLSEventListenerSwitchXY();
  startSelectedAnimation();
});

//-----------------------------------------------------animation picker controls
function initAnimationPicker() {
  document.getElementById('selectedAnimation').innerHTML = animations[selectedAnimationsIndex].text;
  document.getElementById('prevAnimation').addEventListener('click', selectAnimation('dec'));
  document.getElementById('nextAnimation').addEventListener('click', selectAnimation('inc'));
}

function selectAnimation(incOrDec) {
  return function() {
    if (incOrDec === 'dec') {selectedAnimationsIndex--;}
    if (incOrDec === 'inc') {selectedAnimationsIndex++;}
    if (selectedAnimationsIndex === -1) {selectedAnimationsIndex = animations.length - 1;}
    if (selectedAnimationsIndex === animations.length) { selectedAnimationsIndex = 0;}
    document.getElementById('selectedAnimation').innerHTML = animations[selectedAnimationsIndex].text;
    cancelAllAnimations();
    startSelectedAnimation();
  }
}

//-------------------------------------------generic & common animation controls
function cancelAllAnimations() {
  for (let i = 0; i < animations.length; i++) {
    if( animations[i].hasOwnProperty('pauseButt') ) {
      animations[i]['module'].cancelAnimation();
    }
    document.getElementById(animations[i]['parentElementId']).style.display = 'none';
  }
}

function startSelectedAnimation() {
  document.getElementById(animations[selectedAnimationsIndex]['parentElementId']).style.display = 'flex';
  if ( animations[selectedAnimationsIndex].hasOwnProperty('pauseButt') ) {
      animations[selectedAnimationsIndex]['module'].animate();
      stylePauseButt(animations[selectedAnimationsIndex]['pauseButt'], false);
  }
}

function stylePauseButt(pauseButt, isPaused) {
  if (isPaused === true) {
    document.getElementById(pauseButt).classList.remove('animationControlUnpaused');
    document.getElementById(pauseButt).classList.add('animationControlPaused');
  }
  if (isPaused === false) {
    document.getElementById(pauseButt).classList.remove('animationControlPaused');
    document.getElementById(pauseButt).classList.add('animationControlUnpaused');
  }
}

//-------------------------------------------------individual animation controls
//bouncing colored dots
function addBCDEventListenerPause() {
  document.getElementById(animations[0]['pauseButt']).addEventListener('click', function(event) {
    let isPaused = bouncingColoredDots.toggleRunAnimation();
    stylePauseButt(animations[0]['pauseButt'], isPaused);
  });
}

function addBCDEventListenerReRun() {
  document.getElementById(animations[0]['reRunButt']).addEventListener('click', function(event) {
    animations[0]['opts'].nCircles = parseInt(document.getElementById(animations[0]['nCirclesInput']).value);
    animations[0]['opts'].radius = parseInt(document.getElementById(animations[0]['radiusInput']).value);
    animations[0]['opts'].areaOfEffect = parseInt(document.getElementById(animations[0]['areaOfEffectInput']).value);
    bouncingColoredDots.init(animations[0]['opts']);
    bouncingColoredDots.animate();
    stylePauseButt(animations[0]['pauseButt'], false);
  });
}

//mechanical letters
function addMLEventListenerPause() {
  document.getElementById(animations[1]['pauseButt']).addEventListener('click', function(event) {
    let isPaused = mechanicalLetters.toggleRunAnimation();
    stylePauseButt(animations[1]['pauseButt'], isPaused);
  });
}

function addMLEventListenerReRun() {
  document.getElementById(animations[1]['reRunButt']).addEventListener('click', function(event) {
    mechanicalLetters.init(animations[1]['opts']);
    mechanicalLetters.animate();
    stylePauseButt(animations[1]['pauseButt'], false);
  });
}

//lozenge tester
function addLTEventListenerX1Slider() {
  let x1SliderElement = document.getElementById(animations[2]['x1Slider']);
  x1SliderElement.addEventListener('input', function(event) {
    animations[2]['opts'].x1 = parseInt(x1SliderElement.value);
    lozengeTester.init(animations[2]['opts']);
  });
}

function addLTEventListenerY1Slider() {
  let y1SliderElement = document.getElementById(animations[2]['y1Slider']);
  y1SliderElement.addEventListener('input', function(event) {
    animations[2]['opts'].y1 = parseInt(y1SliderElement.value);
    lozengeTester.init(animations[2]['opts']);
  });
}

function addLTEventListenerX2Slider() {
  let x2SliderElement = document.getElementById(animations[2]['x2Slider']);
  x2SliderElement.addEventListener('input', function(event) {
    animations[2]['opts'].x2 = parseInt(x2SliderElement.value);
    lozengeTester.init(animations[2]['opts']);
  });
}

function addLTEventListenerY2Slider() {
  let y2SliderElement = document.getElementById(animations[2]['y2Slider']);
  y2SliderElement.addEventListener('input', function(event) {
    animations[2]['opts'].y2 = parseInt(y2SliderElement.value);
    lozengeTester.init(animations[2]['opts']);
  });
}

//lozenge Spirrograph
function addLSEventListenerReverseDX() {
  document.getElementById(animations[3]['reverseDXButt']).addEventListener('click', lozengeSpirrograph.reverseDX);
}

function addLSEventListenerReverseDY() {
  document.getElementById(animations[3]['reverseDYButt']).addEventListener('click', lozengeSpirrograph.reverseDY);
}

function addLSEventListenerSwitchXY() {
  document.getElementById(animations[3]['switchXYButt']).addEventListener('click', lozengeSpirrograph.switchXY);
}

},{"./utils/animation-bouncing-colored-dots":1,"./utils/animation-lozenge-spirrograph":2,"./utils/animation-lozenge-tester":3,"./utils/animation-mechanical-letters":4}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc3RhdGljL3Jhdy1qYXZhc2NyaXB0cy91dGlscy9hbmltYXRpb24tYm91bmNpbmctY29sb3JlZC1kb3RzLmpzIiwiYXBwL3N0YXRpYy9yYXctamF2YXNjcmlwdHMvdXRpbHMvYW5pbWF0aW9uLWxvemVuZ2Utc3BpcnJvZ3JhcGguanMiLCJhcHAvc3RhdGljL3Jhdy1qYXZhc2NyaXB0cy91dGlscy9hbmltYXRpb24tbG96ZW5nZS10ZXN0ZXIuanMiLCJhcHAvc3RhdGljL3Jhdy1qYXZhc2NyaXB0cy91dGlscy9hbmltYXRpb24tbWVjaGFuaWNhbC1sZXR0ZXJzLmpzIiwiYXBwL3N0YXRpYy9yYXctamF2YXNjcmlwdHMvdXRpbHMvYW5pbWF0aW9uLXV0aWxzLmpzIiwiYXBwL3N0YXRpYy9yYXctamF2YXNjcmlwdHMvd2lkZ2V0cm9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gcG9ydGZvbGlvXHJcbi8vIGFuaW1hdGlvbi1ib3VuY2luZy1jb2xvcmVkLWRvdHMuanNcclxuXHJcbi8vcGFzc2VkIGluIHZpYSBvcHRzXHJcbmxldCBjYW52YXM7XHJcbmxldCBuQ2lyY2xlcztcclxubGV0IHJhZGl1cztcclxubGV0IGFyZWFPZkVmZmVjdDtcclxuLy9sYXRlciBleHBvc2UgdG8gb3B0c1xyXG5sZXQgZGVmYXVsdENpcmNsZUNvbG9yID0gWzI1NSwgMjU1LCAyNTVdO1xyXG5sZXQgdGFyZ2V0Q2lyY2xlQ29sb3IxID0gWzI1NSwgMCwgMF07XHJcbmxldCB0YXJnZXRDaXJjbGVDb2xvcjIgPSBbMCwgMjU1LCAwXTtcclxubGV0IHRhcmdldENpcmNsZUNvbG9yMyA9IFswLCAwLCAyNTVdO1xyXG4vL2NhbGN1bGF0ZWRcclxubGV0IGN0eDtcclxubGV0IGNhbnZhc1dpZHRoO1xyXG5sZXQgY2FudmFzSGVpZ2h0O1xyXG5sZXQgZnJhbWVJZDtcclxubGV0IGlzUGF1c2VkID0gZmFsc2U7XHJcbi8vYW5pbWF0ZWQgb2JqZWN0c1xyXG5sZXQgY2lyY2xlc0FyciA9IFtdO1xyXG5sZXQgdGFyZ2V0Q2lyY2xlc0FyciA9IFtdO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1leHBvcnRlZCBmdW5jdGlvbnNcclxuZnVuY3Rpb24gaW5pdChvcHRzKSB7XHJcbiAgY2FuY2VsQW5pbWF0aW9uKCk7XHJcbiAgY2xlYXJBcnJheXMoKTtcclxuICBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChvcHRzLmNhbnZhcyk7XHJcbiAgbkNpcmNsZXMgPSBvcHRzLm5DaXJjbGVzO1xyXG4gIHJhZGl1cyA9IG9wdHMucmFkaXVzO1xyXG4gIGFyZWFPZkVmZmVjdCA9IG9wdHMuYXJlYU9mRWZmZWN0O1xyXG4gIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gIGNhbnZhc1dpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gIGNhbnZhc0hlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcbiAgaW5pdENpcmNsZUFycigpO1xyXG4gIGluaXRUYXJnZXRDaXJjbGVzQXJyKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFuaW1hdGUoKSB7XHJcbiAgaXNQYXVzZWQgPSBmYWxzZTtcclxuICBmcmFtZUlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xyXG4gIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzV2lkdGgsIGNhbnZhc0hlaWdodCk7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaXJjbGVzQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjaXJjbGVzQXJyW2ldLnVwZGF0ZVBvcygpO1xyXG4gICAgY2lyY2xlc0FycltpXS51cGRhdGVDb2xvcigpO1xyXG4gICAgY2lyY2xlc0FycltpXS5kcmF3KCk7XHJcbiAgfVxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGFyZ2V0Q2lyY2xlc0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgdGFyZ2V0Q2lyY2xlc0FycltpXS5kcmF3KCk7XHJcbiAgICB0YXJnZXRDaXJjbGVzQXJyW2ldLnVwZGF0ZVBvcygpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2FuY2VsQW5pbWF0aW9uKCkge1xyXG4gIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGZyYW1lSWQpO1xyXG4gIGlzUGF1c2VkID0gdHJ1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlUnVuQW5pbWF0aW9uKCkge1xyXG4gIGlzUGF1c2VkID09PSBmYWxzZSA/KCBpc1BhdXNlZCA9IHRydWUsIGNhbmNlbEFuaW1hdGlvbigpICkgOiAoIGlzUGF1c2VkID0gZmFsc2UsIGFuaW1hdGUoKSAgKTtcclxuICByZXR1cm4gaXNQYXVzZWQ7XHJcbn1cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0taW50ZXJuYWwgZnVuY3Rpb25zXHJcbmZ1bmN0aW9uIGNsZWFyQXJyYXlzKCkge1xyXG4gIGNpcmNsZXNBcnIubGVuZ3RoID0gMDtcclxuICB0YXJnZXRDaXJjbGVzQXJyLmxlbmd0aCA9IDA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRDaXJjbGVBcnIoKSB7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuQ2lyY2xlczsgaSsrKSB7XHJcbiAgICBsZXQgeCA9IE1hdGgucmFuZG9tKCkgKiAoY2FudmFzV2lkdGggLSByYWRpdXMgKiAyKSArIHJhZGl1cztcclxuICAgIGxldCB5ID0gTWF0aC5yYW5kb20oKSAqIChjYW52YXNIZWlnaHQgLSByYWRpdXMgKiAyKSArIHJhZGl1cztcclxuICAgIGxldCBkeCA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDY7XHJcbiAgICBsZXQgZHkgPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiA2O1xyXG4gICAgY2lyY2xlc0Fyci5wdXNoKCBuZXcgQ2lyY2xlKHgsIHksIGR4LCBkeSwgcmFkaXVzLCBkZWZhdWx0Q2lyY2xlQ29sb3Iuc2xpY2UoKSApICk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0VGFyZ2V0Q2lyY2xlc0FycigpIHtcclxuICB0YXJnZXRDaXJjbGVzQXJyLnB1c2goIG5ldyBDaXJjbGUoNTAsIDc1LCAyLCAzLCAxMiwgdGFyZ2V0Q2lyY2xlQ29sb3IxKSApO1xyXG4gIHRhcmdldENpcmNsZXNBcnIucHVzaCggbmV3IENpcmNsZSg5MCwgNDAsIDMsIC0yLCAxMiwgdGFyZ2V0Q2lyY2xlQ29sb3IyKSApO1xyXG4gIHRhcmdldENpcmNsZXNBcnIucHVzaCggbmV3IENpcmNsZSgxMjAsIDEwNSwgLTIsIC0zLCAxMiwgdGFyZ2V0Q2lyY2xlQ29sb3IzKSApO1xyXG59XHJcblxyXG4vL2NvbnN0cnVjdG9yIGZvciBDaXJjbGUgb2JqZWN0c1xyXG5mdW5jdGlvbiBDaXJjbGUoeCwgeSwgZHgsIGR5LCByYWRpdXMsIGNvbG9yQXJyKSB7XHJcbiAgdGhpcy54ID0geDtcclxuICB0aGlzLnkgPSB5O1xyXG4gIHRoaXMuZHggPSBkeDtcclxuICB0aGlzLmR5ID0gZHk7XHJcbiAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XHJcbiAgdGhpcy5jb2xvckFyciA9IGNvbG9yQXJyO1xyXG4gIHRoaXMuY29sb3IgPSAncmdiKCcgKyB0aGlzLmNvbG9yQXJyWzBdICsgJywgJyArIHRoaXMuY29sb3JBcnJbMV0gKyAnLCAnICsgdGhpcy5jb2xvckFyclsyXSArICcpJztcclxufVxyXG5DaXJjbGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ2lyY2xlO1xyXG5cclxuQ2lyY2xlLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oKSB7XHJcbiAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gIGN0eC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCAyICogTWF0aC5QSSwgZmFsc2UpO1xyXG4gIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xyXG4gIGN0eC5maWxsKCk7XHJcbn1cclxuXHJcbkNpcmNsZS5wcm90b3R5cGUudXBkYXRlUG9zID0gZnVuY3Rpb24oKSB7XHJcbiAgaWYgKHRoaXMueCArIHJhZGl1cyA+IGNhbnZhc1dpZHRoIHx8IHRoaXMueCAtIHJhZGl1cyA8IDApIHt0aGlzLmR4ID0gLXRoaXMuZHh9O1xyXG4gIGlmICh0aGlzLnkgKyByYWRpdXMgPiBjYW52YXNIZWlnaHQgfHwgdGhpcy55IC0gcmFkaXVzIDwgMCkge3RoaXMuZHkgPSAtdGhpcy5keX07XHJcbiAgdGhpcy54ICs9IHRoaXMuZHg7XHJcbiAgdGhpcy55ICs9IHRoaXMuZHk7XHJcbn1cclxuXHJcbkNpcmNsZS5wcm90b3R5cGUudXBkYXRlQ29sb3I9IGZ1bmN0aW9uKCkge1xyXG4gIHZhciBuRWZmZWN0ZWRCeSA9IDA7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YXJnZXRDaXJjbGVzQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBsZXQgZGlzdGFuY2VCZXR3ZWVuID0gTWF0aC5zcXJ0KCBNYXRoLnBvdyggKHRoaXMueCAtIHRhcmdldENpcmNsZXNBcnJbaV0ueCksIDIpICsgTWF0aC5wb3coICh0aGlzLnkgLSB0YXJnZXRDaXJjbGVzQXJyW2ldLnkpLCAyKSApO1xyXG4gICAgaWYgKGRpc3RhbmNlQmV0d2VlbiA8IGFyZWFPZkVmZmVjdCkge1xyXG4gICAgICBpZiAobkVmZmVjdGVkQnkgPT0gMCkge1xyXG4gICAgICAgIHRoaXMuY29sb3JBcnJbMF0gPSB0YXJnZXRDaXJjbGVzQXJyW2ldLmNvbG9yQXJyWzBdO1xyXG4gICAgICAgIHRoaXMuY29sb3JBcnJbMV0gPSB0YXJnZXRDaXJjbGVzQXJyW2ldLmNvbG9yQXJyWzFdO1xyXG4gICAgICAgIHRoaXMuY29sb3JBcnJbMl0gPSB0YXJnZXRDaXJjbGVzQXJyW2ldLmNvbG9yQXJyWzJdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuY29sb3JBcnJbMF0gPSBNYXRoLnJvdW5kKCAodGhpcy5jb2xvckFyclswXSArIHRhcmdldENpcmNsZXNBcnJbaV0uY29sb3JBcnJbMF0pIC8gbkVmZmVjdGVkQnkgKTtcclxuICAgICAgICB0aGlzLmNvbG9yQXJyWzFdID0gTWF0aC5yb3VuZCggKHRoaXMuY29sb3JBcnJbMV0gKyB0YXJnZXRDaXJjbGVzQXJyW2ldLmNvbG9yQXJyWzFdKSAvIG5FZmZlY3RlZEJ5ICk7XHJcbiAgICAgICAgdGhpcy5jb2xvckFyclsyXSA9IE1hdGgucm91bmQoICh0aGlzLmNvbG9yQXJyWzJdICsgdGFyZ2V0Q2lyY2xlc0FycltpXS5jb2xvckFyclsyXSkgLyBuRWZmZWN0ZWRCeSApO1xyXG4gICAgICB9XHJcbiAgICAgIG5FZmZlY3RlZEJ5Kys7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGlmIChuRWZmZWN0ZWRCeSA9PSAwKSB7XHJcbiAgICB0aGlzLmNvbG9yQXJyID0gZGVmYXVsdENpcmNsZUNvbG9yLnNsaWNlKCk7XHJcbiAgfVxyXG4gIHRoaXMuY29sb3IgPSAncmdiKCcgKyB0aGlzLmNvbG9yQXJyWzBdICsgJywgJyArIHRoaXMuY29sb3JBcnJbMV0gKyAnLCAnICsgdGhpcy5jb2xvckFyclsyXSArICcpJztcclxufVxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWV4cG9ydHNcclxuZXhwb3J0cy5pbml0ID0gaW5pdDtcclxuZXhwb3J0cy5hbmltYXRlID0gYW5pbWF0ZTtcclxuZXhwb3J0cy5jYW5jZWxBbmltYXRpb24gPSBjYW5jZWxBbmltYXRpb247XHJcbmV4cG9ydHMudG9nZ2xlUnVuQW5pbWF0aW9uID0gdG9nZ2xlUnVuQW5pbWF0aW9uO1xyXG4iLCIvLyBwb3J0Zm9saW9cclxuLy8gYW5pbWF0aW9uLWxvemVuZ2Utc3BpcnJvZ3JhcGguanNcclxuXHJcbmNvbnN0IGFuaW1hdGlvblV0aWxzID0gcmVxdWlyZSgnLi9hbmltYXRpb24tdXRpbHMnKTtcclxuXHJcbi8vc3RhdGVcclxubGV0IGNhbnZhcztcclxubGV0IGN0eDtcclxubGV0IGZyYW1lSWQ7XHJcbmxldCBpc1BhdXNlZDtcclxubGV0IGxvemVuZ2VSYWRpdXM7XHJcbmxldCBsb3plbmdlTGluZVdpZHRoO1xyXG5sZXQgc3BlZWQ7XHJcbmxldCBzdHJva2VDb2xvciA9ICcjMTYzMDViJztcclxubGV0IGZpbGxDb2xvciA9ICd0cmFuc3BhcmVudCc7XHJcbi8vYW5pbWF0ZWQgb2JqZWN0c1xyXG5sZXQgbW92aW5nTG96ZW5nZXMgPSBbXTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZXhwb3J0ZWQgZnVuY3Rpb25zXHJcbmZ1bmN0aW9uIGluaXQob3B0cykge1xyXG4gIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG9wdHMuY2FudmFzKTtcclxuICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICBjYW5jZWxBbmltYXRpb24oKTtcclxuICBtb3ZpbmdMb3plbmdlcy5sZW5ndGggPSAwO1xyXG4gIGlzUGF1c2VkID0gZmFsc2U7XHJcbiAgbG96ZW5nZVJhZGl1cyA9IE1hdGgucm91bmQoY2FudmFzLndpZHRoIC8gMjApO1xyXG4gIGxvemVuZ2VMaW5lV2lkdGggPSBNYXRoLnJvdW5kKGNhbnZhcy53aWR0aCAvIDQwKTtcclxuICBzcGVlZCA9IE1hdGgucm91bmQoY2FudmFzLndpZHRoIC8gNDAwKTtcclxuICBtb3ZpbmdMb3plbmdlc0luaXQoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBhbmltYXRlKCkge1xyXG4gIGlzUGF1c2VkID0gZmFsc2U7XHJcbiAgZnJhbWVJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcclxuICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcbiAgbW92aW5nTG96ZW5nZXMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICBlbGVtZW50LnVwZGF0ZVBvcygpO1xyXG4gICAgZWxlbWVudC5kcmF3KCk7XHJcbiAgfSk7XHJcbiAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gIGN0eC5saW5lV2lkdGggPSBsb3plbmdlTGluZVdpZHRoO1xyXG4gIGN0eC5zdHJva2VTdHlsZSA9IHN0cm9rZUNvbG9yO1xyXG4gIGN0eC5maWxsU3R5bGUgPSBmaWxsQ29sb3I7XHJcbiAgYW5pbWF0aW9uVXRpbHMuZHJhd0xvemVuZ2UoY3R4LCBtb3ZpbmdMb3plbmdlc1swXS54MSwgbW92aW5nTG96ZW5nZXNbMF0ueTEsIG1vdmluZ0xvemVuZ2VzWzFdLngxLCBtb3ZpbmdMb3plbmdlc1sxXS55MSwgbG96ZW5nZVJhZGl1cyk7XHJcbiAgYW5pbWF0aW9uVXRpbHMuZHJhd0xvemVuZ2UoY3R4LCBtb3ZpbmdMb3plbmdlc1swXS54MiwgbW92aW5nTG96ZW5nZXNbMF0ueTIsIG1vdmluZ0xvemVuZ2VzWzFdLngyLCBtb3ZpbmdMb3plbmdlc1sxXS55MiwgbG96ZW5nZVJhZGl1cyk7XHJcbiAgYW5pbWF0aW9uVXRpbHMuZHJhd0xvemVuZ2UoY3R4LCBtb3ZpbmdMb3plbmdlc1syXS54MSwgbW92aW5nTG96ZW5nZXNbMl0ueTEsIG1vdmluZ0xvemVuZ2VzWzNdLngxLCBtb3ZpbmdMb3plbmdlc1szXS55MSwgbG96ZW5nZVJhZGl1cyk7XHJcbiAgYW5pbWF0aW9uVXRpbHMuZHJhd0xvemVuZ2UoY3R4LCBtb3ZpbmdMb3plbmdlc1syXS54MiwgbW92aW5nTG96ZW5nZXNbMl0ueTIsIG1vdmluZ0xvemVuZ2VzWzNdLngyLCBtb3ZpbmdMb3plbmdlc1szXS55MiwgbG96ZW5nZVJhZGl1cyk7XHJcbiAgY3R4LnN0cm9rZSgpO1xyXG4gIGN0eC5maWxsKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhbmNlbEFuaW1hdGlvbigpIHtcclxuICBjYW5jZWxBbmltYXRpb25GcmFtZShmcmFtZUlkKTtcclxuICBpc1BhdXNlZCA9IHRydWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJldmVyc2VEWCgpIHtcclxuICBjb25zb2xlLmxvZygncmV2ZXJzZURYJyk7XHJcbiAgbW92aW5nTG96ZW5nZXMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICBlbGVtZW50LmR4MSA9IC1lbGVtZW50LmR4MTtcclxuICAgIGVsZW1lbnQuZHgyID0gLWVsZW1lbnQuZHgyO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXZlcnNlRFkoKSB7XHJcbiAgbW92aW5nTG96ZW5nZXMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICBlbGVtZW50LmR5MSA9IC1lbGVtZW50LmR5MTtcclxuICAgIGVsZW1lbnQuZHkyID0gLWVsZW1lbnQuZHkyO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzd2l0Y2hYWSgpIHtcclxuICBtb3ZpbmdMb3plbmdlcy5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpe1xyXG4gICAgbGV0IHgxID0gZWxlbWVudC54MTtcclxuICAgIGxldCB5MSA9IGVsZW1lbnQueTE7XHJcbiAgICBsZXQgeDIgPSBlbGVtZW50LngyO1xyXG4gICAgbGV0IHkyID0gZWxlbWVudC55MjtcclxuICAgIGxldCBkeDEgPSBlbGVtZW50LmR4MTtcclxuICAgIGxldCBkeTEgPSBlbGVtZW50LmR5MTtcclxuICAgIGxldCBkeDIgPSBlbGVtZW50LmR4MjtcclxuICAgIGxldCBkeTIgPSBlbGVtZW50LmR5MjtcclxuICAgIGVsZW1lbnQueDEgPSB5MTtcclxuICAgIGVsZW1lbnQueTEgPSB4MTtcclxuICAgIGVsZW1lbnQueDIgPSB5MjtcclxuICAgIGVsZW1lbnQueTIgPSB4MjtcclxuICAgIGVsZW1lbnQuZHgxID0gZHkxO1xyXG4gICAgZWxlbWVudC5keTEgPSBkeDE7XHJcbiAgICBlbGVtZW50LmR4MiA9IGR5MjtcclxuICAgIGVsZW1lbnQuZHkyID0gZHgyO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWludGVybmFsIGZ1bmN0aW9uc1xyXG4vL21vdmluZ0xvemVuZ2VzIGluaXRpYWxpc2VyXHJcbmZ1bmN0aW9uIG1vdmluZ0xvemVuZ2VzSW5pdCgpIHtcclxuICBtb3ZpbmdMb3plbmdlcy5wdXNoKCBuZXcgTW92aW5nTG96ZW5nZShsb3plbmdlUmFkaXVzLCBjYW52YXMuaGVpZ2h0IC8gMiwgY2FudmFzLndpZHRoIC8gMiwgY2FudmFzLmhlaWdodCAtIGxvemVuZ2VSYWRpdXMsIHNwZWVkLCAtc3BlZWQsIHNwZWVkLCAtc3BlZWQpICk7XHJcbiAgbW92aW5nTG96ZW5nZXMucHVzaCggbmV3IE1vdmluZ0xvemVuZ2UoY2FudmFzLndpZHRoIC1sb3plbmdlUmFkaXVzLCBjYW52YXMuaGVpZ2h0IC8gMiwgY2FudmFzLndpZHRoIC8gMiwgY2FudmFzLmhlaWdodCAtIGxvemVuZ2VSYWRpdXMsIC1zcGVlZCwgLXNwZWVkLCAtc3BlZWQsIC1zcGVlZCkgKTtcclxuICBtb3ZpbmdMb3plbmdlcy5wdXNoKCBuZXcgTW92aW5nTG96ZW5nZShsb3plbmdlUmFkaXVzLCBjYW52YXMuaGVpZ2h0IC8gMiwgY2FudmFzLndpZHRoIC8gMiwgbG96ZW5nZVJhZGl1cywgc3BlZWQsIHNwZWVkLCBzcGVlZCwgc3BlZWQpICk7XHJcbiAgbW92aW5nTG96ZW5nZXMucHVzaCggbmV3IE1vdmluZ0xvemVuZ2UoY2FudmFzLndpZHRoIC0gbG96ZW5nZVJhZGl1cywgY2FudmFzLmhlaWdodCAvIDIsIGNhbnZhcy53aWR0aCAvIDIsIGxvemVuZ2VSYWRpdXMsIC1zcGVlZCwgc3BlZWQsIC1zcGVlZCwgc3BlZWQpICk7XHJcbn1cclxuXHJcbi8vY29uc3RydWN0b3IgZm9yIE1vdmluZ0xvemVuZ2VcclxuZnVuY3Rpb24gTW92aW5nTG96ZW5nZSh4MSwgeTEsIHgyLCB5MiwgZHgxLCBkeTEsIGR4MiwgZHkyKSB7XHJcbiAgdGhpcy54MSA9IHgxO1xyXG4gIHRoaXMueTEgPSB5MTtcclxuICB0aGlzLngyID0geDI7XHJcbiAgdGhpcy55MiA9IHkyO1xyXG4gIHRoaXMuZHgxID0gZHgxO1xyXG4gIHRoaXMuZHkxID0gZHkxO1xyXG4gIHRoaXMuZHgyID0gZHgyO1xyXG4gIHRoaXMuZHkyID0gZHkyO1xyXG59XHJcbk1vdmluZ0xvemVuZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTW92aW5nTG96ZW5nZTtcclxuXHJcbk1vdmluZ0xvemVuZ2UucHJvdG90eXBlLnVwZGF0ZVBvcyA9IGZ1bmN0aW9uKCkge1xyXG4gIGlmICh0aGlzLngxICsgbG96ZW5nZVJhZGl1cyA+IGNhbnZhcy53aWR0aCB8fCB0aGlzLngxIC0gbG96ZW5nZVJhZGl1cyA8IDApIHt0aGlzLmR4MSA9IC10aGlzLmR4MX07XHJcbiAgaWYgKHRoaXMueTEgKyBsb3plbmdlUmFkaXVzID4gY2FudmFzLmhlaWdodCB8fCB0aGlzLnkxIC0gbG96ZW5nZVJhZGl1cyA8IDApIHt0aGlzLmR5MSA9IC10aGlzLmR5MX07XHJcbiAgaWYgKHRoaXMueDIgKyBsb3plbmdlUmFkaXVzID4gY2FudmFzLndpZHRoIHx8IHRoaXMueDIgLSBsb3plbmdlUmFkaXVzIDwgMCkge3RoaXMuZHgyID0gLXRoaXMuZHgyfTtcclxuICBpZiAodGhpcy55MiArIGxvemVuZ2VSYWRpdXMgPiBjYW52YXMuaGVpZ2h0IHx8IHRoaXMueTIgLSBsb3plbmdlUmFkaXVzIDwgMCkge3RoaXMuZHkyID0gLXRoaXMuZHkyfTtcclxuICB0aGlzLngxICs9IHRoaXMuZHgxO1xyXG4gIHRoaXMueTEgKz0gdGhpcy5keTE7XHJcbiAgdGhpcy54MiArPSB0aGlzLmR4MjtcclxuICB0aGlzLnkyICs9IHRoaXMuZHkyO1xyXG59XHJcblxyXG5Nb3ZpbmdMb3plbmdlLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oKSB7XHJcbiAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gIGN0eC5saW5lV2lkdGggPSBsb3plbmdlTGluZVdpZHRoO1xyXG4gIGN0eC5zdHJva2VTdHlsZSA9IHN0cm9rZUNvbG9yO1xyXG4gIGN0eC5maWxsU3R5bGUgPSBmaWxsQ29sb3I7XHJcbiAgYW5pbWF0aW9uVXRpbHMuZHJhd0xvemVuZ2UoY3R4LCB0aGlzLngxLCB0aGlzLnkxLCB0aGlzLngyLCB0aGlzLnkyLCBsb3plbmdlUmFkaXVzKTtcclxuICBjdHguc3Ryb2tlKCk7XHJcbiAgY3R4LmZpbGwoKTtcclxufVxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWV4cG9ydHNcclxuZXhwb3J0cy5pbml0ID1pbml0O1xyXG5leHBvcnRzLmFuaW1hdGUgPSBhbmltYXRlO1xyXG5leHBvcnRzLmNhbmNlbEFuaW1hdGlvbiA9IGNhbmNlbEFuaW1hdGlvbjtcclxuLy90ZW1wXHJcbmV4cG9ydHMucmV2ZXJzZURYID0gcmV2ZXJzZURYO1xyXG5leHBvcnRzLnJldmVyc2VEWSA9IHJldmVyc2VEWTtcclxuZXhwb3J0cy5zd2l0Y2hYWSA9IHN3aXRjaFhZO1xyXG4iLCIvLyBwb3J0Zm9saW9cclxuLy8gYW5pbWF0aW9uLWxvemVuZ2UtdGVzdGVyLmpzXHJcblxyXG5jb25zdCBhbmltYXRpb25VdGlscyA9IHJlcXVpcmUoJy4vYW5pbWF0aW9uLXV0aWxzJyk7XHJcblxyXG4vL3N0YXRlXHJcbmxldCBjYW52YXM7XHJcbmxldCBjdHg7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWV4cG9ydGVkIGZ1bmN0aW9uc1xyXG5mdW5jdGlvbiBpbml0KG9wdHMpIHtcclxuICBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChvcHRzLmNhbnZhcyk7XHJcbiAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgbGV0IHgxID0gb3B0cy54MTtcclxuICBsZXQgeTEgPSBvcHRzLnkxO1xyXG4gIGxldCB4MiA9IG9wdHMueDI7XHJcbiAgbGV0IHkyID0gb3B0cy55MjtcclxuICBjdHguY2xlYXJSZWN0KDAsIDAsIDQwMCwgNDAwKTtcclxuICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgY3R4LmxpbmVXaWR0aCA9IDEwO1xyXG4gIGN0eC5zdHJva2VTdHlsZSA9ICcjMDAwMDAwJztcclxuICBjdHguZmlsbFN0eWxlID0gJ3RyYW5zcGFyZW50JztcclxuICBhbmltYXRpb25VdGlscy5kcmF3TG96ZW5nZShjdHgsIHgxLCB5MSwgeDIsIHkyLCAyMCk7XHJcbiAgY3R4LnN0cm9rZSgpO1xyXG4gIGN0eC5maWxsKCk7XHJcbn1cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1pbnRlcm5hbCBmdW5jdGlvbnNcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1leHBvcnRzXHJcbmV4cG9ydHMuaW5pdCA9IGluaXQ7XHJcbiIsIi8vIHBvcnRmb2xpb1xyXG4vLyBhbmltYXRpb24tbWVjaGFuaWNhbC1sZXR0ZXJzLmpzXHJcblxyXG4vL3Bhc3NlZCBpbiB2aWEgb3B0c1xyXG5sZXQgY2FudmFzO1xyXG5sZXQgc3RyO1xyXG4vL2xhdGVyIGV4cG9zZSB0byBvcHRzXHJcbmNvbnN0IGNvbG9yT25lID0gJyNkMTgwMTcnO1xyXG5jb25zdCBjb2xvclR3byA9ICcjOGI4ZDkxJztcclxuY29uc3QgY29sb3JUaHJlZSA9ICcjZmZmZmZmJzsvL3RlbXBcclxuY29uc3Qgb3ZlcmFsbEFuaW1hdGlvblNwZWVkID0gMTtcclxuY29uc3QgbGV0dGVyUGFkZGluZyA9IDc7IC8vIEFzIGEgcmF0aW8gb2YgbGV0dGVyV2lkdGggJiBsZXR0ZXJIZWlnaHRcclxuY29uc3QgbGV0dGVyTGluZVdpZHRoUmF0aW8gPSA4O1xyXG4vL2NhbGN1bGF0ZWRcclxubGV0IGN0eDtcclxubGV0IGxldHRlcldpZHRoO1xyXG5sZXQgbGV0dGVySGVpZ2h0O1xyXG5sZXQgZnJhbWVJZDtcclxubGV0IGlzUGF1c2VkID0gZmFsc2U7XHJcbi8vYW5pbWF0ZWQgb2JqZWN0c1xyXG5sZXQgbWVjaExldHRlcnNBcnIgPSBbXTtcclxubGV0IGxldHRlckxpbmVXaWR0aDtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZXhwb3J0ZWQgZnVuY3Rpb25zXHJcbmZ1bmN0aW9uIGluaXQob3B0cykge1xyXG4gIGNhbmNlbEFuaW1hdGlvbigpO1xyXG4gIGNsZWFyQXJyYXlzKCk7XHJcbiAgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQob3B0cy5jYW52YXMpO1xyXG4gIHN0ciA9IG9wdHMuc3RyO1xyXG4gIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gIGxldHRlcldpZHRoID0gTWF0aC5yb3VuZChjYW52YXMud2lkdGggLyBvcHRzLnN0ci5sZW5ndGgpO1xyXG4gIGxldHRlckhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcbiAgbGV0dGVyTGluZVdpZHRoID0gTWF0aC5yb3VuZChsZXR0ZXJXaWR0aCAvIGxldHRlckxpbmVXaWR0aFJhdGlvKTtcclxuICBtZWNoTGV0dGVyc0FyciA9IGluaXRNZWNoTGV0dGVyc0FycihvcHRzLnN0cik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFuaW1hdGUoKSB7XHJcbiAgaXNQYXVzZWQgPSBmYWxzZTtcclxuICBmcmFtZUlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xyXG4gIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuICB2YXIgblBhdXNlZCA9IDA7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZWNoTGV0dGVyc0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgbWVjaExldHRlcnNBcnJbaV0uYW5pbWF0ZUxldHRlcigpO1xyXG4gICAgbWVjaExldHRlcnNBcnJbaV0uZHJhdygpO1xyXG4gICAgaWYgKG1lY2hMZXR0ZXJzQXJyW2ldLnBhdXNlZCA9PSB0cnVlKSB7blBhdXNlZCsrO31cclxuICB9XHJcbiAgaWYgKG5QYXVzZWQgPT0gbWVjaExldHRlcnNBcnIubGVuZ3RoKSB7Y2FuY2VsQW5pbWF0aW9uKCk7fVxyXG59XHJcblxyXG5mdW5jdGlvbiBjYW5jZWxBbmltYXRpb24oKSB7XHJcbiAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoZnJhbWVJZCk7XHJcbiAgaXNQYXVzZWQgPSB0cnVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVSdW5BbmltYXRpb24oKSB7XHJcbiAgaXNQYXVzZWQgPT09IGZhbHNlID8oIGlzUGF1c2VkID0gdHJ1ZSwgY2FuY2VsQW5pbWF0aW9uKCkgKSA6ICggaXNQYXVzZWQgPSBmYWxzZSwgYW5pbWF0ZSgpICApO1xyXG4gIHJldHVybiBpc1BhdXNlZDtcclxufVxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1pbnRlcm5hbCBmdW5jdGlvbnNcclxuZnVuY3Rpb24gY2xlYXJBcnJheXMoKSB7XHJcbiAgbWVjaExldHRlcnNBcnIubGVuZ3RoID0gMDtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdE1lY2hMZXR0ZXJzQXJyKHN0cikge1xyXG4gIGxldCBhcnIgPSBbXTtcclxuICBhcnIubGVuZ3RoID0gMDtcclxuICBmb3IgKGxldCBpID0wOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBzd2l0Y2ggKHN0cltpXSkge1xyXG4gICAgICBjYXNlICdoJzpcclxuICAgICAgYXJyLnB1c2goIG5ldyBMZXR0ZXJIKGkgKiBsZXR0ZXJXaWR0aCkgKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBhcnI7XHJcbn1cclxuXHJcbi8vY29uc3RydWN0b3IgZm9yIHByb3RvdHlwZSBvZiBiYXNlIExldHRlciBvYmplY3RcclxuZnVuY3Rpb24gTGV0dGVyKCkge1xyXG4gIHRoaXMubk1vdmVtZW50c0JlZm9yZVBhdXNlID0gMTtcclxuICB0aGlzLmluZGl2aWR1YWxBbmltYXRpb25TcGVlZCA9IDE7XHJcbiAgdGhpcy5zcGVlZCA9IG92ZXJhbGxBbmltYXRpb25TcGVlZCAqIHRoaXMuaW5kaXZpZHVhbEFuaW1hdGlvblNwZWVkO1xyXG4gIHRoaXMubk1vdmVtZW50cyA9IDA7XHJcbiAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcclxufVxyXG5MZXR0ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTGV0dGVyO1xyXG5cclxuTGV0dGVyLnByb3RvdHlwZS5jYWxjRWRnZXMgPSBmdW5jdGlvbihvZmZzZXQpIHtcclxuICBsZXQgZWRnZXMgPSB7XHJcbiAgICBsZWZ0OiBvZmZzZXQgKyAobGV0dGVyV2lkdGggLyBsZXR0ZXJQYWRkaW5nKSxcclxuICAgIHJpZ2h0OiBvZmZzZXQgKyBsZXR0ZXJXaWR0aCAtIChsZXR0ZXJXaWR0aCAvIGxldHRlclBhZGRpbmcpLFxyXG4gICAgdG9wOiBsZXR0ZXJIZWlnaHQgLyBsZXR0ZXJQYWRkaW5nLFxyXG4gICAgYm90dG9tOiBsZXR0ZXJIZWlnaHQgLSAobGV0dGVySGVpZ2h0IC8gbGV0dGVyUGFkZGluZylcclxuICB9O1xyXG4gIHJldHVybiBlZGdlcztcclxufVxyXG5cclxuLy9jb25zdHJ1Y3RvciBmb3IgdGhlIGxldHRlciAnSCcgb2JqZWN0c1xyXG5mdW5jdGlvbiBMZXR0ZXJIKG9mZnNldCkge1xyXG4gIExldHRlci5jYWxsKHRoaXMpO1xyXG4gIGxldCBlZGdlcyA9IHRoaXMuY2FsY0VkZ2VzKG9mZnNldCk7XHJcbiAgLy9vdmVyd3JpdGUgcHJvdG90eXBlIHByb3BlcnRpZXMgaWYgd2FudCBkaWZmZXJlbnQgdmFsdWVzIGZyb20gZGVmYXVsdHNcclxuICB0aGlzLm5Nb3ZlbWVudHNCZWZvcmVQYXVzZSA9IDM7XHJcbiAgLy9yYW5kb21pc2UgYW5pbWF0aW9uIGRpcmVjdGlvblxyXG4gIGlmIChNYXRoLnJhbmRvbSgpID49IDAuNSkge3RoaXMuc3BlZWQgPSAtdGhpcy5zcGVlZDt9XHJcbiAgLy92ZXJ0ZXggZGVmaW5pdGlvbnNcclxuICB0aGlzLmxlZnRWZXJ0aWNhbFAxID0geyB4OiBlZGdlcy5sZWZ0LCB5OiBlZGdlcy5ib3R0b20gfTtcclxuICB0aGlzLmxlZnRWZXJ0aWNhbFAyID0geyB4OiBlZGdlcy5sZWZ0LCB5OiBlZGdlcy50b3AgfTtcclxuICB0aGlzLmxlZnRWZXJ0aWNhbFAzID0geyB4OiBlZGdlcy5sZWZ0ICsgbGV0dGVyTGluZVdpZHRoLCB5OiBlZGdlcy50b3AgfTtcclxuICB0aGlzLmxlZnRWZXJ0aWNhbFA0ID0geyB4OiBlZGdlcy5sZWZ0ICsgbGV0dGVyTGluZVdpZHRoLCB5OiBlZGdlcy5ib3R0b20gfTtcclxuXHJcbiAgdGhpcy5yaWdodFZlcnRpY2FsUDEgPSB7IHg6IGVkZ2VzLnJpZ2h0IC0gbGV0dGVyTGluZVdpZHRoLCB5OiBlZGdlcy5ib3R0b20gfTtcclxuICB0aGlzLnJpZ2h0VmVydGljYWxQMiA9IHsgeDogZWRnZXMucmlnaHQgLSBsZXR0ZXJMaW5lV2lkdGgsIHk6IGVkZ2VzLnRvcCB9O1xyXG4gIHRoaXMucmlnaHRWZXJ0aWNhbFAzID0geyB4OiBlZGdlcy5yaWdodCwgeTogZWRnZXMudG9wIH07XHJcbiAgdGhpcy5yaWdodFZlcnRpY2FsUDQgPSB7IHg6IGVkZ2VzLnJpZ2h0LCB5OiBlZGdlcy5ib3R0b20gfTtcclxuXHJcbiAgdGhpcy5ob3Jpem9udGFsUDEgPSB7IHg6IGVkZ2VzLmxlZnQgKyBsZXR0ZXJMaW5lV2lkdGgsIHk6IChsZXR0ZXJIZWlnaHQgLyAyKSAtIChsZXR0ZXJMaW5lV2lkdGggLyAyKSB9O1xyXG4gIHRoaXMuaG9yaXpvbnRhbFAyID0geyB4OiBlZGdlcy5sZWZ0ICsgbGV0dGVyTGluZVdpZHRoLCB5OiAobGV0dGVySGVpZ2h0IC8gMikgKyAobGV0dGVyTGluZVdpZHRoIC8gMikgfTtcclxuICB0aGlzLmhvcml6b250YWxQMyA9IHsgeDogZWRnZXMucmlnaHQgLSBsZXR0ZXJMaW5lV2lkdGgsIHk6IChsZXR0ZXJIZWlnaHQgLyAyKSArIChsZXR0ZXJMaW5lV2lkdGggLyAyKSB9O1xyXG4gIHRoaXMuaG9yaXpvbnRhbFA0ID0geyB4OiBlZGdlcy5yaWdodCAtIGxldHRlckxpbmVXaWR0aCwgeTogKGxldHRlckhlaWdodCAvIDIpIC0gKGxldHRlckxpbmVXaWR0aCAvIDIpIH07XHJcbn1cclxuTGV0dGVySC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKExldHRlci5wcm90b3R5cGUpO1xyXG5MZXR0ZXJILnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IExldHRlckg7XHJcblxyXG5MZXR0ZXJILnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oKSB7XHJcbiAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gIGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yT25lO1xyXG4gIGN0eC5maWxsU3R5bGUgPSBjb2xvclR3bztcclxuICBjdHgubGluZVdpZHRoID0gbGV0dGVyTGluZVdpZHRoIC8gNDtcclxuICAvL2xlZnQgdmVydGljYWxcclxuICBjdHgubW92ZVRvKHRoaXMubGVmdFZlcnRpY2FsUDEueCwgdGhpcy5sZWZ0VmVydGljYWxQMS55KTtcclxuICBjdHgubGluZVRvKHRoaXMubGVmdFZlcnRpY2FsUDIueCwgdGhpcy5sZWZ0VmVydGljYWxQMi55KTtcclxuICBjdHguYXJjKHRoaXMubGVmdFZlcnRpY2FsUDIueCArIGxldHRlckxpbmVXaWR0aCAvIDIsIHRoaXMubGVmdFZlcnRpY2FsUDIueSwgbGV0dGVyTGluZVdpZHRoIC8gMiwgTWF0aC5QSSwgMCwgZmFsc2UpO1xyXG4gIGN0eC5saW5lVG8odGhpcy5sZWZ0VmVydGljYWxQNC54LCB0aGlzLmxlZnRWZXJ0aWNhbFA0LnkpO1xyXG4gIGN0eC5hcmModGhpcy5sZWZ0VmVydGljYWxQMi54ICsgbGV0dGVyTGluZVdpZHRoIC8gMiwgdGhpcy5sZWZ0VmVydGljYWxQMS55LCBsZXR0ZXJMaW5lV2lkdGggLyAyLCAwLCBNYXRoLlBJLCBmYWxzZSk7XHJcbiAgLy9yaWdodCB2ZXJ0aWNhbFxyXG4gIGN0eC5tb3ZlVG8odGhpcy5yaWdodFZlcnRpY2FsUDEueCwgdGhpcy5yaWdodFZlcnRpY2FsUDEueSk7XHJcbiAgY3R4LmxpbmVUbyh0aGlzLnJpZ2h0VmVydGljYWxQMi54LCB0aGlzLnJpZ2h0VmVydGljYWxQMi55KTtcclxuICBjdHguYXJjKHRoaXMucmlnaHRWZXJ0aWNhbFAyLnggKyBsZXR0ZXJMaW5lV2lkdGggLyAyLCB0aGlzLnJpZ2h0VmVydGljYWxQMi55LCBsZXR0ZXJMaW5lV2lkdGggLyAyLCBNYXRoLlBJLCAwLCBmYWxzZSk7XHJcbiAgY3R4LmxpbmVUbyh0aGlzLnJpZ2h0VmVydGljYWxQNC54LCB0aGlzLnJpZ2h0VmVydGljYWxQNC55KTtcclxuICBjdHguYXJjKHRoaXMucmlnaHRWZXJ0aWNhbFAyLnggKyBsZXR0ZXJMaW5lV2lkdGggLyAyLCB0aGlzLnJpZ2h0VmVydGljYWxQMS55LCBsZXR0ZXJMaW5lV2lkdGggLyAyLCAwLCBNYXRoLlBJLCBmYWxzZSk7XHJcbiAgLy9ob3Jpem9udGFsXHJcbiAgY3R4Lm1vdmVUbyh0aGlzLmhvcml6b250YWxQMS54LCB0aGlzLmhvcml6b250YWxQMS55KTtcclxuICBjdHgubGluZVRvKHRoaXMuaG9yaXpvbnRhbFAyLngsIHRoaXMuaG9yaXpvbnRhbFAyLnkpO1xyXG4gIGN0eC5saW5lVG8odGhpcy5ob3Jpem9udGFsUDMueCwgdGhpcy5ob3Jpem9udGFsUDMueSk7XHJcbiAgY3R4LmxpbmVUbyh0aGlzLmhvcml6b250YWxQNC54LCB0aGlzLmhvcml6b250YWxQNC55KTtcclxuICBjdHgubGluZVRvKHRoaXMuaG9yaXpvbnRhbFAxLngsIHRoaXMuaG9yaXpvbnRhbFAxLnkpO1xyXG4gIC8vY29sb3IgZWVyeXRoaW5nIGluXHJcbiAgY3R4LmZpbGwoKTtcclxuICBjdHguc3Ryb2tlKCk7XHJcbn1cclxuXHJcbkxldHRlckgucHJvdG90eXBlLmFuaW1hdGVMZXR0ZXIgPSBmdW5jdGlvbigpIHtcclxuICBpZiAoIHRoaXMubk1vdmVtZW50cyA+PSB0aGlzLm5Nb3ZlbWVudHNCZWZvcmVQYXVzZSAmJiBNYXRoLnJvdW5kKHRoaXMuaG9yaXpvbnRhbFAxLnkpID09IE1hdGgucm91bmQobGV0dGVySGVpZ2h0IC8gMiAtIGxldHRlckxpbmVXaWR0aCAvIDIpICkge1xyXG4gICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5uTW92ZW1lbnRzID0gMDtcclxuICB9XHJcbiAgaWYgKHRoaXMuaG9yaXpvbnRhbFAyLnkgPiBsZXR0ZXJIZWlnaHQgLSBsZXR0ZXJIZWlnaHQgLyBsZXR0ZXJQYWRkaW5nIHx8IHRoaXMuaG9yaXpvbnRhbFAxLnkgPCBsZXR0ZXJIZWlnaHQgLyBsZXR0ZXJQYWRkaW5nKSB7XHJcbiAgICB0aGlzLnNwZWVkID0gLXRoaXMuc3BlZWQ7XHJcbiAgICB0aGlzLm5Nb3ZlbWVudHMrKztcclxuICB9XHJcbiAgaWYgKHRoaXMucGF1c2VkID09IGZhbHNlICkge1xyXG4gICAgdGhpcy5ob3Jpem9udGFsUDEueSArPSB0aGlzLnNwZWVkO1xyXG4gICAgdGhpcy5ob3Jpem9udGFsUDIueSArPSB0aGlzLnNwZWVkO1xyXG4gICAgdGhpcy5ob3Jpem9udGFsUDMueSArPSB0aGlzLnNwZWVkO1xyXG4gICAgdGhpcy5ob3Jpem9udGFsUDQueSArPSB0aGlzLnNwZWVkO1xyXG4gIH1cclxufTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1leHBvcnRzXHJcbmV4cG9ydHMuaW5pdCA9IGluaXQ7XHJcbmV4cG9ydHMuYW5pbWF0ZSA9IGFuaW1hdGU7XHJcbmV4cG9ydHMuY2FuY2VsQW5pbWF0aW9uID0gY2FuY2VsQW5pbWF0aW9uO1xyXG5leHBvcnRzLnRvZ2dsZVJ1bkFuaW1hdGlvbiA9IHRvZ2dsZVJ1bkFuaW1hdGlvbjtcclxuIiwiLy8gcG9ydGZvbGlvXHJcbi8vIGFuaW1hdGlvbi11dGlscy5qc1xyXG5cclxuLy90byB3cnRpdGVcclxuZnVuY3Rpb24gcmFuZG9tQ29sb3JJblJhbmdlKHJlZExvdywgcmVkVXAsIGdyZWVuTG93LCBncmVlblVwLCBibHVlTG93LCBibHVlVXApIHtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJhbmRvbUNvbG9ycyhudW0pIHtcclxuICB2YXIgY2hhcnMgPSAnMDEyMzQ1Njc4OUFCQ0RFRic7XHJcbiAgdmFyIGhleDtcclxuICB2YXIgY29sb3JzID0gW107XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW07IGkrKykge1xyXG4gICAgaGV4ID0gJyMnO1xyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCA2OyBqKyspIHtcclxuICAgICAgaGV4ICs9IGNoYXJzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2KV07XHJcbiAgICB9XHJcbiAgICBjb2xvcnMucHVzaChoZXgpO1xyXG4gIH1cclxuICByZXR1cm4gY29sb3JzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3TG96ZW5nZShjdHgsIHgxLCB5MSwgeDIsIHkyLCByYWRpdXMpIHtcclxuICBsZXQgdGFuZ2VudEFuZ2xlID0gTWF0aC5hdGFuKCAoeTIgLSB5MSkgLyAoeDIgLSB4MSkgKTtcclxuICBsZXQgcHJlQ2FsY0R4ID0gKE1hdGguc2luKHRhbmdlbnRBbmdsZSkgKiByYWRpdXMpO1xyXG4gIGxldCBwcmVDYWxjRHkgPSAoTWF0aC5jb3ModGFuZ2VudEFuZ2xlKSAqIHJhZGl1cyk7XHJcbiAgbGV0IGNvcm5lcjEgPSB7IHg6IHgxICsgcHJlQ2FsY0R4LCB5OiB5MSAtIHByZUNhbGNEeSB9O1xyXG4gIGxldCBjb3JuZXIyID0geyB4OiB4MSAtIHByZUNhbGNEeCwgeTogeTEgKyBwcmVDYWxjRHkgfTtcclxuICBsZXQgY29ybmVyMyA9IHsgeDogeDIgLSBwcmVDYWxjRHgsIHk6IHkyICsgcHJlQ2FsY0R5IH07XHJcbiAgbGV0IGNvcm5lcjQgPSB7IHg6IHgyICsgcHJlQ2FsY0R4LCB5OiB5MiAtIHByZUNhbGNEeSB9O1xyXG4gIGxldCBhcGV4MSA9IHsgeDogeDEgLSBwcmVDYWxjRHksIHk6IHkxIC0gcHJlQ2FsY0R4IH07XHJcbiAgbGV0IGFwZXgyID0geyB4OiB4MiArIHByZUNhbGNEeSwgeTogeTIgKyBwcmVDYWxjRHggfTtcclxuICBsZXQgZXh0Q29ybmVyMSA9IHsgeDogY29ybmVyMS54ICsgcHJlQ2FsY0R5LCB5OiBjb3JuZXIxLnkgKyBwcmVDYWxjRHggfTtcclxuICBsZXQgZXh0Q29ybmVyMiA9IHsgeDogY29ybmVyMi54ICsgcHJlQ2FsY0R5LCB5OiBjb3JuZXIyLnkgKyBwcmVDYWxjRHggfTtcclxuICBsZXQgZXh0Q29ybmVyMyA9IHsgeDogY29ybmVyMy54IC0gcHJlQ2FsY0R5LCB5OiBjb3JuZXIzLnkgLSBwcmVDYWxjRHggfTtcclxuICBsZXQgZXh0Q29ybmVyNCA9IHsgeDogY29ybmVyNC54IC0gcHJlQ2FsY0R5LCB5OiBjb3JuZXI0LnkgLSBwcmVDYWxjRHggfTtcclxuICBpZiAoeDEgPiB4Mikge1xyXG4gICAgYXBleDEgPSB7IHg6IHgxICsgcHJlQ2FsY0R5LCB5OiB5MSArIHByZUNhbGNEeCB9O1xyXG4gICAgYXBleDIgPSB7IHg6IHgyIC0gcHJlQ2FsY0R5LCB5OiB5MiAtIHByZUNhbGNEeCB9O1xyXG4gIH1cclxuICBpZiAoeDEgPD0geDIpIHtcclxuICAgIGV4dENvcm5lcjEgPSB7IHg6IGNvcm5lcjEueCAtIHByZUNhbGNEeSwgeTogY29ybmVyMS55IC0gcHJlQ2FsY0R4IH07XHJcbiAgICBleHRDb3JuZXIyID0geyB4OiBjb3JuZXIyLnggLSBwcmVDYWxjRHksIHk6IGNvcm5lcjIueSAtIHByZUNhbGNEeCB9O1xyXG4gICAgZXh0Q29ybmVyMyA9IHsgeDogY29ybmVyMy54ICsgcHJlQ2FsY0R5LCB5OiBjb3JuZXIzLnkgKyBwcmVDYWxjRHggfTtcclxuICAgIGV4dENvcm5lcjQgPSB7IHg6IGNvcm5lcjQueCArIHByZUNhbGNEeSwgeTogY29ybmVyNC55ICsgcHJlQ2FsY0R4IH07XHJcbiAgfVxyXG5cclxuICBjdHgubW92ZVRvKGNvcm5lcjIueCwgY29ybmVyMi55KTtcclxuICBjdHgubGluZVRvKGNvcm5lcjMueCwgY29ybmVyMy55KTtcclxuICBjdHguYXJjVG8oZXh0Q29ybmVyMy54LCBleHRDb3JuZXIzLnksIGFwZXgyLngsIGFwZXgyLnksIHJhZGl1cyk7XHJcbiAgY3R4LmFyY1RvKGV4dENvcm5lcjQueCwgZXh0Q29ybmVyNC55LCBjb3JuZXI0LngsIGNvcm5lcjQueSwgcmFkaXVzKTtcclxuICBjdHgubGluZVRvKGNvcm5lcjEueCwgY29ybmVyMS55KTtcclxuICBjdHguYXJjVG8oZXh0Q29ybmVyMS54LCBleHRDb3JuZXIxLnksIGFwZXgxLngsIGFwZXgxLnksIHJhZGl1cyk7XHJcbiAgY3R4LmFyY1RvKGV4dENvcm5lcjIueCwgZXh0Q29ybmVyMi55LCBjb3JuZXIyLngsIGNvcm5lcjIueSwgcmFkaXVzKTtcclxuXHJcbi8qZGVidWdnaW5nIHN0dWZmLCBsZWF2ZSBjb21tZW50ZWQgb3V0Ki9cclxuLypcclxuICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgY3R4LmxpbmVXaWR0aCA9IDI7XHJcbiAgY3R4LnN0cm9rZVN0eWxlID0gJyMwMDAwZmYnO1xyXG4gIGN0eC5tb3ZlVG8oeDEsIHkxKTtcclxuICBjdHgubGluZVRvKHgyLCB5Mik7XHJcbiAgY3R4LnN0cm9rZSgpO1xyXG5cclxuICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgY3R4LmxpbmVXaWR0aCA9IDE7XHJcbiAgY3R4LnN0cm9rZVN0eWxlID0gJyNmZjAwZmYnO1xyXG4gIGN0eC5tb3ZlVG8oYXBleDEueCwgYXBleDEueSk7XHJcbiAgY3R4LmxpbmVUbyhhcGV4Mi54LCBhcGV4Mi55KTtcclxuICBjdHguc3Ryb2tlKCk7XHJcblxyXG4gIGN0eC5iZWdpblBhdGgoKTtcclxuICBjdHgubGluZVdpZHRoID0gMTtcclxuICBjdHguc3Ryb2tlU3R5bGUgPSAnI2ZmMDAwMCc7XHJcbiAgY3R4Lm1vdmVUbyhjb3JuZXIxLngsIGNvcm5lcjEueSk7XHJcbiAgY3R4LmxpbmVUbyhjb3JuZXIyLngsIGNvcm5lcjIueSk7XHJcbiAgY3R4LmxpbmVUbyhjb3JuZXIzLngsIGNvcm5lcjMueSk7XHJcbiAgY3R4LmxpbmVUbyhjb3JuZXI0LngsIGNvcm5lcjQueSk7XHJcbiAgY3R4LmxpbmVUbyhjb3JuZXIxLngsIGNvcm5lcjEueSk7XHJcbiAgY3R4LnN0cm9rZSgpO1xyXG5cclxuICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgY3R4LmxpbmVXaWR0aCA9IDI7XHJcbiAgY3R4LnN0cm9rZVN0eWxlID0gJyMwMGZmMDAnO1xyXG4gIGN0eC5tb3ZlVG8oZXh0Q29ybmVyMS54LCBleHRDb3JuZXIxLnkpO1xyXG4gIGN0eC5saW5lVG8oZXh0Q29ybmVyMi54LCBleHRDb3JuZXIyLnkpO1xyXG4gIGN0eC5saW5lVG8oZXh0Q29ybmVyMy54LCBleHRDb3JuZXIzLnkpO1xyXG4gIGN0eC5saW5lVG8oZXh0Q29ybmVyNC54LCBleHRDb3JuZXI0LnkpO1xyXG4gIGN0eC5saW5lVG8oZXh0Q29ybmVyMS54LCBleHRDb3JuZXIxLnkpO1xyXG4gIGN0eC5zdHJva2UoKTtcclxuICAqL1xyXG4gIC8qZW5kIG9mIGRlYnVnZ2luZyBzdHVmZiovXHJcbn1cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1leHBvcnRzXHJcbmV4cG9ydHMucmFuZG9tQ29sb3JzID0gcmFuZG9tQ29sb3JzO1xyXG5leHBvcnRzLmRyYXdMb3plbmdlID0gZHJhd0xvemVuZ2U7XHJcbiIsIi8vIHBvcnRmb2xpb1xyXG4vLyB3aWRnZXRyb25zLmpzXHJcblxyXG4vLyBGaWxlIGRlc2NyaXB0aW9uOlxyXG4vLyBTY3JpcHQgZmlsZSBsaW5rZWQgdG8gd2lkZ2V0cm9ucy5wdWdcclxuXHJcbmNvbnN0IGJvdW5jaW5nQ29sb3JlZERvdHMgPSByZXF1aXJlKCcuL3V0aWxzL2FuaW1hdGlvbi1ib3VuY2luZy1jb2xvcmVkLWRvdHMnKTtcclxuY29uc3QgbWVjaGFuaWNhbExldHRlcnMgPSByZXF1aXJlKCcuL3V0aWxzL2FuaW1hdGlvbi1tZWNoYW5pY2FsLWxldHRlcnMnKTtcclxuY29uc3QgbG96ZW5nZVRlc3RlciA9IHJlcXVpcmUoJy4vdXRpbHMvYW5pbWF0aW9uLWxvemVuZ2UtdGVzdGVyJyk7XHJcbmNvbnN0IGxvemVuZ2VTcGlycm9ncmFwaCA9IHJlcXVpcmUoJy4vdXRpbHMvYW5pbWF0aW9uLWxvemVuZ2Utc3BpcnJvZ3JhcGgnKTtcclxuLy9jb25zdCBtZWNoYW5pY2FsTGV0dGVyczIgPSByZXF1aXJlKCcuL3V0aWxzL2FuaW1hdGlvbi1tZWNoYW5pY2FsLWxldHRlcnMtMicpO1xyXG5cclxubGV0IHNlbGVjdGVkQW5pbWF0aW9uc0luZGV4ID0gMDtcclxubGV0IGFuaW1hdGlvbnMgPSBbXHJcbiAge1xyXG4gICAgdGV4dDogJ0JvdW5jaW5nIENvbG9yZWQgRG90cycsXHJcbiAgICBtb2R1bGU6IGJvdW5jaW5nQ29sb3JlZERvdHMsXHJcbiAgICBwYXJlbnRFbGVtZW50SWQ6ICdib3VuY2luZ0NvbG9yZWREb3RzJyxcclxuICAgIHBhdXNlQnV0dDogJ0JDRFRvZ2dsZVBhdXNlJyxcclxuICAgIHJlUnVuQnV0dDogJ0JDRFJlUnVuJyxcclxuICAgIG5DaXJjbGVzSW5wdXQ6ICdCQ0RJbnB1dE5DaXJjbGVzJyxcclxuICAgIHJhZGl1c0lucHV0OiAnQkNESW5wdXRSYWRpdXMnLFxyXG4gICAgYXJlYU9mRWZmZWN0SW5wdXQ6ICdCQ0RJbnB1dEFvRScsXHJcbiAgICBvcHRzOiB7XHJcbiAgICAgIGNhbnZhczogJ0JDRENhbnZhcycsXHJcbiAgICAgIG5DaXJjbGVzOiAyMDAsXHJcbiAgICAgIHJhZGl1czogMixcclxuICAgICAgYXJlYU9mRWZmZWN0OiA4MFxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgdGV4dDogJ01lY2hhbmNpYWwgTGV0dGVycycsXHJcbiAgICBtb2R1bGU6IG1lY2hhbmljYWxMZXR0ZXJzLFxyXG4gICAgcGFyZW50RWxlbWVudElkOiAnbWVjaGFuaWNhbExldHRlcnMnLFxyXG4gICAgcGF1c2VCdXR0OiAnTUxUb2dnbGVQYXVzZScsXHJcbiAgICByZVJ1bkJ1dHQ6ICdNTFJlUnVuJyxcclxuICAgIG9wdHM6IHtcclxuICAgICAgY2FudmFzOiAnTUxDYW52YXMnLFxyXG4gICAgICBzdHI6ICdoaGhoJ1xyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgdGV4dDogJ0xvemVuZ2UgVGVzdGVyJyxcclxuICAgIG1vZHVsZTogbG96ZW5nZVRlc3RlcixcclxuICAgIHBhcmVudEVsZW1lbnRJZDogJ2xvemVuZ2VUZXN0ZXInLFxyXG4gICAgeDFTbGlkZXI6ICdMVHgxJyxcclxuICAgIHkxU2xpZGVyOiAnTFR5MScsXHJcbiAgICB4MlNsaWRlcjogJ0xUeDInLFxyXG4gICAgeTJTbGlkZXI6ICdMVHkyJyxcclxuICAgIG9wdHM6IHtcclxuICAgICAgY2FudmFzOiAnTFRDYW52YXMnLFxyXG4gICAgICB4MTogMjAwLFxyXG4gICAgICB5MTogMjAwLFxyXG4gICAgICB4MjogMjUwLFxyXG4gICAgICB5MjogMjUwXHJcbiAgICB9XHJcbiAgfSxcclxuICB7XHJcbiAgICB0ZXh0OiAnTG96ZW5nZSBTcGlycm9ncmFwaCcsXHJcbiAgICBtb2R1bGU6IGxvemVuZ2VTcGlycm9ncmFwaCxcclxuICAgIHBhcmVudEVsZW1lbnRJZDogJ2xvemVuZ2VTcGlycm9ncmFwaCcsXHJcbiAgICByZXZlcnNlRFhCdXR0OiAnTFNSZXZlcnNlRFhCdXR0JyxcclxuICAgIHJldmVyc2VEWUJ1dHQ6ICdMU1JldmVyc2VEWUJ1dHQnLFxyXG4gICAgc3dpdGNoWFlCdXR0OiAnTFNTd2l0Y2hYWUJ1dHQnLFxyXG4gICAgb3B0czoge1xyXG4gICAgICBjYW52YXM6ICdMU0NhbnZhcydcclxuICAgIH1cclxuICB9XHJcbl07XHJcblxyXG4vL2luaXRpYWxpc2UgYWZ0ZXIgRE9NIGxvYWRlZFxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICBpbml0QW5pbWF0aW9uUGlja2VyKCk7XHJcbiAgYm91bmNpbmdDb2xvcmVkRG90cy5pbml0KGFuaW1hdGlvbnNbMF1bJ29wdHMnXSk7XHJcbiAgYWRkQkNERXZlbnRMaXN0ZW5lclBhdXNlKCk7XHJcbiAgYWRkQkNERXZlbnRMaXN0ZW5lclJlUnVuKCk7XHJcbiAgbWVjaGFuaWNhbExldHRlcnMuaW5pdChhbmltYXRpb25zWzFdWydvcHRzJ10pO1xyXG4gIGFkZE1MRXZlbnRMaXN0ZW5lclBhdXNlKCk7XHJcbiAgYWRkTUxFdmVudExpc3RlbmVyUmVSdW4oKTtcclxuICBsb3plbmdlVGVzdGVyLmluaXQoYW5pbWF0aW9uc1syXVsnb3B0cyddKTtcclxuICBhZGRMVEV2ZW50TGlzdGVuZXJYMVNsaWRlcigpO1xyXG4gIGFkZExURXZlbnRMaXN0ZW5lclkxU2xpZGVyKCk7XHJcbiAgYWRkTFRFdmVudExpc3RlbmVyWDJTbGlkZXIoKTtcclxuICBhZGRMVEV2ZW50TGlzdGVuZXJZMlNsaWRlcigpO1xyXG4gIGxvemVuZ2VTcGlycm9ncmFwaC5pbml0KGFuaW1hdGlvbnNbM11bJ29wdHMnXSk7XHJcbiAgbG96ZW5nZVNwaXJyb2dyYXBoLmFuaW1hdGUoKTtcclxuICBhZGRMU0V2ZW50TGlzdGVuZXJSZXZlcnNlRFgoKTtcclxuICBhZGRMU0V2ZW50TGlzdGVuZXJSZXZlcnNlRFkoKTtcclxuICBhZGRMU0V2ZW50TGlzdGVuZXJTd2l0Y2hYWSgpO1xyXG4gIHN0YXJ0U2VsZWN0ZWRBbmltYXRpb24oKTtcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tYW5pbWF0aW9uIHBpY2tlciBjb250cm9sc1xyXG5mdW5jdGlvbiBpbml0QW5pbWF0aW9uUGlja2VyKCkge1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3RlZEFuaW1hdGlvbicpLmlubmVySFRNTCA9IGFuaW1hdGlvbnNbc2VsZWN0ZWRBbmltYXRpb25zSW5kZXhdLnRleHQ7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXZBbmltYXRpb24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbGVjdEFuaW1hdGlvbignZGVjJykpO1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXh0QW5pbWF0aW9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZWxlY3RBbmltYXRpb24oJ2luYycpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VsZWN0QW5pbWF0aW9uKGluY09yRGVjKSB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKGluY09yRGVjID09PSAnZGVjJykge3NlbGVjdGVkQW5pbWF0aW9uc0luZGV4LS07fVxyXG4gICAgaWYgKGluY09yRGVjID09PSAnaW5jJykge3NlbGVjdGVkQW5pbWF0aW9uc0luZGV4Kys7fVxyXG4gICAgaWYgKHNlbGVjdGVkQW5pbWF0aW9uc0luZGV4ID09PSAtMSkge3NlbGVjdGVkQW5pbWF0aW9uc0luZGV4ID0gYW5pbWF0aW9ucy5sZW5ndGggLSAxO31cclxuICAgIGlmIChzZWxlY3RlZEFuaW1hdGlvbnNJbmRleCA9PT0gYW5pbWF0aW9ucy5sZW5ndGgpIHsgc2VsZWN0ZWRBbmltYXRpb25zSW5kZXggPSAwO31cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3RlZEFuaW1hdGlvbicpLmlubmVySFRNTCA9IGFuaW1hdGlvbnNbc2VsZWN0ZWRBbmltYXRpb25zSW5kZXhdLnRleHQ7XHJcbiAgICBjYW5jZWxBbGxBbmltYXRpb25zKCk7XHJcbiAgICBzdGFydFNlbGVjdGVkQW5pbWF0aW9uKCk7XHJcbiAgfVxyXG59XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1nZW5lcmljICYgY29tbW9uIGFuaW1hdGlvbiBjb250cm9sc1xyXG5mdW5jdGlvbiBjYW5jZWxBbGxBbmltYXRpb25zKCkge1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYW5pbWF0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYoIGFuaW1hdGlvbnNbaV0uaGFzT3duUHJvcGVydHkoJ3BhdXNlQnV0dCcpICkge1xyXG4gICAgICBhbmltYXRpb25zW2ldWydtb2R1bGUnXS5jYW5jZWxBbmltYXRpb24oKTtcclxuICAgIH1cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGFuaW1hdGlvbnNbaV1bJ3BhcmVudEVsZW1lbnRJZCddKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc3RhcnRTZWxlY3RlZEFuaW1hdGlvbigpIHtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhbmltYXRpb25zW3NlbGVjdGVkQW5pbWF0aW9uc0luZGV4XVsncGFyZW50RWxlbWVudElkJ10pLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgaWYgKCBhbmltYXRpb25zW3NlbGVjdGVkQW5pbWF0aW9uc0luZGV4XS5oYXNPd25Qcm9wZXJ0eSgncGF1c2VCdXR0JykgKSB7XHJcbiAgICAgIGFuaW1hdGlvbnNbc2VsZWN0ZWRBbmltYXRpb25zSW5kZXhdWydtb2R1bGUnXS5hbmltYXRlKCk7XHJcbiAgICAgIHN0eWxlUGF1c2VCdXR0KGFuaW1hdGlvbnNbc2VsZWN0ZWRBbmltYXRpb25zSW5kZXhdWydwYXVzZUJ1dHQnXSwgZmFsc2UpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc3R5bGVQYXVzZUJ1dHQocGF1c2VCdXR0LCBpc1BhdXNlZCkge1xyXG4gIGlmIChpc1BhdXNlZCA9PT0gdHJ1ZSkge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGF1c2VCdXR0KS5jbGFzc0xpc3QucmVtb3ZlKCdhbmltYXRpb25Db250cm9sVW5wYXVzZWQnKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhdXNlQnV0dCkuY2xhc3NMaXN0LmFkZCgnYW5pbWF0aW9uQ29udHJvbFBhdXNlZCcpO1xyXG4gIH1cclxuICBpZiAoaXNQYXVzZWQgPT09IGZhbHNlKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXVzZUJ1dHQpLmNsYXNzTGlzdC5yZW1vdmUoJ2FuaW1hdGlvbkNvbnRyb2xQYXVzZWQnKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhdXNlQnV0dCkuY2xhc3NMaXN0LmFkZCgnYW5pbWF0aW9uQ29udHJvbFVucGF1c2VkJyk7XHJcbiAgfVxyXG59XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1pbmRpdmlkdWFsIGFuaW1hdGlvbiBjb250cm9sc1xyXG4vL2JvdW5jaW5nIGNvbG9yZWQgZG90c1xyXG5mdW5jdGlvbiBhZGRCQ0RFdmVudExpc3RlbmVyUGF1c2UoKSB7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYW5pbWF0aW9uc1swXVsncGF1c2VCdXR0J10pLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIGxldCBpc1BhdXNlZCA9IGJvdW5jaW5nQ29sb3JlZERvdHMudG9nZ2xlUnVuQW5pbWF0aW9uKCk7XHJcbiAgICBzdHlsZVBhdXNlQnV0dChhbmltYXRpb25zWzBdWydwYXVzZUJ1dHQnXSwgaXNQYXVzZWQpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRCQ0RFdmVudExpc3RlbmVyUmVSdW4oKSB7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYW5pbWF0aW9uc1swXVsncmVSdW5CdXR0J10pLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIGFuaW1hdGlvbnNbMF1bJ29wdHMnXS5uQ2lyY2xlcyA9IHBhcnNlSW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGFuaW1hdGlvbnNbMF1bJ25DaXJjbGVzSW5wdXQnXSkudmFsdWUpO1xyXG4gICAgYW5pbWF0aW9uc1swXVsnb3B0cyddLnJhZGl1cyA9IHBhcnNlSW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGFuaW1hdGlvbnNbMF1bJ3JhZGl1c0lucHV0J10pLnZhbHVlKTtcclxuICAgIGFuaW1hdGlvbnNbMF1bJ29wdHMnXS5hcmVhT2ZFZmZlY3QgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhbmltYXRpb25zWzBdWydhcmVhT2ZFZmZlY3RJbnB1dCddKS52YWx1ZSk7XHJcbiAgICBib3VuY2luZ0NvbG9yZWREb3RzLmluaXQoYW5pbWF0aW9uc1swXVsnb3B0cyddKTtcclxuICAgIGJvdW5jaW5nQ29sb3JlZERvdHMuYW5pbWF0ZSgpO1xyXG4gICAgc3R5bGVQYXVzZUJ1dHQoYW5pbWF0aW9uc1swXVsncGF1c2VCdXR0J10sIGZhbHNlKTtcclxuICB9KTtcclxufVxyXG5cclxuLy9tZWNoYW5pY2FsIGxldHRlcnNcclxuZnVuY3Rpb24gYWRkTUxFdmVudExpc3RlbmVyUGF1c2UoKSB7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYW5pbWF0aW9uc1sxXVsncGF1c2VCdXR0J10pLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIGxldCBpc1BhdXNlZCA9IG1lY2hhbmljYWxMZXR0ZXJzLnRvZ2dsZVJ1bkFuaW1hdGlvbigpO1xyXG4gICAgc3R5bGVQYXVzZUJ1dHQoYW5pbWF0aW9uc1sxXVsncGF1c2VCdXR0J10sIGlzUGF1c2VkKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkTUxFdmVudExpc3RlbmVyUmVSdW4oKSB7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYW5pbWF0aW9uc1sxXVsncmVSdW5CdXR0J10pLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIG1lY2hhbmljYWxMZXR0ZXJzLmluaXQoYW5pbWF0aW9uc1sxXVsnb3B0cyddKTtcclxuICAgIG1lY2hhbmljYWxMZXR0ZXJzLmFuaW1hdGUoKTtcclxuICAgIHN0eWxlUGF1c2VCdXR0KGFuaW1hdGlvbnNbMV1bJ3BhdXNlQnV0dCddLCBmYWxzZSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8vbG96ZW5nZSB0ZXN0ZXJcclxuZnVuY3Rpb24gYWRkTFRFdmVudExpc3RlbmVyWDFTbGlkZXIoKSB7XHJcbiAgbGV0IHgxU2xpZGVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGFuaW1hdGlvbnNbMl1bJ3gxU2xpZGVyJ10pO1xyXG4gIHgxU2xpZGVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBhbmltYXRpb25zWzJdWydvcHRzJ10ueDEgPSBwYXJzZUludCh4MVNsaWRlckVsZW1lbnQudmFsdWUpO1xyXG4gICAgbG96ZW5nZVRlc3Rlci5pbml0KGFuaW1hdGlvbnNbMl1bJ29wdHMnXSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZExURXZlbnRMaXN0ZW5lclkxU2xpZGVyKCkge1xyXG4gIGxldCB5MVNsaWRlckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhbmltYXRpb25zWzJdWyd5MVNsaWRlciddKTtcclxuICB5MVNsaWRlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgYW5pbWF0aW9uc1syXVsnb3B0cyddLnkxID0gcGFyc2VJbnQoeTFTbGlkZXJFbGVtZW50LnZhbHVlKTtcclxuICAgIGxvemVuZ2VUZXN0ZXIuaW5pdChhbmltYXRpb25zWzJdWydvcHRzJ10pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRMVEV2ZW50TGlzdGVuZXJYMlNsaWRlcigpIHtcclxuICBsZXQgeDJTbGlkZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYW5pbWF0aW9uc1syXVsneDJTbGlkZXInXSk7XHJcbiAgeDJTbGlkZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIGFuaW1hdGlvbnNbMl1bJ29wdHMnXS54MiA9IHBhcnNlSW50KHgyU2xpZGVyRWxlbWVudC52YWx1ZSk7XHJcbiAgICBsb3plbmdlVGVzdGVyLmluaXQoYW5pbWF0aW9uc1syXVsnb3B0cyddKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkTFRFdmVudExpc3RlbmVyWTJTbGlkZXIoKSB7XHJcbiAgbGV0IHkyU2xpZGVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGFuaW1hdGlvbnNbMl1bJ3kyU2xpZGVyJ10pO1xyXG4gIHkyU2xpZGVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBhbmltYXRpb25zWzJdWydvcHRzJ10ueTIgPSBwYXJzZUludCh5MlNsaWRlckVsZW1lbnQudmFsdWUpO1xyXG4gICAgbG96ZW5nZVRlc3Rlci5pbml0KGFuaW1hdGlvbnNbMl1bJ29wdHMnXSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8vbG96ZW5nZSBTcGlycm9ncmFwaFxyXG5mdW5jdGlvbiBhZGRMU0V2ZW50TGlzdGVuZXJSZXZlcnNlRFgoKSB7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYW5pbWF0aW9uc1szXVsncmV2ZXJzZURYQnV0dCddKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxvemVuZ2VTcGlycm9ncmFwaC5yZXZlcnNlRFgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRMU0V2ZW50TGlzdGVuZXJSZXZlcnNlRFkoKSB7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYW5pbWF0aW9uc1szXVsncmV2ZXJzZURZQnV0dCddKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxvemVuZ2VTcGlycm9ncmFwaC5yZXZlcnNlRFkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRMU0V2ZW50TGlzdGVuZXJTd2l0Y2hYWSgpIHtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhbmltYXRpb25zWzNdWydzd2l0Y2hYWUJ1dHQnXSkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsb3plbmdlU3BpcnJvZ3JhcGguc3dpdGNoWFkpO1xyXG59XHJcbiJdfQ==
