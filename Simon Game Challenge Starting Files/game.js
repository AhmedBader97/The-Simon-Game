var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var currentLevel = 1;
var gameIsOver = false;
function startGame() {
  initializeLevel();
  $("body").removeClass("game-over");

  if (!gameStarted) {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    randomColour(randomChosenColour, 100);

    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
    gameStarted = true;
    gameIsOver = false;
  }
}

function initializeLevel() {
  currentLevel = 1;
  $("#level-title").html("level " + currentLevel);
}

function nextSequence() {
  if (gameStarted == true) {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    randomColour(randomChosenColour, 100);

    playSound(randomChosenColour);

    setTimeout(function () {
      gamePattern.push(randomChosenColour);
    }, 100);
  }
}

function checkUserInput() {
  for (var i = 0; i < userClickedPattern.length; i++) {
    if (userClickedPattern[i] != gamePattern[i]) {
      $("body").addClass("game-over");
      $("#level-title").html("Game over, Press Any Key to Restart");
      endGame();
      return;
    }
  }

  if (userClickedPattern.length == gamePattern.length) {
    currentLevel++; // Increase the current level
    $("#level-title").html("level " + currentLevel);
    userClickedPattern = [];
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
}

function endGame() {
  
  gameStarted = false;
  userClickedPattern = [];
  gamePattern = [];
  playSound("wrong");
  gameIsOver = true;
  
}

function playSound(sound) {
  

 
    var audio = new Audio("./sounds/" + sound + ".mp3");
    audio.play();
 
 
}

function randomColour(randomChosenColour, timing) {
  setTimeout(function () {
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  }, timing);
}

$(document).on("keydown", startGame);

$(".btn").on("click", function () {
  if (gameStarted == true) {
    var buttonPressed = $(this).attr("id");

    userClickedPattern.push(buttonPressed);

    $("#" + buttonPressed).addClass("pressed");

    setTimeout(function () {
      $("#" + buttonPressed).removeClass("pressed");
    }, 100);

    checkUserInput();
    
    if (gameIsOver == true){
      playSound("wrong");
      
    }
    else{
      playSound(buttonPressed);


    }
  }
  
});
