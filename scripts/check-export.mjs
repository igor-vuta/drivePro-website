import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { stdout } from 'node:process';
import { URL } from 'node:url';

const base = '/drivePro-website';
const origin = 'https://igor-vuta.github.io';
const locales = { ru: 'ru', kz: 'kk', en: 'en' };
const pages = ['', 'services', 'pricing', 'contact', 'mopeds'];
const route = (locale, page = '') => `${base}/${locale}/${page ? `${page}/` : ''}`;

function exportedFile(path) {
  assert.ok(path.startsWith(`${base}/`), `Link misses Pages base path: ${path}`);
  const relative = decodeURIComponent(path.slice(base.length)).replace(/^\/+/, '');
  return join('out', relative.endsWith('/') ? `${relative}index.html` : relative);
}

const root = readFileSync('out/index.html', 'utf8');
assert.match(root, /<main\b/, 'Missing root language selector');
for (const locale of Object.keys(locales)) assert.ok(root.includes(`href="${route(locale)}"`));
const sitemap = readFileSync('out/sitemap.xml', 'utf8');
const robots = readFileSync('out/robots.txt', 'utf8');
assert.ok(robots.includes(`Sitemap: ${origin}${base}/sitemap.xml`));
assert.equal((sitemap.match(/<url>/g) || []).length, 15, 'Sitemap must cover all 15 routes');

for (const [locale, language] of Object.entries(locales)) {
  const messages = JSON.parse(readFileSync(`messages/${locale}.json`, 'utf8'));
  for (const page of pages) {
    const path = route(locale, page);
    const file = exportedFile(path);
    assert.ok(existsSync(file), `Missing exported route: ${path}`);
    const html = readFileSync(file, 'utf8');
    const seo = messages.seo[page || 'home'];
    assert.ok(html.includes(`<html lang="${language}"`), `Wrong language: ${path}`);
    assert.match(html, /<main\b/, `Missing main: ${path}`);
    assert.match(html, /<h1\b/, `Missing heading: ${path}`);
    assert.doesNotMatch(html, /(?:\d[\d\s]{2,}\s*(?:₸|тг|тенге|KZT)|200\+|с\s*2018|since\s*2018|скидк\w*|акци\w*|жеңілдік\w*)/iu, `Legacy price or promotion claim: ${path}`);
    assert.ok(html.includes(`<title>${seo.title}</title>`), `Wrong title: ${path}`);
    assert.ok(html.includes(`name="description" content="${seo.description}"`), `Wrong description: ${path}`);
    assert.ok(html.includes(`rel="canonical" href="${origin}${path}"`), `Wrong canonical: ${path}`);
    assert.ok(sitemap.includes(`<loc>${origin}${path}</loc>`), `Sitemap misses ${path}`);
    for (const [target, targetLanguage] of Object.entries(locales)) {
      assert.ok(html.includes(`rel="alternate" hrefLang="${targetLanguage}" href="${origin}${route(target, page)}"`), `Missing ${targetLanguage} alternate: ${path}`);
      assert.ok(html.includes(`href="${route(target, page)}"`), `Language switch loses route: ${path}`);
    }
    assert.ok(html.includes(`href="${route(locale, 'contact')}"`), `Missing contact navigation: ${path}`);
    for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
      if (!href.startsWith('/')) continue;
      assert.ok(existsSync(exportedFile(new URL(href, origin).pathname)), `Broken link ${href} on ${path}`);
    }
    for (const [, asset] of html.matchAll(/<(?:link|script)\b[^>]*\b(?:href|src)="(\/drivePro-website\/[^"]+)"/g)) {
      assert.ok(existsSync(exportedFile(new URL(asset, origin).pathname)), `Missing asset ${asset} on ${path}`);
    }
    const jsonLd = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)?.[1];
    assert.ok(jsonLd, `Missing organization data: ${path}`);
    const organization = JSON.parse(jsonLd);
    assert.equal(organization['@type'], 'Organization');
    assert.equal(organization.name, 'Drive Pro');
  }

  const contact = readFileSync(`out/${locale}/contact/index.html`, 'utf8');
  assert.match(contact, /<label\b[^>]*for="callback-phone"/, `Missing callback label: ${locale}`);
  assert.match(contact, /<input\b[^>]*id="callback-phone"[^>]*aria-describedby="callback-help"/, `Missing callback help: ${locale}`);
  for (const key of ['callback_label', 'callback_help', 'callback_btn']) assert.ok(contact.includes(messages.contact[key]));
  assert.match(contact, /href="tel:\+\d+"/);
  assert.match(contact, /href="https:\/\/wa\.me\/\d+"/);

  const quote = readFileSync(`out/${locale}/pricing/index.html`, 'utf8');
  for (const field of ['job', 'location', 'date', 'volume', 'access', 'conditions', 'removal']) {
    assert.ok(quote.includes(`id="brief-${field}"`), `Missing ${field} field: ${locale}`);
    assert.ok(quote.includes(`for="brief-${field}"`), `Missing ${field} label: ${locale}`);
  }
  assert.ok(quote.includes('id="quote-summary"'));
  assert.ok(quote.includes(messages.quote.message_intro));
  assert.match(quote, /href="https:\/\/wa\.me\/\d+\?text=[^"]+"/);
  assert.match(quote, /href="tel:\+\d+"/);

  const mopeds = readFileSync(`out/${locale}/mopeds/index.html`, 'utf8');
  assert.ok(mopeds.includes(messages.mopeds.feed_unavailable));
  assert.match(mopeds, /href="https:\/\/www\.instagram\.com\/drivepro\.moped\.almaty\/?"/);
  assert.match(mopeds, /href="https:\/\/wa\.me\/\d+\?text=[^"]+"/);
}

for (const file of ['index.html', 'sitemap.xml', 'robots.txt', '.nojekyll']) assert.ok(existsSync(join('out', file)));
stdout.write('Checked 15 localized routes, metadata, sitemap, links, assets, quote, mopeds and contact actions.\n');
