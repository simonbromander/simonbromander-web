import assert from 'node:assert/strict';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import { securityMeta } from '../scripts/secure-build.mjs';

const dom = new JSDOM('');
globalThis.window = dom.window;
const { sanitizeBlogHtml } = await import('../src/lib/sanitize-blog.mjs');

test('blog content cannot inject scripts, event handlers or executable links', () => {
  const cleaned = sanitizeBlogHtml('<script>alert(1)</script><img src="x" onerror="alert(1)"><a href="javascript:alert(1)">bad</a><iframe src="https://evil.example"></iframe>');
  assert.doesNotMatch(cleaned, /<script|onerror|javascript:|<iframe/);
});

test('normal blog formatting, images and links remain usable', () => {
  const content = '<h2>A heading</h2><p><strong>Bold</strong> text</p><a href="https://simonbromander.com">Home</a><img src="/images/photo.png" alt="Coffee">';
  const cleaned = sanitizeBlogHtml(content);
  for (const value of ['<h2>', '<strong>', 'href="https://simonbromander.com"', 'src="/images/photo.png"', 'alt="Coffee"']) assert.ok(cleaned.includes(value));
});

test('the production policy allows known inline scripts by hash without allowing arbitrary scripts', () => {
  const policy = securityMeta('<head></head><script>console.log("known")</script>');
  const scripts = policy.match(/script-src ([^;]+)/)[1];
  assert.match(scripts, /sha256-/);
  assert.doesNotMatch(scripts, /unsafe-inline|unsafe-eval|\*/);
  assert.match(policy, /object-src 'none'/);
  assert.match(policy, /form-action 'none'/);
});
