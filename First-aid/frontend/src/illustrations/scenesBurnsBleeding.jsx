import React from 'react'
import {
  C, Person, Forearm, Floor, Tap, Clock, Phone, Pad, Ban, Ice, Flame, Drop, Cross, Badge, Arrow, Bandage, Cushion,
} from './parts.jsx'
import {
  Seated, Bubble, PressHand, ButterIcon, EyeIcon, Stool, SEAT_LEGS,
} from './compose.jsx'

/* ---------- shared pieces ---------- */
function Stove({ x = 20, y = 198 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="12" width="120" height="58" rx="8" fill={C.navySoft} />
      <rect x="-6" y="0" width="132" height="14" rx="7" fill={C.gray} />
      <circle cx="30" cy="41" r="6" fill={C.grayDark} />
      <circle cx="52" cy="41" r="6" fill={C.grayDark} />
      {/* pot */}
      <rect x="34" y="-34" width="62" height="34" rx="6" fill={C.grayDark} />
      <rect x="28" y="-38" width="74" height="8" rx="4" fill={C.gray} />
      <path d="M96 -22 H116" stroke={C.grayDark} strokeWidth="7" strokeLinecap="round" />
      <Flame x={65} y={-2} s={0.42} />
      <g className="steam" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".9">
        <path d="M50 -50 q-8 -12 0 -22 q8 -10 0 -22" />
        <path d="M72 -50 q-8 -12 0 -22 q8 -10 0 -22" />
        <path d="M94 -50 q-8 -12 0 -22 q8 -10 0 -22" />
      </g>
    </g>
  )
}

const burnArm = (
  <g>
    <ellipse cx="-25" cy="-1" rx="7.5" ry="8.5" fill={C.burn} />
    <circle cx="-26" cy="-3" r="2" fill="#f7b3a5" />
  </g>
)

function CallPair({ badge, caseFront, caseArms, caseMood = 'calm', caseShirt = C.yellow, caseSkin = 1 }) {
  return (
    <g>
      <Floor y={268} w={340} />
      <Seated x={105} s={1} skin={caseSkin} shirt={caseShirt} mood={caseMood} arms={caseArms} front={caseFront} hairStyle="long" hair="#3a2417" />
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
      <Bubble x={200} y={52} text={badge} color={C.coral} textColor="#fff" />
    </g>
  )
}

/* ================= BURNS ================= */
function Burns1() {
  return (
    <g>
      <Floor w={380} />
      <Stove x={22} y={198} />
      {/* danger dashes */}
      <path d="M150 150 Q168 200 150 262" stroke={C.coral} strokeWidth="4" strokeDasharray="2 10" strokeLinecap="round" fill="none" />
      <Person
        x={245}
        y={172}
        skin={1}
        shirt={C.yellow}
        mood="pain"
        arms={[
          [-17, -44, -24, -12, -26, 14],
          [17, -44, 10, -20, -22, -6],
        ]}
        front={burnArm}
      />
      <Person
        x={340}
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
      <Arrow className="nudge" d="M150 118 H206" />
      <Drop x={170} y={236} s={0.7} className="drip" />
    </g>
  )
}

function Burns2() {
  return (
    <g>
      <rect x="40" y="236" width="320" height="32" rx="12" fill={C.blue} stroke={C.blueDark} strokeWidth="3" />
      <path d="M60 252 q20 -6 40 0 t40 0 t40 0 t40 0 t40 0 t40 0" stroke={C.water} strokeWidth="4" fill="none" strokeLinecap="round" />
      <rect x="84" y="118" width="32" height="10" rx="5" fill={C.grayDark} />
      <Forearm x={225} y={202} s={0.82} skin={1} len={190} sleeve={C.teal}>
        <ellipse cx="-34" cy="-2" rx="30" ry="12" fill={C.burn} />
        <ellipse cx="-34" cy="-2" rx="16" ry="6" fill="#f7a495" />
      </Forearm>
      <Tap x={100} y={120} s={1} />
      <Drop x={150} y={226} s={0.6} className="drip" />
      <Drop x={196} y={228} s={0.5} className="drip d2" />
      <Clock x={330} y={62} r={26} label="20 min" />
      <Ban x={52} y={190}><Ice s={0.9} /></Ban>
      <Badge x={52} y={232} text="No ice" color={C.coral} w={74} />
    </g>
  )
}

