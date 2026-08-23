import { useMemo, useState } from 'react'
import { PokemonCard } from '../components/PokemonCard'
import { POKEMON } from '../data/pokemon'

export function PokemonList() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return POKEMON
    return POKEMON.filter(
      (p) => p.name.toLowerCase().includes(q) || String(p.id).includes(q),
    )
  }, [query])

  return (
    <div className="list-page">
      <header className="list-header">
        <h1 className="list-title">Pokédex</h1>
        <p className="list-subtitle">Los primeros 151 Pokémon</p>
        <input
          className="search"
          type="search"
          placeholder="Buscar por nombre o número…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Buscar Pokémon"
        />
      </header>

      {results.length === 0 ? (
        <p className="empty">No encontramos ningún Pokémon con "{query}"</p>
      ) : (
        <div className="grid">
          {results.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>
      )}
    </div>
  )
}
