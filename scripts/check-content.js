#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const requiredFiles = [
  'index.html',
  'server.js',
  'content/module.md',
  'src/app/bootstrap.js',
  'src/app/main.js',
  'src/styles/base.css',
  'src/styles/tokens.css',
  'src/styles/components.css',
  'src/styles/shell.css',
  'src/styles/home.css',
  'src/styles/library.css',
  'src/styles/games.css',
  'src/styles/pclab.css',
  'src/styles/profile.css'
];

const missingFiles = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));
if (missingFiles.length) {
  console.error('Missing required files:');
  missingFiles.forEach((file) => console.error(` - ${file}`));
  process.exit(1);
}

const importantAssets = [
  'assets/techpro-mark.svg',
  'assets/icon-192.png',
  'assets/icon-512.png',
  'assets/apple-touch-icon.png'
];

const missingAssets = importantAssets.filter((file) => !fs.existsSync(path.join(root, file)));
if (missingAssets.length) {
  console.error('Missing important assets:');
  missingAssets.forEach((file) => console.error(` - ${file}`));
  process.exit(1);
}

function findJavaScriptFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return findJavaScriptFiles(fullPath);
    return entry.isFile() && entry.name.endsWith('.js') ? [fullPath] : [];
  });
}

const unresolvedImports = [];
for (const file of findJavaScriptFiles(path.join(root, 'src'))) {
  const source = fs.readFileSync(file, 'utf8');
  const imports = source.matchAll(/\b(?:from\s*|import\s*(?:\(\s*)?)["']([^"']+)["']/g);
  for (const [, specifier] of imports) {
    if (specifier.startsWith('.') && !fs.existsSync(path.resolve(path.dirname(file), specifier))) {
      unresolvedImports.push(`${path.relative(root, file)} -> ${specifier}`);
    }
  }
}
if (unresolvedImports.length) {
  console.error('Unresolved local JavaScript imports:');
  unresolvedImports.forEach((specifier) => console.error(` - ${specifier}`));
  process.exit(1);
}

const moduleText = fs.readFileSync(path.join(root, 'content/module.md'), 'utf8');
const requiredTerms = ['Computer System', 'Desktop computer', 'Power Supply Unit', 'Motherboard'];
const missingTerms = requiredTerms.filter((term) => !moduleText.includes(term));
if (missingTerms.length) {
  console.error('Module content missing expected terms:');
  missingTerms.forEach((term) => console.error(` - ${term}`));
  process.exit(1);
}

console.log(`TechPro content check passed: ${requiredFiles.length} required files, ${importantAssets.length} core assets, and local imports verified.`);
