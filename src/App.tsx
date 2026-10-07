import { useEffect, useRef, useState, type FormEvent } from 'react';
import { List, MagnifyingGlass, X, Phone, MapPin, CheckCircle, WhatsappLogo } from '@phosphor-icons/react';
type EnquiryKind = 'Repair' | 'Accessories' | 'Trade' | 'Buy / sell';
type Product = { title: string; description: string; image: string };
const products: Product[] = [
  { title: 'Protection', description: 'Cases, screen protectors and everyday essentials to keep your devices safe.', image: '/assets/protection.png' },
  { title: 'Power', description: 'Chargers, cables and accessories to keep you connected at home, at work and on the go.', image: '/assets/power.png' },
  { title: 'Audio', description: 'Headphones, earphones and audio accessories for work, travel and everyday listening.', image: '/assets/audio.png' },
];
const phone = '+447760616466';
const waBase = 'https://wa.me/447760616466';
function ProductTile({ product, onEnquire }: { product: Product; onEnquire: () => void }) {
  return <article className="product"><button className="product-photo" onClick={onEnquire} aria-label={`Ask about ${product.title.toLowerCase()}`}><img src={product.image} alt={`Illustrative ${product.title.toLowerCase()} products; ask iTop about current stock`} /></button><div className="product-copy"><h2>{product.title}</h2><p>{product.description}</p></div></article>;
}
function EnquiryDialog({ kind, category, onClose }: { kind: EnquiryKind; category: string; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [message, setMessage] = useState('');
  const [editing, setEditing] = useState(true);
  const [draft, setDraft] = useState<Record<string, string>>({});
  useEffect(() => { const dialog = dialogRef.current; dialog?.showModal(); return () => dialog?.close(); }, []);
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    setDraft(Object.fromEntries([...values.entries()].map(([key, value]) => [key, String(value)])));
    const lines = [`Hi iTop, I’d like to make an enquiry about ${kind.toLowerCase()}.`];
    if (category) lines.push(`Category: ${category}`);
    for (const [label, value] of values.entries()) if (String(value).trim()) lines.push(`${label}: ${String(value).trim()}`);
    setMessage(lines.join('\n')); setEditing(false);
  }
  return <dialog ref={dialogRef} className="enquiry-dialog" aria-labelledby="dialog-title" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }}><div className="dialog-inner">
    <div className="dialog-top"><span className="eyebrow">LET’S TALK TECH</span><button className="icon-button" aria-label="Close enquiry" onClick={onClose}><X size={24} /></button></div>
    <h2 id="dialog-title">{editing ? `${kind} enquiry.` : 'Your message is ready.'}</h2>
    {editing ? <><p className="dialog-intro">{kind === 'Repair' ? 'Tell us the model and fault. We’ll confirm the options, likely time, price and warranty.' : 'Tell us what you’re looking for. We’ll confirm stock, compatibility and pricing directly.'}</p><form onSubmit={prepare}>
      <div className="form-row"><label>Your name<input name="Name" defaultValue={draft.Name ?? ''} placeholder="Your name" autoComplete="given-name" maxLength={100} /></label><label>{kind === 'Trade' ? 'Business name' : 'Device brand'}{kind === 'Trade' ? <input name="Business" defaultValue={draft.Business ?? ''} placeholder="Shop or business" maxLength={100} /> : <select name="Brand" defaultValue={draft.Brand ?? 'iPhone'}><option>iPhone</option><option>Samsung</option><option>Google Pixel</option><option>Other</option><option>Not applicable</option></select>}</label></div>
      {kind === 'Repair' && <div className="form-row"><label>Device model<input name="Model" defaultValue={draft.Model ?? ''} placeholder="e.g. iPhone 14" required maxLength={100} /></label><label>Repair needed<select name="Issue" defaultValue={draft.Issue ?? 'Screen replacement'}><option>Screen replacement</option><option>Battery replacement</option><option>Charging fault</option><option>Camera / speaker / microphone</option><option>Water damage / diagnostics</option><option>Not sure</option></select></label></div>}
      <label>{kind === 'Repair' ? 'Anything else we should know?' : 'What do you need?'}<textarea name="Details" defaultValue={draft.Details ?? ''} placeholder={kind === 'Trade' ? 'Products, quantities and delivery or collection preference' : kind === 'Buy / sell' ? 'Device model, condition, or the phone you want to buy' : category ? `Model, colour or quantity for ${category.toLowerCase()}` : 'Describe what you need'} required={kind !== 'Repair'} maxLength={1500} rows={4} /></label>
      <button className="button button-dark form-submit" type="submit">Preview enquiry</button><p className="privacy-note">No payment or booking is taken here. Details stay in this page until you choose to open WhatsApp. Never include passwords or device passcodes.</p>
    </form></> : <div className="message-preview"><p>Review the message below. WhatsApp will open with this draft—you still choose whether to send it.</p><pre>{message}</pre><div className="dialog-actions"><a className="button button-dark" href={`${waBase}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer"><WhatsappLogo size={21} />Open WhatsApp</a><button className="text-button" onClick={() => setEditing(true)}>Edit details</button></div></div>}
  </div></dialog>;
}
export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [enquiry, setEnquiry] = useState<{kind: EnquiryKind; category: string} | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  function openEnquiry(kind: EnquiryKind = 'Repair', category = '') { returnFocus.current = document.activeElement as HTMLElement; setMenuOpen(false); setEnquiry({ kind, category }); }
  function closeEnquiry() { setEnquiry(null); requestAnimationFrame(() => returnFocus.current?.focus()); }
  function navClick() { setMenuOpen(false); }
  return <><a className="skip-link" href="#main">Skip to content</a><header className="header">
    <a className="brand" href="#" aria-label="iTop home"><img src="/assets/itop-logo.png" alt="iTop Wholesale & Retail" /></a>
    <nav id="mobile-navigation" className={`navigation ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation"><a href="#repairs" onClick={navClick}>Repairs</a><a href="#accessories" onClick={navClick}>Accessories</a><a href="#trade" onClick={navClick}>Trade</a><a href="#visit" onClick={navClick}>Visit</a></nav>
    <button className="ask-button" aria-label="Ask iTop" onClick={() => openEnquiry()}><MagnifyingGlass size={24} weight="light" /><span>Ask iTop</span></button><button className="menu-button icon-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={26} /> : <List size={26} />}</button>
  </header><main id="main">
    <section className="hero" aria-labelledby="hero-title"><h1 id="hero-title">Repair it.<br />Make it yours<span>.</span></h1><div className="hero-copy"><p>Phone and tech repairs, quality accessories,<br className="desktop-break" /> wholesale supply and buy/sell at<br className="desktop-break" /> 160 Rushey Green, Catford SE6.</p><button className="button button-dark" onClick={() => openEnquiry()}>Get a repair quote</button></div></section>
    <section className="accessories" id="accessories" aria-label="Accessories categories"><div className="product-grid">{products.map(product => <ProductTile key={product.title} product={product} onEnquire={() => openEnquiry('Accessories', product.title)} />)}</div><div className="availability-row"><button className="text-button" onClick={() => openEnquiry('Accessories')}>Ask about availability</button><span>Illustrative products · current stock confirmed on enquiry</span></div></section>
    <section className="repair-band" id="repairs" aria-labelledby="repair-title"><div className="repair-intro"><h2 id="repair-title">A repair starts<br />with a conversation.</h2><p>Tell us what you’ve got and what’s wrong. We’ll explain the likely options and price so you can decide what’s best.</p></div><ol className="repair-steps"><li><span>01</span><h3>Model</h3><p>Tell us your device<br />and model.</p></li><li><span>02</span><h3>Fault</h3><p>Describe the issue<br />in a few words.</p></li><li><span>03</span><h3>Quote</h3><p>We’ll confirm options<br />and a price.</p></li></ol><button className="button button-cyan" onClick={() => openEnquiry()}>Start enquiry</button></section>
    <section className="trade-section content-section" id="trade"><div><p className="eyebrow">FOR YOUR NEXT MOVE</p><h2>Everyday tech.<br />Business quantities.</h2></div><div className="trade-options"><article><h3>Wholesale supply</h3><p>Phone-shop essentials, accessories and trade enquiries. Send your product list and quantities for availability and pricing.</p><button className="text-button" onClick={() => openEnquiry('Trade')}>Send a trade enquiry</button></article><article><h3>Buy & sell devices</h3><p>Ask about refurbished devices or an in-store valuation. Condition, ownership and locks are checked before an offer.</p><button className="text-button" onClick={() => openEnquiry('Buy / sell')}>Discuss a device</button></article></div></section>
    <section className="visit-section content-section" id="visit"><div><p className="eyebrow">ITOP / CATFORD</p><h2>Come by.<br />Or say hello.</h2><p className="visit-note">Message first for repair parts and product availability.</p></div><div className="visit-details"><div><MapPin size={25} weight="light" /><p><strong>160 Rushey Green</strong><br />London SE6 4HQ</p></div><div><Phone size={25} weight="light" /><p><a href={`tel:${phone}`}>07760 616 466</a><br /><a href="mailto:info.itop@gmail.com">info.itop@gmail.com</a></p></div><p className="hours">Listed hours: daily, 10:00–21:00.<br />Call to confirm holiday or temporary changes.</p><div className="visit-actions"><a className="button button-dark" href="https://www.google.com/maps/search/?api=1&query=iTop%2C%20160%20Rushey%20Green%2C%20London%20SE6%204HQ" target="_blank" rel="noopener noreferrer">Get directions</a><a className="text-button" href="https://share.google/a0LGBbCRpooeHfBlN" target="_blank" rel="noopener noreferrer">Google profile</a></div></div></section>
  </main><footer><span>© {new Date().getFullYear()} iTop Wholesale & Retail</span><span><CheckCircle size={17} />Price, parts and warranty confirmed before work starts.</span></footer>{enquiry && <EnquiryDialog {...enquiry} onClose={closeEnquiry} />}</>;
}
