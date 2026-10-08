import { mkdir, readFile, writeFile } from 'node:fs/promises';

const output = new URL('../dist/client/', import.meta.url);
const html = await readFile(new URL('index.html', output), 'utf8');
await mkdir(new URL('repairs/', output), { recursive: true });
await writeFile(new URL('repairs/index.html', output), html);
await writeFile(new URL('.nojekyll', output), '');
