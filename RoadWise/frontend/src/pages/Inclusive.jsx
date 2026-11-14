import { Link } from 'react-router-dom'
import { PageHero, Section, DoDont, Scenario, KnowledgeCheck, ModuleNav } from '../components/ui'
import CompareCard from '../components/CompareScenes'
import { INCLUSIVE } from '../data/learn'

export default function Inclusive() {
  return (<>
    <PageHero title="Senior Citizen and Disability Safety" intro="Safe roads work for everyone, whatever their age or ability. Simple words, simple actions." who="riya" color="bg-mint" crumb="Inclusive Safety" />
    <Section title="What makes roads welcoming" sub="Six things to know."><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{INCLUSIVE.map((c, i) => (
      <article key={c.id} id={c.id} className={`card scroll-mt-24 ${['bg-sky/50', 'bg-sun/50', 'bg-mint/60', 'bg-lav/60', 'bg-coral/25', 'bg-white'][i]}`}>
        <div className="text-4xl mb-2" aria-hidden="true">{c.emoji}</div><h3 className="text-xl mb-2">{c.title}</h3>
        <ul className="space-y-2 text-[15px]">{c.tips.map(t => <li key={t} className="flex gap-2"><span aria-hidden="true">•</span>{t}</li>)}</ul></article>))}</div></Section>
    <Section><CompareCard kind="inclusive" title="Helping respectfully" /></Section>
    <Section title="Do's and Don'ts"><DoDont dos={['Ask “May I help?” before you help', 'Give people time to cross', 'Keep footpaths, ramps and tactile paving clear', 'Speak directly to the person']} donts={['Do not grab or pull someone', 'Do not park on footpaths or in front of ramps', 'Do not block tactile paving', 'Do not hurry or honk at people crossing']} /></Section>
    <Section title="Real-life scenario"><Scenario who="riya" title="A person with a white cane at the crossing" text="You see someone with a white cane waiting at a busy crossing. What should you do?" answer="Say hello and ask, “May I help you cross?” If they say yes, follow how they want to be helped, for example by offering your arm. Tell them about anything ahead. If they say no thank you, respect that." /></Section>
    <Section><KnowledgeCheck who="riya" moduleId="/inclusive-safety" q="What should you do before helping a person who is blind to cross?" options={['Pull them across quickly', 'Ask if they would like help', 'Take their cane', 'Say nothing and walk away']} answer={1} why="Always ask first, then follow what the person tells you they need." /></Section>
    <p className="wrap mt-6 text-sm">More about crossing safely: <Link className="underline font-bold" to="/pedestrian-safety">Pedestrian Safety</Link>.</p>
    <ModuleNav current="/inclusive-safety" /></>)
}
