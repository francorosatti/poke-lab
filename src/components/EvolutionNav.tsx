import { Link } from 'react-router-dom'
import { formatNumber, getPokemon, type Pokemon } from '../data/pokemon'
import { TYPE_INFO } from '../data/types'
import { PokemonImage } from './PokemonImage'

function EvoLink({ pokemon }: { pokemon: Pokemon }) {
  const main = TYPE_INFO[pokemon.types[0]]
  return (
    <Link
      to={`/pokemon/${pokemon.id}`}
      className="evo"
      style={{ background: main.color, borderColor: main.colorDark }}
    >
      <PokemonImage id={pokemon.id} name={pokemon.name} className="evo__img" />
      <span className="evo__number">N.º {formatNumber(pokemon.id)}</span>
      <span className="evo__name">{pokemon.name}</span>
    </Link>
  )
}

export function EvolutionNav({ pokemon }: { pokemon: Pokemon }) {
  const previous = pokemon.evolvesFrom ? getPokemon(pokemon.evolvesFrom) : undefined
  const next = (pokemon.evolvesTo ?? []).map(getPokemon).filter((p): p is Pokemon => Boolean(p))

  if (!previous && next.length === 0) return null

  return (
    <section className="panel">
      <h2 className="panel__title">Evoluciones</h2>
      <div className="evo-row">
        {previous && (
          <div className="evo-group">
            <span className="evo-group__label">Antes era</span>
            <EvoLink pokemon={previous} />
          </div>
        )}
        {next.length > 0 && (
          <div className="evo-group">
            <span className="evo-group__label">
              {next.length > 1 ? 'Puede evolucionar a' : 'Evoluciona a'}
            </span>
            <div className="evo-group__items">
              {next.map((p) => (
                <EvoLink key={p.id} pokemon={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
