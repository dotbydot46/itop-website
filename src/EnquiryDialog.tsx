import { useEffect, useRef, useState, type FormEvent } from 'react';
import { X, WhatsappLogo } from '@phosphor-icons/react';

export type EnquiryKind = 'Repair' | 'Accessories' | 'Trade' | 'Buy / sell' | 'Support';
export type Enquiry = { kind: EnquiryKind | 'Choose'; category: string; issue?: string };
const choices: { kind: EnquiryKind; title: string; description: string }[] = [
  { kind: 'Repair', title: 'Repair a device', description: 'Phone, tablet, laptop or gadget faults.' },
  { kind: 'Accessories', title: 'Find an accessory', description: 'Compatibility, colours and availability.' },
  { kind: 'Trade', title: 'Wholesale supply', description: 'Product lists and business quantities.' },
  { kind: 'Buy / sell', title: 'Buy or sell', description: 'Available devices or an in-store valuation.' },
  { kind: 'Support', title: 'Aftercare or setup', description: 'Warranty questions, network messages and device help.' },
];

export function EnquiryDialog({ kind: initialKind, category, issue, onClose }: Enquiry & { onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [kind, setKind] = useState(initialKind);
  const [message, setMessage] = useState('');
  const [editing, setEditing] = useState(true);
  const [draft, setDraft] = useState<Record<string, string>>({ Issue: issue ?? 'Screen replacement', Intent: category === 'Sell a device' ? 'Sell a device' : 'Buy a device' });
  const [intent, setIntent] = useState(draft.Intent);
  const [activeIssue, setActiveIssue] = useState(issue ?? 'Screen replacement');
  const symptomHints: Record<string, string> = { 'Screen replacement': 'e.g. cracked glass, lines, no image or touch problem', 'Battery replacement': 'e.g. fast drain, shutdowns or charging problems', 'Charging fault': 'e.g. only charges at an angle, slow charging or loose cable', 'Water damage / diagnostics': 'What liquid was involved, and does the device turn on?', 'Camera / speaker / microphone': 'Describe what happens when using the camera or making a call', 'Not sure': 'Describe what happens and when it started' };
  useEffect(() => { const dialog = dialogRef.current; dialog?.showModal(); return () => dialog?.close(); }, []);
  useEffect(() => { headingRef.current?.focus(); }, [kind, editing]);
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const details = event.currentTarget.elements.namedItem('Details') as HTMLTextAreaElement;
    if (kind !== 'Repair' && !String(values.get('Details') ?? '').trim()) {
      details.setCustomValidity('Tell us a little about what you need.'); details.reportValidity(); return;
    }
    setDraft(Object.fromEntries([...values.entries()].map(([key, value]) => [key, String(value)])));
    const lines = [`Hi iTop, I’d like to make an enquiry about ${kind.toLowerCase()}.`];
    if (category && kind !== 'Buy / sell' && kind !== 'Support') lines.push(`Category: ${category}`);
    for (const [label, value] of values.entries()) if (String(value).trim()) lines.push(`${label}: ${String(value).trim()}`);
    setMessage(lines.join('\n')); setEditing(false);
  }
  return <dialog ref={dialogRef} className="enquiry-dialog" aria-labelledby="dialog-title" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }}><div className="dialog-inner">
    <div className="dialog-top"><span className="eyebrow">LET’S TALK TECH</span><button className="icon-button" aria-label="Close enquiry" onClick={onClose}><X size={24} /></button></div>
    <h2 id="dialog-title" ref={headingRef} tabIndex={-1}>{kind === 'Choose' ? 'How can we help?' : editing ? `${kind === 'Trade' ? 'Wholesale' : kind} enquiry.` : 'Your message is ready.'}</h2>
    {kind === 'Choose' ? <div className="enquiry-choices">{choices.map(choice => <button key={choice.kind} onClick={() => setKind(choice.kind)}><strong>{choice.title}</strong><span>{choice.description}</span></button>)}</div> : editing ? <>
      <p className="dialog-intro">{kind === 'Support' ? 'Tell us the model and your question. For aftercare, include the repair date or reference if you have it.' : kind === 'Repair' ? 'Tell us the device and fault. We’ll confirm the options, time, price and warranty.' : kind === 'Trade' ? 'Send your product list and quantities. We’ll discuss stock, trade pricing and collection or delivery.' : kind === 'Buy / sell' ? 'Tell us what you want to buy or sell. Availability and valuations are confirmed directly.' : 'Tell us the model and accessory you need. We’ll check compatibility and current stock.'}</p>
      <form onSubmit={prepare}>
        <div className="form-row"><label>Your name<input name="Name" defaultValue={draft.Name ?? ''} placeholder="Your name" autoComplete="given-name" maxLength={100} /></label>{kind === 'Trade' ? <label>Business name<input name="Business" defaultValue={draft.Business ?? ''} placeholder="Shop or business" maxLength={100} /></label> : kind === 'Buy / sell' ? <label>I want to<select name="Intent" value={intent} onChange={e => setIntent(e.target.value)}><option>Buy a device</option><option>Sell a device</option></select></label> : <label>Device type<select name="Device" defaultValue={draft.Device ?? 'Phone'}><option>Phone</option><option>Tablet</option><option>Laptop</option><option>Other gadget</option>{kind === 'Accessories' && <option>Not device-specific</option>}</select></label>}</div>
        {kind !== 'Trade' && <div className="form-row"><label>Brand<input name="Brand" defaultValue={draft.Brand ?? ''} placeholder="e.g. Apple, Samsung, Dell" maxLength={100} /></label><label>Device model{(kind === 'Repair' || (kind === 'Buy / sell' && intent === 'Sell a device')) && ' (required)'}<input name="Model" defaultValue={draft.Model ?? ''} placeholder="e.g. iPhone 14 or ThinkPad T14" required={kind === 'Repair' || (kind === 'Buy / sell' && intent === 'Sell a device')} pattern={'.*\\S.*'} title="Enter a device model" maxLength={100} /></label></div>}
        {kind === 'Repair' && <label>Repair needed<select name="Issue" value={activeIssue} onChange={e => setActiveIssue(e.target.value)}><option>Screen replacement</option><option>Battery replacement</option><option>Charging fault</option><option>Camera / speaker / microphone</option><option>Water damage / diagnostics</option><option>Not sure</option></select></label>}
        {kind === 'Repair' && <><label>Fault details (optional)<input name="Symptoms" defaultValue={draft.Symptoms ?? ''} placeholder={symptomHints[activeIssue]} maxLength={250} /></label>{activeIssue === 'Water damage / diagnostics' && <label>When did it happen?<input name="When" defaultValue={draft.When ?? ''} placeholder="e.g. this morning or two days ago" maxLength={100} /></label>}</>}
        {kind === 'Support' && <label>Question about<select name="Topic" defaultValue={draft.Topic ?? (category || 'Warranty / aftercare')}><option>Warranty / aftercare</option><option>Network / SIM</option><option>Device setup</option><option>Business device support</option><option>Other question</option></select></label>}
        {kind === 'Buy / sell' && intent === 'Sell a device' && <label>Device condition<select name="Condition" defaultValue={draft.Condition ?? 'Not sure'}><option>Not sure</option><option>Working, good condition</option><option>Working, signs of use</option><option>Damaged or faulty</option></select></label>}
        <label>{kind === 'Support' ? 'Your question (required)' : kind === 'Repair' ? 'Anything else we should know?' : kind === 'Trade' ? 'Products and quantities (required)' : kind === 'Buy / sell' ? (intent === 'Sell a device' ? 'Storage, condition and faults (required)' : 'What are you looking for? (required)') : 'Accessory, colour and quantity (required)'}<textarea name="Details" defaultValue={draft.Details ?? ''} placeholder={kind === 'Support' ? 'Repair reference, date, problem or message shown. Never include passwords or passcodes.' : kind === 'Trade' ? 'e.g. cases for iPhone 14: 20 black, 10 clear. Collection preferred.' : kind === 'Buy / sell' ? 'Your budget and preferred device, or storage, condition and faults of the device you are selling.' : category ? `Model, colour or quantity for ${category.toLowerCase()}` : 'Describe what you need'} onInput={e => e.currentTarget.setCustomValidity('')} required={kind !== 'Repair'} maxLength={1500} rows={4} /></label>
        <button className="button button-dark form-submit" type="submit">Preview enquiry</button><p className="privacy-note">No payment or booking is taken here. Details stay in this page until you choose to open WhatsApp. Never include passwords or device passcodes.</p>
      </form></> : <div className="message-preview"><p>Review your draft. WhatsApp will open with this message; you choose whether to send it.</p><pre>{message}</pre><div className="dialog-actions"><a className="button button-dark" href={`https://wa.me/447760616466?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer"><WhatsappLogo size={21} />Open WhatsApp</a><button className="text-button" onClick={() => setEditing(true)}>Edit details</button></div></div>}
  </div></dialog>;
}
