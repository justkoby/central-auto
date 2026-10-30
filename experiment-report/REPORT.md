# Central Auto: four-skill design experiment

Branch: `experiment/four-design-skills` (from `main` at `33d5b41`). `main` was not modified and nothing was deployed or merged.

Everything below was observed in this session. Where something was not done or could not be done, it says so.

Raw tool outputs (UI UX Pro Max searches, the dealt Taste direction sheet, inspector and lint results, functional test log) are in `experiment-report/evidence/`.

## 1. Skills: what was actually found, read and used

| Skill | Found | Source | Read | Executed |
|---|---|---|---|---|
| `frontend-design` | Yes, already in the environment | `/mnt/skills/public/frontend-design/SKILL.md` | Fully | Nothing to run (guidance only) |
| `ui-ux-pro-max` | **No** in the session. Fetched from upstream on request | `nextlevelbuilder/ui-ux-pro-max-skill` @ `28b3b8d` | `SKILL.md` fully. **Not** read: `references/quick-reference.md`, `references/pro-rules.md` | `scripts/search.py` (design-system and 6 domain queries), after review |
| `design-taste-frontend` | **No**. Fetched from upstream | `Leonxlnx/taste-skill` @ `12af471` (`skills/taste-skill`) | `SKILL.md` fully. Partly: `imagery.md` §8, `motion.md` outline. **Not** read in full: `critique.md`, `copy.md`, `layout.md`, `type.md`, `colour.md` | `draw.mjs`, `lint.mjs`, `inspect.mjs`. **Not run:** `assets.mjs` (network blocked), `scenes.mjs` (no scenes) |
| `design-system-patterns` | **No**. Fetched from upstream | `wshobson/agents` @ `0874a27` (`plugins/ui-design/skills/design-system-patterns`) | `SKILL.md` fully, plus the first ~40 lines of `references/design-tokens.md`. **Not** read: `details.md`, `component-architecture.md`, `theming-architecture.md` | Nothing to run |
| `brand`, `design-system`, `ui-styling` (UI UX Pro Max extras) | Fetched with ui-ux-pro-max | same repo | First ~60 lines of each `SKILL.md`; scripts scanned | Not executed, not applied (see below) |

**Invocable?** None of the four appear in this session's `Skill` tool list, and the account skill list (`ListSkills`) had none of them. "Using" a skill here means reading its `SKILL.md` and following it manually, plus running its reviewed scripts. The first two turns of this session were spent establishing that; the skills were first not present in this cloud container, which is a different machine from where they were originally installed.

**How they were made available:** copied (fonts, tests and fixtures excluded) into `.claude/skills/` in the working tree, and excluded from git via `.git/info/exclude`. They are **not committed** to the experiment branch, so the diff stays reviewable. Fetched with `git clone --no-checkout`, extracted with `git archive`, into an isolated scratchpad directory.

### Security review (static; nothing unreviewed was executed)

- Read the `SKILL.md` files and grep-scanned every script for network, subprocess, `eval`, file writes, `rm`, credentials and prompt-injection phrases. This was a targeted scan plus reading the risky files (`install.sh`, `lib/cdp.mjs`, `execFileSync` callers), **not** a line-by-line audit of every script.
- Nothing malicious found. No obfuscation, no exfiltration patterns, no instructions aimed at overriding the user.
- Things worth knowing (all **not run**): `taste-skill/install.sh` symlinks into `~/.claude/skills`; `ui-styling/scripts/shadcn_add.py` calls `npx shadcn@latest` (pulls from npm); `design-system/scripts/fetch-background.py` carries Pexels URLs; `brand/scripts/sync-brand-to-tokens.cjs` runs `node` on a sibling script.
- Things that **were** run and what they do: `ui-ux-pro-max/search.py` is stdlib-only, no network or subprocess, writes only with `--persist` (not used). Taste's `draw.mjs` reads its local library and writes the sheet to `.taste-skill/` and a history file to `~/.taste-skill/history.json`. `inspect.mjs`/`lint.mjs` serve local files on 127.0.0.1 and launch headless Chromium with `--remote-debugging-port=0`. Because the container runs as root, Chromium needed `--no-sandbox`; I used a one-line wrapper script **outside the repo** as `CHROME_PATH` and did not modify the skill.
- `brand`, `design-system`, `ui-styling` were reviewed but **not applied**: the project has no Tailwind, shadcn or slide deck, and the brand identity was intentionally kept, so none of their workflows applied. I cannot claim they contributed anything.

