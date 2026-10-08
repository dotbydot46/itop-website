import { useEffect, useRef, useState } from 'react';
import { List, MagnifyingGlass, X, CheckCircle } from '@phosphor-icons/react';
import { RepairsPage } from './RepairsPage';
import { ContactPage, SupportPage } from './CustomerPages';
import { ServiceSelector } from './ServiceSelector';
import { siteHref, siteRoute } from './sitePaths';
import { EnquiryDialog, type EnquiryKind, type Enquiry } from './EnquiryDialog';
import { AccessoriesPage, WholesalePage, BuySellPage } from './ServicePages';
type Product = { title: string; description: string; image: string };
const products: Product[] = [
  { title: 'Protection', description: 'Cases and screen protectors.', image: siteHref('assets/protection.png') },
  { title: 'Power', description: 'Chargers, cables and power banks.', image: siteHref('assets/power.png') },
  { title: 'Audio', description: 'Earphones, headphones and speakers.', image: siteHref('assets/audio.png') },
];
function ProductTile({ product }: { product: Product }) {
  return <article className="product"><a className="product-photo" href={siteHref(`accessories/#${product.title.toLowerCase()}`)} aria-label={`Explore ${product.title.toLowerCase()} accessories`}><img src={product.image} alt={`Illustrative ${product.title.toLowerCase()} products; ask iTop about current stock`} /></a><div className="product-copy"><h2>{product.title}</h2><p>{product.description}</p></div></article>;
}
export function App() {
  const route = siteRoute(window.location.pathname);
  const isRepairsPage = route === 'repairs';
  const pageTitles: Record<string, string> = { repairs: 'Repairs', accessories: 'Accessories', wholesale: 'Wholesale', 'buy-sell': 'Buy & Sell', contact: 'Contact', support: 'Warranty & Aftercare' };
  useEffect(() => {
    document.title = pageTitles[route] ? `iTop ${pageTitles[route]} | Phones & Repair Center, Catford` : 'iTop Phones & Repair Center | Catford';
    document.querySelector('meta[name="description"]')?.setAttribute('content', `iTop Phones & Repair Center in Catford. ${pageTitles[route] ?? 'Phone, laptop and gadget repairs, accessories and wholesale'} enquiries at 160 Rushey Green, London SE6 4HQ.`);
  }, [route]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  function openEnquiry(kind: EnquiryKind | 'Choose' = 'Repair', category = '', issue?: string) { returnFocus.current = document.activeElement as HTMLElement; setMenuOpen(false); setEnquiry({ kind, category, issue }); }
  function closeEnquiry() { setEnquiry(null); requestAnimationFrame(() => returnFocus.current?.focus()); }
  function navClick() { setMenuOpen(false); }
  return <><a className="skip-link" href="#main">Skip to content</a><header className="header">
    <a className="brand" href={siteHref()} aria-label="iTop home"><img src={siteHref('assets/itop-logo.png')} alt="iTop Wholesale & Retail" /></a>
    <nav id="mobile-navigation" className={`navigation ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">{[['repairs','Repairs'],['accessories','Accessories'],['buy-sell','Buy & Sell'],['wholesale','Wholesale']].map(([path,label]) => <a key={path} href={siteHref(`${path}/`)} aria-current={route === path ? 'page' : undefined} onClick={navClick}>{label}</a>)}<a href={siteHref('contact/')} aria-current={route === 'contact' ? 'page' : undefined} onClick={navClick}>Visit & Contact</a></nav>
    <button className="ask-button" aria-label="Ask iTop" onClick={() => openEnquiry('Choose')}><MagnifyingGlass size={24} weight="light" /><span>Ask iTop</span></button><button className="menu-button icon-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={26} /> : <List size={26} />}</button>
  </header><main id="main">
    {isRepairsPage ? <RepairsPage onEnquire={issue => openEnquiry('Repair', '', issue)} /> : route === 'accessories' ? <AccessoriesPage onEnquire={openEnquiry} /> : route === 'wholesale' ? <WholesalePage onEnquire={openEnquiry} /> : route === 'buy-sell' ? <BuySellPage onEnquire={openEnquiry} /> : route === 'contact' ? <ContactPage onEnquire={openEnquiry} /> : route === 'support' ? <SupportPage onEnquire={openEnquiry} /> : <><section className="hero" aria-labelledby="hero-title"><h1 id="hero-title">Repair it.<br />Make it yours<span>.</span></h1><div className="hero-copy"><p>Repairs, accessories and devices in Catford.<br className="desktop-break" /> Choose what you need below.</p><button className="button button-dark" onClick={() => openEnquiry()}>Start a repair enquiry</button></div></section>
    <ServiceSelector />
    <section className="accessories" id="accessories" aria-label="Accessories categories"><div className="product-grid">{products.map(product => <ProductTile key={product.title} product={product} />)}</div><div className="availability-row"><a className="text-button" href={siteHref('accessories/')}>Explore accessories</a><span>Illustrative products · current stock confirmed on enquiry</span></div></section>
    <section className="repair-band home-repair-band" id="repairs" aria-labelledby="repair-title"><div className="repair-intro"><h2 id="repair-title">A repair starts<br />with a conversation.</h2><p>Not sure what’s wrong? Explore the repair options and tell us the symptoms.</p></div><a className="button button-cyan" href={siteHref('repairs/')}>Explore repairs</a></section>

    <section className="visit-section content-section" id="visit"><div><p className="eyebrow">ITOP / CATFORD</p><h2>Come by.<br />Or say hello.</h2><p className="visit-note">Opening hours, directions and ways to reach us are on Visit & Contact.</p></div><div className="home-visit-summary"><p><strong>160 Rushey Green</strong><br />Catford, London SE6 4HQ</p><a className="button button-dark" href={siteHref('contact/')}>Visit & Contact</a></div></section>
  </>}</main><footer className={isRepairsPage ? 'repairs-footer' : undefined}><div className="footer-links"><a href={siteHref('contact/')}>Visit & Contact</a><a href={siteHref('support/')}>Warranty & aftercare</a></div><span>© {new Date().getFullYear()} iTop Phones & Repair Center</span><span><CheckCircle size={17} />Price, parts and warranty confirmed before work starts.</span></footer>{isRepairsPage && !menuOpen && !enquiry && <nav className="mobile-repair-actions" aria-label="Quick repair actions"><button className="button button-dark" onClick={() => openEnquiry('Repair')}>Request repair quote</button><a className="button button-outline" href="tel:+447760616466">Call iTop</a></nav>}{enquiry && <EnquiryDialog {...enquiry} onClose={closeEnquiry} />}</>;
}
