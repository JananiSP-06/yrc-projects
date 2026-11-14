import { useState } from 'react'
import { Check, X, RotateCcw } from 'lucide-react'
import { PageHero, Section } from '../components/ui'
import Character from '../components/Characters'
import { useProgress } from '../context/Progress'
import { useEffect } from 'react'
import { MYTHS } from '../data/content'
function Flip({ m }) {
  const [f, setF] = useState(false)
  return (<button onClick={() => setF(!f)} aria-pressed={f} className={`card text-left min-h-[220px] flex flex-col justify-between transition ${f ? 'bg-mint' : 'bg-coral/30'}`}>
    <span className={`chip self-start ${f ? '!bg-green-100' : '!bg-red-100'}`}>{f ? <><Check size={14} />Fact</> : <><X size={14} />Myth</>}</span>
    <p className="font-display text-2xl font-semibold my-3">{f ? m.f : m.m}</p>
    <div className="flex items-center justify-between"><span className="text-sm font-bold">{f ? 'Tap to see myth' : 'Tap to reveal the fact'}</span><Character who={m.who} size={52} /></div></button>)
}
function Quiz() {
  const { record } = useProgress()
  const [i, setI] = useState(0); const [ans, setAns] = useState(null); const [score, setScore] = useState(0)
  const items = MYTHS.slice(0, 5).map((m, k) => (k % 2 ? { s: m.f, fact: true, why: m.m } : { s: m.m, fact: false, why: m.f }))
  useEffect(() => { if (i >= items.length) record('myth', score, items.length) }, [i >= items.length])
  if (i >= items.length) return <div className="card bg-sun/70 text-center"><Character who="sam" size={100} className="mx-auto" /><h3 className="text-3xl">You scored {score} out of {items.length}</h3><button className="btn-white mt-3" onClick={() => { setI(0); setScore(0); setAns(null) }}><RotateCcw size={16} />Play again</button></div>
  const q = items[i]
  const pick = v => { if (ans !== null) return; setAns(v); if (v === q.fact) setScore(s => s + 1) }
  return (<div className="card bg-white max-w-2xl"><p className="text-sm font-bold">Question {i + 1} of {items.length}</p><div className="h-2 rounded-full bg-sky my-2"><div className="h-2 rounded-full bg-coral" style={{ width: `${(i / items.length) * 100}%` }} /></div>
    <p className="font-display text-2xl my-3">“{q.s}”</p><div className="flex gap-3"><button className="btn-white flex-1" onClick={() => pick(true)}>Fact</button><button className="btn-white flex-1" onClick={() => pick(false)}>Myth</button></div>
    {ans !== null && <div role="status" className="mt-4"><p className="font-bold">{ans === q.fact ? 'Correct!' : 'Not quite.'} This is a {q.fact ? 'fact' : 'myth'}. {q.fact ? '' : `The truth: ${q.why}`}</p><button className="btn-coral mt-3" onClick={() => { setI(i + 1); setAns(null) }}>Next</button></div>}</div>)
}
export default function Myths() {
  return (<><PageHero title="Myths vs Facts" intro="Some road safety beliefs sound true but are not. Tap each card to flip it." who="sam" color="bg-coral/30" />
    <Section><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{MYTHS.map(m => <Flip key={m.m} m={m} />)}</div></Section>
    <Section title="Myth or fact?" sub="Test yourself with five quick statements."><Quiz /></Section></>)
}
