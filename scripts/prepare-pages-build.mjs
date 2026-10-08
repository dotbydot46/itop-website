import { mkdir, readFile, writeFile } from 'node:fs/promises';

const output = new URL('../dist/client/', import.meta.url);
const html = await readFile(new URL('index.html', output), 'utf8');
for (const route of ['repairs', 'accessories', 'wholesale', 'buy-sell', 'contact', 'support']) {
  await mkdir(new URL(`${route}/`, output), { recursive: true });
  await writeFile(new URL(`${route}/index.html`, output), html);
}
await writeFile(new URL('.nojekyll', output), '');
