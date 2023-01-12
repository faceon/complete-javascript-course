'use strict';

// variables
const players = [
  {
    score: 0,
    scoreUI: document.getElementById('score--0'),
    current: 0,
    currentUI: document.getElementById('current--0'),
    sectionUI: document.querySelector('section.player--0'),
  },
  {
    score: 0,
    scoreUI: document.getElementById('score--1'),
    current: 0,
    currentUI: document.getElementById('current--1'),
    sectionUI: document.querySelector('section.player--1'),
  },
];
let currentPlayerNum = 0;

// UI elements
const dice = document.querySelector('.dice');

const newBtn = document.querySelector('.btn--new');
newBtn.addEventListener('click', initialize);

const rollBtn = document.querySelector('.btn--roll');
rollBtn.addEventListener('click', rollDice);

const holdBtn = document.querySelector('.btn--hold');
holdBtn.addEventListener('click', holdScore);

// functions
function rollDice() {
  const currentPlayer = players[currentPlayerNum];
  const diceNum = Math.ceil(Math.random() * 6);
  dice.src = `dice-${diceNum}.png`;
  if (diceNum === 1) {
    currentPlayer.current = 0;
    holdScore();
  } else {
    currentPlayer.current += diceNum;
    refreshScores();
  }
}

function holdScore() {
  let currentPlayer = players[currentPlayerNum];
  // add player's current to score
  currentPlayer.score += currentPlayer.current;
  currentPlayer.current = 0;
  // switch player
  currentPlayer.sectionUI.classList.remove('player--active');
  currentPlayerNum = currentPlayerNum ? 0 : 1;
  currentPlayer = players[currentPlayerNum];
  currentPlayer.sectionUI.classList.add('player--active');
  // refresh
  refreshScores();
}

function refreshScores() {
  players.forEach(player => {
    player.scoreUI.textContent = player.score;
    player.currentUI.textContent = player.current;
  });
}

function initialize() {
  players.forEach(player => {
    player.current = 0;
    player.score = 0;
  });
  refreshScores();
}

initialize();
