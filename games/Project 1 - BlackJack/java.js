//input
let sum = 0;
let message = "";
let isAlive = false;
let blackjack = false;
let message1El = document.getElementById("message1-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");

//array
let cards = [];

//process
function startGame() {
  let firstcard = getRandomCard();
  let secondCard = getRandomCard();
  isAlive = true;
  sum = firstcard + secondCard;
  cards = [firstcard, secondCard];
  renderGame();
}

function getRandomCard() {
  let temp = Math.floor(Math.random() * 13) + 1;
  if (temp === 1) {
    return 11;
  } else if (temp > 10) {
    return 10;
  } else {
    return temp;
  }
}

function renderGame() {
  if (sum < 21) {
    message = "Do you want to draw a new card?";
  } else if (sum === 21) {
    message = "WOHOO! You've got Blackjack";
    blackjack = true;
  } else {
    message = "You're out of the game";
    isAlive = false;
  }

  //output
  message1El.textContent = message;
  cardsEl.textContent = "Cards: ";
  for (i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " ";
  }
  sumEl.textContent = "Sum: " + sum;
}

function newCard() {
  if (isAlive === true && blackjack === false) {
    let thirdCard = getRandomCard();
    cards.push(thirdCard);
    sum += thirdCard;
    renderGame();
  }
}
