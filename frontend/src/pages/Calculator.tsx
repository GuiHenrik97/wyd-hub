import { useEffect, useState } from 'react'
import { calculatorApi } from '../api/calculator.api'
import { useAuthStore } from '../store/auth.store'

const CATEGORIES = [
  { key: 'ARMOR', label: 'Armaduras e Armas' },
  { key: 'CYTHERA', label: 'Cytheras' },
  { key: 'ACCESSORY', label: 'Acessórios' },
  { key: 'MANTLE', label: 'Capa' },
  { key: 'MOUNT', label: 'Montarias' },
]

const CATEGORY_FILTERS: Record<string, string[]> = {
  ARMOR: ['MORTAL', 'ARCH', 'CELESTIAL', 'RD', 'BAHAMUT'],
  CYTHERA: ['MISTICA', 'ARCANA', 'AMUNRA', 'BAHAMUT', 'ANUBIS'],
  ACCESSORY: ['AMUNRA', 'BAHAMUT', 'ANCIENT'],
  MANTLE: ['CELESTIAL', 'BAHAMUT'],
  MOUNT: ['MONTARIA', 'JACKAL'],
}

const TIER_ORDER_ARMOR: Record<string, number> = {
  MORTAL: 1, ARCH: 2, CELESTIAL: 3, RD: 4, BAHAMUT: 5, ANCIENT: 6,
}

const TIER_ORDER_CYTHERA: Record<string, number> = {
  MISTICA: 1, ARCANA: 2, AMUNRA: 3, BAHAMUT: 4, ANUBIS: 5,
}

const TIER_ORDER_ACCESSORY: Record<string, number> = {
  AMUNRA: 1, BAHAMUT: 2, ANCIENT: 3,
}

const TIER_ORDER_MANTLE: Record<string, number> = {
  CELESTIAL: 1, BAHAMUT: 2,
}

const TIER_ORDER_MOUNT: Record<string, number> = {
  MONTARIA: 1, JACKAL: 2,
}

const TIER_ORDER_BY_CATEGORY: Record<string, Record<string, number>> = {
  ARMOR: TIER_ORDER_ARMOR,
  CYTHERA: TIER_ORDER_CYTHERA,
  ACCESSORY: TIER_ORDER_ACCESSORY,
  MANTLE: TIER_ORDER_MANTLE,
  MOUNT: TIER_ORDER_MOUNT,
}

function getProcessTiers(name: string): string[] {
  const n = name.toUpperCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

  // Anubis tem prioridade — criações de Anubis NÃO vão para BAHAMUT
  if (n.includes('ANUBIS')) return ['ANUBIS']

  // Mortal/Arch juntos aparecem nos dois filtros
  if (n.includes('MORTAL') && n.includes('ARCH')) return ['MORTAL', 'ARCH']

  // Criações de armadura — detecta pelo resultado
  if (n.includes('CRIACAO ARMADURA BAHAMUT') || (n.includes('RD') && n.includes('BAHAMUT'))) return ['BAHAMUT']
  if (n.includes('CRIACAO ITEM RD') || (n.includes('CELESTIAL') && n.includes('RD +9'))) return ['RD']
  if (n.includes('CRIACAO ITEM CELESTIAL') || n.includes('CRIACAO ARMA CELESTIAL')) return ['CELESTIAL']

  if (n.includes('ANCIENT')) return ['ANCIENT']
  if (n.includes('BAHAMUT')) return ['BAHAMUT']
  if (n.includes(' RD') || n.includes('RD ') || n.includes('/ARMA RD')) return ['RD']
  if (n.includes('CELESTIAL')) return ['CELESTIAL']
  if (n.includes(' ARCH') || n.includes('ARCH ') || n.includes('ARMADURA ARCH') || n.includes('ARMA ARCH')) return ['ARCH']
  if (n.includes('MORTAL')) return ['MORTAL']
  if (n.includes('ARCANA')) return ['ARCANA']
  if (n.includes('AMUNRA')) return ['AMUNRA']
  if (n.includes('MISTICA') || n.includes('MYSTICA')) return ['MISTICA']
  if (n.includes('JACKAL')) return ['JACKAL']
  if (n.includes('MONTARIA') || n.includes('NIVEL') || n.includes('QUALIDADE')) return ['MONTARIA']
  return ['OTHER']
}

