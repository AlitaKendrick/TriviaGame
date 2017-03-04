$(document).ready(function() {

//object that holds all questions and answer info
var questions = {
    zero: {
        question: "sup",
        answers: ["a", "b", "c", "d"],
        correct: "a"
    },
    one: {
     	question: "yo",
        answers: ["a", "b", "c", "d"],
        correct: "d"
    },
};

//setting up divs to contain info
var rightDiv = $("<div class='rightAns'></div>");
var timerDiv = $("<div class='countdown'><h3></h3></div>");
var questionDiv = $("<div class='question'><h3></h3></div>");
var answerDiv = $("<div class='answers'></div>");

//object keys to return questions in order
var keys = Object.keys(questions);
var key = keys[n];
var time = 20;
var n = 0;

//function with reset and game setup
function setup() {
    $(".start").css("display", "none");

	var correct = 0;
	var incorrect = 0;
    var timeout = 0;
    n = 0;
    key = keys[n];

    var reset = function() {
        time = 20;
        $(".rightAns").empty();
        $(".rightAns").remove();
        $(".main").append(timerDiv);
        $(".countdown h3").html("TIME REMAINING: " + time);
        $(".main").append(questionDiv);
        $(".main").append(answerDiv);
    }

reset();

//function to begin showing questions and following messages
function showQA() {
    $(".question h3").html(questions[key].question);
        
    for (var i = 0; i < questions[key].answers.length; i++) {
       	$(".answers").append("<p class='answer'>" + questions[key].answers[i] + "<p>");
    }
            
    $(".answers p").on("click", function() {
        var selected = $(this).text();

 //if then: if question right show this, if wrong show that
            if (selected === questions[key].correct) {
                clearInterval(counter);
                $(timerDiv).remove();
                $(questionDiv).remove();
                $(".answers p").remove();
                $(answerDiv).remove();
               	$(".main").append(rightDiv);
                $(".rightAns").text("YOU'RE RIGHT");
                correct++;
            } else {
                clearInterval(counter);
                $(timerDiv).remove();
                $(questionDiv).remove();
                $(".answers p").remove();
                $(answerDiv).remove();
                $(".main").append(rightDiv);
                $(".rightAns").text("OPPS! THE CORRECT ANSWER WAS " + questions[key].correct);
                incorrect++;
            }
            n++;
            key = keys[n];

//checking if last question - if yes show score
                if (checkIfLast()) {
                	displayFinalScore();

                } else {
                    setTimeout(countReset, 2000);
                    setTimeout(reset, 2000);
                    setTimeout(showQA, 2000);
                }
    });
}

showQA();

var counter = setInterval(count, 500);

//shows time remaining at the top of each question
function count() {
    time--
    $(".countdown h3").html("TIME REMAINING " + time);
     
    if (time < 1) {
    clearInterval(counter);
    $(timerDiv).remove();
    $(questionDiv).remove();
    $(".answers p").remove();
    $(answerDiv).remove();
    $(".main").append(rightDiv);
    $(".rightAns").html("<h2>OUT OF TIME!</h2><h1>THE CORRECT ANSWER WAS: " + questions[key].correct + ".</h1>");
    timeout++;
    n++;
    key = keys[n];
    
    	if (checkIfLast()) {
    	displayFinalScore();
    	} else {
    	setTimeout(countReset, 2000);
    	setTimeout(reset, 2000);
    	setTimeout(showQA, 2000);
    	}
    }
}

function checkIfLast() {
    if (key === undefined) {
    return true;
    }
    return false;
    }

//timer for message after choosing answer
 function countReset() {
    counter = setInterval(count, 500);
}




//displays final score after 'check if last' returns yes
function displayFinalScore() {
    $(".rightAns").remove();
    $(".start").css("margin-top", "20px");
    $(".start").css("display", "inline");
    $(".main").prepend("<h2>UNANSWERED: " + timeout + "</h2>");
    $(".main").prepend("<h2>INCORRECT: " + incorrect + "</h2>");
    $(".main").prepend("<h2>CORRECT: " + correct + "</h2>");
	}
};

$(document).on("click", ".start", setup);

});
