# Drive Pro — project goals

Status: approved working scope for supervisor enrollment by owner instruction on 2026-10-03. Current execution evidence is maintained separately in the supervisor state.
Date: 2026-10-03

## Purpose

Turn the existing Drive Pro website into a reliable source of relevant enquiries in Almaty and the confirmed surrounding service area. Visitors should find the business through search, immediately understand what it offers, and easily contact us about earthworks or mopeds.

Improve the existing site incrementally. Keep useful code, routes, content and working contact links. Rebuild a part only when an audit shows that adapting it cannot meet the goals.

DrivePro_2 is a completely different product. Use this repository's existing website and history as the implementation baseline. Do not import DrivePro_2's requirements, source, authentication, ride-sharing features, design, deployment assumptions, progress or approvals. Only the shared supervisor machinery is reused.

## Priorities

1. **Local SEO:** compete for relevant Russian, Kazakh and English searches about excavators, tractors, earthworks and mopeds in Almaty.
2. **Customer experience:** offer two obvious routes: request an excavator/earthworks quote, or browse mopeds. Make calling and WhatsApp easy throughout both routes.
3. **Design and engagement:** give the site a fresh identity and an optional playful interaction while protecting loading speed and contact access.

If these priorities conflict, search visibility and customer enquiries take precedence over decoration or games.

## Existing baseline

Source inspection on 2026-10-03 found:

- Next.js 14, TypeScript, Tailwind and `next-intl`, with a static export configured for GitHub Pages under `/drivePro-website`.
- Russian and Kazakh content at `/ru` and `/kz`; home, services, pricing and contact pages; no English translation file yet.
- Excavator, loader and tractor cards, phone/WhatsApp/Instagram links, and a callback form that opens a WhatsApp draft.
- Fixed equipment prices and a first-order promotion in the current copy. These need reconciliation with the requirement for individual excavator quotes.
- Russian titles/descriptions shared across locales and a root `<html lang="ru">`.
- Sitemap, robots and business data that default to `https://drivepro.kz`, while the README links to `https://igor-vuta.github.io/drivePro-website/`. The intended production domain and its current state need verification.
- A callback success message that promises contact after opening WhatsApp. Opening a draft does not establish that the customer sent it or that we received it.
- An existing push-to-main GitHub Pages deployment workflow.

This is a source baseline, not a completed browser, production, indexing or ranking audit. Business claims in the existing copy still need owner confirmation.

## Goal 1 — local search visibility

### Outcome

Aim for leading local visibility, including first position where achievable, for a researched set of commercial searches. No implementation can guarantee first position for every query or every searcher. Track ordinary organic results separately from local map results.

Start with a manageable priority query set. Expand it using actual search data and the services we really provide rather than creating a page for every wording variation.

### Search intent coverage

These are initial query examples, not validated search-volume findings. Review Kazakh wording with a fluent speaker before publication.

| Intent | Russian examples | Kazakh examples | English examples |
| --- | --- | --- | --- |
| Excavator with operator | аренда экскаватора Алматы; экскаватор с оператором Алматы | Алматыда экскаватор жалдау; оператормен экскаватор жалдау | excavator rental Almaty; excavator hire with operator Almaty |
| Small excavator / difficult access | мини-экскаватор Алматы; экскаватор для узкого проезда | Алматыда шағын экскаватор жалдау; тар жерге арналған экскаватор | mini excavator rental Almaty; narrow access excavation Almaty |
| Earthworks by task | земляные работы Алматы; копка траншей; котлован под фундамент | Алматыдағы жер қазу жұмыстары; ор қазу; іргетасқа шұңқыр қазу | earthworks Almaty; trench digging; foundation excavation Almaty |
| Tractor and loader | аренда трактора Алматы; услуги погрузчика Алматы | Алматыда трактор жалдау; тиегіш қызметтері | tractor hire Almaty; loader services Almaty |
| Moped browsing | мопеды Алматы; скутеры Алматы | Алматыдағы мопедтер; Алматыдағы скутерлер | mopeds Almaty; scooters Almaty |

