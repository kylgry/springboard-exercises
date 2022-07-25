import React, { useState } from "react"
import { useParams, Link } from "react-router-dom"
import './Colors.css'

function Colors({colors}) {


  return (
    <div className="Colors">
      <Link className="NewColorLink" to="/colors/new">add a color</Link>
      {colors.map( c => <Link style={{color: c.color}} to={`/color/${c.color}`} key={c.id}>{c.color}</Link> )}
    </div>
  )
}

export default Colors
