import React from "react"
import { Link } from "react-router-dom"
import './Home.css'

function Home() {
  return (
    <div className="Home">
      <p>Take a LaCroix! There are many unique flavors.</p>
      <Link to="/limoncello">
        <img src="https://www.lacroixwater.com/wp-content/uploads/2020/01/LIMONCELLO.png" />
      </Link>
      <Link to="/passionfruit">
        <img src="https://www.lacroixwater.com/wp-content/uploads/2019/01/PASSIONFRUIT.png" />
      </Link>
      <Link to="/watermelon">
        <img src="https://www.lacroixwater.com/wp-content/uploads/2020/01/PASTEQUE.png" />
      </Link>
      <Link to="/hibiscus">
        <img src="https://www.lacroixwater.com/wp-content/uploads/2021/03/IMG-Hi-Biscus-821.png" />
      </Link>
    </div>
  )
}

export default Home
