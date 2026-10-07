export const quoteFields = ['job', 'location', 'date', 'volume', 'access', 'conditions', 'removal'];

export function createQuoteMessage({ intro, outro, emptyMessage, labels, answers = {} }) {
  const lines = quoteFields.flatMap(key => {
    const answer = answers[key]?.trim();
    return answer ? [`${labels[key]}: ${answer}`] : [];
  });
  return lines.length ? [intro, ...lines, outro].join('\n') : emptyMessage;
}

export function whatsappDraftHref(number, message) {
  return `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}
