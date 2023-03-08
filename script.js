import renderBoard from './UI/Board/Board.js'
import { addScaleAnimation } from './functions.js'
import { manageStyle } from './functions.js'
import { updateDiceUi } from './functions.js'
import { updateValue } from './functions.js'
import { randomizeNumber } from './functions.js'

const board = document.querySelector('body')
//Create the board UI
updateValue('innerHTML', board, renderBoard())

let playerSwitch = true
const playerOneWrapper = document.querySelector('.player-one-wrapper')
const playerTwoWrapper = document.querySelector('.player-two-wrapper')
const playerOneCurrent = document.querySelector('.player-one-current')
const playerTwoCurrent = document.querySelector('.player-two-current')
const playerOneScore = document.querySelector('.player-one-score')
const playerTwoScore = document.querySelector('.player-two-score')
const h1PlayerOne = document.querySelector('.h1-player-one')
const h1PlayerTwo = document.querySelector('.h1-player-two')
const rollDice = document.querySelector('.roll-dice')
const hold = document.querySelector('.hold')
const newGame = document.querySelector('.new-game')

newGame.addEventListener('click', () => {
  //reset all
  updateValue('textContent', playerOneCurrent, 0)
  updateValue('textContent', playerTwoCurrent, 0)
  updateValue('textContent', playerOneScore, 0)
  updateValue('textContent', playerTwoScore, 0)
  manageStyle('both', 'bold', h1PlayerOne, h1PlayerTwo)
  manageStyle('remove', 'win', playerTwoWrapper, playerOneWrapper)
  manageStyle('remove', 'win', playerOneWrapper, playerTwoWrapper)
  manageStyle('both', 'opacity', playerTwoWrapper, playerOneWrapper)
  playerSwitch = true
  const dice = document.querySelector('.dice')
  if (document.body.contains(dice)) dice.remove()
  ;[rollDice, hold].forEach(button => (button.disabled = false))
})

hold.addEventListener('click', () => {
  const scoreOneChange = +playerOneScore.textContent
  const scoreTwoChange = +playerTwoScore.textContent

  manageStyle(
    'both',
    'opacity',
    playerSwitch ? playerOneWrapper : playerTwoWrapper,
    playerSwitch ? playerTwoWrapper : playerOneWrapper
  )

  manageStyle('both', 'bold', playerSwitch ? h1PlayerTwo : h1PlayerOne, playerSwitch ? h1PlayerOne : h1PlayerTwo)

  updateValue(
    'textContent',
    playerSwitch ? playerOneScore : playerTwoScore,
    playerSwitch
      ? +playerOneCurrent.textContent + +playerOneScore.textContent
      : +playerTwoCurrent.textContent + +playerTwoScore.textContent
  )

  //add animation on player score ONLY if score !== 0 && score has changed
  const [scoreChange, scoreEl] = playerSwitch ? [scoreOneChange, playerOneScore] : [scoreTwoChange, playerTwoScore]
  if (scoreChange !== +scoreEl.textContent) {
    addScaleAnimation(scoreEl)
  }

  //clear current values on hold click
  ;[playerOneCurrent, playerTwoCurrent].forEach(current => updateValue('textContent', current, 0))
  playerSwitch = !playerSwitch

  //check if win
  if (+playerOneScore.textContent >= 100) {
    manageStyle('both', 'opacity', playerTwoWrapper, playerOneWrapper)
    manageStyle('add', 'win', playerOneWrapper)
    manageStyle('add', 'bold', h1PlayerOne)
    ;[rollDice, hold].forEach(button => (button.disabled = true))
  } else if (+playerTwoScore.textContent >= 100) {
    manageStyle('both', 'opacity', playerOneWrapper, playerTwoWrapper)
    manageStyle('add', 'win', playerTwoWrapper)
    manageStyle('add', 'bold', h1PlayerTwo)
    ;[rollDice, hold].forEach(button => (button.disabled = true))
  }
})

rollDice.addEventListener('click', () => {
  const dice = document.querySelector('.dice-wrap')
  const random = randomizeNumber(1, 7)

  if (random === 1) {
    updateDiceUi(dice, 1)
    manageStyle(
      'both',
      'opacity',
      playerSwitch ? playerOneWrapper : playerTwoWrapper,
      playerSwitch ? playerTwoWrapper : playerOneWrapper
    )
    manageStyle('both', 'bold', playerSwitch ? h1PlayerTwo : h1PlayerOne, playerSwitch ? h1PlayerOne : h1PlayerTwo)
    ;[playerOneCurrent, playerTwoCurrent].forEach(current => updateValue('textContent', current, 0))
    playerSwitch = !playerSwitch
  }

  addScaleAnimation(playerSwitch ? playerOneCurrent : playerTwoCurrent)
  updateValue(
    'textContent',
    playerSwitch ? playerOneCurrent : playerTwoCurrent,
    playerSwitch ? +playerOneCurrent.textContent + random : +playerTwoCurrent.textContent + random
  )
  updateDiceUi(dice, random)
})
