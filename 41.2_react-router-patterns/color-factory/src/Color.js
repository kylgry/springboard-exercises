import React from "react"
import { useParams } from "react-router-dom"
import './Color.css'

function Color() {

  const { name } = useParams()

  return (
    <div className="Color" style={{backgroundColor: name}}>
      { name }
    </div>
  )
}

export default Color