function Burns3() {
  return (
    <g>
      <Floor w={300} />
      {/* sleeve & hand */}
      <rect x="168" y="238" width="64" height="62" rx="16" fill={C.teal} />
      <rect x="150" y="168" width="100" height="84" rx="34" fill={C.skin[1]} />
      <ellipse cx="190" cy="214" rx="22" ry="17" fill={C.burn} />
      <ellipse cx="190" cy="214" rx="11" ry="8" fill="#f7a495" />
      {[
        [161, 112, 22, 66],
        [186, 92, 22, 86],
        [211, 102, 22, 76],
        [236, 126, 20, 52],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x - w / 2 + 11} y={y} width={w} height={h + 20} rx={w / 2} fill={C.skin[1]} />
      ))}
      <rect x="130" y="176" width="40" height="22" rx="11" transform="rotate(-38 150 190)" fill={C.skin[1]} />
      {/* ring */}
      <rect x="198" y="158" width="26" height="12" rx="6" fill="none" stroke={C.yellow} strokeWidth="6" />
      <circle cx="211" cy="152" r="3" fill="#fff" />
      {/* helper fingers pinching */}
      <path d="M392 120 L268 150" stroke={C.skin[2]} strokeWidth="30" strokeLinecap="round" />
      <path d="M392 120 L268 150" stroke={C.white} strokeWidth="30" strokeLinecap="round" opacity="0" />
      <circle cx="236" cy="156" r="11" fill={C.skin[2]} />
      <circle cx="226" cy="163" r="9" fill={C.skin[2]} />
      <Arrow className="nudge up" d="M206 138 V84" />
      <Badge x={330} y={236} text="Gently" color={C.teal} w={90} />
      <Ban x={72} y={80}><path d="M-12 -4 H12" stroke={C.burn} strokeWidth="9" strokeLinecap="round" /></Ban>
      <Badge x={72} y={122} text="Not if stuck" color={C.coral} w={114} />
    </g>
  )
}

function Burns4() {
  return (
    <g>
      <Floor w={340} />
      <Forearm x={200} y={190} s={0.88} skin={1} len={190} sleeve={C.teal}>
        <ellipse cx="-22" cy="-2" rx="26" ry="11" fill={C.burn} />
      </Forearm>
      {/* cling film laid loosely */}
      <g>
        <path
          d="M118 160 q16 -8 34 -2 t40 0 t40 2 t30 -2 L262 218 q-20 6 -40 0 t-40 2 t-40 -2 t-24 2Z"
          fill="#bfe6ff"
          fillOpacity=".55"
          stroke="#7cc4f2"
          strokeWidth="2.5"
          strokeDasharray="6 5"
        />
        <path d="M140 172 q40 8 80 -2 M150 196 q40 8 90 0" stroke="#fff" strokeOpacity=".9" strokeWidth="3" strokeLinecap="round" fill="none" />
      </g>
      {/* film box */}
      <g transform="translate(318 74)">
        <rect x="-52" y="-22" width="104" height="44" rx="8" fill={C.white} stroke={C.navy} strokeWidth="3" />
        <rect x="-52" y="-22" width="104" height="14" rx="8" fill={C.teal} />
        <circle cx="-28" cy="8" r="9" fill="#bfe6ff" stroke="#7cc4f2" strokeWidth="2" />
        <path d="M-6 6 H38" stroke={C.gray} strokeWidth="4" strokeLinecap="round" />
        <path d="M-6 14 H24" stroke={C.gray} strokeWidth="4" strokeLinecap="round" />
      </g>
      <Ban x={62} y={82}><ButterIcon /></Ban>
      <Badge x={62} y={124} text="No butter" color={C.coral} w={110} />
      <Badge x={200} y={260} text="Loose, not tight" color={C.teal} w={150} />
    </g>
  )
}

function Burns5() {
  return (
    <CallPair
      badge="Large, deep or on face?"
      caseArms={[
        [-17, -44, -24, -12, -26, 14],
        [17, -44, 42, -22, 66, -6],
      ]}
      caseFront={
        <path d="M42 -22 L66 -6" stroke="#bfe6ff" strokeOpacity=".8" strokeWidth="19" strokeLinecap="round" />
      }
    />
  )
}

/* ================= BLEEDING ================= */
const bleedArm = (
  <g>
    <ellipse cx="46" cy="-10" rx="9" ry="6" fill={C.blood} transform="rotate(30 46 -10)" />
  </g>
)

function Bleeding1() {
  return (
    <g>
      <Floor y={268} w={340} />
      <Seated
        x={105}
        skin={1}
        shirt={C.yellow}
        mood="worried"
        hairStyle="long"
        hair="#3a2417"
        arms={[
          [-17, -44, -24, -12, -26, 14],
          [17, -44, 42, -22, 66, -6],
        ]}
        front={bleedArm}
      />
      <Drop x={178} y={226} s={0.55} color={C.blood} className="drip" />
      <Person
        x={292}
        y={172}
        skin={2}
        vest
        gloves
        hairStyle="bun"
        hair="#1f1a1a"
        mood="focus"
        arms={[
          [-17, -44, -36, -58, -26, -78],
          [17, -44, 24, -12, 26, 14],
        ]}
        front={<Phone x={-30} y={-90} r={-18} s={0.62} />}
      />
      <Bubble x={200} y={52} text="Call 112" color={C.coral} textColor="#fff" />
    </g>
  )
}

function Bleeding2() {
  return (
    <g>
      <Floor y={268} w={340} />
      <Forearm x={200} y={218} s={0.88} skin={1} len={190} sleeve={C.teal}>
        <ellipse cx="0" cy="2" rx="28" ry="9" fill={C.blood} opacity=".9" />
      </Forearm>
      <Pad x={200} y={200} w={86} h={36} blood={1} />
      <PressHand x={200} y={146} s={0.95} skin={2} className="press" />
      <Arrow className="nudge down" d="M318 84 V140" />
      <Badge x={318} y={60} text="Press firmly" color={C.coral} w={130} />
    </g>
  )
}

