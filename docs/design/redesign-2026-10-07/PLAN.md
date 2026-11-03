# Drive Pro redesign — proposal v0.1

> **Superseded:** This was an unapproved proposal prepared before the owner’s decisions. Use [../../../PLAN.md](../../../PLAN.md) for the current two-website brief. The light-studio direction and shared-entry layout below are historical, not approved requirements.

Date: 2026-10-07
Status: planning only; visual direction and reference designs are not approved.
Implementation: not started. Autonomous development: not enabled.
Baseline: deployed release `ee396f6b662c681bad2ca198f45128cbbad28f2a` from this repository.

## Decision to make

Choose the visual direction before implementation. The working recommendation is a
light studio treatment: warm white, graphite type, a restrained machinery-yellow
accent, a short polished 3D greeting, and actual photographs on the equipment and
moped pages. This is a proposed change from the current dark/red/gold design,
not an approved replacement for DESIGN.md.

Three routes to review:

| Direction | What visitors see | Tradeoff |
| --- | --- | --- |
| Photography first | Large real machines and mopeds, strong typography, quiet transitions | Fastest and most credible; needs better original equipment photography |
| Studio 3D — working recommendation | A composed vehicle scene, short greeting, visible route actions; real photos after choosing | Distinctive entrance; asset quality and mobile performance must be proved |
| Playful scene | An explorable yard/street with optional interactions | More production work; keep the two ordinary route links immediately usable |

Do not combine all three into one crowded homepage. A game is a later, separately
reviewed feature, not a prerequisite to understanding or using the site.

## What the redesign needs to fix

The business goals remain: Almaty search visibility in RU/KK/EN, excavator enquiries
with our operator, and moped browsing. The owner has rejected the current visual
result. Functional correctness alone is not design acceptance.

| Priority | Observed issue | Design response |
| --- | --- | --- |
| 1 | Home and inner pages use visibly different headers, buttons and visual density | One navigation, type scale, spacing system and contact pattern everywhere |
| 1 | Home is two isolated rendered cutouts; current movement transforms images | Review one coherent scene and an actual motion sample before calling it 3D |
| 1 | Quote page leads with fields; contact actions follow the questions | Direct WhatsApp/call first, optional brief second |
| 1 | Moped page places several introductions and status messages before media | One short heading, immediate media, one compact source/status note |
| 2 | Saved photos and Highlights have repeated titles/actions and no single browsing hierarchy | Lead with one story-style viewer; use the archive as a secondary model directory |
| 2 | Current photos are small portrait previews; equipment imagery is not verified business photography | Record asset provenance and dimensions; obtain originals before using them as large proof images |
| 2 | Mobile home has long unused lower space, with secondary services links confined to its footer | Use deliberate composition and a compact useful continuation instead of a forced full-height gap |

These are design observations and owner feedback, not user-research results.
The planning baseline contains RU home desktop/mobile and RU quote/mopeds desktop
captures in `baseline/`. It is not a complete accessibility, device, browser or
performance audit. Full baseline capture is a prerequisite to implementation.

## Page structure

The layouts below are proposals for the working studio direction. They are not
locked requirements until direction/reference approval. If a different direction is
chosen, revise these layouts before freezing the worker tasks.

Keep the current localized URLs. Do not move pages while Google is discovering
them. The root stays a usable Russian entrance, canonical to `/ru/`.

### 1. Home — understand and choose

First screen, in this order:

1. Compact Drive Pro wordmark, the two destination links, language choice and contact.
2. One localized headline identifying the offer and Almaty.
3. One vehicle composition with two clearly labeled destinations.
4. Two large ordinary links: equipment enquiry and moped browsing.
5. Small contact row, without needing to scroll through marketing copy.

Working Russian copy:

- Headline: «Экскаватор и мопеды в Алматы».
- Equipment: «Экскаватор с оператором» / «Стоимость по вашей задаче» / «Обсудить работу».
- Mopeds: «Мопеды» / «Фото и видео из нашего Instagram» / «Смотреть мопеды».
- Contacts: «Написать в WhatsApp» and «Позвонить».

