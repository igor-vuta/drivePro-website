# Braces nesting limit

The build and lint tools depend on `braces@3.0.3` through Tailwind, chokidar,
micromatch and fast-glob. GHSA-vfj7-8cjw-p6xm reports stack exhaustion from deeply
nested patterns. As checked on 6 October 2026, no upstream patched release exists.

`vendor/braces` is a private, source-visible fork named `@drivepro/braces`, version
`3.0.3-patch.1`. It preserves the upstream MIT license, authors and implementation.
`UPSTREAM.json` records the original source hashes. This is a local patch, not an
upstream release or a claim that all possible denial-of-service inputs are fixed.

The parser checks the actual stack for both parentheses and braces before pushing
a nested block. The compile, expand and stringify walkers also check their depth,
including when callers supply an AST directly. A fixed depth budget of 64 rejects
excessive nesting with a catchable `SyntaxError` and code `ERR_BRACES_DEPTH`.
The budget cannot be disabled through caller options. It counts AST traversal,
including leaf nodes, so valid pattern nesting should stay below 64 levels.
Existing character and range limits remain intact. Ordinary repository patterns
use only a few levels.

The root dev dependency `braces: file:vendor/braces` and npm override `$braces`
ensure every transitive consumer uses the same reviewed source. A plain relative
file override resolves incorrectly under consumers with the current npm version;
the explicit root reference also makes clean installation reproducible.

The complete npm audit remains mandatory. Renamed local code is not checked against
the upstream package's advisory identity, so a clean audit alone does not verify
this patch. The test suite separately checks all affected consumers' resolutions,
ordinary expansion/escaping/ranges, deep brace and parenthesis strings below the
upstream character limit, unfinished patterns, direct ASTs and child cycles. A
separate process verifies deterministic rejection without stack exhaustion.

The vendored CommonJS JavaScript receives ESLint's recommended JavaScript checks;
application TypeScript, Next, React and accessibility checks remain unchanged.
No audit exception, ignored advisory, `continue-on-error`, or weakened audit
threshold is used. This dependency is build tooling and is not shipped as a
server-side service by the static export.

When an upstream fix becomes available, compare its coverage, remove this override
and fork, then rerun clean installation, security regressions, the full checks and
export comparison before publishing.

References:
- https://github.com/advisories/GHSA-vfj7-8cjw-p6xm
- https://docs.npmjs.com/cli/v11/configuring-npm/package-json/#overrides
