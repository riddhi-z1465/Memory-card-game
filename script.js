const emojis = ['🍎', '🚗', '🐶', '🎮', '🌟', '⚽', '🍩', '🎲'];
let cards = [...emojis, ...emojis]; // Duplicate for pairs
cards.sort(() => 0.5 - Math.random()); // Shuffle

const gameBoard = document.getElementById('gameBoard');

let flippedCards = [];
let lockBoard = false;

// Create cards
cards.forEach((emoji, index) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.emoji = emoji;
  card.dataset.index = index;
  card.textContent = '';
  gameBoard.appendChild(card);

  card.addEventListener('click', () => {
    if (lockBoard || card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    card.textContent = emoji;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  });
});

function checkMatch() {
  const [card1, card2] = flippedCards;
  const isMatch = card1.dataset.emoji === card2.dataset.emoji;

  if (!isMatch) {
    lockBoard = true;
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.textContent = '';
      card2.textContent = '';
      lockBoard = false;
      flippedCards = [];
    }, 1000);
  } else {
    flippedCards = [];
    checkWin();
  }
}

function checkWin() {
  const allFlipped = document.querySelectorAll('.card.flipped').length;
  if (allFlipped === cards.length) {
    setTimeout(() => alert('🎉 You Win!'), 300);
  }
}
