import Module from './Module'
import { Section } from '../components/ui'
import CompareCard from '../components/CompareScenes'
import { Link } from 'react-router-dom'

export const Fundamentals = () => <Module path="/fundamentals"
  hero={{ title: 'Road Safety Fundamentals', intro: 'Road safety means using roads in a way that keeps everyone safe: walkers, cyclists, riders and drivers.', who: 'sam', color: 'bg-sky', crumb: 'Fundamentals' }}
  cards={{ title: 'Common causes of road accidents', sub: 'Most crashes come from choices we can change.', items: [
    ['Overspeeding', 'Higher speed means less time to react and a harder crash.', '🏎️'], ['Distracted driving', 'Phones and other distractions take eyes off the road.', '📱'],
    ['Drunk driving', 'Alcohol slows reactions and blurs judgement.', '🚫'], ['Signal violations', 'Jumping a red light can cause serious collisions.', '🚦'],
    ['Wrong-side driving', 'Vehicles coming head-on have no time to avoid you.', '↔️'], ['Unsafe overtaking', 'Overtaking on bends or crests is very risky.', '🚗'],
    ['Fatigue', 'Tired drivers react slowly and may fall asleep.', '😴'], ['No helmet or seatbelt', 'Protection is not worn, so injuries are worse.', '⛑️']] }}
  extra={<><Section title="Everyone shares the road" sub="Each road user has a part to play."><div className="grid md:grid-cols-4 gap-5">{[['Pedestrians', 'Use footpaths and crossings.', 'bg-mint'], ['Cyclists', 'Be visible and follow rules.', 'bg-sky'], ['Riders', 'Helmet on, speed in check.', 'bg-sun'], ['Drivers', 'Seatbelt on, eyes on the road.', 'bg-lav']].map(([t, d, c]) => <div key={t} className={`card ${c}/70 text-center`}><h3 className="text-xl">{t}</h3><p>{d}</p></div>)}</div></Section><Section title="Right vs wrong"><CompareCard kind="phone" title="Distracted driving" /></Section></>}
  dos={['Follow traffic rules every time', 'Plan your trip and leave early', 'Respect other road users', 'Check your vehicle before you start']}
  donts={['Do not rush or race', 'Do not use a phone while travelling', 'Do not drink and drive', 'Do not ignore signals or signs']}
  tips={[['Rules protect you', 'Traffic rules are made to keep everyone safe, not to slow you down.'], ['Be predictable', 'Use indicators and keep to your lane so others know your plan.', 'bg-mint'], ['Speak up', 'Gently remind friends and family to wear helmets and seatbelts.', 'bg-lav']]}
  scenario={{ who: 'riya', title: 'Running late for school', text: 'Riya is late and sees a gap in traffic far from the zebra crossing. What should she do?', answer: 'Walk to the zebra crossing, wait for vehicles to stop, then cross. Arriving a little late is always better than getting hurt.' }}
  check={{ q: 'Which of these is a common cause of road accidents?', options: ['Wearing a helmet', 'Overspeeding', 'Using a zebra crossing', 'Keeping a safe distance'], answer: 1, why: 'Overspeeding reduces reaction time and makes crashes worse.' }} />

export const Helmet = () => <Module path="/helmet-seatbelt"
  hero={{ title: 'Helmet and Seatbelt Awareness', intro: 'Helmets and seatbelts are simple things that can save a life. Learn to use them the right way.', who: 'arjun', color: 'bg-sun', crumb: 'Helmet and Seatbelt' }}
  cards={{ title: 'Wear it right', sub: 'Having a helmet or seatbelt is not enough. It must be used correctly.', items: [
    ['Helmets protect the head', 'A helmet cushions the head in a fall or crash.', '⛑️'], ['Choose a certified helmet', 'Pick one with a recognised standard mark, such as ISI/BIS.', '✅'],
    ['Fit it snugly', 'It should sit level and not wobble or slide.', '📏'], ['Fasten the chin strap', 'An open strap lets the helmet fly off in a crash.', '🔒'],
    ['Pillion riders too', 'The person behind needs a helmet as well.', '🏍️'], ['Seatbelt position', 'Lap belt low on the hips; shoulder belt across the chest.', '🚗'],
    ['Back seat, buckle up', 'Rear passengers can be thrown forward without a belt.', '👨‍👩‍👧'], ['Airbags need belts', 'Airbags work together with seatbelts, not instead of them.', '💨']] }}
  dos={['Wear a certified, well-fitted helmet', 'Fasten the chin strap every time', 'Make sure the pillion rider wears one too', 'Buckle up before the car moves']}
  donts={['Do not wear a loose or cracked helmet', 'Do not leave the strap open', 'Do not tuck the belt under your arm', 'Do not ride or drive without protection, even for short trips']}
  tips={[['Two-finger check', 'Fit a helmet so that it sits snug; you should not be able to roll it off your head.'], ['Replace after a crash', 'A helmet that took a hard hit may be damaged. Replace it.', 'bg-mint'], ['Children need protection', 'Use suitable child restraints and helmets sized for children.', 'bg-lav']]}
  scenario={{ who: 'arjun', title: 'Just a quick trip', text: 'Arjun is going to a shop two streets away. His helmet is at home. Should he ride without it?', answer: 'No. Crashes can happen on short trips too. Go back and put the helmet on and fasten the strap.' }}
  check={{ q: 'When should you wear a helmet on a two-wheeler?', options: ['Only on highways', 'Only on long journeys', 'On every ride', 'Only at night'], answer: 2, why: 'Helmets should be worn on every ride, even short ones.' }}
  extra={<Section title="Right vs wrong"><div className="grid gap-10"><CompareCard kind="helmet" /><CompareCard kind="seatbelt" /></div></Section>} />

