import { Link } from 'react-router-dom'
import { RotateCcw } from 'lucide-react'
import { PageHero, Section } from '../components/ui'
import { ProgressBar } from '../components/Games'
import Recommended from '../components/Recommended'
import { ALL_BADGES, useProgress } from '../context/Progress'
const NEXT = { signs: ['/games/sign-challenge', 'Try the Traffic Sign Challenge'], signal: ['/games/signal', 'Play the Traffic Signal Game'], eagle: ['/games/spot-mistake', 'Spot the Mistake'], pedestrian: ['/games/what-would-you-do', 'Try What Would You Do?'], helmet: ['/helmet-seatbelt', 'Read Helmet and Seatbelt, then take that quiz'], myth: ['/myths-vs-facts', 'Flip the Myths vs Facts cards'], pledge: ['/campaigns#pledge', 'Take the Road Safety Pledge'] }
export default function Achievements() {
  const { state, earned, reset } = useProgress(); const log = state.log; const best = k => log.filter(e => e.k === k).reduce((m, e) => Math.max(m, Math.round(e.score / e.total * 100)), 0)
  const todo = ALL_BADGES.filter(b => !earned.includes(b.id) && NEXT[b.id])
  const stats = [['Quizzes completed', log.filter(e => e.k === 'quiz').length], ['Games completed', log.filter(e => e.k !== 'quiz' && e.k !== 'myth').length], ['Best quiz score', `${best('quiz')}%`], ['Pledge', state.pledged ? 'Taken' : 'Not yet']]
  return (<><PageHero title="My Achievements" intro="Badges are saved in this browser. Complete activities to collect them all." who="riya" color="bg-lav" crumb="Achievements" />
    <Section><div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{stats.map(([l, v]) => <div key={l} className="card !p-4 bg-white text-center"><p className="font-display text-3xl font-bold">{v}</p><p className="text-sm font-bold">{l}</p></div>)}</div>
      <div className="mt-6 max-w-xl"><ProgressBar value={earned.length} max={ALL_BADGES.length} label="Badges earned" /></div></Section>
    <Section title="Badges"><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{ALL_BADGES.map(b => { const on = earned.includes(b.id)
      return <div key={b.id} data-earned={on} className={`card text-center ${on ? 'bg-sun/70' : 'bg-white'}`}><div className={`text-6xl ${on ? '' : 'grayscale opacity-40'}`} aria-hidden="true">{b.emoji}</div><h3 className="text-xl mt-1">{b.name}</h3><p className="text-sm">{b.how}</p><span className="chip mt-2">{on ? 'Earned' : 'Locked'}</span></div> })}</div></Section>
    <Section><Recommended title="Lessons to try next" limit={3} /></Section>
    {todo.length > 0 && <Section title="Badges to go for"><div className="grid sm:grid-cols-2 gap-3">{todo.slice(0, 4).map(b => <Link key={b.id} to={NEXT[b.id][0]} className="card !p-4 bg-mint/60 hover:-translate-y-1 transition font-bold">{NEXT[b.id][1]}</Link>)}</div></Section>}
    <Section><button className="btn-white" onClick={() => { if (window.confirm('Clear all badges and scores on this device?')) reset() }}><RotateCcw size={18} />Reset my progress</button></Section></>)
}
