const saveScoreEl = document.querySelector('#save-btn');
const userName = document.querySelector('#username');
const finalScore = document.querySelector('.final-score-text');

let currentScore = localStorage.getItem('currentScore');
let storedHighScore = JSON.parse(localStorage.getItem("highScoreList"))

const saveHighScore = () => {
    localStorage.setItem('highScoreList', JSON.stringify(highScoreList));
}

finalScore.textContent = "Final Score: " + currentScore;
saveScoreEl.addEventListener('click', e => {
    saveHighScore();
    window.location.assign("/pages/highscore.html");
})
