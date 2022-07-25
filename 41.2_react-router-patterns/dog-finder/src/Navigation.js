import React from "react"
import { Link } from "react-router-dom"
import './Navigation.css'

function Navigation({ dognames }) {
  return (
    <div className="Navigation">
      { dognames.map(dogname => <Link to={`/dog/${dogname}`} key={dogname}>{ dogname }</Link>) }
      <Link to="/dogs" key="dogs">all dogs</Link>
    </div>
  )
}


export default Navigation
