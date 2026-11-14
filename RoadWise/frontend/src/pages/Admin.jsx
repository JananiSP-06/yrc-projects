import { useEffect, useState } from 'react'
import { Lock, LogOut, Plus, Pencil, Trash2, Save, X } from 'lucide-react'
import { PageHero, Section } from '../components/ui'
import { Loading } from '../components/ApiStates'
import { setAuth, clearAuth, adminMe, adminStats, adminList, adminSave, adminDelete } from '../services/adminApi'

const SIGN_CATS = ['MANDATORY', 'CAUTIONARY', 'INFORMATORY']
const QUIZ_CATS = ['BASICS', 'TRAFFIC_RULES', 'HELMET_SEATBELT', 'PEDESTRIAN_SAFETY', 'SIGNALS_SIGNS', 'EMERGENCY', 'CONDITIONS', 'INCLUSIVE_SAFETY']
const TIP_CATS = ['HELMET', 'SEATBELT', 'PEDESTRIAN', 'CYCLING', 'DRIVING', 'GENERAL']
const CAMP_CATS = ['ROAD_SAFETY_MONTH', 'HELMET', 'PEDESTRIAN', 'SCHOOL', 'COMPETITION', 'COMMUNITY']

// One config per content type: which API paths to use, which form fields to show, and how to convert data both ways.
const RESOURCES = {
  signs: {
    label: 'Traffic signs', list: '/api/signs', write: '/api/admin/signs', title: i => i.name, sub: i => i.category,
    fields: [['name', 'Name'], ['category', 'Category', 'select', SIGN_CATS], ['description', 'Meaning', 'area'], ['imagePath', 'Image path (for example /assets/signs/stop.svg)'], ['safetyInstruction', 'What the road user should do', 'area']],
    empty: { name: '', category: 'MANDATORY', description: '', imagePath: '/assets/signs/', safetyInstruction: '' },
    toForm: i => ({ name: i.name, category: i.category, description: i.description, imagePath: i.imagePath, safetyInstruction: i.safetyInstruction }), toBody: f => f,
  },
  quizzes: {
    label: 'Quiz questions', list: '/api/admin/quizzes', write: '/api/admin/quizzes', title: i => i.question, sub: i => `${i.category} · ${i.difficulty}`,
    fields: [['question', 'Question', 'area'], ['category', 'Topic', 'select', QUIZ_CATS], ['difficulty', 'Level', 'select', ['EASY', 'MEDIUM', 'HARD']], ['options', 'Options (one per line, 2 to 6)', 'area'], ['correct', 'Number of the correct option (1 = first line)', 'number'], ['explanation', 'Explanation', 'area']],
    empty: { question: '', category: 'BASICS', difficulty: 'EASY', options: '', correct: '1', explanation: '' },
    toForm: i => ({ question: i.question, category: i.category, difficulty: i.difficulty, options: i.options.join('\n'), correct: String(i.correctOption + 1), explanation: i.explanation }),
    toBody: f => ({ question: f.question, category: f.category, difficulty: f.difficulty, options: f.options.split('\n').map(s => s.trim()).filter(Boolean), correctOption: Number(f.correct) - 1, explanation: f.explanation }),
  },
  tips: {
    label: 'Safety tips', list: '/api/tips', write: '/api/admin/tips', title: i => i.title, sub: i => i.category,
    fields: [['title', 'Title'], ['category', 'Category', 'select', TIP_CATS], ['description', 'Tip', 'area'], ['imagePath', 'Image path (optional)']],
    empty: { title: '', category: 'GENERAL', description: '', imagePath: '' },
    toForm: i => ({ title: i.title, category: i.category, description: i.description, imagePath: i.imagePath || '' }), toBody: f => f,
  },
  campaigns: {
    label: 'Campaigns', list: '/api/campaigns', write: '/api/admin/campaigns', title: i => i.title, sub: i => `${i.startDate} to ${i.endDate} · ${i.status}`,
    fields: [['title', 'Title'], ['category', 'Category', 'select', CAMP_CATS], ['description', 'Description', 'area'], ['startDate', 'Start date', 'date'], ['endDate', 'End date', 'date'], ['posterPath', 'Poster path (optional)']],
    empty: { title: '', category: 'COMMUNITY', description: '', startDate: '', endDate: '', posterPath: '' },
    toForm: i => ({ title: i.title, category: i.category, description: i.description, startDate: i.startDate, endDate: i.endDate, posterPath: i.posterPath || '' }), toBody: f => f,
  },
}
const input = 'w-full rounded-2xl border-2 border-navy/20 bg-white px-4 py-2.5 focus:border-navy outline-none'

function Login({ onDone }) {
  const [u, setU] = useState('admin'); const [p, setP] = useState(''); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false)
  async function submit(e) {
    e.preventDefault(); setBusy(true); setErr(''); setAuth(u, p)
    try { await adminMe(); onDone() } catch (x) { clearAuth(); setErr(x.status === 401 ? 'Wrong username or password.' : x.message) } finally { setBusy(false) }
  }
  return (<form onSubmit={submit} className="card max-w-md mx-auto grid gap-4">
    <Lock /><h2 className="text-2xl">Admin login</h2>
    <label className="grid gap-1 font-bold">Username<input className={input} value={u} onChange={e => setU(e.target.value)} autoComplete="username" required /></label>
    <label className="grid gap-1 font-bold">Password<input className={input} type="password" value={p} onChange={e => setP(e.target.value)} autoComplete="current-password" required /></label>
    {err && <p role="alert" className="text-red-700 font-bold">{err}</p>}
    <button className="btn-coral" disabled={busy}>{busy ? 'Checking…' : 'Log in'}</button>
    <p className="text-sm text-navy/70">Only RoadWise admins can change the learning content. Everyone else can read it on the public pages.</p>
  </form>)
}

