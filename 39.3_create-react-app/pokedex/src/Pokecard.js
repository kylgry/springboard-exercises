import './Pokecard.css'

function Pokecard(props) {
  return (
    <div className="Pokecard">
      <p>{props.pokemon.name}</p>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.pokemon.id}.png`} />
      <p>Type: {props.pokemon.type}</p>
      <p>EXP: {props.pokemon.base_experience}</p>

    </div>
  )
}

export default Pokecard
