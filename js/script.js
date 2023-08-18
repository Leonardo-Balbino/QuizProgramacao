
//Declaração de variaveis

const question = document.querySelector('#question')
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ['a', 'b', 'c', 'd'];
let points = 0;
let actualQuestion = 0;



// Perguntas
const questions = [
    {
      "question": "PHP foi desenvolvido para qual fim?",
      "answers": [
        {
          "answer": "back-end",
          "correct": true
        },
        {
          "answer": "front-end",
          "correct": false
        },
        {
          "answer": "Sistema operacional",
          "correct": false
        },
        {
          "answer": "Banco de dados",
          "correct": false
        },
      ]
    },
    {
      "question": "Uma forma de declarar variável em JavaScript:",
      "answers": [
        {
          "answer": "$var",
          "correct": false
        },
        {
          "answer": "var",
          "correct": true
        },
        {
          "answer": "@var",
          "correct": false
        },
        {
          "answer": "#let",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual o seletor de id no CSS?",
      "answers": [
        {
          "answer": "#",
          "correct": true
        },
        {
          "answer": ".",
          "correct": false
        },
        {
          "answer": "@",
          "correct": false
        },
        {
          "answer": "/",
          "correct": false
        },
      ]
    },
]
// Substituição do layout pela primeira questão
function init() {
  createQuestion(0)
}

// Create a question 
function createQuestion(i) {

  // Limpa questão anterior
  const oldButtons = answersBox.querySelectorAll("button");

  oldButtons.forEach(function(btn) {
    btn.remove();
  });

  // Altera texto da pergunta
  const questionText = question.querySelector("#question-text");
  const questionNumber = question.querySelector("#question-number");

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  // Insere alternativas
  questions[i].answers.forEach(function(answer, i) {
    
    // Altera texto do template
    const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

    const letterBtn = answerTemplate.querySelector(".btn-letter");
    const answerText = answerTemplate.querySelector(".question-answer");

    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answer'];

    answerTemplate.setAttribute("correct-answer", answer["correct"]);

    // remove classe de hide e template do template
    answerTemplate.classList.remove("hide");
    answerTemplate.classList.remove("answer-template");

    // Insere template na tela
    answersBox.appendChild(answerTemplate);

  });

  // Cria evento em todos os botões
  const buttons = answersBox.querySelectorAll("button");

  buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      checkAnswer(this, buttons);
    });
  });

  // Incrementa o número atual de questões
  actualQuestion++;

}

// checar se acertou 

function checkAnswer(btn) {

    const buttons = answersBox.querySelectorAll("button")
    buttons.forEach((button)=>{
      if(button.getAttribute("correct-answer") === "true") {
        button.classList.add("correct-answer")

        // checagem
        if(btn == button) {
          //incremento dos pontos
          points++
          
        }
      } else {
        button.classList.add("wrong-answer")
      }
    })

    //console.log(points)
    
    nextQuestion()
}

//console.log(question.length)
// exibir proxima pergunta


function nextQuestion() {
  // timer
  setTimeout(function(){
    console.log(questions.length)

    //verifica se acabou o jogo
    if(actualQuestion >= questions.length){
      // mensagem de pontuação final
      
      successMessage();
      return;
    }

    createQuestion(actualQuestion)

  },1500)
}

// telafinal

function successMessage() {
  
  hiderQuizz()

  //calculo score
  const score = ((points / questions.length) * 100).toFixed(2)
  console.log(score)
  const displayScore = document.querySelector("#display-score span")
  console.log(displayScore)
  displayScore.textContent = score.toString()

  const correctAnswers = document.querySelector("#correct-answers")
  correctAnswers.textContent = points

  // Alterar o total
  const totalQuestion = document.querySelector('#questions-qty')
  totalQuestion.textContent = questions.length.toString()
}



//mostra e esconde o score
function hiderQuizz() {
  quizzContainer.classList.toggle("hide")
  scoreContainer.classList.toggle("hide")

}

//reiniciarQuizz

const restarrBtn = document.querySelector("#restart")

restarrBtn.addEventListener("click", ()=>{

  actualQuestion = 0;
  points = 0;
  hiderQuizz()
  init()

})
//inicia o Quizz
init()

//console.log(points)