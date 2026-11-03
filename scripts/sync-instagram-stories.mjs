import process from 'node:process';
import { writeFile, rename } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { currentStories, storyLifetime } from '../lib/stories.mjs';

export function syncConfiguration(env) {
  const token = env.INSTAGRAM_ACCESS_TOKEN;
  const userId = env.INSTAGRAM_USER_ID;
  const version = env.INSTAGRAM_GRAPH_VERSION;
  if (typeof token !== 'string' || token.length < 20 || token.length > 4096 || /\s/.test(token) || !/^\d{1,40}$/.test(userId || '') || !/^v\d{1,2}\.\d{1,2}$/.test(version || '')) {
    throw new Error('Configure INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_USER_ID and INSTAGRAM_GRAPH_VERSION with valid values. No request was sent.');
  }
  return { token, userId, version };
}

export async function fetchStorySnapshot(config, fetcher = fetch, now = Date.now()) {
  async function get(path, params = {}) {
    const url = new URL(`https://graph.facebook.com/${config.version}/${path}`);
    for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
    const response = await fetcher(url, { method: 'GET', headers: { Authorization: `Bearer ${config.token}` }, redirect: 'error', signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error('Instagram request failed. Check account permissions and token locally.');
    const body = await response.text();
    if (body.length > 1000000) throw new Error('Instagram response exceeded the allowed size.');
    try { return JSON.parse(body); } catch { throw new Error('Instagram returned invalid JSON.'); }
  }
  const ids = [];
  let after;
  for (let page = 0; page < 5; page += 1) {
    const result = await get(`${config.userId}/stories`, { limit: '20', ...(after ? { after } : {}) });
    if (!Array.isArray(result.data)) throw new Error('Instagram returned an invalid Stories list.');
    for (const item of result.data) {
      if (!/^\d{1,40}$/.test(item?.id || '')) throw new Error('Instagram returned an invalid media identifier.');
      if (!ids.includes(item.id)) ids.push(item.id);
      if (ids.length > 100) throw new Error('Stories limit exceeded.');
    }
    if (!result.paging?.next) break;
    after = result.paging?.cursors?.after;
    if (typeof after !== 'string' || !/^[A-Za-z0-9_=-]{1,512}$/.test(after)) throw new Error('Instagram returned an invalid pagination cursor.');
    if (page === 4) throw new Error('Instagram pagination limit exceeded.');
  }
  const items = [];
  for (const id of ids) {
    const media = await get(id, { fields: 'id,media_type,media_url,thumbnail_url,permalink,timestamp' });
    if (media.id !== id) throw new Error('Instagram returned a mismatched media identifier.');
    const timestamp = Date.parse(media.timestamp);
    if (!Number.isFinite(timestamp)) continue;
    items.push({ id, mediaType: media.media_type, mediaUrl: media.media_url, ...(media.thumbnail_url ? { thumbnailUrl: media.thumbnail_url } : {}), permalink: media.permalink, timestamp: new Date(timestamp).toISOString(), expiresAt: new Date(timestamp + storyLifetime).toISOString() });
  }
  const snapshot = { updatedAt: new Date(now).toISOString(), items };
  return { ...snapshot, items: currentStories(snapshot, now) };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    const config = syncConfiguration(process.env);
    const snapshot = await fetchStorySnapshot(config);
    const output = new URL('../public/instagram/stories.json', import.meta.url);
    const temporary = new URL('../public/instagram/stories.json.tmp', import.meta.url);
    await writeFile(temporary, `${JSON.stringify(snapshot, null, 2)}\n`, { mode: 0o644 });
    await rename(temporary, output);
    process.stdout.write(`Saved ${snapshot.items.length} eligible Stories. This is a local snapshot, not a deployment.\n`);
  } catch {
    process.stderr.write('Stories sync failed. Check the three environment values, linked professional account and permissions locally. Existing snapshot preserved; no token or API response was logged.\n');
    process.exitCode = 1;
  }
}
