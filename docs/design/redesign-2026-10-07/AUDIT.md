# Planning baseline — 7 October 2026

Observed live release ee396f6. This is a focused planning review, not a complete
accessibility or performance audit and not evidence from customer research.

## Visual findings

- `components/Navbar.tsx:43` and `components/Navbar.tsx:51`: welcome and inner-page
  navigation have different branding, density, language controls and borders.
- `components/Welcome.module.css:17`: two equal, isolated illustrations dominate
  desktop; no shared visual setting. This does not meet the newly requested redesign.
- `components/Welcome.module.css:46`: the motion is a CSS transform of still images;
  do not relabel it interactive 3D. New motion requires an actual reviewed prototype.
- `components/QuoteBrief.tsx:71` and `components/QuoteBrief.tsx:104`: the three fields
  and two disclosures precede contact actions. New layout should offer contact first.
- `components/InstagramGallery.tsx:22`: an empty-feed notice precedes saved photos.
  New layout should give real media priority without falsely implying live Stories.
- `components/InstagramGallery.tsx:30`: archive label repeated on every Highlight.
  Move shared context to the group heading; retain exact model names/source links.

## Bounded interface-guideline review

Source: https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
Retrieved 7 October 2026. Project language, truthfulness and user instructions override
unsuitable generic advice. This file records findings, not fixes.

- `components/MopedPhotos.module.css:12`: dialog lacks overscroll containment;
  include scroll-boundary behavior in the new viewer's touch tests.
- `components/WelcomeArrival.tsx:40`: reduced-motion, hidden-page and interaction
  cancellation exist; preserve equivalent behavior through redesign.
- `components/QuoteBrief.tsx:47`: fields have names, label associations and optional
  states; preserve them. `components/QuoteBrief.tsx:100` announces copy status.
- Contrast, browser/device matrices and runtime metrics were not measured in this
  planning pass. Do not mark those gates passed on the basis of source inspection.

## Captures

- `baseline/home-desktop.jpg`: default in-app desktop viewport.
- `baseline/home-mobile.jpg`: 390×844, static settled home.
- `baseline/mopeds-desktop.jpg`: loaded saved-media gallery, default desktop viewport.
- `baseline/quote-desktop.jpg`: current three-field enquiry page, default desktop viewport.

These samples support composition decisions. Full route/locale/viewport/motion/browser
baseline belongs to DPW-RD-03 before source implementation.
