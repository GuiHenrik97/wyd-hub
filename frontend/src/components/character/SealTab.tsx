import { useState } from 'react'
import { characterApi } from '../../api/character.api'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

const CLASS_OPTIONS = ['TK', 'FM', 'BM', 'HT']
const MANTLE_OPTIONS = ['CELESTIAL', 'BAHAMUT']

export function SealTab({ character }: { character: any }) {
  const seal = character.seal ?? {}
  const [form, setForm] = useState({
    bodyClass: seal.bodyClass ?? 'TK',
    class1Type: seal.class1Type ?? 'TK',
    class1Lineage: seal.class1Lineage ?? '',
    class1Level: seal.class1Level ?? 0,
    class1Has11th: seal.class1Has11th ?? false,
    class1Has12th: seal.class1Has12th ?? false,
    class1Spectral: seal.class1Spectral ?? false,
    class1Concentration: seal.class1Concentration ?? false,
    class1Resurrection: seal.class1Resurrection ?? false,
    class2Type: seal.class2Type ?? '',
    class2Lineage: seal.class2Lineage ?? '',
    class2Level: seal.class2Level ?? 0,
    class2Has11th: seal.class2Has11th ?? false,
    class2Has12th: seal.class2Has12th ?? false,
    class2Spectral: seal.class2Spectral ?? false,
    class2Concentration: seal.class2Concentration ?? false,
    class2Resurrection: seal.class2Resurrection ?? false,
    mantleType: seal.mantleType ?? '',
    mantleRefinement: seal.mantleRefinement ?? 0,
    mantleAdditional: seal.mantleAdditional ?? '',
    mantleTier: seal.mantleTier ?? 0,
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const set = (key: string, value: any) => setForm(prev => ({ ...prev, [key]: value }))

  const handleSave = async () => {
    setSaving(true)
    const data: any = { ...form }
    if (!data.class2Type) { delete data.class2Type; delete data.class2Lineage; delete data.class2Level }
    if (!data.mantleType) { delete data.mantleType; delete data.mantleRefinement; delete data.mantleAdditional; delete data.mantleTier }
    await characterApi.updateSeal(character.id, data)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4">
        <h2 className="text-white font-medium">Corpo</h2>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-zinc-400">Classe do corpo</label>
          <select value={form.bodyClass} onChange={e => set('bodyClass', e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-500">
            {CLASS_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {[1, 2].map(side => {
        const prefix = `class${side}` as 'class1' | 'class2'
        const isOptional = side === 2
        return (
          <div key={side} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4">
            <h2 className="text-white font-medium">Lado {side} {isOptional && <span className="text-zinc-500 text-sm font-normal">(opcional)</span>}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-zinc-400">Classe</label>
                <select value={(form as any)[`${prefix}Type`]} onChange={e => set(`${prefix}Type`, e.target.value)}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-500">
                  {isOptional && <option value="">— Nenhuma —</option>}
                  {CLASS_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <Input label="Linhagem" placeholder="ex: HT Sobrevivência"
                value={(form as any)[`${prefix}Lineage`]} onChange={e => set(`${prefix}Lineage`, e.target.value)} />
            </div>
            <Input label="Nível" type="number" min={0} placeholder="0"
              value={(form as any)[`${prefix}Level`] === 0 ? '' : (form as any)[`${prefix}Level`]}
              onFocus={e => e.target.select()}
              onChange={e => set(`${prefix}Level`, e.target.value === '' ? 0 : Number(e.target.value))} />
            <div className="flex flex-col gap-2">
              <label className="text-sm text-zinc-400">Skills</label>
              <div className="flex flex-wrap gap-4">
                {['Has11th', 'Has12th'].map(skill => (
                  <label key={skill} className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
                    <input type="checkbox" className="accent-amber-500"
                      checked={(form as any)[`${prefix}${skill}`]}
                      onChange={e => set(`${prefix}${skill}`, e.target.checked)} />
                    {skill === 'Has11th' ? '11th Skill' : '12th Skill'}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-zinc-400">Sephira</label>
              <div className="flex flex-wrap gap-4">
                {['Spectral', 'Concentration', 'Resurrection'].map(s => (
                  <label key={s} className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
                    <input type="checkbox" className="accent-amber-500"
                      checked={(form as any)[`${prefix}${s}`]}
                      onChange={e => set(`${prefix}${s}`, e.target.checked)} />
                    {s === 'Spectral' ? 'Espectral' : s === 'Concentration' ? 'Concentração' : 'Ressurreição'}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )
      })}

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4">
        <h2 className="text-white font-medium">Capa</h2>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-zinc-400">Tipo</label>
          <select value={form.mantleType} onChange={e => set('mantleType', e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-500">
            <option value="">— Nenhuma —</option>
            {MANTLE_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        {form.mantleType && (
          <div className="grid grid-cols-2 gap-4">
            <Input label="Refinação" type="number" min={0} max={15} placeholder="0"
              value={form.mantleRefinement === 0 ? '' : form.mantleRefinement}
              onFocus={e => e.target.select()}
              onChange={e => set('mantleRefinement', e.target.value === '' ? 0 : Number(e.target.value))} />
            {form.mantleType === 'CELESTIAL'
              ? <Input label="Adicional" placeholder="Ex: Atk/Def PvP, Imu, Atk PvP" value={form.mantleAdditional} onChange={e => set('mantleAdditional', e.target.value)} />
              : <Input label="Tier" type="number" min={0} max={5} placeholder="0"
                  value={form.mantleTier === 0 ? '' : form.mantleTier}
                  onFocus={e => e.target.select()}
                  onChange={e => set('mantleTier', e.target.value === '' ? 0 : Number(e.target.value))} />
            }
          </div>
        )}
      </div>

      <Button onClick={handleSave} loading={saving} className="w-full py-3">
        {saved ? '✓ Salvo!' : 'Salvar Selo'}
      </Button>
    </div>
  )
}
