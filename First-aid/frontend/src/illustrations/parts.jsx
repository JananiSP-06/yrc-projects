import React from 'react'

/* Shared palette (hex values so SVGs also render outside the page) */
export const C = {
  navy: '#14213d',
  navySoft: '#2b3a67',
  coral: '#e8505b',
  coralDark: '#c63a46',
  blood: '#c4222f',
  mint: '#d9f2ea',
  mintDark: '#7fcdb8',
  blue: '#dbeaf8',
  blueDark: '#8bb8e8',
  white: '#ffffff',
  paper: '#fffaf4',
  yellow: '#f6bd48',
  orange: '#ff8a3d',
  teal: '#2fa58f',
  purple: '#8a5cf6',
  green: '#7a8f2b',
  water: '#7cc4f2',
  waterDark: '#4aa3df',
  gray: '#c9d3e0',
  grayDark: '#8793a6',
  skin: ['#f6d3b3', '#e5ad84', '#b97a4f', '#7d4e30'],
  burn: '#e2644f',
}

/* ---------- Faces ---------- */
function Face({ mood }) {
  const eye = { fill: C.navy }
  switch (mood) {
    case 'pain':
      return (
        <g stroke={C.navy} strokeWidth="2.2" strokeLinecap="round" fill="none">
          <path d="M-10 -2 L-5 1 L-10 4" />
          <path d="M10 -2 L5 1 L10 4" />
          <path d="M-6 13 Q0 8 6 13" />
        </g>
      )
    case 'out':
      return (
        <g stroke={C.navy} strokeWidth="2.2" strokeLinecap="round" fill="none">
          <path d="M-10 2 L-4 2" />
          <path d="M4 2 L10 2" />
          <path d="M-3 12 L3 12" />
        </g>
      )
    case 'worried':
      return (
        <g>
          <circle cx="-7" cy="2" r="2.3" {...eye} />
          <circle cx="7" cy="2" r="2.3" {...eye} />
          <path d="M-11 -5 L-4 -3 M11 -5 L4 -3" stroke={C.navy} strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="0" cy="12" rx="3" ry="3.6" fill={C.navy} />
        </g>
      )
    case 'shock':
      return (
        <g>
          <circle cx="-7" cy="1" r="2.8" fill="#fff" stroke={C.navy} strokeWidth="1.6" />
          <circle cx="7" cy="1" r="2.8" fill="#fff" stroke={C.navy} strokeWidth="1.6" />
          <circle cx="-7" cy="1" r="1.1" {...eye} />
          <circle cx="7" cy="1" r="1.1" {...eye} />
          <ellipse cx="0" cy="12" rx="3.4" ry="4.2" fill={C.navy} />
        </g>
      )
    case 'smile':
      return (
        <g>
          <circle cx="-7" cy="2" r="2.3" {...eye} />
          <circle cx="7" cy="2" r="2.3" {...eye} />
          <path d="M-7 9 Q0 17 7 9" stroke={C.navy} strokeWidth="2.2" strokeLinecap="round" fill="none" />
        </g>
      )
    case 'focus':
      return (
        <g>
          <circle cx="-7" cy="2" r="2.3" {...eye} />
          <circle cx="7" cy="2" r="2.3" {...eye} />
          <path d="M-11 -4 L-4 -4 M11 -4 L4 -4" stroke={C.navy} strokeWidth="2" strokeLinecap="round" />
          <path d="M-4 11 L4 11" stroke={C.navy} strokeWidth="2.2" strokeLinecap="round" />
        </g>
      )
    default:
      return (
        <g>
          <circle cx="-7" cy="2" r="2.3" {...eye} />
          <circle cx="7" cy="2" r="2.3" {...eye} />
          <path d="M-5 10 Q0 14 5 10" stroke={C.navy} strokeWidth="2.2" strokeLinecap="round" fill="none" />
        </g>
      )
  }
}

