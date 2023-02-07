// Select page elements to dynamically update text and to hide/display features
const questionEl = document.querySelector('.question');
const choicesEl = document.querySelectorAll('.choice-text');
const answerEl = document.querySelector('.answer-correct-incorrect')
const timerEl = document.querySelector('.timer');
const introEl = document.querySelector('.container1');
const quizEl = document.querySelector('.container2');
const endEl = document.querySelector('.container3');
const highScoreEl = document.querySelector('.container4');
const playButtonEl = document.querySelectorAll('.play-btn');
const highScoreButtonEl = document.querySelectorAll('.score-btn');
const saveScoreButtonEl = document.querySelector('#save-score-btn');
const userName = document.querySelector('#username');
const finalScore = document.querySelector('.final-score-text');
const listEl = document.querySelector('.highscore-list');
const clearEl = document.querySelector('#clear');
const introButtonEl = document.querySelector('.intro-btn');

//  Initialize score, and the current question.
let currentQuestion = {};
let score;
let questionCounter;
let timeLeft;
// Set the value of points and time penalty for incorrect answers.
const SCORE_POINTS = 10;
const TIME_PENALTY = 10;
// Start game function to initalize question counter, score & to start the timer + first question.
const startGame = () => {
    questionCounter = 0;
    score = 0;
    timeLeft = questions.length * 6;
    introEl.style.display = "none";
    quizEl.style.display = "flex";
    nextQuestion();
    timer();
};
// Next question function displays the next question on the page from the questionBank
const nextQuestion = () => {   
    currentQuestion = questions[questionCounter];
    questionEl.textContent = currentQuestion.question;

    choicesEl.forEach(choice => {
        const number = choice.dataset['question'];
        choice.textContent = currentQuestion['choice' + number];
    });
};
// Hide the answer text content after 1 second when user moves to the next question.
const hide = () => {
    answerEl.textContent = '';
}
// Timer for quiz. If timer = 0 or the questions are finished the quiz ends and the clock stops.
const timer = () => {
    let timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = 'Time Left: '+ timeLeft;

        if (timeLeft === 0 || questionCounter === questions.length) {
            clearInterval(timerInterval);
            gameover();           
        }
    }, 1000)
};
// When time is zero or the user completes all questions the function saves the score and goes to the end game page
const gameover = () => {
    score += timeLeft;
    quizEl.style.display = 'none';
    endEl.style.display = 'flex';
    finalScore.textContent = "Final Score: " + score;
}
// Function to save the current score to the local storage and sort the high score list
const saveHighScore = () => {
    let storedHighScore = JSON.parse(localStorage.getItem("highScoreList")) || [];
    console.log(storedHighScore);

    let currentScore = {
        score: score,
        name: userName.value.trim()
    };

    storedHighScore.push(currentScore);
    storedHighScore = storedHighScore.sort((a,b) => {
        return b.score - a.score;
    });

    localStorage.setItem('highScoreList', JSON.stringify(storedHighScore)); 
    displayScores();
}
// Function to retrive the high score data and display it on the high score page
const displayScores = () => {
    let highScores = JSON.parse(localStorage.getItem('highScoreList')) || [];
    listEl.textContent = '';

    highScores.forEach(score => {
        const itemEl = document.createElement('li');
        itemEl.textContent = `${score.name}: ${score.score}`;
        listEl.appendChild(itemEl);
    });
}
// function to retrive the high scores and display the scores when the page opens
const init = () => {
    displayScores();
}

init();

// Event listeners 

// Click listener for correct answer. The result is displayed on the page and calls the nextQuestion
// function. If the time is below the TIME_PENALTY the gameover function is called.
choicesEl.forEach(choice => {
    choice.addEventListener('click', e => {
        if (e.target.textContent === currentQuestion.answer) {
            score += SCORE_POINTS;
            answerEl.textContent = "Answer Correct";
            setTimeout(hide,1000);
        } else {
            answerEl.textContent = "Answer Incorrect"
            setTimeout(hide,1000);
            if (timeLeft <= TIME_PENALTY) {
                timeLeft = 0;
                gameover();
            }
            else {
                timeLeft = timeLeft - TIME_PENALTY;
            }            
        }
        questionCounter++;
        if (questionCounter < questions.length) {
            nextQuestion();
        }         
    });
});
// When user selects play or play again the quiz starts
playButtonEl.forEach(i => {
    i.addEventListener('click', e => {
        location.reload;
        startGame();
    })
})
// When the save score button is clicked the default behaviour is stopped and the savehHighScore function is called
saveScoreButtonEl.addEventListener('click', e => {
   if (userName.value === '') {
        e.preventDefault();
        window.alert("Please enter your name before saving score");
    }
    else {
        e.preventDefault();
        saveHighScore();
        highScoreEl.style.display = 'flex';
        endEl.style.display = 'none';
        introEl.style.display = 'none';
    }  
})
// Directs to the high score list
highScoreButtonEl.forEach(i => {
    i.addEventListener('click', e => {
        introEl.style.display = 'none';
        endEl.style.display = 'none';
        highScoreEl.style.display = 'flex';
    })
})
// Clear scores from local storage and reload page
clearEl.addEventListener('click', e => {
    localStorage.removeItem('highScoreList');
    location.reload();
  })
// Main menu button
introButtonEl.addEventListener('click', e => {
    introEl.style.display = 'flex'
    highScoreEl.style.display = 'none';
})
