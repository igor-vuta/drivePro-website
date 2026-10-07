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
assert.match(root, /<main\b/, 'Missing bare-entry welcome');
for (const locale of Object.keys(locales)) assert.ok(root.includes(`href="${route(locale)}"`));
assert.ok(root.includes(`rel="canonical" href="${origin}${route('ru')}"`), 'Bare entry canonical must use the existing Russian page');
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

  const home = readFileSync(`out/${locale}/index.html`, 'utf8');
  for (const html of locale === 'ru' ? [home, root] : [home]) {
    assert.ok(html.includes('id="welcome"'), `Missing static welcome: ${locale}`);
    assert.ok(html.includes('href="#welcome"'), `Missing skip link: ${locale}`);
    for (const key of ['headline', 'location', 'greeting', 'equipment_title', 'equipment_text', 'equipment_action', 'moped_title', 'moped_text', 'moped_action', 'illustration_note']) {
      assert.ok(html.includes(messages.home[key]), `Missing static welcome ${key}: ${locale}`);
    }
    for (const [destination, page] of [['equipment', 'pricing'], ['mopeds', 'mopeds']]) {
      const anchor = [...html.matchAll(/<a\b[^>]*>/g)].map(match => match[0]).find(tag => tag.includes(`data-destination="${destination}"`));
      assert.ok(anchor?.includes(`href="${route(locale, page)}"`), `Missing direct ${destination} route: ${locale}`);
    }
    assert.doesNotMatch(html, /id="instagram-gallery-title"|class="optional-play"|id="callback-phone"|data-scene="3d"/, `Home contains a removed dense section: ${locale}`);
    assert.match(html, /href="tel:\+\d+"/);
    assert.match(html, /href="https:\/\/wa\.me\/\d+"/);
    for (const vehicle of ['excavator', 'moped']) {
      for (const size of [360, 720]) {
        for (const format of ['avif', 'webp']) {
          const asset = `${base}/welcome/${vehicle}-${size}.${format}`;
          assert.ok(html.includes(asset), `Missing responsive welcome asset: ${asset}`);
          assert.ok(existsSync(exportedFile(asset)), `Missing exported welcome asset: ${asset}`);
        }
      }
    }
  }

  const services = readFileSync(`out/${locale}/services/index.html`, 'utf8');
  const faq = services.match(/<section\b[^>]*aria-labelledby="services-faq-title"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert.ok(faq, `Missing visible services FAQ: ${locale}`);
  assert.ok(faq.includes(`<h2 id="services-faq-title"`), `Missing FAQ heading: ${locale}`);
  assert.ok(faq.includes(messages.services.faq_title), `Missing translated FAQ heading: ${locale}`);
  assert.match(faq, /<dl\b/, `Missing FAQ description list: ${locale}`);
  assert.equal((faq.match(/<dt\b/g) || []).length, 4, `Wrong FAQ question count: ${locale}`);
  assert.equal((faq.match(/<dd\b/g) || []).length, 4, `Wrong FAQ answer count: ${locale}`);
  for (const key of ['operator', 'price', 'unknown', 'whatsapp']) {
    const question = messages.services[`faq_${key}_question`];
    const answer = messages.services[`faq_${key}_answer`];
    assert.ok(faq.includes(`>${question}</dt>`), `Missing visible FAQ question ${key}: ${locale}`);
    assert.ok(faq.includes(`>${answer}</dd>`), `Missing visible FAQ answer ${key}: ${locale}`);
  }

  const contact = readFileSync(`out/${locale}/contact/index.html`, 'utf8');
  assert.match(contact, /<label\b[^>]*for="callback-phone"/, `Missing callback label: ${locale}`);
  assert.match(contact, /<input\b[^>]*id="callback-phone"[^>]*aria-describedby="callback-help"/, `Missing callback help: ${locale}`);
  const callbackInput = contact.match(/<input\b[^>]*id="callback-phone"[^>]*>/)?.[0] || '';
  assert.match(callbackInput, /\bname="phone"/, `Missing telephone field name: ${locale}`);
  assert.match(callbackInput, /\bautocomplete="tel"/i, `Missing telephone autocomplete: ${locale}`);
  for (const key of ['callback_label', 'callback_help', 'callback_btn']) assert.ok(contact.includes(messages.contact[key]));
  assert.match(contact, /href="tel:\+\d+"/);
  assert.match(contact, /href="https:\/\/wa\.me\/\d+"/);

  const quote = readFileSync(`out/${locale}/pricing/index.html`, 'utf8');
  for (const field of ['job', 'location', 'date', 'volume', 'access', 'conditions', 'removal']) {
    assert.ok(quote.includes(`id="brief-${field}"`), `Missing ${field} field: ${locale}`);
    assert.ok(quote.includes(`for="brief-${field}"`), `Missing ${field} label: ${locale}`);
  }
  assert.ok(quote.includes('id="quote-summary"'));
  const initialSummary = quote.match(/<textarea\b[^>]*id="quote-summary"[^>]*>([\s\S]*?)<\/textarea>/)?.[1];
  assert.equal(initialSummary, messages.quote.empty_message, `Blank brief must export only the short enquiry: ${locale}`);
  const initialDraftHref = [...quote.matchAll(/<a\b[^>]*href="(https:\/\/wa\.me\/\d+\?text=[^"]+)"/g)][0]?.[1];
  assert.ok(initialDraftHref, `Missing initial WhatsApp draft: ${locale}`);
  assert.equal(new URL(initialDraftHref.replaceAll('&amp;', '&')).searchParams.get('text'), messages.quote.empty_message, `Initial WhatsApp action must use the empty-brief enquiry: ${locale}`);
  assert.match(quote, /href="https:\/\/wa\.me\/\d+\?text=[^"]+"/);
  assert.match(quote, /href="tel:\+\d+"/);
  const quoteDetails = [...quote.matchAll(/<details\b([^>]*)>([\s\S]*?)<\/details>/g)];
  const disclosure = name => quoteDetails.find(match => match[1].includes(name));
  for (const name of ['data-quote-extra', 'data-quote-editor', 'data-quote-factors']) {
    const detail = disclosure(name);
    assert.ok(detail, `Missing native disclosure ${name}: ${locale}`);
    assert.ok(!/\bopen(?:=|\s|$)/.test(detail[1]), `Disclosure must start collapsed ${name}: ${locale}`);
    assert.ok(detail[2].includes('<summary'), `Missing native summary ${name}: ${locale}`);
  }
  const extra = disclosure('data-quote-extra')[2];
  for (const field of ['date', 'access', 'conditions', 'removal']) assert.ok(extra.includes(`id="brief-${field}"`), `Extra field must be collapsed ${field}: ${locale}`);
  const outsideDetails = quote.replace(/<details\b[^>]*>[\s\S]*?<\/details>/g, '');
  const visibleFields = [...outsideDetails.matchAll(/<(?:input|textarea)\b[^>]*id="brief-([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(visibleFields, ['job', 'location', 'volume'], `Exactly three visible optional fields required: ${locale}`);
  assert.ok(disclosure('data-quote-editor')[2].includes('id="quote-summary"'), `Message editor must be collapsed: ${locale}`);
  assert.ok(outsideDetails.includes('data-quote-actions'), `Contact actions must remain outside disclosures: ${locale}`);
  assert.ok(outsideDetails.includes(messages.quote.intro), `Missing operator/individual quote introduction: ${locale}`);
  assert.ok(outsideDetails.includes('href="#quote-brief"'), `Missing quote skip link: ${locale}`);

  const mopeds = readFileSync(`out/${locale}/mopeds/index.html`, 'utf8');
  for (const html of [mopeds]) {
    assert.ok(html.includes('id="instagram-gallery-title"'), `Missing saved gallery: ${locale}`);
    assert.ok(html.includes(messages.gallery.saved), `Missing saved Highlights label: ${locale}`);
    const highlights = JSON.parse(readFileSync('data/highlights.json', 'utf8'));
    for (const item of highlights.items) {
      assert.ok(html.includes(`href="${item.url}"`), `Missing static Highlight link: ${item.id}`);
      assert.ok(html.includes(item.cover), `Missing real cover: ${item.id}`);
      assert.ok(existsSync(exportedFile(item.cover)), `Missing exported cover: ${item.id}`);
    }
  }
  assert.match(mopeds, /href="https:\/\/www\.instagram\.com\/drivepro\.moped\.almaty\/?"/);
  assert.match(mopeds, /href="https:\/\/wa\.me\/\d+\?text=[^"]+"/);
  const photos = JSON.parse(readFileSync('data/moped-photos.json', 'utf8'));
  assert.equal(photos.length, 9, 'Expected nine inspected public post photos');
  assert.ok(mopeds.includes('id="moped-photos"'), `Missing main photo grid: ${locale}`);
  assert.ok(mopeds.includes(messages.photos.note), `Missing saved-photo disclosure: ${locale}`);
  const beforePhotos = mopeds.slice(0, mopeds.indexOf('id="moped-photos"'));
  assert.ok(beforePhotos.includes('https://wa.me/') && beforePhotos.includes(messages.gallery.ask), `Missing general enquiry before photos: ${locale}`);
  for (const photo of photos) {
    const anchor = [...mopeds.matchAll(/<a\b[^>]*>/g)].map(match => match[0]).find(tag => tag.includes(`data-photo-id="${photo.id}"`));
    assert.ok(anchor?.includes(`href="${photo.permalink}"`), `Missing no-JS original post link ${photo.id}: ${locale}`);
    assert.ok(mopeds.includes(`${base}${photo.image}`), `Missing actual post photo ${photo.id}: ${locale}`);
    assert.ok(mopeds.includes(`alt="${messages.photos[`image_${photo.id}`]}"`), `Missing observable localized description ${photo.id}: ${locale}`);
    assert.ok(existsSync(exportedFile(`${base}${photo.image}`)), `Missing exported photo ${photo.id}`);
  }
}

for (const file of ['index.html', 'sitemap.xml', 'robots.txt', '.nojekyll']) assert.ok(existsSync(join('out', file)));
stdout.write('Checked 15 localized routes, metadata, sitemap, links, assets, static welcome links and responsive assets, services FAQ, quote, mopeds and contact actions.\n');
