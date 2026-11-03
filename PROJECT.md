# Drive Pro — equipment rental and moped sales

Updated: 7 October 2026.
Status: requirements recorded; redesign development starts on a later owner instruction.

Coordination update: the owner requests parallel development with DrivePro_2.
[DEVELOPMENT_PLAN.md](DEVELOPMENT_PLAN.md) adds bounded milestones and acceptance;
the [parallel plan](/Users/macbookairm3_16gb/Developer/DRIVE_PRO_PARALLEL_PLAN.md)
defines concurrent tracks. This update saves planning/context; it does not claim
implementation or worker activation.

## Purpose and scope

Create two separate one-page websites under the Drive Pro family identity in Almaty:

1. **Equipment rental and earthworks:** help customers choose machinery and discuss their job with us.
2. **Moped sales:** help customers browse models, view real photos/video and contact us about buying.

Each site has its own clear offer and one main scrolling page. There is no shared entrance requiring visitors to choose between excavators and mopeds. Language versions, if chosen, remain versions of those one-pagers.

This document defines the goals, business rules and acceptance criteria. [PLAN.md](PLAN.md) contains the proposed sections, interactions, message examples and later development sequence. Read both before implementation. Unresolved choices stay unresolved until recorded.

## Priorities

1. **Local SEO:** attract relevant Almaty searches for equipment rental, earthworks and moped sales.
2. **Easy enquiries:** visitors immediately understand the offer, see the equipment or mopeds and can call or open WhatsApp without completing a form.
3. **Recognizable design:** shared Drive Pro styling, a convincing equipment scroll animation and a generous moped gallery, with little unnecessary text.

Search visibility and useful enquiries take precedence over decoration. First place in search is an ambition, not a guaranteed result.

## Product and repository boundaries

Use the existing website and this repository's history as the implementation baseline. Reuse working contact logic, useful factual copy and suitable code while redesigning the presentation. Preserve public routes until a checked migration is ready.

Two public websites do not automatically require two repositories. Addresses, hosting and repository organization remain open. Planning does not authorize new infrastructure or live deployment changes.

DrivePro_2 is a different product. A common Drive Pro visual identity and parallel development are requested, but its ridesharing features, profiles, verification, referrals, data, business facts, infrastructure and approvals do not transfer here. Each project retains its own development and release evidence.

## Equipment rental website

### Offer and business rules

- Small excavators, approximately **1–2 tonnes**.
- Loaders.
- Excavator-mounted breaker; proposed public wording: **экскаватор с гидромолотом**.
- Tractors.
- Other machinery available to discuss, without inventing a fleet list.

**Excavator work is available only with our operator. No self-drive excavator rental.** Quotes depend on the task and conditions; do not advertise a fixed excavator price or automatically calculated final quote. Confirm machine specifications, availability and suitability directly. Operator and commercial terms for other categories need confirmation.

### Customer journey and animation

Understand the Almaty offer → explore machines revealed on scroll → select a machine or ask for advice → open a short Russian WhatsApp enquiry or call → discuss the job, timing and individual quote.

The preferred animation reveals the equipment from around a central mark as the visitor scrolls. Machines must be recognizable and selectable. A rotating excavator is an alternative to compare during motion review. Approve an actual motion sample before implementing the final effect; decide real-time 3D versus pre-rendered delivery honestly.

Contacts remain available before and during animation. Provide normal scrolling, readable labels, keyboard access and an equivalent static equipment list for reduced motion or rendering failure.

### Minimal job brief and video

Contact never requires a form. The proposed optional brief contains two primary answers:

- Work and approximate volume or dimensions, if known.
- Desired start date, deadline or urgency.

A small prompt can invite access restrictions or other special conditions. Do not restore the previous long questionnaire.

All WhatsApp drafts are Russian. Include the selected machine and only details the customer supplied; omit blank fields, underscores and automatic “unknown” answers. Preserve explicitly entered answers and manual message edits. With no details, use a short greeting about the selected machine or excavator work generally. Examples are in PLAN.md.