All labels remain readable HTML; never bake copy or links into a render/canvas.
Below the first screen: one short equipment-services introduction with a link to
`/services`, and optional genuine recent media when suitable assets are available.
No counters, testimonials, offers or badges without evidence. No text dump, automatic
carousel, repeated contact panels or introductory gate.

Desktop: a shared scene spans the central stage; route labels/actions sit on a
stable baseline below the relevant vehicle. No floating unlabeled hotspots.
Mobile: compact scene above two full-width route choices; both choices visible at
390×844 with normal text. At 200% text size, normal scrolling takes precedence over
forcing content into one screen. No sideways scrolling.

### 2. Equipment services — answer a search visitor's questions

`/{locale}/services/` is the detailed excavator/earthworks landing page.

- First screen: specific localized H1, operator-only rule, individual quote,
  WhatsApp and call actions, one verified equipment/job photograph when available.
- Task navigation: trenches, foundation excavation, site work, and other confirmed
  services. No unconfirmed machinery specification or service added for keywords.
- Real job examples: photo, factual description and relevant access/volume context.
  Omit the section until actual material exists; never fill it with invented jobs.
- Short process: describe task → discuss machine/access → agree scope and price.
- Useful visible service copy and focused FAQs; contact repeated once at the end.

Preserve useful existing text while reorganizing it. Detailed SEO content belongs
here, not in the homepage greeting. Do not create near-duplicate location pages.

### 3. Enquiry — contact first, details when useful

Keep `/{locale}/pricing/` as the existing enquiry URL; label navigation by the task,
not by a promise of a published rate.

- Heading, operator-only statement, WhatsApp and call immediately visible.
- Prompt: «Хотите сразу описать задачу?» opens the optional brief inline.
- Maximum three initially visible optional inputs: work, place, approximate size.
- Access, timing and ground/removal details remain behind one disclosure.
- Editable message preview stays secondary. Every unanswered field is omitted.
- An entirely empty brief creates only the existing short generic enquiry.
- Changing details updates the generated draft; manual edits are not silently lost.
- No account, required phone field, mandatory wizard, price calculator or upload.
- Photos/videos can be sent in WhatsApp. Opening WhatsApp does not mean sent/booked.

Desktop: enquiry and optional brief can sit beside a restrained contextual image.
Mobile: actions precede the brief; optional fixed bottom contacts must account for
safe areas, the keyboard and focused content. Use the same buttons as other pages.

### 4. Mopeds — visual browsing first

Keep `/{locale}/mopeds/`.

- Compact heading and Instagram source link, followed immediately by media.
- First content priority: verified fresh Stories, if the authorized feed is connected.
- A horizontally scrollable strip of large portrait thumbnails opens a story-style
  viewer. Keyboard/click controls accompany swipe. Desktop can show a featured
  frame plus the next thumbnails; mobile uses one large frame with a next-frame peek.
- Photo slides advance manually. Video has visible play/pause, mute and seek controls;
  never start audio automatically. Show progress only for actual playback.
- Viewer has close/Escape, previous/next, item counter, source link and one enquiry
  action referring to that exact item. Restore focus to the opener on close.
- Secondary section: saved model Highlights, grouped under a single archive heading.
  Do not repeat «Сохранённые Highlights» on every tile. Preserve corrected names.
- Show price/stock only when provided and current. Otherwise «Уточнить наличие».

Content truth is part of the design:

| Feed condition | Public presentation |
| --- | --- |
| Authorized, valid fresh Stories | Show newest first with actual source/refresh information |
| No current Stories | Lead with saved photos, accurately labeled once |
| Feed error or expired media | Keep usable saved content; one quiet explanatory line and Instagram link |
| Account not connected | Saved publication gallery; never label it live or pretend an embed supplies Stories |
| No approved media at all | Useful contact/Instagram route, no broken frame or fabricated product |

Saved media is the baseline implementation deliverable. Fresh-feed work is an
optional, separately authorized connection task and must not block the redesigned
saved-media viewer. The current account connection is unverified. A story-like website viewer is
independent of a live Instagram Stories feed. Model availability is also separate.

### 5. Contact and missing-page states

`/{locale}/contact/`: phone, WhatsApp, Instagram and confirmed service area. Do not
invent opening hours, a street address or a map pin. Preserve useful callback-to-
WhatsApp behavior without a promise of message delivery.

