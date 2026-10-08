import { StoreDetails } from './StoreDetails';
import { siteHref } from './sitePaths';
import type { EnquiryKind } from './EnquiryDialog';

type Props = { onEnquire: (kind: EnquiryKind | 'Choose', category?: string) => void };

export function ContactPage({ onEnquire }: Props) {
  return <><section className="hero repairs-hero"><div><p className="eyebrow">ITOP / CONTACT / CATFORD</p><h1>Come by.<br />Say hello<span>.</span></h1></div><div className="hero-copy"><p>Repair questions, accessory checks or business enquiries. Choose how you’d like to talk to iTop Phones & Repair Center.</p><button className="button button-dark" onClick={() => onEnquire('Choose')}>Prepare an enquiry</button></div></section>
    <section className="repair-services" aria-labelledby="contact-options"><div className="section-heading"><h2 id="contact-options">Let’s talk.</h2><p>For a useful repair quote, include the model and fault.</p></div><div className="repair-service-grid">
      <article className="repair-service"><h3>WhatsApp</h3><p>Prepare a repair, stock, wholesale or aftercare enquiry. You can review the message before choosing to send.</p><button className="text-button" onClick={() => onEnquire('Choose')}>Choose an enquiry</button></article>
      <article className="repair-service"><h3>Call the shop</h3><p>Ask about opening hours, parts availability or whether to bring your device in for a check.</p><a className="text-button" href="tel:+447760616466">Call 07760 616 466</a></article>
      <article className="repair-service"><h3>Email</h3><p>Useful for a longer question or a product list. Include models and quantities for business enquiries.</p><a className="text-button" href="mailto:info.itop@gmail.com">info.itop@gmail.com</a></article>
    </div></section>
    <section className="visit-section content-section" id="visit"><div><p className="eyebrow">160 RUSHEY GREEN / SE6 4HQ</p><h2>Find us<br />in Catford.</h2><p className="visit-note">Message first to check parts, products and availability before travelling.</p></div><StoreDetails /></section>
    <section className="content-section"><div><p className="eyebrow">BEFORE YOU VISIT</p><h2>A little detail.<br />A better start.</h2></div><div className="service-notes"><ul><li>Repairs: bring the device and describe when the fault started.</li><li>Charging faults: bring the cable and charger you normally use, if possible.</li><li>Buying or selling: include the model, storage, condition and any faults.</li><li>Wholesale: send your product list, variants and quantities.</li><li>Aftercare: keep your receipt or repair reference handy.</li></ul><a className="text-button" href={siteHref('support/')}>Warranty and aftercare questions</a></div></section>
  </>;
}

export function SupportPage({ onEnquire }: Props) {
  return <><section className="hero repairs-hero"><div><p className="eyebrow">ITOP / WARRANTY & AFTERCARE</p><h1>Good questions.<br />Clear answers<span>.</span></h1></div><div className="hero-copy"><p>Understand the repair or product before you agree. Ask iTop to confirm the exact price, parts and cover for your device.</p><button className="button button-dark" onClick={() => onEnquire('Support', 'Warranty / aftercare')}>Ask about aftercare</button></div></section>
    <section className="content-section"><div><p className="eyebrow">BEFORE WORK STARTS</p><h2>Confirm the details.<br />Keep a record.</h2></div><div className="service-notes"><p>Warranty can differ by repair, replacement part and device condition. Ask for the terms that apply to your particular repair or purchase.</p><ul><li>The agreed price and work to be carried out.</li><li>The replacement part or product you are choosing.</li><li>Any warranty duration, what it covers and any exclusions.</li><li>The expected timing and any inspection charges.</li></ul><p>Keep your receipt or written confirmation for future questions.</p></div></section>
    <section className="content-section repair-faq"><div><p className="eyebrow">CUSTOMER QUESTIONS</p><h2>What would<br />you like to know?</h2></div><div className="faq-list">
      <details><summary>Do all repairs have the same warranty?</summary><p>No single period is promised here. Ask iTop to confirm the cover for the repair and part before agreeing to the work.</p></details>
      <details><summary>What if I have a problem after a repair?</summary><p>Contact iTop with your model, repair date or reference, and a description of the problem. Keep your receipt. The team can discuss an inspection and the terms agreed for your repair.</p></details>
      <details><summary>What about new damage or liquid exposure?</summary><p>Tell the team about any drops, cracks, liquid exposure or work carried out since the repair. Ask how these affect the agreed cover. Eligibility is assessed for the individual case.</p></details>
      <details><summary>Do refurbished devices and accessories have cover?</summary><p>Ask about the individual device or accessory before buying. Confirm its condition, included items, warranty and any return or exchange terms.</p></details>
      <details><summary>Can I get a same-day repair?</summary><p>Ask about current parts and workload before travelling. Timing depends on your model and fault; same-day completion is not guaranteed.</p></details>
      <details><summary>Will a repair keep my data?</summary><p>Back up important files if you can and discuss data-related risks before work starts. Repairs, resets and recovery cannot guarantee that every file will be retained.</p></details>
      <details><summary>Can I ask about network unlocking or setup?</summary><p>Send the model, network and the message shown on the device. Availability depends on ownership, device status and eligibility. Account locks may require the original account holder and official recovery steps. Never send passwords or passcodes in an enquiry.</p></details>
      <details><summary>Does this website take a payment or booking?</summary><p>No. It prepares an enquiry for you to review. iTop confirms price, availability and any agreed next steps directly.</p></details>
    </div></section>
    <section className="content-section repair-visit"><div><p className="eyebrow">SETUP & NETWORK ENQUIRIES</p><h2>Tell us what<br />the device says.</h2></div><div><p className="repair-visit-copy">Ask about SIM or network messages, device setup or recovery guidance. Ownership and eligibility are checked before a service is agreed.</p><div className="visit-actions"><button className="button button-dark" onClick={() => onEnquire('Support', 'Network / SIM')}>Ask about setup or network</button><a className="text-button" href={siteHref('contact/')}>Contact the shop</a></div></div></section>
  </>;
}
