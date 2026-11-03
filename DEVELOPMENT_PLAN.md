# Drive Pro website — redesign development plan

Updated 2026-10-07. Current deliverable: planning and context, with parallel
development alongside DrivePro_2 specified by the owner. No runtime changes or
release are performed by this document.

[PROJECT.md](PROJECT.md) defines the website's product contract. [PLAN.md](PLAN.md)
contains the two one-page compositions, equipment interaction and Russian enquiry
examples. This document adds implementation dependencies, bounded tasks and checks.
The [parallel plan](/Users/macbookairm3_16gb/Developer/DRIVE_PRO_PARALLEL_PLAN.md)
coordinates the website and ridesharing app without combining their business rules.

## Scope and source context

Develop two separate one-page experiences: equipment rental/earthworks and moped
sales in Almaty. Keep the useful Next.js static-export architecture, working contact
logic, factual content and necessary old routes until migration is verified.
Two public websites remain one managed project, `drivepro-website`, unless the
owner later changes repository/hosting organization.

The attached Orca PROJECT.md is an older brief: combined entrance, a longer job
brief and compulsory three-language content. The newer Developer PROJECT.md and
PLAN.md supersede those conflicts: separate one-pagers, two optional job answers,
Russian WhatsApp drafts and launch languages still open. Do not restore the older
direction when changing workspaces.

Source inspection found Developer main at `bdc95a7` with extensive existing local
changes, and the Orca hippocamp worktree at `ee396f6` with the older brief. These
are different checkpoints, not evidence of a new redesign deployment. Preserve
both; freeze the chosen candidate and record its full revision plus relevant local
file hashes before development. Do not reset, copy all files across checkouts or
publish the Developer working tree as though it were a clean release candidate.

## Work order

| Phase | Deliverable | Dependency / completion gate |
| --- | --- | --- |
| W0 | Own-source baseline, business/media/URL decision register | Current PROJECT.md and PLAN.md; no unresolved facts presented as verified |
| W1 | Connected equipment and moped page journeys, concise copy | W0 working assumptions; unknowns remain visible in review |
| W2 | Family identity references and real motion prototype | W1; concrete desktop/mobile and motion review |
| W3 | Equipment one-pager and short enquiry interaction | W2 selected direction; truthful machine/contact data |
| W4 | Moped one-pager and sourced gallery | W2 selected direction; verified model/media mapping |
| W5 | Language, migration, metadata and performance integration | W3/W4; destinations and language scope resolved |
| W6 | Independent review, required checks and controlled release | W5; exact candidate, visual acceptance and live-verification plan |
| W7 | Search/enquiry evidence and refinements | Released website and authorized measurement access |

W0/W1 start alongside app R0/R1. The website does not wait for app registration,
identity checks or shared rides. W3 and W4 are separate milestones of the same
website project: sequence writes unless isolated same-project integration is proven.
Use placeholders only in review fixtures, never as supposedly real stock or work.

## W0 — own-source baseline and decisions

Inventory current routes, locale files, contact destinations, quote formatting,
saved Instagram assets, media provenance, SEO output and deployment configuration.
Capture phone/desktop and motion/no-JavaScript baselines before changing the UI.
Identify which existing changes belong to accepted history, pending work or this
redesign; do not mistake a dirty-tree diff for the redesign's file ownership.

Record decisions for both public addresses, the current-address successor, launch
languages, selected contact numbers, equipment specifications and operator terms
for non-excavators, service coverage, model/media matches and visiting information.
Keep unknown prices/stock out of public copy. Inventory media ownership, originals
and missing assets. Determine the host's real old-URL handling before promising
redirects or changing canonicals. Preserve the needed search-verification file.

Inventory existing site data handling, third-party media requests, local drafts,
logs and any proposed measurement. The initial brief is contact-led: no registration,
ID uploads or website video intake. Before activating any added form submission,
upload, analytics or automated account integration, resolve its purpose, recipients,
storage/retention, necessary notice/consent and authorized access. Leave dependent
processing disabled while those decisions are open. Do not copy app consent wording.

Exit: baseline and decision/source register, owned files and named blockers. Unknown
addresses or languages block final migration/copy, not local layout prototypes.

## W1 — the two complete visitor journeys

Equipment: understand operator-only individually quoted excavator work → explore
the machinery → select one or ask for advice → optionally supply work/volume and
timing → edit the short Russian message → open WhatsApp or call. Contact remains
available throughout; the brief never becomes a required enquiry form. Video is
attached by the customer in WhatsApp, not by the prepared text link.

Mopeds: understand sales in Almaty → browse Honda/Yamaha/Suzuki and the supplied
model groups → inspect real photos/video → enquire about a verified model or exact
source publication → contact or visit when visiting details are confirmed. Show
that more models can be discussed without inventing current availability.

Map desktop/mobile sections, anchors, contact placement, editable-message state,
gallery opening/closing and empty/error states. Copy stays concise but equipment,
brand/model information and contact links remain available in ordinary HTML.
Write in Russian first; retain existing translations until launch scope is settled.

Exit: connected prototypes for both offers, supplied categories/models covered,
no compulsory combined entrance, checkout, login or long form.

## W2 — references, identity and motion

Use image-to-code when frontend design begins: generate and analyse the references,
then build against the reviewed direction. Coordinate blue/yellow family vocabulary
with app R2: spacing, typography candidates, icons and motion principles. Review
each product's compositions separately. App surfaces/navigation do not become a
website template; the website's light/dark scope must be recorded rather than
silently inherited from the app's system scheme requirement.

