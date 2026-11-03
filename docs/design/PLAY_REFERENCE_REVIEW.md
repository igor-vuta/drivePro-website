# Clear the site — implementation reference

Private design handoff, 2026-10-03. The three images in `references/` are design references, not browser screenshots or shipped artwork. The application has not yet implemented this scene. [PLAY_BRIEF.md](PLAY_BRIEF.md) defines its behaviour; the following corrections resolve conflicts between the brief's size estimates and the generated references.

## Reference files

| File | SHA-256 | Use |
| --- | --- | --- |
| `desktop-active-v1.png` | `3fa8ce8ec4c48c8632ce664cf62752149931980ee7a89582c0971e7032ffcb55` | Expanded scene, horizontal action layout, focus outline |
| `mobile-active-v1.png` | `eee527e01be8a6043aa77e5d317443dab42753719fa0ce194a3e253012818682` | Compact scene with stacked pile controls |
| `mobile-idle-v1.png` | `a117d1576cc1a722ab07e9d95130286f471e9eaa80c226e66f05bf6a67c3ccff` | Text-only entry and ordinary business links |

These images belong only in design documentation. Do not import them into `public/`, page code, CSS or the production bundle. Recreate the scene as a small original SVG using simple shapes, not a full-image backdrop. Runtime measurements must include the emitted SVG/CSS/JavaScript bytes.

## Geometry and visual treatment

The active desktop reference has a centered condensed title, short gold rule, explanation, a low perspective construction patch, progress, three equal pile actions, a quieter control row, a disclaimer and ordinary business links. Its dominant cream text and black surface continue the site's identity. The yellow excavator, ochre piles and dashed gold spoil zone make the game readable without textures or photorealism.

The phone reference puts the excavator behind three numbered foreground piles. It stacks actions in a single column and groups Pause, Reset and Exit below them. Use the same SVG coordinate system across widths; keep pile numbers readable and the scene decorative to assistive technology. Text and native buttons carry all instructions, progress and actions. The spoiler area needs no untranslated text baked into the art. Show moved soil in the spoil area and reveal the small moped illustration progressively, ending with all three piles removed. No actual stock or fleet is represented.

Use near-black `#0A0A0A`, charcoal `#1A1A1A`, cream `#F5F0E8`, red `#C0392B` and gold `#D4A017`. Flat fills and small tonal polygon differences provide depth. Limit decorative stones, track details and ground lines; there is no reason to reproduce every polygon or faux lighting effect. No texture files, shadows, external fonts or 3D dependencies. Keep corners square or at most 2 px, consistent with the existing site.

At 390 px use 20 px side gutters and a 350 px scene. At desktop keep the scene within 900 px, inside the current page container. The active scene can use roughly 230–300 px on phone and at most 380 px on desktop; controls and descriptions have natural height. The heading is 30 px on phone and at most 40 px on desktop, rather than the reference image's oversized heading. Use the condensed display face only there. Body, progress, links and every button use the normal system sans-serif at 16 px or larger with normal tracking and approximately 1.5 line-height.

## Required corrections before implementation

1. Every control and link hit area is at least 44 × 44 CSS px. The phone images are direction, not literal measurements: scaling them to 390 px makes some buttons too short and the disclaimer too small. Enforce the sizes in CSS, allow translated labels to wrap and verify their actual browser boxes.
2. Use charcoal outlined pile buttons and restrained controls. The desktop reference's large red, condensed pile buttons must not compete with the site's equipment quote action. A modest red Play button is sufficient. Preserve a 3 px cream focus outline with an offset and no clipping.
3. Replace the brief's 80–120 px phone teaser estimate with natural content height. A title, readable explanation, 44 px Play button, disclaimer and safe links cannot fit that estimate. Use compact 24 px vertical padding and 12–16 px gaps; do not copy the idle image's large outer whitespace, hide text, truncate translations or set a fixed height. Desktop may arrange title/intro and Play horizontally, with the disclaimer and links beneath.
4. Insert this section strictly after `Hero`, before `WhyUs`. Do not change Hero, its first-screen choices or direct phone/WhatsApp links. Keep existing navigation, business copy and contact paths independent of every game state. Verify both choices still appear in the initial 390 × 844 screen.
5. The idle section has no SVG, controller preload, scene request or animation. Its static title, intro, disclaimer and ordinary route links are present in exported HTML. Insert Play only after enhancement is ready. The no-JavaScript state uses the same shell without an inert button. A loading failure keeps the shell and a working retry action.
6. Follow the brief's exact content table instead of incidental wording in the images. Use the existing local service/quote, moped and contact routes. No timer, score, persistence, sound, analytics, prize, contact prompt or business claims are added by play.

## Content review boundary

The editorial scope review permits the brief's neutral illustrative instructions as local draft content. English and Russian instructions describe the intended actions without promises or unconfirmed business claims. The Kazakh text remains a draft: rendering and interpolation may be tested locally, but this review does not certify fluency or terminology. Fluent Kazakh review remains required before publication. The copy must be isolated under a new `play` namespace; preserve every existing message key, including the locally integrated services FAQ. Record any wording repair separately rather than changing unrelated business text.

## Acceptance remains separate

The image review does not prove a working game, accessibility, performance or delivery. Keep the brief's state machine, focus changes, hidden-tab pause, reduced-motion path, load failure, cleanup and budget gates. Use actual production-export browser tests and before/after lab runs for those claims. Baseline export and source evidence for the immediately preceding FAQ build are retained in the supervisor's `evidence/seo-001` directory; documentation-only changes since then do not change its application runtime.

Release is still subject to independent implementation and browser evaluation, warning-free repository checks, fluent Kazakh review, required PR review, the existing official Pages warning disposition, exact-revision CI and production verification. No publication or deployment is authorized by a design reference alone.
