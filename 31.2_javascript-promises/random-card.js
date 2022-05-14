let deckID;
let button = document.querySelector('#main button')

function drawCard () {
  axios.get(`http://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
  .then(resp => {
    document.getElementById('card-img').src = resp.data.cards[0].image;
    console.log(resp.data.remaining)
    if (resp.data.remaining == 0) { button.remove() }
    })
  }

axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
.then(resp => deckID = resp.data.deck_id)
.then(button.addEventListener("click", drawCard))
