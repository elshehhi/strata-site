# STRATA — marketing site & checkout

Not a software landing page: a continuous scroll journey — trailhead →
the strata → depth as a place → authorship → work from the field →
custody → the print room — over a live WebGL contour landscape, ending in
a Stripe checkout that stays inside the brand.

## Bilingual (Arabic-first)

Every page lives under `/ar` and `/en` (`app/[lang]/`); the bare root
redirects by `Accept-Language`, defaulting to Arabic like the product.
All copy is in `lib/i18n.ts` (`en` is the shape source; `ar` mirrors it).
RTL follows the app's own typography rule: the Latin display faces apply
in LTR only, Arabic renders in the system Arabic stack, JetBrains
numerals serve both. The Arabic journey shows the instrument's **Arabic**
screenshots (`ar_07_strategy`, `ar_12_refine`). The header language
switch swaps locale in place, keeping your position on the path.

## The field guide (docs-site)

Header, footer, and the success page link to the bilingual customer guide
at `/docs/ar` and `/docs/en`. Locally `public/docs` is a directory
junction to `../docs-site/site` (git-ignored; recreate with
`New-Item -ItemType Junction -Path public\docs -Target ..\docs-site\site`).
In production publish `docs-site/site` at `/docs` on the same host, or
point `NEXT_PUBLIC_DOCS_URL` at wherever it lives.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind · Framer Motion (light
arrivals) · GSAP ScrollTrigger (pinned chapter choreography) · Three.js
(the contour-terrain ground, one custom shader, one draw call + particles)
· Stripe Embedded Checkout.

## Run

```powershell
cd strata-site
npm install
npm run dev      # http://localhost:3010
npm run build    # production build
```

## Stripe

Copy `.env.example` → `.env.local` and fill in the keys plus one recurring
price per tier (`personal` / `professional` / `studio` — ids must match the
license claims in `src/license.rs`). Without keys the site runs in field-demo
mode: checkout renders a quiet "register isn't open yet" note instead of a
payment form. The chosen tier rides into the Checkout session and the
subscription's `metadata.strata_tier`, which is what the activation server
reads when minting the signed license JWT.

Displayed prices live in `lib/tiers.ts` and are presentation only — Stripe
charges whatever the price IDs say. Keep them in sync.

**Checkout theming:** Embedded Checkout takes its colors from Stripe
Dashboard → Settings → Branding (the Appearance API does not apply to
Checkout). Before launch set: background `#14110D`, accent/button
`#E8A25C`, font: a neutral sans. The site mats the form and labels it
("the payment room · run by Stripe") so the light counter reads as
deliberate; dashboard branding closes the remaining gap.

## Design provenance

- Tokens, voices, motion grammar: `prototype/nature-stack-pro/DESIGN_SPEC.md`
  ("sunrise over stone", warm obsidian inks, single dawn accent, the
  reserved near→far depth axis, `cubic-bezier(.22,.8,.24,1)` everywhere).
- Typefaces: the same bundled SIL-OFL variable fonts the app ships
  (Fraunces / Inter Tight / JetBrains Mono), copied into `app/fonts/` —
  never fetched from a CDN.
- Imagery: **all real.** Field photographs are actual STRATA merges and
  screenshots are the actual instrument, copied from
  `docs-site/assets/` (`public/img/`, `public/screens/`). No stock, no
  mockups, no fabricated metadata.

## Performance notes

The terrain canvas caps DPR at 1.75, renders one shader mesh + one particle
cloud, pauses when the tab hides, and degrades to a still landscape under
`prefers-reduced-motion` (chapters then fall back to simple in-view reveals;
GSAP pinning is desktop-only via `gsap.matchMedia`).
