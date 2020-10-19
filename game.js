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
var newCheatCode = [];

function randomizeCheatCode() {
  for (var i = 0; i < cheatCode.length; i++) {
    var random = Math.floor(Math.random() * 4);
    while (newCheatCode.includes(cheatCode[random])) {
      random = Math.floor(Math.random() * 4);
    }
    newCheatCode.push(cheatCode[random]);
    console.log(newCheatCode);
  }
}

$("document").ready(function() {
  randomizeCheatCode();
  var myNumbers = [];
  var index;
  for (var i = 0; i < newCheatCode.length; i++) {
    index = Math.floor(Math.random() * 8);
    while (myNumbers.includes(index)) {
      index = Math.floor(Math.random() * 8);
    }
    myNumbers.push(index);
    myNumbers.sort();
    console.log(myNumbers);
    }
    for (var i = 0; i < newCheatCode.length; i++) {
      var element = $("span.letter");
      $(element[myNumbers[i]]).css('color', newCheatCode[i]);
    }
});




function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColour);
  var audio = new Audio("sounds/click.mp3");
  audio.volume = 0.2;

  if (cheater) {
    var lastElement =  gamePattern[gamePattern.length - 1];
    $("h2").append("<span class=cheat_" + lastElement + ">" + lastElement + '</span><span>' + ", " + '</span>');
    $(".cheat_" + lastElement).css('color', lastElement);
  }

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).on("click", function() {
    audio.play();
  });
}

$(".btn").on("click", function(event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  parent.push(userChosenColour);

  if (!cheater && parent.length >= 4) {
    cheatCodeActivated();
  }
});

function cheatCodeActivated() {
  var newParent = parent.slice(parent.length - 4);
  var count = 0;
  var count2 = 0;
  for (var i = 0; i < newParent.length; i++) {
    if (newParent[i] === newCheatCode[i]) {
      count++;
    } else if (newParent[i] === newCheatCode[newCheatCode.length - 1 - i]) {
      count2++;
    }
  }
  if (count == newCheatCode.length) {
    alarm.volume = 0.2;
    alarm.play();
    $("h1").text(cheatCodeText).addClass("alarm");
    cheater = true;
  }
  if (count2 == newCheatCode.length) {
    window.location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  }
}

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
    audio.volume = 0.2;
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
  $("h2").empty();
}
