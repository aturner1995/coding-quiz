const saveScoreEl = document.querySelector('#save-btn');
const userName = document.querySelector('#username');
const finalScore = document.querySelector('.final-score-text');

let currentScore = localStorage.getItem('currentScore');

const saveHighScore = () => {
    let storedHighScore = JSON.parse(localStorage.getItem("highScoreList")) || [];

    let score = {
        score: currentScore,
        name: userName.value.trim()
    };

    storedHighScore.push(score);
    storedHighScore = storedHighScore.sort((a,b) => {
        return b.score - a.score;
    });

    localStorage.setItem('highScoreList', JSON.stringify(storedHighScore));
}

finalScore.textContent = "Final Score: " + currentScore;

userName.addEventListener('input', () => {
    saveScoreEl.disabled = !userName.value;
});

saveScoreEl.addEventListener('click', e => {
    saveHighScore();
    window.location.assign("/pages/highscore.html");
});
