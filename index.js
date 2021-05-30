
// Telling the console that these are the colours of the game
var buttonColors = [ "red", "yellow", "blue",  "green"];

// Creating empty arrays to record the patterns of both user and game, 
// which will be 0 initially
var gamePattern = [];
var userGamePattern = [];

// telling the console the game has not started yet and is at level 0
var started = false;
var level = 0;

// Switching the game tittle to the current level through eventlistener
$(document).keypress(function(){
    if(!started) {
        $("#level-title").text("Level " + level)
        nextSequence();
        started = true;
    }
});

// Logging the clicked buttons id 
$(".btn").click(function () {

    // storing the id of the clicked button
    var userChosenColor = $(this).attr("id");

    // pushing the id to the userGamePattern array
    userGamePattern.push(userChosenColor);

    // playing the relevant sound and animation
    playSound(userChosenColor);
    animate(userChosenColor);

    // call checkAnswer() to check is the pattern is right
    checkAnswer(userGamePattern.length-1);
});

// check if the answer is correct/pattern is correct 
function checkAnswer(currentLevel) {
    // to check is the pattern is equal to gamePattern
    if(userGamePattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        // if the answer is correct, check if the sequence is completed
        if(userGamePattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        },300);
        $("#level-title").text("Game Over, Press Any Key To Restart");
        restart();
    }
}


function nextSequence() {
    // once this sequence is triggered, it resets the userGamePattern for the next level
    userGamePattern = [];

    // level increases by one
    level++;

    // updating level
    $("#level-title").text("Level " + level);


    // To get a random color for the  game colors
    var randomNumber = Math.floor(Math.random() * 4);

    // assinging a random number and passing it to the colors of the game
    var randomChosenColor = buttonColors[randomNumber];

    // pushing this pattern to gamePattern
    gamePattern.push(randomChosenColor);

    // playing the sound and animating for randomChosenColor using jQuery
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

// function to restart the game if the answer is wrong
function restart(){

    // resetting everything
    level = 0;
    gamePattern = [];
    started = false;
}

// function to play sounds
function playSound(name){
    // choosing the audio file
    var audio = new Audio ("sounds/" + name + ".mp3");
    // playing the audio file
    audio.play();
}

// function to animate 
function animate(currentColor) {

    // adding the css animation
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}
