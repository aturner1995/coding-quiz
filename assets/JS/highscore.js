const listEl = document.querySelector('.highscore-list');
const clearEl = document.querySelector('#clear');

let highScores = JSON.parse(localStorage.getItem('highScoreList')) || [];

highScores.forEach(score => {
    const itemEl = document.createElement('li');
    itemEl.textContent = `${score.name}: ${score.score}`;
    listEl.appendChild(itemEl);
  });

  clearEl.addEventListener('click', e => {
    localStorage.removeItem('highScoreList');
    location.reload();
  })