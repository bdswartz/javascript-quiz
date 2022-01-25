// Define the variables for the existing elements we will be targeting because they will
// need to be global
var buttonSelectContEl = document.querySelector("#button-container");
var titleBoxEl = document.querySelector("#title-block");
var infoEl = document.querySelector("#game-info");
var answerListEl = document.querySelector("#answer-choice-container");
var answerFeedEl = document.querySelector("#feedback-container");
var startBtn = document.createElement("button");
var gameInstructionEl = document.createElement("p");
var timerDisplay = document.querySelector("#timer-display");
var submitInitialEl = document.querySelector("#initial-input-btn");
var randomChoiceCounter = [1,2,3,4];

// initialize beginning game conditions
var questionNum = 0
var timerValue = 0
var timerStartTime = 60
var score = 0;
var endOfGame = true;

var quizInfo = [
    { 
        question:"Where is the best place to enter a reference to an external JavaScript file?",
        choices:["Top of Head section","Bottom of Body section","Before First Div element","Top of Body section"],
        answer: "Bottom of Body section"
    },
    {
        question: 'How do you write "Help!" in an alert box using JavaScript?',
        choices: ['alert("Help!");','msg("Help");','alrtBox("Help!");','msgBox("Help");'],
        answer: 'alert("Help!");'
    },
    {
        question: 'How do you create a function in JavaScript?',
        choices: ["var myFunction() = function", "function.myFunction()", "var myFunction = function()","myFunction function()"],
        answer: "var myFunction = function()"
    },
    {
        question: 'Which of these conditionals is not true?',
        choices: ["(!false)", "(true)", "(True)", "(“true” === true)"],
        answer: "(“true” === true)"
    },
    {
        question: 'Which of these is a comment in a JavaScript?',
        choices: ["<! comment", "<--comment" , "//comment", "/* comment */"],
        answer: "//comment"
    },
    {
        question: 'What type of variable takes precedence if named the same as another variable?',
        choices: ["native variable", "global variable", "local variable","none of these"],
        answer: "local variable"
    },
    {
        question: 'Which of the following Array methods removes all but the specified range of items in the array?',
        choices: ["splice()", "range()", "slice()","shift()"],
        answer: "slice()"
    },
    {
        question: 'How do you write an IF statement to run if x is NOT equal to y',
        choices: ["if (x NOT= y)", "if (x >< y)", "if (x != y)","if (x /= y)"],
        answer: "if (x != y)"
    },
    {
        question: 'What is the proper way to start a WHILE loop?',
        choices: ["while (i = 0; i <= 5; i++)", "while (i from 1 to 10)", "while (x >= 10)","while x < 10"],
        answer: "while (x >= 10)"
    },
    {
        question: 'How do you call a function in JavaScript?',
        choices: ["call myFunction()", "myFunction()", "function myFunction()","var myFunction() ="],
        answer: "myFunction()"
    }
];

// Function to create welcome screen with title, instructions and start button
var createLandingScreen = function() {
    // Create game instructions below Game Title (<P> in .title-block)
    gameInstructionEl.textContent = "Answer multiple choice questions by clicking on the correct answer. You have a total of 100 seconds to complete the quiz. Every wrong answer will take away 10 seconds from your remaining time. Press the Start button when ready to begin the quiz.";
    gameInstructionEl.className = "sub-game-title";
    // Create start button below the game instructions (button in .button-container)
    startBtn.className = "start-btn";
    startBtn.textContent = "Start Game";
    // append game instructions and start button
    titleBoxEl.appendChild(gameInstructionEl);
    buttonSelectContEl.appendChild(startBtn);
};

var displayQuestionContainers = function() {
// Create the question element and answer choice list elements
    var questionBoxEl = document.querySelector("#major-header-content");
    var questionEl = document.createElement("h2");
    questionEl.id = "question-display"
    questionEl.className = "question";
    questionBoxEl.appendChild(questionEl);
    for (var index = 0; index < 4; index++) {
        var answerChoiceEl = document.createElement("li");
        answerChoiceEl.className = "answer-choice";
        answerChoiceEl.setAttribute("data-choice", index);
        answerListEl.appendChild(answerChoiceEl);
    };
    displayNextQuestion();
};

