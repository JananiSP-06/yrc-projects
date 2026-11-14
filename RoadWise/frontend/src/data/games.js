import { SIGNS } from './content'
export const shuffle = a => { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[r[i], r[j]] = [r[j], r[i]] } return r }
// Put the right answer among the options in random order and return its index.
const build = (right, wrong) => { const opts = shuffle([right, ...wrong]); return { options: opts, answer: opts.indexOf(right) } }

export const LEVELS = { beginner: { label: 'Beginner', n: 5, text: 'Common signs, easy choices' }, intermediate: { label: 'Intermediate', n: 8, text: 'Any sign, trickier choices' }, advanced: { label: 'Advanced', n: 10, text: 'What should you do at each sign?' } }
const EASY = ['stop', 'noEntry', 'school', 'crossing', 'hospital', 'speed', 'parking', 'oneWay', 'railway', 'firstAid', 'noParking', 'busStop']
export function makeSignQuestions(level, signs = SIGNS) {
  if (signs.length < 4) return []
  const easy = signs.filter(s => EASY.includes(s.k))
  const pool = level === 'beginner' && easy.length >= 4 ? easy : signs
  const uniq = (list, not) => [...new Set(list)].filter(t => t !== not)
  return shuffle(pool).slice(0, LEVELS[level].n).map(s => {
    if (level === 'advanced') {
      const same = shuffle(signs.filter(x => x.k !== s.k && x.cat === s.cat)).map(x => x.do), other = shuffle(signs.filter(x => x.cat !== s.cat)).map(x => x.do)
      return { sign: s.k, prompt: 'What should a road user do at this sign?', ...build(s.do, uniq([...same, ...other], s.do).slice(0, 3)), why: `${s.name}: ${s.mean} ${s.do}` }
    }
    const far = shuffle(signs.filter(x => x.k !== s.k && x.cat !== s.cat)).map(x => x.name), near = shuffle(signs.filter(x => x.k !== s.k && x.cat === s.cat)).map(x => x.name)
    const order = level === 'intermediate' ? shuffle([...far, ...near]) : [...far, ...near]
    return { sign: s.k, prompt: 'What does this sign mean?', ...build(s.name, uniq(order, s.name).slice(0, 3)), why: `${s.name}: ${s.mean}` }
  })
}

export const TOPICS = ['Basics', 'Traffic Rules', 'Helmet and Seatbelt', 'Pedestrian Safety', 'Signals and Signs', 'Road Conditions', 'Inclusive Safety', 'Emergency']
export const QUIZ_LEVELS = [['all', 'All levels'], ['easy', 'Easy'], ['medium', 'Medium'], ['hard', 'Hard']]

const S = (who, emoji, title, text, right, wrong, why) => ({ who, emoji, title, text, right, wrong, why })
export const SCENARIOS = [
  S('riya', '🚸', 'Vehicles are coming', 'You want to cross a road but vehicles are approaching and there is no crossing close by.', 'Wait on the footpath and cross only when there is a long safe gap', ['Run across quickly before they arrive', 'Wave at the drivers and walk out'], 'Never rely on drivers stopping. Wait for a clear gap, or walk to a zebra crossing.'),
  S('riya', '🚌', 'The school bus has stopped', 'Your school bus stops. You need to cross the road after getting off.', 'Wait for the bus to leave, then look both ways and cross at a safe point', ['Run across in front of the bus', 'Cross quickly behind the bus'], 'Drivers on the road cannot see you near a bus. Wait until you can see all around.'),
  S('ravi', '🦓', 'A pedestrian on the zebra crossing', 'You are driving and a person is stepping onto the zebra crossing.', 'Slow down and stop to let them cross', ['Honk so they hurry', 'Speed up to pass before them'], 'Pedestrians on a crossing get priority. Stop well before the lines.'),
  S('sam', '🚑', 'You witness an accident', 'You see a crash on the road. People are hurt.', 'Stay safe, call 112, give the location and follow the responders', ['Crowd around and record a video', 'Drive away without telling anyone'], 'Calling 112 quickly is the most useful help. Keep clear of traffic and follow responders.'),
  S('ravi', '🚆', 'Railway crossing with barrier down', 'You reach a railway crossing and the barrier is coming down. You are in a hurry.', 'Stop behind the line and wait until the barrier opens', ['Squeeze under the barrier', 'Go around the barrier'], 'A train cannot stop quickly. Never cross when the barrier is down.'),
  S('arjun', '⛑️', 'A friend skips the helmet', 'Your friend says, "It is only a short ride, we do not need helmets."', 'Politely insist that you both wear helmets before you ride', ['Ride without it just this once', 'Say nothing and let them ride'], 'Crashes happen on short rides too. Speaking up can protect your friend.'),
  S('sam', '🌧️', 'Heavy rain on the road', 'It starts raining hard and the road is slippery.', 'Slow down, keep more distance and brake gently', ['Keep the same speed to finish sooner', 'Brake hard when something appears'], 'Wet roads need more stopping distance. Slow and smooth is safest.'),
]
export function makeScenarios(n = 5) { return shuffle(SCENARIOS).slice(0, n).map(s => ({ who: s.who, emoji: s.emoji, title: s.title, prompt: s.text, ...build(s.right, s.wrong), why: s.why })) }

const R = (role, light, extra, prompt, right, wrong, why) => ({ role, light, extra, prompt, right, wrong, why })
export const SIGNAL_ROUNDS = [
  R('car', 'red', null, 'You are driving. The light is red.', 'Stop behind the stop line', ['Go if no one is near', 'Speed up to beat it'], 'Red means stop. Wait until the light turns green.'),
  R('car', 'yellow', null, 'You are driving. The light just turned yellow.', 'Get ready to stop, and stop if it is safe', ['Speed up to cross', 'Honk and go'], 'Yellow warns that red is coming. Slow down and stop if you can do so safely.'),
  R('car', 'green', 'people', 'You are driving. The light is green but people are still on the crossing.', 'Wait until the crossing is clear', ['Honk and drive through', 'Swerve around them'], 'Green means go only when the way is clear and safe. People on the crossing come first.'),
  R('walk', 'red', null, 'You are walking. The signal for cars is green and your walk signal has not come on.', 'Wait on the footpath', ['Run across between cars', 'Cross if the cars look slow'], 'Wait until the walk signal says it is your turn.'),
  R('walk', 'green', 'turning', 'You are walking. Your signal is green, but a car is turning toward the crossing.', 'Look, make eye contact with the driver and cross when it stops', ['Step out looking at your phone', 'Run across at once'], 'A green walk signal helps, but always check that vehicles have stopped.'),
  R('car', 'green', 'ambulance', 'You are driving on green and an ambulance with a siren comes up behind you.', 'Slow down and move aside to make way', ['Stay in the middle of the road', 'Speed up to stay ahead'], 'Ambulances save lives. Safely give them room to pass.'),
  R('car', 'green', 'police', 'The light is green, but the traffic police officer raises a hand to stop you.', 'Stop as the officer signals', ['Follow the green light', 'Honk and keep going'], 'Directions from a traffic police officer overrule the signal.'),
]
export function makeSignalRounds(n = 6) { return shuffle(SIGNAL_ROUNDS).slice(0, n).map(r => ({ ...r, ...build(r.right, r.wrong) })) }
