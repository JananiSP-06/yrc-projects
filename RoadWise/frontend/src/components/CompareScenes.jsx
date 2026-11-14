import { Person, Car, Bang, Bubble, Zebra, Bike, Frame, INK } from './Draw'
import { Check, X } from 'lucide-react'
import { HelmetScene, SeatbeltScene } from './SafetyScenes'

const Tl = ({ x = 40, on = 'red' }) => (<g transform={`translate(${x} 24)`}><rect x="-3" y="46" width="6" height="42" fill={INK} /><rect x="-12" y="-6" width="24" height="54" rx="8" fill={INK} />{['red', 'yellow', 'green'].map((c, i) => <circle key={c} cy={7 + i * 16} r="6" fill={on === c ? { red: '#FF5A4D', yellow: '#FFD84A', green: '#4CC36E' }[c] : '#4a5f74'} />)}</g>)
const Beams = ({ x, y }) => <path d={`M${x} ${y}l70 -18v52z`} fill="#FFE59A" opacity=".45" />
const Rail = ({ down }) => (<g><rect x="0" y="162" width="300" height="6" fill="#7a6a58" /><path d="M0 158h300M0 172h300" stroke="#9aa5ae" strokeWidth="3" />{[...Array(15)].map((_, i) => <rect key={i} x={i * 21} y="156" width="8" height="18" fill="#7a6a58" opacity=".55" />)}
  <rect x="226" y="62" width="6" height="52" fill={INK} /><g transform={`rotate(${down ? 0 : -70} 229 108)`}><rect x="150" y="104" width="82" height="8" fill="#fff" stroke={INK} strokeWidth="2" />{[160, 178, 196, 214].map(x => <rect key={x} x={x} y="104" width="9" height="8" fill="#FF5A4D" />)}</g></g>)
const Train = () => (<g transform="translate(205 134)"><rect width="90" height="34" rx="8" fill="#FF9B85" stroke={INK} strokeWidth="3" /><rect x="8" y="6" width="22" height="14" fill="#E8F7FD" /><rect x="38" y="6" width="22" height="14" fill="#E8F7FD" /><circle cx="70" cy="26" r="3" fill="#FFE59A" /></g>)

