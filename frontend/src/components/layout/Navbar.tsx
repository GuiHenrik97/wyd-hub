import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store'
import { Button } from '../ui/Button'

export function Navbar() {
  const { isAuthenticated, logout } = useAuthStore()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  return (
    <nav className="border-b border-zinc-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-amber-500 font-bold text-xl tracking-tight leading-tight">
          WYD Hub
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-zinc-400 hover:text-white transition-colors"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
            }
          </svg>
        </button>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/calculadora" className="text-zinc-400 hover:text-white text-sm transition-colors">Calculadora</Link>
          {isAuthenticated ? (
            <>
              <Link to="/app/dashboard" className="text-zinc-400 hover:text-white text-sm transition-colors">Dashboard</Link>
              <Link to="/app/inventario" className="text-zinc-400 hover:text-white text-sm transition-colors">Inventário</Link>
              <Link to="/app/timers" className="text-zinc-400 hover:text-white text-sm transition-colors">Lembretes</Link>
              <Button variant="ghost" onClick={handleLogout} className="text-sm">Sair</Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-zinc-400 hover:text-white text-sm transition-colors">Entrar</Link>
              <Button variant="primary" onClick={() => navigate('/register')} className="text-sm">Cadastrar</Button>
            </>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 pb-2">
          <Link to="/calculadora" onClick={() => setMenuOpen(false)} className="text-zinc-400 hover:text-white text-sm transition-colors py-1">Calculadora</Link>
          {isAuthenticated ? (
            <>
              <Link to="/app/dashboard" onClick={() => setMenuOpen(false)} className="text-zinc-400 hover:text-white text-sm transition-colors py-1">Dashboard</Link>
              <Link to="/app/inventario" onClick={() => setMenuOpen(false)} className="text-zinc-400 hover:text-white text-sm transition-colors py-1">Inventário</Link>
              <Link to="/app/timers" onClick={() => setMenuOpen(false)} className="text-zinc-400 hover:text-white text-sm transition-colors py-1">Lembretes</Link>
              <button onClick={handleLogout} className="text-zinc-400 hover:text-white text-sm transition-colors py-1 text-left">Sair</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="text-zinc-400 hover:text-white text-sm transition-colors py-1">Entrar</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="text-amber-500 hover:text-amber-400 text-sm font-medium py-1">Cadastrar</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
