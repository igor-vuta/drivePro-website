const equipmentRows = [
  { id: 'mini-excavator', label: 'Мини-экскаватор', greeting: 'Здравствуйте! Нужен мини-экскаватор с вашим оператором.' },
  { id: 'loader', label: 'Погрузчик', greeting: 'Здравствуйте! Нужен погрузчик. Подскажите условия работы.' },
  { id: 'breaker', label: 'Экскаватор с гидромолотом', greeting: 'Здравствуйте! Нужен экскаватор с гидромолотом и вашим оператором.' },
  { id: 'tractor', label: 'Трактор', greeting: 'Здравствуйте! Нужен трактор. Подскажите условия работы.' },
  { id: 'advice', label: 'Помощь с выбором', greeting: 'Здравствуйте! Нужна помощь с выбором техники для работы.' },
];

/** @type {readonly Readonly<{id: string, label: string, greeting: string}>[]} */
export const equipmentChoices = Object.freeze(equipmentRows.map((choice) => Object.freeze(choice)));

const mopedRows = [
  { brand: 'Honda', models: ['AF27', 'AF34/35', 'AF56/57', 'AF62', 'AF67'] },
  { brand: 'Yamaha', models: ['SA39J', 'Jog Poche', 'Aprio', 'Vino'] },
  { brand: 'Suzuki', models: ["Let's 2", "Let's 4", "Let's 5"] },
];

/** @type {readonly Readonly<{brand: string, models: readonly string[]}>[]} */
export const mopedGroups = Object.freeze(mopedRows.map(({ brand, models }) => Object.freeze({
  brand,
  models: Object.freeze(models),
})));

/**
 * Build a Russian equipment enquiry from a choice ID and optional visitor answers.
 * A choice object with a string id is also accepted for compatibility.
 * Non-string answers are ignored; outer whitespace is trimmed while all inner text is preserved.
 * @param {{equipment?: string|{id?: unknown}|null, answers?: {work?: unknown, timing?: unknown, access?: unknown}|null}} [options]
 * @returns {string}
 */
export function createEquipmentMessage({ equipment, answers } = {}) {
  const id = typeof equipment === 'string' ? equipment : equipment?.id;
  const choice = typeof id === 'string'
    ? equipmentChoices.find((item) => item.id === id)
    : undefined;
  const lines = [choice?.greeting ?? equipmentChoices.find((item) => item.id === 'advice').greeting];

  for (const [key, label] of [['work', 'Работа'], ['timing', 'Сроки'], ['access', 'Условия']]) {
    const answer = answers?.[key];
    if (typeof answer !== 'string') continue;
    const trimmed = answer.trim();
    if (trimmed) lines.push(`${label}: ${trimmed}`);
  }

  return lines.join('\n');
}

/**
 * Resolve editor state. Any string manualMessage, including an empty string, overrides generation.
 * Passing null resets the override and regenerates from current selections and answers.
 * @param {{equipment?: string|{id?: unknown}|null, answers?: {work?: unknown, timing?: unknown, access?: unknown}|null, manualMessage?: string|null}} [options]
 * @returns {string}
 */
export function resolveEquipmentMessage({ equipment, answers, manualMessage } = {}) {
  if (typeof manualMessage === 'string') return manualMessage;
  return createEquipmentMessage({ equipment, answers });
}

/** @param {string} brand @param {string} model @returns {string} */
export function createMopedModelMessage(brand, model) {
  const group = mopedGroups.find((item) => item.brand === brand);
  if (!group || !group.models.includes(model)) {
    throw new RangeError('Unknown moped brand or model.');
  }
  return `Здравствуйте! Интересует ${brand} ${model}. Подскажите наличие и условия покупки.`;
}

/**
 * Format an enquiry for an exact Instagram post or reel permalink; this does not fetch or verify media.
 * One optional username segment may precede p/reel: ASCII letters, digits, underscores and dots,
 * with at least one letter, digit or underscore. Validate the original text without URL normalization.
 * @param {string} sourceUrl
 * @returns {string}
 * @throws {TypeError} If the input is not a credential-free HTTPS Instagram /p/ or /reel/ permalink without query, hash, or port.
 */
export function createMopedSourceMessage(sourceUrl) {
  const match = typeof sourceUrl === 'string'
    ? /^https:\/\/(?:www\.)?instagram\.com\/(?:\.*[A-Za-z0-9_][A-Za-z0-9_.]*\/)?(?:p|reel)\/[A-Za-z0-9_-]+\/$/u.exec(sourceUrl)
    : null;
  // JavaScript's $ also matches before a final newline, so compare the entire match.
  if (!match || match[0] !== sourceUrl) {
    throw new TypeError('Expected an exact HTTPS Instagram /p/ or /reel/ permalink.');
  }

  return `Здравствуйте! Интересует мопед из этой публикации: ${sourceUrl}`;
}