Proposed first-version video handling: invite customers to attach site video inside WhatsApp. Opening a prepared message does not send it, attach a video, confirm receipt or book a job. Website upload/storage is outside the current scope.

### Previous work

The owner wants work examples but currently has no job photographs. Use equipment/work animation as illustration for now. Do not portray generated, stock or simulated scenes as completed customer jobs. Add a real portfolio when authentic material is supplied.

## Moped sales website

Mopeds are offered for **sale**. The main groups are:

| Brand | Models |
| --- | --- |
| Honda | AF27; AF34/35; AF56/57; AF62; AF67 |
| Yamaha | SA39J; Jog Poche; Aprio; Vino |
| Suzuki | Let's 2; Let's 4; Let's 5 |

These are model families, not guaranteed current stock. Explain that the selection is broader and invite customers to ask or come and see more. Confirm visiting details before publishing an address or opening hours.

### Customer journey and gallery

Understand that mopeds are for sale → browse Honda, Yamaha or Suzuki → open photos/video → ask about a selected model through WhatsApp, Instagram or another confirmed channel.

Use real media primarily from [@drivepro.moped.almaty](https://www.instagram.com/drivepro.moped.almaty/). Match model names to the actual media; reference the source publication when a model is unidentified. Item enquiries include the verified model or source link, in Russian.

Provide substantial imagery, useful thumbnails and a full-size story-style viewer with touch, visible navigation, keyboard controls and a clear close action. Video playback needs controls and no unexpected audio.

Fresh Instagram Stories remain a desired source. A story-style viewer does not establish a live feed. Saved posts/Highlights are a truthful initial source. Automatic updates need authorized account access and verified refresh, expiry and failure handling. Label saved/live content accurately.

Publish prices and availability only when supplied and maintained. No moped rental, customer registration, online checkout or booking system is currently requested.

## Shared visual identity and copy

Use the [owner's Almaty reference](docs/design/references/almaty-owner-reference.png): dominant blue, supporting yellow, white space and small red/green accents. Blue can evoke sky/water; yellow can evoke sunlit ground, crops or machinery. Avoid equal horizontal blue/yellow flag bands. The coat of arms is inspiration, not a business logo or a claim of municipal affiliation.

Share typography, buttons, spacing, icons and motion principles between the sites. Exact colors, fonts, layouts and animation assets require concrete desktop/mobile references. The earlier cream/graphite proposal is superseded.

Keep headings and explanations short. Refurbish useful existing text instead of carrying over crowded layouts. If Kazakh is selected, review natural wording and the appearance of its specific letters in the chosen font.

## Languages

Russian is primary. **Every WhatsApp pre-message is Russian**, including when opened from another language version.

Launch languages remain open: Russian only, Russian/Kazakh, or Russian/Kazakh/English. Do not silently choose or delete existing translations. Localize visible content, metadata and accessible labels for selected languages, and explain the Russian WhatsApp handoff where needed.

## SEO, migration and measurement

- Cover genuine Almaty equipment/earthworks and moped buying intents with useful content on the respective one-pagers. Keyword demand and rankings require evidence.
- Keep machine names, service descriptions, model groups and contact links in crawlable HTML, independent of animation and Instagram.
- Use correct titles, descriptions, canonicals, selected-language alternatives, sitemaps and truthful business data for the final addresses.
- Map old URLs to their new destinations before removing routes. Verify the host's actual redirect support, preserve necessary Google verification and handle new Search Console properties separately.
- Additional service/catalog pages are outside this structure. Discuss any future SEO-driven expansion before adding them.
- Measure technical readiness, indexing, impressions, clicks and enquiries separately. A contact-link click is not proof of an enquiry, sale or completed job.
- Establish a search baseline and review trends after release, including approximately 30/60/90-day reviews when data is available. Record location, device and date for ranking samples.

Do not invent reviews, completed jobs, stock, precise specifications, service coverage or ranking positions. Confirm facts before publishing them.

## Data and contact boundaries

The initial journey hands conversations and videos to contact platforms. If site-side collection, uploads or analytics are proposed later, first document purpose, data, destination, retention and applicable notice/consent. No account or identity-document collection is needed for the current journey.

Use verified phone numbers and account links. Additional platforms, business addresses and opening hours require confirmation.

## Decisions still open

1. Two public addresses, hosting/repository arrangement and existing-URL migration.
2. Launch languages.
3. Exact equipment details, non-excavator operator terms, service coverage and contacts.
4. Model/media matching, higher-resolution originals, visiting details and any public stock/prices.
5. Central mark, palette, typography, desktop/mobile compositions and approved motion sample.
6. Asset sources/licensing and live Stories connection, if pursued.

## Acceptance criteria

- Two separate one-page websites clearly communicate their offers immediately.
- Equipment categories and all supplied moped model groups are represented accurately.
- Equipment animation matches the reviewed sample, with accessible static alternatives and immediate contact access.
- Excavator operator-only and individual-quote rules are visible and reflected in enquiries.
- Russian WhatsApp drafts use the selected item and supplied answers only; empty briefs remain short.
- Authentic moped media is easy to browse, accurately named and honestly labeled for freshness.
- Both sites share the approved blue/yellow identity and work on mobile, desktop and keyboard, including reduced-motion and missing-media states.
- Selected languages, typography, SEO output, contacts and old-to-new URL behavior pass checks.
- Live deployment and search outcomes are verified separately from local builds and CI.

## Delivery and workflow

Development remains inactive until the owner starts it. Follow [PLAN.md](PLAN.md): resolve essentials → identity references → page/motion approval → equipment and moped candidates → integration/migration checks → controlled release.

### Required frontend redesign workflow

For the redesign, use the corresponding skills from `~/Developer/frontend-agent-tooling` and follow its [README](../frontend-agent-tooling/README.md) and [existing-UI redesign workflow](../frontend-agent-tooling/workflows/redesign-existing-ui.md). Read the relevant `SKILL.md` files from that shared folder before applying them:

- [redesign-existing-projects](../frontend-agent-tooling/taste-skill/skills/redesign-skill/SKILL.md) for diagnosis and subsequent in-place improvements.
- [image-to-code](../frontend-agent-tooling/taste-skill/skills/image-to-code-skill/SKILL.md) for visual references and structural layout changes.
- [web-design-guidelines](../frontend-agent-tooling/vercel-agent-skills/skills/web-design-guidelines/SKILL.md) for UX and accessibility review.

Follow the workflow's audit, browser baseline, ranked brief, visual review, implementation and verification sequence. Record this project's agreed identity in DESIGN.md; generic skill defaults must not override PROJECT.md, PLAN.md or owner decisions. Merely having the shared folder or an installed skill is not evidence that its instructions were read. This requirement applies when redesign begins; it does not activate development now.

### Managed delivery

The project is enrolled as `drivepro-website` in the existing shared supervisor. Keep requirements, candidates, progress, history and approvals separate. Reuse workflow machinery only; do not start another scheduler. See [docs/SUPERVISOR.md](docs/SUPERVISOR.md).

Future managed releases require scoped sole-owner SSH-signed commits with subject and body, actual repository commitlint, applicable local checks, batched ordinary pushes, exact-SHA CI and separate production verification. Workers cannot publish. New infrastructure, accounts, purchases, outreach and social publication require concrete drafts and separate decisions. This documentation update does not activate implementation or release.

## History

The [previous project brief](docs/history/PROJECT-before-two-websites-2026-10-07.md) is a historical snapshot. Its shared entrance, compulsory three-language launch and earlier form/page requirements are superseded by this document and PLAN.md. Prior release/search evidence remains in this project's supervisor history; it is not proof of the future redesign.
