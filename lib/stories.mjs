export const storyLifetime = 24 * 60 * 60 * 1000;

export function safeInstagramUrl(value, media = false) {
  if (typeof value !== 'string' || value.length > 4096) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return null;
    if ([...url.searchParams.keys()].some(key => /(?:access_token|authorization|secret)/i.test(key))) return null;
    const host = url.hostname.toLowerCase();
    const allowed = media ? ['cdninstagram.com', 'fbcdn.net'].some(domain => host === domain || host.endsWith(`.${domain}`)) : host === 'www.instagram.com' || host === 'instagram.com';
    if (!allowed || (!media && !url.pathname.startsWith('/stories/'))) return null;
    return url.href;
  } catch { return null; }
}

export function currentStories(snapshot, now = Date.now()) {
  if (!snapshot || !Array.isArray(snapshot.items) || snapshot.items.length > 100) return [];
  const refreshed = Date.parse(snapshot.updatedAt);
  if (!Number.isFinite(refreshed) || refreshed > now || now - refreshed >= storyLifetime) return [];
  const seen = new Set();
  return snapshot.items.flatMap(item => {
    if (!item || typeof item.id !== 'string' || !/^\d{1,40}$/.test(item.id) || seen.has(item.id)) return [];
    const timestamp = Date.parse(item.timestamp);
    const expires = Date.parse(item.expiresAt);
    if (!Number.isFinite(timestamp) || timestamp > now || now - timestamp >= storyLifetime || !Number.isFinite(expires) || expires <= now || expires > timestamp + storyLifetime) return [];
    if (!['IMAGE', 'VIDEO'].includes(item.mediaType)) return [];
    const mediaUrl = safeInstagramUrl(item.mediaUrl, true);
    const permalink = safeInstagramUrl(item.permalink);
    const thumbnailUrl = item.thumbnailUrl ? safeInstagramUrl(item.thumbnailUrl, true) : undefined;
    if (!mediaUrl || !permalink || (item.thumbnailUrl && !thumbnailUrl)) return [];
    seen.add(item.id);
    return [{ id: item.id, timestamp: new Date(timestamp).toISOString(), expiresAt: new Date(expires).toISOString(), mediaType: item.mediaType, mediaUrl, permalink, ...(thumbnailUrl ? { thumbnailUrl } : {}) }];
  }).sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp));
}
