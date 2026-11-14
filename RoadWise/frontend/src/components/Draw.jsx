// Small cartoon drawing helpers shared by the right-vs-wrong scenes.
export const SKIN = '#F2B58A', INK = '#263B50'
export const Person = ({ x, y, s = 1, body = '#DCD5F5', hair = INK, helmet, phone, vest, ghost, run }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={ghost ? .35 : 1}>
    <path d={run ? 'M-6 8l-10 16M6 8l12 12' : 'M-6 8v16M6 8v16'} stroke={INK} strokeWidth="5" strokeLinecap="round" />
    <rect x="-11" y="-22" width="22" height="30" rx="9" fill={vest ? '#FFD84A' : body} stroke={INK} strokeWidth="2.5" />
    {vest && <path d="M-11-8h22M-11 0h22" stroke="#fff" strokeWidth="3" />}
    <circle cy="-34" r="13" fill={SKIN} stroke={INK} strokeWidth="2.5" />
    {helmet ? <><path d="M-14-36a14 14 0 0 1 28 0z" fill="#6CC3E6" stroke={INK} strokeWidth="2.5" /><path d="M-9-24q9 8 18 0" stroke={INK} strokeWidth="2" fill="none" /></> : <path d="M-13-38a13 13 0 0 1 26 0q-13-8-26 0z" fill={hair} />}
    <circle cx="-4" cy="-33" r="1.8" fill={INK} /><circle cx="4" cy="-33" r="1.8" fill={INK} />
    {phone && <rect x="9" y="-30" width="8" height="14" rx="2" fill="#FFE59A" stroke={INK} strokeWidth="2" />}
  </g>)
export const Car = ({ x, y, c = '#FFE59A', flip, w = 100, belt }) => (
  <g transform={`translate(${x} ${y}) ${flip ? `translate(${w} 0) scale(-1 1)` : ''}`}>
    <rect y="14" width={w} height="30" rx="11" fill={c} stroke={INK} strokeWidth="3" /><path d={`M${w * .18} 16l12-16h${w * .4}l16 16z`} fill={c} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
    <path d={`M${w * .26} 14l7-11h${w * .26}v11z`} fill="#E8F7FD" /><circle cx={w * .24} cy="46" r="9" fill={INK} /><circle cx={w * .76} cy="46" r="9" fill={INK} /><circle cx={w * .24} cy="46" r="3" fill="#fff" /><circle cx={w * .76} cy="46" r="3" fill="#fff" /></g>)
export const Bang = ({ x, y }) => (<g transform={`translate(${x} ${y})`}><circle r="13" fill="#FF5A4D" stroke="#fff" strokeWidth="2.5" /><text y="6" textAnchor="middle" fontSize="18" fontWeight="800" fill="#fff" fontFamily="Nunito,sans-serif">!</text></g>)
export const Tick = ({ x, y }) => (<g transform={`translate(${x} ${y})`}><circle r="13" fill="#2E9E5B" stroke="#fff" strokeWidth="2.5" /><path d="M-6 0l4 5 8-10" stroke="#fff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>)
export const Bubble = ({ x, y, t, w = 70 }) => (<g transform={`translate(${x} ${y})`}><rect width={w} height="22" rx="11" fill="#fff" stroke={INK} strokeWidth="2" /><text x={w / 2} y="15" textAnchor="middle" fontSize="11" fontWeight="800" fill={INK} fontFamily="Nunito,sans-serif">{t}</text></g>)
export const Zebra = ({ x = 110, n = 4 }) => [...Array(n)].map((_, i) => <rect key={i} x={x + i * 22} y="122" width="14" height="58" fill="#fff" opacity=".92" />)
export const Bike = ({ x, y }) => (<g transform={`translate(${x} ${y})`}><circle cx="0" cy="26" r="17" fill="none" stroke={INK} strokeWidth="5" /><circle cx="70" cy="26" r="17" fill="none" stroke={INK} strokeWidth="5" /><path d="M0 26l22-18h38l10 18" stroke="#FF9B85" strokeWidth="7" fill="none" strokeLinejoin="round" /><rect x="18" y="2" width="28" height="9" rx="4" fill={INK} /></g>)
// Scene frame. mode: day | night | fog | rain
export const Frame = ({ mode = 'day', children, road = true }) => (
  <>
    <rect width="300" height="180" fill={mode === 'night' ? '#263B50' : mode === 'fog' ? '#DDE6EC' : mode === 'rain' ? '#A9BFCC' : '#BDE7F5'} />
    {mode === 'day' && <circle cx="268" cy="30" r="18" fill="#FFE59A" />}{mode === 'night' && <><circle cx="266" cy="30" r="14" fill="#FFF7E8" /><circle cx="272" cy="26" r="12" fill="#263B50" /></>}
    {road && <><rect y="112" width="300" height="10" fill="#9DB1C4" opacity={mode === 'night' ? .5 : 1} /><rect y="122" width="300" height="58" fill={mode === 'night' ? '#1b2a3a' : '#4a5f74'} /><path d="M0 152h300" stroke="#FFE59A" strokeWidth="3" strokeDasharray="22 14" opacity=".8" /></>}
    {children}
    {mode === 'rain' && [...Array(26)].map((_, i) => <path key={i} d={`M${(i * 47) % 300} ${(i * 29) % 110}l-4 12`} stroke="#fff" strokeWidth="1.8" opacity=".7" />)}
    {mode === 'fog' && <><rect width="300" height="180" fill="#fff" opacity=".32" /><ellipse cx="80" cy="130" rx="120" ry="30" fill="#fff" opacity=".35" /></>}
  </>)
