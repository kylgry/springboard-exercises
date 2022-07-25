import React from "react"
import { Link } from "react-router-dom"
import './DogList.css'

function DogList({ dogs }) {
  return (
    <div className="DogList">
    { dogs.map(dog => <Link to={`/dog/${dog.src}`} key={dog.name}><img src={`${dog.src}.jpg`} alt="" key={dog.name}/></Link>) }
    </div>
  )
}

export default DogList
