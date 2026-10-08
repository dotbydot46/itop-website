import { DeviceMobile, BatteryCharging, Plug, Drop, Camera, Question, ArrowUpRight } from '@phosphor-icons/react';

const repairs = [
  { title: 'Screen replacement', issue: 'Screen replacement', description: 'Cracked glass, lines on the display, a black screen or touch that no longer responds.', icon: DeviceMobile },
  { title: 'Battery replacement', issue: 'Battery replacement', description: 'Fast battery drain, unexpected shutdowns or a phone that struggles to hold its charge.', icon: BatteryCharging },
  { title: 'Charging faults', issue: 'Charging fault', description: 'A loose connection, unreliable charging or a device that will not charge. Tell us what you have tried.', icon: Plug },
  { title: 'Liquid damage & diagnostics', issue: 'Water damage / diagnostics', description: 'An inspection enquiry after liquid exposure or an unexplained fault. Recovery is not guaranteed.', icon: Drop },
  { title: 'Camera, speaker & microphone', issue: 'Camera / speaker / microphone', description: 'Blurry images, no sound or calls where you cannot be heard. We will discuss the symptoms first.', icon: Camera },
  { title: 'Not sure what is wrong?', issue: 'Not sure', description: 'Describe what happens and when it started. Ask about another fault or supported device.', icon: Question },
];

export function RepairsPage({ onEnquire }: { onEnquire: (issue?: string) => void }) {
  return <>
    <section className="hero repairs-hero" aria-labelledby="repairs-title">
      <div><p className="eyebrow">ITOP / REPAIRS / CATFORD</p><h1 id="repairs-title">Back to<br />working<span>.</span></h1></div>
      <div className="hero-copy"><p>iPhone and Samsung repair enquiries.<br className="desktop-break" /> Tell us the model and the fault.<br className="desktop-break" /> We’ll confirm the options before you visit.</p><button className="button button-dark" onClick={() => onEnquire()}>Get a repair quote</button><a className="repair-call" href="tel:+447760616466">Or call 07760 616 466</a></div>
    </section>
    <section className="repair-services" aria-labelledby="services-title">
      <div className="section-heading"><h2 id="services-title">What needs fixing?</h2><p>Choose a starting point. Parts and support depend on your model.</p></div>
      <div className="repair-service-grid">{repairs.map(({ title, issue, description, icon: Icon }) => <article className="repair-service" key={issue}>
        <Icon size={30} weight="light" aria-hidden="true" /><h3>{title}</h3><p>{description}</p><button className="text-button" onClick={() => onEnquire(issue)}>Ask about {issue === 'Not sure' ? 'a fault' : title === 'Charging faults' ? 'charging' : title === 'Liquid damage & diagnostics' ? 'diagnostics' : title === 'Camera, speaker & microphone' ? 'this repair' : title.toLowerCase()}<ArrowUpRight size={17} aria-hidden="true" /></button>
      </article>)}</div>
    </section>
    <section className="repair-band repairs-process" aria-labelledby="process-title">
      <div className="repair-intro"><h2 id="process-title">Clear steps.<br />No surprises.</h2><p>An enquiry is the first step—not a booking or a payment.</p></div>
      <ol className="repair-steps"><li><span>01</span><h3>Tell us</h3><p>Your model<br />and the fault.</p></li><li><span>02</span><h3>Confirm</h3><p>Price, parts,<br />time and cover.</p></li><li><span>03</span><h3>Visit</h3><p>Agree the work<br />before it starts.</p></li></ol>
      <button className="button button-cyan" onClick={() => onEnquire()}>Start enquiry</button>
    </section>
    <section className="content-section repair-faq" aria-labelledby="faq-title">
      <div><p className="eyebrow">BEFORE YOU VISIT</p><h2 id="faq-title">Good questions.<br />Clear answers.</h2><p className="visit-note">Know what to expect, then decide what works for you.</p></div>
      <div className="faq-list">
        <details><summary>How much will my repair cost?</summary><p>Send your model and a short description of the fault. iTop confirms pricing after discussing the issue and, where needed, inspecting the device. No fixed price is promised here.</p></details>
        <details><summary>Can I get a same-day repair?</summary><p>Ask about current availability. Timing depends on the fault, parts and workload; message before travelling. A same-day repair is not guaranteed.</p></details>
        <details><summary>What warranty is included?</summary><p>Ask about the warranty for the specific repair and part. iTop should explain the duration, cover and exclusions before you agree to the work; this page does not promise a fixed warranty period.</p></details>
        <details><summary>What should I bring or prepare?</summary><p>Bring the device and tell the team what happened. Back up important data if you can. Never send your password, passcode or account details in an enquiry; discuss any access needed directly in-store.</p></details>
        <details><summary>Do you repair other devices?</summary><p>Ask about your tablet, laptop or other device and include the exact model. iTop will confirm whether the repair and suitable parts are available.</p></details>
      </div>
    </section>
    <section className="content-section repair-visit" aria-labelledby="repair-visit-title"><div><p className="eyebrow">160 RUSHEY GREEN / SE6 4HQ</p><h2 id="repair-visit-title">Let’s look<br />at your options.</h2></div><div><p className="repair-visit-copy">Send your model and fault before visiting iTop in Catford. We’ll discuss availability, pricing and the next step.</p><div className="visit-actions"><button className="button button-dark" onClick={() => onEnquire()}>Prepare an enquiry</button><a className="text-button" href="/#visit">Visit details</a></div></div></section>
  </>;
}
