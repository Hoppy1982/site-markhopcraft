(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// portfolio
// site-layout.js

// File description:
//

const animationsUtils = require('./utils/animation-utils')
const animationsOrbits = require('./utils/animation-orbits');
const animationsLogo = require('./utils/animation-logo');



//start logo animation
window.onload = function() {
  randomAni1Colors();
  animationsLogo.init('canvasLogo');
}


//change orbity colors on header click
randomAni1Colors = function() {
  var colors = animationsUtils.randomColors(4);
  animationsOrbits.animationOne('canvas1', colors[0], colors[1], colors[2], colors[3]);
}

//
reposNav = function() {
  var scrollPos = window.scrollY;
  var nav = document.getElementById('nav');
  var antiNav = document.getElementById('antiNav');

  if (scrollPos < 140) {
    nav.classList.remove('scrollOffTopNav');
    nav.classList.add('scrollTopNav');
    antiNav.classList.remove('antiNavHere');
    antiNav.classList.add('antiNavGone');
  } else {
    nav.classList.remove('scrollTopNav');
    nav.classList.add('scrollOffTopNav');
    antiNav.classList.remove('antiNavGone');
    antiNav.classList.add('antiNavHere');
  }
}

expandNav = function() {
  console.log('Expanding navbar');
  var navButts = document.getElementsByClassName('navButtBigScreen');

  Array.prototype.forEach.call(navButts, function(element) {
    element.classList.toggle('showNavButts');
  });
}

},{"./utils/animation-logo":2,"./utils/animation-orbits":3,"./utils/animation-utils":4}],2:[function(require,module,exports){
// portfolio
// animation-logo.js

// File description:
//

// **canvas is 140 wide & 140 high**
function init() {
  console.log("placeholder for animationsLogo init()");
}


module.exports = {
  init
};

},{}],3:[function(require,module,exports){
// portfolio
// animation-orbits.js

// File description:
//

module.exports.animationOne = function(el, color1, color2, color3, color4) {

  window.requestAnimationFrame(draw);

  function draw() {
    var time = new Date();
    var ctx = document.getElementById(el).getContext('2d');
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, 140, 140);

    ctx.save();
    ctx.translate(70, 70);

    ctx.rotate(((2 * Math.PI) / 4) * time.getSeconds() + ((2 * Math.PI) / 4000) * time.getMilliseconds());
    ctx.translate(4, 6);
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0, Math.PI * 2, false);
    ctx.lineWidth = 4;
    ctx.strokeStyle = color1;
    ctx.stroke();

    ctx.rotate(((2 * Math.PI) / 12) * time.getSeconds() + ((2 * Math.PI) / 12000) * time.getMilliseconds());
    ctx.translate(0, 26);
    ctx.beginPath();
    ctx.arc(0, 13, 4, 0, Math.PI * 2, false);
    ctx.lineWidth = 3;
    ctx.strokeStyle = color2;
    ctx.stroke();

    ctx.translate(0, 13);
    ctx.rotate(((2 * Math.PI) / 3) * time.getSeconds() + ((2 * Math.PI) / 3000) * time.getMilliseconds());
    ctx.beginPath();
    ctx.arc(0, 14, 3, 0, Math.PI * 2, false);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color3;
    ctx.stroke();

    ctx.translate(0, 14);
    //ctx.rotate(((2 * Math.PI) / 1) * time.getSeconds() + ((2 * Math.PI) / 1000) * time.getMilliseconds());
    ctx.rotate( ((2 * Math.PI)) - (((2 * Math.PI) / 0.6) * time.getSeconds() + ((2 * Math.PI) / 600) * time.getMilliseconds())  );
    ctx.beginPath();
    ctx.arc(0, 7, 1, 0, Math.PI * 2, false);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color4;
    ctx.stroke();

    ctx.restore();

    window.requestAnimationFrame(draw);
  }

}

},{}],4:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc3RhdGljL3Jhdy1qYXZhc2NyaXB0cy9zaXRlLWxheW91dC5qcyIsImFwcC9zdGF0aWMvcmF3LWphdmFzY3JpcHRzL3V0aWxzL2FuaW1hdGlvbi1sb2dvLmpzIiwiYXBwL3N0YXRpYy9yYXctamF2YXNjcmlwdHMvdXRpbHMvYW5pbWF0aW9uLW9yYml0cy5qcyIsImFwcC9zdGF0aWMvcmF3LWphdmFzY3JpcHRzL3V0aWxzL2FuaW1hdGlvbi11dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gcG9ydGZvbGlvXHJcbi8vIHNpdGUtbGF5b3V0LmpzXHJcblxyXG4vLyBGaWxlIGRlc2NyaXB0aW9uOlxyXG4vL1xyXG5cclxuY29uc3QgYW5pbWF0aW9uc1V0aWxzID0gcmVxdWlyZSgnLi91dGlscy9hbmltYXRpb24tdXRpbHMnKVxyXG5jb25zdCBhbmltYXRpb25zT3JiaXRzID0gcmVxdWlyZSgnLi91dGlscy9hbmltYXRpb24tb3JiaXRzJyk7XHJcbmNvbnN0IGFuaW1hdGlvbnNMb2dvID0gcmVxdWlyZSgnLi91dGlscy9hbmltYXRpb24tbG9nbycpO1xyXG5cclxuXHJcblxyXG4vL3N0YXJ0IGxvZ28gYW5pbWF0aW9uXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICByYW5kb21BbmkxQ29sb3JzKCk7XHJcbiAgYW5pbWF0aW9uc0xvZ28uaW5pdCgnY2FudmFzTG9nbycpO1xyXG59XHJcblxyXG5cclxuLy9jaGFuZ2Ugb3JiaXR5IGNvbG9ycyBvbiBoZWFkZXIgY2xpY2tcclxucmFuZG9tQW5pMUNvbG9ycyA9IGZ1bmN0aW9uKCkge1xyXG4gIHZhciBjb2xvcnMgPSBhbmltYXRpb25zVXRpbHMucmFuZG9tQ29sb3JzKDQpO1xyXG4gIGFuaW1hdGlvbnNPcmJpdHMuYW5pbWF0aW9uT25lKCdjYW52YXMxJywgY29sb3JzWzBdLCBjb2xvcnNbMV0sIGNvbG9yc1syXSwgY29sb3JzWzNdKTtcclxufVxyXG5cclxuLy9cclxucmVwb3NOYXYgPSBmdW5jdGlvbigpIHtcclxuICB2YXIgc2Nyb2xsUG9zID0gd2luZG93LnNjcm9sbFk7XHJcbiAgdmFyIG5hdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXYnKTtcclxuICB2YXIgYW50aU5hdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbnRpTmF2Jyk7XHJcblxyXG4gIGlmIChzY3JvbGxQb3MgPCAxNDApIHtcclxuICAgIG5hdi5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGxPZmZUb3BOYXYnKTtcclxuICAgIG5hdi5jbGFzc0xpc3QuYWRkKCdzY3JvbGxUb3BOYXYnKTtcclxuICAgIGFudGlOYXYuY2xhc3NMaXN0LnJlbW92ZSgnYW50aU5hdkhlcmUnKTtcclxuICAgIGFudGlOYXYuY2xhc3NMaXN0LmFkZCgnYW50aU5hdkdvbmUnKTtcclxuICB9IGVsc2Uge1xyXG4gICAgbmF2LmNsYXNzTGlzdC5yZW1vdmUoJ3Njcm9sbFRvcE5hdicpO1xyXG4gICAgbmF2LmNsYXNzTGlzdC5hZGQoJ3Njcm9sbE9mZlRvcE5hdicpO1xyXG4gICAgYW50aU5hdi5jbGFzc0xpc3QucmVtb3ZlKCdhbnRpTmF2R29uZScpO1xyXG4gICAgYW50aU5hdi5jbGFzc0xpc3QuYWRkKCdhbnRpTmF2SGVyZScpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwYW5kTmF2ID0gZnVuY3Rpb24oKSB7XHJcbiAgY29uc29sZS5sb2coJ0V4cGFuZGluZyBuYXZiYXInKTtcclxuICB2YXIgbmF2QnV0dHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCduYXZCdXR0QmlnU2NyZWVuJyk7XHJcblxyXG4gIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwobmF2QnV0dHMsIGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvd05hdkJ1dHRzJyk7XHJcbiAgfSk7XHJcbn1cclxuIiwiLy8gcG9ydGZvbGlvXHJcbi8vIGFuaW1hdGlvbi1sb2dvLmpzXHJcblxyXG4vLyBGaWxlIGRlc2NyaXB0aW9uOlxyXG4vL1xyXG5cclxuLy8gKipjYW52YXMgaXMgMTQwIHdpZGUgJiAxNDAgaGlnaCoqXHJcbmZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgY29uc29sZS5sb2coXCJwbGFjZWhvbGRlciBmb3IgYW5pbWF0aW9uc0xvZ28gaW5pdCgpXCIpO1xyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgaW5pdFxyXG59O1xyXG4iLCIvLyBwb3J0Zm9saW9cclxuLy8gYW5pbWF0aW9uLW9yYml0cy5qc1xyXG5cclxuLy8gRmlsZSBkZXNjcmlwdGlvbjpcclxuLy9cclxuXHJcbm1vZHVsZS5leHBvcnRzLmFuaW1hdGlvbk9uZSA9IGZ1bmN0aW9uKGVsLCBjb2xvcjEsIGNvbG9yMiwgY29sb3IzLCBjb2xvcjQpIHtcclxuXHJcbiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcclxuXHJcbiAgZnVuY3Rpb24gZHJhdygpIHtcclxuICAgIHZhciB0aW1lID0gbmV3IERhdGUoKTtcclxuICAgIHZhciBjdHggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbCkuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnc291cmNlLW92ZXInO1xyXG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCAxNDAsIDE0MCk7XHJcblxyXG4gICAgY3R4LnNhdmUoKTtcclxuICAgIGN0eC50cmFuc2xhdGUoNzAsIDcwKTtcclxuXHJcbiAgICBjdHgucm90YXRlKCgoMiAqIE1hdGguUEkpIC8gNCkgKiB0aW1lLmdldFNlY29uZHMoKSArICgoMiAqIE1hdGguUEkpIC8gNDAwMCkgKiB0aW1lLmdldE1pbGxpc2Vjb25kcygpKTtcclxuICAgIGN0eC50cmFuc2xhdGUoNCwgNik7XHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHguYXJjKDAsIDAsIDEyLCAwLCBNYXRoLlBJICogMiwgZmFsc2UpO1xyXG4gICAgY3R4LmxpbmVXaWR0aCA9IDQ7XHJcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjE7XHJcbiAgICBjdHguc3Ryb2tlKCk7XHJcblxyXG4gICAgY3R4LnJvdGF0ZSgoKDIgKiBNYXRoLlBJKSAvIDEyKSAqIHRpbWUuZ2V0U2Vjb25kcygpICsgKCgyICogTWF0aC5QSSkgLyAxMjAwMCkgKiB0aW1lLmdldE1pbGxpc2Vjb25kcygpKTtcclxuICAgIGN0eC50cmFuc2xhdGUoMCwgMjYpO1xyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgY3R4LmFyYygwLCAxMywgNCwgMCwgTWF0aC5QSSAqIDIsIGZhbHNlKTtcclxuICAgIGN0eC5saW5lV2lkdGggPSAzO1xyXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3IyO1xyXG4gICAgY3R4LnN0cm9rZSgpO1xyXG5cclxuICAgIGN0eC50cmFuc2xhdGUoMCwgMTMpO1xyXG4gICAgY3R4LnJvdGF0ZSgoKDIgKiBNYXRoLlBJKSAvIDMpICogdGltZS5nZXRTZWNvbmRzKCkgKyAoKDIgKiBNYXRoLlBJKSAvIDMwMDApICogdGltZS5nZXRNaWxsaXNlY29uZHMoKSk7XHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHguYXJjKDAsIDE0LCAzLCAwLCBNYXRoLlBJICogMiwgZmFsc2UpO1xyXG4gICAgY3R4LmxpbmVXaWR0aCA9IDI7XHJcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjM7XHJcbiAgICBjdHguc3Ryb2tlKCk7XHJcblxyXG4gICAgY3R4LnRyYW5zbGF0ZSgwLCAxNCk7XHJcbiAgICAvL2N0eC5yb3RhdGUoKCgyICogTWF0aC5QSSkgLyAxKSAqIHRpbWUuZ2V0U2Vjb25kcygpICsgKCgyICogTWF0aC5QSSkgLyAxMDAwKSAqIHRpbWUuZ2V0TWlsbGlzZWNvbmRzKCkpO1xyXG4gICAgY3R4LnJvdGF0ZSggKCgyICogTWF0aC5QSSkpIC0gKCgoMiAqIE1hdGguUEkpIC8gMC42KSAqIHRpbWUuZ2V0U2Vjb25kcygpICsgKCgyICogTWF0aC5QSSkgLyA2MDApICogdGltZS5nZXRNaWxsaXNlY29uZHMoKSkgICk7XHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHguYXJjKDAsIDcsIDEsIDAsIE1hdGguUEkgKiAyLCBmYWxzZSk7XHJcbiAgICBjdHgubGluZVdpZHRoID0gMjtcclxuICAgIGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yNDtcclxuICAgIGN0eC5zdHJva2UoKTtcclxuXHJcbiAgICBjdHgucmVzdG9yZSgpO1xyXG5cclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCIvLyBwb3J0Zm9saW9cclxuLy8gYW5pbWF0aW9uLXV0aWxzLmpzXHJcblxyXG4vL3RvIHdydGl0ZVxyXG5mdW5jdGlvbiByYW5kb21Db2xvckluUmFuZ2UocmVkTG93LCByZWRVcCwgZ3JlZW5Mb3csIGdyZWVuVXAsIGJsdWVMb3csIGJsdWVVcCkge1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gcmFuZG9tQ29sb3JzKG51bSkge1xyXG4gIHZhciBjaGFycyA9ICcwMTIzNDU2Nzg5QUJDREVGJztcclxuICB2YXIgaGV4O1xyXG4gIHZhciBjb2xvcnMgPSBbXTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IG51bTsgaSsrKSB7XHJcbiAgICBoZXggPSAnIyc7XHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDY7IGorKykge1xyXG4gICAgICBoZXggKz0gY2hhcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTYpXTtcclxuICAgIH1cclxuICAgIGNvbG9ycy5wdXNoKGhleCk7XHJcbiAgfVxyXG4gIHJldHVybiBjb2xvcnM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdMb3plbmdlKGN0eCwgeDEsIHkxLCB4MiwgeTIsIHJhZGl1cykge1xyXG4gIGxldCB0YW5nZW50QW5nbGUgPSBNYXRoLmF0YW4oICh5MiAtIHkxKSAvICh4MiAtIHgxKSApO1xyXG4gIGxldCBwcmVDYWxjRHggPSAoTWF0aC5zaW4odGFuZ2VudEFuZ2xlKSAqIHJhZGl1cyk7XHJcbiAgbGV0IHByZUNhbGNEeSA9IChNYXRoLmNvcyh0YW5nZW50QW5nbGUpICogcmFkaXVzKTtcclxuICBsZXQgY29ybmVyMSA9IHsgeDogeDEgKyBwcmVDYWxjRHgsIHk6IHkxIC0gcHJlQ2FsY0R5IH07XHJcbiAgbGV0IGNvcm5lcjIgPSB7IHg6IHgxIC0gcHJlQ2FsY0R4LCB5OiB5MSArIHByZUNhbGNEeSB9O1xyXG4gIGxldCBjb3JuZXIzID0geyB4OiB4MiAtIHByZUNhbGNEeCwgeTogeTIgKyBwcmVDYWxjRHkgfTtcclxuICBsZXQgY29ybmVyNCA9IHsgeDogeDIgKyBwcmVDYWxjRHgsIHk6IHkyIC0gcHJlQ2FsY0R5IH07XHJcbiAgbGV0IGFwZXgxID0geyB4OiB4MSAtIHByZUNhbGNEeSwgeTogeTEgLSBwcmVDYWxjRHggfTtcclxuICBsZXQgYXBleDIgPSB7IHg6IHgyICsgcHJlQ2FsY0R5LCB5OiB5MiArIHByZUNhbGNEeCB9O1xyXG4gIGxldCBleHRDb3JuZXIxID0geyB4OiBjb3JuZXIxLnggKyBwcmVDYWxjRHksIHk6IGNvcm5lcjEueSArIHByZUNhbGNEeCB9O1xyXG4gIGxldCBleHRDb3JuZXIyID0geyB4OiBjb3JuZXIyLnggKyBwcmVDYWxjRHksIHk6IGNvcm5lcjIueSArIHByZUNhbGNEeCB9O1xyXG4gIGxldCBleHRDb3JuZXIzID0geyB4OiBjb3JuZXIzLnggLSBwcmVDYWxjRHksIHk6IGNvcm5lcjMueSAtIHByZUNhbGNEeCB9O1xyXG4gIGxldCBleHRDb3JuZXI0ID0geyB4OiBjb3JuZXI0LnggLSBwcmVDYWxjRHksIHk6IGNvcm5lcjQueSAtIHByZUNhbGNEeCB9O1xyXG4gIGlmICh4MSA+IHgyKSB7XHJcbiAgICBhcGV4MSA9IHsgeDogeDEgKyBwcmVDYWxjRHksIHk6IHkxICsgcHJlQ2FsY0R4IH07XHJcbiAgICBhcGV4MiA9IHsgeDogeDIgLSBwcmVDYWxjRHksIHk6IHkyIC0gcHJlQ2FsY0R4IH07XHJcbiAgfVxyXG4gIGlmICh4MSA8PSB4Mikge1xyXG4gICAgZXh0Q29ybmVyMSA9IHsgeDogY29ybmVyMS54IC0gcHJlQ2FsY0R5LCB5OiBjb3JuZXIxLnkgLSBwcmVDYWxjRHggfTtcclxuICAgIGV4dENvcm5lcjIgPSB7IHg6IGNvcm5lcjIueCAtIHByZUNhbGNEeSwgeTogY29ybmVyMi55IC0gcHJlQ2FsY0R4IH07XHJcbiAgICBleHRDb3JuZXIzID0geyB4OiBjb3JuZXIzLnggKyBwcmVDYWxjRHksIHk6IGNvcm5lcjMueSArIHByZUNhbGNEeCB9O1xyXG4gICAgZXh0Q29ybmVyNCA9IHsgeDogY29ybmVyNC54ICsgcHJlQ2FsY0R5LCB5OiBjb3JuZXI0LnkgKyBwcmVDYWxjRHggfTtcclxuICB9XHJcblxyXG4gIGN0eC5tb3ZlVG8oY29ybmVyMi54LCBjb3JuZXIyLnkpO1xyXG4gIGN0eC5saW5lVG8oY29ybmVyMy54LCBjb3JuZXIzLnkpO1xyXG4gIGN0eC5hcmNUbyhleHRDb3JuZXIzLngsIGV4dENvcm5lcjMueSwgYXBleDIueCwgYXBleDIueSwgcmFkaXVzKTtcclxuICBjdHguYXJjVG8oZXh0Q29ybmVyNC54LCBleHRDb3JuZXI0LnksIGNvcm5lcjQueCwgY29ybmVyNC55LCByYWRpdXMpO1xyXG4gIGN0eC5saW5lVG8oY29ybmVyMS54LCBjb3JuZXIxLnkpO1xyXG4gIGN0eC5hcmNUbyhleHRDb3JuZXIxLngsIGV4dENvcm5lcjEueSwgYXBleDEueCwgYXBleDEueSwgcmFkaXVzKTtcclxuICBjdHguYXJjVG8oZXh0Q29ybmVyMi54LCBleHRDb3JuZXIyLnksIGNvcm5lcjIueCwgY29ybmVyMi55LCByYWRpdXMpO1xyXG5cclxuLypkZWJ1Z2dpbmcgc3R1ZmYsIGxlYXZlIGNvbW1lbnRlZCBvdXQqL1xyXG4vKlxyXG4gIGN0eC5iZWdpblBhdGgoKTtcclxuICBjdHgubGluZVdpZHRoID0gMjtcclxuICBjdHguc3Ryb2tlU3R5bGUgPSAnIzAwMDBmZic7XHJcbiAgY3R4Lm1vdmVUbyh4MSwgeTEpO1xyXG4gIGN0eC5saW5lVG8oeDIsIHkyKTtcclxuICBjdHguc3Ryb2tlKCk7XHJcblxyXG4gIGN0eC5iZWdpblBhdGgoKTtcclxuICBjdHgubGluZVdpZHRoID0gMTtcclxuICBjdHguc3Ryb2tlU3R5bGUgPSAnI2ZmMDBmZic7XHJcbiAgY3R4Lm1vdmVUbyhhcGV4MS54LCBhcGV4MS55KTtcclxuICBjdHgubGluZVRvKGFwZXgyLngsIGFwZXgyLnkpO1xyXG4gIGN0eC5zdHJva2UoKTtcclxuXHJcbiAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gIGN0eC5saW5lV2lkdGggPSAxO1xyXG4gIGN0eC5zdHJva2VTdHlsZSA9ICcjZmYwMDAwJztcclxuICBjdHgubW92ZVRvKGNvcm5lcjEueCwgY29ybmVyMS55KTtcclxuICBjdHgubGluZVRvKGNvcm5lcjIueCwgY29ybmVyMi55KTtcclxuICBjdHgubGluZVRvKGNvcm5lcjMueCwgY29ybmVyMy55KTtcclxuICBjdHgubGluZVRvKGNvcm5lcjQueCwgY29ybmVyNC55KTtcclxuICBjdHgubGluZVRvKGNvcm5lcjEueCwgY29ybmVyMS55KTtcclxuICBjdHguc3Ryb2tlKCk7XHJcblxyXG4gIGN0eC5iZWdpblBhdGgoKTtcclxuICBjdHgubGluZVdpZHRoID0gMjtcclxuICBjdHguc3Ryb2tlU3R5bGUgPSAnIzAwZmYwMCc7XHJcbiAgY3R4Lm1vdmVUbyhleHRDb3JuZXIxLngsIGV4dENvcm5lcjEueSk7XHJcbiAgY3R4LmxpbmVUbyhleHRDb3JuZXIyLngsIGV4dENvcm5lcjIueSk7XHJcbiAgY3R4LmxpbmVUbyhleHRDb3JuZXIzLngsIGV4dENvcm5lcjMueSk7XHJcbiAgY3R4LmxpbmVUbyhleHRDb3JuZXI0LngsIGV4dENvcm5lcjQueSk7XHJcbiAgY3R4LmxpbmVUbyhleHRDb3JuZXIxLngsIGV4dENvcm5lcjEueSk7XHJcbiAgY3R4LnN0cm9rZSgpO1xyXG4gICovXHJcbiAgLyplbmQgb2YgZGVidWdnaW5nIHN0dWZmKi9cclxufVxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWV4cG9ydHNcclxuZXhwb3J0cy5yYW5kb21Db2xvcnMgPSByYW5kb21Db2xvcnM7XHJcbmV4cG9ydHMuZHJhd0xvemVuZ2UgPSBkcmF3TG96ZW5nZTtcclxuIl19
