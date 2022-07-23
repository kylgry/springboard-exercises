import React from "react"
import { Link } from "react-router-dom"
import './LaCroix.css'


function LaCroix({flavor}) {
  return (
    <div className="LaCroix">
     <p>{ flavor }</p>
     <p>This just takes like water</p>
     <p>
     <Link to="/">
       Try another flavor
     </Link>
     </p>
    </div>
  )
}

export default LaCroix
