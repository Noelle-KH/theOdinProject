const player = document.querySelector('.player')
const computer = document.querySelector('.computer')
const playerScore = document.querySelector('.player-score')
const computerScore = document.querySelector('.computer-score')
const GAME_STATE = {
  round: 0,
  playerScore: 0,
  computerScore: 0
}

function game(event) {
  if (event.target.tagName !== 'IMG') return
  const playerChoice = event.target.alt
  const computerChoice = getComputerChoice()
  checkSelection(playerChoice, computerChoice)
  playRound(playerChoice, computerChoice)
  playerScore.textContent = `Score: ${GAME_STATE.playerScore}`
  computerScore.textContent = `Score: ${GAME_STATE.computerScore}`

  if (GAME_STATE.round === 5) {
    checkWinner(GAME_STATE.playerScore, GAME_STATE.computerScore)
  }
}


function getComputerChoice() {
  const randomChoice = Math.floor(Math.random() * 3)
  switch (randomChoice) {
    case 0:
      return 'rock'
    case 1:
      return 'paper'
    case 2:
      return 'scissors'
  }
}

function checkSelection(playerSelection, computerSelection) {
  const player = document.querySelector(`.player-area .${playerSelection} img`)
  const computer = document.querySelector(`.computer-area .${computerSelection} img`)

  player.classList.add('player-selection')
  computer.classList.add('computer-selection')

  setTimeout(removeEffect, 500, player, computer)
}

function removeEffect(player, computer) {
  player.classList.remove('player-selection')
  computer.classList.remove('computer-selection')
}

function playRound(playerSelection, computerSelection) {
  GAME_STATE.round++

  if (playerSelection === computerSelection) return

  if (playerSelection === 'rock') {
    if (computerSelection === 'paper') {
      GAME_STATE.computerScore++
    } else {
      GAME_STATE.playerScore++
    }
  } else if (playerSelection === 'paper') {
    if (computerSelection === 'scissors') {
      GAME_STATE.computerScore++
    } else {
      GAME_STATE.playerScore++
    }
  } else {
    if (computerSelection === 'rock') {
      GAME_STATE.computerScore++
    } else {
      GAME_STATE.playerScore++
    }
  }
}

function checkWinner(player, computer) {
  const winMessage = (player > computer) ? 'Player Win' : (player < computer) ? 'Computer Win' : 'Tie'
  const div = document.createElement('div')
  div.className = 'complete'
  div.innerHTML = `
    <p class="show-winner">${winMessage}</p>
    <button class="reset">Play Again</button>
  `
  document.body.appendChild(div)

  const resetButton = document.querySelector('.reset')
  resetButton.addEventListener('click', resetGame)
}

function resetGame() {
  window.location.reload()
}

player.addEventListener('click', game)