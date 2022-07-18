import React, { useState, useEffect, useRef } from "react"
import './Deck.css'
import axios from "axios"

function Deck() {

  const [deck, setDeck] = useState(null)
  const [card, setCard] = useState(0)
  const [autoDraw, setAutoDraw] = useState(false)
  const timerId = useRef()

  async function drawACard() {

    const cardResult = await axios.get(
      `http://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
    if (cardResult.data.remaining === 0) {
      setAutoDraw(false)
    }
    setCard(cardResult.data)
  }

  function toggleDraw() {
    autoDraw ? setAutoDraw(false) : setAutoDraw(true)
  }

  useEffect(() => {
    async function fetchDeck() {
      const deckResult = await axios.get(
        "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      setDeck(deckResult.data)
    }
    fetchDeck()
  }, [])

  useEffect(() => {

    if (autoDraw) {
      timerId.current = setInterval(() => {
        drawACard()
      }, 500)
    }

    return () => {
      clearInterval(timerId.current);
      timerId.current = null;
    }

  }, [autoDraw])

  return (
    <div className="Deck">
    { deck ? <button onClick={toggleDraw}>{ autoDraw ? "stop drawing" : "start drawing" }</button> : <i>loading</i> }
    { card ? <p><img alt="" src={card.cards[0].images.png} /></p> : null }
    { card ? <p>{ card.remaining }</p> : null }
    { card.remaining === 0 ? <p>there are no more cards to draw</p> : null }
    </div>
  )

}


export default Deck
