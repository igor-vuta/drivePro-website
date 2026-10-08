import assert from 'node:assert/strict';
import console from 'node:console';
import { readFileSync } from 'node:fs';
import { URL } from 'node:url';
import { createEquipmentMessage, createMopedModelMessage, createMopedSourceMessage, equipmentChoices, mopedGroups, resolveEquipmentMessage } from '../lib/website-journeys.mjs';
import { whatsappDraftHref } from '../lib/quote.mjs';

const greetings = {
  'mini-excavator': 'Здравствуйте! Нужен мини-экскаватор с вашим оператором.',
  loader: 'Здравствуйте! Нужен погрузчик. Подскажите условия работы.',
  breaker: 'Здравствуйте! Нужен экскаватор с гидромолотом и вашим оператором.',
  tractor: 'Здравствуйте! Нужен трактор. Подскажите условия работы.',
  advice: 'Здравствуйте! Нужна помощь с выбором техники для работы.',
};

assert.deepEqual(equipmentChoices.map(({ id }) => id), Object.keys(greetings));
assert.equal(Object.isFrozen(equipmentChoices), true);
assert.equal(Object.isFrozen(equipmentChoices[0]), true);
assert.equal(createEquipmentMessage(), greetings.advice);
for (const [id, greeting] of Object.entries(greetings)) {
  assert.equal(createEquipmentMessage({ equipment: id }), greeting);
}
assert.equal(createEquipmentMessage({ equipment: 'not-listed' }), greetings.advice);
assert.equal(createEquipmentMessage({ equipment: 4 }), greetings.advice);
assert.equal(createEquipmentMessage({ equipment: { id: 4 } }), greetings.advice);
assert.equal(createEquipmentMessage({ equipment: { id: 'mini-excavator' } }), greetings['mini-excavator']);
assert.equal(createEquipmentMessage({ equipment: { id: 'loader' } }), greetings.loader);
assert.equal(createEquipmentMessage({ equipment: { id: 'breaker' } }), greetings.breaker);
assert.equal(createEquipmentMessage({ equipment: { id: 'tractor' } }), greetings.tractor);
assert.equal(createEquipmentMessage({ equipment: { id: 'advice' } }), greetings.advice);
assert.equal(createEquipmentMessage({ equipment: { id: 'unknown' } }), greetings.advice);
assert.equal(createEquipmentMessage({ equipment: { id: 4 } }), greetings.advice);
assert.equal(createEquipmentMessage({ equipment: null }), greetings.advice);
assert.equal(createEquipmentMessage({ equipment: 'mini-excavator', answers: { work: '  котлован  ' } }), `${greetings['mini-excavator']}\nРабота: котлован`);

assert.equal(createEquipmentMessage({
  equipment: { id: 'mini-excavator' },
  answers: { work: 'Разработка грунта', timing: 'На следующей неделе', access: 'Во двор через узкий проезд' },
}), `${greetings['mini-excavator']}\nРабота: Разработка грунта\nСроки: На следующей неделе\nУсловия: Во двор через узкий проезд`);
assert.equal(createEquipmentMessage({ equipment: { id: 'loader' }, answers: { work: '  ', timing: '\n' } }), greetings.loader);
assert.equal(createEquipmentMessage({ equipment: { id: 'tractor' }, answers: { work: 0, timing: {}, access: false } }), greetings.tractor);
assert.equal(createEquipmentMessage({ equipment: { id: 'tractor' }, answers: { work: '  0  ', timing: 'не знаю' } }), `${greetings.tractor}\nРабота: 0\nСроки: не знаю`);
assert.equal(createEquipmentMessage({ equipment: { id: 'advice' }, answers: { work: '  земля\nкамень — 0!  ' } }), `${greetings.advice}\nРабота: земля\nкамень — 0!`);
assert.equal(createEquipmentMessage({ equipment: { id: 'mini-excavator' }, answers: { work: ' Ёмкость: 2 м³!? ' } }), `${greetings['mini-excavator']}\nРабота: Ёмкость: 2 м³!?`);

const state = { equipment: { id: 'breaker' }, answers: { work: 'Снести бетон' } };
assert.equal(resolveEquipmentMessage({ ...state, manualMessage: 'Мой текст\nточно такой!' }), 'Мой текст\nточно такой!');
assert.equal(resolveEquipmentMessage({ ...state, manualMessage: '' }), '');
assert.equal(resolveEquipmentMessage({ equipment: 'loader', answers: { timing: 'позже' }, manualMessage: '' }), '');
assert.equal(resolveEquipmentMessage({ equipment: 'breaker', answers: { work: 'бетон' }, manualMessage: 'Мой текст' }), 'Мой текст');
assert.equal(resolveEquipmentMessage({ equipment: 'breaker', answers: { work: 'бетон' }, manualMessage: null }), `${greetings.breaker}\nРабота: бетон`);
assert.equal(resolveEquipmentMessage({ equipment: { id: 'tractor' }, answers: { timing: 'завтра' }, manualMessage: null }), `${greetings.tractor}\nСроки: завтра`);
assert.equal(resolveEquipmentMessage({ ...state, manualMessage: 12 }), `${greetings.breaker}\nРабота: Снести бетон`);
assert.equal(resolveEquipmentMessage({ ...state, manualMessage: 'draft', equipment: { id: 'loader' }, answers: { work: 'Новая работа' } }), 'draft');

