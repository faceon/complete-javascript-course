'use strict';

/* 
0. If score is > 0
1. generate a random number
2. input and check guess
3. if the number > the random
  say too high
  score --
4. elif the number < the random 
  say too low
  score --
5. else(the num == the random number)
  say You got the number
  if score is the highest, change the highscore
  reinitialize the game status

*/

// UI elements
const againBtn = document.querySelector('.btn.again');
againBtn.addEventListener('click', initialize);

const guessInput = document.querySelector('input.guess');
const checkBtn = document.querySelector('button.btn.check');
checkBtn.addEventListener('click', checkGuess);

const number = document.querySelector('div.number');
const message = document.querySelector('p.message');
const currentScoreSpan = document.querySelector('span.score');
const highScoreSpan = document.querySelector('span.highscore');

// Game constants
const defaultScore = 20;

// Game variables
let highScore = 0;
let currentScore;
let targetNum;

function randomNum(min = 1, max = 20) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initialize() {
  // reset currentScore, targetNum
  currentScore = defaultScore;
  setCurrentScore(currentScore);
  targetNum = randomNum();
  setMessage('Start guessing...');
  guessInput.value = '';
  document.body.style.backgroundColor = null;
  number.textContent = '?';
}

function checkGuess() {
  const guessNum = guessInput.value;
  if (!guessNum) return;
  // check if guessInput == targetNum
  if (guessNum > targetNum) {
    setMessage('Too high');
    setCurrentScore(currentScore - 1);
  } else if (guessNum < targetNum) {
    setMessage('Too low');
    setCurrentScore(currentScore - 1);
  } else {
    setMessage('You got the number!');
    setHighscore(currentScore);
    document.body.style.backgroundColor = 'green';
    number.textContent = targetNum;
  }
  // when lose the game
  if (currentScore === 0) {
    setMessage('You lose the game 😭');
  }
}

function setMessage(messageText) {
  message.innerHTML = messageText;
}

function setCurrentScore(score) {
  currentScore = score;
  currentScoreSpan.innerHTML = currentScore;
}

function setHighscore(score) {
  // check if currentScore is the highest
  // if so, highscore = currentScore
  if (score > highScore) {
    highScore = score;
  }
  highScoreSpan.innerHTML = highScore;
}

initialize();
