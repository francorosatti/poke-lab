import { Link } from 'react-router-dom'
import { formatNumber, type Pokemon } from '../data/pokemon'
import { TYPE_INFO } from '../data/types'
import { PokemonImage } from './PokemonImage'

export function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const main = TYPE_INFO[pokemon.types[0]]
  const second = TYPE_INFO[pokemon.types[1] ?? pokemon.types[0]]

  return (
    <Link
      to={`/pokemon/${pokemon.id}`}
      className="card"
      style={{ background: `linear-gradient(160deg, ${main.color}, ${second.colorDark})` }}
    >
      <PokemonImage id={pokemon.id} name={pokemon.name} className="card__img" />
      <span className="card__number">N.º {formatNumber(pokemon.id)}</span>
      <span className="card__name">{pokemon.name}</span>
    </Link>
  )
}
