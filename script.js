import renderBoard from './UI/Board/Board.js'
import One from './UI/Dice/One.js'
import Two from './UI/Dice/Two.js'
import Three from './UI/Dice/Three.js'
import Four from './UI/Dice/Four.js'
import Five from './UI/Dice/Five.js'
import Six from './UI/Dice/Six.js'

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
  if (playerSwitch) {
    manageStyle('both', 'opacity', playerOneWrapper, playerTwoWrapper)
    manageStyle('both', 'bold', h1PlayerTwo, h1PlayerOne)
  } else {
    manageStyle('both', 'opacity', playerTwoWrapper, playerOneWrapper)
    manageStyle('both', 'bold', h1PlayerOne, h1PlayerTwo)
  }
  if (playerSwitch) {
    updateValue('textContent', playerOneScore, +playerOneCurrent.textContent + +playerOneScore.textContent)
  } else {
    updateValue('textContent', playerTwoScore, +playerTwoCurrent.textContent + +playerTwoScore.textContent)
  }
  ;[playerOneCurrent, playerTwoCurrent].forEach(current => updateValue('textContent', current, 0))
  playerSwitch = !playerSwitch

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
    if (playerSwitch) {
      manageStyle('both', 'opacity', playerOneWrapper, playerTwoWrapper)
      manageStyle('both', 'bold', h1PlayerTwo, h1PlayerOne)
    } else {
      manageStyle('both', 'opacity', playerTwoWrapper, playerOneWrapper)
      manageStyle('both', 'bold', h1PlayerOne, h1PlayerTwo)
    }

    ;[playerOneCurrent, playerTwoCurrent].forEach(current => updateValue('textContent', current, 0))
    playerSwitch = !playerSwitch
  }
  if (playerSwitch) {
    if (random !== 1) updateValue('textContent', playerOneCurrent, +playerOneCurrent.textContent + random)
    updateDiceUi(dice, random)
  } else if (!playerSwitch) {
    if (random !== 1) updateValue('textContent', playerTwoCurrent, +playerTwoCurrent.textContent + random)
    updateDiceUi(dice, random)
  }
})

function randomizeNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function updateValue(contentOrHtml, domElement, value) {
  if (contentOrHtml === 'textContent') {
    domElement.textContent = value
  } else if (contentOrHtml === 'innerHTML') {
    domElement.innerHTML = value
  }
}

function updateDiceUi(dice, random) {
  if (random === 1) {
    dice.innerHTML = One()
  } else if (random === 2) {
    dice.innerHTML = Two()
  } else if (random === 3) {
    dice.innerHTML = Three()
  } else if (random === 4) {
    dice.innerHTML = Four()
  } else if (random === 5) {
    dice.innerHTML = Five()
  } else if (random === 6) {
    dice.innerHTML = Six()
  }
}

function manageStyle(option, property, toAdd, toRemove) {
  //add remove both
  if (option === 'add') {
    toAdd.classList.add(`${property}`)
  } else if (option === 'remove') {
    toRemove.classList.remove(`${property}`)
  } else if (option === 'both') {
    toAdd.classList.add(`${property}`)
    toRemove.classList.remove(`${property}`)
  }
}
