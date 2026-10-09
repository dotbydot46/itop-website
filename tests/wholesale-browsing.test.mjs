import test from 'node:test';
import assert from 'node:assert/strict';
import {wholesaleProducts} from '../src/wholesaleCatalogue.mjs';
import {browseCatalogue,catalogueCaseModel,catalogueProductType} from '../src/wholesaleBrowsing.mjs';

test('case model and style filters preserve model distinctions and price exceptions',()=>{
  const result=browseCatalogue({category:'Cases',type:'Shockproof cases',model:'A14'});
  assert.equal(result.length,1);
  assert.equal(result[0].cataloguePricePence,128);
  assert.equal(browseCatalogue({category:'Cases',type:'Colourful cases',model:'11 Pro Max'})[0].cataloguePricePence,199);
  for(const model of ['A32 4G','A32 5G'])assert.ok(browseCatalogue({category:'Cases',model}).every(p=>catalogueCaseModel(p)===model));
});
test('product types separate similar named products without losing quote identities',()=>{
  const result=browseCatalogue({category:'Protection',type:'Privacy screen protectors'});
  assert.ok(result.length>0);
  assert.ok(result.every(p=>catalogueProductType(p)==='Privacy screen protectors'));
  assert.ok(result.every(p=>wholesaleProducts.includes(p)));
  assert.equal(browseCatalogue({category:'Audio',type:'Privacy screen protectors'}).length,0);
});
test('price sorting does not change source order or prices',()=>{
  const before=JSON.stringify(wholesaleProducts);
  const result=browseCatalogue({sort:'price-low'});
  assert.equal(result.length,330);
  assert.ok(result.every((p,i)=>!i||p.cataloguePricePence>=result[i-1].cataloguePricePence));
  assert.equal(JSON.stringify(wholesaleProducts),before);
  assert.equal(browseCatalogue({search:'not-a-real-product-xyz'}).length,0);
});

