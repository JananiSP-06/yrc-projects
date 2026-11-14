import { useMemo, useState } from 'react'
import { Search, Layers, Shuffle, X, RotateCw } from 'lucide-react'
import { PageHero, Section } from '../components/ui'
import Sign from '../components/Signs'
import Character from '../components/Characters'
import useSigns from '../hooks/useSigns'
import { Loading, ErrorState, EmptyState, OfflineNote } from '../components/ApiStates'

const CATS = ['All', 'Mandatory', 'Cautionary', 'Informatory']
const tone = { Mandatory: 'bg-coral/40', Cautionary: 'bg-sun', Informatory: 'bg-sky' }
const label = { Mandatory: 'Mandatory and Regulatory', Cautionary: 'Cautionary', Informatory: 'Informatory' }
const shuffle = a => [...a].sort(() => Math.random() - .5)

function Detail({ s, onClose }) {
  return (<div className="fixed inset-0 z-50 grid place-items-center p-4 bg-navy/50" role="dialog" aria-modal="true" aria-label={s.name} onClick={onClose}>
    <div className="card max-w-md w-full relative" onClick={e => e.stopPropagation()}>
      <button className="absolute top-3 right-3 btn-white !p-0 w-10 h-10 !min-h-0" onClick={onClose} aria-label="Close"><X size={18} /></button>
      <div className="flex justify-center"><Sign k={s.k} size={150} /></div>
      <span className={`chip ${tone[s.cat]} mt-3`}>{label[s.cat]}</span><h3 className="text-3xl mt-1">{s.name}</h3>
      <p className="mt-2"><b>Meaning:</b> {s.mean}</p><p className="mt-1"><b>What to do:</b> {s.do}</p>
      <div className="mt-4 flex items-center gap-3"><Character who="ravi" size={50} /><p className="text-sm font-semibold">Officer Ravi: Learn the shape and colour first. They tell you the sign type.</p></div>
    </div></div>)
}
function Flashcards({ list }) {
  const [i, setI] = useState(0); const [flip, setFlip] = useState(false); const s = list[i % list.length]
  const go = d => { setFlip(false); setI((i + d + list.length) % list.length) }
  return (<div className="max-w-md mx-auto text-center">
    <button onClick={() => setFlip(!flip)} className="card w-full min-h-[300px] flex flex-col items-center justify-center bg-white" aria-label="Flip card">
      {flip ? <><h3 className="text-2xl">{s.name}</h3><p className="mt-2">{s.mean}</p><p className="mt-2 font-bold">{s.do}</p></> : <><Sign k={s.k} size={170} /><p className="mt-3 text-navy/70 font-bold flex items-center gap-1"><RotateCw size={16} />Tap to see the answer</p></>}</button>
    <div className="flex justify-between items-center mt-4"><button className="btn-white" onClick={() => go(-1)}>Previous</button><span className="font-bold">{(i % list.length) + 1} / {list.length}</span><button className="btn-coral" onClick={() => go(1)}>Next</button></div></div>)
}
function Challenge({ list }) {
  return list.length < 4 ? <EmptyState title="Not enough signs yet" text="The challenge needs at least four signs." /> : <ChallengeInner list={list} />
}
function ChallengeInner({ list }) {
  const [round, setRound] = useState(0); const [pick, setPick] = useState(null); const [score, setScore] = useState([0, 0])
  const q = useMemo(() => { const a = shuffle(list)[0]; return { a, opts: shuffle([a, ...shuffle(list.filter(x => x.k !== a.k)).slice(0, 3)]) } }, [round, list])
  const choose = o => { if (pick) return; setPick(o); setScore(([r, t]) => [r + (o.k === q.a.k ? 1 : 0), t + 1]) }
  return (<div className="card bg-white max-w-2xl mx-auto text-center">
    <p className="font-bold">Score: {score[0]} / {score[1]}</p><div className="flex justify-center my-3"><Sign k={q.a.k} size={140} /></div>
    <h3 className="text-2xl mb-3">What does this sign mean?</h3>
    <div className="grid sm:grid-cols-2 gap-2">{q.opts.map(o => <button key={o.k} onClick={() => choose(o)} className={`rounded-2xl border-2 px-4 py-3 font-bold min-h-[48px] ${!pick ? 'border-navy/20 hover:bg-sky/50' : o.k === q.a.k ? 'bg-mint border-green-700' : o.k === pick.k ? 'bg-coral/40 border-red-700' : 'opacity-50 border-navy/10'}`}>{o.name}</button>)}</div>
    {pick && <div role="status" className="mt-4"><p className="font-bold">{pick.k === q.a.k ? 'Correct!' : `Not quite. It is "${q.a.name}".`} {q.a.mean}</p><button className="btn-coral mt-3" onClick={() => { setPick(null); setRound(r => r + 1) }}><Shuffle size={18} />Next sign</button></div>}</div>)
}
export default function Signs() {
  const { signs: SIGNS, loading, error, offline, reload } = useSigns()
  const [q, setQ] = useState(''); const [cat, setCat] = useState('All'); const [sel, setSel] = useState(null); const [mode, setMode] = useState('grid')
  const list = SIGNS.filter(s => (cat === 'All' || s.cat === cat) && s.name.toLowerCase().includes(q.toLowerCase()))
  return (<>
    <PageHero title="Traffic Signs Learning Centre" intro="Signs speak without words. Learn their shapes, colours and meanings." who="ravi" color="bg-coral/40" crumb="Traffic Signs" />
    {loading ? <Section><Loading label="Loading traffic signs…" /></Section> : error ? <Section><ErrorState error={error} onRetry={reload} /></Section> : SIGNS.length === 0 ? <Section><EmptyState title="No signs yet" text="The sign library is empty. Please check back soon." /></Section> : <>
    <Section>
      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        <div className="card !p-4 bg-coral/20 text-sm"><b>Red ring:</b> Mandatory. You must obey.</div><div className="card !p-4 bg-sun/60 text-sm"><b>Red triangle:</b> Cautionary. Be careful.</div><div className="card !p-4 bg-sky/60 text-sm"><b>Blue rectangle:</b> Informatory. Useful information.</div></div>
      <div className="flex flex-wrap gap-2 mb-5">{[['grid', 'Browse', Search], ['cards', 'Flashcards', Layers]].map(([m, l, I]) => <button key={m} onClick={() => setMode(m)} aria-pressed={mode === m} className={`btn !py-2 ${mode === m ? 'bg-coral' : 'bg-white'}`}><I size={18} />{l}</button>)}</div>
      <div className="flex flex-wrap gap-3 items-center mb-6">
        <label className="relative flex-1 min-w-[220px]"><span className="sr-only">Search signs</span><Search className="absolute left-4 top-1/2 -translate-y-1/2" size={18} /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search signs by name" className="w-full rounded-full border-2 border-navy/30 bg-white pl-11 pr-4 py-3 min-h-[48px]" /></label>
        <div className="flex flex-wrap gap-2">{CATS.map(c => <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`chip !py-2 !text-base ${cat === c ? '!bg-sun !border-navy' : ''}`}>{c}</button>)}</div></div>
      {mode === 'cards' ? <Flashcards list={list.length ? list : SIGNS} /> : list.length === 0 ? (
        <div className="card text-center bg-white"><Character who="sam" size={90} className="mx-auto" /><h3 className="text-2xl">No signs found</h3><p>Try a different name or choose "All".</p><button className="btn-coral mt-3" onClick={() => { setQ(''); setCat('All') }}>Clear search</button></div>
      ) : <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">{list.map(s => (
        <button key={s.id ?? s.k} onClick={() => setSel(s)} className="card !p-4 text-left hover:-translate-y-1 transition bg-white">
          <div className="flex justify-center"><Sign k={s.k} size={92} /></div><span className={`chip ${tone[s.cat]} mt-3`}>{s.cat}</span><h3 className="text-lg mt-1">{s.name}</h3><p className="text-sm line-clamp-2">{s.mean}</p></button>))}</div>}
    </Section>
    {offline && <div className="wrap mt-4"><OfflineNote what="signs" /></div>}
    <Section title="Random sign challenge" sub="Pick the right meaning. Keep going as long as you like."><div id="challenge" className="scroll-mt-24"><Challenge list={SIGNS} /></div></Section>
    </>}
    {sel && <Detail s={sel} onClose={() => setSel(null)} />}
  </>)
}
