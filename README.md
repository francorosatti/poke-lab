# Pokédex — Primera generación

Una Pokédex simple con los 151 Pokémon de la primera generación, en español.

- **Lista**: foto, número y nombre de cada Pokémon, con buscador por nombre o número.
- **Detalle**: foto grande, número, nombre, tipos (con ícono), debilidades, resistencias,
  inmunidades y evoluciones (anterior y siguiente(s), clickeables).
- El fondo de cada tarjeta y de la pantalla de detalle se pinta con el color del tipo.

## Cómo correrla

```bash
npm install
npm run dev
```

Para generar la versión de producción:

```bash
npm run build
npm run preview
```

## Imágenes

Las 151 fotos ya están guardadas en `public/images/`, así que la app **funciona sin internet**.

Si alguna vez querés volver a bajarlas (o bajarlas en otra copia del repo):

```bash
npm run download-images
```

El script saltea las que ya existen. Para pedirlas al sitio original en vez de usar
las locales, poné `USE_LOCAL_IMAGES = false` en [src/lib/images.ts](src/lib/images.ts).

## Sobre los tipos

Se usan los 15 tipos que existían en la primera generación (sin Siniestro, Acero ni Hada),
pero con los valores de efectividad **actuales**, no los de los juegos originales
(por ejemplo, acá Fantasma sí es súper efectivo contra Psíquico).

La tabla está en [src/data/types.ts](src/data/types.ts) y el cálculo combinando ambos
tipos del Pokémon en [src/lib/effectiveness.ts](src/lib/effectiveness.ts).

## Estructura

```
src/
  data/pokemon.ts        los 151 con tipos y cadena evolutiva
  data/types.ts          nombres en español, colores y tabla de tipos
  lib/effectiveness.ts   debilidades / resistencias / inmunidades
  lib/images.ts          de dónde salen las fotos
  components/            íconos de tipo, tarjetas, evoluciones
  pages/                 lista y detalle
  styles/global.css
scripts/download-images.mjs
```
