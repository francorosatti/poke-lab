import { TYPE_INFO, type TypeName } from '../data/types'
import { TypeIcon } from './TypeIcon'

interface Props {
  type: TypeName
  /** Texto extra a la derecha, por ejemplo "×4" o "Inmune" */
  note?: string
  size?: 'sm' | 'md'
}

export function TypeBadge({ type, note, size = 'md' }: Props) {
  const info = TYPE_INFO[type]
  return (
    <span
      className={`type-badge type-badge--${size}`}
      style={{ background: info.color, borderColor: info.colorDark }}
    >
      <TypeIcon type={type} size={size === 'sm' ? 22 : 28} color={info.color} />
      {info.label}
      {note && <b className="type-badge__note">{note}</b>}
    </span>
  )
}
