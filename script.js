const gameContainer = document.getElementById("game");
const scoreElement = document.getElementById("score");
const recordElement = document.getElementById("record");

let score = 0;
let record = localStorage.getItem("record") || 0;
let circles = [];

recordElement.textContent = `Рекорд: ${record}`;

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createCircle() {
  const circle = document.createElement("div");
  circle.className = "circle";
  circle.style.backgroundColor = getRandomColor();
  circle.style.top = `${
    Math.random() * (gameContainer.clientHeight - 100)
  }px`;
  circle.style.left = `${
    Math.random() * (gameContainer.clientWidth - 100)
  }px`;
  circle.addEventListener("click", () => {
    gameContainer.removeChild(circle);
    score++;
    if (score > record) {
      record = score;
      localStorage.setItem("record", record);
      recordElement.textContent = `Рекорд: ${record}`;
    }
    scoreElement.textContent = `Баллы: ${score}`;
    circles = circles.filter((c) => c !== circle);
  });

  gameContainer.appendChild(circle);
  circles.push(circle);

  if (circles.length >= 10) {
    endGame();
  }
}

function endGame() {
  alert("Игра окончена!");
  resetGame();
}

function resetGame() {
  circles.forEach((circle) => gameContainer.removeChild(circle));
  circles = [];
  score = 0;
  scoreElement.textContent = `Баллы: ${score}`;
  recordElement.textContent = `Рекорд: ${record}`;
}

setInterval(createCircle, 2000);