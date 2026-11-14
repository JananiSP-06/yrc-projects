import { Link } from 'react-router-dom'
import { ArrowRight, PartyPopper } from 'lucide-react'
import { MODULES, recommend } from '../data/learn'
import { useProgress } from '../context/Progress'
import Character from './Characters'

/** "Recommended next" lessons based on what the visitor has (and has not) done so far. */
export default function Recommended({ limit = 3, title = 'Recommended for you', topic }) {
  const { state } = useProgress(); const recs = recommend(state, limit)
  if (!recs.length) return <div className="card bg-mint/60 flex items-center gap-4"><PartyPopper /><p className="font-bold">You have covered every lesson. Keep practising with the games and quizzes!</p></div>
  return (<div data-testid="recommended"><h2 className="text-3xl mb-4">{title}</h2>
    <div className="grid md:grid-cols-3 gap-5">{recs.map(r => { const m = MODULES.find(x => x.to === r.to)
      return <Link key={r.to} to={r.to} className="card !p-5 hover:-translate-y-1 transition flex gap-4 items-center bg-white"><Character who={m?.who || 'sam'} size={64} /><div><h3 className="text-lg">{r.title}</h3><p className="text-sm">{r.reason}</p><span className="font-display font-bold inline-flex items-center gap-1 mt-1">Open<ArrowRight size={16} /></span></div></Link> })}</div></div>)
}
