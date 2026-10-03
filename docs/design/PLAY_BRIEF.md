# DPW-PLAY-001 — optional “Clear the site” interaction brief

Status: private design and content draft, 2026-10-03. No interaction, artwork, browser measurement or release is claimed here. Drive Pro equipment/moped site only; DrivePro_2 supplies no requirements or assets. Existing integrated FAQ and all source files remain untouched by this task.

## Placement and scene

On each localized home page, place a standalone optional-play section after `Hero`'s two route cards and direct call/WhatsApp links, before `WhyUs`. The entry teaser should be about 80–120 px tall on a 390 px phone and 100–140 px on a 1440 px desktop. It has a short title, one-sentence explanation, explicit Play button and persistent text links to equipment/quote and mopeds plus the existing contact actions. Do not shift the two choices below the first phone screen. Once opened, use one flat, contained scene about 350 × 300 px on phone (allow natural height for controls) and at most 900 × 380 px on desktop. Avoid nested cards, horizontal scroll, overlays and fixed-position controls.

Create an original, stylized SVG/CSS perspective construction patch: near-black charcoal ground, cream labels, red excavator accents, gold guide lines, three clearly numbered soil piles, and a small moped/Drive Pro illustration revealed in stages. The excavator moves each pile to a marked spoil area. This is playful artwork, not a photograph or depiction of Drive Pro's fleet, current moped stock, machine suitability, a customer job or a business offer. Put the illustration disclaimer in visible text beside the scene, including on the no-JavaScript path. No retrieved copyrighted media. Keep condensed industrial display type for a short heading only; use readable system sans-serif for instructions, status and buttons.

## State and data flow

The only game state is `phase` and a three-bit `cleared` set in memory. Each numbered pile can be cleared once, in any order; clearing it reveals a matching part of the scene. There is no score, timer, saved progress, telemetry, random outcome or contact data. A discrete “Move pile 1/2/3” button is the primary action on touch and keyboard. Direct manipulation may be added later only as redundant input; it must trigger the same action and never require precision or dragging to finish.

| State | Visible result and transitions | Focus and announcement |
| --- | --- | --- |
| Idle | Server-rendered teaser, static text/links and illustration disclaimer; insert Play button only when enhancement is ready. Play → loading. | Play is in normal tab order after the two customer choices and contact links. |
| Loading | Keep teaser, disable only Play, show “Loading illustration…”; fetch module and art on demand. Success → active; failure → static fallback with a plain retry Play action. | Keep focus on Play; polite loading/failure status. On success, move focus to first available pile button. |
| Active | Show numbered piles, `Move pile N` buttons, current progress, Pause, Reset and Exit. One move clears one pile; third move → completed. Pause → paused. Exit → idle. | Buttons are at least 44 × 44 CSS px with visible focus. Announce “N of 3 piles moved”; after each move focus next available pile, after third focus Reset. |
| Paused/hidden | Pause stops all animation immediately. `visibilitychange` to hidden cancels animation/RAF and preserves `cleared`; on return the scene remains paused until explicit Resume. Exit and Reset stay available when visible. | Do not move focus on hide/show; Resume returns focus to next pile button. Announce pause/resume politely. |
| Completed | All soil is in the spoil area; entire illustrative moped/Drive Pro scene is visible with its disclaimer. Show Reset and Exit; no prize or contact prompt. Reset → active with zero cleared piles. Exit → idle. | Polite completion message; focus Reset after final move. |
| Reset | Clear all three bits and restore the starting illustration immediately; no reload or new request. | Announce reset and focus first pile button. |
| Exit | Unmount play scene, stop animation and return to idle teaser. A later Play starts with zero cleared piles. | Restore focus to Play; route and contact links remain usable. |

If the page becomes hidden during loading, finish or cancel the request safely but do not animate or enter active play until the page is visible and the visitor chooses Resume; Resume can retry a canceled load. Unmount/route change cancels animation and listeners. Missing art or module yields the static text state; no blank section. The SSR shell owns teaser, service links and contact; a minimal activation handler is the only play JavaScript allowed on initial load. The lazy controller owns state, focus and `aria-live="polite"` status; the lazy scene owns SVG/CSS rendering and receives state plus action callbacks. Neither owns navigation, business copy or contact details.

Reduced-motion mode uses the same buttons and progress, but each move changes a static SVG frame instantly with no transition, parallax or animated machinery. The initial static teaser uses inline CSS/simple markup and requests no play asset. Without JavaScript there is no inert Play button: show the title, explanation, illustration disclaimer and ordinary links to the existing equipment/quote, mopeds and contact destinations in exported HTML. All service text, language navigation, phone and WhatsApp links remain outside the scene and readable in every state. No autoplay, sound, external requests, storage, analytics events, score, lead gate, prize or contact gating.

## Private draft copy for later localization

These strings belong to this brief only. Do not publish them or add them to `messages/*.json` until content review. Kazakh fluency and service terminology review are outstanding. `N` is the pile number; `{count}` is 0–3. Existing locale paths remain `/ru`, `/kz`, `/en`, with Kazakh language code `kk`.

