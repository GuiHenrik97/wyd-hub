import { useEffect, useState, useCallback, useRef } from 'react'
import { calculatorApi } from '../../api/calculator.api'

const CATEGORY_LABELS: Record<string, string> = {
  POWDER: 'Pós',
  CRYSTAL: 'Cristais',
  STONE: 'Pedras',
  EMBLEM: 'Emblemas',
  MEDAL: 'Medalhas',
  DRAGON: 'Dragão',
  BAHAMUT: 'Bahamut',
  TEAR: 'Lágrimas',
  CYTHERA: 'Cythera',
  PARCHMENT: 'Pergaminhos',
  MANTLE: 'Capa',
  MOUNT: 'Montaria',
  COIN: 'Moedas',
  OTHER: 'Outros',
}

const CATEGORY_ORDER = ['POWDER', 'CRYSTAL', 'STONE', 'EMBLEM', 'MEDAL', 'DRAGON', 'BAHAMUT', 'TEAR', 'CYTHERA', 'PARCHMENT', 'MANTLE', 'MOUNT', 'COIN', 'OTHER']

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

export function Inventory() {
  const [resources, setResources] = useState<any[]>([])
  const [processes, setProcesses] = useState<any[]>([])
  const [inventory, setInventory] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [processSearch, setProcessSearch] = useState('')
  const [matchedResources, setMatchedResources] = useState<Set<string>>(new Set())

  useEffect(() => {
    Promise.all([
      calculatorApi.getResources(),
      calculatorApi.getInventory(),
      calculatorApi.getProcesses(),
    ]).then(([resRes, invRes, procRes]) => {
      setResources(resRes.data)
      setProcesses(procRes.data)
      const inv: Record<string, number> = {}
      invRes.data.forEach((item: any) => {
        inv[item.resourceId] = item.quantity
      })
      setInventory(inv)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!processSearch.trim()) {
      setMatchedResources(new Set())
      return
    }
    const norm = (s: string) =>
      s.toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')

    const searchTerms = norm(processSearch).split(/\s+/).filter(Boolean)

    const matched = processes.filter(p => {
      const normalizedName = norm(p.name)
      return searchTerms.every(term => normalizedName.includes(term))
    })

    const resourceIds = new Set<string>()
    matched.forEach(p =>
      p.resources?.forEach((pr: any) => resourceIds.add(pr.resource?.id ?? pr.resourceId))
    )
    setMatchedResources(resourceIds)
  }, [processSearch, processes])

  const timeouts = useRef<Record<string, ReturnType<typeof setTimeout>>>({})

  const handleQuantityChange = useCallback((resourceId: string, quantity: number) => {
    setInventory(prev => ({ ...prev, [resourceId]: quantity }))
    setSaving(resourceId)

    if (timeouts.current[resourceId]) clearTimeout(timeouts.current[resourceId])

    timeouts.current[resourceId] = setTimeout(async () => {
      await calculatorApi.updateInventory(resourceId, quantity)
      setSaving(null)
    }, 600)
  }, [])

  const grouped = CATEGORY_ORDER.reduce((acc, cat) => {
    const items = resources.filter(r => r.category === cat)
    if (items.length > 0) acc[cat] = items
    return acc
  }, {} as Record<string, any[]>)

  const filtered = Object.entries(grouped).reduce((acc, [cat, items]) => {
    let filteredItems = items
    if (matchedResources.size > 0) {
      filteredItems = items.filter(r => matchedResources.has(r.id))
    } else if (search) {
      filteredItems = items.filter(r => norm(r.name).includes(norm(search)))
    }
    if (filteredItems.length > 0) acc[cat] = filteredItems
    return acc
  }, {} as Record<string, any[]>)

  if (loading) return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <p className="text-zinc-500">Carregando inventário...</p>
    </main>
  )

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Inventário</h1>
        <p className="text-zinc-400 mt-1 text-sm">
          Cadastre seus recursos para calcular tentativas automaticamente.
          <span className="text-zinc-600"> 🔒 = item imóvel entre contas.</span>
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <input
          type="text"
          placeholder="Buscar recurso por nome..."
          value={search}
          onChange={e => { setSearch(e.target.value); setProcessSearch('') }}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors text-sm"
        />
        <input
          type="text"
          placeholder="Buscar por processo (ex: Refinação Celestial +11)..."
          value={processSearch}
          onChange={e => { setProcessSearch(e.target.value); setSearch('') }}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors text-sm"
        />
        {matchedResources.size > 0 && (
          <p className="text-zinc-500 text-xs">
            Mostrando {matchedResources.size} recursos do processo encontrado
          </p>
        )}
      </div>

      <div className="flex flex-col gap-8">
        {Object.entries(filtered).map(([cat, items]) => (
          <div key={cat}>
            <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-3">
              {CATEGORY_LABELS[cat] ?? cat}
            </h2>
            <div className="flex flex-col gap-2">
              {items.map(resource => (
                <div
                  key={resource.id}
                  className={`flex items-center justify-between border rounded-xl px-4 py-3 gap-4 transition-all ${
                    matchedResources.has(resource.id)
                      ? 'bg-amber-500/5 border-amber-500/30'
                      : 'bg-zinc-900 border-zinc-800'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-white text-sm truncate">{resource.name}</span>
                    {!resource.mobile && (
                      <span className="text-zinc-600 text-xs shrink-0">🔒</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {saving === resource.id && (
                      <span className="text-zinc-600 text-xs">salvando...</span>
                    )}
                    <input
                      type="number"
                      min={0}
                      value={inventory[resource.id] === 0 || inventory[resource.id] === undefined ? '' : inventory[resource.id]}
                      placeholder="0"
                      onFocus={e => e.target.select()}
                      onChange={e => handleQuantityChange(resource.id, e.target.value === '' ? 0 : Number(e.target.value))}
                      className="w-24 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-white text-sm text-right focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
