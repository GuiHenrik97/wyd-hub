import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { characterApi } from '../../api/character.api'
import { calculatorApi } from '../../api/calculator.api'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

const MANTLE_COLORS: Record<string, { bg: string; border: string; label: string }> = {
  BLUE:  { bg: 'from-blue-900/30 to-transparent',  border: 'border-blue-500/30',  label: 'Azul' },
  WHITE: { bg: 'from-zinc-400/20 to-transparent',  border: 'border-zinc-300/30',  label: 'Branca' },
  RED:   { bg: 'from-red-900/30 to-transparent',   border: 'border-red-500/30',   label: 'Vermelha' },
}

function CharacterCard({ char, onClick, onEdit, onDelete }: { char: any; onClick: () => void; onEdit: () => void; onDelete: () => void }) {
  const seal = char.seal ?? {}
  const gear = char.accountGear ?? {}
  const items = char.itemSet ?? {}
  const color = char.mantleColor ? MANTLE_COLORS[char.mantleColor] : null

  const class1 = seal.class1Lineage || seal.class1Type || '—'
  const class2 = seal.class2Lineage || seal.class2Type

  return (
    <div
      className={`${color ? `bg-linear-to-b ${color.bg} border ${color.border}` : 'bg-zinc-900 border-zinc-800'} hover:brightness-110 rounded-2xl p-6 cursor-pointer transition-all group relative`}
      onClick={onClick}
    >
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={e => { e.stopPropagation(); onEdit() }}
          className="text-zinc-600 hover:text-zinc-300 text-xs px-2 py-1 rounded-lg hover:bg-zinc-800 transition-all"
        >
          ✎ Editar
        </button>
        <button
          onClick={e => { e.stopPropagation(); onDelete() }}
          className="text-zinc-600 hover:text-red-400 text-xs px-2 py-1 rounded-lg hover:bg-zinc-800 transition-all"
        >
          Excluir
        </button>
      </div>

      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col min-w-0 pr-32">
          <h3 className="text-white font-medium text-xl group-hover:text-amber-500 transition-colors truncate">
            {char.nick}
          </h3>
          <p className="text-zinc-500 text-sm mt-0.5 truncate">
            {class1}{class2 ? ` · ${class2}` : ''}
          </p>
          {char.hasGuild && (
            <span className="text-xs text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-full border border-zinc-700 mt-1 w-fit">
              {char.guild || 'Guild'}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-zinc-800/50 rounded-xl p-3">
          <p className="text-zinc-500 text-xs mb-2 uppercase tracking-wide">Selo</p>
          <div className="flex flex-col gap-1">
            <p className="text-zinc-300 text-xs">
              {seal.class1Level || '—'}{seal.class2Level ? `/${seal.class2Level}` : ''}
            </p>
            {seal.mantleType && (
              <p className="text-zinc-300 text-xs">
                Capa: {seal.mantleType} {seal.mantleRefinement != null ? `+${seal.mantleRefinement}` : ''}{seal.mantleAdditional ? ` ${seal.mantleAdditional}` : ''}
              </p>
            )}
            <p className="text-zinc-400 text-xs">
              L1: 11th {seal.class1Has11th ? <span className="text-amber-500">✓</span> : <span className="text-zinc-600">✗</span>}{' '}
              12th {seal.class1Has12th ? <span className="text-amber-500">✓</span> : <span className="text-zinc-600">✗</span>}{' '}
              Esp {seal.class1Spectral ? <span className="text-amber-500">✓</span> : <span className="text-zinc-600">✗</span>}{' '}
              Con {seal.class1Concentration ? <span className="text-amber-500">✓</span> : <span className="text-zinc-600">✗</span>}{' '}
              Res {seal.class1Resurrection ? <span className="text-amber-500">✓</span> : <span className="text-zinc-600">✗</span>}
            </p>
            {seal.class2Type && (
              <p className="text-zinc-400 text-xs">
                L2: 11th {seal.class2Has11th ? <span className="text-amber-500">✓</span> : <span className="text-zinc-600">✗</span>}{' '}
                12th {seal.class2Has12th ? <span className="text-amber-500">✓</span> : <span className="text-zinc-600">✗</span>}{' '}
                Esp {seal.class2Spectral ? <span className="text-amber-500">✓</span> : <span className="text-zinc-600">✗</span>}{' '}
                Con {seal.class2Concentration ? <span className="text-amber-500">✓</span> : <span className="text-zinc-600">✗</span>}{' '}
                Res {seal.class2Resurrection ? <span className="text-amber-500">✓</span> : <span className="text-zinc-600">✗</span>}
              </p>
            )}
          </div>
        </div>

        <div className="bg-zinc-800/50 rounded-xl p-3">
          <p className="text-zinc-500 text-xs mb-2 uppercase tracking-wide">Conta</p>
          <div className="flex flex-col gap-1">
            {gear.cytheraType && (
              <p className="text-zinc-300 text-xs">Cythera: {gear.cytheraType} +{gear.cytheraRefinement ?? 0}</p>
            )}
            <p className="text-zinc-400 text-xs">
              Amuletos: T{gear.amulet1AdditionalTier ?? 0}/T{gear.necklaceAdditionalTier ?? 0}/T{gear.beltAdditionalTier ?? 0}
            </p>
            <p className="text-zinc-400 text-xs">
              Amunra: T{gear.amulet2Tier ?? 0}/T{gear.amulet3Tier ?? 0}/T{gear.amulet4Tier ?? 0}
            </p>
          </div>
        </div>

        <div className="bg-zinc-800/50 rounded-xl p-3">
          <p className="text-zinc-500 text-xs mb-2 uppercase tracking-wide">Itens</p>
          <div className="flex flex-col gap-1">
            {items.weaponType && (
              <p className="text-zinc-300 text-xs">Arma: {items.weaponType} +{items.weaponRefinement ?? 0}</p>
            )}
            {(() => {
              const armorSlots = ['chest', 'pants', 'gloves', 'boots']
              const filled = armorSlots.filter(s => items[`${s}Type`])
              if (filled.length === 0) return null
              const avg = Math.round(filled.reduce((acc, s) => acc + (items[`${s}Refinement`] ?? 0), 0) / filled.length)
              return <p className="text-zinc-400 text-xs">Set: +{avg}</p>
            })()}
            {items.mountType && (
              <p className="text-zinc-400 text-xs">{items.mountType.replace(/_/g, ' ')} {items.mountLevel ?? 0} Ql {items.mountQuality ?? 0}</p>
            )}
            {!items.weaponType && !items.chestType && (
              <p className="text-zinc-600 text-xs">Não configurado</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Dashboard() {
  const navigate = useNavigate()
  const [characters, setCharacters] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [inventory, setInventory] = useState<any[]>([])
  const [inventoryLoading, setInventoryLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [nick, setNick] = useState('')
  const [guild, setGuild] = useState('')
  const [hasGuild, setHasGuild] = useState(false)
  const [mantleColor, setMantleColor] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ nick: '', guild: '', hasGuild: false, mantleColor: 'BLUE' })
  const [editSaving, setEditSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      characterApi.list(),
      calculatorApi.getInventory(),
    ]).then(([charRes, invRes]) => {
      setCharacters(charRes.data)
      setInventory(invRes.data.filter((item: any) => item.quantity > 0))
      setLoading(false)
      setInventoryLoading(false)
    })
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)
    try {
      const { data } = await characterApi.create({ nick, guild: guild || undefined, hasGuild, mantleColor: mantleColor || undefined })
      setCharacters(prev => [...prev, data])
      setShowForm(false)
      setNick('')
      setGuild('')
      setMantleColor(null)
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    await characterApi.delete(id)
    setCharacters(prev => prev.filter(c => c.id !== id))
    setConfirmDeleteId(null)
    setDeletingId(null)
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId) return
    setEditSaving(true)
    const { data } = await characterApi.update(editingId, editForm)
    setCharacters(prev => prev.map(c => c.id === editingId ? data : c))
    setEditingId(null)
    setEditSaving(false)
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white">Meus personagens</h1>
          <p className="text-zinc-400 mt-1 text-sm">Clique em um personagem para gerenciar</p>
        </div>
        <Button onClick={() => setShowForm(true)}>+ Novo personagem</Button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8 flex flex-col gap-4">
          <h2 className="text-white font-medium">Novo personagem</h2>
          <Input label="Nick" placeholder="Nome do personagem" value={nick} onChange={e => setNick(e.target.value)} required />
          <Input label="Guild (opcional)" placeholder="Nome da guild" value={guild} onChange={e => setGuild(e.target.value)} />
          <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer">
            <input type="checkbox" checked={hasGuild} onChange={e => setHasGuild(e.target.checked)} className="accent-amber-500" />
            Tem guild ativa
          </label>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-400">Cor da capa (opcional)</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setMantleColor(mantleColor === 'BLUE' ? null : 'BLUE')}
                className={`flex-1 py-2 rounded-lg border text-sm transition-all ${
                  mantleColor === 'BLUE'
                    ? 'border-blue-500/60 text-white bg-zinc-800'
                    : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'
                }`}
              >
                Azul
              </button>
              <button
                type="button"
                onClick={() => setMantleColor(mantleColor === 'WHITE' ? null : 'WHITE')}
                className={`flex-1 py-2 rounded-lg border text-sm transition-all ${
                  mantleColor === 'WHITE'
                    ? 'border-zinc-300/60 text-white bg-zinc-800'
                    : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'
                }`}
              >
                Branca
              </button>
              <button
                type="button"
                onClick={() => setMantleColor(mantleColor === 'RED' ? null : 'RED')}
                className={`flex-1 py-2 rounded-lg border text-sm transition-all ${
                  mantleColor === 'RED'
                    ? 'border-red-500/60 text-white bg-zinc-800'
                    : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'
                }`}
              >
                Vermelha
              </button>
            </div>
            {mantleColor && (
              <div className={`h-1.5 rounded-full bg-linear-to-r ${
                mantleColor === 'BLUE' ? 'from-blue-600 to-blue-400' :
                mantleColor === 'WHITE' ? 'from-zinc-400 to-zinc-200' :
                'from-red-600 to-red-400'
              }`} />
            )}
          </div>
          <div className="flex gap-3">
            <Button type="submit" loading={creating}>Criar</Button>
            <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancelar</Button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-zinc-500">Carregando...</p>
      ) : characters.length === 0 ? (
        <div className="text-center py-20 text-zinc-600">
          <p className="text-lg">Nenhum personagem ainda</p>
          <p className="text-sm mt-1">Crie seu primeiro personagem acima</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {characters.map(char => (
            <CharacterCard
              key={char.id}
              char={char}
              onClick={() => navigate(`/app/personagens/${char.id}`)}
              onEdit={() => {
                setEditForm({
                  nick: char.nick,
                  guild: char.guild ?? '',
                  hasGuild: char.hasGuild,
                  mantleColor: char.mantleColor ?? 'BLUE',
                })
                setEditingId(char.id)
              }}
              onDelete={() => setConfirmDeleteId(char.id)}
            />
          ))}
        </div>
      )}

      {editingId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-6" onClick={() => setEditingId(null)}>
          <form
            onSubmit={handleEdit}
            onClick={e => e.stopPropagation()}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md flex flex-col gap-4"
          >
            <h2 className="text-white font-medium text-lg">Editar personagem</h2>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-zinc-400">Nick</label>
              <input
                value={editForm.nick}
                onChange={e => setEditForm(prev => ({ ...prev, nick: e.target.value }))}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-zinc-400">Guild (opcional)</label>
              <input
                value={editForm.guild}
                onChange={e => setEditForm(prev => ({ ...prev, guild: e.target.value }))}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
                placeholder="Nome da guild"
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer">
              <input
                type="checkbox"
                checked={editForm.hasGuild}
                onChange={e => setEditForm(prev => ({ ...prev, hasGuild: e.target.checked }))}
                className="accent-amber-500"
              />
              Tem guild ativa
            </label>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-zinc-400">Cor da capa</label>
              <div className="flex gap-3">
                {Object.entries(MANTLE_COLORS).map(([key, color]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setEditForm(prev => ({ ...prev, mantleColor: key }))}
                    className={`flex-1 py-2 rounded-lg border text-sm transition-all ${
                      editForm.mantleColor === key
                        ? `${color.border} text-white bg-zinc-800`
                        : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'
                    }`}
                  >
                    {color.label}
                  </button>
                ))}
              </div>
              <div className={`h-2 rounded-full bg-linear-to-r ${
                editForm.mantleColor === 'BLUE' ? 'from-blue-600 to-blue-400' :
                editForm.mantleColor === 'WHITE' ? 'from-zinc-400 to-zinc-200' :
                'from-red-600 to-red-400'
              }`} />
            </div>

            <div className="flex gap-3 mt-2">
              <button
                type="submit"
                disabled={editSaving}
                className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                {editSaving ? 'Salvando...' : 'Salvar'}
              </button>
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="px-4 py-2.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-all"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-6" onClick={() => setConfirmDeleteId(null)}>
          <div
            onClick={e => e.stopPropagation()}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-sm flex flex-col gap-4"
          >
            <h2 className="text-white font-medium text-lg">Remover personagem</h2>
            <p className="text-zinc-400 text-sm">
              Tem certeza que deseja remover <span className="text-white font-medium">{characters.find(c => c.id === confirmDeleteId)?.nick}</span>? Esta ação não pode ser desfeita.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                disabled={deletingId === confirmDeleteId}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                {deletingId === confirmDeleteId ? 'Removendo...' : 'Remover'}
              </button>
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Meu inventário</h2>
            <p className="text-zinc-400 text-sm mt-0.5">Recursos cadastrados na sua conta</p>
          </div>
          <a
            href="/app/inventario"
            className="text-amber-500 hover:text-amber-400 text-sm transition-colors"
          >
            Gerenciar →
          </a>
        </div>

        {inventoryLoading ? (
          <p className="text-zinc-500 text-sm">Carregando...</p>
        ) : inventory.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-2xl">
              📦
            </div>
            <div>
              <p className="text-white font-medium">Nenhum item registrado ainda</p>
              <p className="text-zinc-500 text-sm mt-1">
                Registre seus itens para ver o que tem no inventário e usar os recursos da calculadora.
              </p>
            </div>
            <a
              href="/app/inventario"
              className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-medium rounded-lg transition-colors"
            >
              Cadastrar inventário
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {inventory
              .sort((a, b) => b.quantity - a.quantity)
              .map((item: any) => (
                <a
                  key={item.id}
                  href="/app/inventario"
                  className="bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 rounded-xl p-4 flex flex-col gap-2 transition-all group"
                >
                  <p className="text-zinc-400 text-xs leading-tight group-hover:text-zinc-300 transition-colors">
                    {item.resource.name}
                  </p>
                  <p className="text-white font-medium text-lg tabular-nums">
                    {item.quantity.toLocaleString('pt-BR')}
                  </p>
                  {!item.resource.mobile && (
                    <span className="text-zinc-600 text-xs">🔒 Imóvel</span>
                  )}
                </a>
              ))}
          </div>
        )}
      </div>
    </main>
  )
}
