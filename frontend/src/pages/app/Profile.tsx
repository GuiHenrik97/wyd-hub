import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store'
import { api } from '../../api/client'
import { Button } from '../../components/ui/Button'

export function Profile() {
  const { userId, email, emailVerified, logout } = useAuthStore()
  const navigate = useNavigate()
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleResend = async () => {
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
  }

  const handleDelete = async () => {
    setDeleting(true)
    setError('')
    try {
      await api.delete(`/users/${userId}`)
      logout()
      navigate('/')
    } catch {
      setError('Erro ao excluir conta. Tente novamente.')
      setDeleting(false)
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Meu perfil</h1>

      <div className="flex flex-col gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4">
          <h2 className="text-white font-medium">Informações da conta</h2>
          <div className="flex flex-col gap-1">
            <span className="text-zinc-500 text-xs uppercase tracking-wide">Email</span>
            <span className="text-zinc-300 text-sm">{email ?? '—'}</span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-zinc-500 text-xs uppercase tracking-wide">Status</span>
            {emailVerified ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center shrink-0">
                  <span className="text-green-400 text-xs">✓</span>
                </div>
                <span className="text-green-400 text-sm">Conta verificada</span>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center shrink-0">
                    <span className="text-red-400 text-xs">✕</span>
                  </div>
                  <span className="text-red-400 text-sm">Conta não verificada</span>
                </div>
                <p className="text-zinc-500 text-xs">
                  Verifique sua caixa de entrada e pasta de spam.
                </p>
                <button
                  onClick={handleResend}
                  disabled={resendStatus === 'sending' || resendStatus === 'sent'}
                  className="text-xs px-3 py-1.5 rounded-lg border border-zinc-700 transition-all w-fit disabled:cursor-default"
                  style={{ color: resendStatus === 'sent' ? '#22c55e' : resendStatus === 'error' ? '#ef4444' : '#a1a1aa' }}
                >
                  {resendStatus === 'idle' && 'Reenviar email de verificação'}
                  {resendStatus === 'sending' && 'Enviando...'}
                  {resendStatus === 'sent' && '✓ Email enviado — verifique o spam'}
                  {resendStatus === 'error' && 'Erro ao enviar — tente novamente'}
                </button>
              </div>
            )}
          </div>

          <p className="text-zinc-600 text-xs">
            Sua senha é armazenada de forma criptografada e não pode ser visualizada.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-3">
          <h2 className="text-white font-medium">Privacidade</h2>
          <p className="text-zinc-400 text-sm">
            Leia nossa{' '}
            <a href="/privacidade" className="text-amber-500 hover:text-amber-400">
              Política de Privacidade
            </a>{' '}
            para entender como seus dados são utilizados.
          </p>
        </div>

        <div className="bg-zinc-900 border border-red-500/20 rounded-xl p-6 flex flex-col gap-4">
          <div>
            <h2 className="text-white font-medium">Excluir conta</h2>
            <p className="text-zinc-400 text-sm mt-1">
              Esta ação é permanente e irreversível. Todos os seus dados serão removidos:
              personagens, equipamentos, inventário e histórico de dailies.
            </p>
          </div>

          {!confirming ? (
            <Button
              variant="secondary"
              onClick={() => setConfirming(true)}
              className="border-red-500/30 text-red-400 hover:border-red-500 w-fit"
            >
              Excluir minha conta
            </Button>
          ) : (
            <div className="flex flex-col gap-3">
              <p className="text-red-400 text-sm font-medium">
                Tem certeza? Esta ação não pode ser desfeita.
              </p>
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <div className="flex gap-3">
                <Button
                  onClick={handleDelete}
                  loading={deleting}
                  className="bg-red-600 hover:bg-red-500 text-white border-0"
                >
                  Sim, excluir permanentemente
                </Button>
                <Button variant="ghost" onClick={() => setConfirming(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
