const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-button')
let shuffledQuestions, currentQuestionIndex
startButton

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Square root of 81?',
    answers: [
      { text: '9', correct: true },
      { text: '8', correct: false }
    ]
  },
  {
    question: 'The presence of ozone in the stratosphere is responsible for?',
    answers: [
      { text: 'increasing the average global temperature in recent years', correct: false },
      { text: 'a higher rate of photosynthesis', correct: false },
      { text: 'checking the penetration of ultraviolet rays to the earth', correct: true },
      { text: 'idc bruh', correct: false }
    ]
  },
  {
    question: 'The disease that is caused by the virus is?',
    answers: [
      { text: 'COVID-19', correct: false },
      { text: 'Common Cold  ', correct: false },
      { text: 'Both?', correct: true },
      { text: 'IDK', correct: false }
    ]
  },
  {
    question: 'The substance which makes the blue litmus paper red is :',
    answers: [
      { text: 'Acid', correct: true },
      { text: 'Base', correct: false },
      { text: 'Alkali', correct: false },
      { text: 'Salt', correct: false }
    ]
  }
]