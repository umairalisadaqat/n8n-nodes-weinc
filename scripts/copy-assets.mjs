import { cpSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dest = join(root, 'dist', 'nodes', 'WeInc', 'weinc.svg');
mkdirSync(dirname(dest), { recursive: true });
cpSync(join(root, 'nodes', 'WeInc', 'weinc.svg'), dest);
console.log('Copied node icon to dist.');
