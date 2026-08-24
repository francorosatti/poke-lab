import { POKEMON } from '../data/pokemon'
import { ALL_TYPES, type TypeName } from '../data/types'
import { pick, sampleUnique, shuffle } from '../lib/random'
import type { GameMode, Option, Question } from './types'

function pokemonOption(id: number): Option {
  return { key: `pokemon-${id}`, kind: 'pokemon', pokemonId: id }
}

function typeOption(type: TypeName): Option {
  return { key: `type-${type}`, kind: 'type', type }
}

/** "¿Cuál es su evolución?": mostramos un Pokémon y hay que elegir a quién evoluciona. */
function buildEvolucion(): Question | null {
  const candidatos = POKEMON.filter((p) => p.evolvesTo?.length)
  if (candidatos.length === 0) return null

  const base = pick(candidatos)
  const correctId = pick(base.evolvesTo as number[])

  // Eevee tiene tres evoluciones: ninguna puede aparecer como distractor.
  const excluidos = new Set<number>([base.id, base.evolvesFrom ?? -1, ...(base.evolvesTo ?? [])])
  const distractores = sampleUnique(POKEMON, 3, (p) => excluidos.has(p.id))
  if (distractores.length < 3) return null

  const options = shuffle([pokemonOption(correctId), ...distractores.map((p) => pokemonOption(p.id))])

  return {
    prompt: { kind: 'pokemon', id: base.id },
    options,
    correctKey: `pokemon-${correctId}`,
  }
}

/** "¿De qué tipo es?": mostramos un Pokémon y hay que elegir uno de sus tipos. */
function buildTipo(): Question | null {
  const base = pick(POKEMON)
  const correctType = pick(base.types)

  const distractores = sampleUnique(
    ALL_TYPES,
    3,
    (t) => base.types.includes(t),
  )
  if (distractores.length < 3) return null

  const options = shuffle([typeOption(correctType), ...distractores.map(typeOption)])

  return {
    prompt: { kind: 'pokemon', id: base.id },
    options,
    correctKey: `type-${correctType}`,
  }
}

/** "¿Quién es este Pokémon?": arranca en silueta y se revela al responder. */
function buildSilueta(): Question | null {
  const base = pick(POKEMON)
  const distractores = sampleUnique(POKEMON, 3, (p) => p.id === base.id)
  if (distractores.length < 3) return null

  const options = shuffle([pokemonOption(base.id), ...distractores.map((p) => pokemonOption(p.id))])

  return {
    prompt: { kind: 'pokemon', id: base.id, silhouette: true },
    options,
    correctKey: `pokemon-${base.id}`,
  }
}

/** "Encontrá el de este tipo": hay que elegir un Pokémon que tenga el tipo pedido. */
function buildBuscarTipo(): Question | null {
  const tiposConCuatro = ALL_TYPES.filter(
    (t) => POKEMON.filter((p) => p.types.includes(t)).length >= 4,
  )
  if (tiposConCuatro.length === 0) return null

  const type = pick(tiposConCuatro)
  const delTipo = POKEMON.filter((p) => p.types.includes(type))
  const correct = pick(delTipo)

  const distractores = sampleUnique(POKEMON, 3, (p) => p.types.includes(type))
  if (distractores.length < 3) return null

  const options = shuffle([pokemonOption(correct.id), ...distractores.map((p) => pokemonOption(p.id))])

  return {
    prompt: { kind: 'type', type },
    options,
    correctKey: `pokemon-${correct.id}`,
  }
}

export const GAME_MODES: GameMode[] = [
  {
    id: 'evolucion',
    title: 'Evolución',
    emoji: '🔄',
    color: '#4caf50',
    build: buildEvolucion,
  },
  {
    id: 'tipo',
    title: 'Tipo',
    emoji: '🎨',
    color: '#ef4136',
    build: buildTipo,
  },
  {
    id: 'silueta',
    title: 'Silueta',
    emoji: '🕵️',
    color: '#2b3a67',
    build: buildSilueta,
  },
  {
    id: 'buscar-tipo',
    title: 'Buscar tipo',
    emoji: '🔎',
    color: '#f0a500',
    build: buildBuscarTipo,
  },
]

export function getMode(id: string): GameMode | undefined {
  return GAME_MODES.find((m) => m.id === id)
}
