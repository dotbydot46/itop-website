import test from 'node:test';
import assert from 'node:assert/strict';
import { repairBrands, repairPageRoutes, findRepairPage, repairPageMeta } from '../src/repairCatalogue.mjs';
test('every model has a unique refreshable route and resolves to its brand and model',()=>{
  assert.equal(new Set(repairPageRoutes).size,repairPageRoutes.length);
  for (const brand of repairBrands) {
    assert.equal(findRepairPage('repairs/'+brand.id+'/').brand.name,brand.name);
    for (const model of brand.models) {
      const page=findRepairPage(model.route);
      assert.equal(page.valid,true);
      assert.equal(page.model.name,model.name);
      assert.equal(page.brand.name,brand.name);
      assert.ok(repairPageMeta(model.route).title.includes(model.name));
    }
  }
});
test('unknown or partial paths do not select a different phone',()=>{
  for(const route of ['repairs/iphone/iphone-14-pro-fake','repairs/unknown/model','repairs/iphone-extra','repairs/iphone/iphone-14/extra']) assert.equal(findRepairPage(route).valid,false);
  assert.equal(findRepairPage('repairs/iphone/iphone-14-pro-max/').model.name,'iPhone 14 Pro Max');
});
