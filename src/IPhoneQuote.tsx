import { useEffect, useRef, useState, type FormEvent } from 'react';
import csv from './iphone-prices.csv?raw';
import { parseIPhonePrices, getIPhoneQuote, buildIPhoneMessage, conditionLabels, explainIPhoneQuote } from './iphoneQuotes.mjs';
import { MessageReview } from './MessageReview';
import { iphoneGroups, iphoneStorageOptions } from './iphoneModels.mjs';

const prices = parseIPhonePrices(csv);
type Details = { mode: string; model: string; storage: string; colour: string; network: string; grade: string; faults: string; battery: string; notes: string };
const initial: Details = { mode: 'direct', model: '', storage: '', colour: '', network: '', grade: '', faults: '', battery: '', notes: '' };
const money = (amount: number) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);

export function IPhoneQuote() {
  const [details, setDetails] = useState(initial);
  const [otherModel, setOtherModel] = useState('');
  const [otherColour, setOtherColour] = useState('');
  const [stage, setStage] = useState<'form' | 'result' | 'review'>('form');
  const [message, setMessage] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (stage !== 'form') {
      heading.current?.focus({ preventScroll: true });
      heading.current?.scrollIntoView({ block: 'start' });
    }
  }, [stage]);
  const resolved = { ...details, model: details.model === 'other' ? otherModel.trim() : details.model, colour: details.colour === 'other' ? otherColour.trim() : details.colour };
  const quote = getIPhoneQuote(prices, resolved);
  const broker = details.mode === 'broker';
  const explanation = explainIPhoneQuote(prices, resolved);
  const colours = [...new Set(prices.filter(row => row.model === details.model && (!details.storage || row.storage === details.storage)).map(row => row.colour))].sort();
  function update(key: keyof Details, value: string) {
    setDetails(current => ({ ...current, [key]: value, ...(key === 'model' ? { storage: '', colour: '' } : key === 'storage' ? { colour: '' } : {}) }));
  }
  function showResult(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    for (const name of ['otherModel', 'otherColour']) {
      const field = event.currentTarget.elements.namedItem(name) as HTMLInputElement | null;
      if (field && !field.value.trim()) { field.setCustomValidity('Enter a value or choose an option.'); field.reportValidity(); return; }
    }
    setStage('result');
  }
  function edit() { setStage('form'); requestAnimationFrame(() => { heading.current?.focus(); }); }
  return <section className="content-section iphone-quote" id="iphone-quote" aria-labelledby="iphone-quote-title">
    <div className="iphone-quote-intro"><p className="eyebrow">SELL YOUR IPHONE</p><h2 id="iphone-quote-title">Your iPhone.<br />Your next step.</h2><p>Find an estimated cash offer for selected iPhones, or ask us to sell yours on your behalf.</p><p className="secondary-copy">Our reference-based estimates add £20 to the matching CeX cash buying price checked on the date shown. Prices and condition are confirmed after inspection.</p><details className="device-model-help"><summary>Find your iPhone details</summary><p>Open Settings → General → About for model and capacity. Check Carrier Lock for network status. Battery health is under Settings → Battery. Never send passwords, passcodes or account details.</p></details></div>
    <div className="iphone-quote-panel">
      <h3 className="flow-title" tabIndex={-1} ref={heading}>{stage === 'review' ? 'Review your request.' : stage === 'result' ? broker ? 'Let’s agree the details.' : quote ? 'Your estimated offer.' : 'Let’s check your iPhone.' : 'Tell us about your iPhone.'}</h3>
      {stage === 'form' ? <form onSubmit={showResult}>
        <label>How would you like to sell?<select value={details.mode} onChange={e => update('mode', e.target.value)}><option value="direct">Sell directly to iTop</option><option value="broker">Ask iTop to sell it for me</option></select></label>
        <label>iPhone model<select required value={details.model} onChange={e => update('model', e.target.value)}><option value="">Choose your iPhone</option>{iphoneGroups.map(group => <optgroup key={group.label} label={group.label === 'Air & Duo' ? 'iPhone Air' : group.label}>{group.models.map(model => <option key={model}>{model}</option>)}</optgroup>)}<option value="other">Another iPhone / not sure</option></select></label>
        <p className="secondary-copy">Choose any iPhone, including Pro, Pro Max, mini, Plus and SE. Instant estimates cover checked variants from iPhone 11 onwards and SE (2nd / 3rd generation). Other devices can receive a manual quote.</p>
        {details.model === 'other' && <label>Model or description<input name="otherModel" value={otherModel} onChange={e => { e.currentTarget.setCustomValidity(''); setOtherModel(e.target.value); }} required maxLength={150} placeholder="e.g. iPhone 15 Pro, or describe it" /></label>}
        <div className="form-row"><label>Storage<select required disabled={!details.model} value={details.storage} onChange={e => update('storage', e.target.value)}><option value="">Choose storage</option>{[...iphoneStorageOptions(details.model), 'Not sure'].map(value => <option key={value}>{value}</option>)}</select></label><label>Colour<select required value={details.colour} onChange={e => update('colour', e.target.value)}><option value="">Choose colour</option>{colours.map(value => <option key={value}>{value}</option>)}<option value="other">Another colour</option><option>Not sure</option></select></label></div>
        {details.colour === 'other' && <label>Your iPhone colour<input name="otherColour" required value={otherColour} onChange={e => { e.currentTarget.setCustomValidity(''); setOtherColour(e.target.value); }} maxLength={60} /></label>}
        <label>Network status<select required value={details.network} onChange={e => update('network', e.target.value)}><option value="">Choose network status</option><option>Unlocked</option><option>Locked to a network</option><option>Not sure</option></select></label>
        <label>Condition<select required value={details.grade} onChange={e => update('grade', e.target.value)}><option value="">Choose condition</option>{Object.entries(conditionLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
        <p className="secondary-copy">Fully working means the screen, cameras, buttons, charging and Face ID / Touch ID work. Cracks, battery problems or other faults need a manual quote.</p>
        <div className="form-row"><label>Any damage or known faults?<select required value={details.faults} onChange={e => update('faults', e.target.value)}><option value="">Choose an answer</option><option value="no">No damage or faults</option><option value="yes">Yes, or I’m not sure</option></select></label><label>Battery health (%, optional)<input type="number" min={1} max={100} step={1} value={details.battery} onChange={e => update('battery', e.target.value)} placeholder="e.g. 88" /></label></div>
        <label>Repairs, faults or other details (optional)<textarea rows={2} maxLength={1500} value={details.notes} onChange={e => update('notes', e.target.value)} /></label>
        <button className="button button-dark form-submit" type="submit">{broker ? 'See next steps' : 'See my estimate'}</button>
      </form> : stage === 'review' ? <MessageReview message={message} onEdit={edit} /> : <div className="iphone-quote-result">
        <p>{resolved.model} · {resolved.storage} · {resolved.colour}</p>
        {broker ? <><p>We’ll discuss a selling price with you and aim to find a buyer within one month.</p><p className="secondary-copy">The selling fee, your payout, payment timing and what happens if it remains unsold must be agreed before we take the device. A sale or higher payout is not guaranteed.</p></> : quote ? <><p className="iphone-offer">{money(quote.offer)}</p><p>{quote.usesReference ? 'Includes £20 above the checked CeX cash offer.' : 'An estimate set by iTop.'}</p><p className="secondary-copy">{quote.usesReference ? 'CeX reference' : 'Price'} checked {new Intl.DateTimeFormat('en-GB', {dateStyle:'medium',timeZone:'UTC'}).format(new Date(quote.record.checkedAt+'T00:00:00Z'))}. This is a dated estimate, not a live CeX price or reserved offer.</p>{quote.usesReference && <a className="text-button" href={quote.record.sourceUrl} target="_blank" rel="noopener noreferrer">View matching CeX listing</a>}<p className="secondary-copy">Bring your iPhone for inspection. We’ll confirm its condition, ownership, account-lock status and final price before you decide to sell.</p></> : <><p>{explanation}</p><p>Send your details to iTop for a manual quote.</p><p className="secondary-copy">This includes unlisted variants, faults, uncertain details and prices due for review. We won’t apply another iPhone’s price.</p></>}
        <div className="dialog-actions"><button className="button button-dark" onClick={() => { setMessage(buildIPhoneMessage(prices, resolved)); setStage('review'); }}>{broker ? 'Preview selling request' : quote ? 'Request inspection' : 'Preview manual quote request'}</button><button className="text-button" onClick={edit}>Change details</button></div>
      </div>}
      <p className="privacy-note">No sale or payment happens here. You review the request and choose whether to send it through WhatsApp.</p>
    </div>
  </section>;
}
