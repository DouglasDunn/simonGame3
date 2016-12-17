var playerArray = [];
var simonArray = [];
var simonIntervalId;
var colorFlashId;
var index = 0;
var points = 0;
var pos = 0;
var start = false;
var gameCounter = 0;
var wrongIntervalId;
var winnerIntervalId;
var strict = false;

function showColor(num) {

  if (simonArray[num] === 1) {

    var flashCount = 0;

    $("#red").css("background", "#990000");

    var wav = 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3';
    var audio = new Audio(wav);
		audio.play();

    colorFlashId = setInterval(function() {
      flashCount++;
      $("#red").css("background", "#ff0000");
      if (flashCount === 1) {
        clearInterval(colorFlashId);
      }
    }, 1000);


  } else if (simonArray[num] === 2) {

    var flashCount = 0;

    $("#green").css("background", "#009900");

    var wav = 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3';
    var audio = new Audio(wav);
		audio.play();

    colorFlashId = setInterval(function() {
      flashCount++;
      $("#green").css("background", "#00ff00");
      if (flashCount === 1) {
        clearInterval(colorFlashId);
      }
    }, 1000);

  } else if (simonArray[num] === 3) {

    var flashCount = 0;

    $("#blue").css("background", "#000099");

    var wav = 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3';
    var audio = new Audio(wav);
		audio.play();

    colorFlashId = setInterval(function() {
      flashCount++;
      $("#blue").css("background", "#0000ff");
      if (flashCount === 1) {
        clearInterval(colorFlashId);
      }
    }, 1000);

  } else {

    var flashCount = 0;

    $("#yellow").css("background", "#999900");

    var wav = 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3';
    var audio = new Audio(wav);
		audio.play();

    colorFlashId = setInterval(function() {
      flashCount++;
      $("#yellow").css("background", "#ffff00");
      if (flashCount === 1) {
        clearInterval(colorFlashId);
      }
    }, 1000);

  }

}

function simonPickColorsAndDisplayThem() {

  $("#red").css("pointer-events", "none");
  $("#green").css("pointer-events", "none");
  $("#blue").css("pointer-events", "none");
  $("#yellow").css("pointer-events", "none");

  if (points === simonArray.length) {

    simonArray.push(generateRandomNumber());
    $("#countNumber").text(++gameCounter);

  }

  var length = simonArray.length;
  var counter = 0;

  simonIntervalId = setInterval(function() {

    showColor(counter++);

    if (counter === length) {

      clearInterval(simonIntervalId);

      setTimeout(function() {

        $("#red").css("pointer-events", "auto");
        $("#green").css("pointer-events", "auto");
        $("#blue").css("pointer-events", "auto");
        $("#yellow").css("pointer-events", "auto");

      }, 1000);

    }

  }, 2000);

}

function generateRandomNumber() {

  return Math.floor(Math.random() * 4) + 1;

}

function checkIfColorsPickedMatches() {

  var position = 0;
  var count = 0;

  if (simonArray[pos] !== parseInt(playerArray[pos])) {

    var wrongCounter = 0;
    pos = 0;
    playerArray = [];

    $("#countNumber").text(":(");

    if (strict) {

      wrongIntervalId = setInterval(function() {
        $("#countNumber").text(gameCounter);
        wrongCounter++;

        if(wrongCounter === 1) {
          clearInterval(wrongIntervalId);
          startMouseDown();
          startMouseUp();
        }

      }, 1000);

      return;

    } else {

      wrongIntervalId = setInterval(function() {
        $("#countNumber").text(gameCounter);
        wrongCounter++;

        if(wrongCounter === 1) {
          clearInterval(wrongIntervalId);
        }

      }, 1000);

    }

    simonPickColorsAndDisplayThem();

    return;

  }

  pos++;

  if (simonArray.length === playerArray.length) {

    pos = 0;

    for (var i = 0; i < simonArray.length; i++) {

      if (simonArray[position] == playerArray[position]) {

        if (position === 19) {

          var winnerCounter = 0;

          $("#countNumber").text(":)");

          winnerIntervalId = setInterval(function() {
            winnerCounter++;

            if (winnerCounter === 1) {
              startMouseDown();
              startMouseUp();
            }

          }, 1000);

        }

        count++;
        position++;

      } else {

        playerArray = [];
        simonPickColorsAndDisplayThem();
        return;

      }

    }

    playerArray = [];

  }

  if (count === simonArray.length) {

    points++;
    simonPickColorsAndDisplayThem();

  }

}

function colorMouseDown(e) {

  var $color = $(e.target);
  var $colorId = $color.attr("id");
  var value = $color.attr("value");

  if ($colorId === "red") {

    $color.css("background", "#990000");

    var wav = 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3';
    var audio = new Audio(wav);
		audio.play();

  } else if ($colorId === "green") {

    $color.css("background", "#009900");

    var wav = 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3';
    var audio = new Audio(wav);
		audio.play();

  } else if ($colorId === "blue") {

    $color.css("background", "#000099");

    var wav = 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3';
    var audio = new Audio(wav);
		audio.play();

  } else {

    $color.css("background", "#999900");

    var wav = 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3';
    var audio = new Audio(wav);
		audio.play();

  }

  playerArray.push(value);

  index++;

}

function colorMouseUp(e) {

  var $color = $(e.target);
  var $colorId = $color.attr("id");

  if ($colorId === "red") {

    $color.css("background", "#ff0000");

  } else if ($colorId === "green") {

    $color.css("background", "#00ff00");

  } else if ($colorId === "blue") {

    $color.css("background", "#0000ff");

  } else {

    $color.css("background", "#ffff00");

  }

  checkIfColorsPickedMatches();

}

function startMouseUp() {

  $("#startSensor").css("background", "red");

  simonArray = [];
  playerArray = [];
  index = 0;
  points = 0;
  pos = 0;
  gameCounter = 0;
  clearInterval(simonIntervalId);
  clearInterval(colorFlashId);
  simonPickColorsAndDisplayThem();

}

function startMouseDown() {

  $("#startSensor").css("background", "black");

  $("#countNumber").text("");

  $("#red").css("background", "#ff0000");
  $("#green").css("background", "#00ff00");
  $("#blue").css("background", "#0000ff");
  $("#yellow").css("background", "#ffff00");

}

function strictButtonClicked() {

  if (strict) {

    $("#strictSensor").css("background", "black");
    strict = false;

  } else {

    $("#strictSensor").css("background", "red");
    strict = true;

  }

}

$("#game").on("mousedown", "#red", colorMouseDown)
          .on("mousedown", "#green", colorMouseDown)
          .on("mousedown", "#blue", colorMouseDown)
          .on("mousedown", "#yellow", colorMouseDown)
          .on("mouseup", "#red", colorMouseUp)
          .on("mouseup", "#green", colorMouseUp)
          .on("mouseup", "#blue", colorMouseUp)
          .on("mouseup", "#yellow", colorMouseUp)
          .on("mousedown", "#startButton", startMouseDown)
          .on("mouseup", "#startButton", startMouseUp)
          .on("click", "#strictButton", strictButtonClicked);
