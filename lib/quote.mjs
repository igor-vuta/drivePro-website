export const quoteFields = ['job', 'location', 'date', 'volume', 'access', 'conditions', 'removal'];

export function createQuoteMessage({ intro, outro, labels, unknowns, answers }) {
  const lines = quoteFields.map(key => {
    const answer = answers[key]?.trim() || unknowns[key];
    return `${labels[key]}: ${answer}`;
  });
  return [intro, ...lines, outro].join('\n');
}

export function whatsappDraftHref(number, message) {
  return `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}
