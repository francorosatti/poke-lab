export type TypeName =
  | 'normal'
  | 'fuego'
  | 'agua'
  | 'planta'
  | 'electrico'
  | 'hielo'
  | 'lucha'
  | 'veneno'
  | 'tierra'
  | 'volador'
  | 'psiquico'
  | 'bicho'
  | 'roca'
  | 'fantasma'
  | 'dragon'

export interface TypeInfo {
  /** Nombre visible, en español */
  label: string
  /** Color base del tipo */
  color: string
  /** Variante oscura, para degradados y textos */
  colorDark: string
}

export const TYPE_INFO: Record<TypeName, TypeInfo> = {
  normal: { label: 'Normal', color: '#a8a77a', colorDark: '#6d6c4e' },
  fuego: { label: 'Fuego', color: '#ee8130', colorDark: '#a4501a' },
  agua: { label: 'Agua', color: '#6390f0', colorDark: '#33549e' },
  planta: { label: 'Planta', color: '#7ac74c', colorDark: '#47812b' },
  electrico: { label: 'Eléctrico', color: '#f7d02c', colorDark: '#b08f06' },
  hielo: { label: 'Hielo', color: '#96d9d6', colorDark: '#4d9c98' },
  lucha: { label: 'Lucha', color: '#c22e28', colorDark: '#7d1c18' },
  veneno: { label: 'Veneno', color: '#a33ea1', colorDark: '#6a2568' },
  tierra: { label: 'Tierra', color: '#e2bf65', colorDark: '#a08331' },
  volador: { label: 'Volador', color: '#a98ff3', colorDark: '#6a51c0' },
  psiquico: { label: 'Psíquico', color: '#f95587', colorDark: '#b02252' },
  bicho: { label: 'Bicho', color: '#a6b91a', colorDark: '#6c7a0d' },
  roca: { label: 'Roca', color: '#b6a136', colorDark: '#7b6c1e' },
  fantasma: { label: 'Fantasma', color: '#735797', colorDark: '#473564' },
  dragon: { label: 'Dragón', color: '#6f35fc', colorDark: '#4718b0' },
}

export const ALL_TYPES = Object.keys(TYPE_INFO) as TypeName[]

/**
 * Multiplicador del ataque de `atk` contra un defensor de tipo `def`.
 * Solo se listan los valores distintos de 1.
 *
 * Usamos los valores de efectividad actuales (no los bugs de la 1ª generación),
 * limitados a los 15 tipos que existían en esa generación.
 */
export const TYPE_CHART: Record<TypeName, Partial<Record<TypeName, 0 | 0.5 | 2>>> = {
  normal: { roca: 0.5, fantasma: 0 },
  fuego: { fuego: 0.5, agua: 0.5, planta: 2, hielo: 2, bicho: 2, roca: 0.5, dragon: 0.5 },
  agua: { fuego: 2, agua: 0.5, planta: 0.5, tierra: 2, roca: 2, dragon: 0.5 },
  planta: {
    fuego: 0.5,
    agua: 2,
    planta: 0.5,
    veneno: 0.5,
    tierra: 2,
    volador: 0.5,
    bicho: 0.5,
    roca: 2,
    dragon: 0.5,
  },
  electrico: { agua: 2, planta: 0.5, electrico: 0.5, tierra: 0, volador: 2, dragon: 0.5 },
  hielo: { fuego: 0.5, agua: 0.5, planta: 2, hielo: 0.5, tierra: 2, volador: 2, dragon: 2 },
  lucha: {
    normal: 2,
    hielo: 2,
    veneno: 0.5,
    volador: 0.5,
    psiquico: 0.5,
    bicho: 0.5,
    roca: 2,
    fantasma: 0,
  },
  veneno: { planta: 2, veneno: 0.5, tierra: 0.5, roca: 0.5, fantasma: 0.5 },
  tierra: { fuego: 2, planta: 0.5, electrico: 2, veneno: 2, volador: 0, bicho: 0.5, roca: 2 },
  volador: { planta: 2, electrico: 0.5, lucha: 2, bicho: 2, roca: 0.5 },
  psiquico: { lucha: 2, veneno: 2, psiquico: 0.5 },
  bicho: {
    fuego: 0.5,
    planta: 2,
    lucha: 0.5,
    veneno: 0.5,
    volador: 0.5,
    psiquico: 2,
    fantasma: 0.5,
  },
  roca: { fuego: 2, hielo: 2, lucha: 0.5, tierra: 0.5, volador: 2, bicho: 2 },
  fantasma: { normal: 0, psiquico: 2, fantasma: 2 },
  dragon: { dragon: 2 },
}
