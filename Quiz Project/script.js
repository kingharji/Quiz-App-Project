const questions = [
    {
        question: "What is the real name of the Scarlet Witch in the MCU?",
        answers: [
            {text: "Natasha Romanoff", correct: false},
            {text: "Wanda Maximoff", correct: true},
            {text: "Carol Danvers", correct: false},
            {text: "Peggy Carter", correct: false},
        ]
    },
    {
        question: "Which metal is Black Panther’s suit primarily made from?",
        answers: [
            {text: "Adamantium", correct: false},
            {text: "Uru", correct: false},
            {text: "Vibranium", correct: true},
            {text: "Titanium", correct: false},
        ]
    },
    {
        question: "What was the name of Thor's hammer before it was destroyed?",
        answers: [
            {text: "Stormbreaker", correct: false},
            {text: "Aegis", correct: false},
            {text: "Nornir", correct: false},
            {text: "Mjolnir", correct: true},
        ]
    },
    {
        question: `Who was the villain in "Captain America: The Winter Soldier"`,
        answers: [
            {text: "Alexander Pierce", correct: true},
            {text: "Red Skull", correct: false},
            {text: "Ultron", correct: false},
            {text: "Winter Soldier", correct: false},
        ]
    },
    {
        question: `What is the name of Tony Stark’s A.I. before Friday?`,
        answers: [
            {text: "Friday", correct: false},
            {text: "JARVIS", correct: true},
            {text: "HOMER", correct: false},
            {text: "Veronica", correct: false},
        ]
    },
    {
        question: "Which Infinity Stone is hidden on Vormir?",
        answers: [
            {text: "Time Stone", correct: false},
            {text: "Soul Stone", correct: true},
            {text: "Reality Stone", correct: false},
            {text: "Mind Stone", correct: false},
        ]
    },
    {
        question: `What is the name of Peter Quill’s ship in the "Guardians of the Galaxy"?`,
        answers: [
            {text: "Milano", correct: true},
            {text: "Benatar", correct: false},
            {text: "Enterprise", correct: false},
            {text: "Andromeda", correct: false},
        ]
    },
    {
        question: `Who becomes the new Captain America at the end of "Avengers: Endgame"?`,
        answers: [
            {text: "Bucky Barnes", correct: false},
            {text: "Sam Wilson", correct: true},
            {text: "Clint Barton", correct: false},
            {text: "James Rhodes", correct: false},
        ]
    },
    {
        question: "What is the name of the organization led by Nick Fury?",
        answers: [
            {text: "SWORD", correct: false},
            {text: "SHIELD", correct: true},
            {text: "HYDRA", correct: false},
            {text: "FIRE", correct: false},
        ]
    },
    {
        question: `In "Doctor Strange," what is the name of the mystical group that protects Earth?`,
        answers: [
            {text: "The Sorcerers", correct: false},
            {text: "The Illuminati", correct: false},
            {text: "The Masters of the Mystic Arts", correct: true},
            {text: "The Inhumans", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1; 
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;


    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});


startQuiz();