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
