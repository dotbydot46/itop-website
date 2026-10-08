import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { repairPageRoutes, repairPageMeta } from '../src/repairCatalogue.mjs';

const output = new URL('../dist/client/', import.meta.url);
const html = await readFile(new URL('index.html', output), 'utf8');
const escapeHtml = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
for (const route of ['repairs/', 'accessories/', 'wholesale/', 'buy-sell/', 'contact/', 'support/', ...repairPageRoutes]) {
  let pageHtml=html;
  if (route.startsWith('repairs/')) {
    const meta=repairPageMeta(route);
    pageHtml=pageHtml.replace(/<title>[^<]*<\/title>/, '<title>'+escapeHtml(meta.title)+'</title>').replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, '$1'+escapeHtml(meta.description)+'$2');
  }
  await mkdir(new URL(route, output), { recursive: true });
  await writeFile(new URL(route+'index.html', output), pageHtml);
}
await writeFile(new URL('.nojekyll', output), '');
