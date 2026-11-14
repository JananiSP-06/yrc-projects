import { Link } from 'react-router-dom'
import { GraduationCap, HeartHandshake, Target, Users } from 'lucide-react'
import { PageHero, Section } from '../components/ui'
import Character from '../components/Characters'
import { CommunityScene } from '../components/Scenes'
import { REFS } from '../data/content'
export default function About() {
  return (<><PageHero title="About RoadWise" intro="A friendly road safety guide for students, families and everyone who uses Indian roads." who="sam" color="bg-mint" />
    <Section title="Together we make roads safer" sub="Students, families, seniors and officers all have a part to play."><CommunityScene /></Section>
    <Section><div className="grid md:grid-cols-2 gap-5">{[[Target, 'What is RoadWise?', 'An illustrated learning website with lessons, signs, games and quizzes about safe behaviour on roads.', 'bg-sky/60'], [HeartHandshake, 'Why we built it', 'Road crashes affect many families. Learning early can build habits that last a lifetime.', 'bg-coral/25'], [Users, 'Youth Red Cross and service', 'RoadWise is a Youth Red Cross social service project that spreads awareness and care for others.', 'bg-sun/60'], [GraduationCap, 'Who can use it', 'School and college students, parents, teachers, volunteers and anyone curious about road safety.', 'bg-lav/60']].map(([I, a, b, c]) => <div key={a} className={`card ${c}`}><I className="mb-2" /><h3 className="text-2xl">{a}</h3><p>{b}</p></div>)}</div></Section>
    <Section title="Our goals"><ul className="grid sm:grid-cols-2 gap-3">{['Create awareness about road safety', 'Explain Indian traffic signs and rules', 'Show safe habits for walkers, cyclists, riders and drivers', 'Teach what to do when you see an accident', 'Make learning fun with games and quizzes', 'Encourage everyone to take the pledge'].map(g => <li key={g} className="card !p-4 bg-white font-semibold">{g}</li>)}</ul></Section>
    <Section title="Meet the team"><div className="grid grid-cols-2 lg:grid-cols-4 gap-5">{[['sam', 'Safety Sam', 'Our mascot and tip giver.'], ['riya', 'Riya', 'Pedestrian safety.'], ['arjun', 'Arjun', 'Cycling and two-wheelers.'], ['ravi', 'Officer Ravi', 'Signs and rules.']].map(([w, n, d]) => <div key={w} className="card text-center bg-white"><Character who={w} size={110} className="mx-auto" /><h3 className="text-xl">{n}</h3><p className="text-sm">{d}</p></div>)}</div></Section>
    <Section title="References and official resources"><ul className="card bg-white space-y-2">{REFS.map(r => <li key={r.u}><a className="font-bold underline underline-offset-4 hover:text-coral" href={r.u} target="_blank" rel="noreferrer">{r.t}</a></li>)}</ul>
      <p className="text-sm mt-3">Statistics on this site come from MoRTH’s “Road Accidents in India 2022”. Always check official sources for the latest rules.</p><Link to="/fundamentals" className="btn-coral mt-6">Start learning</Link></Section></>)
}