function Hair({ style, color }) {
  switch (style) {
    case 'long':
      return (
        <g fill={color}>
          <path d="M-23 4 C-28 -34 28 -34 23 4 L25 30 Q18 34 17 14 L-17 14 Q-18 34 -25 30Z" />
        </g>
      )
    case 'bun':
      return (
        <g fill={color}>
          <circle cx="0" cy="-27" r="9" />
          <path d="M-22 0 C-24 -30 24 -30 22 0 C14 -13 -10 -13 -22 0Z" />
        </g>
      )
    case 'bald':
      return null
    case 'curly':
      return (
        <g fill={color}>
          <circle cx="-14" cy="-16" r="9" />
          <circle cx="0" cy="-21" r="10" />
          <circle cx="14" cy="-16" r="9" />
          <circle cx="-20" cy="-4" r="6" />
          <circle cx="20" cy="-4" r="6" />
        </g>
      )
    default:
      return <path d="M-22 1 C-25 -31 25 -31 22 1 C15 -12 -10 -12 -22 1Z" fill={color} />
  }
}

/* ---------- Person ----------
   Local coordinates: torso centre (0,0), head at (0,-72), feet near y=92.
   arms: [[shoulderX,shoulderY,elbowX,elbowY,handX,handY], ...]
   legs: [[hipX,hipY,kneeX,kneeY,footX,footY], ...] */
const DEFAULT_ARMS = [
  [-17, -44, -24, -12, -26, 14],
  [17, -44, 24, -12, 26, 14],
]
const DEFAULT_LEGS = [
  [-8, 18, -10, 58, -10, 90],
  [8, 18, 10, 58, 10, 90],
]

