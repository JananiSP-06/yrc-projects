import React from 'react'
import {
  C, Person, Forearm, Floor, Phone, Pad, Ban, Badge, Arrow, Snake, Ambulance, Sparkle,
} from './parts.jsx'
import {
  GroundSitter, Kneeler, Bubble, KnifeIcon, BandIcon, LeafIcon, HandGrabIcon, PushBoneIcon, StraightenIcon,
} from './compose.jsx'

const biteMarks = (
  <g>
    <ellipse cx="74" cy="22" rx="14" ry="9" fill="#f4a6a0" opacity=".85" />
    <circle cx="69" cy="21" r="2.2" fill={C.blood} />
    <circle cx="79" cy="23" r="2.2" fill={C.blood} />
  </g>
)

/* A bare lower leg, laid horizontally, used in close-up scenes */
function Leg({ x = 0, y = 0, children }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-40" y="-40" width="64" height="80" rx="20" fill={C.navySoft} />
      <rect x="-6" y="-18" width="210" height="38" rx="19" fill={C.skin[1]} />
      <circle cx="-4" cy="1" r="22" fill={C.skin[1]} />
      <path d="M196 -16 Q244 -18 248 8 Q246 24 214 24 L196 20Z" fill={C.skin[1]} />
      <path d="M206 -14 Q250 -10 250 14 L246 26 H206Z" fill={C.navy} opacity="0" />
      {children}
    </g>
  )
}

/* ================= SNAKE BITES ================= */
function Snake1() {
  return (
    <g>
      <Floor w={380} />
      <Snake x={84} y={224} s={0.95} />
      <path d="M150 140 Q166 200 150 262" stroke={C.coral} strokeWidth="4" strokeDasharray="2 10" strokeLinecap="round" fill="none" />
      <Person
        x={238}
        y={172}
        skin={1}
        shirt={C.yellow}
        mood="shock"
        hairStyle="long"
        hair="#3a2417"
        arms={[
          [-17, -44, -34, -52, -46, -74],
          [17, -44, 24, -12, 26, 14],
        ]}
      />
      <Person
        x={334}
        y={176}
        s={0.92}
        skin={2}
        vest
        hairStyle="bun"
        hair="#1f1a1a"
        mood="focus"
        arms={[
          [-17, -44, -40, -36, -62, -26],
          [17, -44, 24, -12, 26, 14],
        ]}
      />
      <Arrow className="nudge" d="M164 108 H218" />
      <Ban x={58} y={64}><HandGrabIcon /></Ban>
      <Badge x={74} y={106} text="Don't touch it" color={C.coral} w={130} />
      <Badge x={310} y={52} text="Step away" color={C.teal} w={108} />
    </g>
  )
}

function Snake2() {
  return (
    <g>
      <Floor w={380} />
      <GroundSitter x={130} skin={1} shirt={C.yellow} mood="worried" hairStyle="long" hair="#3a2417" front={biteMarks} />
      <Kneeler
        x={330}
        y={194}
        skin={2}
        vest
        hairStyle="bun"
        hair="#1f1a1a"
        mood="focus"
        arms={[
          [-17, -44, -40, -52, -54, -76],
          [17, -44, 24, -12, 26, 14],
        ]}
      />
      <Bubble x={322} y={58} text="Stay still" color={C.teal} textColor="#fff" />
      <Badge x={140} y={62} text="Keep the leg still" color={C.coral} w={150} />
      <Badge x={150} y={102} text="No walking or running" color={C.navy} w={190} />
    </g>
  )
}

function Snake3() {
  return (
    <g>
      <Floor w={340} />
      <Forearm x={190} y={196} s={0.88} skin={1} len={190} sleeve={C.teal}>
        <ellipse cx="-30" cy="0" rx="26" ry="15" fill="#f4a6a0" opacity=".8" />
        <circle cx="-34" cy="-3" r="2.4" fill={C.blood} />
        <circle cx="-25" cy="3" r="2.4" fill={C.blood} />
        <rect x="52" y="-24" width="16" height="48" rx="8" fill={C.yellow} stroke="#d9a021" strokeWidth="3" />
      </Forearm>
      <path d="M350 52 L262 150" stroke={C.white} strokeWidth="40" strokeLinecap="round" />
      <path d="M300 104 L262 148" stroke={C.skin[2]} strokeWidth="26" strokeLinecap="round" />
      <circle cx="254" cy="158" r="12" fill={C.skin[2]} />
      <circle cx="244" cy="166" r="10" fill={C.skin[2]} />
      <Arrow className="nudge" d="M262 224 H334" />
      <Badge x={100} y={64} text="Swelling can start fast" color={C.coral} w={196} />
      <Badge x={110} y={252} text="Take it off now" color={C.teal} w={140} />
    </g>
  )
}

