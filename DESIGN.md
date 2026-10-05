# Drive Pro website design baseline

This document records the existing equipment-site identity before the three-language customer journeys. It is based on the current Tailwind/CSS source and the saved public desktop 1440 px and mobile 390 px Chromium captures in the supervisor `evidence/ui-baseline` directory. It guides incremental changes; it is not a new brand concept.

## Existing identity

- Near-black `#0A0A0A` and charcoal `#1A1A1A` surfaces; cream `#F5F0E8` text; red `#C0392B` primary actions and separators; deep red `#8B0000`; gold `#D4A017` highlights and borders.
- Self-hosted Noto Sans at normal width with variable weights; sentence-case headings and labels, normal tracking, a restrained brand wordmark and quiet industrial accents. Preserve the near-black/cream/red/gold identity. This replaces the original condensed Impact presentation following owner feedback about Kazakh readability.
- The welcome uses an open dark stage with generous space around two polished vehicle illustrations, concise labels/helpers and visible verb actions. Mobile adapts to two compact horizontal illustrated rows. Both choices, languages and contacts fit 390×844 and 360×780 without horizontal overflow.
- Existing equipment photographs come from a remote stock source. They do not establish that the photographed machines belong to Drive Pro. Do not use them as proof of specifications, fleet, jobs or availability.

## Readability and interaction rules

- Use Noto Sans for paragraphs, headings, navigation, controls and helper text with normal tracking and line height around 1.5. The local Latin/Cyrillic subset includes every Kazakh-specific uppercase/lowercase letter; retain its OFL license and source ledger.
- Keep cream text on dark surfaces. Gold can mark labels and borders. Avoid small low-opacity body text and long uppercase paragraphs.
- The primary red action, secondary outlined action and persistent phone/WhatsApp links must have visible keyboard focus. Inputs need visible labels and hints; unknown answers remain optional.
- The language switcher preserves the current route and uses `ru`, `kk` and `en` as language labels, while the existing Kazakh URL stays `/kz`.
- A one-time 1.8 second welcome arrival is authorized for the vehicle illustrations after they decode. Text and links are complete immediately. No loops, sound or delayed actions. Reduced motion/no JavaScript are static; hiding settles the arrival permanently for that page display.

## Boundaries

- Keep the static Next export under `/drivePro-website` on GitHub Pages; no new frontend dependencies for this task.
- Preserve existing `/ru`, `/kz`, `/services`, `/pricing` and `/contact` paths. Add `/en` and `/mopeds` paths consistently.
- The latest owner feedback supersedes the cuboid mini-game with a refined welcome. The old game remains unused source and is not loaded on entry. Saved/live Instagram content remains on the moped route; connection and current inventory stay unverified.
- Do not publish fixed excavator rates, promotions, years/totals, national coverage, machine specifications, stock or sale/rental claims without business evidence.

## Welcome contract — DPW-WELCOME-004

Owner feedback rejects the previous block-machine aesthetic and dense home. Follow the reviewed desktop/mobile references: compact quiet header, brand and Almaty context, one category headline, spacious category illustrations, short essential helpers and direct CTAs. Home uses Noto Sans weights 500/600/700 at normal width; no condensed or font-black display treatment. Desktop presents two open illustrated choices, not a bordered card grid. Mobile uses two compact horizontal rows. Each entire choice is one ordinary link; do not nest interactive controls.

The equipment link opens `/pricing`; the moped link opens `/mopeds`. Show “only with our operator” and individual quote explicitly. Show truthful Instagram-model context without implying current availability. The small illustration note clarifies these rendered assets are not stock/fleet photographs. Keep actual source phone/WhatsApp and all three language choices visible, with at least 44 px targets and clear focus. A skip link targets the welcome section. Compact footer links keep services/contact crawlable; retain detailed content on the existing destination routes.

The two transparent illustrations are generated rendered 3D assets animated with CSS; the implementation is not interactive 3D meshes. Preferred AVIF 360/720 variants total 29,604 / 72,759 bytes; retained WebP fallback variants total 66,462 / 188,440 bytes. The artwork, geometry and aspect ratios remain identical. No runtime dependency or eager game load. Greeting transforms/opacity last 1.8 seconds, arrive from ±64 px desktop / ±28 px mobile with a gentle rock and settle. Hover/focus can add a restrained perspective lean. Links/text never wait for motion or assets; no JS, reduced motion and failed-image states keep the complete choice layout. Hidden or intentional interaction settles the greeting without return autoplay. See [welcome specification](docs/design/WELCOME.md).

The bare `/drivePro-website/` URL renders the Russian welcome without a language-selection gate; languages remain visible and canonical uses the existing `/ru/` page. Previous play contracts are historical and do not authorize reintroducing game controls on this home.

## Instagram gallery contract

Show actual saved Highlights on the moped route. The entry page links there rather than loading the full rail. Use quiet charcoal tiles, gold-ring covers no larger than their actual 150 px source, cream model names, actual Highlight links and model-specific WhatsApp drafts. Desktop shows four cards plus a fifth edge; mobile shows one plus a peek. Controls have at least 44 px targets and native horizontal scroll/swipe; keyboard users can operate the previous/next buttons and focus each link. Static exported links work without JavaScript. No autoplay.

Fresh validated Stories, when provided, precede saved Highlights. Keep the initial public snapshot empty, never ship fixtures, and retain clear expiry/failure/empty fallbacks. API connection and current stock remain unverified. See [source ledger](docs/design/VISUAL_STORIES_SOURCES.md) and [connection preparation](docs/INSTAGRAM_STORIES.md).

## Compact destination routes — DPW-ROUTES-005

The pricing route presents three optional answers on a flat 720 px form: task, place and approximate size. Four extra answers and the editable message/copy/refresh controls begin in separate native disclosures. Contact actions remain outside them; quote factors sit below in a third disclosure. Keep only our operator and individual quote explicit without a large decorative header or wrapper.

The moped route prioritizes nine sourced saved post photos in a three-column desktop/two-column mobile grid, full portrait extent contained. A native modal viewer enhances ordinary source links with close/Escape, previous/next, keyboard/swipe, a counter and exact-source enquiries; no autoplay. Use no inferred model names or inventory claims. Validated fresh Stories stay first if supplied; initial feed remains empty and connection unverified. The smaller saved Highlight rail follows. See [route specification and source ledger](docs/design/ROUTES.md).
