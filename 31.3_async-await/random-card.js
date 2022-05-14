let deckID;
let button = document.querySelector('#main button')

async function newDeck() {
  resp = await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
  deckID = resp.data.deck_id
  button.addEventListener("click", drawCard)
}

async function drawCard() {
  resp = await axios.get(`http://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
  document.getElementById('card-img').src = resp.data.cards[0].image;
  console.log(resp.data.remaining);
  if (resp.data.remaining == 0) { button.remove() }
}

newDeck()
