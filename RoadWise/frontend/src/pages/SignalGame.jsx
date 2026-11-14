import { useEffect, useMemo, useState } from 'react'
import { GameShell, ResultCard, ProgressBar } from '../components/Games'
import Character from '../components/Characters'
import { makeSignalRounds } from '../data/games'
import { useProgress } from '../context/Progress'

const COL = { red: '#FF5A4D', yellow: '#FFD84A', green: '#4CC36E' }
const Bulbs = ({ on, x, y }) => (<g transform={`translate(${x} ${y})`}><rect x="-4" y="40" width="8" height="90" fill="#263B50" /><rect x="-18" y="-40" width="36" height="84" rx="12" fill="#263B50" />{['red', 'yellow', 'green'].map((c, i) => <circle key={c} cx="0" cy={-22 + i * 26} r="10" fill={on === c ? COL[c] : '#4a5f74'} style={{ transition: 'fill .4s' }} />)}</g>)
const Car = ({ x, y, c, label }) => (<g transform={`translate(${x} ${y})`} aria-label={label}><rect y="14" width="86" height="26" rx="10" fill={c} stroke="#263B50" strokeWidth="3" /><path d="M16 16l10-14h32l14 14z" fill={c} stroke="#263B50" strokeWidth="3" strokeLinejoin="round" /><path d="M29 14l6-9h10v9zM50 14V5h8l8 9z" fill="#E8F7FD" /><circle cx="20" cy="42" r="8" fill="#263B50" /><circle cx="66" cy="42" r="8" fill="#263B50" /></g>)
function Intersection({ r, light }) {
  return (<svg viewBox="0 0 640 300" className="w-full rounded-blob border-2 border-navy/15" role="img" aria-label={`Intersection. The signal is ${light}.`}>
    <rect width="640" height="300" fill="#BDE7F5" /><rect y="0" width="640" height="90" fill="#CDECCF" /><rect y="90" width="640" height="150" fill="#4a5f74" /><rect y="240" width="640" height="60" fill="#CDECCF" />
    <path d="M0 165h640" stroke="#FFE59A" strokeWidth="4" strokeDasharray="26 18" />
    {[300, 336, 372, 408].map(x => <rect key={x} x={x} y="92" width="22" height="146" fill="#fff" opacity=".92" />)}
    <rect x="262" y="165" width="6" height="72" fill="#fff" />
    <Bulbs on={light} x="232" y="60" />
    {r.role === 'car' && <Car x="120" y="180" c="#FFE59A" label="Your car" />}
    {r.role === 'walk' && <foreignObject x="240" y="22" width="70" height="100"><Character who="riya" size={60} title="You" /></foreignObject>}
    {r.role === 'walk' && r.extra === 'turning' && <Car x="440" y="104" c="#DCD5F5" label="Turning car" />}
    {r.role === 'walk' && !r.extra && <Car x="470" y="180" c="#DCD5F5" label="Moving car" />}
    {r.extra === 'people' && <><foreignObject x="320" y="104" width="60" height="85"><Character who="riya" size={52} /></foreignObject><foreignObject x="384" y="108" width="60" height="85"><Character who="arjun" size={50} /></foreignObject></>}
    {r.extra === 'police' && <foreignObject x="440" y="20" width="90" height="120"><Character who="ravi" size={84} title="Traffic police officer with raised hand" /></foreignObject>}
    {r.extra === 'ambulance' && <g transform="translate(60 105)"><rect width="100" height="46" rx="10" fill="#fff" stroke="#263B50" strokeWidth="3" /><rect x="66" y="8" width="26" height="18" fill="#BDE7F5" /><path d="M30 10v26M17 23h26" stroke="#FF5A4D" strokeWidth="7" /><circle cx="26" cy="48" r="8" fill="#263B50" /><circle cx="76" cy="48" r="8" fill="#263B50" /><circle cx="50" cy="-4" r="6" fill="#FF5A4D" className="bob" /></g>}
  </svg>)
}
export default function SignalGame() {
  const { record } = useProgress(); const [round, setRound] = useState(0); const rounds = useMemo(() => makeSignalRounds(6), [round])
  const [i, setI] = useState(0); const [pick, setPick] = useState(null); const [score, setScore] = useState(0)
  const [light, setLight] = useState('red'); const r = rounds[i]; const done = i >= rounds.length
  // The signal changes to the round's colour after a short beat, so each round feels live.
  useEffect(() => { if (done) return; setLight(r.light === 'red' ? 'green' : 'red'); const t = setTimeout(() => setLight(r.light), 500); return () => clearTimeout(t) }, [i, round, done])
  useEffect(() => { if (done) record('signal', score, rounds.length) }, [done])
  const retake = () => { setRound(x => x + 1); setI(0); setPick(null); setScore(0) }
  return (<GameShell title="Traffic Signal Game" intro="The signal changes. Read the situation and choose the safe action." who="ravi" color="bg-lav">
    <div className="max-w-3xl mx-auto">
      {done ? <ResultCard score={score} total={rounds.length} onRetake={retake} /> : <>
        <ProgressBar value={i + (pick !== null ? 1 : 0)} max={rounds.length} label={`Round ${i + 1}`} />
        <div className="mt-4"><Intersection r={r} light={light} /></div>
        <div className="card bg-white mt-4"><p className="font-display text-2xl font-bold mb-3">{r.prompt}</p><p className="text-sm font-bold mb-2">What is the right action?</p>
          <div className="grid gap-2">{r.options.map((o, n) => <button key={o} disabled={pick !== null} onClick={() => { setPick(n); if (n === r.answer) setScore(s => s + 1) }} className={`text-left rounded-2xl border-2 px-4 py-3 font-semibold min-h-[52px] ${pick === null ? 'border-navy/20 hover:bg-sky/50' : n === r.answer ? 'bg-mint border-green-700' : n === pick ? 'bg-coral/40 border-red-700' : 'opacity-50 border-navy/10'}`}>{o}</button>)}</div>
          {pick !== null && <div role="status" className="mt-4 rounded-2xl p-4 bg-sun/50 border-2 border-navy/15"><p className="font-display text-xl font-bold">{pick === r.answer ? 'Correct!' : `Not quite. Right answer: ${r.options[r.answer]}.`}</p><p>{r.why}</p><button className="btn-coral mt-3" onClick={() => { setI(i + 1); setPick(null) }}>{i + 1 === rounds.length ? 'See my result' : 'Next round'}</button></div>}
        </div><p className="text-center mt-3 font-bold">Score so far: {score}</p></>}
    </div></GameShell>)
}
