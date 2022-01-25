var submitHighScoreEl = document.querySelector("#save-initials");
var clearHighScoreEl = document.querySelector("#clear-high-scores");
var playerScore = JSON.parse(localStorage.getItem("score"));
var highScoresArray = [];

var loadHighScores = function() {
    event.preventDefault();
    console.log(Array.isArray(highScoresArray));
    highScoresArray = JSON.parse(localStorage.getItem("codeQuizHighScores"));
    console.log(highScoresArray);
    // if nothing in localStorage, create a new object to track all task status arrays
    if (!highScoresArray) {
       highScoresArray = [{
        initials: "AAA",
        score: 0
       }];
    };
    checkHighScore();
};


var checkHighScore = function() {
    // event.preventDefault();
    console.log(highScoresArray);
    console.log(Array.isArray(highScoresArray));
    var initialsInput = document.querySelector("#initials-input").value;
    initialsInput = initialsInput.toUpperCase();
    var hideEl = document.querySelector("#display-score");
    hideEl.setAttribute ("style", "display: none;");
    // Get the high score array from local storage and add recent score to array
    highScoresArray.push({
        initials: initialsInput,
        score: playerScore
    });
    console.log(highScoresArray);
    localStorage.setItem("codeQuizHighScores", JSON.stringify(highScoresArray));
    
    // if (!previousHighScore) {
    //     console.log("no High Scores");
    //     localStorage.setItem("codeQuizHighScores", JSON.stringify(highScore))
    // }
    // else if (highScore.score > previousHighScore.score) {
    //     console.log(previousHighScore.score);
    //     console.log(highScore.score)
    //     localStorage.setItem("codeQuizHighScores", JSON.stringify(highScore));
    // };

    var highScoreContainerEl = document.querySelector("#high-score-container");
    highScoreContainerEl.setAttribute("style","display:flex;");
    highScoresArray.sort(function(a,b){return b.score - a.score});
    var highScoresArrayLimited = highScoresArray.slice(0,10);
    for (let index = 0; index < highScoresArrayLimited.length; index++) {
        var listContainerEl = document.querySelector("#high-score-list")
        var listItemEl = document.createElement("li");
        listItemEl.className = "high-score-item";
        listItemEl.innerHTML = "<span style:'float:left;'>" + (index +1) + ".   " + highScoresArray[index].initials + "</span> <span style:'float:right;'>" + highScoresArray[index].score; + "</span>"
        listContainerEl.appendChild(listItemEl);
    }
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

submitHighScoreEl.addEventListener("click", loadHighScores);
clearHighScoreEl.addEventListener("click", function() {
    localStorage.removeItem("codeQuizHighScores");
});
displayPlayerScore();
