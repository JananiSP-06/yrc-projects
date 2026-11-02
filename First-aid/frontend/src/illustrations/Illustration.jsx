import React from 'react'
import { C } from './parts.jsx'
import { burnsBleedingScenes } from './scenesBurnsBleeding.jsx'
import { choFaintScenes } from './scenesChokingFainting.jsx'
import { snakeFractureScenes } from './scenesSnakeFracture.jsx'

export const SCENES = {
  ...burnsBleedingScenes,
  ...choFaintScenes,
  ...snakeFractureScenes,
}

/**
 * Renders one illustrated scene on a rounded, softly decorated background.
 * Every first-aid step maps to its own scene id (e.g. "burns-2").
 */
export default function Illustration({ id, alt, tint = C.mint, accent = C.mintDark, className = '', decorative = false }) {
  const Scene = SCENES[id]
  if (!Scene) return null
  const uid = `bg-${id}`
  return (
    <svg
      className={`illustration ${className}`}
      viewBox="0 0 400 300"
      xmlns="http://www.w3.org/2000/svg"
      role={decorative ? 'presentation' : 'img'}
      aria-label={decorative ? undefined : alt}
      aria-hidden={decorative ? true : undefined}
      focusable="false"
    >
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M1 1 L9 5 L1 9Z" fill={C.coral} />
        </marker>
        <clipPath id={uid}>
          <rect width="400" height="300" rx="26" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${uid})`}>
        <rect width="400" height="300" fill={tint} />
        <circle cx="352" cy="38" r="92" fill={accent} opacity="0.16" />
        <circle cx="30" cy="290" r="84" fill="#fff" opacity="0.55" />
        <path d="M0 262 Q120 244 230 262 T400 252 V300 H0Z" fill="#fff" opacity="0.55" />
        <g className="scene">
          <Scene />
        </g>
      </g>
    </svg>
  )
}
