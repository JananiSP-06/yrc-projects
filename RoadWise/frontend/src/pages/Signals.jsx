import { useState } from 'react'
import { PageHero, Section, DoDont, KnowledgeCheck, ModuleNav } from '../components/ui'
import { Light } from '../components/Scenes'
import { Speech } from '../components/Characters'
import CompareCard from '../components/CompareScenes'
const L = { red: ['Stop', 'Stop behind the stop line. Wait for green.', 'bg-coral/40'], yellow: ['Get ready to stop', 'Slow down and stop if you can do so safely.', 'bg-sun'], green: ['Go when clear', 'Go only when the way is clear and safe.', 'bg-mint'] }
const HAND = [['Arm raised', 'Traffic from all sides: stop.', '✋'], ['Arm out to the side', 'Traffic from that side: stop.', '👉'], ['Beckoning', 'Vehicles may proceed.', '🫴']]
export default function Signals() {
  const [on, setOn] = useState('red'); const [r, setR] = useState(null)
  return (<>
    <PageHero title="Traffic Signals and Road Markings" intro="Lights, hand signals and painted lines all tell you what to do. Try the signal below." who="ravi" color="bg-lav" crumb="Traffic Signals" />
    <Section title="Try the signal" sub="Tap a light, then read what it means.">
      <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center card bg-white">
        <div className="flex flex-col items-center"><Light on={on} size={1.6} /><div className="flex gap-2 mt-2">{Object.keys(L).map(c => <button key={c} onClick={() => setOn(c)} aria-pressed={on === c} className={`btn !py-2 !px-4 capitalize ${on === c ? 'bg-sun' : 'bg-white'}`}>{c}</button>)}</div></div>
        <div className={`rounded-blob p-6 ${L[on][2]}`}><h3 className="text-3xl">{L[on][0]}</h3><p className="mt-2 text-lg">{L[on][1]}</p><div className="mt-5"><Speech who="ravi">Never speed up on yellow. It is your warning to get ready to stop.</Speech></div></div></div>
    </Section>
    <Section title="Right vs wrong"><CompareCard kind="signal" title="At a red light" /></Section>
    <Section title="Traffic police hand signals"><div className="grid md:grid-cols-3 gap-5">{HAND.map(([t, d, e]) => <div key={t} className="card bg-sky/50 text-center"><div className="text-5xl">{e}</div><h3 className="text-xl">{t}</h3><p>{d}</p></div>)}</div></Section>
    <Section title="Road markings" sub="The paint on the road is a message too.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{[['Stop line', 'Stop before this line at a signal.'], ['Zebra crossing', 'Pedestrians cross here. Give way.'], ['Lane markings', 'Keep to your lane and change only when safe.'], ['Dividers', 'Separate traffic going in opposite directions.'], ['Solid centre line', 'Do not cross or overtake.'], ['Broken centre line', 'You may overtake only when it is clearly safe.']].map(([t, d], i) => (
        <div key={t} className="card bg-white"><svg viewBox="0 0 160 50" className="w-full rounded-2xl mb-3" aria-hidden="true"><rect width="160" height="50" fill="#4a5f74" />{i === 0 && <rect x="20" y="20" width="120" height="8" fill="#fff" />}{i === 1 && [30, 55, 80, 105].map(x => <rect key={x} x={x} y="0" width="16" height="50" fill="#fff" />)}{i === 2 && <path d="M0 25h160" stroke="#fff" strokeWidth="3" strokeDasharray="14 10" />}{i === 3 && <rect x="0" y="22" width="160" height="6" fill="#CDECCF" />}{i === 4 && <><path d="M0 22h160M0 28h160" stroke="#FFE59A" strokeWidth="3" /></>}{i === 5 && <path d="M0 25h160" stroke="#FFE59A" strokeWidth="4" strokeDasharray="16 10" />}</svg><h3 className="text-xl">{t}</h3><p>{d}</p></div>))}</div></Section>
    <Section title="Do's and Don'ts"><DoDont dos={['Stop at the stop line on red', 'Wait for the pedestrian signal', 'Follow the police officer over a light', 'Give way on zebra crossings']} donts={['Do not jump a red light', 'Do not stop on the zebra crossing', 'Do not race the yellow', 'Do not cross solid centre lines']} /></Section>
    <Section><KnowledgeCheck moduleId="/traffic-signals" who="ravi" q="What should you do when the signal turns yellow?" options={['Speed up', 'Get ready to stop', 'Turn off your lights', 'Honk and go']} answer={1} why="Yellow warns that red is coming. Slow down and stop if it is safe." /></Section>
    <ModuleNav current="/traffic-signals" />
  </>)
}
