import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { GameOption } from '../components/GameOption'
import { GamePrompt } from '../components/GamePrompt'
import { getMode } from '../games/modes'
import type { GameMode, Question } from '../games/types'

const ROUND_SIZE = 10
const MAX_INTENTOS = 20

/** Intenta armar una pregunta válida, reintentando si el modo devuelve null. */
function nuevaPregunta(mode: GameMode): Question | null {
  for (let i = 0; i < MAX_INTENTOS; i++) {
    const q = mode.build()
    if (q) return q
  }
  return null
}

/** Motor de una partida: 10 preguntas, puntaje y pantalla final con estrellas. */
export function GamePlay() {
  const { modeId } = useParams()
  const mode = getMode(modeId ?? '')

  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [question, setQuestion] = useState<Question | null>(null)
  const [answer, setAnswer] = useState<string | null>(null)

  useEffect(() => {
    if (mode) setQuestion(nuevaPregunta(mode))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode?.id])

  if (!mode) return <Navigate to="/juegos" replace />

  const terminado = index >= ROUND_SIZE

  function handlePick(key: string) {
    if (answer !== null || !question) return
    setAnswer(key)
    if (key === question.correctKey) setScore((s) => s + 1)
  }

  function handleNext() {
    setAnswer(null)
    setIndex((i) => i + 1)
    setQuestion(nuevaPregunta(mode as GameMode))
  }

  function handleRestart() {
    setIndex(0)
    setScore(0)
    setAnswer(null)
    setQuestion(nuevaPregunta(mode as GameMode))
  }

  return (
    <div className="game-page">
      <nav className="detail-nav">
        <Link className="btn" to="/juegos" aria-label="Volver a juegos">
          ⬅️
        </Link>
      </nav>

      {!terminado && (
        <div className="progress">
          {Array.from({ length: ROUND_SIZE }).map((_, i) => (
            <span
              key={i}
              className={`progress__dot ${i < index ? 'progress__dot--done' : ''} ${
                i === index ? 'progress__dot--current' : ''
              }`}
            />
          ))}
        </div>
      )}

      {!terminado && question && (
        <>
          <GamePrompt prompt={question.prompt} revealed={answer !== null} />

          <div className="options-grid">
            {question.options.map((opt) => {
              let state: 'idle' | 'correct' | 'wrong' = 'idle'
              if (answer !== null) {
                if (opt.key === question.correctKey) state = 'correct'
                else if (opt.key === answer) state = 'wrong'
              }
              return (
                <GameOption
                  key={opt.key}
                  option={opt}
                  state={state}
                  disabled={answer !== null}
                  onPick={handlePick}
                />
              )
            })}
          </div>

          {answer !== null && (
            <button type="button" className="next-btn" onClick={handleNext}>
              Seguir ➡️
            </button>
          )}
        </>
      )}

      {terminado && (
        <div className="result">
          <p className="result__score">
            {score} / {ROUND_SIZE}
          </p>
          <div className="result__stars">
            {Array.from({ length: ROUND_SIZE }).map((_, i) => (
              <span key={i}>{i < score ? '⭐' : '☆'}</span>
            ))}
          </div>
          <button type="button" className="next-btn" onClick={handleRestart}>
            Jugar de nuevo 🔁
          </button>
          <Link className="btn" to="/juegos">
            Otros juegos 🎮
          </Link>
        </div>
      )}
    </div>
  )
}
