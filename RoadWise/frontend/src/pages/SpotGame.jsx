import { useEffect, useRef, useState } from 'react'
import { Eye, RotateCcw, Check } from 'lucide-react'
import { GameShell } from '../components/Games'
import Character from '../components/Characters'
import { useProgress } from '../context/Progress'

const SK = '#F2B58A', INK = '#263B50'
const Person = ({ x, y, s = 1, body = '#DCD5F5', helmet, phone, hair = INK }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><rect x="-11" y="-22" width="22" height="30" rx="9" fill={body} stroke={INK} strokeWidth="2.5" /><path d="M-6 8v14M6 8v14" stroke={INK} strokeWidth="5" strokeLinecap="round" />
    <circle cy="-34" r="13" fill={SK} stroke={INK} strokeWidth="2.5" />{helmet ? <path d="M-14-36a14 14 0 0 1 28 0z" fill="#6CC3E6" stroke={INK} strokeWidth="2.5" /> : <path d="M-13-38a13 13 0 0 1 26 0q-13-8-26 0z" fill={hair} />}
    <circle cx="-4" cy="-33" r="1.8" fill={INK} /><circle cx="4" cy="-33" r="1.8" fill={INK} />{phone && <rect x="9" y="-28" width="8" height="14" rx="2" fill="#FFE59A" stroke={INK} strokeWidth="2" />}</g>)
const Car = ({ x, y, c, flip }) => (<g transform={`translate(${x} ${y})`}><rect y="14" width="100" height="30" rx="11" fill={c} stroke={INK} strokeWidth="3" /><path d="M18 16l12-16h40l16 16z" fill={c} stroke={INK} strokeWidth="3" strokeLinejoin="round" /><circle cx="24" cy="46" r="9" fill={INK} /><circle cx="76" cy="46" r="9" fill={INK} /></g>)
const Road = ({ zebra }) => (<><rect width="800" height="440" fill="#BDE7F5" /><circle cx="720" cy="60" r="34" fill="#FFE59A" /><rect y="180" width="800" height="60" fill="#CDECCF" /><rect x="30" y="110" width="110" height="80" fill="#FFF7E8" stroke={INK} strokeWidth="3" /><rect x="600" y="100" width="130" height="90" fill="#DCD5F5" stroke={INK} strokeWidth="3" />
  <rect y="240" width="800" height="200" fill="#4a5f74" /><rect y="236" width="800" height="10" fill="#9DB1C4" /><path d="M0 345h800" stroke="#FFE59A" strokeWidth="4" strokeDasharray="30 20" />{zebra && [330, 366, 402, 438].map(x => <rect key={x} x={x} y="252" width="22" height="176" fill="#fff" opacity=".9" />)}</>)

