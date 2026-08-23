/**
 * Las 151 fotos están guardadas en public/images (bajadas con `npm run download-images`),
 * así que la app funciona sin internet. Poné `false` para volver a pedirlas al sitio.
 */
export const USE_LOCAL_IMAGES = true

const REMOTE_BASE = 'https://pokefanaticos.com/pokedex/assets/images/pokemon_imagenes'

export function imageUrl(id: number): string {
  return USE_LOCAL_IMAGES ? `./images/${id}.png` : `${REMOTE_BASE}/${id}.png`
}
