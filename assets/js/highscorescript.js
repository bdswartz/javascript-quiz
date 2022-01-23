var submitHighScoreEl = document.querySelector("#save-initials");
var clearHighScoreEl = document.querySelector("#clear-high-scores");
var playerScore = JSON.parse(localStorage.getItem("score"));

var checkHighScore = function() {
    event.preventDefault();
    var initialsInput = document.querySelector("#initials-input").value;
    var hideEl = document.querySelector("#display-score");
    hideEl.setAttribute ("style", "display: none;");
    // Get the high score array from local storage and add recent score to array
    var highScore = {
        initials: initialsInput,
        score: playerScore
    };
    var previousHighScore = JSON.parse(localStorage.getItem("codeQuizHighScores"));


    // localStorage.setItem("codeQuizHighScores", JSON.stringify(highScore))
    
    if (!previousHighScore) {
        console.log("no High Scores");
        localStorage.setItem("codeQuizHighScores", JSON.stringify(highScore))
    }
    else if (highScore.score > previousHighScore.score) {
        console.log(previousHighScore.score);
        console.log(highScore.score)
        localStorage.setItem("codeQuizHighScores", JSON.stringify(highScore));
    };
    var highScoreContainerEl = document.querySelector("#high-score-container");
    highScoreContainerEl.setAttribute("style","display:flex;");
    var listContainerEl = document.querySelector("#high-score-list")
    var listItemEl = document.createElement("li");
    listItemEl.className = "high-score-item";
    var scoreDisplay = JSON.parse(localStorage.getItem("codeQuizHighScores"));
    listItemEl.innerHTML = "Score:  " + scoreDisplay.score + "     ------  Player: " +scoreDisplay.initials;
    listContainerEl.appendChild(listItemEl);
};

var displayPlayerScore = function () {
    // console.log(playerScore);
    var scoreDisplayEl = document.querySelector("#report-score");
    if (playerScore < 0) {
        playerScore = 0;
    }
    else {
    scoreDisplayEl.innerHTML =  "Great work! Your score is " + playerScore + "!";
    };
};
submitHighScoreEl.addEventListener("click", checkHighScore);
clearHighScoreEl.addEventListener("click", function() {
    localStorage.removeItem("codeQuizHighScores");
});
displayPlayerScore();
