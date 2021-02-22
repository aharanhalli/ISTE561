const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

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
    button.setAttribute("id", answer.message)
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
  const message = selectedButton.dataset.message
  document.getElementById('message').innerHTML = selectedButton.id
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct, button.dataset.message)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct, message) {
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
    question: 'What is a correct syntax to output "Hello World" in C#?',
    answers: [
      { text: 'print("Hello World");', correct: false, message: ' Wrong. The correct answer is Console.WriteLine("Hello World");. C# uses System namespace for their reference. ' },
      { text: 'System.out.println("Hello World");', correct: false, message: 'Wrong. C# uses System namespace for their reference. The correct answer is Console.WriteLine("Hello World");.' },
      { text: 'count << "Hello World"; ', correct: false, message: 'Wrong .This is C++. C# uses System namespace for their reference. The correct answer is Console.WriteLine("Hello World");.' },
      { text: 'Console.WriteLine("Hello World"); ', correct: true, message: 'Correct. This is C#. C# uses System namespace for their reference.' }
    ]
  },
  {
    question: 'Which data type is used to create a variable that should store text?',
    answers: [
      { text: 'txt', correct: false, message: 'Wrong. Txt is not a variable name. C# uses the string variable to store text. The correct answer is String.' },
      { text: 'string', correct: true, message: 'Correct. C# uses the string variable to store text' },
      { text: 'myString', correct: false, message: 'Wrong. This C++. C# uses the string variable to store text. The correct answer is String. ' },
      { text: 'str', correct: false, message: 'Wrong. This is used in Phyton. C# uses the string variable to store text. The correct answer is String. ' }
    ]
  },
  {
    question: 'How do you create a variable with the numeric value of 5?',
    answers: [
      { text: 'int x = 5;', correct: true, message: 'Correct. int is the variable used to store integer in C#.' },
      { text: 'num x = 5', correct: false, message: 'Wrong. num is used in another landuage. int is the variable used to store integer in C#. ' },
      { text: 'double x = 5;', correct: false, message: 'Wrong. Double is used to store a floating number. int is the variable used to store integer in C#.' },
      { text: 'x= 5;', correct: false, message: 'Wrong. This does not let the program know variable to store the number assigned to it.' }
    ]
  },
  {
    question: 'how do you create a variable with a floating number 2.8?',
    answers: [
      { text: 'int x = 2.8;', correct: false, message: 'Wrong. int is the variable used to store integer in C#. The answer is double.' },
      { text: 'int x = 2.8D;', correct: false, message: 'Wrong. int is the variable used to store integer in C#. 2.8D says the number is decimal and int will not accept the value. The answer is double.' },
      { text: 'double x = 2.8D;', correct: true, message: 'Correct. ' },
      { text: 'byte x = 2.8', correct: false, message: 'Wrong. Byte is used to store another variable, but not a floating number.' }
    ]
},
{
      question: 'Which operator can be used to compare two values??',
    answers: [
      { text: '=', correct: false, message: 'Wrong. This symbol is used to assign values to. The answer is ==. ' },
      { text: '++', correct: false, message: 'Wrong. This symbol is used to increase a vlaue by one. The answer is ==. ' },
      { text: '==', correct: true, message: 'Correct. This symbol is used to compare two values' },
      { text: '--', correct: false, message: 'Wrong. This symbol is used to decrease a value by one. The answer is ==.' }

    ]
  },

  {
    question: 'Which operator is used to multiply numbers?',
  answers: [
    { text: '*', correct: true, message: 'Correct. This operator is used to multiply numbers. ' },
    { text: 'x', correct: false, message: 'Wrong. Although this symbol means multiply, it is not the right way in C#. The answer is *. ' },
    { text: '%', correct: false, message: 'Wrong. This the module symbol which is used to get a reminder of interger divsion. The answer is *. ' },
    { text: '#', correct: false, message: 'Wrong. This symbol is used to write comments on the C# program. The answer is *. ' }

  ]
},


{
    question: 'Which statement is used to stop a loop?',
  answers: [
    { text: 'exit', correct: false, message: 'Wrong. This is used in python for loops. The answer is break. ' },
    { text: 'break', correct: true, message: 'Correct. This is used in C# to break a loop. ' },
    { text: 'return', correct: false, message: 'Wrong, this used in Java language for loops. The answer is break. ' },
    { text: 'stop', correct: false, message: 'Wrong, this is not the correct way in C#. The answer is break. ' }

  ]
}
]