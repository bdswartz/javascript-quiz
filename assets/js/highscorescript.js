var submitHighScoreEl = document.querySelector("#save-initials");

var logHighScore = function() {
    event.preventDefault();
    var initialsInput = document.querySelector("#initials-input").value;
    console.log(initialsInput);
    var hideEl = document.querySelector("#display-score");
    hideEl.setAttribute ("style", "display: none;");
};

var displayHighScore = function () {
    var score = JSON.parse(localStorage.getItem("score"));
    console.log(score);
    var scoreDisplayEl = document.querySelector("#report-score");
    scoreDisplayEl.innerHTML = "Great work! Your score is " + score + "!";
};
var fillHighScoreBoard = function() {

};
submitHighScoreEl.addEventListener("click", logHighScore);
displayHighScore();
