var quizQuestion = ["Inside which HTML element do we put the JavaScript?", `How do you write "Hello World" in an alert box?`,`How to write an IF statement in JavaScript?`,`How does a FOR loop start?`, `What is the correct way to write a JavaScript array?`];

var answerOptions = [
    ["js tag", "scripting tag","script tag","javascript tag"],
    [`msg("Hello World");`, `alertBox("Hello World");`, `alert("Hello World");`, `msgBox("Hello World");`],
    ['if i = 5', `if(i==5)`, `if i = 5 then`, `if i == 5 then`],
    [`for (i <= 5; i++)`, `for (i = 0; i <= 5)`, `for i = 1 to 5`, `for (i = 0; i <= 5; i++)`],
    [`var colors = ["red","green","blue"]`, `var colors = (1:"red", 2:"green", 3:"blue")`, `var colors = 1 =("red"), 2 = ("green"), 3 = ("blue")`, `var colors "red,"green","blue"`]
];

var quizAnswers = [`script tag`,`alert("Hello World");`,`if(i==5)`,`for (i = 0; i <= 5; i++)`,`var colors = ["red","green","blue"]`];

var questionHeader = $("#questionHeader");
var question = $("#question");
var answerChoices = $("#answerChoices");
var startBtn = $("#startBtn");
var response = $(".response");
var feedback = $("#feedback");

var questionNum = 0;
var score = 0;

var highScores = [];
var storedHighScores = JSON.parse(localStorage.getItem("highscores"));

if (storedHighScores !== null) {
    highScores = storedHighScores;
}

function loadQuestion(){
    questionHeader.text(`Question ${questionNum +1}`);
    question.text(quizQuestion[questionNum]);
}

function loadAnswerChoices(){
    for (var i = 0; i < 4; i++){
        var answerOption = $(`<button></button>`);
        answerOption.addClass("btn btn-outline-primary response");
        answerOption.text(answerOptions[questionNum][i])
        answerChoices.append(answerOption);
    }
}

startBtn.on("click", function(){
    loadQuestion();
    loadAnswerChoices();
    $(".start").empty()
});

$("body").delegate(".response", "click", function(){
    if (questionNum < 4){
        var answer = $(this).text();
        if (answer == quizAnswers[questionNum]){
            feedback.text("Correct!");
            score += 5;
        }else{
            feedback.text("Incorrect");
        }

        questionNum++;
        loadQuestion();
        answerChoices.empty();
        loadAnswerChoices();
    }else{
        questionHeader.text("All Done!");
        question.text(`Your final score is ${score}`);
        answerChoices.empty();

        var enterInitialsForm = $("<form></form>");
        var label = $(`<label for="initials">Enter Initials</label>`);
        var input = $(`<input type="text" class="form-control" id="initials"></input>`);
        var submit = $(`<button class="btn btn-primary" id="submit">Submit</button>`);

        enterInitialsForm.append(label);
        enterInitialsForm.append(input);
        enterInitialsForm.append(submit);

        answerChoices.append(enterInitialsForm);

        feedback.text("");
    }
});

$("body").delegate("#submit", "click", function(){
    event.preventDefault();
    
    questionHeader.text("Highscores");
    var currScore = `${$("#initials").val()}: ${score}`;
    
    highScores.push(currScore);
    localStorage.setItem("highscores", JSON.stringify(highScores));

    answerChoices.empty();

    var goBackBtn =  $(`<button class="btn btn-primary" id="goBack">Go Back</button>`);
    var clearScores = $(`<button class="btn btn-primary" id="clearScores">Clear Highscores</button>`);

    answerChoices.append(goBackBtn);
    answerChoices.append(clearScores);

    question.empty();
    
    highScores.forEach(score => {

        var scoreLi = $(`<p>${score}</p>`);
        question.prepend(scoreLi);
    });
   
});

$("body").delegate("#goBack", "click", function(){
    window.location.reload(true); 
});
    
// })

// if less than prepend
// if more that append