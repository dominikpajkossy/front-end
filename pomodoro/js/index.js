$(function() {
  var breakLength = 300;
  var sessionLength = 1500;
  var changeInterval = 30;
  var intervalId;
  var tFlag = false;
  var breakFlag = false;
  var overtime = new Audio(
    "https://www.myinstants.com/media/sounds/announcer_overtime.mp3"
  );
  var raping = new Audio(
    "https://www.myinstants.com/media/sounds/epic-sax-guy-plays-for-57-minutes.mp3"
  );
  overtime.volume = 0.3;
  raping.volume = 0.3;
  //Initialize timers
  function initTimers() {
    document.getElementById("start").innerHTML = sessionLength;
    document.getElementById("sessionTime").innerHTML = sessionLength;
    document.getElementById("breakTime").innerHTML = breakLength;
  }
  
  //Timer countdown function
  function timerCountdown(sessionLength, breakLength) {
    var timer = sessionLength;
    var currentSession = sessionLength;
    intervalId = setInterval(function() {
      timer--;
      document.getElementById("start").innerHTML = timer;
      document.getElementById("progressbar").style.width =
        timer / currentSession * 100 + "%";
      if (timer === 0) {
        breakFlag = !breakFlag;
        if (breakFlag) {
          document.getElementById("start").innerHTML = breakLength;
          document.getElementById("progressbar").style.width = "100%";
          document.getElementById("progressbar").style.background = "#FFF8DC";
          timer = breakLength;
          currentSession = breakLength;
          raping.play();
        } else {
          document.getElementById("start").innerHTML = sessionLength;
          document.getElementById("progressbar").style.width = "100%";
          document.getElementById("progressbar").style.background = "#BC8F8F";
          timer = sessionLength;
          currentSession = sessionLength;
          overtime.play();
        }
      }
    }, 1000);
  }
  
  //Timer changing buttons 
  document.getElementById("breakMinus").onclick = function() {
    breakLength -= changeInterval;
    document.getElementById("breakTime").innerHTML = breakLength;
  };
  document.getElementById("breakPlus").onclick = function() {
    breakLength += changeInterval;
    document.getElementById("breakTime").innerHTML = breakLength;
  };
  document.getElementById("sessionMinus").onclick = function() {
    sessionLength -= changeInterval;
    document.getElementById("start").innerHTML = sessionLength;
    document.getElementById("sessionTime").innerHTML = sessionLength;
  };
  document.getElementById("sessionPlus").onclick = function() {
    sessionLength += changeInterval;
    document.getElementById("start").innerHTML = sessionLength;
    document.getElementById("sessionTime").innerHTML = sessionLength;
  };
  //Initialize timers
  initTimers();

  //Clicking on timer makes it stop or start
  document.getElementById("progressbar").onclick = function() {
    if (tFlag) {
      document.getElementById("start").innerHTML = sessionLength;
      clearInterval(intervalId);
      tFlag = false;
    } else {
      tFlag = true;
      timerCountdown(sessionLength, breakLength);
    }
  };
});