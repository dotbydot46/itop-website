import { useState, type FormEvent } from 'react';
import { wholesaleProducts, wholesaleCategories, filterWholesaleProducts, catalogueQuoteItems } from './wholesaleCatalogue.mjs';
import type { QuoteProduct } from './WholesaleQuoteBuilder';
import { wholesaleCatalogueUrl } from './wholesaleContact';

type Selection = {id:string; quantity:string; unit:string};
export function WholesaleCatalogue({onReview}:{onReview:(items:QuoteProduct[])=>void}) {
  const [search,setSearch]=useState('');
  const [category,setCategory]=useState('All categories');
  const [limit,setLimit]=useState(12);
  const [selection,setSelection]=useState<Selection[]>([]);
  const [status,setStatus]=useState('');
  const [error,setError]=useState('');
  const products=filterWholesaleProducts(search,category);
  function add(id:string) {
    const product=wholesaleProducts.find(item=>item.id===id);
    if (!product || selection.some(item=>item.id===id)) return;
    if (selection.length>=12) {setStatus('Your list has 12 products. Review it now, or describe extra items in the quote notes.');return;}
    setSelection(previous=>[...previous,{id,quantity:'1',unit:'Items'}]);setError('');setStatus(product.name+' added to your quote list.');
  }
  function update(id:string,key:'quantity'|'unit',value:string) {setSelection(previous=>previous.map(item=>item.id===id?{...item,[key]:value}:item));setError('');}
  function review(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try { const items=catalogueQuoteItems(selection); setError('');onReview(items); }
    catch {setError('Choose products and check each whole quantity from 1 to 10,000.');}
  }
  return <section className="wholesale-catalogue" id="wholesale-catalogue" aria-labelledby="catalogue-heading">
    <div className="catalogue-heading"><div><p className="eyebrow">PRODUCT CATALOGUE</p><h2 id="catalogue-heading">Find it. List it.</h2></div><a className="text-button" href={wholesaleCatalogueUrl} target="_blank" rel="noopener noreferrer">View photos & prices on WhatsApp</a></div>
    <p className="catalogue-intro">Prices shown are from the supplied WhatsApp catalogue. iTop confirms current pricing, VAT treatment, pack quantities, compatibility and availability with your quote.</p>
    <div className="catalogue-layout"><div className="catalogue-results"><div className="catalogue-filters"><label>Search products<input type="search" value={search} onChange={e=>{setSearch(e.target.value);setLimit(12);}} placeholder="Product, code or device model" /></label><label>Category<select value={category} onChange={e=>{setCategory(e.target.value);setLimit(12);}}><option>All categories</option>{wholesaleCategories.map(item=><option key={item}>{item}</option>)}</select></label></div>
    <p className="catalogue-count" role="status">{products.length} products found{products.length>limit?' · showing '+limit:''}</p>
    <div className="catalogue-grid">{products.slice(0,limit).map(product=><article className="catalogue-product" key={product.id}><p className="eyebrow">{product.collection}</p><h3>{product.name}</h3><p className="catalogue-price">£{(product.cataloguePricePence/100).toFixed(2)} <span>catalogue price</span></p>{product.code && <p className="catalogue-code">Product code: <strong>{product.code}</strong></p>}{product.detail && <p className="catalogue-detail">{product.detail}</p>}<button className="button button-outline" type="button" disabled={selection.some(item=>item.id===product.id)||selection.length>=12} onClick={()=>add(product.id)} aria-label={(selection.some(item=>item.id===product.id)?'Added: ':'Add to quote: ')+product.name}>{selection.some(item=>item.id===product.id)?'Added to list':'Add to quote'}</button></article>)}</div>
    {!products.length && <div className="catalogue-empty"><h3>No matching products.</h3><p>Try a different code or model, or reset the filters. You can also describe an unlisted product in a quote request.</p><button className="text-button" type="button" onClick={()=>{setSearch('');setCategory('All categories');setLimit(12);}}>Reset filters</button></div>}
    {products.length>limit && <button className="button button-dark catalogue-more" type="button" onClick={()=>setLimit(previous=>previous+12)}>Show more products</button>}
    </div><aside className="catalogue-cart" aria-labelledby="quote-list-heading"><h3 id="quote-list-heading">Your quote list <span>({selection.length}/12)</span></h3><p className="catalogue-cart-note">Add products, adjust quantities, then review your request.</p><p className="catalogue-feedback" role="status">{status}</p><form onSubmit={review}>
    {selection.length ? <div className="catalogue-selection">{selection.map((row,index)=>{const product=wholesaleProducts.find(item=>item.id===row.id)!;return <fieldset key={row.id}><legend>{product.name}</legend><div className="form-row"><label>Quantity<input type="number" inputMode="numeric" min={1} max={10000} step={1} required value={row.quantity} onChange={e=>update(row.id,'quantity',e.target.value)} aria-label={'Quantity for '+product.name} /></label><label>Unit<select value={row.unit} onChange={e=>update(row.id,'unit',e.target.value)} aria-label={'Unit for '+product.name}><option>Items</option><option>Packs</option></select></label></div><button className="text-button" type="button" aria-label={'Remove '+product.name} onClick={()=>{setSelection(previous=>previous.filter(item=>item.id!==row.id));setStatus(product.name+' removed from your quote list.');setError('');}}>Remove item {index+1}</button></fieldset>;})}</div> : <p className="catalogue-empty-list">Your list is empty. Add a product to begin.</p>}
    {selection.length>=12 && <p className="catalogue-cart-note">List full. Include any extra products in the quote notes.</p>}<p role="alert">{error}</p><button className="button button-dark form-submit" type="submit" disabled={!selection.length}>Review quote list</button><p className="privacy-note">This list stays on this page. It requests a quote; it does not place an order or reserve stock.</p></form></aside></div>
  </section>;
}
