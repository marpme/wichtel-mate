# Wichtel-o-Mat

Secret Santa ("Wichteln") web app for an annual Christmas gift exchange among
family/friend groups. The UI is in German. Each participant gets a personal
"Wichtel ID"; entering it on the landing page routes to a statically
pre-generated page (`/[id]`) that reveals only that person's assigned gift
recipient. Every `/<id>` URL is also a permanent static link that can be shared
or bookmarked directly — `pages/links.tsx` lists all of them.

Privacy: participant names and Wichtel IDs are personal data. They live only in
`lib/groups.ts` — never copy them into docs, AGENTS.md, comments, or commits.

## Stack

- Next.js 16 (pages router) with `output: "export"` — static site in `out/`, no
  server runtime. React 19, TypeScript (strict), pnpm
- Geist UI (`@geist-ui/core`) for components, inter-ui font, moment (de locale),
  react-snowfall for the snow effect, `rand-seed` for the deterministic picker
- ESLint 10 (flat config in `eslint.config.mjs`, `pnpm lint` runs `eslint .` —
  `next lint` no longer exists in Next 16) + Prettier; Renovate automerges
  minor/patch updates

## Architecture / data flow

- `lib/groups.ts` — single source of truth for participants: `groups[]`, each
  with `userMap` (Wichtel ID -> first name). Exports `userMap`, `UserKeys`,
  `getBelongingGroup`
- `lib/peoplePicker.ts` — assignment algorithm: `rand-seed` RNG seeded with the
  current year, re-rolled until the result is a derangement (no self-picks,
  everyone picked exactly once). Deterministic per year, so assignments change
  on Jan 1; `lib/peoplePicker.spec.ts` pins each year — add a test case per year
- `lib/group.ts` — `getPickedPartner(userId)`: the user's groups + picked partner
- `pages/index.tsx` — landing: countdown to Dec 24 (`hooks/useXMASDiff.ts`) +
  `LoginForm` (validates the ID against `UserKeys`, routes to `/[id]`), plus a
  link to `/links`
- `pages/[id].tsx` — dashboard: `getStaticPaths` prerenders one static page per
  `UserKeys` entry (`fallback: "blocking"`); the partner is resolved client-side
  via `getPickedPartner`
- `pages/links.tsx` — per-group overview of all personal links (`<origin>/<id>`)
  with a copy button. The origin is read client-side (`window.location.origin`)
  because the host is unknown at export time; render the bare path before mount
  to avoid hydration mismatch

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | dev server |
| `pnpm build` | type-check + lint + static export into `out/` |
| `pnpm serve` | serve `out/` on port 3000 (`serve -p 3000 ./out`) |
| `pnpm lint` | ESLint |
| `pnpm test` | vitest (watch mode) |
| `pnpm cypress` | open Cypress e2e (needs the app served on :3000 first) |

Setup gotcha (pnpm 11): `pnpm install` ends with `ERR_PNPM_IGNORED_BUILDS`
(cypress/unrs-resolver build scripts), after which pnpm's pre-run
deps check fails every `pnpm <script>`. Either run `pnpm approve-builds` once,
or call the binaries directly: `./node_modules/.bin/next build`,
`./node_modules/.bin/vitest run`, `./node_modules/.bin/eslint .`. If the
Cypress binary is missing, fetch it directly with
`node node_modules/cypress/dist/index.js --exec install`.

## Layout

- `pages/` — `index.tsx` (landing + login), `[id].tsx` (per-user dashboard),
  `links.tsx` (link overview), `_app.tsx` (GeistProvider dark theme + snowfall)
- `components/` — Header, LoginForm, LogoutButton, WichtelImage
- `hooks/useXMASDiff.ts` — countdown string to Dec 24 (moment, de locale)
- `lib/` — `groups.ts` (data), `peoplePicker.ts` (assignment), `group.ts`
  (lookup), `*.spec.ts` (vitest, mock the system year; snapshot in
  `__snapshots__/`)
- `cypress/e2e/login.cy.ts` — e2e login flow (baseUrl `http://localhost:3000`)

## Conventions / gotchas

- Add participants or groups only in `lib/groups.ts`; new IDs automatically get
  a static page, login access, and an entry on `/links`. IDs are case-sensitive
  10-char strings
- Do not change the picker seeding — it would silently change existing years'
  assignments (the tests pin them)
- Static export: no API routes, no SSR data fetching; everything is computed at
  build time from `lib/`. Geist `Text` has no `textAlign` prop — use `style`
- The IDs ship in the client JS bundle (login validation), so they are
  unguessable but not secret; any extra "protection" would be client-side only
- UI copy is German; keep new user-facing strings in German
- Theming: warm "hearth" theme lives in `lib/theme.ts`
  (`Themes.createFromDark`, type `"hearth"`, wired in `pages/_app.tsx`);
  background gradient, card glow, garland and heading styles are in
  `styles/globals.css`; `components/LightGarland.tsx` renders the string of
  lights on every page via `_app.tsx`. Global overrides need `!important` to
  beat Geist's injected styled-jsx rules
- Verified workflow: `./node_modules/.bin/vitest run` (202 tests),
  `./node_modules/.bin/eslint .`, `./node_modules/.bin/next build`, then check
  `out/`: one html per user ID plus `links.html` and `index.html`. Cypress:
  `build` + `serve` on :3000 first, then `./node_modules/.bin/cypress run --e2e`
