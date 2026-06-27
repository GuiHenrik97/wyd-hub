import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { characterApi } from '../../api/character.api'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

function CharacterCard({ char, onClick }: { char: any; onClick: () => void }) {
  const seal = char.seal ?? {}
  const gear = char.accountGear ?? {}
  const items = char.itemSet ?? {}

  const class1 = seal.class1Lineage || seal.class1Type || '—'
  const class2 = seal.class2Lineage || seal.class2Type

  return (
    <div
      onClick={onClick}
      className="bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 rounded-2xl p-6 cursor-pointer transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white font-medium text-xl group-hover:text-amber-500 transition-colors">
            {char.nick}
          </h3>
          <p className="text-zinc-500 text-sm mt-0.5">
            {class1}{class2 ? ` · ${class2}` : ''}
          </p>
        </div>
        {char.hasGuild && (
          <span className="text-xs text-zinc-400 bg-zinc-800 px-3 py-1 rounded-full border border-zinc-700">
            {char.guild || 'Guild'}
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="bg-zinc-800/50 rounded-xl p-3">
          <p className="text-zinc-500 text-xs mb-2 uppercase tracking-wide">Selo</p>
          <div className="flex flex-col gap-1">
            <p className="text-zinc-300 text-xs">
              11th {seal.class1Has11th ? <span className="text-amber-500">✓</span> : <span className="text-zinc-600">✗</span>}
              {' '}12th {seal.class1Has12th ? <span className="text-amber-500">✓</span> : <span className="text-zinc-600">✗</span>}
            </p>
            <p className="text-zinc-300 text-xs">
              Nível {seal.class1Level || '—'}
            </p>
            {seal.mantleType && (
              <p className="text-zinc-400 text-xs">
                Capa: {seal.mantleType} {seal.mantleRefinement ? `+${seal.mantleRefinement}` : ''}
              </p>
            )}
          </div>
        </div>

        <div className="bg-zinc-800/50 rounded-xl p-3">
          <p className="text-zinc-500 text-xs mb-2 uppercase tracking-wide">Conta</p>
          <div className="flex flex-col gap-1">
            {gear.cytheraType && (
              <p className="text-zinc-300 text-xs">
                Cythera: {gear.cytheraType} {gear.cytheraRefinement ? `+${gear.cytheraRefinement}` : ''}
              </p>
            )}
            {gear.amulet1Type && (
              <p className="text-zinc-400 text-xs">
                Amuleto 1: {gear.amulet1Type} +{gear.amulet1Refinement ?? 0}
              </p>
            )}
            {gear.necklaceRefinement > 0 && (
              <p className="text-zinc-400 text-xs">
                Colar: T{gear.necklaceItemTier} +{gear.necklaceRefinement}
              </p>
            )}
            {!gear.cytheraType && !gear.amulet1Type && (
              <p className="text-zinc-600 text-xs">Não configurado</p>
            )}
          </div>
        </div>

        <div className="bg-zinc-800/50 rounded-xl p-3">
          <p className="text-zinc-500 text-xs mb-2 uppercase tracking-wide">Itens</p>
          <div className="flex flex-col gap-1">
            {items.weaponType && (
              <p className="text-zinc-300 text-xs">
                Arma: {items.weaponType} +{items.weaponRefinement ?? 0}
                {items.weaponAncient ? ' Anct' : ''}
              </p>
            )}
            {items.chestType && (
              <p className="text-zinc-400 text-xs">
                Peito: {items.chestType} +{items.chestRefinement ?? 0}
              </p>
            )}
            {items.mountType && (
              <p className="text-zinc-400 text-xs">
                {items.mountType.replace(/_/g, ' ')} {items.mountLevel ? `Nv${items.mountLevel}` : ''}
              </p>
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
  const [creating, setCreating] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [nick, setNick] = useState('')
  const [guild, setGuild] = useState('')
  const [hasGuild, setHasGuild] = useState(false)

  useEffect(() => {
    characterApi.list().then(({ data }) => {
      setCharacters(data)
      setLoading(false)
    })
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)
    try {
      const { data } = await characterApi.create({ nick, guild: guild || undefined, hasGuild })
      setCharacters(prev => [...prev, data])
      setShowForm(false)
      setNick('')
      setGuild('')
    } finally {
      setCreating(false)
    }
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
            />
          ))}
        </div>
      )}
    </main>
  )
}
