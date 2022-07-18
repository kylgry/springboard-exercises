import React, { useState, useEffect } from "react"
import './Deck.css'
import axios from "axios"

function Deck() {

  const [deck, setDeck] = useState(null)
  const [card, setCard] = useState(null)

  function drawACard(evt) {

    async function fetchNewCard() {
      const cardResult = await axios.get(
        `http://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
      setCard(cardResult.data)
    }

    if (card && card.remaining === 0) {
      alert("there are no more cards to draw!")
    }
    else {
      fetchNewCard()
    }



  };

  useEffect(() => {
    async function fetchDeck() {
      const deckResult = await axios.get(
        "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      setDeck(deckResult.data)
    }
    fetchDeck();
  }, []);


  return (
    <div className="Deck">
    { deck ? <button onClick={drawACard}>draw a card</button> : <i>loading</i> }
    <p>{ card ? <img src={card.cards[0].images.png} /> : null }</p>
    <p>{ card ? card.remaining : null }</p>
    </div>
  )

}


export default Deck
