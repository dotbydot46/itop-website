import { siteHref } from './sitePaths';

const paths = [
  { title: 'Repairs', description: 'Fix a phone, laptop or gadget.', path: 'repairs/' },
  { title: 'Accessories', description: 'Find protection, power or audio.', path: 'accessories/' },
  { title: 'Buy & Sell', description: 'Find a device or ask for a valuation.', path: 'buy-sell/' },
  { title: 'Wholesale', description: 'Request products for your business.', path: 'wholesale/', id: 'trade' },
  { title: 'Visit & Contact', description: 'Find hours, directions and help.', path: 'contact/' },
];

export function ServiceSelector() {
  return <section className="service-selector" aria-labelledby="service-selector-title">
    <h2 id="service-selector-title">What do you need?</h2>
    <div className="service-paths">{paths.map((item, index) => <a key={item.path} id={item.id} className="service-path" href={siteHref(item.path)}>
      <span className="path-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <h3>{item.title}</h3><p>{item.description}</p>
    </a>)}</div>
  </section>;
}
