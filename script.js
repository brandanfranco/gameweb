" use strict";
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const currentScore0 = document.getElementById("current--0");
const currentScore1 = document.getElementById("current--1");
const imagen = document.querySelector(".dice");
const btn_New = document.querySelector(".btn--new");
const btn_Roll = document.querySelector(".btn--roll");
const btn_Hold = document.querySelector(".btn--hold");

let totalScores, currentNumber, currentPlayer, playing;
const init = function () {
  playing = true;
  score0.textContent = 0;
  score1.textContent = 0;

  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");

  totalScores = [0, 0];
  currentNumber = 0;
  currentPlayer = 0;

  imagen.classList.add("hidden");
};

init();

const changePlayer = function () {
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentNumber = 0;

  currentPlayer = currentPlayer === 0 ? 1 : 0;

  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

btn_Roll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);

    imagen.classList.remove("hidden");
    imagen.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentNumber += dice;
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentNumber;
      //currentScore0.textContent = currentNumber;
    } else {
      changePlayer();
    }
  }
});

btn_Hold.addEventListener("click", function () {
  if (playing) {
    totalScores[currentPlayer] += currentNumber;
    document.getElementById(`score--${currentPlayer}`).textContent =
      totalScores[currentPlayer];

    if (totalScores[currentPlayer] >= 100) {
      playing = false;
      imagen.classList.add("hidden");

      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove("player--active");
    } else {
      changePlayer();
    }
  }
});

btn_New.addEventListener("click", init);
