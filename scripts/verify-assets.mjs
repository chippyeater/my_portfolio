import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

// Audit both runtime URL literals and the files Vite emits, including video/poster URLs.
const root = process.cwd();
const output = path.resolve(root, process.argv[2] || 'dist');
const base = process.argv[3] || process.env.VITE_BASE_PATH || '/';
assert(base.startsWith('/') && base.endsWith('/'), 'Expected an absolute base with a trailing slash');
const media = /\.(?:avif|gif|ico|jpe?g|png|svg|webp|mp4|webm|mov|mp3|wav|ogg|pdf|woff2?|ttf|otf|css|m?js)(?:[?#].*)?$/i;
const failures = [];
const checked = new Set();

function files(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const name = path.join(directory, entry.name);
    return entry.isDirectory() ? files(name) : [name];
  });
}

// A case-sensitive inventory also catches Linux-only filename/capitalization errors.
const sourceFiles = files(path.join(root, 'src'));
const knownSource = new Set([...sourceFiles, ...files(path.join(root, 'public'))].map(name => path.resolve(name)));
const knownOutput = new Set(files(output).map(name => path.resolve(name)));

function check(url, file, built) {
  if (!media.test(url) || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(url)) return;
  let target;
  if (built) {
    if (url.startsWith('/')) {
      if (!url.startsWith(base)) {
        failures.push(`${path.relative(root, file)}: URL bypasses base ${base}: ${url}`);
        return;
      }
      target = path.resolve(output, decodeURIComponent(url.slice(base.length).split(/[?#]/)[0]));
    } else {
      // publicAssetUrl("assets/...") retains its relative argument in the JS bundle.
      target = path.resolve(url.startsWith('assets/') ? output : path.dirname(file), decodeURIComponent(url.split(/[?#]/)[0]));
    }
  } else if (url.startsWith('/')) {
    failures.push(`${path.relative(root, file)}: root-relative runtime resource: ${url}`);
    return;
  } else {
    target = path.resolve(url.startsWith('assets/') ? path.join(root, 'public') : path.dirname(file), decodeURIComponent(url.split(/[?#]/)[0]));
  }
  const inventory = built ? knownOutput : knownSource;
  if (!inventory.has(target)) failures.push(`${path.relative(root, file)}: missing resource or incorrect case: ${url}`);
  checked.add(`${built ? 'output' : 'source'}:${target}`);
}

function audit(file, built) {
  const text = fs.readFileSync(file, 'utf8');
  if (/\.[cm]?[jt]sx?$/.test(file)) {
    const tree = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
    if (tree.isDeclarationFile) return;
    function visit(node) {
      if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) check(node.text, file, built);
      ts.forEachChild(node, visit);
    }
    visit(tree);
  } else {
    for (const match of text.matchAll(/(?:src|poster|href)\s*=\s*["']([^"']+)["']|url\(\s*["']?([^\s"')]+)["']?\s*\)/g)) {
      check(match[1] || match[2], file, built);
    }
  }
}

for (const file of sourceFiles.filter(file => /\.(?:[jt]sx?|css)$/.test(file))) audit(file, false);
// Vite owns the source HTML entry (/src/main.tsx); audit its rewritten output instead.
for (const file of [...knownOutput].filter(file => /\.(?:m?js|css|html)$/.test(file))) audit(file, true);
assert.equal(failures.length, 0, failures.join('\n'));
console.log(`Asset audit passed: ${checked.size} source/output resources; base=${base}; output=${path.relative(root, output)}`);
