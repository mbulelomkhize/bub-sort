let numbers = [];
let currentIndex = 0;
let swappedInPass = false;
let timer = 0;
let interval;

const bars = document.getElementById("bars");
const timerText = document.getElementById("timer");
const bestText = document.getElementById("best");
const message = document.getElementById("message");

let bestScore = localStorage.getItem("bestBubbleScore") || 0;
bestText.textContent = bestScore;

function randomNumbers() {
  numbers = [];

  for (let i = 0; i < 10; i++) {
    numbers.push(Math.floor(Math.random() * 90) + 10);
  }
}

function renderBars() {
  bars.innerHTML = "";

  numbers.forEach((num, index) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");

    if (index === currentIndex || index === currentIndex + 1) {
      bar.classList.add("highlight");
    }

    bar.style.height = `${num * 3}px`;
    bar.textContent = num;

    bars.appendChild(bar);
  });
}

function startGame() {
  clearInterval(interval);

  timer = 0;
  timerText.textContent = timer;

  currentIndex = 0;
  swappedInPass = false;

  randomNumbers();
  renderBars();

  interval = setInterval(() => {
    timer++;
    timerText.textContent = timer;
  }, 1000);

  message.textContent = "Game Started!";
}

function checkAnswer(choice) {
  if (numbers.length === 0) return;

  let a = numbers[currentIndex];
  let b = numbers[currentIndex + 1];
  let shouldSwap = a > b;

  if (choice === shouldSwap) {
    if (shouldSwap) {
      [numbers[currentIndex], numbers[currentIndex + 1]] =
      [numbers[currentIndex + 1], numbers[currentIndex]];

      swappedInPass = true;
    }

    message.textContent = "Correct move";
  } else {
    timer += 2;
    timerText.textContent = timer;
    message.textContent = "Wrong move (+2s penalty)";
  }

  currentIndex++;

  if (currentIndex >= numbers.length - 1) {
    if (!swappedInPass) {
      clearInterval(interval);

      message.textContent = `Finished in ${timer}s!`;

      if (bestScore == 0 || timer < bestScore) {
        bestScore = timer;
        localStorage.setItem("bestBubbleScore", bestScore);
        bestText.textContent = bestScore;
        message.textContent += " New Best Score!";
      }

      renderBars();
      return;
    }

    currentIndex = 0;
    swappedInPass = false;
    message.textContent = "Next pass started";
  }

  renderBars();
}

startGame();