# Compact customer routes — DPW-ROUTES-005

Owner feedback on 2026-10-06 requests fewer excavator fields and larger actual moped photos. The baseline and reviewed references are recorded in supervisor evidence/routes-005. The welcome and existing full route header remain unchanged.

## Excavator brief

A flat near-black layout bounds the form to 720 px of usable content. Noto Sans headings use 28–40 px and weight 700; labels and controls use 600. Three optional answers are immediately visible, in order: job, location, approximate volume/dimensions. A two-row textarea and two text inputs accept ordinary words; no technical calculation or required validation.

Native details holds date, access, ground/site conditions and spoil removal. A separate native details holds the editable message, copy and refresh controls. Both begin collapsed and retain fields in the DOM. Opening and closing disclosures preserves answers and manual text. Automatic drafts include only nonblank supplied answers in the existing seven-field order, trimming surrounding whitespace. Blank/missing/whitespace-only fields are omitted; explicit words such as “не знаю” and “0” are retained. An entirely blank brief produces only a short localized excavator enquiry with our operator. Unknown-answer text remains an input placeholder, not an automatic message line. Manual edits persist across answer changes until the visitor explicitly refreshes from answers. Copy status is invalidated on edits, including an outstanding clipboard request.

WhatsApp and phone actions remain outside disclosures and accept an empty or partial brief. The compact introduction states only our operator and an individual quote. WhatsApp prepares a draft; the visitor must send it. Supporting quote factors and tractor/loader context remain crawlable in a third native disclosure below the form. Visible labels, accessible hints, ordinary keyboard-operable disclosures, 44 px targets, focus states and a skip link preserve access without JavaScript. No new runtime dependency.

## Moped photos and viewer

Nine real public Instagram Reel preview photos, selected and supplied after visual inspection, form the main grid: three columns on desktop and two on mobile. The full portrait extent is contained, with intrinsic dimensions and no crop. All nine photos have concise localized descriptions of observable colors/shapes/settings; no model is inferred. General WhatsApp is adjacent to the profile link above the grid, so enquiries stay easy before browsing. These are saved publication photos, not fresh Stories or proof of current inventory. No model names, sale/rental terms or prices are inferred from the images.

Each card is an ordinary original-post link in the static export. With JavaScript, an unmodified primary click opens a native modal dialog. Modifier clicks preserve ordinary browser navigation. Close/Escape restores focus to the opening card, native modality contains keyboard focus, and previous/next, arrow keys, Home/End and horizontal swipe move through the nine photos. The counter announces the current item; no autoplay. The full-height viewer includes the exact original Instagram link and a WhatsApp draft containing that same source URL. Failed images retain a source-link fallback. No upload, account connection or third-party runtime is added.

Validated fresh Stories, if a real snapshot is provided, remain above this photo grid with the existing controls, expiry timers and failure contract. The initial public snapshot remains empty, and its empty line is quiet. The smaller saved Highlight rail follows photos. The photo viewer is independent of the existing live-media renderer; no fixture is shipped and a connected feed is unverified.

## Source ledger

The coordinator supplied data/moped-photos.json and public/instagram/posts/*.webp. Each record binds the original @drivepro.moped.almaty Reel permalink to its local preview photo and dimensions. All nine source links are rendered without JavaScript; these public preview images do not establish account authorization, inventory, model names or the availability of Story media. Source URLs and file hashes are also bound by the worker source manifest. Original inspection evidence remains with the coordinator; no public Instagram login or feed connection is claimed.

## Validation

Static export checks enforce exactly three fields outside collapsed disclosures, all seven labeled fields, separate message/factor disclosures, contact actions outside details, and all nine real photo files/source links. Existing quote tests cover partial answers and Unicode/URL encoding. Browser checks exercise collapsed states, manual edits, refresh, native dialog navigation/focus, source-specific enquiries, no-JavaScript links and mobile overflow. Independent review binds the final source/export before integration. Six existing high dependency findings remain a separate release blocker.
