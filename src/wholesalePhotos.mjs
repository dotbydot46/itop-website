/** Owner-supplied shared style photos; model cut-outs and colours may vary. */
import { wholesaleOriginals } from './wholesaleOriginals.mjs';
const stylePhotos = {
  Frame: 'frame.jpeg',
  Fashion: 'fashion.jpeg',
  Colourful: 'colourful.jpeg',
  Shockproof: 'shockproof.jpeg',
  Bracket: 'bracket.jpeg',
  Blurred: 'blurred.jpeg',
  Shiny: 'shiny.jpeg',
  Thin: 'csv-235f757a373683a3.jpeg',
  'Packaged Magnetic': 'csv-f7565a23c0f833b9.jpeg',
};

/** @param {{id?:string,name:string}} product */
export function wholesaleStylePhoto(product) {
  const original = product.id ? wholesaleOriginals[product.id] : null;
  if (original?.photo) return {path:original.photo,alt:original.name+' catalogue photo',style:'Catalogue',caption:'Photo from the WhatsApp catalogue.'};
  const style = product.name.split(' Case — ')[0];
  const file = stylePhotos[style];
  return file ? {path: 'images/wholesale/' + file, alt: style + ' case style in assorted colours', style: style === 'Packaged Magnetic' ? 'Packaged' : style,caption:'Style photo · model cut-outs and colours may vary.'} : null;
}
