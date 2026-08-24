import type { TypeName } from '../data/types'

export type OptionKind = 'pokemon' | 'type'

export interface Option {
  /** Clave estable para React y para comparar la respuesta. */
  key: string
  kind: OptionKind
  pokemonId?: number
  type?: TypeName
}

export interface Question {
  /** Qué se muestra arriba: un Pokémon (normal o en silueta) o un ícono de tipo. */
  prompt:
    | { kind: 'pokemon'; id: number; silhouette?: boolean }
    | { kind: 'type'; type: TypeName }
  options: Option[]
  correctKey: string
}

export interface GameMode {
  /** 'evolucion' | 'tipo' | 'silueta' | 'buscar-tipo' */
  id: string
  /** Para el adulto */
  title: string
  /** Identidad visual del tile, se lee sin saber leer */
  emoji: string
  color: string
  /** Devuelve null si no puede armar una pregunta válida; el caller reintenta. */
  build: () => Question | null
}
