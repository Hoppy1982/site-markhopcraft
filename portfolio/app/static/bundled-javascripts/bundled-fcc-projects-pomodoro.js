(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//portfolio
//fcc-projects-pomodoro


var mh_fcc_pomodoro = require('./utils/fcc-pomodoro-utils');

toggleCountdown = function() {
  mh_fcc_pomodoro.toggleCountdown();
}

changeTime = function(brkOrSess, inOrDec) {
  mh_fcc_pomodoro.changeTime(brkOrSess, inOrDec);
}

},{"./utils/fcc-pomodoro-utils":2}],2:[function(require,module,exports){
var pomodoroData = {
  modes: [
    {mode: 'SESSION', duration: 2, color: '#34495e'},
    {mode: 'BREAK', duration: 2, color: '#16a085'}
  ],
  currentMode: 0,
  isPaused: false,
  remainingSeconds: 120,

  //isPaused getters & setters
  toggleIsPaused: function() {this.isPaused = !this.isPaused;},

  //mode getters & setters
  setMode: function() {
    this.currentMode++;
    if(this.currentMode > this.modes.length - 1) {
      this.currentMode = 0;
    }
    document.getElementById('msg').innerHTML = this.modes[this.currentMode].mode;
  },

  checkMode: function() {
    if(this.remainingSeconds < 1) {
      playSound();
      this.setMode();
      this.remainingSeconds = this.modes[this.currentMode].duration * 60;
    }
  },

  //remaining time getters & setters
  setRemainingSeconds: function(s) {this.remainingSeconds += s;},

  getMinutes: function() {return Math.floor(this.remainingSeconds / 60);},

  getSeconds: function() {return this.remainingSeconds % 60;},

  //break getters & setters
  setSession: function(m) {
    if (this.modes[0].duration + m > 0) {
      this.modes[0].duration += m;
    }
  },

  //session getters & setters
  setBreak: function(m) {
    if (this.modes[1].duration + m > 0) {
      this.modes[1].duration += m;
    }
  }

}//end obj lit pomodoroData

function toggleCountdown() {
  pomodoroData.toggleIsPaused();
  document.getElementById('minsLeft').innerHTML ='';
  document.getElementById('minsLeft').classList.add('minsLeftPosSize');
  document.getElementById('minsLeft').classList.remove('minsLeftPosSizeInitial');
  if (pomodoroData.isPaused === true) {countdown();}
}

//RECURSIVE FUNCTION
function countdown() {
  if (pomodoroData.isPaused === false) {
    return;
  }

  setTimeout(decTime, 1000);

  function decTime() {
    var mins = 'mm';
    var secs = 'ss';
    var shouldPulseTime = false;

    pomodoroData.setRemainingSeconds(-1);
    pomodoroData.checkMode();

    secs = pomodoroData.getSeconds();
    mins = pomodoroData.getMinutes();

    if (mins < 1) {pulseTime(secs);}
    if (mins<10) {mins = '0' + mins;}
    if (secs<10) {secs = '0' + secs;}

    animateTimer();
    document.getElementById('minsLeft').innerHTML = mins;
    document.getElementById('secsLeft').innerHTML = '.' + secs;
    countdown();
  }
}

function changeTime(brkOrSess, inOrDec) {
  if (brkOrSess === 'brk') {
    pomodoroData.setBreak(inOrDec);
    document.getElementById('breakTime').innerHTML = pomodoroData.modes[1].duration;
  }
  if (brkOrSess === 'sess') {
    pomodoroData.setSession(inOrDec);
    document.getElementById('sessionTime').innerHTML = pomodoroData.modes[0].duration;
  }
}

function animateTimer() {
  var canvas = document.getElementById('fillAnimation');
  var ctx = canvas.getContext('2d');
  var grd = ctx.createLinearGradient(60, 60, 200, 200);
  grd.addColorStop(0, pomodoroData.modes[0].color);
  grd.addColorStop(1, pomodoroData.modes[1].color);
  var percentSize = pomodoroData.remainingSeconds / (pomodoroData.modes[pomodoroData.currentMode].duration * 60);
  //because circle radius is 93px***careful of changing this mark you tit!
  var pxToChopOff = 200 * percentSize;
  var pxToChopOffRev = 200 - pxToChopOff;

  if (ctx != null) {
      ctx.beginPath();
      //x, y, radius, startAngle, endAngle, anticlockwise
      ctx.arc(100, 100, 100, 0, 2*Math.PI, false);
      ctx.fillStyle=grd;
      ctx.fill();
      ctx.globalCompositeOperation = 'destination-out';
      if(pomodoroData.currentMode === 0) {
         ctx.fillRect(0, 0, 200, pxToChopOffRev);
      }
      if(pomodoroData.currentMode === 1) {
         ctx.fillRect(0, 0, 200, pxToChopOff);
      }
      ctx.globalCompositeOperation = "source-over";

  } else {
    console.log('piss knows why but ctx is null instead of an element');
  }
}

function playSound() {
  var wav = 'http://www.freesfx.co.uk/rx2/mp3s/6/18625_1464805220.mp3';
  var audio = new Audio(wav);
  audio.play();
}

function pulseTime(s) {
  if (s % 10 === 0) {
    document.getElementById('minsLeft').classList.add('minsLeftPulse');
    document.getElementById('minsLeft').classList.remove('minsLeftNoPulse');
    setTimeout(pulseOff, 400);
  }

  if (s < 10) {
    document.getElementById('minsLeft').classList.add('minsLeftPulse');
    document.getElementById('minsLeft').classList.remove('minsLeftNoPulse');
    setTimeout(pulseOff, 400);
  }

  function pulseOff() {
    document.getElementById('minsLeft').classList.add('minsLeftNoPulse');
    document.getElementById('minsLeft').classList.remove('minsLeftPulse');
  }
}

module.exports = {
  toggleCountdown: toggleCountdown,
  changeTime: changeTime
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc3RhdGljL3Jhdy1qYXZhc2NyaXB0cy9mY2MtcHJvamVjdHMtcG9tb2Rvcm8uanMiLCJhcHAvc3RhdGljL3Jhdy1qYXZhc2NyaXB0cy91dGlscy9mY2MtcG9tb2Rvcm8tdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvL3BvcnRmb2xpb1xyXG4vL2ZjYy1wcm9qZWN0cy1wb21vZG9yb1xyXG5cclxuXHJcbnZhciBtaF9mY2NfcG9tb2Rvcm8gPSByZXF1aXJlKCcuL3V0aWxzL2ZjYy1wb21vZG9yby11dGlscycpO1xyXG5cclxudG9nZ2xlQ291bnRkb3duID0gZnVuY3Rpb24oKSB7XHJcbiAgbWhfZmNjX3BvbW9kb3JvLnRvZ2dsZUNvdW50ZG93bigpO1xyXG59XHJcblxyXG5jaGFuZ2VUaW1lID0gZnVuY3Rpb24oYnJrT3JTZXNzLCBpbk9yRGVjKSB7XHJcbiAgbWhfZmNjX3BvbW9kb3JvLmNoYW5nZVRpbWUoYnJrT3JTZXNzLCBpbk9yRGVjKTtcclxufVxyXG4iLCJ2YXIgcG9tb2Rvcm9EYXRhID0ge1xyXG4gIG1vZGVzOiBbXHJcbiAgICB7bW9kZTogJ1NFU1NJT04nLCBkdXJhdGlvbjogMiwgY29sb3I6ICcjMzQ0OTVlJ30sXHJcbiAgICB7bW9kZTogJ0JSRUFLJywgZHVyYXRpb246IDIsIGNvbG9yOiAnIzE2YTA4NSd9XHJcbiAgXSxcclxuICBjdXJyZW50TW9kZTogMCxcclxuICBpc1BhdXNlZDogZmFsc2UsXHJcbiAgcmVtYWluaW5nU2Vjb25kczogMTIwLFxyXG5cclxuICAvL2lzUGF1c2VkIGdldHRlcnMgJiBzZXR0ZXJzXHJcbiAgdG9nZ2xlSXNQYXVzZWQ6IGZ1bmN0aW9uKCkge3RoaXMuaXNQYXVzZWQgPSAhdGhpcy5pc1BhdXNlZDt9LFxyXG5cclxuICAvL21vZGUgZ2V0dGVycyAmIHNldHRlcnNcclxuICBzZXRNb2RlOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuY3VycmVudE1vZGUrKztcclxuICAgIGlmKHRoaXMuY3VycmVudE1vZGUgPiB0aGlzLm1vZGVzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgdGhpcy5jdXJyZW50TW9kZSA9IDA7XHJcbiAgICB9XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXNnJykuaW5uZXJIVE1MID0gdGhpcy5tb2Rlc1t0aGlzLmN1cnJlbnRNb2RlXS5tb2RlO1xyXG4gIH0sXHJcblxyXG4gIGNoZWNrTW9kZTogZnVuY3Rpb24oKSB7XHJcbiAgICBpZih0aGlzLnJlbWFpbmluZ1NlY29uZHMgPCAxKSB7XHJcbiAgICAgIHBsYXlTb3VuZCgpO1xyXG4gICAgICB0aGlzLnNldE1vZGUoKTtcclxuICAgICAgdGhpcy5yZW1haW5pbmdTZWNvbmRzID0gdGhpcy5tb2Rlc1t0aGlzLmN1cnJlbnRNb2RlXS5kdXJhdGlvbiAqIDYwO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8vcmVtYWluaW5nIHRpbWUgZ2V0dGVycyAmIHNldHRlcnNcclxuICBzZXRSZW1haW5pbmdTZWNvbmRzOiBmdW5jdGlvbihzKSB7dGhpcy5yZW1haW5pbmdTZWNvbmRzICs9IHM7fSxcclxuXHJcbiAgZ2V0TWludXRlczogZnVuY3Rpb24oKSB7cmV0dXJuIE1hdGguZmxvb3IodGhpcy5yZW1haW5pbmdTZWNvbmRzIC8gNjApO30sXHJcblxyXG4gIGdldFNlY29uZHM6IGZ1bmN0aW9uKCkge3JldHVybiB0aGlzLnJlbWFpbmluZ1NlY29uZHMgJSA2MDt9LFxyXG5cclxuICAvL2JyZWFrIGdldHRlcnMgJiBzZXR0ZXJzXHJcbiAgc2V0U2Vzc2lvbjogZnVuY3Rpb24obSkge1xyXG4gICAgaWYgKHRoaXMubW9kZXNbMF0uZHVyYXRpb24gKyBtID4gMCkge1xyXG4gICAgICB0aGlzLm1vZGVzWzBdLmR1cmF0aW9uICs9IG07XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy9zZXNzaW9uIGdldHRlcnMgJiBzZXR0ZXJzXHJcbiAgc2V0QnJlYWs6IGZ1bmN0aW9uKG0pIHtcclxuICAgIGlmICh0aGlzLm1vZGVzWzFdLmR1cmF0aW9uICsgbSA+IDApIHtcclxuICAgICAgdGhpcy5tb2Rlc1sxXS5kdXJhdGlvbiArPSBtO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn0vL2VuZCBvYmogbGl0IHBvbW9kb3JvRGF0YVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlQ291bnRkb3duKCkge1xyXG4gIHBvbW9kb3JvRGF0YS50b2dnbGVJc1BhdXNlZCgpO1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtaW5zTGVmdCcpLmlubmVySFRNTCA9Jyc7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21pbnNMZWZ0JykuY2xhc3NMaXN0LmFkZCgnbWluc0xlZnRQb3NTaXplJyk7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21pbnNMZWZ0JykuY2xhc3NMaXN0LnJlbW92ZSgnbWluc0xlZnRQb3NTaXplSW5pdGlhbCcpO1xyXG4gIGlmIChwb21vZG9yb0RhdGEuaXNQYXVzZWQgPT09IHRydWUpIHtjb3VudGRvd24oKTt9XHJcbn1cclxuXHJcbi8vUkVDVVJTSVZFIEZVTkNUSU9OXHJcbmZ1bmN0aW9uIGNvdW50ZG93bigpIHtcclxuICBpZiAocG9tb2Rvcm9EYXRhLmlzUGF1c2VkID09PSBmYWxzZSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgc2V0VGltZW91dChkZWNUaW1lLCAxMDAwKTtcclxuXHJcbiAgZnVuY3Rpb24gZGVjVGltZSgpIHtcclxuICAgIHZhciBtaW5zID0gJ21tJztcclxuICAgIHZhciBzZWNzID0gJ3NzJztcclxuICAgIHZhciBzaG91bGRQdWxzZVRpbWUgPSBmYWxzZTtcclxuXHJcbiAgICBwb21vZG9yb0RhdGEuc2V0UmVtYWluaW5nU2Vjb25kcygtMSk7XHJcbiAgICBwb21vZG9yb0RhdGEuY2hlY2tNb2RlKCk7XHJcblxyXG4gICAgc2VjcyA9IHBvbW9kb3JvRGF0YS5nZXRTZWNvbmRzKCk7XHJcbiAgICBtaW5zID0gcG9tb2Rvcm9EYXRhLmdldE1pbnV0ZXMoKTtcclxuXHJcbiAgICBpZiAobWlucyA8IDEpIHtwdWxzZVRpbWUoc2Vjcyk7fVxyXG4gICAgaWYgKG1pbnM8MTApIHttaW5zID0gJzAnICsgbWluczt9XHJcbiAgICBpZiAoc2VjczwxMCkge3NlY3MgPSAnMCcgKyBzZWNzO31cclxuXHJcbiAgICBhbmltYXRlVGltZXIoKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtaW5zTGVmdCcpLmlubmVySFRNTCA9IG1pbnM7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2Vjc0xlZnQnKS5pbm5lckhUTUwgPSAnLicgKyBzZWNzO1xyXG4gICAgY291bnRkb3duKCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VUaW1lKGJya09yU2VzcywgaW5PckRlYykge1xyXG4gIGlmIChicmtPclNlc3MgPT09ICdicmsnKSB7XHJcbiAgICBwb21vZG9yb0RhdGEuc2V0QnJlYWsoaW5PckRlYyk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnJlYWtUaW1lJykuaW5uZXJIVE1MID0gcG9tb2Rvcm9EYXRhLm1vZGVzWzFdLmR1cmF0aW9uO1xyXG4gIH1cclxuICBpZiAoYnJrT3JTZXNzID09PSAnc2VzcycpIHtcclxuICAgIHBvbW9kb3JvRGF0YS5zZXRTZXNzaW9uKGluT3JEZWMpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nlc3Npb25UaW1lJykuaW5uZXJIVE1MID0gcG9tb2Rvcm9EYXRhLm1vZGVzWzBdLmR1cmF0aW9uO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYW5pbWF0ZVRpbWVyKCkge1xyXG4gIHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsbEFuaW1hdGlvbicpO1xyXG4gIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICB2YXIgZ3JkID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KDYwLCA2MCwgMjAwLCAyMDApO1xyXG4gIGdyZC5hZGRDb2xvclN0b3AoMCwgcG9tb2Rvcm9EYXRhLm1vZGVzWzBdLmNvbG9yKTtcclxuICBncmQuYWRkQ29sb3JTdG9wKDEsIHBvbW9kb3JvRGF0YS5tb2Rlc1sxXS5jb2xvcik7XHJcbiAgdmFyIHBlcmNlbnRTaXplID0gcG9tb2Rvcm9EYXRhLnJlbWFpbmluZ1NlY29uZHMgLyAocG9tb2Rvcm9EYXRhLm1vZGVzW3BvbW9kb3JvRGF0YS5jdXJyZW50TW9kZV0uZHVyYXRpb24gKiA2MCk7XHJcbiAgLy9iZWNhdXNlIGNpcmNsZSByYWRpdXMgaXMgOTNweCoqKmNhcmVmdWwgb2YgY2hhbmdpbmcgdGhpcyBtYXJrIHlvdSB0aXQhXHJcbiAgdmFyIHB4VG9DaG9wT2ZmID0gMjAwICogcGVyY2VudFNpemU7XHJcbiAgdmFyIHB4VG9DaG9wT2ZmUmV2ID0gMjAwIC0gcHhUb0Nob3BPZmY7XHJcblxyXG4gIGlmIChjdHggIT0gbnVsbCkge1xyXG4gICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgIC8veCwgeSwgcmFkaXVzLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSwgYW50aWNsb2Nrd2lzZVxyXG4gICAgICBjdHguYXJjKDEwMCwgMTAwLCAxMDAsIDAsIDIqTWF0aC5QSSwgZmFsc2UpO1xyXG4gICAgICBjdHguZmlsbFN0eWxlPWdyZDtcclxuICAgICAgY3R4LmZpbGwoKTtcclxuICAgICAgY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdkZXN0aW5hdGlvbi1vdXQnO1xyXG4gICAgICBpZihwb21vZG9yb0RhdGEuY3VycmVudE1vZGUgPT09IDApIHtcclxuICAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIDIwMCwgcHhUb0Nob3BPZmZSZXYpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKHBvbW9kb3JvRGF0YS5jdXJyZW50TW9kZSA9PT0gMSkge1xyXG4gICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgMjAwLCBweFRvQ2hvcE9mZik7XHJcbiAgICAgIH1cclxuICAgICAgY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwic291cmNlLW92ZXJcIjtcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUubG9nKCdwaXNzIGtub3dzIHdoeSBidXQgY3R4IGlzIG51bGwgaW5zdGVhZCBvZiBhbiBlbGVtZW50Jyk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwbGF5U291bmQoKSB7XHJcbiAgdmFyIHdhdiA9ICdodHRwOi8vd3d3LmZyZWVzZnguY28udWsvcngyL21wM3MvNi8xODYyNV8xNDY0ODA1MjIwLm1wMyc7XHJcbiAgdmFyIGF1ZGlvID0gbmV3IEF1ZGlvKHdhdik7XHJcbiAgYXVkaW8ucGxheSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwdWxzZVRpbWUocykge1xyXG4gIGlmIChzICUgMTAgPT09IDApIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtaW5zTGVmdCcpLmNsYXNzTGlzdC5hZGQoJ21pbnNMZWZ0UHVsc2UnKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtaW5zTGVmdCcpLmNsYXNzTGlzdC5yZW1vdmUoJ21pbnNMZWZ0Tm9QdWxzZScpO1xyXG4gICAgc2V0VGltZW91dChwdWxzZU9mZiwgNDAwKTtcclxuICB9XHJcblxyXG4gIGlmIChzIDwgMTApIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtaW5zTGVmdCcpLmNsYXNzTGlzdC5hZGQoJ21pbnNMZWZ0UHVsc2UnKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtaW5zTGVmdCcpLmNsYXNzTGlzdC5yZW1vdmUoJ21pbnNMZWZ0Tm9QdWxzZScpO1xyXG4gICAgc2V0VGltZW91dChwdWxzZU9mZiwgNDAwKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHB1bHNlT2ZmKCkge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21pbnNMZWZ0JykuY2xhc3NMaXN0LmFkZCgnbWluc0xlZnROb1B1bHNlJyk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWluc0xlZnQnKS5jbGFzc0xpc3QucmVtb3ZlKCdtaW5zTGVmdFB1bHNlJyk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICB0b2dnbGVDb3VudGRvd246IHRvZ2dsZUNvdW50ZG93bixcclxuICBjaGFuZ2VUaW1lOiBjaGFuZ2VUaW1lXHJcbn1cclxuIl19
