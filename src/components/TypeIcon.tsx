import type { TypeName } from '../data/types'

interface Props {
  type: TypeName
  size?: number
}

/**
 * Un dibujo simple por tipo. Usan `currentColor`, así que heredan el color
 * de quien los renderiza.
 */
const PATHS: Record<TypeName, React.ReactNode> = {
  normal: <circle cx="12" cy="12" r="7" />,
  fuego: <path d="M12 2c1 4-3 5-3 9a3 3 0 0 0 6 0c0-1-.5-2-.5-2s3 2 3 5a6.5 6.5 0 0 1-13 0C4.5 8 12 7 12 2z" />,
  agua: <path d="M12 2.5c4 5 6.5 8 6.5 11.2A6.5 6.5 0 0 1 5.5 13.7C5.5 10.5 8 7.5 12 2.5z" />,
  planta: (
    <>
      <path d="M20 4c0 8-4.5 12-9 12a5 5 0 0 1-1.5-9.8C13 5 17 5.5 20 4z" />
      <path d="M4 21c2-6 5-9 9-11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  electrico: <path d="M13.5 2 5 13h5l-1.5 9L19 10h-5.5L15 2z" />,
  hielo: (
    <g fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
      <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
      <path d="M12 6.5 9.7 4.6M12 6.5l2.3-1.9M12 17.5l-2.3 1.9M12 17.5l2.3 1.9" />
    </g>
  ),
  lucha: <path d="M6 9V6.5a1.6 1.6 0 0 1 3.2 0V5a1.6 1.6 0 0 1 3.2 0v1a1.6 1.6 0 0 1 3.2 0v2.2c1.2 0 2.4.6 2.4 2.3v3.2A6.3 6.3 0 0 1 11.7 20C8 20 6 17.6 6 14.8z" />,
  veneno: (
    <>
      <path d="M12 3.5c3.4 4.2 5.5 6.7 5.5 9.4A5.5 5.5 0 0 1 6.5 12.9c0-2.7 2.1-5.2 5.5-9.4z" />
      <circle cx="10" cy="13" r="1.3" fill="#fff" opacity=".7" />
      <circle cx="13.6" cy="15" r="1" fill="#fff" opacity=".7" />
    </>
  ),
  tierra: (
    <>
      <path d="M2 19h20l-6-8-3.2 4-2.3-2.6z" />
      <path d="M2 21h20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  volador: <path d="M2 8c5-1 9 .5 12 4 1.6-1.2 3-3 3.6-5C19.6 9.4 21 12 22 13c-4 .6-7 2.4-9.4 5C10.6 13.6 6.8 10 2 8z" />,
  psiquico: (
    <>
      <path d="M12 5.5c4.6 0 8 3.6 8 6.5s-3.4 6.5-8 6.5-8-3.6-8-6.5 3.4-6.5 8-6.5z" />
      <circle cx="12" cy="12" r="2.6" fill="#fff" opacity=".85" />
    </>
  ),
  bicho: (
    <>
      <ellipse cx="12" cy="14" rx="4.6" ry="6" />
      <circle cx="12" cy="6" r="2.6" />
      <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
        <path d="M10.6 4.2 8.6 1.9M13.4 4.2l2-2.3M7.4 11H4M7.4 15H4M16.6 11H20M16.6 15H20" />
      </g>
    </>
  ),
  roca: (
    <>
      <path d="M4 18 7 9l6-2.5L20 11l-1.5 7z" />
      <path d="M7 9l6 2 5.5 1M13 11v7" fill="none" stroke="#fff" strokeWidth="1.3" opacity=".55" />
    </>
  ),
  fantasma: (
    <>
      <path d="M12 3a7 7 0 0 1 7 7v10l-2.3-2-2.3 2-2.4-2-2.4 2-2.3-2L5 20V10a7 7 0 0 1 7-7z" />
      <circle cx="9.5" cy="10" r="1.4" fill="#fff" />
      <circle cx="14.5" cy="10" r="1.4" fill="#fff" />
    </>
  ),
  dragon: (
    <>
      <path d="M3 12c0-4 3.5-7 8-7 2.2 0 3.4-.9 4.4-2.2.5 1.6.3 2.8-.2 3.7C18 7.6 20 9.7 21 12c-1.6-.6-2.8-.7-3.8-.4 1 1.5 1.3 3.3 1 5.2-1-1.3-2-2.1-3-2.5-.4 2.4-2 4.3-4.6 5.2.9-1.4 1.2-2.7 1-3.9-3.4.3-6.4-1-8.6-3.6z" />
      <circle cx="8.5" cy="9.5" r="1.1" fill="#fff" />
    </>
  ),
}

export function TypeIcon({ type, size = 22 }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[type]}
    </svg>
  )
}
