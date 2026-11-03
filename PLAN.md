# Drive Pro — two one-page websites

Date: 7 October 2026
Status: owner requirements recorded for planning. Development starts later, on a separate instruction.

Parallel-development update: coordinate this website's milestones with DrivePro_2
using [DEVELOPMENT_PLAN.md](DEVELOPMENT_PLAN.md) and the
[shared parallel plan](/Users/macbookairm3_16gb/Developer/DRIVE_PRO_PARALLEL_PLAN.md).
This remains the website's own product/journey brief; the new plans define work
dependencies without importing the app's features or claiming active workers.

This is the current redesign brief. It replaces the earlier proposal for a shared
homepage with two destinations and the unapproved light-studio layout board.
The current published site remains the implementation baseline until a migration
and release are prepared. This document does not change the live site.

## 1. Purpose and scope

Build two separate public websites under the Drive Pro family identity:

1. **Equipment rental:** excavators and other machinery in Almaty; visitors choose
   the equipment, understand the offer and contact us about their work.
2. **Moped sales:** visitors browse Honda, Yamaha and Suzuki models, inspect photos
   and video, then ask about a model or arrange to see more of the selection.

Each website has one main scrolling page, with section anchors rather than a
separate page for every section. Language versions, if selected, are versions of
that same page. Necessary privacy information or existing-URL redirects do not
turn the main experience into a multi-page catalog.

There is no combined “excavator or moped?” entrance. Each site makes its own offer
clear immediately. A quiet link to the other Drive Pro business can be considered
in the footer; it must not distract from the primary journey.

Priorities remain local search visibility, easy contact and a distinctive visual
experience. Reuse working contact/message logic and useful existing text, but
rewrite the presentation and copy around these two separate offers.

**Planning only:** no implementation, new repository/domain/hosting, scheduler
activation, commits, pushes or deployment are requested by this brief. Separate
public websites do not automatically require separate repositories; decide that
implementation detail later.

## 2. Shared Drive Pro identity

Use the supplied Almaty coat-of-arms image as the visual reference:
[owner-supplied reference](docs/design/references/almaty-owner-reference.png).

- Blue is the dominant identity color; yellow is the main supporting color.
- White provides space and readable surfaces. Red and green are small supporting
  accents, not competing full-page colors.
- Use blue as sky/water and yellow as sunlit ground, crops or equipment accents.
  Avoid a simple equal blue-over-yellow horizontal split resembling a flag.
- Aim for the local Kazakhstan/Almaty association requested by the owner through
  color, composition and landscape cues. Do not reproduce a flag layout.
- Share typography, buttons, spacing, icon style and motion principles between the
  equipment and moped websites so they look like members of one Drive Pro family.
- The coat of arms is inspiration, not the new business logo or a claim of municipal
  affiliation. Its large white field and red border are not instructions to copy
  those proportions into the website.
- Exact color values, fonts and compositions are to be settled with actual desktop
  and mobile references. The earlier cream/graphite studio recommendation is not
  the chosen direction.

The owner wants a recognizable family identity and simultaneous development across
Drive Pro projects. Share visual vocabulary and coordinate independent tracks;
keep each product's features, data, business rules, infrastructure and approvals
separate. Use the shared parallel plan for handoff and concurrency rules.

## 3. Equipment rental website

### Offer

The owner reports the following equipment categories:

| Category | Public wording / boundaries |
| --- | --- |
| Small excavators, approximately 1–2 tonnes | Мини-экскаваторы 1–2 т; excavator work only with our operator |
| Loaders | Погрузчики; exact types/specifications to be supplied |
| Excavator-mounted breaker | Экскаватор с гидромолотом; confirm exact attachment wording/specification before final copy |
| Tractors | Тракторы; exact types/specifications and operator terms to be confirmed |
| Other machinery | Mention that other equipment can be discussed; do not invent a fleet list |

These are offered categories, not a live availability calendar. Confirm suitability,
availability and cost directly for each task. Keep individually quoted excavator
pricing and the existing **no excavator rental without our operator** rule. Do not
extend unconfirmed commercial terms to other categories automatically.

### Suggested section order

1. **Offer and immediate contact.** Short heading about equipment rental/earthworks
   in Almaty, the operator rule, and visible WhatsApp/call links. A visual introduction
   starts here; users never have to finish an animation to contact us.
