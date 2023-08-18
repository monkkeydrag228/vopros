const questions = [
    {
        question :"Кто Петух?",
        answers : [
            {text:"Шохрух клоун", correct: false},
            {text:"Нодирка", correct: true},
            {text:"Бобер", correct: false},
            {text:"Сталин", correct: false},
        ]
    },
    {
        question :"Душнила клоун?",
        answers: [
            {text:"Да", correct: true},
            {text:"Да", correct: false},
            {text:"Да", correct: false},
            {text:"Да", correct: false},
            
        ]
    },
    {
        question :"Выбери (Да)",
        answers: [
            {text:"Да", correct: true},
            {text:"Нет", correct: false},
            {text:"Нет", correct: false},
            {text:"Нет", correct: false},
        ]
    },
    {
        question :"Кто сделал правильное решение и бросил нас",
        answers: [
            {text:"Брат Жавик", correct: true},
            {text:"Илон Маск", correct: false},
            {text:"Бобер", correct: false},
            {text:"Сталин", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo +". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
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
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}



function showScore(){
    resetState();
    questionElement.innerHTML = `You score ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Играть снова";
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

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})


startQuiz()