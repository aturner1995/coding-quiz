var questions = [
    {
        question: "Which is not valid data type in Javascript?",
        choice1: 'Undefined',
        choice2: 'Boolean',
        choice3: 'Float',
        choice4: 'Number',
        answer: 'Float'
    },
    {
        question: "Which tag is used to write the javascript code?",
        choice1: '<script>',
        choice2: '<sp>',
        choice3: '<javascript>',
        choice4: '<java>',
        answer: '<script>'
    },
    {
        question: "What is the output: var a = '20'; var b = a = 30; console.log(a+b)",
        choice1: '20',
        choice2: '60',
        choice3: '30',
        choice4: '50',
        answer: '60'
    },
    {
        question: "Types of errors in Javascript",
        choice1: 'Run time errors',
        choice2: 'Compile Time Erroe',
        choice3: 'Logical Error',
        choice4: 'None of the Above',
        answer: 'Run time errors'
    },
    
    {
        question: "Which property is used to set the background color of an HTML element?",
        choice1: 'background-color',
        choice2: 'bgcolor',
        choice3: 'color',
        choice4: 'backgroundColor',
        answer: 'background-color'
        },
        {
        question: "What is the default value of the position property in CSS?",
        choice1: 'fixed',
        choice2: 'static',
        choice3: 'relative',
        choice4: 'absolute',
        answer: 'static'
        },
        {
        question: "What is the CSS syntax to change the text color of an HTML element?",
        choice1: 'color: red;',
        choice2: 'text-color: red;',
        choice3: 'font-color: red;',
        choice4: 'textColor: red;',
        answer: 'color: red;'
        },
        {
        question: "What does HTML stand for?",
        choice1: 'Hyper Text Markup Language',
        choice2: 'Hyperlinks and Text Markup Language',
        choice3: 'Home Tool Markup Language',
        choice4: 'Hyper Text Programming Language',
        answer: 'Hyper Text Markup Language'
        },
        {
        question: "What is the CSS property used to change the font of an HTML element?",
        choice1: 'font-family',
        choice2: 'font-type',
        choice3: 'type-font',
        choice4: 'fontFamily',
        answer: 'font-family'
        },
        {
        question: "Which CSS property is used to set the width and height of an HTML element?",
        choice1: 'width-height',
        choice2: 'height-width',
        choice3: 'dimension',
        choice4: 'size',
        answer: 'dimension'
        },
        {
        question: "What is the JavaScript method used to add a new element to an HTML document?",
        choice1: 'addElement()',
        choice2: 'appendChild()',
        choice3: 'append()',
        choice4: 'createElement()',
        answer: 'createElement()'
        },
        {
        question: "What is the JavaScript syntax for creating a function?",
        choice1: 'function = myFunction()',
        choice2: 'function:myFunction()',
        choice3: 'function myFunction()',
        choice4: 'myFunction = function()',
        answer: 'function myFunction()'
        },
        {
        question: "What is the default value of display property in CSS?",
        choice1: 'none',
        choice2: 'block',
        choice3: 'inline',
        choice4: 'inline-block',
        answer: 'inline'
        }
];
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
let score = 0;
let questionCounter = 0;
// Set the value of points and time penalty for incorrect answers.
const SCORE_POINTS = 10;
const TIME_PENALTY = 5;
// Start game function to initalize question counter, score & to start the timer + first question.
const startGame = () => {
    questionCounter = 0;
    score = 0;
    introEl.style.display = "none";
    quizEl.style.display = "flex";
    nextQuestion();
    timeLeft = questions.length * 1;
    timer();
};
// Next question function will end game if all questions are answered & inputs the the question + selections
// on the page.
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
// Timer for quiz. If timer = 0 the quiz ends.
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

const displayScores = () => {
    let highScores = JSON.parse(localStorage.getItem('highScoreList')) || [];
    listEl.textContent = '';

    highScores.forEach(score => {
        const itemEl = document.createElement('li');
        itemEl.textContent = `${score.name}: ${score.score}`;
        listEl.appendChild(itemEl);
    });
}

// Event listener for the correct answer. The result is displayed on the page and calls the nextQuestion
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

playButtonEl.forEach(i => {
    i.addEventListener('click', e => {
        location.reload;
        startGame();
    })
})

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

highScoreButtonEl.forEach(i => {
    i.addEventListener('click', e => {
        introEl.style.display = 'none';
        endEl.style.display = 'none';
        highScoreEl.style.display = 'flex';
    })
})

clearEl.addEventListener('click', e => {
    localStorage.removeItem('highScoreList');
    location.reload();
  })

introButtonEl.addEventListener('click', e => {
    introEl.style.display = 'flex'
    highScoreEl.style.display = 'none';
})
