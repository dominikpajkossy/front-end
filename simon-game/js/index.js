document.addEventListener("DOMContentLoaded", function() {
  var arr = [0, 1, 2, 3];
  var context = new AudioContext();
  var pressedArr = [];
  var n = 1;
  var isBotPlaying = false;
  var counter = 0;

  //reset everything
  function reset() {
    for (let i = 0; i < 4; i++) {
      document.getElementById("btn" + i).setAttribute("disabled", "disabled");
      document.getElementById("btn" + i).style.pointerEvents = "none";
    }
    document.getElementById("start").removeAttribute("disabled");
    document.getElementById("start").style.background = "#fff";
    document.getElementById("start").innerHTML = "START";
    pressedArr = [];
    n = 1;
    counter = 0;
    isBotPlaying = false;
  }
  //Create oscillator then play a note with the input frequency
  function playNote(freq) {
    var oscillator = context.createOscillator();
    oscillator.frequency.value = freq;
    oscillator.type = "sine";
    var volume = context.createGain();
    volume.gain.value = 0.1;
    oscillator.connect(volume);
    volume.connect(context.destination);
    var duration = 0.5;
    var startTime = context.currentTime;
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  }
  //Do a setTimeout and click the buttons
  function doSetTimeOut(i, btnClick) {
    setTimeout(function() {
      isBotPlaying = true;
      document.getElementById(btnClick).click();
      isBotPlaying = false;
    }, i * 1000);
  }

  function playGame() {
    let rnum = Math.floor(Math.random() * 4);
    pressedArr = pressedArr.concat("btn" + rnum);
    for (var i = 1; i <= n; i++) {
      doSetTimeOut(i, pressedArr[i - 1]);
    }
  }
  //First time start sets everything to default
  reset();
  //Game starter listener
  document.getElementById("start").addEventListener("click", function() {
    //Enable buttons and disable start
    for (let i = 0; i < 4; i++) {
      document.getElementById("btn" + i).style.pointerEvents = "auto";
    }
    document.getElementById("start").setAttribute("disabled", "true");
    document.getElementById("start").style.background = "#000";
    document.getElementById("start").innerHTML = "";
    //Bot plays a sequence
    playGame();
  });

  //Listens to pressed buttons when the bot is not playing
  //Lot easier with JQuery to catch pressed button id
  $(document).on("click", ".button", function() {
    if (!isBotPlaying) {
      //Checks if the correct button is pressed or not
      if (this.id != pressedArr[counter]) {
        reset();
        window.alert("You Lose!");
      } else {
        counter++;
      }
      //If the buttons were correct and the counter length reaches the pressed number's length then it starts a new cycle
      if (counter == pressedArr.length) {
        counter = 0;
        n++;
        setTimeout(function() {
          playGame();
        }, 700);
      }
    }
  });

  //Rewrite these to functions and get css property value for background-color
  document.getElementById("btn0").addEventListener("click", function() {
    playNote(200);
    document
      .getElementById("btn0")
      .setAttribute("style", "background-color: black");
    setTimeout(function() {
      document
        .getElementById("btn0")
        .setAttribute("style", "background-color: red");
    }, 500);
  });
  document.getElementById("btn1").addEventListener("click", function() {
    playNote(300);
    document
      .getElementById("btn1")
      .setAttribute("style", "background-color: black");
    setTimeout(function() {
      document
        .getElementById("btn1")
        .setAttribute("style", "background-color: yellow");
    }, 500);
  });
  document.getElementById("btn2").addEventListener("click", function() {
    playNote(400);
    document
      .getElementById("btn2")
      .setAttribute("style", "background-color: black");
    setTimeout(function() {
      document
        .getElementById("btn2")
        .setAttribute("style", "background-color: blue");
    }, 500);
  });
  document.getElementById("btn3").addEventListener("click", function() {
    playNote(500);
    document
      .getElementById("btn3")
      .setAttribute("style", "background-color: black");
    setTimeout(function() {
      document
        .getElementById("btn3")
        .setAttribute("style", "background-color: green");
    }, 500);
  });
});