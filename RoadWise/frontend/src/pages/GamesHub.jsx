import { Link } from 'react-router-dom'
import { Trophy, Check } from 'lucide-react'
import { PageHero, Section } from '../components/ui'
import Sign from '../components/Signs'
import Character from '../components/Characters'
import { Light } from '../components/Scenes'
import { useProgress } from '../context/Progress'
const GAMES = [
  { to: '/games/sign-challenge', k: 'sign', title: 'Guess the Traffic Sign', text: 'Three levels, from easy to expert.', color: 'bg-coral/40', v: <Sign k="noEntry" size={80} /> },
  { to: '/games/signal', k: 'signal', title: 'Traffic Signal Challenge', text: 'Watch the lights and choose the safe action.', color: 'bg-lav', v: <Light on="yellow" size={.8} /> },
  { to: '/games/spot-mistake', k: 'spot', title: 'Spot the Mistake', text: 'Find unsafe behaviour in busy road scenes.', color: 'bg-mint', v: <Character who="arjun" size={80} /> },
  { to: '/games/what-would-you-do', k: 'wwyd', title: 'What Would You Do?', text: 'Real-life situations and the safest response.', color: 'bg-sun', v: <Character who="riya" size={80} /> },
  { to: '/games/quiz', k: 'quiz', title: 'Road Safety Quiz', text: 'Pick a level and a topic. Get your score.', color: 'bg-sky', v: <Sign k="speed" size={80} /> },
  { to: '/myths-vs-facts', k: 'myth', title: 'Myth or Fact', text: 'Flip the cards, then take a short quiz.', color: 'bg-coral/40', v: <Character who="sam" size={80} /> },
]
export default function GamesHub() {
  const { state, earned } = useProgress(); const played = k => state.log.filter(e => e.k === k).length
  return (<><PageHero title="Safety Games" intro="Practise what you learn. Every game gives feedback and helps you earn badges." who="sam" color="bg-sun" crumb="Safety Games" />
    <Section><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{GAMES.map(g => (
      <Link key={g.to} to={g.to} className="card !p-5 hover:-translate-y-1 transition flex flex-col"><div className={`${g.color} rounded-3xl h-32 grid place-items-center overflow-hidden mb-3`}>{g.v}</div>
        <h3 className="text-xl">{g.title}</h3><p className="text-sm flex-1">{g.text}</p>
        <span className="mt-3 chip self-start">{played(g.k) ? <><Check size={14} />Played {played(g.k)}×</> : 'Not played yet'}</span></Link>))}</div></Section>
    <Section><Link to="/achievements" className="card bg-lav/60 flex items-center gap-4 hover:-translate-y-1 transition"><Trophy size={36} /><div><h3 className="text-2xl">My achievements</h3><p>{earned.length} badge{earned.length === 1 ? '' : 's'} earned. See what to try next.</p></div></Link></Section></>)
}