A missing page offers the two business routes and language choice. No decorative
scene required for errors, contact or the form.

## Proposed visual system to prove in references

| Element | Draft specification |
| --- | --- |
| Background | Warm white `#F4F1EA`; white cards only where grouping helps |
| Primary text | Graphite `#20221F` |
| Secondary text | `#575C54`; verify contrast in actual combinations |
| Accent | Machinery yellow `#DFAE24`, paired with dark text; not small yellow text on white |
| Frame/grid | Max content width 1280 px; 48 px desktop, 28 px tablet, 20 px mobile gutters |
| Spacing | 4/8/12/16/24/32/48/64/96 px tokens; no arbitrary per-page spacing |
| Type | One family supporting Latin, Cyrillic and every Kazakh letter; prove at 14–56 px before locking |
| Type sizes | Body 16–18 px; labels 14–16 px; home H1 44–56 px desktop, 30–36 px mobile |
| Shape | Mostly 8–12 px corners; no pill badges or borders on every section |
| Actions | 48 px minimum height; visible keyboard focus and clear text labels |
| Navigation | Same wordmark, active-state treatment and language layout on every route |

Compare the existing self-hosted Noto Sans specimen with at most one fully licensed
alternative. Test «Әә Ғғ Ққ Ңң Өө Ұұ Үү Һһ Іі», mixed-language labels and numerals.
No condensed all-caps substitute, synthetic weight or glyph fallback. The owner
reviews a real Kazakh screen, not an English-only type sample. Exact color/type
choices become binding only after the reference review.

## Greeting and 3D contract

The preferred concept is a studio scene with consistent scale, ground contact,
lighting and materials. The excavator makes one small bucket/arm gesture and the
moped settles into place. Text and destination links are usable from frame one.

Before choosing delivery technology, review a still and a short motion prototype:

- Actual real-time 3D: licensed/owned GLB assets, isolated client component, bounded
  camera and motion. New dependency requires a performance/security review.
- Pre-rendered 3D animation: compressed video plus still fallback, explicitly named
  pre-rendered animation. Do not describe transformed flat images as real-time 3D.

The owner chooses which promise is required before agents implement it. No blocky
procedural substitute, spinning stock model or return to the rejected cutout wobble.

Draft timing: 1.5–2 seconds once, then settle. Hover/focus may trigger a small
200–250 ms emphasis, not a new intro. Touch navigation does not require playing.
Reduced motion, missing media, WebGL failure and JavaScript disabled all retain the
same complete static route choices. Stop when hidden/offscreen. No scroll hijacking,
cursor replacement, continuous camera orbit, audio, forced tutorial or download gate.

Draft performance gates to approve with the prototype:

- Static homepage stills total ≤200 KB at the mobile size; preserve dimensions to
  prevent content movement. Self-hosted fonts and app shell remain separate budgets.
- Additional compressed 3D runtime code ≤250 KB; model/textures ≤1.5 MB fetched
  after useful content, never required for the first usable links. If not achievable,
  bring back the actual measurements and a concrete alternative for review.
- Aim for mobile LCP ≤2.5 s, CLS ≤0.1, INP ≤200 ms where field data exists. Record lab
  environment/results separately; do not claim field success from a local test.
- No more than a 10% median lab regression on the same three-run profile; when the
  current baseline misses the targets, prioritize improving it, not retaining failure.

## Assets and business facts

Required before final visual approval. For every missing asset, record one explicit
choice: owner supplies the original, owner approves a specific truthful fallback, or
the affected section is omitted from this release. Agents must not decide this by
inventing a replacement. Only the affected visual task waits.

1. One credible original excavator/job hero photograph and 3–6 real work images,
   or an explicitly approved editorial alternative that makes no fleet claim.
2. Higher-resolution originals for the selected moped media where available.
   Existing ~360 px post previews and 150 px Highlight covers are not large hero assets.
3. Exact 3D assets/motion clip with source, license, dimensions/size and owner review.
   Generated concept renders are design references, not evidence of actual inventory.
4. Confirm moped sale/rental offer before writing commercial labels or filters.
5. Fluent Kazakh review of visible copy and a rendered Kazakh screen.

No social outreach, account creation, purchases or third-party uploads are authorized
by this planning document. Do not create reviews, availability, pricing or job claims.