export const Pedestrian = () => <Module path="/pedestrian-safety"
  hero={{ title: 'Pedestrian Safety', intro: 'Walking is healthy and fun. Learn how to cross roads and stay seen, in every place and at every age.', who: 'riya', color: 'bg-mint', crumb: 'Pedestrian Safety' }}
  cards={{ title: 'Walk smart', sub: 'Small habits that keep walkers safe.', items: [
    ['Use footpaths', 'Walk on the footpath. If none, walk facing traffic.', '🚶'], ['Cross at zebra crossings', 'Zebra lines show the safest place to cross.', '🦓'],
    ['Look right, left, right', 'Check for vehicles before every step.', '👀'], ['Follow walk signals', 'Cross only when the pedestrian signal allows.', '🚶‍♀️'],
    ['School bus safety', 'Wait for the bus to stop fully. Never run behind it.', '🚌'], ['Blind spots', 'Large vehicles cannot see you close to them. Stay clear.', '🚛'],
    ['Night walking', 'Wear bright or reflective clothes and carry a light.', '🔦'], ['Railway crossings', 'Cross only at the crossing and never when the barrier is down.', '🚆']] }}
  extra={<><Section title="Right vs wrong"><div className="grid gap-10"><CompareCard kind="crossing" /><CompareCard kind="bus" title="Around a school bus" /><CompareCard kind="night" /></div></Section><Section><div className="card bg-sky/50"><h3 className="text-2xl">Safe for everyone</h3><p className="mt-1">Seniors, wheelchair users and people with low vision have their own lesson on ramps, tactile paving and audio signals.</p><Link to="/inclusive-safety" className="btn-sun mt-3">Open Module 8</Link></div></Section></>}
  dos={['Use zebra crossings and footbridges', 'Stop at the edge and look both ways', 'Hold a child’s hand near roads', 'Make eye contact with drivers']}
  donts={['Do not cross between parked vehicles', 'Do not text while walking near roads', 'Do not run across the road', 'Do not play near traffic']}
  tips={[['Be seen', 'Light or reflective clothes help drivers see you at dusk.'], ['Headphones low', 'Keep volume low so you can hear horns and engines.', 'bg-mint'], ['Wait for a full stop', 'Cross after vehicles have stopped, not just slowed.', 'bg-lav']]}
  scenario={{ who: 'riya', title: 'The school bus has stopped', text: 'Riya gets off the bus and her friend is across the road. A few cars are still moving.', answer: 'Wait until the bus leaves or the road is clear, use the crossing, and look both ways before stepping out.' }}
  check={{ q: 'Where is the safest place to cross?', options: ['Between parked cars', 'At a zebra crossing', 'Near a bend', 'Anywhere that looks empty'], answer: 1, why: 'Zebra crossings are made so drivers expect people there.' }} />

export const Prevention = () => <Module path="/accident-prevention"
  hero={{ title: 'Accident Prevention', intro: 'Most crashes can be avoided. These habits give you time and space to react.', who: 'sam', color: 'bg-lav', crumb: 'Accident Prevention' }}
  cards={{ title: 'Habits that prevent crashes', sub: 'Practise them until they feel natural.', items: [
    ['Keep a safe distance', 'Leave a gap so you can stop in time.', '↔️'], ['Avoid overspeeding', 'Drive within the limit and slower in bad conditions.', '🐢'],
    ['Avoid distractions', 'Phone away, eyes on the road.', '📵'], ['Check your vehicle', 'Brakes, tyres, lights and mirrors need to work.', '🔧'],
    ['Overtake safely', 'Only when the road ahead is clearly free.', '✅'], ['Use indicators', 'Tell others before you turn or change lane.', '💡'],
    ['Brake smoothly', 'Gentle braking avoids skids and rear-end hits.', '🛑'], ['Rain and fog', 'Slow down, use low-beam lights and keep more distance.', '🌧️']] }}
  extra={<><Section title="Right vs wrong"><div className="grid gap-10"><CompareCard kind="distance" /><CompareCard kind="rain" /></div></Section><Section><div className="card bg-lav/50"><h3 className="text-2xl">Night, rain, fog and more</h3><p className="mt-1">Each condition has its own habits. See the full lesson.</p><Link to="/road-conditions" className="btn-sun mt-3">Open Module 7</Link></div></Section></>}
  dos={['Check your vehicle before long trips', 'Take a break when tired', 'Slow down near schools and crossings', 'Use indicators early']}
  donts={['Do not tailgate', 'Do not brake suddenly unless you must', 'Do not overtake on bends or hills', 'Do not drive when sleepy']}
  tips={[['Look far ahead', 'Scan the road well ahead so you spot problems early.'], ['Stay calm', 'Impatience causes mistakes. Allow extra travel time.', 'bg-mint'], ['Rest every 2 hours', 'On long trips, stop for a short rest.', 'bg-lav']]}
  scenario={{ who: 'ravi', title: 'Heavy rain on the highway', text: 'It starts pouring and the road ahead looks shiny and slippery. What is the safest choice?', answer: 'Reduce speed, switch on dipped headlights, keep extra distance and brake gently. If visibility is very poor, stop at a safe place.' }}
  check={{ q: 'What helps you stop safely if the vehicle ahead brakes?', options: ['Staying very close', 'A safe following distance', 'Speeding up', 'Using the horn'], answer: 1, why: 'A safe gap gives you time to react and stop.' }} />
