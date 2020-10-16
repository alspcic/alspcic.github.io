var buttonColours = ["red", "blue", "green", "yellow"];
var cheatCode = ["red", "yellow", "green", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var parent = [];
var cheatCodeText = "Cheat code activated, press any key to restart the game";
var cheater = false;
var alarm = new Audio("sounds/alarm.mp3");
var randomChosenColour = "";

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);

  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  var audio = new Audio("sounds/click.mp3");

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).on("click", function() {
    audio.play();
  });
}

$(".btn").on("click", function(event) {
  userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  parent.push(userChosenColour);

  if (!cheater) {
    for (var i = 0; i < parent.length; i++) {
      if (parent[i] === cheatCode[0]) {
        if (parent[i + 1] === cheatCode[1]) {
          if (parent[i + 2] === cheatCode[2]) {
            if (parent[i + 3] === cheatCode[3]) {
              alarm.play();
              $("h1").text(cheatCodeText).addClass("alarm");
              cheater = true;
            }
          }
        }
      }
    }
  }

  if (cheater) {
    $("h2").text(gamePattern);
  }

});

function animatePress(userChosenColour) {
  $(".btn#" + userChosenColour).addClass("pressed");
  setTimeout(function() {
    $(".btn#" + userChosenColour).removeClass("pressed");
  }, 100);
};

$(document).on("keypress", function() {
  alarm.pause();
  alarm.currentTime = 0;
  $("h1").removeClass("alarm");
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(document).on("touchstart", function() {
  alarm.pause();
  alarm.currentTime = 0;
  $("h1").removeClass("alarm");
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
