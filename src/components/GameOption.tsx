import { getPokemon } from '../data/pokemon'
import { TYPE_INFO } from '../data/types'
import type { Option } from '../games/types'
import { PokemonImage } from './PokemonImage'
import { TypeIcon } from './TypeIcon'

interface Props {
  option: Option
  state: 'idle' | 'correct' | 'wrong'
  disabled: boolean
  onPick: (key: string) => void
}

/** Un botón de respuesta: siempre imagen o ícono, nunca texto para leer. */
export function GameOption({ option, state, disabled, onPick }: Props) {
  const isPokemon = option.kind === 'pokemon'
  const pokemon = isPokemon ? getPokemon(option.pokemonId as number) : undefined
  const typeInfo = option.type ? TYPE_INFO[option.type] : undefined

  const label = pokemon?.name ?? typeInfo?.label ?? ''

  return (
    <button
      type="button"
      className={`option option--${state}`}
      disabled={disabled}
      onClick={() => onPick(option.key)}
      aria-label={label}
    >
      {state === 'correct' && <span className="option__mark">✅</span>}
      {state === 'wrong' && <span className="option__mark">❌</span>}

      {isPokemon && pokemon && (
        <>
          <PokemonImage id={pokemon.id} name={pokemon.name} className="option__img" />
          <span className="option__label">{pokemon.name}</span>
        </>
      )}

      {!isPokemon && option.type && typeInfo && (
        <>
          <div className="option__type-icon">
            <TypeIcon type={option.type} size={72} color={typeInfo.color} />
          </div>
          <span className="option__label">{typeInfo.label}</span>
        </>
      )}
    </button>
  )
}
