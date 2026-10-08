import { useEffect, useRef, useState } from 'react';
import { List, MagnifyingGlass, X, CheckCircle } from '@phosphor-icons/react';
import { BusinessPage, TradeApplicationPage } from './BusinessPages';
import { businessPageMeta } from './businessPageMeta.mjs';
import { PhoneRepairPages } from './PhoneRepairPages';
import { findRepairPage, repairPageMeta } from './repairCatalogue.mjs';
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
  return <article className="product"><a className="product-photo" href={siteHref(`accessories/#${product.title.toLowerCase()}`)} aria-label={`Explore ${product.title.toLowerCase()} accessories`}><img src={product.image} alt={`Illustrative ${product.title.toLowerCase()} products; ask iTop about current stock`} /></a><div className="product-copy"><h3><a href={siteHref(`accessories/#${product.title.toLowerCase()}`)}>{product.title}<span aria-hidden="true">↗</span></a></h3><p>{product.description}</p></div></article>;
}
export function App() {
  const route = siteRoute(window.location.pathname);
  const isRepairsPage = route === 'repairs' || route.startsWith('repairs/');
  const pageTitles: Record<string, string> = { repairs: 'Repairs', accessories: 'Accessories', wholesale: 'Wholesale', 'buy-sell': 'Buy & Sell', contact: 'Contact', support: 'Warranty & Aftercare' };
  useEffect(() => {
    if (businessPageMeta[route]) { const meta=businessPageMeta[route]; document.title=meta.title; document.querySelector('meta[name="description"]')?.setAttribute('content',meta.description); return; }
    if (route.startsWith('repairs/')) { const meta=repairPageMeta(route); document.title=meta.title; document.querySelector('meta[name="description"]')?.setAttribute('content',meta.description); return; }
    document.title = pageTitles[route] ? `iTop ${pageTitles[route]} | Phones & Repair Center, Catford` : 'iTop Phones & Repair Center | Catford';
    document.querySelector('meta[name="description"]')?.setAttribute('content', `iTop Phones & Repair Center in Catford. ${pageTitles[route] ?? 'Phone, laptop and gadget repairs, accessories and wholesale'} enquiries at 160 Rushey Green, London SE6 4HQ.`);
  }, [route]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  function openEnquiry(kind: EnquiryKind | 'Choose' = 'Repair', category = '', issue?: string, phone?: Enquiry['phone'], quoteItems?: Enquiry['quoteItems']) { returnFocus.current = document.activeElement as HTMLElement; setMenuOpen(false); setEnquiry({ kind, category, issue, phone, quoteItems }); }
  function closeEnquiry() { setEnquiry(null); requestAnimationFrame(() => returnFocus.current?.focus()); }
  function navClick() { setMenuOpen(false); }
  return <><a className="skip-link" href="#main">Skip to content</a><header className="header">
    <a className="brand" href={siteHref()} aria-label="iTop home"><img src={siteHref('assets/itop-logo.png')} alt="iTop Wholesale & Retail" /></a>
    <nav id="mobile-navigation" className={`navigation ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">{[['repairs','Repairs'],['accessories','Accessories'],['buy-sell','Buy & Sell'],['wholesale','Wholesale'],['business','For Business']].map(([path,label]) => <a key={path} href={siteHref(`${path}/`)} aria-current={route === path || (path === 'repairs' && isRepairsPage) || (path === 'wholesale' && route.startsWith('wholesale/')) ? 'page' : undefined} onClick={navClick}>{label}</a>)}<a href={siteHref('contact/')} aria-current={route === 'contact' ? 'page' : undefined} onClick={navClick}>Visit & Contact</a></nav>
    <button className="ask-button" aria-label="Ask iTop" onClick={() => openEnquiry('Choose')}><MagnifyingGlass size={24} weight="light" /><span>Ask iTop</span></button><button className="menu-button icon-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={26} /> : <List size={26} />}</button>
  </header><main id="main">
    {route === 'business' ? <BusinessPage /> : route === 'wholesale/apply' ? <TradeApplicationPage /> : route.startsWith('repairs/') ? <PhoneRepairPages route={route} onEnquire={(issue,phone) => openEnquiry('Repair','',issue,phone)} /> : isRepairsPage ? <RepairsPage onEnquire={issue => openEnquiry('Repair', '', issue)} /> : route === 'accessories' ? <AccessoriesPage onEnquire={openEnquiry} /> : route === 'wholesale' ? <WholesalePage onEnquire={openEnquiry} /> : route === 'buy-sell' ? <BuySellPage onEnquire={openEnquiry} /> : route === 'contact' ? <ContactPage onEnquire={openEnquiry} /> : route === 'support' ? <SupportPage onEnquire={openEnquiry} /> : <><section className="hero home-hero" aria-labelledby="hero-title"><div><p className="eyebrow">ITOP / CATFORD</p><h1 id="hero-title">Repair it.<br />Make it yours<span>.</span></h1></div><div className="hero-copy"><p>Phone and gadget repairs, everyday accessories, buying and selling, and wholesale supply in Catford.</p><div className="home-hero-actions"><a className="button button-dark" href="#services">Explore services</a><button className="text-button" onClick={() => openEnquiry('Choose')}>Ask iTop</button></div></div></section>
    <ServiceSelector />
    <section className="accessories home-accessories" id="accessories" aria-labelledby="home-accessories-title"><div className="home-shelf-heading"><h2 id="home-accessories-title">Everyday essentials.</h2><a className="text-button" href={siteHref('accessories/')}>Explore accessories</a></div><div className="product-grid">{products.map(product => <ProductTile key={product.title} product={product} />)}</div><p className="home-image-note">Illustrative products · ask about current models, colours and stock.</p></section>
    <section className="repair-band home-repair-band" id="repairs" aria-labelledby="repair-title"><div className="repair-intro"><h2 id="repair-title">Not sure what<br />needs fixing?</h2><p>Tell us what happens. We’ll discuss the next step and confirm the options before work starts.</p></div><button className="button button-cyan" onClick={() => openEnquiry('Repair', '', 'Not sure')}>Describe the fault</button></section>

    <section className="visit-section content-section" id="visit"><div><p className="eyebrow">ITOP / CATFORD</p><h2>Come by.<br />Or say hello.</h2><p className="visit-note">Check opening hours and directions before your visit.</p></div><div className="home-visit-summary"><p><strong>160 Rushey Green</strong><br />Catford, London SE6 4HQ</p><a className="button button-dark" href={siteHref('contact/')}>Visit & Contact</a></div></section>
  </>}</main><footer className={isRepairsPage ? 'repairs-footer' : undefined}><div className="footer-links"><a href={siteHref('contact/')}>Visit & Contact</a><a href={siteHref('support/')}>Warranty & aftercare</a><a href={siteHref('business/')}>iTop for Business</a></div><span>© {new Date().getFullYear()} iTop Phones & Repair Center</span><span><CheckCircle size={17} />Price, parts and warranty confirmed before work starts.</span></footer>{isRepairsPage && !menuOpen && !enquiry && <nav className="mobile-repair-actions" aria-label="Quick repair actions"><button className="button button-dark" onClick={() => { const page=findRepairPage(route); openEnquiry('Repair','',undefined,page.valid && page.brand ? {brand:page.brand.name,model:page.model?.name ?? ''} : undefined); }}>Request repair quote</button><a className="button button-outline" href="tel:+447760616466">Call iTop</a></nav>}{enquiry && <EnquiryDialog {...enquiry} onClose={closeEnquiry} />}</>;
}
