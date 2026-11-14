import { useState } from 'react'
import { PageHero, Section, DoDont, KnowledgeCheck, ModuleNav } from '../components/ui'
import CompareCard from '../components/CompareScenes'
const TABS = {
  Pedestrians: { e: '🚶', who: 'riya', scene: 'crossing', dos: ['Use footpaths', 'Cross at zebra crossings', 'Follow pedestrian signals', 'Look for approaching vehicles', 'Use safe designated crossings'], donts: ['Do not use your phone while crossing', 'Do not cross at unsafe spots', 'Do not walk on the road if a footpath exists'] },
  Cyclists: { e: '🚲', who: 'arjun', scene: 'helmet', dos: ['Wear a helmet', 'Use reflectors and lights', 'Follow traffic rules', 'Signal before turning', 'Watch for vehicles around you'], donts: ['Do not ride against traffic', 'Do not hold on to moving vehicles', 'Do not ride with earphones loud'] },
  'Two-wheelers': { e: '🏍️', who: 'arjun', scene: 'distance', dos: ['Wear a certified, fitted helmet', 'Make sure the pillion wears one too', 'Follow speed limits', 'Keep a safe distance', 'Use indicators'], donts: ['Do not triple ride', 'Do not use a phone while riding', 'Do not weave through traffic'] },
  'Car drivers': { e: '🚗', who: 'ravi', scene: 'seatbelt', dos: ['Wear a seatbelt', 'Make sure passengers buckle up', 'Follow speed limits', 'Keep to your lane', 'Take a break when tired'], donts: ['Do not drive after alcohol', 'Do not get distracted by your phone', 'Do not drive when excessively tired'] },
}
export default function Rules() {
  const [t, setT] = useState('Pedestrians'); const d = TABS[t]
  return (<>
    <PageHero title="Traffic Rules" intro="Rules are different for each road user. Pick your role to see what to do and what to avoid." who="ravi" color="bg-sun" />
    <Section title="Choose a road user">
      <div role="tablist" className="flex flex-wrap gap-2 mb-6">{Object.entries(TABS).map(([k, v]) => <button key={k} role="tab" aria-selected={t === k} onClick={() => setT(k)} className={`btn !py-2 ${t === k ? 'bg-coral' : 'bg-white'}`}><span aria-hidden="true">{v.e}</span>{k}</button>)}</div>
      <div role="tabpanel"><DoDont dos={d.dos} donts={d.donts} /><div className="mt-10"><CompareCard key={d.scene} kind={d.scene} /></div></div>
    </Section>
    <Section title="Why follow the rules?"><div className="grid md:grid-cols-3 gap-5">{[['🛡️', 'Protect yourself', 'Rules reduce the chance of crashes and serious injury.'], ['🤝', 'Respect others', 'When everyone follows the same rules, roads are predictable.'], ['⏱️', 'Save time', 'Fewer crashes means fewer jams and delays.']].map(([e, a, b]) => <div key={a} className="card bg-mint/60"><div className="text-4xl">{e}</div><h3 className="text-xl">{a}</h3><p>{b}</p></div>)}</div></Section>
    <Section><KnowledgeCheck moduleId="/traffic-rules" who="ravi" q="Which rule applies to a pillion rider on a motorcycle?" options={['None, only the rider needs a helmet', 'They should wear a helmet too', 'They can stand on the footrest', 'They may hold a phone while riding']} answer={1} why="The pillion passenger also needs a certified helmet." /></Section>
    <ModuleNav current="/traffic-rules" />
  </>)
}
