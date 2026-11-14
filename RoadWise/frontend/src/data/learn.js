// Lesson catalogue, content for modules 7 and 8, and the "what to learn next" rules.
export const MODULES = [
  { n: 1, to: '/fundamentals', title: 'Road Safety Fundamentals', text: 'Why roads are risky and what we can all do.', who: 'sam', color: 'bg-sky' },
  { n: 2, to: '/traffic-rules', title: 'Traffic Rules', text: 'Rules for walkers, cyclists, riders and drivers.', who: 'ravi', color: 'bg-sun' },
  { n: 3, to: '/helmet-seatbelt', title: 'Helmet and Seatbelt Awareness', text: 'Wear them right, every time.', who: 'arjun', color: 'bg-mint' },
  { n: 4, to: '/pedestrian-safety', title: 'Pedestrian and Child Safety', text: 'Crossings, school buses, night and railway safety.', who: 'riya', color: 'bg-lav' },
  { n: 5, to: '/traffic-signals', title: 'Traffic Signals and Road Markings', text: 'Lights, police signals and road paint.', who: 'ravi', color: 'bg-coral/40' },
  { n: 6, to: '/accident-prevention', title: 'Accident Prevention', text: 'Habits that stop crashes before they start.', who: 'sam', color: 'bg-sun' },
  { n: 7, to: '/road-conditions', title: 'Road Safety in Different Conditions', text: 'Night, rain, fog, highways, schools, rail and parking.', who: 'arjun', color: 'bg-sky' },
  { n: 8, to: '/inclusive-safety', title: 'Senior Citizen and Disability Safety', text: 'Roads that work for everyone.', who: 'riya', color: 'bg-mint' },
]
export const MODULE_PATHS = MODULES.map(m => m.to)
export const TITLES = { ...Object.fromEntries(MODULES.map(m => [m.to, m.title])), '/emergency-help': 'Emergency Help', '/traffic-signs': 'Traffic Signs', '/myths-vs-facts': 'Myths vs Facts' }

export const CONDITIONS = [
  { id: 'night', title: 'Night travel', emoji: '🌙', scene: 'night', tips: ['Use dipped headlights and keep the windscreen clean.', 'Slow down. You can see less far at night.', 'Walkers and cyclists: wear bright or reflective clothes and carry a light.', 'Take a break if you feel sleepy. Tiredness is more dangerous at night.'] },
  { id: 'rain', title: 'Rainy weather', emoji: '🌧️', scene: 'rain', tips: ['Slow down. Wet roads need a longer distance to stop.', 'Brake early and gently. Avoid sudden braking.', 'Switch on headlights and wipers so you can see and be seen.', 'Do not drive through deep or fast-moving water.'] },
  { id: 'fog', title: 'Foggy conditions', emoji: '🌫️', scene: 'fog', tips: ['Slow down and use low-beam headlights. High beams bounce back and make it harder to see.', 'Keep a bigger gap and follow the road markings.', 'Do not overtake when you cannot see far ahead.', 'If it is too thick to drive, stop at a safe place well away from the road.'] },
  { id: 'highway', title: 'Highway travel', emoji: '🛣️', scene: 'highway', tips: ['Stay in your lane and use your indicator before changing lanes.', 'Keep to the speed limit and leave a safe gap.', 'Take a break about every two hours on long trips.', 'Do not stop on the carriageway. Park well off the road. On national highways you can call 1033.'] },
  { id: 'school', title: 'School zones', emoji: '🏫', scene: 'bus', tips: ['Slow down near schools and watch for children.', 'Be ready to stop around school buses. Children may step out suddenly.', 'Do not park or stop on the crossing outside a school.', 'Children: hold a grown-up’s hand and use the crossing.'] },
  { id: 'railway', title: 'Railway crossings', emoji: '🚆', scene: 'railway', tips: ['Slow down and look both ways at every railway crossing.', 'Stop when the barrier is closing or down. Wait until it opens fully.', 'Never go around or under a barrier. Trains cannot stop quickly.', 'Do not enter unless you can fully clear the tracks on the other side.'] },
  { id: 'parking', title: 'Parking areas', emoji: '🅿️', scene: 'parking', tips: ['Park only in marked bays or where parking is allowed.', 'Never park on a zebra crossing, footpath or close to a bend.', 'Look around before you reverse or open a door.', 'Keep ramps and tactile paving clear so everyone can pass.'] },
]
export const INCLUSIVE = [
  { id: 'senior', title: 'Safe crossing for senior citizens', emoji: '👵', tips: ['Use a zebra crossing or a signal and take your time. There is no need to hurry.', 'Drivers: wait patiently. Some people need more time to cross.', 'Ask a friend or family member to walk with you if you feel unsure.'] },
  { id: 'footpath', title: 'Accessible footpaths', emoji: '🚶', tips: ['A good footpath is wide, even and clear.', 'Do not park vehicles or place goods on footpaths.', 'Report broken or blocked footpaths to your local authority.'] },
  { id: 'ramps', title: 'Pedestrian ramps', emoji: '♿', tips: ['Ramps help wheelchair users, prams, walkers and people with heavy bags.', 'Keep them clear. Never park in front of a ramp.', 'Go slowly when sharing a ramp.'] },
  { id: 'tactile', title: 'Tactile paving', emoji: '🟨', tips: ['Raised bumps and lines on the ground guide people who are blind or have low vision.', 'Do not block them with vehicles, goods or crowds.', 'Walk around them or cross quickly so others can use them.'] },
  { id: 'audio', title: 'Audio pedestrian signals', emoji: '🔊', tips: ['Some crossings use beeps or sounds to say when it is safe to cross.', 'Keep noise down near a crossing so people can hear the signal.', 'Still look and listen for vehicles before you step out.'] },
  { id: 'help', title: 'Helping visually impaired pedestrians respectfully', emoji: '🤝', scene: 'inclusive', tips: ['Ask first: “May I help?” Then do what the person asks.', 'Speak directly to the person and say who you are.', 'Offer your arm only if they want it. Never grab or pull.', 'Tell them about steps, poles or vehicles ahead.'] },
]

