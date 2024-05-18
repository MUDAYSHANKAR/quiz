let questions = [
    {
      question: "What is the capital of France?",
      answers: ["London", "Paris", "Berlin", "Rome"],
      correctAnswer: 1
    },
    {
      question: "What is the tallest mountain in the world?",
      answers: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
      correctAnswer: 0
    }
    // Add more questions here
  ];
  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 10; // Adjust timer duration as needed
  
  function displayQuestion() {
    const questionElement = document.getElementById("quiz-body");
    questionElement.innerHTML = `<h3>${questions[currentQuestion].question}</h3>`;
    
    const answerOptions = questions[currentQuestion].answers.map((answer, index) => {
      return `<li><input type="radio" name="answer" id="answer${index}" value="${index}"> ${answer}</li>`;
    });
    
    questionElement.innerHTML += `<ul>${answerOptions.join("")}</ul>`;
    
    document.getElementById("submit-btn").disabled = false;
  }
  
  function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (!selectedAnswer) return;
    
    const answerIndex = parseInt(selectedAnswer.value);
    const feedbackElement = document.getElementById("feedback");
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      feedbackElement.textContent = "Correct!";
      score++;
    } else {
      feedbackElement.textContent = `Incorrect. The correct answer is "${questions[currentQuestion].answers[questions[currentQuestion].correctAnswer]}".`;
    }
    
    document.getElementById("submit-btn").disabled = true;
  }
  
  function startTimer() {
    const timerElement = document.getElementById("timer");
    const timerInterval = setInterval(() => {
      timerElement.textContent = `Time remaining: ${timeLeft} seconds`;
      timeLeft--;
      if (timeLeft < 0) {
        clearInterval(timerInterval);
        checkAnswer(); // Submit answer automatically if time runs out
      }
    }, 1000);
  }
  
  function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      displayQuestion();
      timeLeft = 10; // Reset timer for next question
      startTimer();
    } else {
      showResults();
    }
  }
  
  function showResults() {
  