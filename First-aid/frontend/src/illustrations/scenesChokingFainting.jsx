import React from 'react'
import {
  C, Person, Floor, Phone, Badge, Arrow, Bag, Stars, Sparkle,
} from './parts.jsx'
import {
  Seated, Kneeler, Bubble, Glass, Onlooker,
} from './compose.jsx'

const THROAT_ARMS = [
  [-17, -44, -30, -58, -8, -56],
  [17, -44, 30, -58, 8, -56],
]

function Marks({ x, y }) {
  return (
    <g stroke={C.coral} strokeWidth="4" strokeLinecap="round">
      <path d={`M${x - 46} ${y - 8} l-12 -6`} />
      <path d={`M${x + 46} ${y - 8} l12 -6`} />
      <path d={`M${x} ${y - 38} v-14`} />
    </g>
  )
}

/* ================= CHOKING ================= */
function Choking1() {
  return (
    <g>
      <Floor w={380} />
      <Person x={150} y={172} skin={1} shirt={C.yellow} mood="shock" hairStyle="curly" hair="#2a1b14" arms={THROAT_ARMS} />
      <Marks x={150} y={100} />
      <Person
        x={285}
        y={172}
        skin={2}
        vest
        hairStyle="bun"
        hair="#1f1a1a"
        mood="focus"
        arms={[
          [-17, -44, -40, -42, -58, -56],
          [17, -44, 24, -12, 26, 14],
        ]}
      />
      <Bubble x={285} y={56} text="Cough!" color={C.teal} textColor="#fff" />
      <Badge x={140} y={44} text="Can't speak" color={C.coral} w={118} />
    </g>
  )
}

function Choking2() {
  return (
    <g>
      <Floor w={380} />
      <Person
        x={165}
        y={172}
        skin={1}
        shirt={C.yellow}
        mood="shock"
        lean={-30}
        hairStyle="curly"
        hair="#2a1b14"
        arms={[
          [-17, -44, -24, -12, -26, 14],
          [17, -44, 24, -12, 26, 14],
        ]}
      />
      <Person
        x={245}
        y={172}
        skin={2}
        vest
        hairStyle="bun"
        hair="#1f1a1a"
        mood="focus"
        arms={[
          [-17, -44, -34, -64, -42, -80],
          [17, -44, 24, -12, 26, 14],
        ]}
      />
      <g stroke={C.coral} strokeWidth="4" strokeLinecap="round">
        <path d="M196 92 l-12 -10" />
        <path d="M188 104 l-16 -4" />
        <path d="M196 116 l-14 8" />
      </g>
      <Badge x={300} y={52} text="5 back blows" color={C.coral} w={140} />
      <Badge x={110} y={52} text="Lean forward" color={C.teal} w={130} />
    </g>
  )
}

function Choking3() {
  return (
    <g>
      <Floor w={380} />
      <Person x={218} y={158} skin={2} vest hairStyle="bun" hair="#1f1a1a" mood="focus" arms={[]} />
      <Person x={172} y={172} skin={1} shirt={C.yellow} mood="shock" hairStyle="curly" hair="#2a1b14" arms={[]} />
      <path d="M198 112 Q196 158 176 168" stroke={C.white} strokeWidth="15" strokeLinecap="round" fill="none" />
      <path d="M238 112 Q236 172 198 178" stroke={C.white} strokeWidth="15" strokeLinecap="round" fill="none" />
      <circle cx="176" cy="170" r="10" fill={C.skin[2]} />
      <circle cx="190" cy="176" r="8" fill={C.skin[2]} />
      <Arrow className="nudge up" d="M146 214 Q160 196 170 180" />
      <Badge x={300} y={60} text="5 thrusts" color={C.coral} w={110} />
      <Badge x={92} y={60} text="Fist above navel" color={C.teal} w={158} />
    </g>
  )
}