Add buying, rental, price, availability and neighbourhood modifiers only when they match the confirmed business offer. A broad search term does not authorize advertising a service we do not provide. Moped sales versus rental remains to be confirmed.

### Requirements

- Give every important service an accessible page with useful text, real equipment details, job examples, service coverage, FAQs and a clear contact action. Group similar queries by intent; avoid near-identical keyword or location pages.
- Make all core pages available in Russian, Kazakh and English, including page titles, descriptions, headings, navigation, form prompts, errors and WhatsApp messages. Do not leave English or Kazakh pages with Russian metadata.
- Use stable language URLs, correct language attributes, self-referencing canonical URLs and reciprocal `hreflang` links with valid language codes (`ru`, `kk`, `en`). The existing `/kz` path can remain; the Kazakh language code is `kk`. Any URL migration needs a working redirect strategy for the chosen host.
- Align production URLs, base path, internal links, sitemap, robots, social previews and structured data. Confirm the production address before changing them. Evaluate a business domain without assuming that buying one guarantees rankings.
- Keep service text and navigation available in the exported HTML. Customers and crawlers should not need an animation, carousel, Instagram connection or client-side interaction to discover the offer.
- Use accurate business structured data with confirmed contact details and service area. Do not invent prices, reviews, availability, addresses or aggregate ratings.
- Confirm and improve the business's local presence: Google Business Profile, relevant Google/Yandex search tools and local listings such as 2GIS. Keep business details consistent and use real photographs and genuine customer reviews. External changes remain a separate authorized task.
- Explain why excavator quotes vary and answer useful questions about access, dimensions, soil, timing and the operator. Add real job case studies when suitable material exists.
- Measure indexing, search queries, impressions, clicks and enquiry actions. Do not report a WhatsApp or phone click as a received enquiry or completed job.

Google's [local ranking guidance](https://support.google.com/business/answer/7091?hl=en) explains the relevance, distance and prominence factors. Its [localized page guidance](https://developers.google.com/search/docs/specialty/international/localized-versions) describes how to connect language versions.

### Acceptance

- Every approved core route has complete content in all three languages and correct, verified SEO output in the static build.
- Important production pages, contact links and language links work; sitemap entries point to real canonical pages.
- Search tooling provides an indexing and query baseline when access is available. Record actual indexing separately from technical readiness.
- The priority query list records intent, language, landing page and evidence of demand where available.
- Establish a baseline, then review at approximately 30, 60 and 90 days after release. Record local ranking samples with the location, device and date; assess qualified enquiries alongside search visibility. Set numerical growth targets after baseline data exists.

## Goal 2 — two clear customer routes

The first screen must offer two clear choices in all three languages:

- **Excavator / earthworks — request a quote.** Tractor and loader enquiries belong within this equipment/services route.
- **Mopeds — browse the latest updates.**

Keep the language switcher and contact actions easy to find. Search visitors who land on a service page should be able to contact us directly without returning home.

### Route A — excavator and earthworks

**Hard rule: excavator hire is available only with our operator. No hire without our operator.** State this on the landing page, equipment/service pages and enquiry summary in every language. Do not offer a self-drive option.

Excavator prices are individual quotes based on the task and conditions. Replace fixed excavator prices, conflicting promotions and price claims in metadata or structured data with a clear quote explanation. Confirm how this applies to tractors/loaders before changing their commercial terms.

Provide a short guided job brief with optional details. Calling or opening WhatsApp must remain available at every step; completing the brief is never required to contact us.

Suggested questions:

1. **What work is needed?** Trench, foundation pit, site clearing or another confirmed task, with a free-text option and “not sure”.
2. **Where and when?** Area/address or map reference, preferred date and flexibility.
3. **How much work?** Approximate volume in m³, or length × width × depth in metres. Accept “not sure”; customers do not need technical expertise.
4. **What are the access conditions?** Gate/path width if known, tight turns, limited height, slope, surface or other restrictions.
5. **Anything else we should know?** Ground conditions, known underground services, spoil removal/loading and an existing description or photos.

