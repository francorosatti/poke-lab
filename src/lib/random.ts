/** Utilidades chicas para armar preguntas al azar. */

/** Devuelve un elemento al azar de la lista. */
export function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

/** Copia la lista y la mezcla (Fisher–Yates), sin tocar el original. */
export function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/** Elige `n` elementos distintos entre sí, opcionalmente descartando algunos con `exclude`. */
export function sampleUnique<T>(items: T[], n: number, exclude?: (x: T) => boolean): T[] {
  const pool = exclude ? items.filter((x) => !exclude(x)) : items
  return shuffle(pool).slice(0, n)
}
