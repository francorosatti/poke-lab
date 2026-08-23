import { useState } from 'react'
import { formatNumber } from '../data/pokemon'
import { imageUrl } from '../lib/images'

interface Props {
  id: number
  name: string
  className?: string
  eager?: boolean
}

/** Foto del Pokémon; si no carga, muestra el número como respaldo. */
export function PokemonImage({ id, name, className = '', eager = false }: Props) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className={`poke-img poke-img--fallback ${className}`} aria-label={name}>
        <span>{formatNumber(id)}</span>
      </div>
    )
  }

  return (
    <img
      className={`poke-img ${className}`}
      src={imageUrl(id)}
      alt={name}
      loading={eager ? 'eager' : 'lazy'}
      onError={() => setFailed(true)}
    />
  )
}