function Choking4() {
  return (
    <g>
      <Floor w={380} />
      <Person
        x={62}
        y={176}
        skin={2}
        vest
        hairStyle="bun"
        hair="#1f1a1a"
        mood="focus"
        arms={[
          [-17, -44, -24, -12, -26, 14],
          [17, -44, 72, -34, 128, -26],
        ]}
      />
      <g transform="translate(176 120) rotate(10)">
        <rect x="-44" y="-15" width="76" height="30" rx="15" fill={C.yellow} />
        <rect x="-46" y="-9" width="14" height="18" rx="7" fill={C.skin[1]} />
        <path d="M-40 -15 q-10 -10 -14 -2 M-40 15 q-10 10 -14 2" stroke={C.skin[1]} strokeWidth="9" strokeLinecap="round" fill="none" />
        <circle cx="42" cy="4" r="17" fill={C.skin[1]} />
        <path d="M26 -4 C30 -18 54 -18 58 -4 C50 -10 36 -10 26 -4Z" fill="#2a1b14" />
        <circle cx="46" cy="8" r="2" fill={C.navy} />
        <path d="M44 14 q4 3 8 0" stroke={C.navy} strokeWidth="2" strokeLinecap="round" fill="none" />
      </g>
      <path d="M318 6 L200 92" stroke={C.white} strokeWidth="36" strokeLinecap="round" />
      <path d="M250 62 L196 96" stroke={C.skin[2]} strokeWidth="26" strokeLinecap="round" />
      <circle cx="190" cy="98" r="14" fill={C.skin[2]} />
      <g stroke={C.coral} strokeWidth="4" strokeLinecap="round">
        <path d="M166 84 l-12 -10" />
        <path d="M162 100 l-16 -2" />
        <path d="M168 114 l-14 8" />
      </g>
      <Badge x={290} y={236} text="Under 1 year" color={C.coral} w={130} />
      <Badge x={110} y={44} text="Head lower than body" color={C.teal} w={190} />
    </g>
  )
}

function Choking5() {
  return (
    <g>
      <Floor y={268} w={340} />
      <Seated
        x={105}
        skin={1}
        shirt={C.yellow}
        mood="calm"
        hairStyle="curly"
        hair="#2a1b14"
        arms={[
          [-17, -44, -24, -12, -26, 14],
          [17, -44, 10, -30, -6, -24],
        ]}
      />
      <Person
        x={292}
        y={172}
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
      <Bubble x={200} y={52} text="Call 112, repeat 5 + 5" color={C.coral} textColor="#fff" />
    </g>
  )
}

function ChokingCover() {
  return (
    <g>
      <Floor w={380} />
      <Person x={150} y={172} skin={1} shirt={C.yellow} mood="shock" hairStyle="curly" hair="#2a1b14" arms={THROAT_ARMS} />
      <Marks x={150} y={100} />
      <Person
        x={270}
        y={172}
        skin={2}
        vest
        hairStyle="bun"
        hair="#1f1a1a"
        mood="worried"
        arms={[
          [-17, -44, -40, -52, -54, -78],
          [17, -44, 40, -52, 54, -78],
        ]}
      />
      <Bubble x={270} y={44} text="Help!" color={C.coral} textColor="#fff" />
    </g>
  )
}

/* ================= FAINTING ================= */
const lyingBase = {
  r: -90,
  skin: 2,
  shirt: C.yellow,
  pants: C.navySoft,
  hairStyle: 'short',
  hair: '#1f1a1a',
  mood: 'out',
}

function Fainting1() {
  return (
    <g>
      <Floor w={380} />
      <Person
        {...lyingBase}
        x={130}
        y={246}
        legs={[
          [-8, 18, 6, 58, 30, 90],
          [8, 18, 22, 58, 46, 90],
        ]}
      />
      <Bag x={222} y={244} w={64} h={40} color={C.purple} />
      <Arrow className="nudge up" d="M296 232 V186" />
      <Badge x={296} y={162} text="Legs up 30 cm" color={C.coral} w={146} />
      <Badge x={110} y={110} text="Lie flat on back" color={C.teal} w={150} />
    </g>
  )
}

