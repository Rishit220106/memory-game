var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var index=0;

function nextSequence(){
    index=0;
    userClickedPattern=[];
    level++;
    $('h1').text('Level:'+level);
    var rand=Math.random();
    rand=Math.floor(rand*3);
    var randomChosencolor=buttonColors[rand];
    gamePattern.push(randomChosencolor);
    $('#'+randomChosencolor).fadeOut(50).fadeIn(50);
    playSound(randomChosencolor);
    $(document).unbind('keypress');
    index=0;
}

// function handler(event){
//     // var userChosencolor=$(event.target).classList;
//     console.log(event);
// }

function playSound(name){
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function (){$("#"+currentColor).removeClass("pressed");},100);
}

function checkAnswer(currentLevel){
    console.log(currentLevel);
    console.log(gamePattern);
    console.log(userClickedPattern);
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if (gamePattern.length===userClickedPattern.length){
            console.log("level finished");
            setTimeout(nextSequence,1000);
        }
    }
    else{
        $("body").addClass('game-over');
        setTimeout(function(){$("body").removeClass('game-over');},200);
        $('h1').text("Game Over, Press Any Key to Restart");
        $(document).keypress(function (){location.reload()});
    }
}

$(document).keypress(nextSequence);


$(".btn").click(function(event){
    var userChosencolor=event.target.classList[1];
    userClickedPattern.push(userChosencolor);
    checkAnswer(index);
    index+=1;
    animatePress(userChosencolor);
    playSound(userChosencolor);

});
