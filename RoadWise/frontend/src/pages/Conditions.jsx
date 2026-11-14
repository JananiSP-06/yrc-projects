import { PageHero, Section, DoDont, Scenario, KnowledgeCheck, ModuleNav } from '../components/ui'
import CompareCard from '../components/CompareScenes'
import { CONDITIONS } from '../data/learn'

export default function Conditions() {
  return (<>
    <PageHero title="Road Safety in Different Conditions" intro="Night, rain, fog, highways, schools, railway crossings and parking all need different habits." who="arjun" color="bg-sky" crumb="Different Conditions" />
    <Section><nav aria-label="Jump to a condition" className="flex flex-wrap gap-2">{CONDITIONS.map(c => <a key={c.id} href={`#${c.id}`} className="chip !py-2 !text-base hover:!bg-sun"><span aria-hidden="true">{c.emoji}</span>{c.title}</a>)}</nav></Section>
    {CONDITIONS.map((c, i) => (
      <Section key={c.id} className="scroll-mt-24"><div id={c.id} className="scroll-mt-24 card !p-6 bg-white">
        <h2 className="text-3xl flex items-center gap-3 mb-4"><span className="grid place-items-center w-12 h-12 rounded-2xl border-2 border-navy bg-sun" aria-hidden="true">{c.emoji}</span>{c.title}</h2>
        <div className={`grid gap-6 items-start ${i % 2 ? 'lg:grid-cols-[1.4fr_1fr]' : 'lg:grid-cols-[1fr_1.4fr]'}`}>
          <ul className={`space-y-3 ${i % 2 ? 'lg:order-2' : ''}`}>{c.tips.map(t => <li key={t} className="flex gap-3"><span className="mt-1 text-green-700" aria-hidden="true">✓</span>{t}</li>)}</ul>
          <div className={i % 2 ? 'lg:order-1' : ''}><CompareCard kind={c.scene} title="" /></div></div></div></Section>))}
    <Section title="Do's and Don'ts"><DoDont dos={['Slow down when you cannot see or stop easily', 'Switch on the right lights for the weather', 'Allow extra time for the journey', 'Stop and wait at barriers and signals']} donts={['Do not speed to “make up time”', 'Do not overtake when you cannot see ahead', 'Do not go around a railway barrier', 'Do not park on crossings or footpaths']} /></Section>
    <Section title="Real-life scenario"><Scenario who="arjun" title="Fog on the way to school" text="The road ahead disappears into thick fog and you are on a motorcycle. What is the safest choice?" answer="Slow down, use low-beam lights and keep a bigger gap. If you cannot see well enough, stop at a safe place away from the road and wait." /></Section>
    <Section><KnowledgeCheck who="arjun" moduleId="/road-conditions" q="What is the safest way to handle heavy rain on the road?" options={['Keep the same speed', 'Slow down and brake early and gently', 'Brake hard when you see a puddle', 'Switch off the headlights']} answer={1} why="Wet roads need a longer stopping distance, so slow down and brake smoothly." /></Section>
    <ModuleNav current="/road-conditions" /></>)
}
