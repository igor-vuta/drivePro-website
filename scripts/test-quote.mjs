import test from 'node:test';
import assert from 'node:assert/strict';
import { URL } from 'node:url';
import { createQuoteMessage, whatsappDraftHref } from '../lib/quote.mjs';

const labels = {
  job: 'Работа', location: 'Место', date: 'Дата', volume: 'Объём',
  access: 'Проезд', conditions: 'Грунт', removal: 'Вывоз',
};
const unknowns = Object.fromEntries(Object.keys(labels).map(key => [key, 'Уточню позже']));

test('a partial brief keeps every unknown answer available for discussion', () => {
  const message = createQuoteMessage({
    intro: 'Здравствуйте!', outro: 'Прошу расчёт.', labels, unknowns,
    answers: { job: '  Траншея  ', location: '', date: '  ', volume: '', access: '', conditions: '', removal: '' },
  });
  assert.ok(message.startsWith('Здравствуйте!\nРабота: Траншея\nМесто: Уточню позже'));
  assert.ok(message.includes('\nДата: Уточню позже'));
  assert.ok(message.endsWith('\nВывоз: Уточню позже\nПрошу расчёт.'));
});

test('the WhatsApp draft preserves Cyrillic, newlines and reserved URL characters', () => {
  const message = 'Работа: котлован & вывоз?\nМесто: Алматы, 1/2';
  const href = whatsappDraftHref('+7 (777) 207-16-97', message);
  const url = new URL(href);
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, '/77772071697');
  assert.equal(url.searchParams.get('text'), message);
  assert.ok(href.includes('%26'));
  assert.ok(href.includes('%0A'));
});