Blue leads, yellow supports, white gives room, red/green carry small accents. Use
the supplied Almaty reference without copying a flag or municipal emblem as the
business mark. Check Kazakh glyphs and real labels before selecting type.

Prototype machines emerging around a central mark on ordinary scroll; compare the
rotating excavator alternative if useful. Decide real-time 3D versus pre-rendered
delivery from an actual sample. Record asset/runtime budgets after measurement.
Contact and text never wait for animation. No scroll trapping, forced loader,
unexpected sound or drag-only selection. Mobile gets its own readable composition.
Reduced motion, no JavaScript and asset/render failures retain a static equipment list.

Exit: reviewed mobile/desktop references for both sites, named components/tokens,
approved motion sample and accessible fallback. A passing build is not visual approval.

## W3 — equipment candidate

Implement the selected scrolling composition with crawlable machine labels and
direct phone/WhatsApp links. Cover mini-excavators 1–2 t, loaders, an excavator with
hydraulic breaker and tractors using confirmed details. Generated equipment scenes
are illustrations, never evidence of owned fleet or completed work.

Keep the two optional brief answers and small access note. Include only actual
answers and the selected machine in the Russian draft. Preserve explicitly entered
zero/“not sure”, edited text, back navigation and copied summary. Empty details
produce a short enquiry without empty labels or underscores. Test equipment-specific
wording and encoding; opening a draft never claims sending, receiving or booking.

Exit: first-frame contact access, correct item/blank/partial/full drafts, static and
motion journeys on phone/desktop/keyboard, no unsupported price or portfolio claims.

## W4 — moped candidate

Build Honda, Yamaha and Suzuki sections or filters from the exact PROJECT.md model
list. Use source-confirmed images and retain source/provenance records. Unidentified
media uses a source-link enquiry rather than an invented model label. Obtain better
originals before enlarging small previews; mockup placeholders do not become stock.

Gallery supports thumbnails, full-size view, swipe and visible previous/next, keyboard,
Escape/close and focus return. Preserve aspect ratios and video controls; no surprise
audio. Missing/failed media retains a useful contact route and readable model text.

Saved posts/Highlights may supply the initial gallery, accurately labeled. Live
Stories is an independent integration task: approved account connection, supported
API, permissions, credential handling, permitted media storage, expiry and refresh
must be verified before claiming a live feed. Its blocker does not block the saved
gallery. No browser/repository credentials or unrequested new hosting.

Exit: truthful model/media matching, model/source enquiries and gallery states;
saved/live content distinguished. No invented stock, price, checkout or rental.

## W5 — integration, languages and migration

Resolve launch languages before final copy. For each selected language, verify text,
metadata, accessible names and font rendering; WhatsApp draft text remains Russian.
Do not remove current translations or old routes merely because the new layouts
are one-pagers. Prepare the complete old-to-new URL map and actual hosting behavior.

Align final addresses, base paths, links, canonicals, language alternatives, sitemap,
robots, social previews and truthful structured data. Preserve applicable verification
assets; external search-console/account changes require their own authorized access.
Use responsive media and measure the two complete journeys against recorded loading
and asset budgets. Distinguish lab measurements from field results.

Exit: both pages integrate without contact or content regression; selected-language
static output and every retained/migrated route match the recorded destination plan.

## W6 — acceptance and release

| Area | Required evidence |
| --- | --- |
| Equipment | Operator/quote rules, item selection, empty/partial/edited drafts, phone/WhatsApp links |
| Mopeds | Exact model groups, genuine media/source enquiries, viewer/video and stale/missing states |
| Visual/motion | Concrete-reference comparison, phone/desktop, ordinary scroll, reduced motion/static fallback |
| Accessibility | Keyboard/focus return, names/labels, contrast, readable type, touch controls |
| Language/SEO | Selected locales, Russian message handoff, actual exported HTML/metadata and URL map |
| Data | No added collection before its prerequisite gate; no secrets or fixture stock in export |
| Production | Exact deployment/revision, live links/media/routes; contact attempt separated from delivery |

Have an independent evaluator inspect the frozen candidate; corrections are a new
candidate. Run the actual repository checks: locked install, audit, lint, typecheck,
tests, build and export check, plus actual commitlint/signature checks for any future
authorized release. Reinspect package scripts and CI rather than relying on this
list as proof they ran. Current scripts are npm run audit/lint/typecheck, npm test,
npm run build and npm run check:export. Use the repository's Node version via fnm.

Release separately from DrivePro_2. Record all outgoing commits and pre-existing
changes; batch ordinary pushes only after scoped validation and required authority.
Verify exact-SHA CI and live pages separately. Neither another product's release
exception nor a previous one-time website bypass covers this new candidate. Prepare
rollback and migration evidence; unresolved destinations block production migration.

Exit: both agreed public destinations and full visitor journeys verified at the
claimed evidence level. No new infrastructure, purchases, social posts or outreach
are authorized by preparing this plan.

## W7 — measured search and customer feedback

Capture technical readiness separately from indexing, rankings and received
enquiries. With authorized access and sufficient data, record search/query and
qualified-enquiry baselines, then assess changes around 30/60/90 days. These are
review milestones, not newly created scheduled automations. Report contact clicks
as attempts. Add real completed-job media only when supplied; discuss extra SEO
pages before expanding the approved one-page structure.

## Immediate planning handoff

Prepare W0's decision/source register and W1's connected journeys alongside app
R0/R1. Shared visual exploration follows without waiting for either full product.
Record blocked dependencies and continue each project's ready tasks. This document
does not claim workers are running or a scheduler/Orca dispatch succeeded.
