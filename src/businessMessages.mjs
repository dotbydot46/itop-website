/** @param {Record<string,string>} data @param {string} intro @param {string[]} keys */
function requestMessage(data, intro, keys) {
  return [intro, ...keys.filter(key => data[key]?.trim()).map(key => key + ': ' + data[key].trim())].join('\n');
}
/** @param {Record<string,string>} data */
export function businessMessage(data) {
  return requestMessage(data, 'Hi iTop, I’d like a quote for my business.', ['Service','Business','Name','Email','Quantity','Needed','Details']);
}
/** @param {Record<string,string>} data */
export function tradeApplicationMessage(data) {
  return requestMessage(data, 'Hi iTop wholesale, I’d like to discuss trade supply for my business.', ['Business','Name','Email','Type','Area','Frequency','Details']) + '\nPlease advise on trade eligibility, supply and terms.';
}