function getProcessOrder(process: any): number {
  const tiers = getProcessTiers(process.name)
  const orderMap = TIER_ORDER_BY_CATEGORY[process.category] ?? {}
  const tierOrder = Math.min(...tiers.map(t => orderMap[t] ?? 99))
  const n = process.name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  const isCreation = n.includes('criacao') || n.includes('composicao') || n.includes('adicional')
  const level = process.fromLevel ?? 0
  return tierOrder * 10000 + (isCreation ? 0 : 1000) + level
}

function ProcessCard({ process, inventory }: { process: any; inventory: Record<string, number> }) {
  const [open, setOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const totalResources = process.resources.map((pr: any) => ({
    ...pr,
    totalQuantity: pr.isConsumedOnFail ? pr.quantity * quantity : pr.quantity,
  }))

  const consumed = process.resources.filter((pr: any) => pr.isConsumedOnFail)
  const possibleAttempts = consumed.length === 0 ? 0 : Math.min(
    ...consumed.map((pr: any) => {
      const have = inventory[pr.resource.id] ?? 0
      return Math.floor(have / pr.quantity)
    })
  )

  const hasInventory = Object.keys(inventory).length > 0

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-zinc-800/50 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className={`text-zinc-500 transition-transform shrink-0 ${open ? 'rotate-90' : ''}`}>▶</span>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium">{process.name}</p>
            {process.successRate && (
              <span className="text-xs text-amber-400">
                {(process.successRate * 100).toFixed(0)}% de sucesso
              </span>
            )}
          </div>
        </div>
        {hasInventory && (
          <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ml-3 ${
            possibleAttempts === 0
              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
          }`}>
            {possibleAttempts} tentativa{possibleAttempts !== 1 ? 's' : ''} disponível{possibleAttempts !== 1 ? 'is' : ''}
          </span>
        )}
      </button>

      {open && (
        <div className="px-5 pb-5 flex flex-col gap-4 border-t border-zinc-800">
          {process.notes && (
            <p className="text-zinc-500 text-xs leading-relaxed pt-3">{process.notes}</p>
          )}

          <div className="flex items-center gap-3">
            <span className="text-zinc-400 text-sm">Tentativas:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-7 h-7 rounded bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center"
              >−</button>
              <input
                type="number"
                min={1}
                value={quantity === 1 ? '' : quantity}
                placeholder="1"
                onFocus={e => e.target.select()}
                onChange={e => setQuantity(e.target.value === '' ? 1 : Math.max(1, Number(e.target.value)))}
                className="w-10 text-center bg-zinc-800 border border-zinc-700 rounded px-1 py-0.5 text-white text-sm focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-7 h-7 rounded bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center"
              >+</button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-zinc-500 text-xs uppercase tracking-wide">
              Materiais para {quantity} tentativa{quantity > 1 ? 's' : ''}
            </p>
            <div className="flex flex-wrap gap-2">
              {totalResources.map((pr: any) => {
                const have = inventory[pr.resource.id] ?? 0
                const enough = have >= pr.totalQuantity
                return (
                  <div
                    key={pr.resource.id}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border ${
                      !pr.isConsumedOnFail
                        ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                        : enough
                        ? 'bg-zinc-800 border-zinc-700 text-zinc-300'
                        : 'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}
                  >
                    <span className="font-medium">{pr.totalQuantity}x</span>
                    <span>{pr.resource.name}</span>
                    {hasInventory && pr.isConsumedOnFail && (
                      <span className={`ml-1 ${enough ? 'text-zinc-500' : 'text-red-500'}`}>
                        ({have} em estoque)
                      </span>
                    )}
                    {!pr.isConsumedOnFail && (
                      <span className="text-amber-600 ml-1">(não consome em falha)</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function Calculator() {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  const [processes, setProcesses] = useState<any[]>([])
  const [inventory, setInventory] = useState<Record<string, number>>({})
  const [allResources, setAllResources] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('ARMOR')
  const [search, setSearch] = useState('')
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showInventory, setShowInventory] = useState(false)
  const [inventorySearch, setInventorySearch] = useState('')

  useEffect(() => {
    const promises: Promise<any>[] = [calculatorApi.getProcesses(), calculatorApi.getResources()]
    if (isAuthenticated) promises.push(calculatorApi.getInventory())

    Promise.all(promises).then(([procRes, resRes, invRes]) => {
      setProcesses(procRes.data)
      setAllResources(resRes.data)
      if (invRes) {
        const inv: Record<string, number> = {}
        invRes.data.forEach((item: any) => { inv[item.resourceId] = item.quantity })
        setInventory(inv)
      }
      setLoading(false)
    })
  }, [isAuthenticated])

  const toggleFilter = (f: string) => {
    setActiveFilters(prev =>
      prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]
    )
  }

  const filtered = processes
    .filter(p => {
      if (p.category !== activeTab) return false
      const nameMatch = p.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .includes(
          search.toLowerCase()
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '')
        )
      if (!nameMatch) return false
      if (activeFilters.length === 0) return true
      const tiers = getProcessTiers(p.name)
      return activeFilters.some(f => tiers.includes(f))
    })
    .sort((a, b) => getProcessOrder(a) - getProcessOrder(b))

  if (loading) return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <p className="text-zinc-500">Carregando processos...</p>
    </main>
  )

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Calculadora</h1>
              <p className="text-zinc-400 mt-1 text-sm">
                Clique em um processo para ver os materiais necessários.{' '}
                <span className="text-amber-500">Itens em laranja não são consumidos em falha.</span>
              </p>
              {isAuthenticated && (
                <p className="text-zinc-500 text-xs mt-1">
                  Estoque baseado no seu{' '}
                  <a href="/app/inventario" className="text-amber-500 hover:text-amber-400 underline">inventário</a>.
                </p>
              )}
            </div>
            {isAuthenticated && (
              <button
                onClick={() => setShowInventory(v => !v)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-all shrink-0 ${
                  showInventory
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                    : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-amber-500/40 hover:text-white'
                }`}
              >
                <span>{showInventory ? '◀' : '▶'}</span>
                Inventário
              </button>
            )}
          </div>

          <div className="flex gap-1 mb-6 bg-zinc-900 p-1 rounded-lg overflow-x-auto">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => { setActiveTab(cat.key); setSearch(''); setActiveFilters([]) }}
                className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
                  activeTab === cat.key
                    ? 'bg-amber-500 text-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {CATEGORY_FILTERS[activeTab] && (
            <div className="flex flex-wrap gap-2 mb-4">
              {CATEGORY_FILTERS[activeTab].map(f => (
                <button
                  key={f}
                  onClick={() => toggleFilter(f)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                    activeFilters.includes(f)
                      ? 'bg-amber-500 text-black border-amber-500'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-amber-500/50 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}

          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar processo..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors text-sm"
            />
          </div>

          {filtered.length === 0 ? (
            <p className="text-zinc-600 text-sm">Nenhum processo encontrado.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {filtered.map(process => (
                <ProcessCard key={process.id} process={process} inventory={inventory} />
              ))}
            </div>
          )}
        </div>

        {isAuthenticated && showInventory && (
          <div className="w-72 shrink-0">
            <div className="sticky top-6 bg-zinc-900 border border-zinc-800 rounded-xl p-4 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-medium text-sm">Meu inventário</h2>
                <button
                  onClick={() => setShowInventory(false)}
                  className="text-zinc-600 hover:text-zinc-400 text-xs"
                >
                  ✕
                </button>
              </div>
              <input
                type="text"
                placeholder="Filtrar..."
                value={inventorySearch}
                onChange={e => setInventorySearch(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 text-xs mb-3"
              />
              <div className="flex flex-col gap-1">
                {Object.entries(inventory)
                  .filter(([id]) => {
                    if (!inventorySearch) return true
                    const resource = allResources.find((r: any) => r.id === id)
                    if (!resource) return false
                    return resource.name.toLowerCase()
                      .normalize('NFD').replace(/[̀-ͯ]/g, '')
                      .includes(inventorySearch.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''))
                  })
                  .filter(([, qty]) => qty > 0)
                  .sort(([idA], [idB]) => {
                    const nameA = allResources.find((r: any) => r.id === idA)?.name ?? ''
                    const nameB = allResources.find((r: any) => r.id === idB)?.name ?? ''
                    return nameA.localeCompare(nameB)
                  })
                  .map(([id, qty]) => {
                    const resource = allResources.find((r: any) => r.id === id)
                    if (!resource) return null
                    return (
                      <div key={id} className="flex items-center justify-between py-1.5 border-b border-zinc-800 last:border-0">
                        <span className="text-zinc-300 text-xs truncate mr-2">{resource.name}</span>
                        <span className="text-amber-400 text-xs font-medium shrink-0">{qty}</span>
                      </div>
                    )
                  })}
                {Object.values(inventory).every(v => v === 0) && (
                  <p className="text-zinc-600 text-xs text-center py-4">
                    Nenhum item no inventário ainda.{' '}
                    <a href="/app/inventario" className="text-amber-500 hover:text-amber-400">Cadastrar</a>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
