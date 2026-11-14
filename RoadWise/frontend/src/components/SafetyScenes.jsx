import { Bubble, Bang, SKIN, INK } from './Draw'

// Two friendly cut-away scenes (facing right): a motorbike with helmets and a car with seatbelts.
const Spark = ({ x, y, s = 1 }) => <path transform={`translate(${x} ${y}) scale(${s})`} d="M0-8l2.4 5.6L8 0l-5.6 2.4L0 8l-2.4-5.6L-8 0l5.6-2.4z" fill="#FFD84A" stroke={INK} strokeWidth="1.2" />

function Head({ cx, cy, helmet, hc = '#6CC3E6', worried }) {
  return (<g>
    <circle cx={cx} cy={cy} r="12.5" fill={SKIN} stroke={INK} strokeWidth="2.5" />
    {helmet ? <>
      <path d={`M${cx - 15} ${cy - 1.5}A15 15 0 0 1 ${cx + 15} ${cy - 1.5}Z`} fill={hc} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <path d={`M${cx + 15} ${cy - 1.5}h6`} stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <path d={`M${cx - 12} ${cy - 1}Q${cx - 11} ${cy + 15} ${cx} ${cy + 15}Q${cx + 11} ${cy + 15} ${cx + 12} ${cy - 1}`} fill="none" stroke={INK} strokeWidth="2.2" />
      <rect x={cx - 3} y={cy + 12} width="6" height="5" rx="1.5" fill="#FFD84A" stroke={INK} strokeWidth="1.8" />
    </> : <path d={`M${cx - 12.5} ${cy - 1}A12.5 12.5 0 0 1 ${cx + 12.5} ${cy - 1}Q${cx} ${cy - 9} ${cx - 12.5} ${cy - 1}Z`} fill={INK} stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />}
    <circle cx={cx + 5} cy={cy + 1} r="1.8" fill={INK} />
    {worried ? <circle cx={cx + 4} cy={cy + 7} r="2" fill="none" stroke={INK} strokeWidth="1.6" /> : <path d={`M${cx + 1} ${cy + 6}q3 3 6 0`} stroke={INK} strokeWidth="1.6" fill="none" strokeLinecap="round" />}
  </g>)
}

export function HelmetScene({ safe }) {
  const wind = !safe
  return (<g>
    {/* motorbike */}
    <circle cx="88" cy="146" r="17" fill={INK} /><circle cx="88" cy="146" r="6" fill="#fff" />
    <circle cx="214" cy="146" r="17" fill={INK} /><circle cx="214" cy="146" r="6" fill="#fff" />
    <path d="M122 132L88 146M198 112L214 146M196 114V98" stroke={INK} strokeWidth="5" strokeLinecap="round" fill="none" />
    <path d="M190 98h14" stroke={INK} strokeWidth="6" strokeLinecap="round" />
    <rect x="118" y="112" width="76" height="28" rx="11" fill="#FF9B85" stroke={INK} strokeWidth="3" />
    <rect x="78" y="106" width="70" height="10" rx="5" fill={INK} />
    <circle cx="208" cy="112" r="6" fill="#FFE59A" stroke={INK} strokeWidth="2.5" />
    {/* pillion (behind) */}
    <rect x="98" y="74" width="21" height="34" rx="9" fill="#DCD5F5" stroke={INK} strokeWidth="2.5" />
    <path d="M116 86l24 4" stroke={INK} strokeWidth="8" strokeLinecap="round" /><path d="M116 86l24 4" stroke="#DCD5F5" strokeWidth="4.5" strokeLinecap="round" />
    <Head cx={108} cy={60} helmet={safe} hc="#FFD84A" worried={!safe} />
    {/* rider */}
    <path d="M150 106l26 18-2 16" stroke={INK} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" /><path d="M150 106l26 18-2 16" stroke="#6C8FB0" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <rect x="140" y="72" width="22" height="36" rx="10" fill="#CDECCF" stroke={INK} strokeWidth="2.5" transform="rotate(8 151 108)" />
    <path d="M156 84l40 14" stroke={INK} strokeWidth="9" strokeLinecap="round" /><path d="M156 84l40 14" stroke={SKIN} strokeWidth="5" strokeLinecap="round" />
    <Head cx={154} cy={57} helmet={safe} worried={!safe} />
    {safe ? <><Spark x={134} y={34} /><Spark x={182} y={38} s={.7} /><Bubble x={10} y={8} t="Strap clicked!" w={92} /></> : <><Bubble x={10} y={8} t="No helmet!" w={80} /><Bang x={186} y={44} /></>}
    {wind && <path d="M20 104h30M14 116h34M24 128h24" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".7" />}
  </g>)
}

function Sitter({ cx, shirt, safe, driver }) {
  return (<g transform={safe ? undefined : `rotate(24 ${cx} 106)`}>
    <rect x={cx - 10} y={80} width="20" height="26" rx="9" fill={shirt} stroke={INK} strokeWidth="2.5" />
    {safe && <><path d={`M${cx - 6} 82L${cx + 8} 101`} stroke={INK} strokeWidth="7.5" strokeLinecap="round" /><path d={`M${cx - 6} 82L${cx + 8} 101`} stroke="#FF9B85" strokeWidth="4" strokeLinecap="round" /><rect x={cx + 3} y="95" width="9" height="8" rx="2" fill="#FFD84A" stroke={INK} strokeWidth="2" /></>}
    {driver && safe && <><path d={`M${cx + 5} 90L205 96`} stroke={INK} strokeWidth="8" strokeLinecap="round" /><path d={`M${cx + 5} 90L205 96`} stroke={SKIN} strokeWidth="4.5" strokeLinecap="round" /></>}
    <Head cx={cx + 1} cy={67} worried={!safe} />
  </g>)
}

export function SeatbeltScene({ safe }) {
  return (<g>
    <path d="M76 106L98 48H204L232 106Z" fill="#FFE59A" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
    <path d="M88 106L104 58H198L220 106Z" fill="#E8F7FD" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M151 58V106" stroke={INK} strokeWidth="3" />
    <rect x="108" y="72" width="10" height="34" rx="5" fill="#DCD5F5" stroke={INK} strokeWidth="2.5" />
    <rect x="156" y="72" width="10" height="34" rx="5" fill="#DCD5F5" stroke={INK} strokeWidth="2.5" />
    <Sitter cx={132} shirt="#BDE7F5" safe={safe} />
    <Sitter cx={182} shirt="#CDECCF" safe={safe} driver />
    <path d="M200 88l8 14" stroke={INK} strokeWidth="4" strokeLinecap="round" />
    <rect x="46" y="104" width="224" height="36" rx="14" fill="#FFE59A" stroke={INK} strokeWidth="3" />
    <path d="M98 110v26M164 110v26" stroke={INK} strokeWidth="2" opacity=".35" />
    <circle cx="262" cy="118" r="5" fill="#FFD84A" stroke={INK} strokeWidth="2" /><circle cx="54" cy="118" r="4.5" fill="#FF9B85" stroke={INK} strokeWidth="2" />
    <circle cx="92" cy="142" r="15" fill={INK} /><circle cx="92" cy="142" r="5" fill="#fff" />
    <circle cx="224" cy="142" r="15" fill={INK} /><circle cx="224" cy="142" r="5" fill="#fff" />
    {safe ? <><Spark x={118} y={42} s={.8} /><Bubble x={12} y={24} t="Click! Belted" w={94} /></> : <><path d="M18 112h24M10 124h30M22 136h20" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".7" /><Bubble x={12} y={24} t="Sudden stop!" w={96} /><Bang x={246} y={80} /></>}
  </g>)
}