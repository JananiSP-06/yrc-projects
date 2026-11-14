import Character from './Characters'
export const Cloud = ({ className = '', w = 120 }) => (
  <svg viewBox="0 0 120 60" width={w} className={className} aria-hidden="true"><path d="M20 50a16 16 0 0 1 4-31 22 22 0 0 1 42-4 18 18 0 0 1 30 12 14 14 0 0 1 4 23z" fill="#fff" opacity=".95" /></svg>)
export const Light = ({ on = 'red', size = 1 }) => (
  <svg viewBox="0 0 60 150" width={60 * size} aria-hidden="true"><rect x="26" y="70" width="8" height="78" fill="#263B50" /><rect x="8" y="4" width="44" height="86" rx="14" fill="#263B50" />
    {['red', 'yellow', 'green'].map((c, i) => <circle key={c} cx="30" cy={22 + i * 26} r="10" fill={on === c ? { red: '#FF5A4D', yellow: '#FFD84A', green: '#4CC36E' }[c] : '#4a5f74'} />)}</svg>)
const Car = ({ x, y, c, flip }) => (
  <g transform={`translate(${x} ${y}) ${flip ? 'scale(-1 1)' : ''}`}><rect x="0" y="14" width="86" height="26" rx="10" fill={c} stroke="#263B50" strokeWidth="3" /><path d="M16 16l10-14h32l14 14z" fill={c} stroke="#263B50" strokeWidth="3" strokeLinejoin="round" /><path d="M29 14l6-9h10v9zM50 14V5h8l8 9z" fill="#E8F7FD" /><circle cx="20" cy="42" r="8" fill="#263B50" /><circle cx="66" cy="42" r="8" fill="#263B50" /><circle cx="20" cy="42" r="3" fill="#fff" /><circle cx="66" cy="42" r="3" fill="#fff" /></g>)
export function HeroScene() {
  return (
    <svg viewBox="0 0 640 460" className="w-full h-auto" role="img" aria-label="Cartoon Indian road with children at a zebra crossing, a traffic signal, a cyclist and a bus">
      <rect width="640" height="460" rx="40" fill="#BDE7F5" />
      <circle cx="540" cy="80" r="42" fill="#FFE59A" />
      <g fill="#fff"><path d="M60 90a18 18 0 0 1 4-34 24 24 0 0 1 46-4 20 20 0 0 1 32 14 15 15 0 0 1 4 25z" /><path d="M330 60a14 14 0 0 1 3-26 20 20 0 0 1 38-3 16 16 0 0 1 26 11 12 12 0 0 1 3 18z" /></g>
      <path d="M0 250q80-70 170-30t170-20 150 30 150-20v70H0z" fill="#CDECCF" />
      <g><rect x="470" y="160" width="130" height="90" fill="#FFF7E8" stroke="#263B50" strokeWidth="3" /><path d="M462 160l73-40 73 40z" fill="#FF9B85" stroke="#263B50" strokeWidth="3" strokeLinejoin="round" /><rect x="490" y="185" width="26" height="30" rx="4" fill="#BDE7F5" stroke="#263B50" strokeWidth="2" /><rect x="552" y="185" width="26" height="30" rx="4" fill="#BDE7F5" stroke="#263B50" strokeWidth="2" /><text x="535" y="152" textAnchor="middle" fontSize="13" fontWeight="800" fill="#263B50" fontFamily="Nunito">SCHOOL</text></g>
      <rect y="250" width="640" height="210" fill="#4a5f74" /><rect y="250" width="640" height="14" fill="#9DB1C4" />
      <path d="M0 355h640" stroke="#FFE59A" strokeWidth="6" strokeDasharray="34 24" />
      <g fill="#fff">{[250, 292, 334, 376, 418].map(x => <rect key={x} x={x} y="266" width="26" height="170" rx="4" opacity=".92" />)}</g>
      <g transform="translate(40 190) scale(1.1)"><svg viewBox="0 0 60 150" width="60" height="150"><rect x="26" y="70" width="8" height="78" fill="#263B50" /><rect x="8" y="4" width="44" height="86" rx="14" fill="#263B50" /><circle cx="30" cy="22" r="10" fill="#FF5A4D" /><circle cx="30" cy="48" r="10" fill="#4a5f74" /><circle cx="30" cy="74" r="10" fill="#4a5f74" /></svg></g>
      <g style={{ animation: 'drive 14s linear infinite' }}><Car x="0" y="382" c="#FFE59A" /></g>
      <g style={{ animation: 'drive 20s linear infinite', animationDelay: '-9s' }}><Car x="0" y="290" c="#DCD5F5" /></g>
      <foreignObject x="236" y="214" width="80" height="110"><Character who="riya" size={78} /></foreignObject>
      <foreignObject x="318" y="220" width="80" height="110"><Character who="arjun" size={74} /></foreignObject>
      <foreignObject x="150" y="206" width="90" height="130"><Character who="ravi" size={86} /></foreignObject>
      <foreignObject x="420" y="248" width="150" height="200"><div className="bob"><Character who="sam" size={130} /></div></foreignObject>
    </svg>)
}