var randomizeArray  = function(passedArray) {
    for (var i = passedArray.length-1; i > 0 ; i--) {
        var j = Math.floor(Math.random()*i);
        var k = array[i];
        passedArray[i] = passedArray[j];
        passedArray[j] = k;
    };
    return array
};

// Populate the question and answer elements
    var displayNextQuestion = function () {
        // Display the next question to be answered in the question display box
        var questionEl = document.querySelector("#question-display");
        var questAnswer = quizInfo [questionNum];
        questionEl.textContent = questAnswer.question;
        //  Display corresponding answer choices
        for (choiceNum = 0; choiceNum < questAnswer.choices.length; choiceNum++) {
            var printAnswer = document.querySelector(".answer-choice[data-choice='" + choiceNum + "']");
            printAnswer.setAttribute("style","background-color: rgb(110, 110, 110);");
            printAnswer.textContent = questAnswer.choices[choiceNum];
        };
        answerListEl.addEventListener("click", processAnswer);
    };
            
    var processAnswer = function(event) {
        var userChoiceEl = event.target;
        var userChoice = parseInt(event.target.getAttribute("data-choice"));
        if (userChoice >= 0 && userChoice <= 3) {
            userChoiceEl.setAttribute("style", "background-color: rgb(201, 26, 232);");
            submitAnswer (userChoice);
        };
    };
    var submitAnswer = function(userChoice) {
        // console.log(questAnswer.answer);
        var questAnswer = quizInfo [questionNum];
        answerListEl.removeEventListener("click", processAnswer);
        // var userAnswerEl = document.querySelector(".answer-choice[data-choice='" + userChoice + "']");
        var feedbackEl = document.querySelector("#feedback");
        questionNum++;
        if (questAnswer.choices[userChoice] == questAnswer.answer) {
            timerValue = timerValue + 10;
            feedbackEl.textContent = "Correct!"
            feedbackEl.setAttribute("style", "border-top: 3px solid rgba(0, 0, 0, 25%);");
            setTimeout(function() {
                feedbackEl.textContent = "";
                feedbackEl.setAttribute("style", "none");
            if (questionNum < quizInfo.length) {
                displayNextQuestion();
            }
            else {
                endGame();
            }
            }, 2000);
        }
        else {
            timerValue = timerValue - 10;
            feedbackEl.textContent = "Incorrect!";
            feedbackEl.setAttribute("style", "border-top: 3px solid rgba(0, 0, 0, 25%);");
            setTimeout(function() {
                feedbackEl.textContent = "";
                feedbackEl.setAttribute("style", "none");
            if (questionNum < quizInfo.length) {
                displayNextQuestion();
            }
            else {
                endGame();
            }
        }, 2000);
        };
    };

// Create Game play control function 
var gameControl = function() {
    // remove game instructions and start button
    endOfGame = false;
    startBtn.remove();
    gameInstructionEl.remove();
    // Start Timer
    timerStart();
    // Optional, randomize the order for the question and answer order
    // Call Q&A display function
    displayQuestionContainers()
};
// Timer function
var timerStart = function() {
    timerValue = timerStartTime
    timerDisplay.innerHTML = "Time Remaining: "+ timerValue;
    timerValue=(timerValue-1);
    var gameTimer = setInterval(function(){
        if (timerValue > 0 && !endOfGame) {
            timerDisplay.innerHTML = "Time Remaining: " + timerValue;
            timerValue--;
        }
        // if the timer has expired, stop the timer and end the game
        else if (endOfGame) {
            clearInterval(gameTimer);
        }
        else {
            clearInterval(gameTimer);
            endGame();
            }
        },1000);
};

// End game, display score, check high scores
var endGame = function() {
    answerListEl.removeEventListener("click", processAnswer)
    // log score and clear timer
    score = timerValue;
    // console.log(score);
    endOfGame = true;
    localStorage.setItem('score', JSON.stringify(score));
    window.location.href = "highscore.html";
};

        
        // ***Optional*** randomize function to set the question order and possible answer order
        // Create event listeners
        
        createLandingScreen();
        startBtn.addEventListener("click" , gameControl);