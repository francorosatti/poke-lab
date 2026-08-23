// Baja las 151 fotos a public/images para que la app funcione sin internet.
// Uso: npm run download-images
import { mkdir, writeFile, stat } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const BASE = 'https://pokefanaticos.com/pokedex/assets/images/pokemon_imagenes'
const OUT_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images')
const LAST_ID = 151
const CONCURRENCY = 8

await mkdir(OUT_DIR, { recursive: true })

async function alreadyDownloaded(path) {
  try {
    const info = await stat(path)
    return info.size > 0
  } catch {
    return false
  }
}

async function download(id) {
  const out = resolve(OUT_DIR, `${id}.png`)
  if (await alreadyDownloaded(out)) return { id, status: 'ya estaba' }

  const res = await fetch(`${BASE}/${id}.png`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)

  const buffer = Buffer.from(await res.arrayBuffer())
  if (buffer.length === 0) throw new Error('archivo vacío')

  await writeFile(out, buffer)
  return { id, status: `ok (${Math.round(buffer.length / 1024)} kB)` }
}

const ids = Array.from({ length: LAST_ID }, (_, i) => i + 1)
const failures = []
let done = 0

async function worker() {
  for (;;) {
    const id = ids.shift()
    if (id === undefined) return
    try {
      const result = await download(id)
      done++
      console.log(`[${done}/${LAST_ID}] ${result.id}.png — ${result.status}`)
    } catch (err) {
      done++
      failures.push({ id, message: err.message })
      console.warn(`[${done}/${LAST_ID}] ${id}.png — ERROR: ${err.message}`)
    }
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker))

if (failures.length > 0) {
  console.error(`\nFallaron ${failures.length}: ${failures.map((f) => f.id).join(', ')}`)
  process.exit(1)
}

console.log(`\nListo: ${LAST_ID} imágenes en public/images`)