// Students, a senior citizen, a traffic officer and the mascot promoting road safety together.
import { Person } from './Draw'
export function CommunityScene() {
  const C = ({ who, x, y, size }) => <g transform={`translate(${x} ${y})`}><Character who={who} size={size} /></g>
  return (
    <svg viewBox="0 0 640 320" className="w-full h-auto rounded-blob border-2 border-navy/15" role="img" aria-label="Students, a senior citizen, a traffic officer and Safety Sam holding a road safety banner together">
      <rect width="640" height="320" fill="#BDE7F5" /><circle cx="560" cy="60" r="34" fill="#FFE59A" />
      <path d="M0 210q90-60 200-20t200-10 240 20v140H0z" fill="#CDECCF" />
      <g fill="#fff" opacity=".95"><path d="M70 70a16 16 0 0 1 3-30 22 22 0 0 1 42-3 18 18 0 0 1 28 12 14 14 0 0 1 4 21z" /><path d="M360 50a14 14 0 0 1 3-26 20 20 0 0 1 38-3 16 16 0 0 1 26 11 12 12 0 0 1 3 18z" /></g>
      {[[40, 150], [590, 160]].map(([x, y]) => <g key={x} transform={`translate(${x} ${y})`}><rect x="-5" y="20" width="10" height="46" fill="#8a6a4a" /><circle r="30" cy="10" fill="#7FCB8B" stroke="#263B50" strokeWidth="3" /></g>)}
      <rect y="262" width="640" height="58" fill="#4a5f74" /><path d="M0 292h640" stroke="#FFE59A" strokeWidth="4" strokeDasharray="30 20" />
      <C who="ravi" x={40} y={118} size={110} /><C who="riya" x={150} y={128} size={104} /><C who="sam" x={268} y={102} size={130} /><C who="arjun" x={400} y={128} size={104} />
      <g transform="translate(520 150)"><Person x={0} y={72} s={1.4} body="#FF9B85" hair="#E8E8EE" /><path d="M16 76l4 54" stroke="#263B50" strokeWidth="5" strokeLinecap="round" /><path d="M16 76q-3-8 6-8" stroke="#263B50" strokeWidth="4" fill="none" strokeLinecap="round" /></g>
      <g transform="translate(578 190)"><Person x={0} y={52} s={.8} body="#FFE59A" /><path d="M10 20q14-28 22-34" stroke="#263B50" strokeWidth="2" fill="none" /><circle cx="34" cy="-42" r="11" fill="#FF9B85" stroke="#263B50" strokeWidth="2.5" /></g>
      <g><path d="M70 214Q250 192 430 214l-3 36Q250 228 73 250z" fill="#FFF7E8" stroke="#263B50" strokeWidth="3" /><text x="250" y="228" textAnchor="middle" fontSize="19" fontWeight="800" fill="#263B50" fontFamily="Baloo 2, Nunito, sans-serif">Every Road. Every Life.</text></g>
    </svg>)
}
