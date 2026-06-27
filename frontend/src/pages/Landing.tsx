import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export function Landing() {
  const navigate = useNavigate()
  return (
    <main className="flex flex-col items-center justify-center min-h-[90vh] px-6 text-center gap-8">
      <div className="flex flex-col gap-4 max-w-2xl">
        <span className="text-amber-500 text-sm font-medium tracking-widest uppercase">
          WYD Global
        </span>
        <h1 className="text-5xl font-bold text-white leading-tight">
          Seu companion para<br />
          <span className="text-amber-500">WYD Global</span>
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed">
          Rastreie seu personagem, gerencie suas dailies e planeje seus recursos.
          Tudo em um lugar, moderno e gratuito.
        </p>
        <p className="text-zinc-600 text-xs">
          ⚠️ Este projeto não é afiliado à Raid Hut ou JoyImpact. Nunca use as mesmas credenciais do jogo.
        </p>
      </div>

      <div className="flex gap-4 flex-wrap justify-center">
        <Button variant="primary" onClick={() => navigate('/register')} className="px-8 py-3 text-base">
          Começar grátis
        </Button>
        <Button variant="secondary" onClick={() => navigate('/login')} className="px-8 py-3 text-base">
          Já tenho conta
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mt-8 w-full">
        {[
          { title: 'Daily Tracker', desc: 'Zona Infernal, Deserto, Check-in e mais. Reset automático à meia-noite.' },
          { title: 'Char Tracker', desc: 'Registro completo do seu personagem: Selo, Conta e Itens.' },
          { title: 'Multi-chars', desc: 'Gerencie todos os seus personagens em uma única conta.' },
        ].map((f) => (
          <div key={f.title} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-left">
            <h3 className="text-white font-medium mb-2">{f.title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