## 2. Conflicts and redundancy between the skills

**Conflicts (and how each was resolved)**

| Conflict | Resolution |
|---|---|
| `ui-ux-pro-max --design-system` returned *Motion-Driven* style (glassmorphism as secondary), Syncopate + **Space Mono**, a slate + **red** palette. Taste bans monospace, glass and gradients, and the brand is green/orange. | Rejected its style, palette and typography. Kept its **UX rules and the Hero-Centric pattern**. |
| Motion: Taste's dealt direction is "Stillness, no load animation or scroll reveals" while its own step 9 requires a motion layer; UI UX Pro Max leans Motion-Driven/GSAP; `frontend-design` calls fade-and-slide on every section "the generic default"; the brief asks for "tasteful scroll reveals". | The brief wins. One orchestrated hero moment, plus a light one-time reveal on headings and lists. No GSAP or animation dependency. |
| Taste requires at least four **real** pictures and open-collection photo search; `assets.mjs` hosts are blocked here. | Could not be satisfied. See §6. |
| `frontend-design` warns about all-caps labels; Taste's dealt type (Imbue) is set in uppercase. | Uppercase is used on display headlines only, never on labels. 45 tiny uppercase labels were removed. |
| `frontend-design` lists "near-black ground plus one bright accent" as a default look; Taste dealt a dark room. | Brand fixes the palette (navy, brand green `#003428`, orange `#ed6739`) and the subject (cars shot in dark studios) suits it. Kept, as a choice, not a default. |

**Redundant:** all four cover tokens, type scale, motion limits and accessibility. `frontend-design` and Taste are both anti-"AI look". `ui-ux-pro-max` and Taste both pick palettes and fonts.
**Consistent:** no emoji or glyph icons (UI UX Pro Max and Taste), visible focus, reduced motion, readable body size.

## 3. Audit of the original (before)

*Working:* the natural-language vehicle search, the enquiry dialog flow, saved cars, the logo and brand green, the dark studio imagery, the clear service list.
*Generic or dated:* cream + terracotta palette with a card grid; **10 eyebrow labels, 45 tiny uppercase micro-labels**, numbered `01 / 03`, `♡` glyph icons; blur/glass surfaces; 20 different font sizes with 13px body; hairlines and 1px outlined boxes; low-contrast text (3.2:1).
*Hierarchy and spacing:* hero asks "Tell us what you need" (a search box) with no EV message; a slide counter reads `01 / 04` with three slides; text-only brand ribbon.
*Vehicle presentation:* identical white cards; **five inventory entries use Unsplash images that may not match the named model**; the "In the spotlight" section also loads an Unsplash image.
*Mobile:* 12-pixel-class labels, small tap targets, topbar clutter.
*Retained:* all logic in `App.jsx` (filters, sort, saved, search interpretation), `vehicleSearch.js`, `vehicles.js`, the enquiry dialog flow, the logo, routes/anchors (`#inventory`, `#services`, `#source`, `#approach`), localStorage key.

## 4. What changed

- **EV-first three-slide hero** (Affordable, Everyday, Premium). Autoplay has a pause control, is off under `prefers-reduced-motion`, and slides are `inert`/`aria-hidden` when inactive.
- **Charge control:** the slide progress bar is the EV's battery charge level. Earlier categories stay full.
- **Featured EV:** Volkswagen ID.6 with the real photograph and an enquiry CTA.
- **Going electric in Ghana:** four questions (charging, connector standard, battery, after-sales). Qualitative guidance only, no statistics or tariffs.
- **Conventional and commercial:** a band of four unequal panels (hover or focus widens one) that opens the filtered list or an enquiry.
- **Vehicle discovery:** sticky preview + list (hover/focus/tap updates the preview); search, make/model/budget/availability, collection tabs, sort, save, details dialog all kept.
- **Services:** four rows including sourcing, after-sales, spare parts, trucks/equipment/assembly, each with an enquiry button.
- **Sourcing CTA** (WhatsApp *or* email) and approach steps kept as a real `<ol>`.
- **Navigation:** plain bar (logo, four links, saved, one action), mobile drawer with Escape-to-close and 48px targets; skip link added.
- **Design system:** `src/styles/tokens.css` (primitive, semantic, a few component tokens) and one `site.css`. Replaced a 43 KB override-stacked stylesheet.