export function Person({
  x = 0,
  y = 0,
  s = 1,
  r = 0,
  flip = false,
  skin = 0,
  shirt = C.teal,
  pants = C.navySoft,
  hair = '#2a1b14',
  hairStyle = 'short',
  mood = 'calm',
  arms = DEFAULT_ARMS,
  legs = DEFAULT_LEGS,
  vest = false,
  gloves = false,
  noLegs = false,
  back = null,
  front = null,
  lean = 0,
  className,
}) {
  const sk = C.skin[skin]
  const handColor = gloves ? C.mintDark : sk
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${flip ? -s : s} ${s})`}>
      <g className={className}>
      {back}
      {!noLegs &&
        legs.map((l, i) => (
          <g key={i}>
            <path
              d={`M${l[0]} ${l[1]} L${l[2]} ${l[3]} L${l[4]} ${l[5]}`}
              stroke={pants}
              strokeWidth="15"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <ellipse cx={l[4] + (l[4] >= l[2] ? 4 : -4)} cy={l[5] + 3} rx="10" ry="5.5" fill={C.navy} />
          </g>
        ))}
      <g transform={`rotate(${lean} 0 20)`}>
      <rect x="-20" y="-52" width="40" height="76" rx="17" fill={shirt} />
      {vest && (
        <g>
          <rect x="-20" y="-52" width="40" height="76" rx="17" fill={C.white} />
          <path d="M-5 -34 H5 V-24 H15 V-14 H5 V-4 H-5 V-14 H-15 V-24 H-5Z" fill={C.coral} />
        </g>
      )}
      <rect x="-6" y="-56" width="12" height="12" rx="4" fill={sk} />
      <g transform="translate(0 -72)">
        {hairStyle === 'long' && <Hair style="long" color={hair} />}
        <circle r="21" fill={sk} />
        {hairStyle !== 'long' && <Hair style={hairStyle} color={hair} />}
        {hairStyle === 'long' && <path d="M-22 1 C-25 -31 25 -31 22 1 C15 -12 -10 -12 -22 1Z" fill={hair} />}
        <Face mood={mood} />
      </g>
      {arms.map((a, i) => (
        <g key={i}>
          <path
            d={`M${a[0]} ${a[1]} L${a[2]} ${a[3]} L${a[4]} ${a[5]}`}
            stroke={vest ? C.white : shirt}
            strokeWidth="12.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx={a[4]} cy={a[5]} r="7" fill={handColor} />
        </g>
      ))}
      {front}
      </g>
      </g>
    </g>
  )
}

/* Bare hand + forearm shown close-up (for first-aid detail scenes) */
export function Forearm({ x = 0, y = 0, r = 0, s = 1, skin = 1, len = 190, w = 34, children, sleeve = C.teal }) {
  const sk = C.skin[skin]
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <rect x={-len / 2 - 40} y={-w / 2 - 2} width="70" height={w + 4} rx="16" fill={sleeve} />
      <rect x={-len / 2} y={-w / 2} width={len} height={w} rx={w / 2} fill={sk} />
      {/* hand */}
      <ellipse cx={len / 2 + 14} cy="0" rx="30" ry={w / 2 + 3} fill={sk} />
      <path
        d={`M${len / 2 + 30} ${-w / 4} q22 -10 30 -4 M${len / 2 + 32} 0 q24 0 32 4 M${len / 2 + 30} ${w / 4} q22 8 28 14`}
        stroke={sk}
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      {children}
    </g>
  )
}

/* ---------- Props ---------- */
export function Floor({ x = 200, y = 268, w = 320, color = 'rgba(20,33,61,0.10)' }) {
  return <ellipse cx={x} cy={y} rx={w / 2} ry="9" fill={color} />
}

export function Tap({ x = 0, y = 0, s = 1, flow = true }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-8" y="-60" width="16" height="60" rx="5" fill={C.grayDark} />
      <path d="M0 -50 H46 Q62 -50 62 -34 V-22" stroke={C.gray} strokeWidth="16" strokeLinecap="round" fill="none" />
      <path d="M0 -50 H46 Q62 -50 62 -34 V-22" stroke={C.grayDark} strokeWidth="3" strokeLinecap="round" fill="none" opacity=".35" />
      <rect x="52" y="-26" width="20" height="10" rx="3" fill={C.grayDark} />
      <rect x="-22" y="-72" width="44" height="12" rx="6" fill={C.coral} />
      {flow && (
        <g className="flow" stroke={C.water} strokeWidth="5" strokeLinecap="round">
          <line x1="62" y1="-14" x2="62" y2="60" strokeDasharray="10 8" />
          <line x1="55" y1="-12" x2="53" y2="52" strokeDasharray="8 10" opacity=".7" />
          <line x1="69" y1="-12" x2="72" y2="52" strokeDasharray="8 10" opacity=".7" />
        </g>
      )}
    </g>
  )
}

export function Clock({ x = 0, y = 0, r = 26, label, color = C.coral }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill={C.white} stroke={C.navy} strokeWidth="4" />
      <circle r={r - 7} fill="none" stroke={color} strokeWidth="3" strokeDasharray="5 5" opacity=".4" />
      <g className="clock-hand">
        <path d={`M0 0 V${-(r - 9)}`} stroke={C.navy} strokeWidth="3.5" strokeLinecap="round" />
      </g>
      <path d={`M0 0 L${r - 14} 0`} stroke={C.navy} strokeWidth="3.5" strokeLinecap="round" />
      <circle r="3.5" fill={color} />
      {label && (
        <g transform={`translate(0 ${r + 22})`}>
          <rect x={-(label.length * 4.6 + 14)} y="-15" width={label.length * 9.2 + 28} height="26" rx="13" fill={color} />
          <text textAnchor="middle" y="4" fontSize="14" fontWeight="800" fill="#fff" fontFamily="Manrope, DM Sans, Arial, sans-serif">
            {label}
          </text>
        </g>
      )}
    </g>
  )
}

export function Phone({ x = 0, y = 0, r = 0, s = 1, text = '112' }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <rect x="-15" y="-26" width="30" height="52" rx="7" fill={C.navy} />
      <rect x="-11" y="-20" width="22" height="38" rx="3" fill={C.coral} />
      <text textAnchor="middle" y="4" fontSize="11" fontWeight="800" fill="#fff" fontFamily="Manrope, DM Sans, Arial, sans-serif">
        {text}
      </text>
      <circle cx="0" cy="22" r="1.8" fill={C.gray} />
    </g>
  )
}

export function Pad({ x = 0, y = 0, w = 54, h = 40, r = 0, blood = 0, className }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
     <g className={className}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx="6" fill={C.white} stroke={C.gray} strokeWidth="2" />
      <path
        d={`M${-w / 2 + 6} ${-h / 2 + 10} H${w / 2 - 6} M${-w / 2 + 6} 0 H${w / 2 - 6} M${-w / 2 + 6} ${h / 2 - 10} H${w / 2 - 6}`}
        stroke={C.gray}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {blood > 0 && (
        <g fill={C.blood} opacity={0.85}>
          <ellipse cx="0" cy="0" rx={w * 0.2 * blood} ry={h * 0.22 * blood} />
          {blood > 1 && <ellipse cx="6" cy="4" rx={w * 0.3} ry={h * 0.3} />}
        </g>
      )}
     </g>
    </g>
  )
}

export function Ban({ x = 0, y = 0, r = 26, children }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill={C.white} stroke={C.coral} strokeWidth="5" />
      <g>{children}</g>
      <line x1={-r * 0.7} y1={-r * 0.7} x2={r * 0.7} y2={r * 0.7} stroke={C.coral} strokeWidth="5" strokeLinecap="round" />
    </g>
  )
}

export function Ice({ x = 0, y = 0, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-12" y="-12" width="24" height="24" rx="5" fill="#cfeaff" stroke="#7cc4f2" strokeWidth="2" />
      <path d="M-6 -6 L-1 -6 M-6 -2 L-3 -2" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </g>
  )
}

export function Flame({ x = 0, y = 0, s = 1, className = 'flicker' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
     <g className={className}>
      <path d="M0 -60 C6 -40 28 -30 28 -6 C28 14 14 26 0 26 C-14 26 -28 14 -28 -6 C-28 -20 -18 -26 -14 -40 C-6 -32 -2 -44 0 -60Z" fill={C.orange} />
      <path d="M0 -30 C4 -18 16 -12 16 2 C16 14 8 22 0 22 C-8 22 -16 14 -16 2 C-16 -8 -8 -12 0 -30Z" fill={C.yellow} />
     </g>
    </g>
  )
}

export function Drop({ x = 0, y = 0, s = 1, color = C.water, className }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        className={className}
        d="M0 -16 C8 -4 12 2 12 8 C12 15 6 20 0 20 C-6 20 -12 15 -12 8 C-12 2 -8 -4 0 -16Z"
        fill={color}
      />
    </g>
  )
}

export function Cross({ x = 0, y = 0, s = 1, color = C.coral }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M-6 -18 H6 V-6 H18 V6 H6 V18 H-6 V6 H-18 V-6 H-6Z"
      fill={color}
    />
  )
}

export function Badge({ x = 0, y = 0, text, color = C.navy, w }) {
  const width = w || 16 + text.length * 9
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-width / 2} y="-15" width={width} height="30" rx="15" fill={color} />
      <text textAnchor="middle" y="5" fontSize="15" fontWeight="800" fill="#fff" fontFamily="Manrope, DM Sans, Arial, sans-serif">
        {text}
      </text>
    </g>
  )
}

export function Arrow({ d, color = C.coral, w = 5, className, dash }) {
  return <path className={className} d={d} stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" fill="none" markerEnd="url(#arr)" strokeDasharray={dash} />
}

export function Gauze({ x = 0, y = 0, w = 60, h = 40, r = 0 }) {
  return <Pad x={x} y={y} w={w} h={h} r={r} />
}

export function Bandage({ x = 0, y = 0, w = 120, h = 30, r = 0, color = C.white }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx="6" fill={color} stroke={C.gray} strokeWidth="2" />
      {Array.from({ length: Math.floor(w / 18) }).map((_, i) => (
        <path key={i} d={`M${-w / 2 + 10 + i * 18} ${-h / 2} l-8 ${h}`} stroke={C.gray} strokeWidth="2" />
      ))}
    </g>
  )
}

export function Snake({ x = 0, y = 0, s = 1, className = 'sway' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
     <ellipse cx="0" cy="26" rx="52" ry="10" fill="rgba(20,33,61,.12)" />
     <g className={className}>
      <path d="M-40 14 C-52 -6 -14 -14 0 -2 C14 10 -30 18 -34 8" stroke="#6f8a2a" strokeWidth="18" strokeLinecap="round" fill="none" opacity="0" />
      <path d="M-44 20 C-62 4 -30 -6 -6 4 C18 14 40 4 40 -14 C40 -34 14 -40 8 -58" stroke="#6f8a2a" strokeWidth="18" strokeLinecap="round" fill="none" />
      <path d="M-44 20 C-62 4 -30 -6 -6 4 C18 14 40 4 40 -14 C40 -34 14 -40 8 -58" stroke="#a8c24a" strokeWidth="6" strokeLinecap="round" fill="none" strokeDasharray="2 14" />
      <ellipse cx="9" cy="-66" rx="14" ry="11" fill="#6f8a2a" />
      <circle cx="4" cy="-69" r="2.6" fill={C.navy} />
      <circle cx="14" cy="-69" r="2.6" fill={C.navy} />
      <path d="M9 -56 L9 -46 M9 -46 L4 -42 M9 -46 L14 -42" stroke={C.coral} strokeWidth="2.4" strokeLinecap="round" fill="none" />
     </g>
    </g>
  )
}

export function Stars({ x = 0, y = 0, rx = 40, ry = 18 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
     <g className="orbit">
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2
        return <Star key={i} x={Math.cos(a) * rx} y={Math.sin(a) * ry} s={0.8} />
      })}
     </g>
    </g>
  )
}

export function Star({ x = 0, y = 0, s = 1, color = C.yellow }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 -9 L2.6 -2.8 L9 -2.4 L4 1.8 L5.6 8 L0 4.6 L-5.6 8 L-4 1.8 L-9 -2.4 L-2.6 -2.8Z"
      fill={color}
    />
  )
}

export function Cushion({ x = 0, y = 0, w = 70, h = 26, r = 0, color = C.yellow }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2.2} fill={color} />
      <path d={`M${-w / 2 + 8} ${-h / 2 + 5} H${w / 2 - 8}`} stroke="#fff" strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" />
    </g>
  )
}

export function Bag({ x = 0, y = 0, w = 70, h = 40, color = C.purple }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={`M${-w / 4} ${-h / 2} q0 -14 ${w / 4} -14 q${w / 4} 0 ${w / 4} 14`} stroke={C.navy} strokeWidth="4" fill="none" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx="10" fill={color} />
      <rect x={-w / 2 + 6} y={-h / 2 + 8} width={w - 12} height="6" rx="3" fill="#fff" opacity=".35" />
    </g>
  )
}

export function Ambulance({ x = 0, y = 0, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-70" y="-44" width="100" height="62" rx="10" fill={C.white} stroke={C.navy} strokeWidth="3" />
      <path d="M30 -30 H52 Q62 -30 68 -18 L76 -2 V18 H30Z" fill={C.white} stroke={C.navy} strokeWidth="3" strokeLinejoin="round" />
      <path d="M38 -22 H52 Q57 -22 60 -15 L64 -6 H38Z" fill={C.blue} />
      <rect x="-70" y="-6" width="100" height="10" fill={C.coral} />
      <Cross x={-30} y={-24} s={0.7} />
      <circle cx="-42" cy="22" r="12" fill={C.navy} />
      <circle cx="-42" cy="22" r="5" fill={C.gray} />
      <circle cx="50" cy="22" r="12" fill={C.navy} />
      <circle cx="50" cy="22" r="5" fill={C.gray} />
      <g className="blink">
        <rect x="-22" y="-54" width="22" height="10" rx="4" fill={C.coral} />
      </g>
    </g>
  )
}

export function Kit({ x = 0, y = 0, s = 1, open = false }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-34 -52 Q-34 -76 -12 -76 H12 Q34 -76 34 -52" stroke={C.navy} strokeWidth="9" fill="none" strokeLinecap="round" />
      <rect x="-76" y="-56" width="152" height="108" rx="16" fill={C.coral} stroke={C.navy} strokeWidth="5" />
      <rect x="-76" y="14" width="152" height="38" rx="16" fill={C.coralDark} opacity=".5" />
      <rect x="-68" y="-48" width="136" height="12" rx="6" fill="#fff" opacity=".18" />
      <circle cx="0" cy="-2" r="34" fill="#fff" stroke={C.navy} strokeWidth="3" />
      <Cross x={0} y={-2} s={1.15} />
      <rect x="-6" y="-60" width="12" height="9" rx="2" fill={C.navy} opacity=".0" />
      {open && null}
    </g>
  )
}

export function Sparkle({ x = 0, y = 0, s = 1, color = C.yellow, className = 'twinkle' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        className={className}
        d="M0 -10 C1 -3 3 -1 10 0 C3 1 1 3 0 10 C-1 3 -3 1 -10 0 C-3 -1 -1 -3 0 -10Z"
        fill={color}
      />
    </g>
  )
}