assert.deepEqual(mopedGroups, [
  { brand: 'Honda', models: ['AF27', 'AF34/35', 'AF56/57', 'AF62', 'AF67'] },
  { brand: 'Yamaha', models: ['SA39J', 'Jog Poche', 'Aprio', 'Vino'] },
  { brand: 'Suzuki', models: ["Let's 2", "Let's 4", "Let's 5"] },
]);
assert.equal(Object.isFrozen(mopedGroups), true);
assert.equal(Object.isFrozen(mopedGroups[1].models), true);
for (const { brand, models } of mopedGroups) {
  for (const model of models) {
    assert.equal(createMopedModelMessage(brand, model), `Здравствуйте! Интересует ${brand} ${model}. Подскажите наличие и условия покупки.`);
  }
}
assert.throws(() => createMopedModelMessage('Honda', 'AF28'), RangeError);
assert.throws(() => createMopedModelMessage('Unknown', 'AF27'), RangeError);

for (const sourceUrl of [
  'https://www.instagram.com/p/ABC_123/',
  'https://instagram.com/p/abc/',
  'https://instagram.com/reel/aBc-987/',
  'https://www.instagram.com/reel/Ab_9-/',
]) {
  assert.equal(createMopedSourceMessage(sourceUrl), `Здравствуйте! Интересует мопед из этой публикации: ${sourceUrl}`);
}

// Use every original permalink directly; do not rebuild a canonical URL from the record ID.
const mopedPhotos = JSON.parse(readFileSync(new URL('../data/moped-photos.json', import.meta.url), 'utf8'));
assert.equal(mopedPhotos.length, 9);
for (const { permalink } of mopedPhotos) {
  assert.equal(createMopedSourceMessage(permalink), `Здравствуйте! Интересует мопед из этой публикации: ${permalink}`);
}

for (const host of ['instagram.com', 'www.instagram.com']) {
  for (const kind of ['p', 'reel']) {
    for (const username of ['drivepro.moped.almaty', 'Ab_9', '_', '0', '.a', 'a.', '._.', '..a..']) {
      const sourceUrl = `https://${host}/${username}/${kind}/Ab_9-/`;
      assert.equal(createMopedSourceMessage(sourceUrl), `Здравствуйте! Интересует мопед из этой публикации: ${sourceUrl}`);
    }
  }
}

for (const sourceUrl of [
  '', 'http://instagram.com/p/abc/', 'https://instagram.com/', 'https://instagram.com/p/',
  'https://instagram.com/p/abc', 'https://instagram.com/reels/abc/', 'https://instagram.com.evil.test/p/abc/',
  'https://user@instagram.com/p/abc/', 'https://instagram.com:443/p/abc/',
  'https://instagram.com/p/abc/?', 'https://instagram.com/p/abc/#', 'https://instagram.com/p/abc/?utm_source=x',
  'https://instagram.com/x/../p/abc/', 'https://instagram.com/p/abc/\n', 'https://instagram.com/p/a b/',
  'https://instagram.com/p/%61bc/', 'https://instagram.com/p/abc//', 'https://instagram.com/p/./',
  'https://instagram.com/p/abc/#item', 'https://instagram.com/p/abc/?x=1', ' https://instagram.com/p/abc/',
  'https://www.instagram.com:443/reel/abc/', 'https://INSTAGRAM.com/p/abc/',
  12, null,
]) {
  assert.throws(() => createMopedSourceMessage(sourceUrl), TypeError, sourceUrl);
}

for (const sourceUrl of [
  'https://instagram.com/./p/abc/', 'https://instagram.com/../reel/abc/',
  'https://instagram.com/.../p/abc/', 'https://instagram.com//reel/abc/',
  'https://instagram.com/account/other/reel/abc/', 'https://instagram.com/account/../p/abc/',
  'https://instagram.com/account/./reel/abc/', 'https://instagram.com/account-name/p/abc/',
  'https://instagram.com/аккаунт/reel/abc/', 'https://instagram.com/%61ccount/p/abc/',
  'https://instagram.com/account/reel/%61bc/', 'https://instagram.com/account/reel/../',
  'https://instagram.com/account/reel/abc/?', 'https://instagram.com/account/reel/abc/#',
  'https://instagram.com/account/reel/abc/?x=1', 'https://instagram.com/account/reel/abc/#item',
  'https://www.instagram.com:443/account/reel/abc/', 'https://user@instagram.com/account/p/abc/',
  'https://instagram.com.evil.test/account/p/abc/', 'https://instagram.com/account/reel/abc//',
  'https://instagram.com/account/reel/abc', 'https://instagram.com/account/reels/abc/',
  'https://instagram.com/account\\reel/abc/', 'https://instagram.com/account/p/аbc/',
  'https://Instagram.com/account/p/abc/', 'HTTPS://instagram.com/account/p/abc/',
  'https://instagram.com./account/p/abc/', 'https://instagram.com/account/p/abc/\0',
  new String('https://instagram.com/account/p/abc/'), undefined,
]) {
  assert.throws(() => createMopedSourceMessage(sourceUrl), TypeError, String(sourceUrl));
}
for (const whitespace of [' ', '\t', '\n', '\r', '\r\n', '\u00a0', '\u2028', '\u2029']) {
  for (const sourceUrl of [
    `${whitespace}https://instagram.com/account/p/abc/`,
    `https://instagram.com/account/p/abc/${whitespace}`,
    `https://instagram.com/acc${whitespace}ount/p/abc/`,
    `https://instagram.com/account/p/ab${whitespace}c/`,
  ]) {
    assert.throws(() => createMopedSourceMessage(sourceUrl), TypeError, sourceUrl);
  }
}
assert.equal(whatsappDraftHref('+7 (777) 207-16-97', 'строка\n0 & тест'), 'https://wa.me/77772071697?text=%D1%81%D1%82%D1%80%D0%BE%D0%BA%D0%B0%0A0%20%26%20%D1%82%D0%B5%D1%81%D1%82');

console.log('website journey contract assertions passed');
