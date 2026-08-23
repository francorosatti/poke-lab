import { Link, Navigate, useParams } from 'react-router-dom'
import { EvolutionNav } from '../components/EvolutionNav'
import { PokemonImage } from '../components/PokemonImage'
import { TypeBadge } from '../components/TypeBadge'
import { POKEMON, formatNumber, getPokemon } from '../data/pokemon'
import { TYPE_INFO } from '../data/types'
import { formatMultiplier, getEffectiveness } from '../lib/effectiveness'

const FIRST_ID = POKEMON[0].id
const LAST_ID = POKEMON[POKEMON.length - 1].id

export function PokemonDetail() {
  const { id } = useParams()
  const pokemon = getPokemon(Number(id))

  if (!pokemon) return <Navigate to="/" replace />

  const main = TYPE_INFO[pokemon.types[0]]
  const second = TYPE_INFO[pokemon.types[1] ?? pokemon.types[0]]
  const { weak, resist, immune } = getEffectiveness(pokemon.types)

  return (
    <div
      className="detail-page"
      style={{ background: `linear-gradient(170deg, ${main.color}, ${second.colorDark})` }}
    >
      <nav className="detail-nav">
        <Link className="btn" to="/">
          ← Volver
        </Link>
        <div className="detail-nav__arrows">
          {pokemon.id > FIRST_ID && (
            <Link className="btn" to={`/pokemon/${pokemon.id - 1}`} aria-label="Anterior">
              ‹
            </Link>
          )}
          {pokemon.id < LAST_ID && (
            <Link className="btn" to={`/pokemon/${pokemon.id + 1}`} aria-label="Siguiente">
              ›
            </Link>
          )}
        </div>
      </nav>

      <header className="hero">
        <PokemonImage id={pokemon.id} name={pokemon.name} className="hero__img" eager />
        <span className="hero__number">N.º {formatNumber(pokemon.id)}</span>
        <h1 className="hero__name">{pokemon.name}</h1>
        <div className="badge-row">
          {pokemon.types.map((t) => (
            <TypeBadge key={t} type={t} />
          ))}
        </div>
      </header>

      <section className="panel panel--weak">
        <h2 className="panel__title">Debilidades</h2>
        {weak.length === 0 ? (
          <p className="panel__empty">Ninguna</p>
        ) : (
          <div className="badge-row">
            {weak.map((w) => (
              <TypeBadge key={w.type} type={w.type} note={formatMultiplier(w.mult)} size="sm" />
            ))}
          </div>
        )}
      </section>

      <section className="panel panel--resist">
        <h2 className="panel__title">Resistencias</h2>
        {resist.length === 0 && immune.length === 0 ? (
          <p className="panel__empty">Ninguna</p>
        ) : (
          <div className="badge-row">
            {resist.map((r) => (
              <TypeBadge key={r.type} type={r.type} note={formatMultiplier(r.mult)} size="sm" />
            ))}
            {immune.map((t) => (
              <TypeBadge key={t} type={t} note="Inmune" size="sm" />
            ))}
          </div>
        )}
      </section>

      <EvolutionNav pokemon={pokemon} />
    </div>
  )
}
