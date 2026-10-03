# Drive Pro website design baseline

This document records the existing equipment-site identity before the three-language customer journeys. It is based on the current Tailwind/CSS source and the saved public desktop 1440 px and mobile 390 px Chromium captures in the supervisor `evidence/ui-baseline` directory. It guides incremental changes; it is not a new brand concept.

## Existing identity

- Near-black `#0A0A0A` and charcoal `#1A1A1A` surfaces; cream `#F5F0E8` text; red `#C0392B` primary actions and separators; deep red `#8B0000`; gold `#D4A017` highlights and borders.
- Condensed Impact/Arial Narrow display type, heavy uppercase headings, diamond motif, angled industrial overlays, thin red rules, and simple bordered cards. Preserve these for headings and short labels.
- Wide centered content with generous section spacing. The public desktop hero is a full first screen; mobile stacks the hero actions and cards without horizontal overflow. Keep the first-screen excavator and moped choices visible on a 390 px phone.
- Existing equipment photographs come from a remote stock source. They do not establish that the photographed machines belong to Drive Pro. Do not use them as proof of specifications, fleet, jobs or availability.

## Readability and interaction rules

- Use a system sans-serif for paragraphs, form controls and helper text at a readable size with normal tracking and line height around 1.5. Keep the condensed display face for headings and short action labels.
- Keep cream text on dark surfaces. Gold can mark labels and borders. Avoid small low-opacity body text and long uppercase paragraphs.
- The primary red action, secondary outlined action and persistent phone/WhatsApp links must have visible keyboard focus. Inputs need visible labels and hints; unknown answers remain optional.
- The language switcher preserves the current route and uses `ru`, `kk` and `en` as language labels, while the existing Kazakh URL stays `/kz`.
- Motion is optional. Preserve a static readable first frame, avoid autoplay and respect reduced motion. No interaction or asset may hide contact paths or page text.

## Boundaries

- Keep the static Next export under `/drivePro-website` on GitHub Pages; no new frontend dependencies for this task.
- Preserve existing `/ru`, `/kz`, `/services`, `/pricing` and `/contact` paths. Add `/en` and `/mopeds` paths consistently.
- No structural redesign, game, live Instagram feed or inferred inventory. A useful moped text state works when no verified feed is connected.
- Do not publish fixed excavator rates, promotions, years/totals, national coverage, machine specifications, stock or sale/rental claims without business evidence.

## Optional play contract — DPW-PLAY-001 (proposal)

The proposed “Clear the site” illustration belongs below the two equipment/moped choices and their direct contact links. The choices, service text, routes and contact actions remain usable before and without play. Keep the near-black, cream, red and gold palette, industrial geometry, system body text and visible focus treatment above. Original vector artwork depicts three soil piles moved by a small stylized excavator to uncover an illustrative moped and Drive Pro scene; it must be marked as illustration and must not imply a real machine, fleet, stock, suitability, price or offer.

Entry is an explicit Play control. Only the minimal activation handler may load with the page; no scene/state chunk or requested artwork is fetched before activation. The implementation may use lightweight SVG/CSS perspective only, with zero new runtime dependencies and hard incremental limits of 45 KB gzip JavaScript and 120 KB compressed original assets. Those limits require exported-bundle accounting and cold-load network proof, including checks for framework prefetch; dynamic import alone is not proof. There is no autoplay, sound, timer, score, data collection, lead gate or external request. Touch and keyboard controls, reduced-motion and static fallbacks, hidden-page pause, reset and exit are required. The exact states, draft RU/KK/EN copy, ownership, tests and review gates are specified in [docs/design/PLAY_BRIEF.md](docs/design/PLAY_BRIEF.md).

This contract authorizes no structural implementation yet. First create an original section-level image reference, then obtain independent parent/design review of placement, legibility, identity and route priority. The brief and this paragraph are design preparation, not that image, a completed game, a measured performance result or a release.
