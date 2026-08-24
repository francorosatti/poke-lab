import { getPokemon } from '../data/pokemon'
import { TYPE_INFO } from '../data/types'
import type { Question } from '../games/types'
import { PokemonImage } from './PokemonImage'
import { TypeIcon } from './TypeIcon'

interface Props {
  prompt: Question['prompt']
  /** Si ya se respondió, la silueta se revela. */
  revealed: boolean
}

/** Lo que se muestra arriba de las opciones: el Pokémon o el tipo de la pregunta. */
export function GamePrompt({ prompt, revealed }: Props) {
  if (prompt.kind === 'pokemon') {
    const pokemon = getPokemon(prompt.id)
    if (!pokemon) return null
    const silueta = Boolean(prompt.silhouette) && !revealed

    return (
      <div className="game-prompt">
        <PokemonImage
          id={pokemon.id}
          name={pokemon.name}
          eager
          className={`game-prompt__img ${silueta ? 'game-prompt__img--silhouette' : ''}`}
        />
      </div>
    )
  }

  const info = TYPE_INFO[prompt.type]
  return (
    <div className="game-prompt">
      <div className="game-prompt__type-circle">
        <TypeIcon type={prompt.type} size={176} color={info.color} />
      </div>
    </div>
  )
}
