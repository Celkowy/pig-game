export default function renderBoard() {
  return `
  <div class="board">
  <div class="player-one-wrapper">
    <div class="player-one-section">
      <h1 class="h1-player-one bold">PLAYER 1</h1>
      <div class="player-one-score">0</div>
    </div>
    <div class="current-wrap">
      <p>CURRENT</p>
      <div class="player-one-current">0</div>
    </div>
  </div>
  <div class="player-two-wrapper opacity">
    <div class="player-two-section">
      <h1 class="h1-player-two">PLAYER 2</h1>
      <div class="player-two-score">0</div>
    </div>
    <div class="current-wrap">
      <p>CURRENT</p>
      <div class="player-two-current">0</div>
    </div>
  </div>

  <button class="btn new-game">🔄 NEW GAME</button>
  <div class="dice-wrap"></div>
  <button class="btn roll-dice">🎲 ROLL DICE</button>
  <button class="btn hold">📥 HOLD</button>
</div>
  `
}
