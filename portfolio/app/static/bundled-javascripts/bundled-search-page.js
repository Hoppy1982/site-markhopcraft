(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// portfolio
// search-page.js

// File description:
// Script file linked to search-page.pug

submitSearch = function() {
  var searchParams = {
    id: document.getElementById('inputId').value,
    complete: document.getElementById('completedYes').checked,
    outstanding: document.getElementById('outstandingYes').checked
  };

  var headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8'
  });

  fetch('/search-page', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(searchParams)
  }).then(function(res) {
    return res.json();
  }).then(function(resJson) {
    document.getElementById('searchOutput').innerHTML = JSON.stringify(resJson[0]);
  }).catch(function(err) {
    throw err;
  })

}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc3RhdGljL3Jhdy1qYXZhc2NyaXB0cy9zZWFyY2gtcGFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIHBvcnRmb2xpb1xyXG4vLyBzZWFyY2gtcGFnZS5qc1xyXG5cclxuLy8gRmlsZSBkZXNjcmlwdGlvbjpcclxuLy8gU2NyaXB0IGZpbGUgbGlua2VkIHRvIHNlYXJjaC1wYWdlLnB1Z1xyXG5cclxuc3VibWl0U2VhcmNoID0gZnVuY3Rpb24oKSB7XHJcbiAgdmFyIHNlYXJjaFBhcmFtcyA9IHtcclxuICAgIGlkOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXRJZCcpLnZhbHVlLFxyXG4gICAgY29tcGxldGU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wbGV0ZWRZZXMnKS5jaGVja2VkLFxyXG4gICAgb3V0c3RhbmRpbmc6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdXRzdGFuZGluZ1llcycpLmNoZWNrZWRcclxuICB9O1xyXG5cclxuICB2YXIgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHtcclxuICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCdcclxuICB9KTtcclxuXHJcbiAgZmV0Y2goJy9zZWFyY2gtcGFnZScsIHtcclxuICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgaGVhZGVyczogaGVhZGVycyxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNlYXJjaFBhcmFtcylcclxuICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgcmV0dXJuIHJlcy5qc29uKCk7XHJcbiAgfSkudGhlbihmdW5jdGlvbihyZXNKc29uKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoT3V0cHV0JykuaW5uZXJIVE1MID0gSlNPTi5zdHJpbmdpZnkocmVzSnNvblswXSk7XHJcbiAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICB0aHJvdyBlcnI7XHJcbiAgfSlcclxuXHJcbn1cclxuIl19
