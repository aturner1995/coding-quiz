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

const questionEl = document.querySelector('.question');
const choicesEl = document.querySelectorAll('.choice-text');
const answerEl = document.querySelector('.answer-correct-incorrect')
const timerEl = document.querySelector('.timer');

let currentQuestion = {};
let score = 0;
let questionCounter = 0;
const SCORE_POINTS = 10;
const SCORE_PENALTY = 5;

const startGame = () => {
    questionCounter = 0;
    score = 0;
    nextQuestion();
    timeLeft = questions.length * 1;
    timer();
};

const nextQuestion = () => {
    if (questionCounter === questions.length) {
        gameover();
    }    
    
    currentQuestion = questions[questionCounter];
    questionEl.textContent = currentQuestion.question;

    choicesEl.forEach(choice => {
        const number = choice.dataset['question'];
        choice.textContent = currentQuestion['choice' + number];
    });
};

choicesEl.forEach(choice => {
    choice.addEventListener('click', e => {
        if (e.target.textContent === currentQuestion.answer) {
            score += SCORE_POINTS;
            answerEl.textContent = "Answer Correct"
            setTimeout(hide,1000);
            timeLeft = timeLeft + SCORE_PENALTY;
        } else {
            answerEl.textContent = "Answer Incorrect"
            setTimeout(hide,1000);
            if (timeLeft < SCORE_PENALTY) {
                gameover();
            }
            else {
                timeLeft = timeLeft - SCORE_PENALTY;
            }            
        }
        questionCounter++;
        nextQuestion();
    });
});

const hide = () => {
    answerEl.textContent = '';
}

const timer = () => {
    let timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = 'Time Left: '+ timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            gameover();           
        }
    }, 1000)
};

const gameover = () => {
    window.location.assign("/end.html")
    localStorage.setItem("currentScore", score);
}

startGame();
