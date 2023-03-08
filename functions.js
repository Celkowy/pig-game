import One from './UI/Dice/One.js'
import Two from './UI/Dice/Two.js'
import Three from './UI/Dice/Three.js'
import Four from './UI/Dice/Four.js'
import Five from './UI/Dice/Five.js'
import Six from './UI/Dice/Six.js'

export function manageStyle(option, className, toAdd, toRemove) {
  //OPTIONS - add/remove/both
  if (option === 'add') {
    toAdd.classList.add(`${className}`)
  } else if (option === 'remove') {
    toRemove.classList.remove(`${className}`)
  } else if (option === 'both') {
    toAdd.classList.add(`${className}`)
    toRemove.classList.remove(`${className}`)
  }
}

export function addScaleAnimation(elementToAnimate) {
  manageStyle('add', 'scale', elementToAnimate, undefined)
  setTimeout(() => {
    manageStyle('remove', 'scale', undefined, elementToAnimate)
  }, 100)
}

export function updateDiceUi(dice, random) {
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

export function updateValue(contentOrHtml, domElement, value) {
  if (contentOrHtml === 'textContent') {
    domElement.textContent = value
  } else if (contentOrHtml === 'innerHTML') {
    domElement.innerHTML = value
  }
}

export function randomizeNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}