| Use | RU | KK draft — review needed | EN |
| --- | --- | --- | --- |
| Heading | Расчистите площадку | Алаңды тазалаңыз | Clear the site |
| Intro | Передвиньте три кучки грунта и откройте рисунок. | Үш топырақ үйіндісін жылжытып, суретті ашыңыз. | Move three soil piles to reveal an illustration. |
| Play | Играть | Ойнау | Play |
| Loading | Загружаем иллюстрацию… | Иллюстрация жүктелуде… | Loading illustration… |
| Move pile N | Передвинуть кучку {N} | {N}-үйіндіні жылжыту | Move pile {N} |
| Progress | Передвинуто кучек: {count} из 3. | Жылжытылған үйінді: {count}/3. | Piles moved: {count} of 3. |
| Pause | Пауза | Кідірту | Pause |
| Paused | Игра на паузе. | Ойын кідіртілді. | Play paused. |
| Resume | Продолжить | Жалғастыру | Resume |
| Complete | Все три кучки передвинуты. Рисунок открыт. | Үш үйінді де жылжытылды. Сурет ашылды. | All three piles moved. Illustration revealed. |
| Reset | Начать заново | Қайта бастау | Reset |
| Reset status | Кучки на месте. | Үйінділер орнына қайтарылды. | Piles reset. |
| Exit | Выйти из игры | Ойыннан шығу | Exit play |
| Load failure | Не удалось загрузить иллюстрацию. Ссылки ниже работают. | Иллюстрация жүктелмеді. Төмендегі сілтемелер жұмыс істейді. | Illustration could not load. The links below still work. |
| Illustration note | Это рисунок, а не изображение реальной техники или наличия. | Бұл сурет нақты техниканы немесе оның қолда барын көрсетпейді. | Illustration only; it does not show actual equipment or availability. |
| Equipment link | Работы с экскаватором | Экскаватор жұмыстары | Excavator work |
| Moped link | Смотреть мопеды | Мопедтерді қарау | Browse mopeds |
| Contact link | Связаться | Хабарласу | Contact |

The equipment route must keep its own operator-only and individually quoted excavator language. Do not replace that service copy with a game label or infer moped sale/rental terms from this illustration.

## Budget and proof before implementation acceptance

- Zero new runtime dependencies; use SVG/CSS perspective and existing React/Next facilities. No 3D library in this task or its proposed first implementation.
- Hard incremental cap: at most **45 KB gzip** of game JavaScript, including the entry controller, lazy module and every added transitive chunk attributable to play. Hard asset cap: at most **120 KB compressed** total for original play artwork requested after Play. List each emitted file, compressed byte size and sum from the production export. Embedded art and CSS count toward their emitted JS/CSS or HTML bytes; do not hide them outside the budget.
- Build the same production export before and after implementation. Inspect the route's emitted imports, preload/prefetch links, runtime requests and browser network log. Account for the minimal activation handler in the initial JS and the 45 KB cap. On a cold home load, on scroll to the section, on hover/focus, and after idle, no lazy controller/scene chunk or artwork may be requested. Then click Play once and record the exact newly requested game files, transfer sizes and request initiators. A dynamic `import()` statement alone does not satisfy this gate because framework prefetch can still fetch it early.
- Repeat cold-load lab runs at 390 × 844 and 1440 × 900 with fixed Chromium/Lighthouse version, same throttling profile and cache condition, five runs each before and after. Record per-run and median LCP, CLS, TBT, JS transfer and total transfer for the idle route, then separate click-to-interactive and play request data. Require no idle game requests, no unexplained idle LCP increase over 100 ms, CLS increase over 0.01 or TBT increase over 50 ms; investigate and repair regressions before release. These are future acceptance thresholds, not measured results. Field Core Web Vitals and SEO growth remain unmeasured.

## Future ownership and acceptance

Proposed implementation ownership after design review: one worker owns `components/OptionalPlay.tsx` (SSR entry, safe links), `components/ClearSiteController.tsx` (lazy loading, state, focus, status), `components/ClearSiteScene.tsx` (SVG/CSS rendering), original artwork under `public/play/` if needed, and focused state tests such as `scripts/test-play.mjs`. The route integrator alone owns the small insertion in `app/[locale]/page.tsx`, related `app/globals.css` styles and, after language review, `messages/ru.json`, `messages/kz.json` and `messages/en.json`. The coordinator must hand off exact source ownership and sequence any shared-file edits after the locally integrated FAQ and SEO work; compare those existing files byte-for-byte so this docs task never overwrites that work. No implementation file is changed in this task.

Before structural implementation, generate a new, original **section-level image reference** showing both phone and desktop placement, controls, focus and static state. Obtain independent parent/design review of route priority, identity, readable copy, illustrative claims and footprint. This document is neither the image reference nor completed design approval.

Future acceptance checks must exercise all three locales and these paths: keyboard Tab/Shift+Tab, Enter/Space on each button, focus entry/return and no trap; touch on every pile and controls without dragging; pause/resume and hidden-tab pause without animation; complete/reset/exit and replay; reduced-motion instant states; JavaScript disabled and load failure with ordinary route/contact links; preserved `/ru`, `/kz`, `/en`, equipment, pricing, mopeds and contact paths; phone/WhatsApp links and operator/individual-quote service text; and the export/network/lab budget evidence above. Test the static export under the existing `/drivePro-website` base path. Do not call a simulated interaction a production or connected result.

Open review and release gates: fluent Kazakh review and business/content signoff; independent image/design review; current PR/review requirement to be satisfied by the coordinator; the prior official GitHub Pages warning to be checked and resolved or explicitly dispositioned; applicable warning-free local checks and actual commitlint; exact pushed-SHA CI; and separate production route/contact/network verification. The coordinator must establish the precise current PR requirement and Pages warning evidence before release. No social publication is part of this interaction. Local integration/release of SEO and FAQ is separate, and this draft claims neither completed SEO growth nor FAQ release. Only the existing shared scheduler may coordinate future work; this document creates no new service or supervisor state.