2. **Equipment revealed by scrolling.** A central Drive Pro mark or equipment hub
   leads into a scene where the listed machines appear as the visitor scrolls.
   Every machine has a readable category label and a contact action.
3. **What work is needed?** A tiny optional brief explains what helps us quote:
   the task and approximate amount, desired starting date/deadline, and urgency.
4. **How to discuss the job.** Pick equipment or ask for advice → describe work and
   timing → send a site video if useful → discuss the machine, conditions and quote.
5. **Contact.** WhatsApp, phone and other confirmed business channels. Repeat the
   important contact options here; do not invent accounts, hours or an address.

These are sections of the same page. Detailed placement and proportions are for the
next design discussion, not already approved mockups.

### Scroll animation

Preferred idea: equipment emerges from around a central mark as the visitor
scrolls. Include the mini-excavator, loader, excavator with breaker and tractor.
A rotating excavator is an alternative to compare during motion design, not an
additional effect to stack on top automatically.

- Review a real still and a short scroll/motion prototype before implementation.
- Machines should look coherent and recognizable, with consistent perspective,
  materials, lighting and scale. Do not reuse the rejected flat-image wobble or
  block-like machine models as the final result.
- Decide whether the approved effect uses real-time 3D or pre-rendered animation.
  Name the technique accurately; transforming a picture is not real-time 3D.
- Keep ordinary scrolling. No scroll locking, forced tutorial, timed choice,
  mandatory loader, sound or actions hidden until the animation finishes.
- Clicking/tapping a machine opens WhatsApp with that equipment selected in the
  message. Equivalent labeled links work for keyboard users and without animation.
- On small screens, the reveal can become a readable vertical equipment sequence.
  No tiny radial labels or drag-only controls. The mobile version needs its own review.
- Reduced motion, JavaScript disabled, missing media or unavailable 3D rendering
  shows a usable static equipment list with the same contact links.
- Only load expensive media where it is needed; the text and contact actions must
  remain fast and usable. Set asset/runtime budgets after measuring the prototype.

### Previous work and missing photographs

The owner would like visitors to see previous work, but has no job photographs yet.
For the first version, use the animated equipment/work illustration instead of a
portfolio. Label it as an illustration if it could be mistaken for real footage.
Never present a generated scene, stock image or simulated job as work we completed.
Add genuine work examples later when suitable photos/video and descriptions exist.

### Short enquiry and video flow

A visitor may contact us immediately after selecting a machine. No form is required.
The suggested optional on-page brief has only two primary answers:

- **Работа и примерный объём** — what needs doing, approximate size/amount if known.
- **Когда начать / к какому сроку** — date, deadline or urgency in the customer's words.

An optional compact note can invite narrow-access or other special conditions.
Do not expand this into another long form. Customers can say they are unsure.

All prepared WhatsApp messages are **Russian**, regardless of the website language.
Examples of initial messages:

```text
Здравствуйте! Нужен мини-экскаватор с вашим оператором.
```

```text
Здравствуйте! Нужен экскаватор с гидромолотом и вашим оператором.
```

Use equivalent short, grammatical wording for a loader, tractor or general enquiry.
The selected machine is the essential prefilled detail. A compact prompt beside the
link explains: «Напишите, что нужно сделать, примерный объём и сроки. Если есть видео
участка, отправьте его в WhatsApp».

If the customer fills the brief, append only their actual answers:

```text
Здравствуйте! Нужен мини-экскаватор с вашим оператором.
Работа: траншея, примерно 20 метров.
Сроки: начать 15 октября, закончить за два дня.
```

Do not prefill a list of underscores, unknown-answer boilerplate or empty field
labels that the customer must delete. The two on-page prompts supply the tiny
writing template; the outgoing message stays short. Keep the existing omission of
unanswered fields and preserve a manually edited message.

**Proposed first-version video handling:** the customer attaches the video in
WhatsApp after opening the conversation. A prefilled text link does not attach
files. A website upload/reply system is not part of this plan unless explicitly
requested later. This avoids collecting and storing site videos on the website.
The UI must not claim a message was sent, received, quoted or booked merely because
WhatsApp opened.

## 4. Moped sales website

### Main model groups

Use three clear brand categories. Preserve the owner's model list; verify exact
labels against actual stock/source media before final publication.

| Brand | Main models supplied by the owner |
| --- | --- |
| Honda | AF27; AF34/35; AF56/57; AF62; AF67 |
| Yamaha | SA39J; Jog Poche; Aprio; Vino |
| Suzuki | Let's 2; Let's 4; Let's 5 |