// kind -> { title, right: { draw, text }, wrong: { draw, text } }
export const COMPARES = {
  helmet: { title: 'Helmet on, strap fastened', mode: 'day',
    right: { text: 'Rider and pillion wear snug helmets with the strap fastened.', draw: () => <HelmetScene safe /> },
    wrong: { text: 'No helmet means nothing protects the head in a fall.', draw: () => <HelmetScene /> } },
  seatbelt: { title: 'Seatbelt in every seat', mode: 'day',
    right: { text: 'Belt across the chest and low over the hips, front and back.', draw: () => <SeatbeltScene safe /> },
    wrong: { text: 'No belt: a sudden stop can throw a passenger forward.', draw: () => <SeatbeltScene /> } },
  crossing: { title: 'Cross at the zebra crossing', mode: 'day',
    right: { text: 'Wait at the zebra, look both ways, cross when vehicles stop.', draw: () => <><Zebra /><Person x={150} y={118} s={1} body="#DCD5F5" /><Car x={196} y={118} c="#CDECCF" /><path d="M296 150l-14 0" stroke="#fff" /></> },
    wrong: { text: 'Crossing away from the zebra, looking at a phone, is risky.', draw: () => <><Zebra x={190} n={3} /><Person x={80} y={126} phone body="#DCD5F5" /><Car x={150} y={124} c="#FF9B85" /><path d="M120 140h-26M120 150h-34" stroke="#fff" strokeWidth="3" opacity=".7" /></> } },
  phone: { title: 'Eyes on the road', mode: 'day',
    right: { text: 'Both hands on the wheel, eyes ahead. Pull over to use a phone.', draw: () => <><rect x="40" y="40" width="220" height="110" rx="20" fill="#E8F7FD" stroke={INK} strokeWidth="3" /><circle cx="150" cy="120" r="30" fill="none" stroke={INK} strokeWidth="7" /><Person x={150} y={104} s={1.2} body="#BDE7F5" /><path d="M126 110q-2 12 6 14M174 110q2 12-6 14" stroke={SKINC} strokeWidth="6" strokeLinecap="round" fill="none" /></> },
    wrong: { text: 'Even a quick call or message takes eyes and mind off the road.', draw: () => <><rect x="40" y="40" width="220" height="110" rx="20" fill="#E8F7FD" stroke={INK} strokeWidth="3" /><circle cx="150" cy="120" r="30" fill="none" stroke={INK} strokeWidth="7" /><Person x={150} y={104} s={1.2} body="#BDE7F5" phone /><Bubble x={168} y={56} t="Ping!" w={54} /></> } },
  signal: { title: 'Stop on red', mode: 'day',
    right: { text: 'Stop behind the line and wait for green.', draw: () => <><Tl x={44} /><rect x="150" y="126" width="6" height="52" fill="#fff" /><Car x={44} y={128} c="#FFE59A" /></> },
    wrong: { text: 'Driving through a red light can cause a serious crash.', draw: () => <><Tl x={44} /><rect x="110" y="126" width="6" height="52" fill="#fff" /><Zebra x={150} n={3} /><Car x={150} y={128} c="#FF9B85" /></> } },
  distance: { title: 'Keep a safe gap', mode: 'day',
    right: { text: 'A clear gap gives you time to stop.', draw: () => <><Car x={20} y={116} c="#CDECCF" w={90} /><Car x={170} y={116} c="#FFE59A" w={90} /><path d="M112 100h56M112 94v12M168 94v12" stroke={INK} strokeWidth="2.5" /><Bubble x={116} y={70} t="safe gap" w={48} /></> },
    wrong: { text: 'Tailgating leaves no time to react if the car ahead brakes.', draw: () => <><Car x={90} y={116} c="#CDECCF" w={90} /><Car x={178} y={116} c="#FF9B85" w={90} /><Bang x={176} y={96} /></> } },
  bus: { title: 'Around a school bus', mode: 'day',
    right: { text: 'Wait on the kerb until the bus leaves. Hold a grown-up’s hand.', draw: () => <><rect x="10" y="84" width="150" height="62" rx="12" fill="#FFD84A" stroke={INK} strokeWidth="3" />{[24, 64, 104].map(x => <rect key={x} x={x} y="92" width="30" height="20" rx="3" fill="#E8F7FD" />)}<circle cx="42" cy="148" r="10" fill={INK} /><circle cx="128" cy="148" r="10" fill={INK} /><Person x={206} y={104} s=".9" body="#BDE7F5" /><Person x={238} y={100} s="1.1" body="#DCD5F5" /></> },
    wrong: { text: 'Running out from behind a bus: drivers cannot see you.', draw: () => <><rect x="10" y="84" width="150" height="62" rx="12" fill="#FFD84A" stroke={INK} strokeWidth="3" />{[24, 64, 104].map(x => <rect key={x} x={x} y="92" width="30" height="20" rx="3" fill="#E8F7FD" />)}<circle cx="42" cy="148" r="10" fill={INK} /><circle cx="128" cy="148" r="10" fill={INK} /><Person x={190} y={128} s=".9" body="#FF9B85" run /><Car x={210} y={130} c="#CDECCF" w={80} /></> } },
  night: { title: 'Be seen at night', mode: 'night',
    right: { text: 'Bright or reflective clothes show up in headlights.', draw: () => <><Car x={20} y={116} c="#FFE59A" /><Beams x={116} y={134} /><Person x={200} y={128} vest body="#FFD84A" /></> },
    wrong: { text: 'Dark clothes are very hard for drivers to see.', draw: () => <><Car x={20} y={116} c="#FFE59A" /><Beams x={116} y={134} /><Person x={200} y={128} ghost body="#263B50" hair="#1b2a3a" /></> } },
  rain: { title: 'Rain: slow and smooth', mode: 'rain',
    right: { text: 'Slow down, light on, brake gently and keep extra distance.', draw: () => <><Car x={80} y={116} c="#FFE59A" /><Beams x={176} y={134} /><Bubble x={84} y={84} t="slow & smooth" w={90} /></> },
    wrong: { text: 'Fast, hard braking on a wet road can cause a skid.', draw: () => <><path d="M30 150q60-14 110 4M30 140q60-14 110 4" stroke={INK} strokeWidth="3" opacity=".55" fill="none" /><g transform="rotate(-12 170 136)"><Car x={120} y={116} c="#FF9B85" /></g></> } },
  fog: { title: 'Fog: be visible, go slow', mode: 'fog',
    right: { text: 'Low-beam lights on, low speed, watch the road markings.', draw: () => <><Car x={90} y={116} c="#FFE59A" /><circle cx="196" cy="140" r="7" fill="#FFD84A" /><path d="M200 140l40 -8v18z" fill="#FFE59A" opacity=".6" /></> },
    wrong: { text: 'Fast and unlit in fog: others may not see you in time.', draw: () => <><g opacity=".5"><Car x={60} y={116} c="#9aa5ae" /></g><path d="M20 130h30M10 142h40M24 154h26" stroke={INK} strokeWidth="2.5" opacity=".5" /></> } },
  highway: { title: 'Stay in your lane', mode: 'day',
    right: { text: 'Keep to one lane, indicate before you move, take regular breaks.', draw: () => <><path d="M0 138h300" stroke="#fff" strokeWidth="3" strokeDasharray="22 14" /><Car x={90} y={118} c="#CDECCF" /></> },
    wrong: { text: 'Straddling or cutting across lanes surprises other drivers.', draw: () => <><path d="M0 138h300" stroke="#fff" strokeWidth="3" strokeDasharray="22 14" /><g transform="rotate(-8 140 140)"><Car x={90} y={120} c="#FF9B85" /></g></> } },
  railway: { title: 'Railway crossing', mode: 'day',
    right: { text: 'Barrier down means stop and wait until it opens.', draw: () => <><Rail down /><Car x={20} y={116} c="#FFE59A" w={90} /></> },
    wrong: { text: 'Never go under or around a barrier. Trains cannot stop quickly.', draw: () => <><Rail down /><Train /><Person x={150} y={128} s=".9" body="#FF9B85" run /></> } },
  parking: { title: 'Park in the bay', mode: 'day',
    right: { text: 'Park inside the marked bay, away from crossings and footpaths.', draw: () => <><path d="M50 128v50M170 128v50M110 128v50" stroke="#fff" strokeWidth="3" /><Car x={58} y={126} c="#CDECCF" w={46} /><Car x={118} y={126} c="#FFE59A" w={46} /></> },
    wrong: { text: 'Parking on a zebra crossing blocks walkers and hides them from view.', draw: () => <><Zebra x={80} n={4} /><Car x={84} y={120} c="#FF9B85" /><Person x={240} y={118} s=".9" body="#DCD5F5" /></> } },
  inclusive: { title: 'Helping respectfully', mode: 'day',
    right: { text: 'Ask first (“May I help?”), then follow what the person tells you.', draw: () => <><Zebra x={120} n={4} /><Person x={116} y={118} body="#CDECCF" /><path d="M126 102h14" stroke={INK} strokeWidth="6" strokeLinecap="round" /><Person x={176} y={118} body="#DCD5F5" /><path d="M186 100l16 34" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" /><Bubble x={52} y={50} t="May I help?" w={74} /></> },
    wrong: { text: 'Grabbing or pulling someone without asking can frighten or hurt them.', draw: () => <><Zebra x={120} n={4} /><Person x={146} y={118} body="#CDECCF" /><path d="M156 100h14" stroke={INK} strokeWidth="6" strokeLinecap="round" /><Person x={178} y={118} body="#DCD5F5" /><path d="M188 100l16 34" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" /><Bubble x={60} y={50} t="Come on!" w={64} /></> } },
}
const SKINC = '#F2B58A'

function Panel({ kind, side }) {
  const c = COMPARES[kind]; const p = c[side]; const right = side === 'right'
  return (<figure className={`rounded-blob border-2 overflow-hidden bg-white ${right ? 'border-green-700/40' : 'border-red-700/30'}`}>
    <div className="relative"><svg viewBox="0 0 300 180" className="w-full h-auto block" role="img" aria-label={`${right ? 'Right' : 'Wrong'}: ${p.text}`}><Frame mode={c.mode}>{p.draw()}</Frame></svg>
      <span aria-hidden="true" className={`absolute top-2 left-2 grid place-items-center w-9 h-9 rounded-full border-2 border-white shadow ${right ? 'bg-[#2E9E5B]' : 'bg-[#E5382B]'} text-white`}>{right ? <Check size={20} strokeWidth={3} /> : <X size={20} strokeWidth={3} />}</span></div>
    <figcaption className={`px-4 py-3 ${right ? 'bg-mint/70' : 'bg-coral/25'}`}><span className="font-display font-bold">{right ? '✓ Right' : '✗ Wrong'}</span><p className="text-sm">{p.text}</p></figcaption></figure>)
}
/** Two cartoon panels: the safe way and the unsafe way. */
export default function CompareCard({ kind, title }) {
  return (<div data-compare={kind}>{(title ?? COMPARES[kind].title) && <h3 className="text-2xl mb-3">{title ?? COMPARES[kind].title}</h3>}<div className="grid sm:grid-cols-2 gap-4"><Panel kind={kind} side="right" /><Panel kind={kind} side="wrong" /></div></div>)
}