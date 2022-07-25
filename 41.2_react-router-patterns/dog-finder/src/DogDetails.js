import React from "react"
import { useParams } from "react-router-dom"

function DogDetails({ dogs }) {

  const { name } = useParams()

  const dog = dogs.filter(dog => (dog.src === name))[0]

  return (
    <div className="DogDetails">
    <p>{ dog.name } is {dog.age} years old.</p>
    { dog.facts.map( (fact, i) => (<p key={i}>{fact}</p>)) }
    <img src={`../${dog.src}.jpg`} alt=""/>
    </div>
  )
}

export default DogDetails