const SCENES = {
  city: { name: 'City road', hint: 'Look at the signal, the riders, the drivers and the walkers.',
    draw: () => (<><Road zebra /><rect x="250" y="252" width="5" height="90" fill="#fff" />
      <g transform="translate(180 120)"><rect x="-4" y="40" width="8" height="70" fill={INK} /><rect x="-16" y="-36" width="32" height="78" rx="11" fill={INK} /><circle cy="-18" r="9" fill="#FF5A4D" /><circle cy="6" r="9" fill="#4a5f74" /><circle cy="30" r="9" fill="#4a5f74" /></g>
      <Car x="20" y="268" c="#CDECCF" /><Car x="300" y="276" c="#FFE59A" /><g><Car x="480" y="262" c="#DCD5F5" /><circle cx="530" cy="276" r="11" fill={SK} stroke={INK} strokeWidth="2" /><rect x="540" y="268" width="8" height="14" rx="2" fill="#FFE59A" stroke={INK} strokeWidth="2" /></g>
      <Car x="590" y="360" c="#FF9B85" /><circle cx="640" cy="376" r="11" fill={SK} stroke={INK} strokeWidth="2" /><circle cx="672" cy="376" r="11" fill={SK} stroke={INK} strokeWidth="2" /><path d="M630 380l18 22" stroke="#fff" strokeWidth="4" />
      <g transform="translate(170 395)"><circle cx="-30" cy="22" r="17" fill="none" stroke={INK} strokeWidth="5" /><circle cx="36" cy="22" r="17" fill="none" stroke={INK} strokeWidth="5" /><path d="M-30 22l26-18h36l10 18" stroke="#FF9B85" strokeWidth="6" fill="none" strokeLinejoin="round" /><Person x={0} y={-6} body="#CDECCF" /></g>
      <Person x={735} y={310} phone body="#FFE59A" /><foreignObject x="335" y="170" width="64" height="86"><Character who="riya" size={58} /></foreignObject></>),
    spots: [
      { id: 'red', x: 345, y: 305, r: 55, bad: true, t: 'A car is crossing on a red light', w: 'Always stop behind the stop line when the signal is red. Jumping a red light can cause serious crashes.' },
      { id: 'phone', x: 538, y: 276, r: 30, bad: true, t: 'Driver using a phone', w: 'Phones take your eyes and mind off the road. Pull over safely if you must use one.' },
      { id: 'belt', x: 655, y: 380, r: 34, bad: true, t: 'Passenger without a seatbelt', w: 'Everyone in a car should buckle up. The belt keeps a passenger from being thrown forward.' },
      { id: 'helmet', x: 172, y: 385, r: 36, bad: true, t: 'Rider without a helmet', w: 'Wear a certified, fastened helmet on every ride. It protects the head in a fall.' },
      { id: 'walk', x: 735, y: 295, r: 36, bad: true, t: 'Crossing away from the zebra crossing', w: 'Cross at a zebra crossing or safe crossing, and keep your eyes up instead of on your phone.' },
      { id: 'riya', x: 367, y: 215, r: 32, bad: false, t: 'Waiting at the kerb', w: 'Well spotted! Riya waits on the footpath until it is safe to cross.' },
      { id: 'wait', x: 70, y: 300, r: 48, bad: false, t: 'A car waiting behind the line', w: 'Correct behaviour! This driver stops at the stop line on red.' },
    ] },
  school: { name: 'School zone', hint: 'Check the school bus, the children and the vehicles around it.',
    draw: () => (<><Road zebra /><g transform="translate(40 250)"><rect width="250" height="90" rx="16" fill="#FFD84A" stroke={INK} strokeWidth="3" />{[20, 80, 140].map(x => <rect key={x} x={x} y="14" width="46" height="30" rx="5" fill="#E8F7FD" stroke={INK} strokeWidth="2" />)}<circle cx="50" cy="94" r="13" fill={INK} /><circle cx="200" cy="94" r="13" fill={INK} /><text x="125" y="72" textAnchor="middle" fontWeight="800" fontSize="16" fill={INK} fontFamily="Nunito">SCHOOL BUS</text><circle cx="262" cy="28" r="12" fill="#FF5A4D" stroke={INK} strokeWidth="2" /></g>
      <circle cx="170" cy="278" r="12" fill={SK} stroke={INK} strokeWidth="2" /><path d="M158 282l-34 6" stroke={SK} strokeWidth="9" strokeLinecap="round" />
      <Person x={335} y={330} s={.9} body="#FF9B85" /><Car x="380" y="370" c="#DCD5F5" /><Car x="530" y="266" c="#CDECCF" />
      <foreignObject x="420" y="150" width="80" height="110"><Character who="ravi" size={76} /></foreignObject><Person x={660} y={218} s={.8} body="#BDE7F5" /><Person x={690} y={215} s={1} body="#DCD5F5" /></>),
    spots: [
      { id: 'run', x: 335, y: 312, r: 36, bad: true, t: 'Child running out from behind the bus', w: 'Never run across the road near a bus. Drivers cannot see you. Wait until you can see all around.' },
      { id: 'pass', x: 430, y: 405, r: 50, bad: true, t: 'Speeding past a school bus', w: 'Slow down near a stopped school bus. Children may step out suddenly.' },
      { id: 'arm', x: 130, y: 284, r: 40, bad: true, t: 'Arm out of the bus window', w: 'Keep hands and head inside the vehicle. Passing traffic can hurt a child.' },
      { id: 'park', x: 580, y: 290, r: 52, bad: true, t: 'Car blocking the zebra crossing area', w: 'Do not stop or park on or near a crossing. People must be able to cross freely.' },
      { id: 'ravi', x: 460, y: 196, r: 38, bad: false, t: 'Traffic officer helping children', w: 'Correct behaviour! Wait for the officer or helper to guide you.' },
      { id: 'hold', x: 675, y: 190, r: 40, bad: false, t: 'Holding an adult’s hand', w: 'Well done! Children should hold an adult’s hand near roads.' },
    ] },
}
export default function SpotGame() {
  const { record } = useProgress(); const [key, setKey] = useState('city'); const [found, setFound] = useState([]); const [seen, setSeen] = useState(null); const [taps, setTaps] = useState(0)
  const sc = SCENES[key]; const bad = sc.spots.filter(s => s.bad); const done = bad.every(s => found.includes(s.id)); const logged = useRef(null)
  useEffect(() => { if (done && logged.current !== key + found.length) { logged.current = key + found.length; record('spot', bad.length, bad.length, { scene: key }) } }, [done])
  const reset = k => { setKey(k); setFound([]); setSeen(null); setTaps(0); logged.current = null }
  const tap = s => { setSeen(s); setTaps(t => t + 1); if (s.bad && !found.includes(s.id)) setFound(f => [...f, s.id]) }
  const foundCount = bad.filter(s => found.includes(s.id)).length
  return (<GameShell title="Spot the Road Safety Mistake" intro="Tap the unsafe behaviours in the scene. Careful: some things are safe!" who="arjun" color="bg-mint">
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-wrap gap-2 mb-4" role="tablist">{Object.entries(SCENES).map(([k, v]) => <button key={k} role="tab" aria-selected={key === k} onClick={() => reset(k)} className={`btn !py-2 ${key === k ? 'bg-coral' : 'bg-white'}`}>{v.name}</button>)}</div>
      <p className="font-bold mb-2">Mistakes found: <span data-testid="found">{foundCount}</span> of {bad.length}. {sc.hint}</p>
      <svg viewBox="0 0 800 440" className="w-full rounded-blob border-2 border-navy/15" role="group" aria-label={`${sc.name} cartoon scene. Tap things to inspect them.`}>
        {sc.draw()}
        {sc.spots.map((s, n) => { const hit = found.includes(s.id) || (!s.bad && seen?.id === s.id)
          return <g key={s.id} role="button" tabIndex={0} aria-label={`Spot ${n + 1}${hit ? (s.bad ? ' mistake found' : ' safe') : ''}`} onClick={() => tap(s)} onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), tap(s))} className="cursor-pointer focus:outline-none">
            <circle cx={s.x} cy={s.y} r={s.r} fill={hit ? (s.bad ? 'rgba(255,90,77,.25)' : 'rgba(76,195,110,.25)') : 'rgba(255,255,255,0.01)'} stroke={hit ? (s.bad ? '#E5382B' : '#2E9E5B') : 'transparent'} strokeWidth="5" strokeDasharray={s.bad ? '0' : '8 6'} /></g> })}
      </svg>
      <div className="card bg-white mt-4 min-h-[110px]" role="status" aria-live="polite">
        {seen ? <><p className="font-display text-xl font-bold flex items-center gap-2">{seen.bad ? '⚠️ Mistake found:' : '✅ This is safe:'} {seen.t}</p><p className="mt-1">{seen.w}</p></> : <p className="font-semibold">Tap anything in the scene that looks unsafe. Use Tab and Enter if you prefer the keyboard.</p>}</div>
      {done && <div role="status" className="card bg-sun/70 mt-4 text-center"><Character who="sam" size={90} className="mx-auto bob" /><h2 className="text-3xl">You found every mistake!</h2><p>Safe habits start with noticing risks.</p></div>}
      <div className="flex flex-wrap gap-3 mt-4"><button className="btn-white" onClick={() => reset(key)}><RotateCcw size={18} />Start again</button>
        <button className="btn-sun" onClick={() => { setFound(bad.map(s => s.id)); setSeen(null) }}><Eye size={18} />Show all mistakes</button>
        <button className="btn-coral" onClick={() => reset(key === 'city' ? 'school' : 'city')}>Try the other scene</button></div>
      <ul className="grid sm:grid-cols-2 gap-2 mt-6">{bad.map(s => <li key={s.id} className={`rounded-2xl border-2 px-4 py-2 flex gap-2 items-start ${found.includes(s.id) ? 'bg-mint/60 border-green-700/40' : 'bg-white border-navy/10'}`}><Check size={18} className={found.includes(s.id) ? 'text-green-700 mt-1' : 'opacity-20 mt-1'} /><span>{found.includes(s.id) ? <><b>{s.t}.</b> {s.w}</> : 'Hidden mistake'}</span></li>)}</ul>
    </div></GameShell>)
}
