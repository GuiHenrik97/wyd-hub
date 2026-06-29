import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store'
import { Button } from '../ui/Button'
import { api } from '../../api/client'

export function Navbar() {
  const { isAuthenticated, emailVerified, logout } = useAuthStore()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  return (
    <>
      {isAuthenticated && !emailVerified && (
        <div className="border-b border-zinc-800/50 px-6 py-3 flex items-center justify-between gap-4" style={{ background: 'rgba(24,24,27,0.85)' }}>
          <p className="text-zinc-400 text-sm">
            ✉️ Confirme seu email para garantir acesso à sua conta.{' '}
            <span className="text-zinc-500 text-xs">Verifique também a pasta de spam.</span>
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={async () => {
                if (resendStatus === 'sending' || resendStatus === 'sent') return
                setResendStatus('sending')
                try {
                  await api.post('/auth/resend-verification')
                  setResendStatus('sent')
                  setTimeout(() => setResendStatus('idle'), 5000)
                } catch {
                  setResendStatus('error')
                  setTimeout(() => setResendStatus('idle'), 3000)
                }
              }}
              disabled={resendStatus === 'sending' || resendStatus === 'sent'}
              className="text-xs transition-colors disabled:cursor-default shrink-0"
              style={{ color: resendStatus === 'sent' ? '#22c55e' : resendStatus === 'error' ? '#ef4444' : '#a1a1aa' }}
            >
              {resendStatus === 'idle' && 'Reenviar email'}
              {resendStatus === 'sending' && 'Enviando...'}
              {resendStatus === 'sent' && '✓ Enviado'}
              {resendStatus === 'error' && 'Erro ao enviar'}
            </button>
            <button
              onClick={() => useAuthStore.getState().setEmailVerified(true)}
              className="text-zinc-500 hover:text-white text-sm transition-colors w-5 h-5 flex items-center justify-center rounded hover:bg-zinc-800"
            >
              ✕
            </button>
          </div>
        </div>
      )}

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
                <Link to="/app/perfil" className="text-zinc-400 hover:text-white text-sm transition-colors">Perfil</Link>
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
                <Link to="/app/perfil" onClick={() => setMenuOpen(false)} className="text-zinc-400 hover:text-white text-sm transition-colors py-1">Perfil</Link>
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
    </>
  )
}