function Snake4() {
  return (
    <g>
      <Floor w={340} />
      <Leg x={96} y={192}>
        <rect x="6" y="26" width="226" height="18" rx="6" fill="#c89b5c" />
        <path d="M20 35 H220" stroke="#a97a3c" strokeWidth="2" strokeDasharray="10 8" />
        {[56, 150].map((x) => (
          <rect key={x} x={x} y="-30" width="22" height="82" rx="6" fill={C.white} stroke={C.gray} strokeWidth="2.5" />
        ))}
        <Pad x={104} y={-6} w={46} h={30} />
      </Leg>
      <Ban x={90} y={64}><KnifeIcon /></Ban>
      <Ban x={200} y={64}><BandIcon /></Ban>
      <Ban x={310} y={64}><LeafIcon /></Ban>
      <Badge x={200} y={118} text="No cutting, tight bands or herbs" color={C.coral} w={290} />
    </g>
  )
}

function Snake5() {
  return (
    <g>
      <Floor w={380} />
      <Ambulance x={92} y={214} s={1.0} />
      <GroundSitter x={218} skin={1} shirt={C.yellow} mood="calm" hairStyle="long" hair="#3a2417" />
      <Person
        x={362}
        y={184}
        s={0.86}
        skin={2}
        vest
        hairStyle="bun"
        hair="#1f1a1a"
        mood="focus"
        arms={[
          [-17, -44, -36, -58, -26, -78],
          [17, -44, 24, -12, 26, 14],
        ]}
        front={<Phone x={-30} y={-90} r={-18} s={0.62} />}
      />
      <Badge x={200} y={48} text="Hospital with antivenom" color={C.coral} w={230} />
    </g>
  )
}

function SnakeCover() {
  return (
    <g>
      <Floor w={380} />
      <Snake x={104} y={226} s={1.25} />
      <Person
        x={296}
        y={172}
        skin={1}
        shirt={C.yellow}
        mood="shock"
        hairStyle="curly"
        hair="#2a1b14"
        arms={[
          [-17, -44, -34, -52, -46, -74],
          [17, -44, 34, -52, 46, -74],
        ]}
      />
      <Sparkle x={210} y={92} s={0.9} color={C.coral} />
    </g>
  )
}

/* ================= FRACTURES ================= */
const slingFront = (
  <g>
    <path d="M38 -22 L-18 -8 L38 24Z" fill={C.white} stroke={C.gray} strokeWidth="3" strokeLinejoin="round" />
    <path d="M34 -28 L16 -52 L-4 -56 L-17 -48 L-15 -12" stroke={C.white} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M34 -28 L16 -52 L-4 -56 L-17 -48 L-15 -12" stroke={C.gray} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="-16" cy="-48" r="6" fill={C.coral} />
    <circle cx="-8" cy="-14" r="7" fill={C.skin[1]} />
  </g>
)
const slingArms = [
  [-17, -44, -24, -12, -26, 14],
  [17, -44, 34, -14, -8, -14],
]

function Fracture1() {
  return (
    <g>
      <Floor w={380} />
      <GroundSitter
        x={130}
        skin={1}
        shirt={C.yellow}
        mood="pain"
        hairStyle="curly"
        hair="#2a1b14"
        arms={[
          [-17, -44, -30, -14, -8, -22],
          [17, -44, 22, -18, -10, -26],
        ]}
      />
      <Kneeler
        x={292}
        y={194}
        skin={2}
        vest
        hairStyle="bun"
        hair="#1f1a1a"
        mood="focus"
        arms={[
          [-17, -44, -40, -52, -54, -76],
          [17, -44, 24, -12, 26, 14],
        ]}
      />
      <Bubble x={284} y={60} text="Stay still" color={C.teal} textColor="#fff" />
      <Badge x={126} y={62} text="Don't move the injury" color={C.coral} w={186} />
      <Badge x={126} y={102} text="Serious? Call 112" color={C.navy} w={160} />
    </g>
  )
}

function Fracture2() {
  return (
    <g>
      <Floor w={340} />
      <Leg x={80} y={196}>
        <ellipse cx="108" cy="0" rx="38" ry="19" fill={C.blood} opacity=".45" />
      </Leg>
      <Pad x={188} y={196} w={64} h={42} blood={1} />
      <path d="M134 108 L166 180" stroke={C.white} strokeWidth="28" strokeLinecap="round" />
      <path d="M156 138 L166 180" stroke={C.skin[2]} strokeWidth="24" strokeLinecap="round" />
      <circle cx="166" cy="184" r="11" fill={C.skin[2]} />
      <path d="M262 108 L214 180" stroke={C.white} strokeWidth="34" strokeLinecap="round" />
      <path d="M244 138 L214 180" stroke={C.skin[2]} strokeWidth="24" strokeLinecap="round" />
      <circle cx="212" cy="184" r="11" fill={C.skin[2]} />
      <Ban x={338} y={64}><PushBoneIcon /></Ban>
      <Badge x={134} y={44} text="Press around, not on it" color={C.teal} w={200} />
      <Badge x={316} y={112} text="Never push bone" color={C.coral} w={140} />
    </g>
  )
}

