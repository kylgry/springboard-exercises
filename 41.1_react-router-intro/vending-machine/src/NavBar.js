import React from "react"
import { NavLink } from "react-router-dom"
import './NavBar.css'

function NavBar() {
  return (
    <nav className="NavBar">
      <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink exact to="/lemone">
        Lemone
      </NavLink>
      <NavLink exact to="/passionfruit">
        Passion Fruit
      </NavLink>
      <NavLink exact to="/watermelon">
        Watermelon
      </NavLink>
      <NavLink exact to="/hibiscus">
        Hibiscus
      </NavLink>

    </nav>
  )
}

export default NavBar
