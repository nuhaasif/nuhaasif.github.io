document.addEventListener("DOMContentLoaded", function () {

let score = 0;
let lives = 3;
let gameRunning = false;
let gameInterval;

const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const startBtn = document.getElementById("startBtn");
const container = document.getElementById("gameContainer");

const emojis = ["😊", "😍", "😎", "👻", "💀"];

startBtn.addEventListener("click", startGame);

function startGame() {
  score = 0;
  lives = 3;
  gameRunning = true;

  scoreDisplay.innerText = score;
  livesDisplay.innerText = "❤️❤️❤️";
  container.innerHTML = "";

  clearInterval(gameInterval);
  gameInterval = setInterval(createBubble, 800);
}

function createBubble() {
  if (!gameRunning) return;

  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  bubble.innerText = randomEmoji;

  bubble.style.left = Math.random() * (window.innerWidth - 60) + "px";
  bubble.style.top = window.innerHeight + "px";

  container.appendChild(bubble);

  let rise = setInterval(() => {
    bubble.style.top = bubble.offsetTop - 2 + "px";

    if (bubble.offsetTop < -60) {
      bubble.remove();
      clearInterval(rise);
    }
  }, 20);

  bubble.addEventListener("click", function () {
    if (!gameRunning) return;

    if (randomEmoji === "💀") {
      lives--;
    } else {
      score++;
    }

    scoreDisplay.innerText = score;

    if (lives > 0) {
      livesDisplay.innerText = "❤️".repeat(lives);
    } else {
      livesDisplay.innerText = "💔";
      gameRunning = false;
      clearInterval(gameInterval);
      alert("Game Over! Final Score: " + score);
    }

    bubble.remove();
    clearInterval(rise);
  });
}

});