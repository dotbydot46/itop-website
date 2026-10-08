import test from 'node:test';
import assert from 'node:assert/strict';
import { repairMessage, quoteErrors, wholesaleMessage } from '../src/enquiryMessages.mjs';
const row = { product: ' Clear case ', sku: ' C14 ', variant: ' iPhone 14 — clear ', quantity: '20', unit: 'Items' };
test('quote preserves products, variants, references, quantities and pack units', () => {
  const message = wholesaleMessage([row, {...row, product:'USB-C cable', sku:'', variant:'2 m', quantity:'3', unit:'Packs'}], {Business:'Example shop',Fulfilment:'Delivery enquiry',Location:'SE6',Notes:'Alternatives welcome'});
  assert.match(message,/1\. Clear case — 20 items/);
  assert.match(message,/Reference: C14/);
  assert.match(message,/Model \/ variant: iPhone 14 — clear/);
  assert.match(message,/2\. USB-C cable — 3 packs/);
  assert.match(message,/Location: SE6/);
  assert.match(message,/Notes: Alternatives welcome/);
  assert.doesNotMatch(message,/£|Total:/);
});
test('invalid product lists cannot become quote messages', () => {
  for (const rows of [[], Array(13).fill(row), [{...row, product:'   '}], ...['','0','-1','1.5','10001','no'].map(quantity=>[{...row,quantity}]), [{...row,unit:'Boxes'}]]) {
    assert.ok(quoteErrors(rows).length);
    assert.throws(()=>wholesaleMessage(rows,{}));
  }
  assert.deepEqual(quoteErrors([{...row,quantity:'10000'}]),[]);
});
test('switching to collection excludes a previous delivery area', () => {
  assert.doesNotMatch(wholesaleMessage([row],{Fulfilment:'Collection',Location:'SE6'}),/Location:/);
});
test('repair supports unidentified models and includes water timing only for liquid faults', () => {
  const data = {Device:'Phone',Brand:'Other / not sure',Model:'Old model',UnknownModel:'yes',Issue:'Water damage / diagnostics',When:'Yesterday',Symptoms:'Won’t turn on'};
  const message=repairMessage(data);
  assert.match(message,/Model: Not sure — please help identify/);
  assert.doesNotMatch(message,/Old model/);
  assert.match(message,/When: Yesterday/);
  assert.match(message,/Symptoms: Won’t turn on/);
  assert.doesNotMatch(repairMessage({...data,Issue:'Screen replacement'}),/When:/);
});

test('repair messages include the active fault answer and reject answers from another fault',()=>{
  const data={Device:'Phone',Brand:'Apple',Model:'iPhone 14',Issue:'Screen replacement',Fault:'Cracked glass'};
  assert.match(repairMessage(data),/Fault detail: Cracked glass/);
  assert.doesNotMatch(repairMessage({...data,Issue:'Battery replacement'}),/Cracked glass|Fault detail:/);
  assert.match(repairMessage({...data,Issue:'Charging fault',Fault:'Charges only at an angle'}),/Fault detail: Charges only at an angle/);
  assert.doesNotMatch(repairMessage({...data,Issue:'Not sure'}),/Fault detail:/);
});

test('business and trade requests keep their purpose and exclude unrelated fields', async () => {
  const {businessMessage,tradeApplicationMessage}=await import('../src/businessMessages.mjs');
  const data={Service:'Device repairs', Business:' Example business ', Name:' Test contact ', Email:'test@example.com', Quantity:'8', Needed:'Next week', Details:'Four phones and four tablets', Type:'Repair business', Area:'SE6', Frequency:'Monthly'};
  const business=businessMessage(data);
  assert.match(business,/Service: Device repairs/);
  assert.match(business,/Quantity: 8/);
  assert.match(business,/Details: Four phones and four tablets/);
  assert.doesNotMatch(business,/Type:|Area:|Frequency:/);
  const trade=tradeApplicationMessage(data);
  assert.match(trade,/Business: Example business/);
  assert.match(trade,/Type: Repair business/);
  assert.match(trade,/Frequency: Monthly/);
  assert.doesNotMatch(trade,/Service:|Quantity:|Needed:/);
  assert.doesNotMatch(tradeApplicationMessage({Business:' Example ',Email:'   '}),/Email:/);
});
