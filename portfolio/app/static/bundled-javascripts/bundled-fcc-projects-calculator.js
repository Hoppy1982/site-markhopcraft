(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// portfolio
// fcc-projects-calculator.js

// File description:
//

var mh_fcc_calculator = require('./utils/fcc-calculator-utils');

buttClear = function(id) {
  mh_fcc_calculator.buttClear(id);
}

buttVal = function(id) {
  mh_fcc_calculator.buttVal(id);
}

buttEq = function() {
  mh_fcc_calculator.buttEq();
}

},{"./utils/fcc-calculator-utils":2}],2:[function(require,module,exports){
// portfolio
// fcc-calculator-utils.js

// File description:
//

//DATA
var calculation = [];

//FUNCTION
function updateScreen() {
  console.log('updateScreen()');//dev
  var c = '';
  var h = '';

  if (calculation.length > 0) {
    c = calculation[calculation.length - 1];
    calculation.forEach(function(element) {
        h += element;
    });
  } else {
      c = '0';
      h = ' ';
  }

  document.getElementById('calculation').innerHTML = c;
  document.getElementById('calcHistory').innerHTML = h;
}

//FUNCTION
function buttClear(id) {
  console.log('buttClear(): ' + id);//dev

  if (id === 'AC') {calculation = [];}
  if (id === 'CE') {calculation.pop();}

  updateScreen();
}

//FUNCTION
function buttVal(id) {
  console.log('buttVal(): ' + id);//dev

  calculation.push(document.getElementById(id).innerHTML);

  updateScreen();
}

//FUNCTION
function buttEq() {
  console.log('buttEq()');//dev
  console.log(calculation);
  var result = '';
  //var regex = /^\d+(\.\d*)?([-+\/\*]\d+)*[^-+\/\*]/;
  var regex = /^\d*(\.\d*)?([-+/*]\d+)*$/;

  calculation.forEach(function(element, index) {
    parseInt(element);
    if (element === 'x') {element = '*';}
    result += element;
  });

  if (regex.test(result)) {
    result = eval(result);
  } else {
    console.log('invalid: ' + result);
    result = 'invalid equation';
  }

  calculation = [result];
  document.getElementById('calculation').innerHTML = result;
}


module.exports = {
  buttClear,
  buttVal,
  buttEq
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc3RhdGljL3Jhdy1qYXZhc2NyaXB0cy9mY2MtcHJvamVjdHMtY2FsY3VsYXRvci5qcyIsImFwcC9zdGF0aWMvcmF3LWphdmFzY3JpcHRzL3V0aWxzL2ZjYy1jYWxjdWxhdG9yLXV0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBwb3J0Zm9saW9cclxuLy8gZmNjLXByb2plY3RzLWNhbGN1bGF0b3IuanNcclxuXHJcbi8vIEZpbGUgZGVzY3JpcHRpb246XHJcbi8vXHJcblxyXG52YXIgbWhfZmNjX2NhbGN1bGF0b3IgPSByZXF1aXJlKCcuL3V0aWxzL2ZjYy1jYWxjdWxhdG9yLXV0aWxzJyk7XHJcblxyXG5idXR0Q2xlYXIgPSBmdW5jdGlvbihpZCkge1xyXG4gIG1oX2ZjY19jYWxjdWxhdG9yLmJ1dHRDbGVhcihpZCk7XHJcbn1cclxuXHJcbmJ1dHRWYWwgPSBmdW5jdGlvbihpZCkge1xyXG4gIG1oX2ZjY19jYWxjdWxhdG9yLmJ1dHRWYWwoaWQpO1xyXG59XHJcblxyXG5idXR0RXEgPSBmdW5jdGlvbigpIHtcclxuICBtaF9mY2NfY2FsY3VsYXRvci5idXR0RXEoKTtcclxufVxyXG4iLCIvLyBwb3J0Zm9saW9cclxuLy8gZmNjLWNhbGN1bGF0b3ItdXRpbHMuanNcclxuXHJcbi8vIEZpbGUgZGVzY3JpcHRpb246XHJcbi8vXHJcblxyXG4vL0RBVEFcclxudmFyIGNhbGN1bGF0aW9uID0gW107XHJcblxyXG4vL0ZVTkNUSU9OXHJcbmZ1bmN0aW9uIHVwZGF0ZVNjcmVlbigpIHtcclxuICBjb25zb2xlLmxvZygndXBkYXRlU2NyZWVuKCknKTsvL2RldlxyXG4gIHZhciBjID0gJyc7XHJcbiAgdmFyIGggPSAnJztcclxuXHJcbiAgaWYgKGNhbGN1bGF0aW9uLmxlbmd0aCA+IDApIHtcclxuICAgIGMgPSBjYWxjdWxhdGlvbltjYWxjdWxhdGlvbi5sZW5ndGggLSAxXTtcclxuICAgIGNhbGN1bGF0aW9uLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICAgIGggKz0gZWxlbWVudDtcclxuICAgIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAgIGMgPSAnMCc7XHJcbiAgICAgIGggPSAnICc7XHJcbiAgfVxyXG5cclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FsY3VsYXRpb24nKS5pbm5lckhUTUwgPSBjO1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYWxjSGlzdG9yeScpLmlubmVySFRNTCA9IGg7XHJcbn1cclxuXHJcbi8vRlVOQ1RJT05cclxuZnVuY3Rpb24gYnV0dENsZWFyKGlkKSB7XHJcbiAgY29uc29sZS5sb2coJ2J1dHRDbGVhcigpOiAnICsgaWQpOy8vZGV2XHJcblxyXG4gIGlmIChpZCA9PT0gJ0FDJykge2NhbGN1bGF0aW9uID0gW107fVxyXG4gIGlmIChpZCA9PT0gJ0NFJykge2NhbGN1bGF0aW9uLnBvcCgpO31cclxuXHJcbiAgdXBkYXRlU2NyZWVuKCk7XHJcbn1cclxuXHJcbi8vRlVOQ1RJT05cclxuZnVuY3Rpb24gYnV0dFZhbChpZCkge1xyXG4gIGNvbnNvbGUubG9nKCdidXR0VmFsKCk6ICcgKyBpZCk7Ly9kZXZcclxuXHJcbiAgY2FsY3VsYXRpb24ucHVzaChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuaW5uZXJIVE1MKTtcclxuXHJcbiAgdXBkYXRlU2NyZWVuKCk7XHJcbn1cclxuXHJcbi8vRlVOQ1RJT05cclxuZnVuY3Rpb24gYnV0dEVxKCkge1xyXG4gIGNvbnNvbGUubG9nKCdidXR0RXEoKScpOy8vZGV2XHJcbiAgY29uc29sZS5sb2coY2FsY3VsYXRpb24pO1xyXG4gIHZhciByZXN1bHQgPSAnJztcclxuICAvL3ZhciByZWdleCA9IC9eXFxkKyhcXC5cXGQqKT8oWy0rXFwvXFwqXVxcZCspKlteLStcXC9cXCpdLztcclxuICB2YXIgcmVnZXggPSAvXlxcZCooXFwuXFxkKik/KFstKy8qXVxcZCspKiQvO1xyXG5cclxuICBjYWxjdWxhdGlvbi5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQsIGluZGV4KSB7XHJcbiAgICBwYXJzZUludChlbGVtZW50KTtcclxuICAgIGlmIChlbGVtZW50ID09PSAneCcpIHtlbGVtZW50ID0gJyonO31cclxuICAgIHJlc3VsdCArPSBlbGVtZW50O1xyXG4gIH0pO1xyXG5cclxuICBpZiAocmVnZXgudGVzdChyZXN1bHQpKSB7XHJcbiAgICByZXN1bHQgPSBldmFsKHJlc3VsdCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUubG9nKCdpbnZhbGlkOiAnICsgcmVzdWx0KTtcclxuICAgIHJlc3VsdCA9ICdpbnZhbGlkIGVxdWF0aW9uJztcclxuICB9XHJcblxyXG4gIGNhbGN1bGF0aW9uID0gW3Jlc3VsdF07XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbGN1bGF0aW9uJykuaW5uZXJIVE1MID0gcmVzdWx0O1xyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgYnV0dENsZWFyLFxyXG4gIGJ1dHRWYWwsXHJcbiAgYnV0dEVxXHJcbn1cclxuIl19
