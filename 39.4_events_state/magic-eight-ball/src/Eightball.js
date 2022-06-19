import './Eightball.css'
import React, { useState } from "react"

function Eightball(props) {

  const [msg, setMsg] = useState("Think of a question")
  const [color, setColor] = useState("black")

  function randomAnswer() {
    return props.answers[Math.floor(Math.random()*props.answers.length)]
  }

  return (
    <div className="Eightball" style={{backgroundColor:color}}
      onClick={() => {
        const rnd = randomAnswer()
        setMsg(rnd.msg)
        setColor(rnd.color)
      }}
    >
      <span>{msg}</span>
    </div>
  )
}

export default Eightball
