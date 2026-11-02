import React from 'react'
import { C, Person } from './parts.jsx'

/* Leg poses (local coordinates, see Person) */
export const SEAT_LEGS = [
  [-4, 16, 38, 20, 40, 88],
  [6, 18, 52, 22, 54, 88],
]
export const GROUND_LEGS = [
  [-4, 18, 48, 22, 102, 24],
  [6, 18, 58, 26, 112, 28],
]
export const KNEEL_LEGS = [
  [-8, 18, -12, 64, -14, 66],
  [8, 18, 12, 64, 14, 66],
]

/* Stool drawn behind a seated person (local coordinates) */
export function Stool() {
  return (
    <g>
      <path d="M-20 34 L-26 98 M20 34 L26 98" stroke={C.navy} strokeWidth="5" strokeLinecap="round" />
      <rect x="-30" y="26" width="60" height="10" rx="5" fill={C.yellow} />
    </g>
  )
}

/* A person seated on a stool, y=172 puts feet on the floor */
export function Seated(props) {
  return <Person y={172} legs={SEAT_LEGS} back={<Stool />} {...props} />
}

/* A person sitting on the ground, legs out to the right */
export function GroundSitter(props) {
  return <Person y={240} legs={GROUND_LEGS} {...props} />
}

/* A helper kneeling (legs are shortened so the knees meet the floor) */
export function Kneeler(props) {
  return <Person y={194} legs={KNEEL_LEGS} {...props} />
}

export function Bubble({ x = 0, y = 0, text, w, color = C.white, textColor = C.navy }) {
  const width = w || 30 + text.length * 8.6
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-8 14 L-1 28 L9 14" fill={color} stroke={C.navy} strokeWidth="3" strokeLinejoin="round" />
      <rect x={-width / 2} y="-19" width={width} height="36" rx="18" fill={color} stroke={C.navy} strokeWidth="3" />
      <rect x="-7" y="13" width="14" height="5" fill={color} />
      <text
        textAnchor="middle"
        y="5"
        fontSize="15"
        fontWeight="800"
        fill={textColor}
        fontFamily="Manrope, DM Sans, Arial, sans-serif"
      >
        {text}
      </text>
    </g>
  )
}

/* A hand seen from the front, fingers pointing down (for pressing) */
export function PressHand({ x = 0, y = 0, s = 1, skin = 2, gloved = false, className }) {
  const col = gloved ? C.mintDark : C.skin[skin]
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className={className}>
        <path d="M-26 -60 L-18 -22 L18 -22 L26 -60Z" fill={C.white} opacity="0" />
        <rect x="-34" y="-26" width="68" height="48" rx="22" fill={col} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={-34 + i * 17.5} y="8" width="15" height="30" rx="7.5" fill={col} />
        ))}
        <ellipse cx="-38" cy="2" rx="9" ry="16" transform="rotate(20 -38 2)" fill={col} />
        <path d="M-30 -22 H30" stroke="rgba(20,33,61,.08)" strokeWidth="3" />
        <path d="M6 -16 L56 -112" stroke={col} strokeWidth="30" strokeLinecap="round" />
        <path d="M44 -88 L74 -146" stroke={C.white} strokeWidth="38" strokeLinecap="round" />
      </g>
    </g>
  )
}

/* Drinking glass */
export function Glass({ x = 0, y = 0, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-13 -22 H13 L10 22 Q10 26 6 26 H-6 Q-10 26 -10 22Z" fill="#eaf6ff" stroke={C.navy} strokeWidth="3" strokeLinejoin="round" />
      <path d="M-11.5 -6 H11.5 L10 22 Q10 24 6 24 H-6 Q-10 24 -10 22Z" fill={C.water} />
    </g>
  )
}

/* Onlooker, small, standing back with palm out */
export function Onlooker({ x, y = 200, s = 0.62, skin = 1, shirt = C.yellow, side = 'left' }) {
  const arms =
    side === 'left'
      ? [
          [-17, -44, -34, -50, -48, -64],
          [17, -44, 24, -12, 26, 14],
        ]
      : [
          [-17, -44, -24, -12, -26, 14],
          [17, -44, 34, -50, 48, -64],
        ]
  return <Person x={x} y={y} s={s} skin={skin} shirt={shirt} mood="worried" arms={arms} />
}

/* Compass of tiny inline icons used inside Ban circles */
export function KnifeIcon() {
  return (
    <g>
      <path d="M-14 8 L8 -14 L12 -10 L-8 12Z" fill={C.gray} stroke={C.navy} strokeWidth="2" strokeLinejoin="round" />
      <path d="M-8 12 L-14 18" stroke={C.navy} strokeWidth="5" strokeLinecap="round" />
    </g>
  )
}
export function BandIcon() {
  return (
    <g>
      <rect x="-14" y="-5" width="28" height="10" rx="5" fill={C.coral} />
      <path d="M-8 -5 V5 M0 -5 V5 M8 -5 V5" stroke="#fff" strokeWidth="2" opacity=".6" />
    </g>
  )
}
export function LeafIcon() {
  return (
    <g>
      <path d="M-12 10 Q-14 -10 8 -12 Q12 8 -12 10Z" fill="#6fbf5d" stroke={C.navy} strokeWidth="2" strokeLinejoin="round" />
      <path d="M-10 8 L4 -6" stroke={C.navy} strokeWidth="2" />
    </g>
  )
}
export function ButterIcon() {
  return (
    <g>
      <rect x="-14" y="-8" width="28" height="16" rx="4" fill={C.yellow} stroke={C.navy} strokeWidth="2" />
      <path d="M-14 -2 H14" stroke="#fff" strokeOpacity=".6" strokeWidth="2" />
    </g>
  )
}
export function EyeIcon() {
  return (
    <g>
      <path d="M-15 0 Q0 -14 15 0 Q0 14 -15 0Z" fill="#fff" stroke={C.navy} strokeWidth="2.4" />
      <circle r="5" fill={C.navySoft} />
    </g>
  )
}
export function PushBoneIcon() {
  return (
    <g>
      <g transform="rotate(-35)">
        <rect x="-14" y="-3" width="28" height="6" rx="3" fill="#f3e9d2" stroke={C.navy} strokeWidth="2" />
        <circle cx="-14" cy="-4" r="4" fill="#f3e9d2" stroke={C.navy} strokeWidth="2" />
        <circle cx="-14" cy="4" r="4" fill="#f3e9d2" stroke={C.navy} strokeWidth="2" />
        <circle cx="14" cy="-4" r="4" fill="#f3e9d2" stroke={C.navy} strokeWidth="2" />
        <circle cx="14" cy="4" r="4" fill="#f3e9d2" stroke={C.navy} strokeWidth="2" />
      </g>
    </g>
  )
}
export function StraightenIcon() {
  return (
    <g stroke={C.navy} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M-14 8 L0 -6 L14 8" />
      <path d="M-14 -12 L14 -12" strokeDasharray="3 5" opacity=".55" />
    </g>
  )
}
export function HandGrabIcon() {
  return (
    <g>
      <path d="M-12 8 Q-14 -6 -6 -8 V-14 Q-1 -16 0 -9 V-14 Q5 -16 6 -9 Q12 -9 12 0 Q12 12 2 14 Q-8 14 -12 8Z" fill={C.skin[1]} stroke={C.navy} strokeWidth="2" strokeLinejoin="round" />
    </g>
  )
}
