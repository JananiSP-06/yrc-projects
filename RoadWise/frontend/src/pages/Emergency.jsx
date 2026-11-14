import { Phone, ShieldAlert, MessageCircle } from 'lucide-react'
import { PageHero, Section } from '../components/ui'
import { Speech } from '../components/Characters'
const STEPS = ['Stay calm and take a breath.', 'Make sure you are safe. Do not stand in traffic.', 'Do not stop in a dangerous spot. Park well away if you must stop.', 'Call 112 for emergency help.', 'Give the exact location: road name, landmark, direction, nearest town.', 'Explain clearly: how many vehicles, how many people are hurt.', 'Follow what the emergency responders tell you.', 'Do not move a seriously injured person unless there is immediate danger, such as fire.', 'Do not crowd around. Give space to responders.']
export default function Emergency() {
  return (<>
    <PageHero title="Emergency Help" intro="If you see an accident, you can help by staying safe and calling for help quickly." who="ravi" color="bg-coral/40" />
    <section className="wrap -mt-6 relative z-10"><div className="card bg-white border-red-500/50 !border-4 max-w-xl mx-auto text-center grid justify-items-center gap-2">
      <ShieldAlert className="text-red-600" size={36} /><h2 className="text-6xl font-extrabold">112</h2><p>Emergency Response Support System. Works across India for police, fire and ambulance.</p>
      <a href="tel:112" className="btn-coral mt-2 w-full sm:w-auto"><Phone />Call 112</a>
      <p className="text-sm">Click-to-call works on phones. On a computer, dial 112 on your mobile.</p></div></section>
    <Section title="If you witness an accident" sub="Follow these steps in order.">
      <ol className="grid gap-3">{STEPS.map((s, i) => <li key={s} className="card !p-4 flex items-center gap-4 bg-white"><span className="grid place-items-center shrink-0 w-11 h-11 rounded-full bg-sun border-2 border-navy font-display font-extrabold">{i + 1}</span><span className="font-semibold">{s}</span></li>)}</ol>
    </Section>
    <Section title="Good Samaritan protection" ><div className="card bg-mint/60"><MessageCircle className="mb-2" /><p>India has official guidelines and law that protect people who help road accident victims in good faith, so that bystanders are not harassed for helping. Rules include that a bystander is not forced to give personal details. Read the official text from MoRTH before sharing it.</p>
      <a className="btn-white mt-4" href="https://morth.nic.in" target="_blank" rel="noreferrer">Read on MoRTH website</a></div></Section>
    <Section><Speech who="sam">First aid needs training. Please let trained responders guide medical care, and take a certified first aid course when you can.</Speech></Section>
  </>)
}