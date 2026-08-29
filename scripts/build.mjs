import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const buildDir = resolve(root, '.build');

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

let html = await readFile(resolve(root, 'index.html'), 'utf8');
html = html
  .replace('href="/src/style.css"', 'href="./style.css"')
  .replace('src="/src/main.ts"', 'src="./main.js"');

await writeFile(resolve(dist, 'index.html'), html);
await cp(resolve(root, 'src/style.css'), resolve(dist, 'style.css'));
await cp(resolve(buildDir, 'main.js'), resolve(dist, 'main.js'));
await rm(buildDir, { recursive: true, force: true });

console.log('Built SpriteFix to dist/');
