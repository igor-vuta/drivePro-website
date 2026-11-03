# PostCSS dependency updates

The dependency audit reported two additional advisories while preparing Search
Console verification. Keep the full audit enabled.

- `postcss-selector-parser` is pinned to upstream 7.1.6 through an npm override,
  addressing [GHSA-rj75-hqrm-r3gf](https://github.com/advisories/GHSA-rj75-hqrm-r3gf).
  Tailwind 3 and postcss-nested 6 still declare the older major. Verify the full
  static build and generated CSS when changing this override; remove it when
  those consumers support a patched version directly.
- `source-map-js` is updated within its existing compatible range to 1.2.2,
  addressing [GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q).

These are build dependencies for this static site. This update does not change
Tailwind's major version or relax any validation gate.
