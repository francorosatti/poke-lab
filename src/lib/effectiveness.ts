import { ALL_TYPES, TYPE_CHART, type TypeName } from '../data/types'

export interface WeakEntry {
  type: TypeName
  mult: 4 | 2
}

export interface ResistEntry {
  type: TypeName
  mult: 0.5 | 0.25
}

export interface Effectiveness {
  /** Tipos que le hacen más daño, x4 primero */
  weak: WeakEntry[]
  /** Tipos que le hacen menos daño, x¼ primero */
  resist: ResistEntry[]
  /** Tipos que no le hacen nada */
  immune: TypeName[]
}

/**
 * Combina la tabla de tipos para los 1 o 2 tipos del defensor y devuelve
 * debilidades, resistencias e inmunidades ya ordenadas.
 */
export function getEffectiveness(defTypes: TypeName[]): Effectiveness {
  const weak: WeakEntry[] = []
  const resist: ResistEntry[] = []
  const immune: TypeName[] = []

  for (const atk of ALL_TYPES) {
    const mult = defTypes.reduce((acc, def) => acc * (TYPE_CHART[atk][def] ?? 1), 1)

    if (mult === 0) immune.push(atk)
    else if (mult > 1) weak.push({ type: atk, mult: mult as 4 | 2 })
    else if (mult < 1) resist.push({ type: atk, mult: mult as 0.5 | 0.25 })
  }

  weak.sort((a, b) => b.mult - a.mult)
  resist.sort((a, b) => a.mult - b.mult)

  return { weak, resist, immune }
}

/** Texto para mostrar el multiplicador: 4 → "×4", 0.25 → "×¼" */
export function formatMultiplier(mult: number): string {
  if (mult === 0.5) return '×½'
  if (mult === 0.25) return '×¼'
  return `×${mult}`
}