This is the main selection, not an exhaustive catalog or confirmation that every
model is in stock now. Say that there are more options and invite people to contact
us or come and see them. Publish visiting details only after they are confirmed.
Moped **sales** are now confirmed as the offer; do not add moped rental from the
older unresolved brief.

### Suggested section order

1. **Mopeds for sale in Almaty.** Short introduction, strong real moped media,
   and visible WhatsApp/Instagram contact.
2. **Honda / Yamaha / Suzuki.** Three clearly labeled sections or filter controls
   within the same page. Show the main model names with matching verified photos.
3. **Photo and video gallery.** Primarily media from the business Instagram account;
   easy to open, browse and ask about. A story-style viewer may enhance it.
4. **More models available to discuss.** Explain that the selection is broader;
   invite customers to ask or visit without inventing stock quantities or prices.
5. **Contact and visit.** Instagram, WhatsApp, phone and any additional platforms
   the owner confirms. Add a verified address/map only when supplied.

Brand sections and the gallery may be combined into one media-led catalog to avoid
showing the same photos twice. The final arrangement is a mockup decision.

### Gallery and enquiry behavior

- Use real account media; do not manufacture images of supposedly available stock.
- Preserve aspect ratios, provide useful thumbnails and a full-size viewer. Obtain
  better originals before enlarging the current small Instagram previews.
- Desktop, swipe, visible previous/next controls and keyboard navigation all work.
  The viewer has close/Escape, a counter and a source link; restore focus on close.
- Video starts through a clear control and has playback/mute controls. No unexpected
  audio. Photos do not need automatic advancement.
- An item-specific WhatsApp action includes its verified model and/or exact source
  link. Example: «Здравствуйте! Интересует Honda AF27. Есть в наличии?».
- For an unidentified photo, reference the publication rather than guess the model.
- Show price and current stock only when supplied and maintained. Otherwise invite
  an enquiry. No online checkout, account or reservation system is requested.

