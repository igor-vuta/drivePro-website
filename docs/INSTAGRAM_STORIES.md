# Stories preparation and connection gate

The ten saved Highlight covers are local, source-grounded content. They are not full Story photos or videos. Nine larger public Reel preview images were added on 2026-10-06 as a separately labelled post-photo gallery; they are not a live feed or evidence of current availability. Automatic Stories connection is **UNVERIFIED**: no owner token or connected-account request was used, and no scheduler or new infrastructure was created. The initial public snapshot is empty. Owner account eligibility/access remains pending separately in this project's approval inbox.

## Prepared API contract — not connected

This manual preparation uses Instagram API with **Facebook Login**. The documented Facebook Login account setup requires a professional account linked to a Facebook Page. This script was prepared around a Facebook User token and the `instagram_basic`, `pages_read_engagement` and discovery `pages_show_list` permissions. The exact minimal current Stories-read permissions have not been independently verified. Verify these permissions, the app's access level, linked account ID and the configured Graph API version against current Meta documentation before connecting. Do not substitute an Instagram Login token into this Facebook Login implementation.

Primary references: [Meta IG User Stories](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-facebook-login/reference/ig-user/stories/), [Meta IG Media](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-facebook-login/reference/ig-media/), and [Meta's official API collection](https://www.postman.com/meta/instagram/documentation/6yqw8pt/instagram-api). The direct Meta reference pages were not readable through the research tool during this preparation; live eligibility, app review, permissions and storage/refresh policy are unverified.

The script first sends `GET https://graph.facebook.com/{version}/{ig-user-id}/stories`, then retrieves each returned ID with fields `id,media_type,media_url,thumbnail_url,permalink,timestamp`. It follows validated pagination cursors on the fixed Graph host, never API-provided next URLs. It caps retrieval at 5 list pages/100 IDs and each request at 10 seconds. Tokens travel in an Authorization header, never a query URL or browser bundle. Error output contains no token, remote response or request URL. The snapshot contains only validated public media fields, refresh time and bounded expiry. It downloads no Story media.

## Manual use after account authorization

Set these environment values locally through your existing secure credential handling; do not save them in the repository, public files or command transcripts:

- `INSTAGRAM_ACCESS_TOKEN`: Facebook User access token for the linked professional account.
- `INSTAGRAM_USER_ID`: verified numerical Instagram account ID.
- `INSTAGRAM_GRAPH_VERSION`: supported version such as `vNN.0`, verified in the app dashboard.

Run `npm run sync:stories`. With missing/invalid configuration it fails before any external fetch. Success atomically updates `public/instagram/stories.json`; it does not publish the snapshot. The coordinator must separately review storage permission, retention and refresh timing and deploy through the existing checked release process. Do not add a scheduler while this gate is unresolved.

The client shows only safe HTTPS Instagram CDN media and Instagram Story permalinks, rejects credentials, unusual ports, token query fields, invalid/future timestamps and stale snapshots, and expires every Story no later than 24 hours after its timestamp. Active items are sorted newest first above saved Highlights. Visibility and expiry timers remove expired items in a long-open tab. Image/video failures stay excluded until explicit retry; saved Highlights and direct Instagram links remain available. Videos have native controls, no autoplay and start muted; source audio captions have not been supplied or verified. No caption transcript is invented.

A per-Story WhatsApp draft contains its actual permalink. It makes no model, stock, delivery or successful-send claim. The customer still sends the draft in WhatsApp.

Fixtures exist only in unit/browser tests. They are never shipped as real fresh Stories in the public snapshot.

## Account research on 2026-10-06

Meta's official API collection confirms a separate Instagram Login path for Business/Creator accounts without a linked Facebook Page. This does not establish Stories-read support for that path. Do not apply the collection's Business-only Stories publishing restriction to Stories reads. Current Stories-read fields, minimal scopes, Highlights/archive access and native/oEmbed Story support remain unverified because the direct reference pages could not be read. Choose a connection path only after checking its current reference and a response from the authorized account.

The public profile exposed full portrait Reel preview images. Opening an actual saved Highlight in the normal Instagram UI reached a sign-up/log-in gate; no full Story media was acquired. The website viewer displays the nine verified post previews with their original post links. Prepared support for supplied Story media does not mean Instagram is connected. Do not scrape around login, reuse private session tokens, or relabel post previews as fresh Stories.

Owner input pending: admin access and account type for `@drivepro.moped.almaty`, then existing approved Meta app/Page connection if any. Use secure local credential handling, never ask for tokens in chat. A new permission grant or service needs its own concrete approval. No scheduler changes, third-party widget installation or new infrastructure were made.
