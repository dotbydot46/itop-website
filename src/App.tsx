import { useEffect, useRef, useState } from 'react';
import { List, MagnifyingGlass, X, CheckCircle } from '@phosphor-icons/react';
import { RepairsPage } from './RepairsPage';
import { ContactPage, SupportPage } from './CustomerPages';
import { StoreDetails } from './StoreDetails';
import { siteHref, siteRoute } from './sitePaths';
import { EnquiryDialog, type EnquiryKind, type Enquiry } from './EnquiryDialog';
import { AccessoriesPage, WholesalePage, BuySellPage } from './ServicePages';
type Product = { title: string; description: string; image: string };
const products: Product[] = [
  { title: 'Protection', description: 'Cases, screen protectors and everyday essentials to keep your devices safe.', image: siteHref('assets/protection.png') },
  { title: 'Power', description: 'Chargers, cables and accessories to keep you connected at home, at work and on the go.', image: siteHref('assets/power.png') },
  { title: 'Audio', description: 'Headphones, earphones and audio accessories for work, travel and everyday listening.', image: siteHref('assets/audio.png') },
];
function ProductTile({ product, onEnquire }: { product: Product; onEnquire: () => void }) {
  return <article className="product"><button className="product-photo" onClick={onEnquire} aria-label={`Ask about ${product.title.toLowerCase()}`}><img src={product.image} alt={`Illustrative ${product.title.toLowerCase()} products; ask iTop about current stock`} /></button><div className="product-copy"><h2>{product.title}</h2><p>{product.description}</p></div></article>;
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
    <nav id="mobile-navigation" className={`navigation ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">{[['repairs','Repairs'],['accessories','Accessories'],['wholesale','Wholesale'],['buy-sell','Buy & Sell']].map(([path,label]) => <a key={path} href={siteHref(`${path}/`)} aria-current={route === path ? 'page' : undefined} onClick={navClick}>{label}</a>)}<a href={siteHref('contact/')} aria-current={route === 'contact' ? 'page' : undefined} onClick={navClick}>Visit</a></nav>
    <button className="ask-button" aria-label="Ask iTop" onClick={() => openEnquiry('Choose')}><MagnifyingGlass size={24} weight="light" /><span>Ask iTop</span></button><button className="menu-button icon-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={26} /> : <List size={26} />}</button>
  </header><main id="main">
    {isRepairsPage ? <RepairsPage onEnquire={issue => openEnquiry('Repair', '', issue)} /> : route === 'accessories' ? <AccessoriesPage onEnquire={openEnquiry} /> : route === 'wholesale' ? <WholesalePage onEnquire={openEnquiry} /> : route === 'buy-sell' ? <BuySellPage onEnquire={openEnquiry} /> : route === 'contact' ? <ContactPage onEnquire={openEnquiry} /> : route === 'support' ? <SupportPage onEnquire={openEnquiry} /> : <><section className="hero" aria-labelledby="hero-title"><h1 id="hero-title">Repair it.<br />Make it yours<span>.</span></h1><div className="hero-copy"><p>Phone, laptop and gadget repairs, accessories,<br className="desktop-break" /> wholesale supply and buy/sell at<br className="desktop-break" /> 160 Rushey Green, Catford SE6.</p><button className="button button-dark" onClick={() => openEnquiry()}>Get a repair quote</button></div></section>
    <section className="accessories" id="accessories" aria-label="Accessories categories"><div className="product-grid">{products.map(product => <ProductTile key={product.title} product={product} onEnquire={() => openEnquiry('Accessories', product.title)} />)}</div><div className="availability-row"><a className="text-button" href={siteHref('accessories/')}>Explore accessories</a><span>Illustrative products · current stock confirmed on enquiry</span></div></section>
    <section className="repair-band" id="repairs" aria-labelledby="repair-title"><div className="repair-intro"><h2 id="repair-title">A repair starts<br />with a conversation.</h2><p>Tell us what you’ve got and what’s wrong. We’ll explain the likely options and price so you can decide what’s best.</p></div><ol className="repair-steps"><li><span>01</span><h3>Model</h3><p>Tell us your device<br />and model.</p></li><li><span>02</span><h3>Fault</h3><p>Describe the issue<br />in a few words.</p></li><li><span>03</span><h3>Quote</h3><p>We’ll confirm options<br />and a price.</p></li></ol><button className="button button-cyan" onClick={() => openEnquiry()}>Start enquiry</button></section>
    <section className="trade-section content-section" id="trade"><div><p className="eyebrow">FOR YOUR NEXT MOVE</p><h2>Everyday tech.<br />Business quantities.</h2></div><div className="trade-options"><article><h3>Wholesale supply</h3><p>Phone-shop essentials, accessories and trade enquiries. Send your product list and quantities for availability and pricing.</p><a className="text-button" href={siteHref('wholesale/')}>Explore wholesale</a></article><article><h3>Buy & sell devices</h3><p>Ask about refurbished devices or an in-store valuation. Condition, ownership and locks are checked before an offer.</p><a className="text-button" href={siteHref('buy-sell/')}>Explore buying & selling</a></article></div></section>
    <section className="visit-section content-section" id="visit"><div><p className="eyebrow">ITOP / CATFORD</p><h2>Come by.<br />Or say hello.</h2><p className="visit-note">Message first for repair parts and product availability.</p></div><StoreDetails /></section>
  </>}</main><footer><div className="footer-links"><a href={siteHref('contact/')}>Contact & hours</a><a href={siteHref('support/')}>Warranty & aftercare</a></div><span>© {new Date().getFullYear()} iTop Phones & Repair Center</span><span><CheckCircle size={17} />Price, parts and warranty confirmed before work starts.</span></footer>{enquiry && <EnquiryDialog {...enquiry} onClose={closeEnquiry} />}</>;
}