## Plan for future autonomous development

Approval of this plan or references does not activate development or release. The
owner will activate development separately. Existing managed release permissions do
not make this planning task an instruction to commit, push or deploy a redesign.
Final visual acceptance and applicable review/release gates remain required.

Nothing below is queued yet. First approve a direction and concrete references;
then activate bounded tasks through this project's existing supervisor only.

| Task | Deliverable and owned scope | Exit evidence / dependency |
| --- | --- | --- |
| DPW-RD-01 | Direction and source-grounded content/asset brief; planning files only | Owner chooses direction; unresolved facts listed |
| DPW-RD-02 | Resolve any remaining direction choice with contrasting home concepts; then section reference designs: home desktop/mobile, quote, moped viewer and services; motion sample and Kazakh type specimen | Owner reviews actual images/motion, not only prose; no implementation yet |
| DPW-RD-03 | Full baseline and frozen design contract; DESIGN.md and task definitions | Route/view/motion matrix, tokens, reference hashes, runtime/asset budgets approved |
| DPW-RD-04 | Common header/footer, type, color, spacing and contact components in isolated candidate | Independent review; screenshots of all three languages; stable navigation/focus |
| DPW-RD-05 | Home structure and approved motion; home components only | Exact reference match, usable before animation, static/reduced-motion/failure paths |
| DPW-RD-06 | Equipment/services and enquiry layout; preserve message-generation module | Empty/partial/manual draft tests; direct-contact flow; useful SEO content retained |
| DPW-RD-07 | Moped layout/viewer using current truthful data states | Phone/keyboard viewer; nine saved photos and corrected archive labels preserved |
| DPW-RD-08 | Optional authorized fresh-feed connection, separate from layout work | Real refresh/expiry evidence; unavailable connection stays a recorded blocker |
| DPW-RD-09 | Integrated content, visual and accessibility evaluation | Same matrix vs baseline; no unapproved departures, all necessary checks pass |
| DPW-RD-10 | Owner visual acceptance, checked release and production verification | Signed sole-owner commits, actual commitlint, batched push, exact CI and live checks |

One active writer per project; workers work in private candidates and cannot publish.
Independent evaluators do not edit their candidate. Cap ordinary visual repair loops
at two; return a specific mismatch or asset limitation rather than replacing the design.
Agents may adjust implementation details inside the approved contract; they may not
choose a new palette, invent imagery, change commercial facts, change routes or ship
a fallback that contradicts the approved visual promise. No copied DrivePro_2 work.
Do not reuse the one-time PR1 review bypass for this release. Preserve current branch
protection and future required reviews. Do not start or restart a scheduler here.

## Acceptance checklist for activation

- [ ] Chosen direction and exact motion type approved.
- [ ] Desktop and mobile home, equipment, quote and moped references reviewed.
- [ ] Kazakh type/copy screen reviewed; font/license/glyph coverage proven.
- [ ] Source/asset ledger complete or each concrete fallback approved.
- [ ] Full audit matrix established: all 15 localized routes + root and 404; 360/390,
      768 and 1440 widths; Chromium/Firefox; reduced/default motion; first/repeat entry.
      Physical Safari/iOS checks reported separately if available.
- [ ] Keyboard/focus, 200% text zoom, media error, slow network, no JS and optional
      3D failure states assigned to explicit tests. Do not claim a full audit from four captures.
- [ ] Phone/WhatsApp verified without sending messages; blank fields remain omitted.
- [ ] Titles, descriptions, canonical/hreflang, language attributes, structured data,
      sitemap entries and Google's verification file preserved and checked.
- [ ] Search Console follow-up remains separate: sitemap report fetch error despite
      successful live fetch, accepted RU services indexing request, performance pending.
- [ ] Exact reference version/hash, owners, file scope and acceptance evidence saved in
      supervisor state before activation. No blanket “make it look better” worker prompt.

## Related artifacts

- [Schematic page layouts](layout-board.html): structure only, not final art direction.
- [Audit notes](AUDIT.md): observed baseline and bounded code review.
- Current requirements: `PROJECT.md`; current implementation design contract: `DESIGN.md`.
  On approval, reconcile these with the new contract rather than leaving conflicting rules.
