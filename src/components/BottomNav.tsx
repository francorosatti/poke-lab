import { Link, useLocation } from 'react-router-dom'

/** Barra fija abajo para moverse entre Pokédex y Juegos. */
export function BottomNav() {
  const { pathname } = useLocation()
  const enJuegos = pathname.startsWith('/juegos')
  const enPokedex = !enJuegos

  return (
    <nav className="bottom-nav">
      <Link to="/" className={`bottom-nav__item ${enPokedex ? 'bottom-nav__item--active' : ''}`}>
        <span className="bottom-nav__icon">📕</span>
        <span className="bottom-nav__label">Pokédex</span>
      </Link>
      <Link
        to="/juegos"
        className={`bottom-nav__item ${enJuegos ? 'bottom-nav__item--active' : ''}`}
      >
        <span className="bottom-nav__icon">🎮</span>
        <span className="bottom-nav__label">Juegos</span>
      </Link>
    </nav>
  )
}