## 5. Specific design decisions by skill

**frontend-design**
- Grounded the hero in the subject: *an EV's charge level becomes the slide control*, and the three categories are three steps up the charge.
- Two-pass process: planned tokens/layout first, then reviewed. The review changed the hero: the first detailed flat-vector cars looked like clip art next to the real photograph, so slides 1 and 2 became a dark "teaser" silhouette with a rim light.
- Typography: two clearly different families (a condensed serif for display, a humanist sans for text), line lengths held under ~52ch, no single accented word in headlines.
- Removed the generic tells: eyebrow labels above headings, numbered markers (kept only where content is a true sequence), all-caps labels, "→/↗" appended to buttons.
- "Spend boldness in one place": the hero is the memorable moment; the rest is quiet. Removed the topbar, brand ribbon and "In the spotlight" section.
- Copy: buttons name the action ("Ask about city EVs", "Enquire about the ID.6"); sentence case; consistent verbs across the enquiry flow.

**ui-ux-pro-max**
- Ran `--design-system` (variance 5, motion 3, density 3) and six domain searches (carousel/reduced motion, product, typography, touch, images, colour).
- Adopted its **Hero-Centric pattern**: one primary CTA per slide, static under reduced motion, pause control.
- UX rules applied: reduced-motion handling, "animate 1–2 key elements", touch targets 44–48px with ≥8px gaps, lazy-load below the fold, explicit `width`/`height` to limit layout shift, `font-display: swap`, priority order accessibility, then touch, then performance.
- `density 3` informed the generous section spacing (88–200px).
- **Rejected:** its style, palette and font recommendations (see §2).

**design-taste-frontend**
- Dealt directions with `draw.mjs` (seed `905348783`); chose **The dark room** and wrote down why. Redrew the hero (the dealt "two doors" blueprint contradicts the pinned three-slide EV brief) and relaxed the motion ("Stillness") per the brief. Both recorded.
- Dealt type (Imbue / Albert Sans) adopted; palette kept from the brand (`--keep palette`).
- Section blueprints reused for geometry: **sticky photograph + active list** (vehicle discovery), **band of unequal panels** (conventional and commercial), **question at both edges** (sourcing: "WhatsApp or email"), **name across the last photograph** (footer logo), pinned heading (EV in Ghana).
- Its house rules were *measured*, and drove real fixes: lint failed on inset-shadow outline buttons, flat tone steps built with gradients and a `.kicker` label; the inspector then failed a 3-line headline, labels above ID.6 facts, a gradient scrim and edge-hugging text. All were fixed in code, not argued with.
- Teaser silhouettes: its "draw the object, never fake a photograph" rule is why the two non-photographic slides are drawings, not faked photos.

**design-system-patterns**
- Three-layer tokens (primitive, semantic, a small set of layout/motion tokens). Components use semantic names (`--bg`, `--surface`, `--ink`, `--accent`).
- One button system (`.button` + `solid`/`accent`/`outline`) replacing five pill classes.
- Deliberately **no** theme switcher, Style Dictionary or Figma pipeline (the site is dark-only), per "no unnecessary abstraction".
- Honest gap: hero field colours and teaser palettes are literal hex values in `site.css`/`Hero.jsx`, not tokens.

## 6. Before vs after

Same inspector (`taste inspect.mjs`) on the original `main` build and on this branch:

| | Before (`main`) | After |
|---|---|---|
| Inspector result | **15 FAIL, 8 WARN** | **0 FAIL, 1 WARN** (no video; defended) |
| Source lint | 10 FAIL | 0 FAIL, 0 WARN |
| Headline wrapping past 2 lines | yes at 1440 / 768 / 390 | none (longest heading: 2 lines) |
| Eyebrows, micro-labels, numbering | 10 / 45 / yes | 0 / 0 / 0 (real `<ol>` only) |
| Font sizes in use / body size | 20 / 13px | 9 / 19px |
| Typefaces | DM Sans + Manrope | Albert Sans + Imbue |
| Glass, gradients, outlined boxes | 6 / 2 / 11 | 0 / 0 (scrims marked) / 0 |
| CSS (gzip) | 42.2 kB (9.0 kB) | 25.3 kB (6.2 kB) |
| JS (gzip) | 261.3 kB (81.9 kB) | 264.9 kB (83.3 kB) |

