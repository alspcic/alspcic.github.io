var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).on("click", function() {
    audio.play();
  });
}

$(".btn").on("click", function(event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function animatePress(userChosenColour) {
  $(".btn#" + userChosenColour).addClass("pressed");
  setTimeout(function() {
    $(".btn#" + userChosenColour).removeClass("pressed");
  }, 100);
};

$(document).on("keypress", function() {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  $("h1").text("Game Over, Press Any Key to Start");
}
