// Four recurring cartoon guides, drawn as inline SVG so they stay crisp and consistent.
const skin = '#F2B58A', ink = '#263B50'
const Face = ({ cx = 50, cy = 42, blush = true }) => (
  <g>
    <circle cx={cx - 11} cy={cy} r="3.4" fill={ink} /><circle cx={cx + 11} cy={cy} r="3.4" fill={ink} />
    <circle cx={cx - 10} cy={cy - 1} r="1.1" fill="#fff" /><circle cx={cx + 12} cy={cy - 1} r="1.1" fill="#fff" />
    <path d={`M${cx - 7} ${cy + 9} Q${cx} ${cy + 16} ${cx + 7} ${cy + 9}`} stroke={ink} strokeWidth="2.4" fill="none" strokeLinecap="round" />
    {blush && <><circle cx={cx - 19} cy={cy + 8} r="4" fill="#FF9B85" opacity=".6" /><circle cx={cx + 19} cy={cy + 8} r="4" fill="#FF9B85" opacity=".6" /></>}
  </g>
)
const Legs = ({ c = ink }) => (<g stroke={c} strokeWidth="9" strokeLinecap="round"><path d="M42 106v22M58 106v22" /></g>)

const art = {
  sam: (<g>{/* Safety Sam: round mint mascot, yellow helmet, coral vest */}
    <Legs c="#7FBF86" /><ellipse cx="50" cy="82" rx="30" ry="29" fill="#CDECCF" stroke={ink} strokeWidth="3" />
    <path d="M30 88q20 14 40 0v14q-20 10-40 0z" fill="#FF9B85" stroke={ink} strokeWidth="2.5" /><path d="M36 92v14M64 92v14" stroke="#FFE59A" strokeWidth="4" />
    <circle cx="50" cy="44" r="26" fill="#E5F6E6" stroke={ink} strokeWidth="3" />
    <path d="M23 40a27 27 0 0 1 54 0z" fill="#FFE59A" stroke={ink} strokeWidth="3" /><path d="M50 14v26" stroke={ink} strokeWidth="2.5" /><circle cx="50" cy="13" r="3" fill="#FF9B85" />
    <Face cy={50} /><path d="M20 76q-10 4-9 14M80 76q10 4 9 14" stroke={ink} strokeWidth="3" fill="none" strokeLinecap="round" /></g>),
  riya: (<g>{/* Riya: student with pigtails & school bag */}
    <Legs /><rect x="28" y="64" width="44" height="46" rx="16" fill="#DCD5F5" stroke={ink} strokeWidth="3" />
    <rect x="22" y="72" width="12" height="28" rx="6" fill="#FF9B85" stroke={ink} strokeWidth="2.5" />
    <circle cx="26" cy="30" r="9" fill={ink} /><circle cx="74" cy="30" r="9" fill={ink} />
    <circle cx="50" cy="42" r="26" fill={skin} stroke={ink} strokeWidth="3" />
    <path d="M24 40a26 26 0 0 1 52 0q-26-12-52 0z" fill={ink} /><circle cx="26" cy="24" r="4" fill="#FF9B85" /><circle cx="74" cy="24" r="4" fill="#FF9B85" />
    <Face /><path d="M72 78l14-10" stroke={ink} strokeWidth="3" strokeLinecap="round" /></g>),
  arjun: (<g>{/* Arjun: cyclist with sky-blue helmet */}
    <Legs /><rect x="28" y="64" width="44" height="46" rx="16" fill="#BDE7F5" stroke={ink} strokeWidth="3" />
    <path d="M40 72h20" stroke="#FFE59A" strokeWidth="5" strokeLinecap="round" />
    <circle cx="50" cy="44" r="26" fill={skin} stroke={ink} strokeWidth="3" />
    <path d="M22 42a28 28 0 0 1 56 0z" fill="#6CC3E6" stroke={ink} strokeWidth="3" /><path d="M36 20v22M50 15v27M64 20v22" stroke="#fff" strokeWidth="2.5" opacity=".7" />
    <Face cy={50} /><path d="M30 60v12M70 60v12" stroke="#263B50" strokeWidth="2" opacity=".5" /></g>),
  ravi: (<g>{/* Officer Ravi: traffic police with cap, moustache, whistle */}
    <Legs /><rect x="26" y="64" width="48" height="46" rx="14" fill="#F3E3A4" stroke={ink} strokeWidth="3" />
    <path d="M50 64v46" stroke={ink} strokeWidth="2" /><circle cx="40" cy="80" r="2.5" fill={ink} /><circle cx="60" cy="80" r="2.5" fill={ink} />
    <path d="M60 68l8 12" stroke="#FF9B85" strokeWidth="3" /><circle cx="68" cy="82" r="4" fill="#FF9B85" stroke={ink} strokeWidth="2" />
    <circle cx="50" cy="44" r="25" fill={skin} stroke={ink} strokeWidth="3" />
    <path d="M24 34h52v-6a26 20 0 0 0-52 0z" fill="#3C5A78" stroke={ink} strokeWidth="3" /><rect x="22" y="33" width="56" height="7" rx="3" fill={ink} /><circle cx="50" cy="26" r="4" fill="#FFE59A" />
    <Face cy={50} blush={false} /><path d="M38 59q12-6 24 0q-12 4-24 0z" fill={ink} />
    <path d="M74 70l14-22" stroke={ink} strokeWidth="9" strokeLinecap="round" /><circle cx="88" cy="46" r="6" fill="#fff" stroke={ink} strokeWidth="2.5" /></g>),
}
export const NAMES = { sam: 'Safety Sam', riya: 'Riya', arjun: 'Arjun', ravi: 'Officer Ravi' }
export default function Character({ who = 'sam', size = 120, className = '', title }) {
  return (<svg viewBox="0 0 100 135" width={size} height={size * 1.35} className={className} role="img" aria-label={title || NAMES[who]}>{art[who]}</svg>)
}
export function Speech({ who = 'sam', children, flip }) {
  return (
    <div className={`flex items-end gap-3 ${flip ? 'flex-row-reverse' : ''}`}>
      <Character who={who} size={84} className="shrink-0 bob" />
      <div className="relative bg-white border-2 border-navy/20 rounded-3xl px-5 py-3 mb-6 shadow-pop">
        <p className="text-sm font-extrabold text-navy/60 font-display">{NAMES[who]} says</p><p className="font-semibold">{children}</p>
      </div>
    </div>)
}