Screenshots (`experiment-report/screenshots/`): `before-*` and `after-*` for desktop and mobile (fold and full page), plus hero slides 2 and 3 and the mobile menu. Slide 1 is the `after-*-fold` shot.

## 7. Build and functionality tests

- `npm run build` (Vite 7): passes, 47 modules.
- **46/46** Playwright checks pass (Chromium): one `h1`; hero slide control, inert slides; enquiry flow from hero (service text carried into the message, copy fallback, Escape to close); natural-language search and clear; collection tab; make + budget filters; reset; sort; preview hover; details dialog to enquiry; save, persistence across reload, saved-only; category panels; service, email and WhatsApp-panel paths; all six anchors exist; no console or page errors; mobile menu open/Escape/navigate; **no horizontal scroll at 320, 375, 390, 768, 1024, 1280, 1440, 1920**; reduced motion (nothing hidden, slideshow paused).
- One real bug found and fixed along the way: horizontal overflow at 320px (sort/reset row).
- Original `README.md` described files that have changed; see the updated structure there.

## 8. Remaining weaknesses (honest)

1. **Photography is the main gap.** Only **one** real EV photograph exists (the ID.6, a user-supplied reference the README already says must be replaced; it carries an "ID.6 X" badge). Slides 1–2 are drawn teaser silhouettes. They are deliberate and honest, but they are **not** "professional automotive photography" and the car shape is still basic. This falls short of the brief.
2. Real EV photography could not be sourced: `commons.wikimedia.org`, `api.openverse.org`, `images.unsplash.com`, `upload.wikimedia.org` and `driveevgh.com` are blocked by this environment's egress policy. **The reference site `driveevgh.com` could not be viewed, so the design was not informed by it.**
3. Conventional inventory still uses the original AI-generated studio images, and five entries still point at Unsplash images that could not load here (a labelled fallback shows instead). I did not verify them on a live network.
4. **No Central Auto EV stock or prices were invented.** So the EV experience is category-led and enquiry-led, not a browsable EV inventory. The vehicle list is still the original demo data. "Seven seats" for the ID.6 comes from the original site copy and should be confirmed for the actual trim.
5. The "Going electric in Ghana" copy is general and unverified against Ghanaian policy or the charging network; Central Auto should review it. No statistics or incentives are claimed.
6. Images are large unoptimised PNGs (about 2 MB each). Not converted to WebP/AVIF, and no Lighthouse or real-device performance test was run. This contradicts UI UX Pro Max's own image rule.
7. Testing was Chromium only (Playwright). No Safari/Firefox, no real phone, no screen reader, no automated contrast audit beyond the inspector.
8. On mobile, slides share one height, so shorter slides leave an empty band under the buttons.
9. WhatsApp number and email are still `null` in `src/data/business.js`, so enquiries still end in the copy-message fallback, as before.
10. Fonts load from Google Fonts (Imbue has a single weight). There is no self-hosting.
11. I did not run Taste's formal scored critique rubric; the visual critique was done by reading screenshots and fixing what was visible.

## 9. Did the four skills complement or conflict?

**Complementary in role, conflicting in style.** Taste supplied direction and, more usefully, an automated gate that changed my output (about ten patterns I would have shipped were flagged and removed). `frontend-design` supplied the framing and the "review your own plan" discipline. `design-system-patterns` supplied a small, sensible token structure. `ui-ux-pro-max` was the weakest *design* input here: its generated system was generic and contradicted Taste and the brand, though its UX rules were useful as a checklist.

**Conflicts were real but resolvable** by a fixed order: the user's brief and brand first, then Taste's measured house rules, then `frontend-design`, with UI UX Pro Max used for UX rules rather than aesthetics, and `design-system-patterns` kept minimal.

**What this experiment cannot show:** I did not build an "ordinary Claude" version for a controlled comparison, so any claim about how much better this is than a no-skill run would be unsupported. The before/after table compares against the *original site*, not against a no-skill redesign.

## 10. Housekeeping

- An accidental `git stash -u` in one command stashed the working tree; it was popped immediately and nothing was lost (verified file by file).
- `pkill -f` once killed its own shell; harmless.
- No GitHub Actions or deploy config exists in this repo; nothing was deployed.
