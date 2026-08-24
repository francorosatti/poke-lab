import { Link } from 'react-router-dom'
import { GAME_MODES } from '../games/modes'

/** Grilla de juegos: cada tile abre una partida de 10 preguntas. */
export function GamesHome() {
  return (
    <div className="games-page">
      <header className="list-header">
        <h1 className="list-title">Juegos</h1>
        <p className="list-subtitle">Elegí un juego</p>
      </header>

      <div className="games-grid">
        {GAME_MODES.map((mode) => (
          <Link
            key={mode.id}
            to={`/juegos/${mode.id}`}
            className="game-tile"
            style={{ background: mode.color }}
          >
            <span className="game-tile__emoji">{mode.emoji}</span>
            <span className="game-tile__title">{mode.title}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
