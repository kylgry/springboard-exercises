// import './Pokedex.css'
import Pokecard from './Pokecard'
import pokemon_default from './Pokemon'

function Pokedex({pokemon = pokemon_default}) {
  return (
    <div>
      <h2>Pokedex</h2>
      {pokemon.map(p => <Pokecard key={p.id} pokemon={p} />)}
    </div>
  )
}

export default Pokedex
