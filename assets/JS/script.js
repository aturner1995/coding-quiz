var questions = [
    {
        question: "What is 2 + 2?",
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '44',
        answer: '4'
    },
    {
        question: "What is 2 + 3?",
        choice1: '2',
        choice2: '4',
        choice3: '5',
        choice4: '44',
        answer: '5'
    },
    {
        question: "What is 2 + 1?",
        choice1: '2',
        choice2: '4',
        choice3: '8',
        choice4: '3',
        answer: '3'
    },
    {
        question: "What is 2 + 4?",
        choice1: '2',
        choice2: '4',
        choice3: '6',
        choice4: '44',
        answer: '6'
    }
];

const questionEl = document.querySelector('.question');
const choicesEl = document.querySelectorAll('.choice-text');

let currentQuestion = {};
let score = 0;
let questionCounter = 0;
const SCORE_POINTS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    nextQuestion();
};

nextQuestion = () => {
    if (questionCounter === questions.length) {
        return alert(`Quiz complete. Your score is ${score}`);
    }    
    
    currentQuestion = questions[questionCounter];
    questionCounter++
    questionEl.textContent = currentQuestion.question;

    choicesEl.forEach(choice => {
        const number = choice.dataset['question'];
        choice.textContent = currentQuestion['choice' + number];

        choice.addEventListener('click', e => {
            if (e.target.textContent === currentQuestion.answer) {
                score += SCORE_POINTS;
                alert('Correct');
            } else {
                alert('Incorrect');
            }
            nextQuestion();
        });
    });
};

startGame();
