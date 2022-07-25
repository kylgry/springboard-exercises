import React, { useState } from "react"
import { Navigate } from "react-router-dom"
import './NewColor.css'

function NewColor({addColor}) {

  const INITIAL_STATE = { color: "" }
  const [inputColor, setInputColor] = useState(INITIAL_STATE)
  const [redirect, setRedirect] = useState(false)

  const handleSubmit = evt => {
    evt.preventDefault()
    addColor(inputColor)
    setInputColor(INITIAL_STATE)
    setRedirect(true)
  }

  const handleChange = evt => {
    const { value } = evt.target
    setInputColor({ color: value })
  }

  return (
    <div className="NewColor">
      { redirect ? <Navigate replace to="/colors" /> : null }
      <form onSubmit={handleSubmit} className='newColorForm'>
        <input id="color" name="color" value={inputColor.color} onChange={handleChange} />
        <button>add color</button>
      </form>
    </div>
  )
}

export default NewColor
