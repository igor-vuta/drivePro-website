# Typography, 3D and Instagram sources

Prepared correction for the owner's Kazakh typography, 3D and Instagram-gallery feedback on 2026-10-05. Implementation is a private local candidate until coordinator review and release checks.

## Typography

Self-hosted Noto Sans normal width, variable weight 100–900. Official source: [Google Fonts Noto Sans](https://github.com/google/fonts/tree/main/ofl/notosans), upstream [Noto Latin/Greek/Cyrillic](https://github.com/notofonts/latin-greek-cyrillic). `public/fonts/OFL.txt` preserves the SIL Open Font License and original copyright. `public/fonts/SOURCE.json` records the downloaded source URL and input/output SHA256.

The subset retains U+0000–024F, U+0400–052F and U+2000–206F, including all uppercase/lowercase Kazakh-specific letters Ә Ғ Қ Ң Ө Ұ Ү Һ І. Width is fixed to 100; weight remains variable. File size: 142,384 bytes. Browser requests are local to the existing Pages base path. No Google Fonts browser request occurs.

To reproduce from the official downloaded TTF:

```sh
uv run --with fonttools --with brotli python scripts/subset-font.py /path/to/NotoSans-variable.ttf
```

The saved source hash identifies the input; upstream `main` may change. Headings, controls, navigation and body share the same face. Sentence case and normal tracking replace condensed uppercase presentation; the Drive Pro wordmark retains its spelling. Highlight model names use the normalized display ledger below, while original account spellings remain in sourceTitle.

## Actual saved Highlights

Source: [@drivepro.moped.almaty](https://www.instagram.com/drivepro.moped.almaty/), observed 2026-10-05 through normal public browser DOM and page assets. Ten actual 150 px covers and displayed names were supplied in project evidence `visual-stories-003/public-highlights.json`.

`data/highlights.json` records the original account title in `sourceTitle`, normalized display title in `title`, direct Highlight URL, self-hosted cover path and SHA256. Files remain unchanged in `public/instagram/highlights`. They are saved Highlights in public profile order; that order does not establish publication chronology. Covers establish neither stock, price, current availability nor sale/rental terms. Generated reference photos are never product media.

Owner-requested display correction on 2026-10-06 (DPW-NAMES-007): use Latin A in Vino 5AU, regular spacing and uppercase J in the account's Jog short codes, Dio Fit AF27 and Honda Gyro UP. Original titles remain traceable; IDs, URLs, cover bytes/hashes and order are preserved. The retained internal ID `gyro-up-yamaha` is historical and is not the displayed manufacturer.

Primary naming references: [Honda Gyro UP release](https://global.honda/jp/news/2000/2000203a.html) identifies Honda's Gyro UP; [Honda Dio Fit release](https://global.honda/jp/news/1997/2970516.html) lists AF27; [Yamaha Vino manual](https://www2.yamaha-motor.co.jp/Manual/pdf/mc/20025AUJ.pdf) uses the Latin 5AU code. Jog 36J/16J/12J/01J are preserved account codes with casing normalized; no SA prefix or more specific variant is inferred. These references support naming, not the identity/condition of a particular photographed vehicle or current inventory.

| Original account title | Normalized display title | Actual Highlight |
| --- | --- | --- |
| Suzuki Let's 5 | Suzuki Let's 5 | https://www.instagram.com/stories/highlights/18185007853280491/ |
| Yamaha Vino 5АU | Yamaha Vino 5AU | https://www.instagram.com/stories/highlights/18009490972436213/ |
| Yamaha Jog 36j | Yamaha Jog 36J | https://www.instagram.com/stories/highlights/18238938778142608/ |
| Honda Dio Fit 27 | Honda Dio Fit AF27 | https://www.instagram.com/stories/highlights/17942262446036529/ |
| Yamaha BJ | Yamaha BJ | https://www.instagram.com/stories/highlights/17969539060678609/ |
| Yamaha Gear | Yamaha Gear | https://www.instagram.com/stories/highlights/18240529069190427/ |
| Gyro Up Yamaha | Honda Gyro UP | https://www.instagram.com/stories/highlights/17935146893491315/ |
| YamahaJog 16j | Yamaha Jog 16J | https://www.instagram.com/stories/highlights/17998842919481789/ |
| YamahaJog 12j | Yamaha Jog 12J | https://www.instagram.com/stories/highlights/17980869739577543/ |
| YamahaJog 01j | Yamaha Jog 01J | https://www.instagram.com/stories/highlights/17955815557904441/ |

## Reviewed visual references

The coordinator approved the generated section references `exec-b75fe10b-bdbe-4352-90d7-a41c9328a0c6.png` (broad charcoal platform, sculptural gold excavator, red counterweight and three piles) and `exec-81ff6284-e33e-414a-9ad2-8e35019e86be.png` (quiet charcoal cards, round gold-ring covers, cream model titles). Their invented photos, labels and extra controls are excluded.

The implemented scene uses actual six-face CSS cuboids and `transform-style: preserve-3d`, articulated boom/forearm and a 700 ms move gesture. No runtime 3D dependency, external texture, autoplay, score or invented equipment specification is introduced. The minimal static CSS preview is available before explicit Play; the scene module loads only after activation. Rotation controls reveal front and side faces. Reduced motion disables the gesture; Pause and hidden-page state freeze active sessions, which require Resume on return. Hidden completed sessions settle to the static finished pose and do not restart motion on return. Reset restores piles and angle; Exit restores focus to Play.

## Saved post photos — DPW-ROUTES-005

Nine coordinator-inspected public Reel previews now provide a larger moped photo grid. `data/moped-photos.json` binds each local WebP and intrinsic dimensions to its exact original @drivepro.moped.almaty post URL. The full portrait frame is retained. No model names are inferred; the photos are saved post previews, not current Stories or inventory evidence. Original-post links remain available without JavaScript, with an optional native dialog and source-specific WhatsApp draft. See [route specification](ROUTES.md). Existing live integration remains unverified, with an empty initial snapshot.
