var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStarted = false;

function startGame() {
  if (!gameStarted) {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    randomColour(randomChosenColour, 100);

    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
    gameStarted = true;
  }
}

function nextSequence() {
  if (gameStarted == true) {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    randomColour(randomChosenColour, 1000);

    playSound(randomChosenColour);

    setTimeout(function () {
      gamePattern.push(randomChosenColour);
    }, 1000);
  }
}

function checkUserInput() {
  for (var i = 0; i < userClickedPattern.length; i++) {
    if (userClickedPattern[i] != gamePattern[i]) {
      console.log("game over!");
    }
  }

  if (userClickedPattern.length == gamePattern.length) {
    userClickedPattern = [];
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
}

function playSound(sound) {
  var audio = new Audio("./sounds/" + sound + ".mp3");
  audio.play();
}

function randomColour(randomChosenColour, timing) {
  setTimeout(function () {
    $("#" + randomChosenColour)
      .fadeOut(100)
      .fadeIn(100);
  }, timing);
}

$(document).on("keydown", startGame);

$(".btn").on("click", function () {
  var buttonPressed = $(this).attr("id");

  userClickedPattern.push(buttonPressed);

  $("#" + buttonPressed).addClass("pressed");

  setTimeout(function () {
    $("#" + buttonPressed).removeClass("pressed");
  }, 100);

  playSound(buttonPressed);
  checkUserInput();
});