Source: [@drivepro.moped.almaty](https://www.instagram.com/drivepro.moped.almaty/).
Fresh Instagram Stories remain a desired content source from the earlier brief,
but a live connection has not been established. Saved posts/Highlights can supply
the initial gallery and must be labeled accurately. A story-style website viewer
is not proof of a live Stories feed. Automatic fetching needs its own authorized
connection, expiry handling and successful refresh verification; it must not block
the truthful saved-media gallery.

## 5. Language and copy

Confirmed: **Russian is primary, and every WhatsApp pre-message is Russian.**

The owner mentioned Russian and Kazakh, English additionally, and also raised a
Russian-only option. Final launch languages remain open:

- Russian only;
- Russian + Kazakh;
- Russian + Kazakh + English, with English secondary.

Do not silently pick one or delete the current translations. Plan the text structure
so additional languages can be supported; start the copy discussion in Russian.
If multiple languages are chosen, localize visible labels, metadata and accessible
names while keeping the WhatsApp draft itself Russian. Make that handoff clear.

Reuse useful factual text from the current repository, but rewrite it to be concise,
natural and specific to each website. Equipment copy explains work and quote factors;
moped copy explains sales, the three brands and browsing/contact. Avoid repeated
headings, long introductions, unsupported claims and filler.

Check every chosen typeface with Kazakh-specific letters before selection. A Kazakh
screen requires fluent copy review and visual review, not only a font-file check.

## 6. SEO, migration and data boundaries

- Local SEO for Almaty remains a first-priority goal. Each one-page website needs a
  clear offer, meaningful headings, useful visible text, crawlable links and fast media.
- Equipment names and service descriptions remain HTML content outside any canvas.
  Moped brand/model information is also readable without opening a viewer.
- Decide both public addresses before splitting the current site. Do not buy domains,
  create accounts or provision new hosting as part of planning.
- Map every existing localized URL to its future destination before retiring pages.
  Preserve current links/content until the approved migration works; verify what
  redirects the chosen hosting can actually support. Do not promise a redirect that
  GitHub Pages cannot deliver with the proposed configuration.
- Update canonicals, selected-language alternates, sitemaps, structured data and
  Search Console properties to match the actual new addresses. Preserve the current
  Google verification file while it is needed. New website verification is separate.
- The one-page decision supersedes the earlier multi-page proposal. If later SEO
  evidence suggests additional service pages, bring that tradeoff back for discussion
  rather than silently expanding the approved website structure.
- Treat phone/WhatsApp clicks as contact attempts, not confirmed leads or sales.
- First version routes conversations and videos through contact platforms. Do not
  import profiles, identity checks, referrals or document uploads from the other app's plan.
- If site-side forms, uploads or analytics are later proposed, explicitly document
  what data is collected, why, where it goes, retention and any necessary notice/consent
  before implementation. A generic checkbox is not a substitute for those decisions.

## 7. Decisions and when they block work

The main product direction above comes from the owner. These implementation choices
remain open. Local journey and visual prototypes may proceed with recorded assumptions
and clearly labeled placeholders. Final public copy, integration, migration and release
require the applicable decisions; placeholders must not become business claims:

1. The two website addresses and which offer retains the current public address.
2. Launch languages: RU, RU/KK, or RU/KK/EN.
3. Exact equipment types/specifications, operator terms for non-excavators, service
   coverage and contact details for each website.
4. Final wording/matching media for moped model variants, visiting details and any
   public prices or stock information.
5. The approved central mark, exact palette/type, mobile/desktop layout references
   and scroll-animation sample; real-time 3D versus pre-rendered delivery.
6. Asset ownership/licensing, machinery models and higher-resolution moped originals;
   a concrete fallback for any missing asset before agents attempt to replace it.
7. Whether future fresh Stories automation is activated and how the account is connected.

## 8. Later development sequence

No tasks are activated by writing this plan. When development is explicitly started:

| Phase | Deliverable | Gate before proceeding |
| --- | --- | --- |
| 1. Record essentials | Addresses/migration, language scope, contacts, asset/source inventory | Decisions or explicit prototype assumptions/blockers recorded for these two sites |
| 2. Shared identity | Blue/yellow design tokens, type specimens including Kazakh, common components | Owner reviews concrete visual references |
| 3. Page and motion references | Desktop/mobile compositions for both one-pagers and a short equipment scroll prototype | Actual visual/motion approval; no substitute based only on passing tests |
| 4. Equipment candidate | Animated/static equipment selection, short Russian enquiries, optional brief and contacts | Click/keyboard/reduced-motion tests; no fabricated job history |
| 5. Moped candidate | Three brands, sourced gallery/viewer, model enquiries and contacts | Model/media matching; honest freshness and stock labels |
| 6. Integration and migration | Localized copies if chosen, URL mapping, metadata, contact and performance verification | Addresses, launch languages, public facts/contacts and actual assets resolved; same baseline matrix and migration/release evidence complete |
| 7. Release | Accepted visual result and checked deployment to agreed destinations | Existing signed-commit, batched-push and exact-CI rules; separate live verification |

Use this repository's actual source and history as the baseline. Keep candidate work
isolated, one active writer per project, with independent evaluation. Share only
workflow machinery with other projects. Do not start another scheduler or reuse
PR1's one-time review bypass. New infrastructure and other external actions keep
their separate approval requirements.

## 9. Definition of finished

- Two separate, recognizable Drive Pro one-page websites, each understandable on entry.
- Blue/yellow Almaty-inspired visual identity approved on both desktop and mobile.
- Equipment scroll scene matches the approved prototype and remains usable as a
  static, accessible equipment list when motion or media is unavailable.
- Every listed equipment choice opens the correct short Russian enquiry; optional
  details are included only when supplied. Video instructions lead to WhatsApp.
- No excavator rental without our operator; no invented fixed price, work portfolio,
  model specification or immediate availability.
- Honda, Yamaha and Suzuki groups contain the owner's model list with verified media
  matching, an invitation to ask about more models and useful contact actions.
- Gallery works on phone, keyboard and desktop, with honest saved/live content states.
- Agreed languages, typography, SEO output and old-to-new URL behavior are verified.
- Live contacts, media and navigation are checked after deployment. Opening a message
  is never reported as successful delivery. Search ranking/indexing remains measured,
  not promised.

## Historical material

[PROJECT.md](PROJECT.md) defines the current project goals, business rules and acceptance criteria.
The [previous project brief](docs/history/PROJECT-before-two-websites-2026-10-07.md) preserves the superseded goals.
[DESIGN.md](DESIGN.md) records the current implementation design.
The earlier [layout proposal](docs/design/redesign-2026-10-07/PLAN.md) and its board
are superseded planning history, not instructions for this redesign.
