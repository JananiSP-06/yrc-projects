import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, X, ChevronRight, ChevronLeft, Lightbulb, RotateCcw, Home } from 'lucide-react'
import Character, { Speech } from './Characters'
import { Cloud } from './Scenes'
import { NAV_LEARN } from '../data/content'
import { useProgress } from '../context/Progress'

export function PageHero({ title, intro, who = 'sam', color = 'bg-sky', crumb }) {
  return (
    <section className={`${color} relative overflow-hidden border-b-2 border-navy/10`}>
      <Cloud className="absolute top-6 left-[8%] opacity-70 hidden sm:block" w={110} /><Cloud className="absolute top-24 right-[30%] opacity-60 hidden md:block" w={80} />
      <div className="wrap py-10 md:py-14 grid md:grid-cols-[1fr_auto] gap-6 items-center relative">
        <div>
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm font-bold mb-3"><Link to="/" className="inline-flex items-center gap-1 hover:underline"><Home size={14} />Home</Link><ChevronRight size={14} /><span className="text-navy/70">{crumb || title}</span></nav>
          <h1 className="text-4xl md:text-5xl">{title}</h1><p className="mt-3 text-lg max-w-xl">{intro}</p>
        </div>
        <Character who={who} size={150} className="mx-auto bob" />
      </div>
    </section>)
}
export const Section = ({ title, sub, children, className = '' }) => (
  <section className={`wrap mt-14 ${className}`}>{title && <div className="mb-6"><h2 className="text-3xl">{title}</h2>{sub && <p className="text-navy/75 mt-1 max-w-2xl">{sub}</p>}</div>}{children}</section>)

export function DoDont({ dos, donts }) {
  const Col = ({ items, ok }) => (
    <div className={`card ${ok ? 'bg-mint/60' : 'bg-coral/25'}`}>
      <h3 className="text-2xl flex items-center gap-2 mb-3"><span className={`grid place-items-center w-9 h-9 rounded-full border-2 border-navy ${ok ? 'bg-[#6fcf8a]' : 'bg-coral'}`}>{ok ? <Check size={20} /> : <X size={20} />}</span>{ok ? "Do's" : "Don'ts"}</h3>
      <ul className="space-y-2">{items.map(t => <li key={t} className="flex gap-2"><span className="mt-1 shrink-0">{ok ? <Check size={18} className="text-green-700" /> : <X size={18} className="text-red-700" />}</span>{t}</li>)}</ul></div>)
  return <div className="grid md:grid-cols-2 gap-5"><Col items={dos} ok /><Col items={donts} /></div>
}
export function TipGrid({ items }) {
  return <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{items.map(([t, d, c = 'bg-sun']) => (
    <div key={t} className={`card ${c}/60`}><Lightbulb className="mb-2" /><h3 className="text-xl mb-1">{t}</h3><p>{d}</p></div>))}</div>
}
export function Scenario({ who, title, text, answer }) {
  const [show, setShow] = useState(false)
  return (<div className="card bg-lav/50 grid md:grid-cols-[auto_1fr] gap-5 items-center">
    <Character who={who} size={110} className="mx-auto" />
    <div><h3 className="text-2xl">{title}</h3><p className="mt-1">{text}</p>
      <button className="btn-white !py-2 mt-3" onClick={() => setShow(v => !v)} aria-expanded={show}>{show ? 'Hide answer' : 'What is the safest choice?'}</button>
      {show && <p className="mt-3 rounded-2xl bg-white p-4 border-2 border-navy/15 font-semibold">{answer}</p>}</div></div>)
}
export function KnowledgeCheck({ q, options, answer, why, who = 'sam', moduleId }) {
  const [pick, setPick] = useState(null); const { record } = useProgress()
  const choose = i => { setPick(i); if (moduleId) record('check', i === answer ? 1 : 0, 1, { module: moduleId }) }
  return (<div className="card bg-white">
    <div className="flex items-center gap-3 mb-3"><Character who={who} size={56} /><h3 className="text-2xl">Quick knowledge check</h3></div>
    <p className="font-bold text-lg mb-3">{q}</p>
    <div className="grid gap-2" role="group" aria-label="Answers">{options.map((o, i) => {
      const done = pick !== null; const right = i === answer
      return <button key={o} disabled={done} onClick={() => choose(i)} className={`text-left rounded-2xl border-2 px-4 py-3 font-semibold transition min-h-[48px] ${!done ? 'border-navy/20 hover:bg-sky/50' : right ? 'bg-mint border-green-700' : i === pick ? 'bg-coral/40 border-red-700' : 'opacity-60 border-navy/10'}`}>{o}</button>
    })}</div>
    {pick !== null && <div className="mt-4" role="status"><Speech who={who}>{pick === answer ? 'Great job! ' : 'Nice try! '}{why}</Speech><button className="btn-white !py-2 mt-2" onClick={() => setPick(null)}><RotateCcw size={16} />Try again</button></div>}
  </div>)
}
export function ModuleNav({ current }) {
  const i = NAV_LEARN.findIndex(m => m.to === current); const prev = NAV_LEARN[i - 1], next = NAV_LEARN[i + 1]
  return (<div className="wrap mt-14 flex flex-wrap justify-between gap-3">
    {prev ? <Link to={prev.to} className="btn-white"><ChevronLeft size={20} />Back: {prev.label}</Link> : <span />}
    {next ? <Link to={next.to} className="btn-coral">Next: {next.label}<ChevronRight size={20} /></Link> : <Link to="/emergency-help" className="btn-coral">Next: Emergency Help<ChevronRight size={20} /></Link>}</div>)
}