function Panel({ id, onChanged }) {
  const r = RESOURCES[id]
  const [items, setItems] = useState(null); const [err, setErr] = useState(''); const [form, setForm] = useState(null); const [editId, setEditId] = useState(null); const [msg, setMsg] = useState(''); const [saving, setSaving] = useState(false)
  const load = () => { setItems(null); setErr(''); adminList(r.list).then(setItems).catch(e => setErr(e.message)) }
  useEffect(() => { setForm(null); setMsg(''); load() }, [id])
  const open = (item) => { setMsg(''); setEditId(item ? item.id : null); setForm(item ? r.toForm(item) : { ...r.empty }) }
  async function save(e) {
    e.preventDefault(); setSaving(true); setErr('')
    try { await adminSave(r.write, editId, r.toBody(form)); setForm(null); setMsg(editId ? 'Changes saved.' : 'Added.'); load(); onChanged() } catch (x) { setErr(x.message) } finally { setSaving(false) }
  }
  async function del(item) {
    if (!window.confirm(`Delete "${r.title(item)}"? This cannot be undone.`)) return
    try { await adminDelete(r.write, item.id); setMsg('Deleted.'); load(); onChanged() } catch (x) { setErr(x.message) }
  }
  return (<div>
    <div className="flex flex-wrap items-center justify-between gap-3 mb-4"><h3 className="text-2xl">{r.label}</h3><button className="btn-sun" onClick={() => open(null)}><Plus size={18} />Add new</button></div>
    {msg && <p role="status" className="mb-3 font-bold text-green-800">{msg}</p>}
    {err && <p role="alert" className="mb-3 font-bold text-red-700">{err}</p>}
    {form && <form onSubmit={save} className="card mb-6 grid gap-3 bg-sky/30">
      <h4 className="text-xl">{editId ? 'Edit' : 'Add'} {r.label.toLowerCase()}</h4>
      {r.fields.map(([k, label, type, opts]) => (<label key={k} className="grid gap-1 font-bold">{label}
        {type === 'select' ? <select className={input} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })}>{opts.map(o => <option key={o}>{o}</option>)}</select>
          : type === 'area' ? <textarea className={input} rows={k === 'options' ? 5 : 3} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} required />
          : <input className={input} type={type || 'text'} min={type === 'number' ? 1 : undefined} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} required={!/optional/.test(label)} />}</label>))}
      <div className="flex gap-3"><button className="btn-coral" disabled={saving}><Save size={18} />{saving ? 'Saving…' : 'Save'}</button><button type="button" className="btn-white" onClick={() => setForm(null)}><X size={18} />Cancel</button></div>
    </form>}
    {!items && !err && <Loading />}
    {items && items.length === 0 && <p className="card">Nothing here yet. Use “Add new”.</p>}
    {items && <ul className="grid gap-3">{items.map(i => (<li key={i.id} className="card !p-4 flex items-center gap-3 justify-between">
      <div className="min-w-0"><p className="font-bold truncate">{r.title(i)}</p><p className="text-sm text-navy/70">{r.sub(i)}</p></div>
      <div className="flex gap-2 shrink-0"><button className="btn-white !p-0 w-11 h-11" aria-label={`Edit ${r.title(i)}`} onClick={() => open(i)}><Pencil size={18} /></button><button className="btn-white !p-0 w-11 h-11" aria-label={`Delete ${r.title(i)}`} onClick={() => del(i)}><Trash2 size={18} /></button></div></li>))}</ul>}
  </div>)
}

export default function Admin() {
  const [ok, setOk] = useState(false); const [tab, setTab] = useState('signs'); const [stats, setStats] = useState(null)
  const refresh = () => adminStats().then(setStats).catch(() => {})
  useEffect(() => { if (ok) refresh() }, [ok])
  const logout = () => { clearAuth(); setOk(false); setStats(null) }
  return (<>
    <PageHero title="Admin" intro="Add or update signs, quiz questions, tips and campaigns." who="ravi" color="bg-lav/60" />
    <Section>
      {!ok ? <Login onDone={() => setOk(true)} /> : (<>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex flex-wrap gap-3">{stats && [['Signs', stats.signs], ['Questions', stats.quizQuestions], ['Tips', stats.tips], ['Campaigns', stats.campaigns], ['Pledges', stats.pledges]].map(([l, n]) => <div key={l} className="card !p-3 text-center min-w-[96px]"><p className="font-display text-3xl font-extrabold text-coral">{n}</p><p className="text-sm font-bold">{l}</p></div>)}</div>
          <button className="btn-white" onClick={logout}><LogOut size={18} />Log out</button></div>
        <div role="tablist" className="flex flex-wrap gap-2 mb-6">{Object.entries(RESOURCES).map(([k, v]) => <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={tab === k ? 'btn-sun' : 'btn-white'}>{v.label}</button>)}</div>
        <Panel id={tab} onChanged={refresh} />
      </>)}
    </Section>
  </>)
}