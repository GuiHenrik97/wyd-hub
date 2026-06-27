import { useState } from 'react'
import { characterApi } from '../../api/character.api'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

const EQUIP_OPTIONS = ['MORTAL', 'ARCH', 'CELESTIAL', 'RD', 'BAHAMUT']
const WEAPON_OPTIONS = ['MORTAL', 'ARCH', 'CELESTIAL', 'RD']
const MOUNT_OPTIONS = ['TF', 'DV', 'DL', 'CHACAL_AZUL', 'CHACAL_VERMELHO', 'JACKAL_BLAZEBORN', 'JACKAL_FROSTBORN']
const SUIT_OPTIONS = ['S1200', 'S1300', 'S1400']
const REFINE = Array.from({ length: 16 }, (_, i) => i)

const SLOT_LABELS: Record<string, string> = {
  helmet: 'Capacete / Cythera',
  chest: 'Peito',
  pants: 'Calça',
  gloves: 'Luva',
  boots: 'Bota',
}

function RefineSelect({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-zinc-400">{label}</label>
      <select value={value} onChange={e => onChange(Number(e.target.value))}
        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500">
        {REFINE.map(r => <option key={r} value={r}>+{r}</option>)}
      </select>
    </div>
  )
}

export function ItemsTab({ character }: { character: any }) {
  const items = character.itemSet ?? {}
  const [form, setForm] = useState({
    suit: items.suit ?? '',
    helmetType: items.helmetType ?? '',
    helmetRefinement: items.helmetRefinement ?? 0,
    helmetAdditional: items.helmetAdditional ?? '',
    chestType: items.chestType ?? '',
    chestRefinement: items.chestRefinement ?? 0,
    chestAdditional: items.chestAdditional ?? '',
    pantsType: items.pantsType ?? '',
    pantsRefinement: items.pantsRefinement ?? 0,
    pantsAdditional: items.pantsAdditional ?? '',
    glovesType: items.glovesType ?? '',
    glovesRefinement: items.glovesRefinement ?? 0,
    glovesAdditional: items.glovesAdditional ?? '',
    bootsType: items.bootsType ?? '',
    bootsRefinement: items.bootsRefinement ?? 0,
    bootsAdditional: items.bootsAdditional ?? '',
    weaponType: items.weaponType ?? '',
    weaponRefinement: items.weaponRefinement ?? 0,
    weaponAdditional: items.weaponAdditional ?? '',
    weaponAncient: items.weaponAncient ?? false,
    weapon2Type: items.weapon2Type ?? '',
    weapon2Refinement: items.weapon2Refinement ?? 0,
    weapon2Additional: items.weapon2Additional ?? '',
    weapon2Ancient: items.weapon2Ancient ?? false,
    mountType: items.mountType ?? '',
    mountLevel: items.mountLevel ?? 0,
    mountVitality: items.mountVitality ?? 0,
    mountQuality: items.mountQuality ?? 0,
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const set = (key: string, value: any) => setForm(prev => ({ ...prev, [key]: value }))

  const handleSave = async () => {
    setSaving(true)
    await characterApi.updateItemSet(character.id, form)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4">
        <h2 className="text-white font-medium">Traje</h2>
        <select value={form.suit} onChange={e => set('suit', e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-500">
          <option value="">— Nenhum —</option>
          {SUIT_OPTIONS.map(s => <option key={s} value={s}>{s.replace('S', '')}</option>)}
        </select>
      </div>

      {(['helmet', 'chest', 'pants', 'gloves', 'boots'] as const).map(slot => (
        <div key={slot} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4">
          <h2 className="text-white font-medium">{SLOT_LABELS[slot]}</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-zinc-400">Tipo</label>
              <select value={form[`${slot}Type`]} onChange={e => set(`${slot}Type`, e.target.value)}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500">
                <option value="">— Nenhum —</option>
                {EQUIP_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <RefineSelect label="Refinação" value={form[`${slot}Refinement`]} onChange={v => set(`${slot}Refinement`, v)} />
          </div>
          <Input label="Adicional (BS/base)" placeholder="ex: 120 Defesa" value={form[`${slot}Additional`]} onChange={e => set(`${slot}Additional`, e.target.value)} />
        </div>
      ))}

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4">
        <h2 className="text-white font-medium">Arma</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-400">Tipo</label>
            <select value={form.weaponType} onChange={e => set('weaponType', e.target.value)}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500">
              <option value="">— Nenhuma —</option>
              {WEAPON_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <RefineSelect label="Refinação" value={form.weaponRefinement} onChange={v => set('weaponRefinement', v)} />
        </div>
        <Input label="Adicional (BS/base)" placeholder="ex: Gram +9" value={form.weaponAdditional} onChange={e => set('weaponAdditional', e.target.value)} />
        <label className={`flex items-center gap-2 text-sm cursor-pointer ${form.weaponRefinement < 9 ? 'opacity-40 cursor-not-allowed' : 'text-zinc-300'}`}>
          <input type="checkbox" className="accent-amber-500" disabled={form.weaponRefinement < 9}
            checked={form.weaponAncient} onChange={e => set('weaponAncient', e.target.checked)} />
          Ancient <span className="text-zinc-500">(requer +9)</span>
        </label>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4">
        <h2 className="text-white font-medium">Arma 2 <span className="text-zinc-500 text-sm font-normal">(opcional — armas de 1 mão)</span></h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-400">Tipo</label>
            <select value={form.weapon2Type} onChange={e => set('weapon2Type', e.target.value)}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500">
              <option value="">— Nenhuma —</option>
              {WEAPON_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <RefineSelect label="Refinação" value={form.weapon2Refinement} onChange={v => set('weapon2Refinement', v)} />
        </div>
        <Input label="Adicional (BS/base)" placeholder="ex: Gram +9" value={form.weapon2Additional} onChange={e => set('weapon2Additional', e.target.value)} />
        <label className={`flex items-center gap-2 text-sm cursor-pointer ${form.weapon2Refinement < 9 ? 'opacity-40 cursor-not-allowed' : 'text-zinc-300'}`}>
          <input type="checkbox" className="accent-amber-500" disabled={form.weapon2Refinement < 9}
            checked={form.weapon2Ancient} onChange={e => set('weapon2Ancient', e.target.checked)} />
          Ancient <span className="text-zinc-500">(requer +9)</span>
        </label>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4">
        <h2 className="text-white font-medium">Montaria</h2>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-zinc-400">Tipo</label>
          <select value={form.mountType} onChange={e => set('mountType', e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-500">
            <option value="">— Nenhuma —</option>
            {MOUNT_OPTIONS.map(m => <option key={m} value={m}>{m.replace(/_/g, ' ')}</option>)}
          </select>
        </div>
        {form.mountType && (
          <div className="grid grid-cols-3 gap-4">
            <Input label="Nível" type="number" min={0} max={200} value={form.mountLevel} onChange={e => set('mountLevel', Number(e.target.value))} />
            <Input label="Vitalidade" type="number" min={0} max={60} value={form.mountVitality} onChange={e => set('mountVitality', Number(e.target.value))} />
            <Input label="Qualidade" type="number" min={0} max={70} value={form.mountQuality} onChange={e => set('mountQuality', Number(e.target.value))} />
          </div>
        )}
      </div>

      <Button onClick={handleSave} loading={saving} className="w-full py-3">
        {saved ? '✓ Salvo!' : 'Salvar Itens'}
      </Button>
    </div>
  )
}
