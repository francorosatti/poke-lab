import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { BottomNav } from './components/BottomNav'
import { GamePlay } from './pages/GamePlay'
import { GamesHome } from './pages/GamesHome'
import { PokemonDetail } from './pages/PokemonDetail'
import { PokemonList } from './pages/PokemonList'

/** Al cambiar de Pokémon, arrancar desde arriba de la página. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="/juegos" element={<GamesHome />} />
        <Route path="/juegos/:modeId" element={<GamePlay />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <BottomNav />
    </>
  )
}
