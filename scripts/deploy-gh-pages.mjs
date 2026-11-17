#!/usr/bin/env node
/**
 * Deploys the built `dist/` folder directly to the `gh-pages` branch.
 * Works cleanly with standard `repo` scope without requiring `workflow` scope.
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
if (!fs.existsSync(distDir)) {
  console.error('dist/ not found. Run VITE_BASE_PATH=/spice-up-your-uk/ npm run build first.');
  process.exit(1);
}

fs.rmSync(path.join(distDir, '.git'), { recursive: true, force: true });
fs.writeFileSync(path.join(distDir, '.nojekyll'), '');

const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();

execSync(
  [
    'git init -b gh-pages',
    'git config user.name "zoyahav"',
    'git config user.email "zoyahav@users.noreply.github.com"',
    'git add -A',
    'git commit -m "Deploy PWA bundle to GitHub Pages"',
    `git -c credential.helper="!gh auth git-credential" push -f "${remoteUrl}" gh-pages`,
  ].join(' && '),
  { cwd: distDir, stdio: 'inherit' },
);

fs.rmSync(path.join(distDir, '.git'), { recursive: true, force: true });
console.log('Deployed dist/ to gh-pages successfully!');
