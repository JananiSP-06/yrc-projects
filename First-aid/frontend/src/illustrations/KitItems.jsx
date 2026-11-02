import React from 'react'
import { C } from './parts.jsx'

/* Icons for the "First Aid Essentials" kit explorer. All drawn in a 100x100 box. */
function Plasters() {
  return (
    <g>
      <g transform="rotate(-24 50 50)">
        <rect x="14" y="38" width="72" height="24" rx="12" fill="#f3c9a0" />
        <rect x="38" y="38" width="24" height="24" fill="#ffe3c7" />
        <circle cx="26" cy="50" r="1.6" fill="#d9a77a" />
        <circle cx="74" cy="50" r="1.6" fill="#d9a77a" />
      </g>
      <g transform="rotate(30 50 50)">
        <rect x="14" y="38" width="72" height="24" rx="12" fill="#f0b98a" opacity=".95" />
        <rect x="38" y="38" width="24" height="24" fill="#ffe3c7" />
      </g>
    </g>
  )
}
function GauzePads() {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${12 + i * 6} ${52 - i * 12})`}>
          <rect width="56" height="36" rx="5" fill="#fff" stroke={C.gray} strokeWidth="2.5" />
          <path d="M8 12 H48 M8 24 H48" stroke={C.gray} strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}
    </g>
  )
}
function Roller() {
  return (
    <g>
      <rect x="20" y="26" width="60" height="48" rx="12" fill="#fff" stroke={C.gray} strokeWidth="3" />
      <ellipse cx="50" cy="26" rx="30" ry="9" fill="#fff" stroke={C.gray} strokeWidth="3" />
      <ellipse cx="50" cy="26" rx="10" ry="3.5" fill={C.gray} />
      <path d="M24 42 Q50 52 76 42 M24 56 Q50 66 76 56" stroke={C.gray} strokeWidth="2.5" fill="none" />
      <path d="M78 66 Q92 70 92 84 H66" stroke="#fff" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M78 66 Q92 70 92 84 H66" stroke={C.gray} strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </g>
  )
}
function Triangular() {
  return (
    <g>
      <path d="M10 28 H90 L50 82Z" fill="#fff" stroke={C.gray} strokeWidth="3" strokeLinejoin="round" />
      <path d="M10 28 H90" stroke={C.coral} strokeWidth="3" opacity=".0" />
      <circle cx="50" cy="40" r="4.5" fill={C.coral} />
      <path d="M47 38 q3 -6 6 0" stroke={C.coralDark} strokeWidth="2" fill="none" />
      <path d="M30 40 L50 70 L70 40" stroke={C.gray} strokeWidth="2" fill="none" strokeDasharray="4 4" />
    </g>
  )
}
function Scissors() {
  return (
    <g>
      <path d="M44 48 L82 14" stroke={C.grayDark} strokeWidth="7" strokeLinecap="round" />
      <path d="M56 50 L84 30" stroke="#aab4c5" strokeWidth="7" strokeLinecap="round" />
      <circle cx="30" cy="66" r="13" fill="none" stroke={C.coral} strokeWidth="7" />
      <circle cx="54" cy="76" r="13" fill="none" stroke={C.coral} strokeWidth="7" />
      <path d="M38 58 L52 46 M52 66 L56 52" stroke={C.grayDark} strokeWidth="5" strokeLinecap="round" />
    </g>
  )
}
function Gloves() {
  return (
    <g>
      <path d="M30 88 V56 Q18 52 20 38 Q22 30 28 36 V22 Q32 14 38 22 V16 Q44 8 50 18 V20 Q56 14 60 24 V34 Q70 30 72 40 Q74 56 62 64 V88Z" fill="#9fe0cf" stroke="#4fb89f" strokeWidth="3" strokeLinejoin="round" />
      <path d="M30 80 H62" stroke="#4fb89f" strokeWidth="3" />
    </g>
  )
}
function Wipes() {
  return (
    <g>
      <rect x="18" y="26" width="64" height="48" rx="8" fill="#fff" stroke={C.gray} strokeWidth="3" />
      <path d="M18 34 H82 M18 66 H82" stroke={C.gray} strokeWidth="2" strokeDasharray="3 3" />
      <rect x="30" y="40" width="40" height="20" rx="4" fill={C.mint} />
      <path d="M44 50 H56 M50 44 V56" stroke={C.teal} strokeWidth="3.5" strokeLinecap="round" />
    </g>
  )
}
function ClingFilm() {
  return (
    <g>
      <rect x="14" y="30" width="72" height="42" rx="8" fill="#fff" stroke={C.navy} strokeWidth="3" />
      <rect x="14" y="30" width="72" height="14" rx="8" fill={C.teal} />
      <circle cx="34" cy="58" r="8" fill="#bfe6ff" stroke="#7cc4f2" strokeWidth="2" />
      <path d="M52 56 H76 M52 64 H68" stroke={C.gray} strokeWidth="3.5" strokeLinecap="round" />
    </g>
  )
}

export const KIT_ITEMS = [
  { id: 'plasters', name: 'Adhesive plasters', use: 'Cover small cuts and grazes after cleaning.', Icon: Plasters, tint: '#fff1e2' },
  { id: 'gauze', name: 'Sterile gauze pads', use: 'Press on wounds to control bleeding, or cover burns and cuts.', Icon: GauzePads, tint: '#fde4e6' },
  { id: 'roller', name: 'Roller bandage', use: 'Hold a pad in place. Wrap firmly, not tightly.', Icon: Roller, tint: '#e1edfb' },
  { id: 'triangular', name: 'Triangular bandage', use: 'Make an arm sling, or use as a large dressing.', Icon: Triangular, tint: '#ece5fd' },
  { id: 'scissors', name: 'Blunt-tip scissors', use: 'Cut bandages, tape and clothing safely.', Icon: Scissors, tint: '#ffe9df' },
  { id: 'gloves', name: 'Disposable gloves', use: 'Protect you and the casualty from germs and blood.', Icon: Gloves, tint: '#ddf4ee' },
  { id: 'wipes', name: 'Antiseptic wipes', use: 'Clean your hands or the skin around a minor wound.', Icon: Wipes, tint: '#ddf4ee' },
  { id: 'film', name: 'Cling film', use: 'Cover a cooled burn loosely. Lay it on, do not wrap.', Icon: ClingFilm, tint: '#e1edfb' },
]

export function KitIcon({ item, size = 96 }) {
  const { Icon } = item
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true" focusable="false">
      <Icon />
    </svg>
  )
}
