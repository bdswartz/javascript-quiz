var submitHighScoreEl = document.querySelector("#save-initials");
var clearHighScoreEl = document.querySelector("#clear-high-scores");
var playerScore = JSON.parse(localStorage.getItem("score"));
var highScoresArray = [];

// Load high scores from local storage and initialize array
var addHighScores = function() {
    event.preventDefault();
    // Get initials for high score board
    var initialsInput = document.querySelector("#initials-input").value;
    initialsInput = initialsInput.toUpperCase();
    initialsInput = initialsInput.substring(0,4);
    var hideEl = document.querySelector("#display-score");
    hideEl.setAttribute ("style", "display: none;");
    // Load high score from storage
    highScoresArray = JSON.parse(localStorage.getItem("codeQuizHighScores"));
     // if nothing in localStorage, initialize a new object with current high score
    if (!highScoresArray) {
        highScoresArray = [{
         initials: initialsInput,
         score: playerScore
        }]
    }
    // or if there are high scores previously established push new score to array
    else {
        highScoresArray.push({
        initials: initialsInput,
        score: playerScore
    });
    };
    updateLeaderBoard();
};

    var updateLeaderBoard = function(){ 
        // find and display high score list container on the page
        var highScoreContainerEl = document.querySelector("#high-score-container");
        highScoreContainerEl.setAttribute("style","display:flex;");
        // Sort leader board from highest to lowest score
        highScoresArray.sort(function(a,b){return b.score - a.score});
        // Slice array to display only the top 10 scores
        var highScoresArrayLimited = highScoresArray.slice(0,10);
        // Create and populate list items to display the high scores
        for (let index = 0; index < highScoresArrayLimited.length; index++) {
            var listContainerEl = document.querySelector("#high-score-list")
            var listItemEl = document.createElement("li");
            listItemEl.className = "high-score-item";
            listItemEl.innerHTML = "<span style='float:left;'>" + (index +1) + ".   " + highScoresArray[index].initials + "</span> <span style='float:right;'>" + highScoresArray[index].score; + "</span>"
            listContainerEl.appendChild(listItemEl);
        }
        // Save new leader board to local storage
        localStorage.setItem("codeQuizHighScores", JSON.stringify(highScoresArray));
};

// Display the score for the current player
var displayPlayerScore = function () {
    // console.log(playerScore);
    var scoreDisplayEl = document.querySelector("#report-score");
    if (playerScore < 0) {
        playerScore = 0;
    };
    scoreDisplayEl.innerHTML =  "Great work! Your score is " + playerScore + "!";
};

// Event listeners to submit current score and to clear high scores from storage
submitHighScoreEl.addEventListener("click", addHighScores);
clearHighScoreEl.addEventListener("click", function() {
    localStorage.removeItem("codeQuizHighScores");
});
displayPlayerScore();