function Fainting2() {
  return (
    <g>
      <Floor w={380} />
      <Kneeler
        x={172}
        y={184}
        skin={1}
        vest
        hairStyle="bun"
        hair="#1f1a1a"
        mood="focus"
        arms={[
          [-17, -44, -34, -4, -44, 50],
          [17, -44, 24, -12, 26, 14],
        ]}
      />
      <Person {...lyingBase} x={176} y={250} skin={2} />
      <g stroke={C.teal} strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M200 212 q8 -8 16 0 t16 0" />
        <path d="M210 198 q8 -8 16 0 t16 0" opacity=".6" />
      </g>
      <Bubble x={290} y={56} text="Can you hear me?" color={C.teal} textColor="#fff" />
      <Badge x={80} y={96} text="Look, listen, feel" color={C.coral} w={150} />
      <Badge x={310} y={150} text="Up to 10 seconds" color={C.navy} w={160} />
    </g>
  )
}

function Fainting3() {
  return (
    <g>
      <Floor w={380} />
      <Onlooker x={40} y={206} side="left" skin={3} shirt={C.coral} />
      <Onlooker x={364} y={206} side="right" skin={0} shirt={C.mintDark} />
      <Kneeler
        x={196}
        y={184}
        skin={1}
        vest
        hairStyle="bun"
        hair="#1f1a1a"
        mood="focus"
        arms={[
          [-17, -44, -26, 4, -14, 58],
          [17, -44, 24, -12, 26, 14],
        ]}
      />
      <Person {...lyingBase} x={236} y={250} />
      <g className="wind" stroke={C.blueDark} strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M288 160 q16 -8 32 0 t32 0" />
        <path d="M296 178 q16 -8 32 0 t32 0" />
      </g>
      <Badge x={118} y={58} text="Loosen collar" color={C.teal} w={132} />
      <Badge x={316} y={104} text="Fresh air" color={C.coral} w={100} />
    </g>
  )
}

function Fainting4() {
  return (
    <g>
      <Floor w={380} />
      <Person
        {...lyingBase}
        x={190}
        y={246}
        legs={[
          [-8, 18, -10, 58, -10, 90],
          [8, 18, 40, 40, 52, 72],
        ]}
        arms={[
          [-17, -44, -24, -12, -26, 14],
          [17, -44, 36, -60, 14, -76],
        ]}
      />
      <Phone x={312} y={196} r={-10} s={1.1} />
      <Badge x={312} y={150} text="Call 112" color={C.coral} w={104} />
      <Badge x={110} y={150} text="Tilt head back" color={C.teal} w={140} />
      <Badge x={200} y={60} text="Breathing normally, not waking" color={C.navy} w={270} />
    </g>
  )
}

function Fainting5() {
  return (
    <g>
      <Floor y={268} w={340} />
      <Seated
        x={105}
        skin={1}
        shirt={C.yellow}
        mood="calm"
        hairStyle="long"
        hair="#3a2417"
        arms={[
          [-17, -44, -24, -12, -26, 14],
          [17, -44, 34, -60, 24, -76],
        ]}
      />
      <Person
        x={232}
        y={172}
        skin={2}
        vest
        hairStyle="bun"
        hair="#1f1a1a"
        mood="smile"
        arms={[
          [-17, -44, -40, -36, -60, -30],
          [17, -44, 24, -12, 26, 14],
        ]}
        front={<Glass x={-66} y={-44} s={1} />}
      />
      <Badge x={318} y={52} text="Sit up slowly" color={C.teal} w={130} />
      <Sparkle x={330} y={186} s={1} />
    </g>
  )
}

function FaintingCover() {
  return (
    <g>
      <Floor w={380} />
      <Person {...lyingBase} x={208} y={248} />
      <Stars x={136} y={212} rx={34} ry={13} />
      <Sparkle x={60} y={120} s={1.1} />
      <Sparkle x={330} y={140} s={0.8} color={C.mintDark} />
    </g>
  )
}

export const choFaintScenes = {
  'choking-cover': ChokingCover,
  'choking-1': Choking1,
  'choking-2': Choking2,
  'choking-3': Choking3,
  'choking-4': Choking4,
  'choking-5': Choking5,
  'fainting-cover': FaintingCover,
  'fainting-1': Fainting1,
  'fainting-2': Fainting2,
  'fainting-3': Fainting3,
  'fainting-4': Fainting4,
  'fainting-5': Fainting5,
}
