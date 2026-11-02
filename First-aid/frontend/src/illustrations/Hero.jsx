import React from 'react'
import { C, Person, Floor, Kit, Cross, Drop, Sparkle } from './parts.jsx'
import { Stool, SEAT_LEGS, KNEEL_LEGS } from './compose.jsx'

/** Large landing illustration: a helper bandaging a child's arm, first-aid kit beside them. */
export default function HeroIllustration({ className = '' }) {
  return (
    <svg
      className={`illustration hero-illustration ${className}`}
      viewBox="0 0 520 440"
      role="img"
      aria-label="A volunteer in a Red Cross vest kneeling to bandage a child's arm, with a red first-aid kit beside them."
      focusable="false"
    >
      <defs>
        <clipPath id="hero-clip">
          <rect width="520" height="440" rx="40" />
        </clipPath>
      </defs>
      <g clipPath="url(#hero-clip)">
        <rect width="520" height="440" fill="#d9f2ea" />
        <circle cx="430" cy="70" r="150" fill="#7fcdb8" opacity=".25" />
        <circle cx="60" cy="400" r="130" fill="#ffffff" opacity=".6" />
        <path d="M0 372 Q140 346 270 372 T520 358 V440 H0Z" fill="#ffffff" opacity=".6" />
        <Floor x={260} y={382} w={470} />

        <g className="scene">
          {/* child on a stool */}
          <Person
            x={336}
            y={268}
            s={1.1}
            skin={1}
            shirt={C.yellow}
            mood="smile"
            hairStyle="curly"
            hair="#2a1b14"
            legs={SEAT_LEGS}
            back={<Stool />}
            arms={[
              [-17, -44, -40, -30, -62, -12],
              [17, -44, 24, -12, 26, 14],
            ]}
          />
          {/* bandage on the child's forearm */}
          <path d="M292 236 L272 250" stroke={C.white} strokeWidth="22" strokeLinecap="round" />
          <path d="M286 226 l8 22 M276 234 l10 18" stroke={C.gray} strokeWidth="2.5" />
          {/* helper kneeling */}
          <Person
            x={140}
            y={291}
            s={1.2}
            skin={2}
            vest
            hairStyle="bun"
            hair="#1f1a1a"
            mood="smile"
            legs={KNEEL_LEGS}
            arms={[
              [-17, -44, -34, -10, -20, 14],
              [17, -44, 70, -44, 124, -34],
            ]}
            front={
              <g transform="translate(-20 20)">
                <circle r="11" fill={C.white} stroke={C.gray} strokeWidth="2.5" />
                <circle r="5" fill={C.gray} />
              </g>
            }
          />
          {/* first-aid kit */}
          <g transform="translate(446 352)">
            <g className="bob">
              <Kit s={0.62} />
            </g>
          </g>
          <Drop x={60} y={120} s={1.3} color="#ffffff" />
          <Cross x={470} y={150} s={0.9} color="#e8505b" />
          <Sparkle x={250} y={96} s={1.2} />
          <Sparkle x={420} y={230} s={0.8} color="#7fcdb8" />
        </g>
      </g>
    </svg>
  )
}
