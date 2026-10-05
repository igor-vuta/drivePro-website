import assert from 'node:assert/strict';
import test from 'node:test';
import { currentStories, safeInstagramUrl, storyLifetime } from '../lib/stories.mjs';
import { fetchStorySnapshot, syncConfiguration } from './sync-instagram-stories.mjs';

const now = Date.parse('2026-10-05T12:00:00Z');
const item = { id: '123', timestamp: new Date(now - 60000).toISOString(), expiresAt: new Date(now - 60000 + storyLifetime).toISOString(), mediaType: 'IMAGE', mediaUrl: 'https://scontent.cdninstagram.com/media.jpg', permalink: 'https://www.instagram.com/stories/drivepro.moped.almaty/123/' };
const snapshot = (items = [item]) => ({ updatedAt: new Date(now).toISOString(), items });
test('Stories expire at 24h and reject stale snapshots, future or invalid timestamps', () => {
  assert.equal(currentStories(snapshot(), now).length, 1);
  assert.equal(currentStories(snapshot(), now + storyLifetime).length, 0);
  for (const change of [{ timestamp: new Date(now + 1).toISOString() }, { timestamp: 'wrong' }, { expiresAt: new Date(now + storyLifetime * 2).toISOString() }, { expiresAt: new Date(now).toISOString() }]) assert.equal(currentStories(snapshot([{ ...item, ...change }]), now).length, 0);
  assert.equal(currentStories({ ...snapshot(), updatedAt: new Date(now - storyLifetime).toISOString() }, now).length, 0);
  for (const value of [null, {}, { items: null }, { items: [null] }]) assert.deepEqual(currentStories(value, now), []);
});
test('sort newest first, discard duplicates and whitelist only safe URLs', () => {
  const older = { ...item, id: '124', timestamp: new Date(now - 120000).toISOString(), expiresAt: new Date(now - 120000 + storyLifetime).toISOString() };
  assert.deepEqual(currentStories(snapshot([older, item, item]), now).map(x => x.id), ['123', '124']);
  for (const url of ['javascript:alert(1)', 'http://www.instagram.com/stories/1/', 'https://instagram.com.evil.test/stories/1/', 'https://user:secret@instagram.com/stories/1/', 'https://instagram.com:444/stories/1/', 'https://instagram.com/stories/1/?access_token=secret']) assert.equal(safeInstagramUrl(url), null);
  for (const url of ['https://cdninstagram.com.evil.test/image', 'https://evil.test/image', 'https://user@fbcdn.net/image']) assert.equal(safeInstagramUrl(url, true), null);
  assert.equal(currentStories(snapshot([{ ...item, mediaUrl: 'javascript:alert(1)' }]), now).length, 0);
});
test('sync validates environment before requests and preserves token-free pinned two-step contract', async () => {
  assert.throws(() => syncConfiguration({}));
  assert.throws(() => syncConfiguration({ INSTAGRAM_ACCESS_TOKEN: 'x'.repeat(30), INSTAGRAM_USER_ID: '../evil', INSTAGRAM_GRAPH_VERSION: 'v22.0' }));
  const config = syncConfiguration({ INSTAGRAM_ACCESS_TOKEN: 'x'.repeat(30), INSTAGRAM_USER_ID: '456', INSTAGRAM_GRAPH_VERSION: 'v22.0' });
  const calls = [];
  const fetcher = async (url, options) => {
    calls.push({ url: String(url), options });
    return { ok: true, text: async () => JSON.stringify(calls.length === 1 ? { data: [{ id: '123' }] } : { id: item.id, media_type: item.mediaType, media_url: item.mediaUrl, permalink: item.permalink, timestamp: item.timestamp }) };
  };
  const result = await fetchStorySnapshot(config, fetcher, now);
  assert.equal(result.items.length, 1);
  assert.equal(calls.length, 2);
  assert.equal(new URL(calls[0].url).pathname, '/v22.0/456/stories');
  assert.equal(new URL(calls[1].url).pathname, '/v22.0/123');
  assert.ok(calls[1].url.includes('media_type'));
  assert.ok(calls.every(call => new URL(call.url).hostname === 'graph.facebook.com' && !call.url.includes(config.token) && call.options.redirect === 'error'));
  assert.ok(!JSON.stringify(result).includes(config.token));
});
test('sync ignores remote next URL and rebuilds pagination against pinned host', async () => {
  const config = { token: 'x'.repeat(30), userId: '456', version: 'v22.0' };
  let call = 0;
  const result = await fetchStorySnapshot(config, async url => {
    assert.equal(new URL(url).hostname, 'graph.facebook.com');
    call += 1;
    return { ok: true, text: async () => JSON.stringify(call === 1 ? { data: [], paging: { next: 'https://evil.test/?access_token=secret', cursors: { after: 'valid_cursor' } } } : { data: [] }) };
  }, now);
  assert.equal(call, 2);
  assert.deepEqual(result.items, []);
});
