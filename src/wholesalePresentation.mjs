/** Original WhatsApp case names retained during the screenshot import. */
/** @param {{category?:string,name:string,detail?:string}} product */
export function wholesaleProductName(product) {
  return product.category === 'Cases' && product.detail?.startsWith('Supplier label: ')
    ? product.detail.slice('Supplier label: '.length)
    : product.name;
}

/** @param {{category?:string,name:string,detail?:string}} product */
export function wholesaleProductDetail(product) {
  return wholesaleProductName(product) !== product.name ? '' : product.detail || '';
}