const TOPIC_MODULE = { Basics: '/fundamentals', 'Traffic Rules': '/traffic-rules', 'Helmet and Seatbelt': '/helmet-seatbelt', 'Pedestrian Safety': '/pedestrian-safety', 'Signals and Signs': '/traffic-signals', 'Road Conditions': '/road-conditions', 'Inclusive Safety': '/inclusive-safety', Emergency: '/emergency-help' }
export const moduleForTopic = t => TOPIC_MODULE[t]
const pct = e => Math.round((e.score / e.total) * 100)

/** Which lessons to suggest next, strongest reason first. Pure function of the saved progress. */
export function recommend(state, limit = 3) {
  const visited = state.visited || {}, log = state.log || [], out = [], seen = new Set()
  const add = (to, reason) => { if (!seen.has(to) && TITLES[to]) { seen.add(to); out.push({ to, title: TITLES[to], reason }) } }
  const best = (pred) => log.filter(pred).reduce((m, e) => Math.max(m, pct(e)), -1)
  for (const t of Object.keys(TOPIC_MODULE)) { const b = best(e => e.k === 'quiz' && e.meta?.topic === t); if (b >= 0 && b < 70) add(TOPIC_MODULE[t], `Your ${t} quiz best is ${b}%. Read this lesson, then try again.`) }
  const sg = best(e => e.k === 'signal'); if (sg >= 0 && sg < 80) add('/traffic-signals', 'The Traffic Signal Game was tricky. Review signals and markings.')
  const ww = best(e => e.k === 'wwyd'); if (ww >= 0 && ww < 70) add('/pedestrian-safety', 'Revisit crossing and school bus safety before the next round.')
  const sc = best(e => e.k === 'sign'); if (sc >= 0 && sc < 70) add('/traffic-signs', 'Study the sign cards and flashcards, then retry the challenge.')
  for (const m of MODULES) { const mine = log.filter(e => e.k === 'check' && e.meta?.module === m.to); if (mine.length && !mine.some(e => e.score === 1)) add(m.to, 'You missed the knowledge check here. Have another look.') }
  for (const m of MODULES) if (!visited[m.to]) add(m.to, 'You have not opened this lesson yet.')
  for (const m of MODULES) if (!log.some(e => e.k === 'check' && e.meta?.module === m.to)) add(m.to, 'Finish the knowledge check at the end of this lesson.')
  return out.slice(0, limit)
}
