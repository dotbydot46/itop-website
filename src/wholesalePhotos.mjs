/** Owner-supplied shared style photos; model cut-outs and colours may vary. */
const stylePhotos = {
  Frame: 'frame.jpeg',
  Fashion: 'fashion.jpeg',
  Colourful: 'colourful.jpeg',
  Shockproof: 'shockproof.jpeg',
  Bracket: 'bracket.jpeg',
  Blurred: 'blurred.jpeg',
};

/** @param {{name:string}} product */
export function wholesaleStylePhoto(product) {
  const style = product.name.split(' Case — ')[0];
  const file = stylePhotos[style];
  return file ? {path: 'images/wholesale/' + file, alt: style + ' case style in assorted colours', style} : null;
}

