// Indian-convention road signs drawn as SVG. Shapes follow IRC:67 / Motor Vehicles Act schedule conventions:
// mandatory = red ring (circle), cautionary = red-bordered triangle, informatory = blue rectangle.
const R = '#D62F2F', B = '#1E5DAA', K = '#1b1b1b'
const ring = (inner, fill = '#fff') => (<g><circle cx="50" cy="50" r="45" fill={R} /><circle cx="50" cy="50" r="35" fill={fill} />{inner}</g>)
const tri = (inner) => (<g><path d="M50 6L96 88H4z" fill={R} strokeLinejoin="round" stroke={R} strokeWidth="6" /><path d="M50 22L82 80H18z" fill="#fff" />{inner}</g>)
const info = (inner) => (<g><rect x="6" y="6" width="88" height="88" rx="10" fill={B} /><rect x="11" y="11" width="78" height="78" rx="7" fill="none" stroke="#fff" strokeWidth="2.5" />{inner}</g>)
const T = (t, y = 62, s = 28, c = K) => <text x="50" y={y} textAnchor="middle" fontSize={s} fontWeight="800" fontFamily="Nunito,sans-serif" fill={c}>{t}</text>
const slash = <path d="M24 76L76 24" stroke={R} strokeWidth="8" strokeLinecap="round" />
const person = (x = 50, y = 0) => <g transform={`translate(${x - 50} ${y})`} fill={K}><circle cx="50" cy="48" r="5" /><path d="M50 54v14M50 58l-8 8M50 58l8 6M50 68l-6 10M50 68l6 10" stroke={K} strokeWidth="4" strokeLinecap="round" fill="none" /></g>
const arrowUp = <path d="M50 74V30M36 44l14-14 14 14" stroke="#fff" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />

export const SIGNS = {
  stop: <g><polygon points="32,6 68,6 94,32 94,68 68,94 32,94 6,68 6,32" fill={R} stroke="#fff" strokeWidth="4" /><polygon points="33,13 67,13 87,33 87,67 67,87 33,87 13,67 13,33" fill="none" stroke="#fff" strokeWidth="2" />{T('STOP', 59, 25, '#fff')}</g>,
  noEntry: <g><circle cx="50" cy="50" r="45" fill={R} /><rect x="16" y="41" width="68" height="18" rx="3" fill="#fff" /></g>,
  noParking: ring(<g><text x="50" y="66" textAnchor="middle" fontSize="40" fontWeight="800" fill={B} fontFamily="Nunito">P</text>{slash}</g>),
  speed: ring(T('50', 62, 34)),
  oneWay: info(<g><path d="M22 50h56M60 32l20 18-20 18" stroke="#fff" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" /></g>),
  noHorn: ring(<g><path d="M28 44h10l16-12v36L38 56H28z" fill={K} /><path d="M62 42q6 8 0 16" stroke={K} strokeWidth="4" fill="none" strokeLinecap="round" />{slash}</g>),
  noUturn: ring(<g><path d="M38 72V42a12 12 0 0 1 24 0v8M52 44l10 10 10-10" stroke={K} strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />{slash}</g>),
  turnLeft: <g><circle cx="50" cy="50" r="45" fill={B} /><path d="M70 74V46H38M52 32L38 46l14 14" stroke="#fff" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>,
  school: tri(<g>{person(40, -2)}{person(60, 4)}</g>),
  crossing: tri(<g><path d="M30 76h40" stroke={K} strokeWidth="4" />{person(50, 2)}</g>),
  sharpTurn: tri(<path d="M42 76V52Q42 38 56 38h8M58 28l8 10-8 10" stroke={K} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />),
  narrow: tri(<path d="M38 74Q46 56 38 36M62 74Q54 56 62 36" stroke={K} strokeWidth="6" fill="none" strokeLinecap="round" />),
  breaker: tri(<path d="M24 72h14q12-24 24 0h14" stroke={K} strokeWidth="6" fill="#444" strokeLinecap="round" strokeLinejoin="round" />),
  railway: tri(<g><path d="M34 76L44 38M66 76L56 38M38 62h24M41 50h18" stroke={K} strokeWidth="4" strokeLinecap="round" /></g>),
  slippery: tri(<g><path d="M38 46q12 8 0 16t0 12M60 46q12 8 0 16t0 12" stroke={K} strokeWidth="4" fill="none" strokeLinecap="round" /><rect x="38" y="36" width="24" height="9" rx="3" fill={K} /></g>),
  roadwork: tri(<g><path d="M36 74l14-20 14 20z" fill={K} /><circle cx="50" cy="46" r="5" fill={K} /><path d="M50 52v6" stroke={K} strokeWidth="4" /></g>),
  hospital: info(<g>{T('H', 66, 52, '#fff')}</g>),
  petrol: info(<g><rect x="30" y="28" width="26" height="44" rx="4" fill="#fff" /><rect x="35" y="33" width="16" height="12" fill={B} /><path d="M56 40h8q6 0 6 6v18" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" /></g>),
  parking: info(T('P', 68, 56, '#fff')),
  busStop: info(<g><rect x="24" y="30" width="52" height="34" rx="7" fill="#fff" /><rect x="29" y="35" width="42" height="12" fill={B} /><circle cx="36" cy="68" r="5" fill="#fff" /><circle cx="64" cy="68" r="5" fill="#fff" /></g>),
  firstAid: <g><rect x="6" y="6" width="88" height="88" rx="10" fill="#2E9E5B" /><rect x="11" y="11" width="78" height="78" rx="7" fill="none" stroke="#fff" strokeWidth="2.5" /><path d="M50 26v48M26 50h48" stroke="#fff" strokeWidth="16" /></g>,
  rest: info(<g><path d="M30 66h40M34 66V50q0-8 8-8h16q8 0 8 8v16M38 42V32" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" /></g>),
}
export default function Sign({ k, size = 96 }) {
  if (!SIGNS[k]) return (<svg viewBox="0 0 100 100" width={size} height={size} role="img" aria-label="traffic sign"><rect x="8" y="8" width="84" height="84" rx="14" fill="#DCD5F5" stroke="#263B50" strokeWidth="4" /><text x="50" y="64" textAnchor="middle" fontSize="44" fontWeight="800" fill="#263B50" fontFamily="Nunito,sans-serif">?</text></svg>)
  return (<svg viewBox="0 0 100 100" width={size} height={size} role="img" aria-label={`${k} traffic sign`}>{SIGNS[k]}</svg>)
}
