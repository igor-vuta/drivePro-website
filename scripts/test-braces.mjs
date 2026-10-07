import process from 'node:process';
import { URL } from 'node:url';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';

const require = createRequire(import.meta.url);
const braces = require('braces');
const depthError = { name: 'SyntaxError', code: 'ERR_BRACES_DEPTH' };

test('all installed glob consumers resolve the reviewed braces fork', () => {
  for (const entry of ['tailwindcss', '@next/eslint-plugin-next']) {
    const consumer = createRequire(require.resolve(entry));
    const glob = createRequire(consumer.resolve('fast-glob'));
    const match = createRequire(glob.resolve('micromatch'));
    assert.equal(match('braces/package.json').name, '@drivepro/braces');
  }
  const watcher = createRequire(require.resolve('chokidar'));
  assert.equal(watcher('braces/package.json').name, '@drivepro/braces');
});

test('installed dependency tree has no invalid overrides or broken links', () => {
  const tree = spawnSync('npm', ['ls', 'braces', 'micromatch', 'fast-glob', '--all'], {
    cwd: new URL('..', import.meta.url), encoding: 'utf8', timeout: 10000,
  });
  assert.equal(tree.error, undefined);
  assert.equal(tree.status, 0, tree.stderr);
});

test('brace compilation, expansion and escaping retain ordinary glob behavior', () => {
  assert.deepEqual(braces.expand('src/{app,components}/**/*.{ts,tsx}'), [
    'src/app/**/*.ts', 'src/app/**/*.tsx', 'src/components/**/*.ts', 'src/components/**/*.tsx',
  ]);
  assert.equal(braces.compile('file-{01..03}.{js,ts}'), 'file-(0[1-3]).(js|ts)');
  assert.deepEqual(braces.expand('a/{b,{c,d}}/e'), ['a/b/e', 'a/c/e', 'a/d/e']);
  assert.equal(braces.stringify(braces.parse('src/{a,b}')), 'src/{a,b}');
  assert.deepEqual(braces.expand('a/\\{b,c\\}'), ['a/{b,c}']);
  assert.throws(() => braces.expand('{1..2000}'), /range limit/);
});

test('deep braces, parentheses and unfinished groups fail before stack exhaustion', () => {
  // Each attack stays below the upstream 10,000-character input limit.
  for (const pattern of [
    '{'.repeat(4000) + 'x' + '}'.repeat(4000),
    '('.repeat(4000) + 'x' + ')'.repeat(4000),
    '{('.repeat(2000) + 'x' + ')}'.repeat(2000),
    '{'.repeat(4000) + 'x',
  ]) {
    for (const method of ['parse', 'compile', 'expand', 'stringify']) {
      assert.throws(() => braces[method](pattern), depthError);
    }
    assert.throws(() => braces(pattern), depthError);
    assert.throws(() => braces([pattern], { expand: true }), depthError);
  }
});

test('direct AST entry points reject excessive recursion and child cycles', () => {
  for (const method of ['compile', 'expand', 'stringify']) {
    let node = { type: 'text', value: 'x' };
    for (let depth = 0; depth < 10000; depth += 1) node = { type: 'root', nodes: [node] };
    assert.throws(() => braces[method](node), depthError);
    const cyclic = { type: 'root', nodes: [] };
    cyclic.nodes.push(cyclic);
    assert.throws(() => braces[method](cyclic), depthError);
  }
});

test('nested pattern rejection remains catchable in an isolated Node process', () => {
  const child = spawnSync(process.execPath, ['-e', `
    const braces = require('braces');
    for (const method of ['parse', 'compile', 'expand', 'stringify']) {
      try { braces[method]('{'.repeat(4000) + 'x' + '}'.repeat(4000)); process.exit(2); }
      catch (error) { if (error.code !== 'ERR_BRACES_DEPTH' || error.name !== 'SyntaxError') process.exit(3); }
    }
    console.log('rejected safely');
  `], { cwd: new URL('..', import.meta.url), encoding: 'utf8', timeout: 5000 });
  assert.equal(child.error, undefined);
  assert.equal(child.status, 0, child.stderr);
  assert.equal(child.stdout.trim(), 'rejected safely');
});
