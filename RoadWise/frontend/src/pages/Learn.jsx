import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { PageHero, Section } from '../components/ui'
import { ProgressBar } from '../components/Games'
import Recommended from '../components/Recommended'
import Character from '../components/Characters'
import { MODULES } from '../data/learn'
import { useProgress } from '../context/Progress'

export default function Learn() {
  const { state } = useProgress(); const visited = MODULES.filter(m => state.visited?.[m.to]).length
  const checked = m => state.log.some(e => e.k === 'check' && e.meta?.module === m.to)
  return (<><PageHero title="Learn Road Safety" intro="Eight short illustrated lessons. Each has do's and don'ts, real-life scenarios and a quick knowledge check." who="sam" color="bg-sky" crumb="Learn" />
    <Section><div className="max-w-xl"><ProgressBar value={visited} max={MODULES.length} label="Lessons opened" /></div></Section>
    <Section><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{MODULES.map(m => (
      <Link key={m.to} to={m.to} className="card !p-5 flex flex-col hover:-translate-y-1 transition group" data-module={m.n}>
        <div className={`${m.color} rounded-3xl h-32 grid place-items-center overflow-hidden mb-3 relative`}><span className="absolute top-2 left-3 chip">Module {m.n}</span><Character who={m.who} size={84} className="mt-6" /></div>
        <h3 className="text-xl">{m.title}</h3><p className="text-sm flex-1">{m.text}</p>
        <div className="flex flex-wrap gap-2 mt-3">{state.visited?.[m.to] && <span className="chip !bg-mint/80"><Check size={14} />Opened</span>}{checked(m) && <span className="chip !bg-sun/80"><Check size={14} />Checked</span>}</div></Link>))}</div></Section>
    <Section><Recommended limit={3} /></Section>
    <Section><div className="card bg-lav/50 grid sm:grid-cols-3 gap-4 text-center">{[['/traffic-signs', 'Traffic Signs', 'Study every sign card'], ['/games', 'Safety Games', 'Practise what you learned'], ['/myths-vs-facts', 'Myths vs Facts', 'Spot the truth']].map(([to, t, d]) => <Link key={to} to={to} className="rounded-2xl bg-white border-2 border-navy/15 p-4 hover:bg-sky/40"><h3 className="text-xl">{t}</h3><p className="text-sm">{d}</p></Link>)}</div></Section></>)
}
