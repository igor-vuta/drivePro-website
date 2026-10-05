import test from 'node:test';
import assert from 'node:assert/strict';
import { URL } from 'node:url';
import { createQuoteMessage, whatsappDraftHref } from '../lib/quote.mjs';

const labels = {
  job: 'Работа', location: 'Место', date: 'Дата', volume: 'Объём',
  access: 'Проезд', conditions: 'Грунт', removal: 'Вывоз',
};
const copy = { intro: 'Здравствуйте!', outro: 'Прошу расчёт.', emptyMessage: 'Здравствуйте! Подскажите условия работы экскаватора с вашим оператором.', labels };

test('an all-empty brief returns only the short generic enquiry', () => {
  const answers = Object.fromEntries(Object.keys(labels).map(key => [key, '']));
  assert.equal(createQuoteMessage({ ...copy, answers }), copy.emptyMessage);
});

test('missing answers return the short generic enquiry without labeled lines or the long outro', () => {
  assert.equal(createQuoteMessage(copy), copy.emptyMessage);
  assert.equal(createQuoteMessage({ ...copy, answers: {} }), copy.emptyMessage);
});

test('whitespace-only answers are omitted', () => {
  const answers = Object.fromEntries(Object.keys(labels).map(key => [key, ' \n\t ' ]));
  assert.equal(createQuoteMessage({ ...copy, answers }), copy.emptyMessage);
});

test('a partial brief trims supplied answers and omits empty or missing fields in the fixed order', () => {
  const answers = { volume: ' 12 м³ ', location: '', conditions: '\t', job: '  Траншея  ' };
  assert.equal(createQuoteMessage({ ...copy, answers }), 'Здравствуйте!\nРабота: Траншея\nОбъём: 12 м³\nПрошу расчёт.');
});

test('a full brief preserves explicit unknown words, zero and multiline Unicode answers', () => {
  const answers = { removal: '  тиеу & әкету?  ', conditions: '  құм\nсу  ', access: '  не знаю  ', volume: ' 0 ', date: ' Friday ', location: ' Алматы, 1/2 ', job: '  Іргетасқа шұңқыр  ' };
  assert.equal(createQuoteMessage({ ...copy, answers }), 'Здравствуйте!\nРабота: Іргетасқа шұңқыр\nМесто: Алматы, 1/2\nДата: Friday\nОбъём: 0\nПроезд: не знаю\nГрунт: құм\nсу\nВывоз: тиеу & әкету?\nПрошу расчёт.');
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