Use the answers to prepare a useful summary. A narrow-access answer can suggest discussing a small excavator; only our team confirms machine suitability, availability and the final quote. Do not invent machine clearance limits or calculate a guaranteed price from volume.

Before leaving the site, show an editable summary and two actions:

- **Open WhatsApp with this message.** Encode the selected language and actual answers correctly. Explain that the customer still needs to send the message. Leave unknown answers as “not sure / to discuss”.
- **Call us.** Keep the summary visible as talking points, with a copy option.

Example Russian WhatsApp draft:

```text
Здравствуйте! Нужен экскаватор с вашим оператором.
Работа: [вид работ / нужно обсудить]
Место: [район или адрес / нужно уточнить]
Дата: [желаемая дата / гибко]
Объём или размеры: [ответ / не знаю]
Проезд и ограничения: [ответ / нужно уточнить]
Грунт и другие условия: [ответ / нужно уточнить]
Вывоз или погрузка грунта: [ответ / нужно обсудить]
Подскажите подходящую технику, доступность и стоимость.
При необходимости отправлю фото или видео участка.
```

Provide equivalent natural Kazakh and English messages. Photos/videos can be sent in WhatsApp; do not add a website upload service unless it is needed and separately designed.

### Route B — mopeds

Use the newest Stories from our account, [@drivepro.moped.almaty](https://www.instagram.com/drivepro.moped.almaty/), as the main carousel content. Prioritize newest first and make each item easy to view and enquire about.

- Give the route a permanent text introduction, contact actions and confirmed moped details so it stays useful and searchable between Stories.
- Provide touch, keyboard and visible previous/next controls. Videos need playback controls; avoid sound or automatic movement that prevents reading.
- Where details are available, include a readable caption, model and a relevant enquiry action. Do not infer current stock, price or sale/rental terms from a picture.
- Keep general enquiry actions available when an item cannot be reliably identified. Do not label old Stories as current availability.

**Automatic Stories integration is a feasibility gate, not an assumed feature.** Verify current Meta API support, account eligibility, owner connection, permissions, media expiry, permitted storage and refresh behaviour before choosing an implementation. The public profile URL alone is not a validated feed integration. The profile and Meta documentation could not be inspected through the research tool on 2026-10-03.

Evaluate a scheduled build or an approved small server-side sync for a static site; keep credentials out of browser code and the repository. Any hosting change requires a separate decision.

Design these states explicitly:

- Active Stories: show the freshest verified content and refresh timestamp.
- No active Stories: show a useful empty state, Instagram link and approved moped content.
- Connection failure or expired media: avoid broken cards and retain the contact route.
- Automatic integration unavailable: propose owner-managed uploads of approved Story media as the fallback. Mark these as curated content, not a live feed, and confirm this tradeoff before replacing the requested behaviour.

### Acceptance

- A visitor can choose either route and reach its relevant contact action directly on a phone.
- The excavator brief works with partial answers, preserves answers during editing, and produces a correct editable draft in each language.
- WhatsApp and phone links use the confirmed business numbers. Opening a draft never displays “message sent”, “booking confirmed” or a callback promise.
- The operator requirement and individual excavator quote policy are visible throughout the relevant journey.
- The moped carousel works on touch and keyboard, with tested empty, stale and failed-feed states. Automatic sync is described as complete only after a real connected-account verification.

## Goal 3 — fresh design and optional play

Use a coherent Drive Pro identity, clear typography, real equipment/moped media and a strong mobile layout. Preserve useful existing branding where it fits. The two customer choices must be understandable before visitors scroll into decorative content.

Proposed interaction: **“Clear the site”** — a short excavator mini-game where visitors move a few piles of soil to reveal a moped or a playful Drive Pro scene. Touch or keyboard controls and a short completion make it approachable. A simple animated scene is acceptable if full 3D adds too much cost or complexity.

Keep this below the primary customer routes and behind an explicit play action. Load its assets on demand, pause when hidden, provide a static fallback and respect reduced motion. No contact action, service content or navigation should depend on playing it.

Performance target: good mobile [Core Web Vitals](https://web.dev/articles/vitals) where field data is available (LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 at the 75th percentile). Use repeatable lab measurements while traffic is insufficient, and record them as lab results. Agree an asset/dependency budget in `DESIGN.md` before adding 3D libraries.

### Frontend workflow

Follow the shared [existing-site redesign guide](../frontend-agent-tooling/workflows/redesign-existing-ui.md), starting from its [tooling README](../frontend-agent-tooling/README.md):

1. Record existing design rules and limits in `DESIGN.md`.
2. Diagnose the existing UI and capture browser/performance baselines.
3. Rank changes against SEO and the two customer routes; prepare the redesign brief for review.
4. Use section-level image references for structural changes and in-place edits for polish.
5. Verify the same routes, viewports, browser states and motion settings after implementation; review accessibility and regressions.

Accept the visual work when both routes remain easy to use on mobile, keyboard navigation and focus work, text remains readable, and optional motion does not compromise loading or contact access.

## Delivery order

| Phase | Deliverable | Completion evidence |
| --- | --- | --- |
| 0. Confirm scope and baseline | Reviewed project brief, verified business facts, production address, existing-route/browser/search baseline and ranked backlog | Recorded facts, screenshots and checks; unresolved items labelled |
| 1. SEO foundation | Three-language core content, URL/metadata/schema corrections, service-intent pages and measurement setup | Static output and browser checks; production/indexing checks when released and access is available |
| 2. Customer routes | Two-choice entry, individual quote journey, operator rule, ongoing contact and prepared messages | End-to-end mobile checks in RU/KK/EN with complete and partial answers |
| 3. Moped updates | Integration feasibility result, carousel and permanent supporting content | Connected-account refresh test or reviewed fallback; expiry/failure checks |
| 4. Visual refinement and play | Reviewed redesign, optional animation/game and optimized assets | Before/after screenshots, accessibility and performance results |
| 5. Search growth | Real job content, confirmed local listing improvements and query-led refinement | Search/enquiry trend reviews at agreed intervals |

Design work can support earlier phases, but the optional game should follow the SEO and contact foundations. Work within the existing hosting/architecture until a demonstrated requirement justifies a change.

## Business facts to confirm during phase 0

- Production domain, ownership and current deployment; access to search measurement and local business profiles.
- Actual service area, equipment/specifications, operator terms, quote factors, transport/fuel/removal terms and contact hours.
- Approved phone/WhatsApp details and real business claims, photos and job examples.
- Whether mopeds are sold, rented or both; what constitutes current availability and which contact details apply.
- Instagram account eligibility/access and the preferred fallback if automatic Stories retrieval is unavailable.
- Review of all three language versions, particularly Kazakh service terminology.

Unknowns block only dependent work. Baseline inspection, content structure and reversible local preparation can continue.

## Workflow boundary

The owner requested enrollment on 2026-10-03 as `drivepro-website`, using the existing shared supervisor and scheduler alongside other separately managed projects. See [managed development](docs/SUPERVISOR.md) for requirement IDs, task sequence, state locations and authority. Keep progress and event history separate from this requirements brief.

Owner authorization covers scoped SSH-signed sole-owner commits with subject and body, ordinary batched pushes and existing push-triggered deployments after the required local, commitlint, signature and exact-revision CI gates. Social publication, outreach, new accounts, purchases, new infrastructure, destructive migrations and force pushes need separate concrete approval. Prepare exact artifacts before asking for publication or outreach decisions; approval and execution remain separate records.
