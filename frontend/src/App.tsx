import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { ProtectedRoute } from './components/layout/ProtectedRoute'
import { useAuthStore } from './store/auth.store'
import { Landing } from './pages/Landing'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Dashboard } from './pages/app/Dashboard'
import { CharacterPage } from './pages/app/CharacterPage'
import { Timers } from './pages/app/Timers'
import { Inventory } from './pages/app/Inventory'
import { AudioPlayer } from './components/ui/AudioPlayer'
import { Calculator } from './pages/Calculator'

export default function App() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  return (
    <div className="min-h-screen bg-zinc-950 text-white relative">
      {isAuthenticated && (
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{ backgroundImage: "url('/bg-app.png')", opacity: 0.07 }}
        />
      )}
      <div className="relative z-10">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/app/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/app/personagens/:id" element={
            <ProtectedRoute><CharacterPage /></ProtectedRoute>
          } />
          <Route path="/app/timers" element={
            <ProtectedRoute><Timers /></ProtectedRoute>
          } />
          <Route path="/app/inventario" element={
            <ProtectedRoute><Inventory /></ProtectedRoute>
          } />
          <Route path="/calculadora" element={<Calculator />} />
        </Routes>
        <footer className="mt-16 pt-8 border-t border-zinc-800 text-center flex flex-col gap-1 pb-8">
          <p className="text-zinc-600 text-xs">
            Desenvolvido por <span className="text-zinc-400">Uzuhiko / Zanuto02</span> — WYD Global
          </p>
          <p className="text-zinc-600 text-xs">
            Contato: <a href="mailto:guilhermehssouza97@gmail.com" className="text-amber-500 hover:text-amber-400 transition-colors">guilhermehssouza97@gmail.com</a>
          </p>
          <p className="text-zinc-600 text-xs mt-1">
            Este projeto não é afiliado à Raid Hut ou JoyImpact.
          </p>
        </footer>
      </div>
      <AudioPlayer />
    </div>
  )
}