function Bleeding3() {
  return (
    <g>
      <Floor y={268} w={340} />
      <Pad x={200} y={236} w={110} h={36} blood={2} />
      <Pad x={200} y={214} w={106} h={36} blood={1.4} />
      <Pad x={200} y={192} w={102} h={36} />
      <PressHand x={200} y={138} s={0.95} skin={2} className="press" />
      <Clock x={332} y={116} r={24} label="Keep going" color={C.teal} />
      <Ban x={66} y={112}><EyeIcon /></Ban>
      <Badge x={66} y={154} text="Don't peek" color={C.coral} w={110} />
    </g>
  )
}

function Bleeding4() {
  return (
    <g>
      <Floor y={268} w={380} />
      <Person
        x={196}
        y={244}
        r={-90}
        skin={1}
        shirt={C.yellow}
        mood="calm"
        hairStyle="long"
        hair="#3a2417"
        legs={[
          [-8, 18, -10, 58, -10, 90],
          [8, 18, 10, 58, 10, 90],
        ]}
        arms={[
          [-17, -44, -24, -12, -26, 14],
          [17, -44, 46, -30, 70, -8],
        ]}
        front={
          <g>
            <rect x="-24" y="2" width="48" height="94" rx="14" fill={C.coral} opacity=".92" />
            <path d="M-16 20 H16 M-16 36 H16" stroke="#fff" strokeOpacity=".35" strokeWidth="3" />
          </g>
        }
      />
      <Cushion x={170} y={220} w={52} h={26} r={0} color={C.purple} />
      <ellipse cx="190" cy="178" rx="8" ry="5.5" fill={C.blood} />
      <Arrow className="nudge up" d="M206 150 V106" />
      <Badge x={206} y={84} text="Above heart" color={C.coral} w={124} />
      <Badge x={318} y={168} text="Keep warm" color={C.teal} w={112} />
    </g>
  )
}

function Bleeding5() {
  return (
    <g>
      <Floor y={268} w={340} />
      <Forearm x={190} y={196} s={0.88} skin={1} len={190} sleeve={C.teal} />
      <Pad x={190} y={178} w={74} h={32} />
      {/* bandage wraps */}
      {[150, 176, 202, 228].map((x, i) => (
        <path key={i} d={`M${x} 166 l22 0 l-16 40 l-22 0Z`} fill={C.white} stroke={C.gray} strokeWidth="2" strokeLinejoin="round" />
      ))}
      {/* roll */}
      <g transform="translate(332 228)">
        <circle r="26" fill={C.white} stroke={C.gray} strokeWidth="3" />
        <circle r="16" fill="none" stroke={C.gray} strokeWidth="3" />
        <circle r="7" fill={C.gray} />
      </g>
      <path d="M306 224 Q270 214 244 200" stroke={C.white} strokeWidth="16" strokeLinecap="round" fill="none" />
      <path d="M306 224 Q270 214 244 200" stroke={C.gray} strokeWidth="2" strokeLinecap="round" fill="none" />
      <Badge x={110} y={68} text="Snug, not tight" color={C.teal} w={150} />
      <Badge x={290} y={68} text="Fingers warm?" color={C.coral} w={130} />
    </g>
  )
}

/* ================= COVERS ================= */
function BurnsCover() {
  return (
    <g>
      <Floor w={380} />
      <Stove x={30} y={198} />
      <Person
        x={265}
        y={172}
        skin={1}
        shirt={C.yellow}
        mood="pain"
        hairStyle="long"
        hair="#3a2417"
        arms={[
          [-17, -44, -24, -12, -26, 14],
          [17, -44, 10, -20, -22, -6],
        ]}
        front={burnArm}
      />
      <Drop x={345} y={110} s={1.4} className="drip" />
      <Ice x={330} y={170} s={1} />
    </g>
  )
}

function BleedingCover() {
  return (
    <g>
      <Floor w={380} />
      <Seated
        x={115}
        skin={1}
        shirt={C.yellow}
        mood="worried"
        hairStyle="long"
        hair="#3a2417"
        arms={[
          [-17, -44, -24, -12, -26, 14],
          [17, -44, 42, -22, 66, -6],
        ]}
        front={bleedArm}
      />
      <g transform="translate(300 150)">
        <Drop s={3.2} color={C.blood} className="pulse" />
        <Cross x={0} y={10} s={0.8} color="#fff" />
      </g>
    </g>
  )
}

export const burnsBleedingScenes = {
  'burns-cover': BurnsCover,
  'burns-1': Burns1,
  'burns-2': Burns2,
  'burns-3': Burns3,
  'burns-4': Burns4,
  'burns-5': Burns5,
  'bleeding-cover': BleedingCover,
  'bleeding-1': Bleeding1,
  'bleeding-2': Bleeding2,
  'bleeding-3': Bleeding3,
  'bleeding-4': Bleeding4,
  'bleeding-5': Bleeding5,
}