function Fracture3() {
  return (
    <g>
      <Floor w={340} />
      {[150, 260].map((x) => (
        <g key={x} transform={`translate(${x} 222)`}>
          <rect x="-34" y="-16" width="68" height="32" rx="16" fill={C.white} stroke={C.gray} strokeWidth="3" />
          <circle cx="-34" cy="0" r="14" fill={C.paper} stroke={C.gray} strokeWidth="3" />
          <circle cx="-34" cy="0" r="6" fill="none" stroke={C.gray} strokeWidth="3" />
        </g>
      ))}
      <Forearm x={200} y={176} s={0.85} skin={1} len={190} sleeve={C.teal}>
        <ellipse cx="0" cy="0" rx="20" ry="10" fill="#f4a6a0" opacity=".7" />
      </Forearm>
      <path d="M78 268 L128 210" stroke={C.white} strokeWidth="28" strokeLinecap="round" />
      <path d="M96 240 L130 208" stroke={C.skin[2]} strokeWidth="24" strokeLinecap="round" />
      <path d="M334 268 L282 212" stroke={C.white} strokeWidth="28" strokeLinecap="round" />
      <path d="M312 242 L280 210" stroke={C.skin[2]} strokeWidth="24" strokeLinecap="round" />
      <Ban x={318} y={62}><StraightenIcon /></Ban>
      <Badge x={318} y={106} text="Don't straighten" color={C.coral} w={140} />
      <Badge x={104} y={62} text="Pad with towels" color={C.teal} w={150} />
    </g>
  )
}

function Fracture4() {
  return (
    <g>
      <Floor w={380} />
      <Person x={172} y={172} skin={1} shirt={C.yellow} mood="calm" hairStyle="curly" hair="#2a1b14" arms={slingArms} front={slingFront} />
      <Person
        x={64}
        y={176}
        s={0.95}
        skin={2}
        vest
        hairStyle="bun"
        hair="#1f1a1a"
        mood="focus"
        arms={[
          [-17, -44, -24, -12, -26, 14],
          [17, -44, 52, -52, 90, -50],
        ]}
      />
      <Badge x={290} y={80} text="Knot on the" color={C.teal} w={120} />
      <Badge x={290} y={114} text="uninjured side" color={C.teal} w={130} />
    </g>
  )
}

function Fracture5() {
  return (
    <g>
      <Floor w={380} />
      <Person x={130} y={172} skin={1} shirt={C.yellow} mood="calm" hairStyle="curly" hair="#2a1b14" arms={slingArms} front={slingFront} />
      <Person
        x={272}
        y={174}
        s={0.95}
        skin={2}
        vest
        hairStyle="bun"
        hair="#1f1a1a"
        mood="focus"
        arms={[
          [-17, -44, -70, -40, -112, -20],
          [17, -44, 24, -12, 26, 14],
        ]}
        front={
          <g transform="translate(-116 -26) rotate(-12)">
            <rect x="-26" y="-17" width="52" height="34" rx="9" fill="#bfe6ff" stroke="#7cc4f2" strokeWidth="3" />
            <path d="M-26 -5 H26 M-26 7 H26" stroke="#fff" strokeWidth="3" opacity=".8" />
            <path d="M0 -9 V9 M-8 -4 L8 4 M-8 4 L8 -4" stroke="#4aa3df" strokeWidth="2.4" strokeLinecap="round" />
          </g>
        }
      />
      <Badge x={92} y={44} text="Fingers warm?" color={C.coral} w={130} />
      <Badge x={290} y={44} text="Cold pack in a cloth" color={C.teal} w={176} />
    </g>
  )
}

function FractureCover() {
  return (
    <g>
      <Floor w={380} />
      <Person x={140} y={172} skin={1} shirt={C.yellow} mood="pain" hairStyle="curly" hair="#2a1b14" arms={slingArms} front={slingFront} />
      <g transform="translate(300 142)">
        <rect x="-62" y="-72" width="124" height="144" rx="18" fill={C.navy} />
        <g transform="rotate(-38)">
          <rect x="-44" y="-7" width="88" height="14" rx="7" fill="#eef3fa" />
          {[[-44, -8], [-44, 8], [44, -8], [44, 8]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="9" fill="#eef3fa" />
          ))}
          <path d="M-6 -9 L2 0 L-4 4 L4 10" stroke={C.coral} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      </g>
    </g>
  )
}

export const snakeFractureScenes = {
  'snake-cover': SnakeCover,
  'snake-bites-1': Snake1,
  'snake-bites-2': Snake2,
  'snake-bites-3': Snake3,
  'snake-bites-4': Snake4,
  'snake-bites-5': Snake5,
  'fracture-cover': FractureCover,
  'fractures-1': Fracture1,
  'fractures-2': Fracture2,
  'fractures-3': Fracture3,
  'fractures-4': Fracture4,
  'fractures-5': Fracture5,
}
