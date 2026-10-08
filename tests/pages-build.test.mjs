import test from 'node:test';
import assert from 'node:assert/strict';
import { repairPageRoutes, repairPageMeta } from '../src/repairCatalogue.mjs';
import { readFile, access } from 'node:fs/promises';

test('publishes compiled pages and assets under the GitHub project path', async () => {
  for (const route of ['', 'repairs/', 'accessories/', 'wholesale/', 'buy-sell/', 'contact/', 'support/', ...repairPageRoutes]) {
    const html = await readFile(`dist/client/${route}index.html`, 'utf8');
    if (repairPageRoutes.includes(route)) assert.ok(html.includes('<title>'+repairPageMeta(route).title+'</title>'), 'repair page must identify its model in its HTML title');
    assert(!html.includes('/src/main.jsx'), 'Pages must publish compiled JavaScript');
    const assets = [...html.matchAll(/(?:src|href)="(\/itop-website\/[^"#]+)"/g)].map(match => match[1]);
    assert(assets.some(path => path.endsWith('.js')), 'page must reference its compiled entry');
    for (const path of assets) await access(`dist/client/${path.slice('/itop-website/'.length)}`);
  }
  for (const image of ['itop-logo.png', 'protection.png', 'power.png', 'audio.png']) await access(`dist/client/assets/${image}`);
  await access('dist/client/.nojekyll');
});
