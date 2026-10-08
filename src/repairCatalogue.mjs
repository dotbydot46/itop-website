// Device identification directory, not a stock or supported-repair guarantee.
const slug = name => name.toLowerCase().replaceAll('+',' plus').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export const repairBrands = [
  {id:'iphone', name:'Apple', label:'iPhone', models:['iPhone SE (2022)','iPhone SE (2020)','iPhone XR','iPhone XS','iPhone XS Max', ...[16,15,14,13,12,11].flatMap(n=>['iPhone '+n,'iPhone '+n+' Pro','iPhone '+n+' Pro Max']), 'iPhone 12 mini','iPhone 13 mini','iPhone 14 Plus','iPhone 15 Plus','iPhone 16 Plus']},
  {id:'samsung', name:'Samsung', label:'Samsung Galaxy', models:[...[24,23,22,21,20].flatMap(n=>['Galaxy S'+n,'Galaxy S'+n+'+','Galaxy S'+n+' Ultra']), 'Galaxy A14','Galaxy A15','Galaxy A16','Galaxy A34','Galaxy A35','Galaxy A54','Galaxy A55']},
  {id:'google', name:'Google', label:'Google Pixel', models:[9,8,7,6].flatMap(n=>['Pixel '+n,'Pixel '+n+' Pro'])},
].map(brand=>({...brand,models:brand.models.map(name=>({name,slug:slug(name),route:'repairs/'+brand.id+'/'+slug(name)+'/'}))}));
export const repairPageRoutes = repairBrands.flatMap(brand=>['repairs/'+brand.id+'/',...brand.models.map(model=>model.route)]);
/** @param {string} route */
export function findRepairPage(route) {
  const clean=route.replace(/\/$/,'');
  const brand=repairBrands.find(item=>clean==='repairs/'+item.id || clean.startsWith('repairs/'+item.id+'/'));
  const model=brand?.models.find(item=>item.route.replace(/\/$/,'')===clean) ?? null;
  return {brand:brand ?? null, model, valid:!!brand && (clean==='repairs/'+brand.id || !!model)};
}
/** @param {string} route */
export function repairPageMeta(route) {
  const {brand,model,valid}=findRepairPage(route);
  const label=valid ? model?.name ?? brand?.label : 'Phone';
  return {title:label+' repair enquiries | iTop Catford',description:'Request a '+label+' repair quote from iTop in Catford. Screen, battery, charging and diagnostic enquiries. Parts, support, price and timing confirmed directly.'};
}
