import { PageHero, Section, DoDont, TipGrid, Scenario, KnowledgeCheck, ModuleNav } from '../components/ui'
// One reusable template for the illustrated learning modules.
export default function Module({ path, hero, cards, dos, donts, tips, scenario, check, extra }) {
  return (<>
    <PageHero {...hero} />
    <Section title={cards.title} sub={cards.sub}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{cards.items.map(([t, d, e], i) => (
        <article key={t} className={`card ${['bg-sky/50', 'bg-sun/50', 'bg-mint/60', 'bg-lav/60', 'bg-coral/25', 'bg-white'][i % 6]}`}>
          <div className="text-4xl mb-2" aria-hidden="true">{e}</div><h3 className="text-xl mb-1">{t}</h3><p>{d}</p></article>))}</div>
    </Section>
    {extra}
    <Section title="Do's and Don'ts"><DoDont dos={dos} donts={donts} /></Section>
    <Section title="Important safety tips"><TipGrid items={tips} /></Section>
    <Section title="Real-life scenario"><Scenario {...scenario} /></Section>
    <Section><KnowledgeCheck {...check} who={hero.who} moduleId={path} /></Section>
    <ModuleNav current={path} />
  </>)
}
