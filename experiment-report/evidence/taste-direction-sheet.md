# DIRECTION SHEET — The dark room
seed 905348783 · drawn 2026-10-30 · sector physical-product · tone luxury
Brief: Central Auto Ltd, Ghana vehicle dealer going electric-first: EVs, SUVs, trucks, sourcing, spare parts, after-sales

| | |
| --- | --- |
| Direction | The dark room |
| Hero | Two doors on a dark wall |
| Type | Imbue / Albert Sans |
| Colour | kept from the brand |
| Sections | showcase (Band of unequal panels) → list (Sticky photograph, active list) → about (Pinned title, portraits pass) → features (One scene, stepping statements) → gallery (Photographs gathered round a heading) → cta (Question at both edges) → footer (Name across the last photograph) |
| Motion | Stillness |
| Photographs | the "Hands and making" set, as atmosphere |

This is the direction for this build. Adopt it. Do not blend it with the layout you would have made anyway,
and do not redraw because it is unfamiliar: unfamiliar is the point. Redraw a slot only when it conflicts
with a stated brand constraint or needs an asset that does not exist, and say why in your report.

The parts of this sheet were written separately and will disagree in small ways. Settle every disagreement in this order:
**house rules** (including type no smaller than 13px and body text of 16px or more) → **the direction** (the idea, the composition habits, where the
one accent goes) → **the type system and the palette** (which face does which job, the five size steps, which colour is the ground and where the
accent goes) → **the hero blueprint** → **the section blueprints**. Under each blueprint below, "Adjusted for this page" lists where it disagrees.
In practice: take geometry from blueprints (columns, proportions, what sits where) and take everything else from above them. Map every size a
blueprint names onto one of your five type steps instead of adding a sixth. Use one button shape, one corner radius and one pair of page margins on
the whole page, whatever individual blueprints say. If a blueprint names a kind of typeface (a light serif, a heavy grotesk), use the dealt face.

## 1. The idea
One dark field from top to bottom, and in it, lit things. Photographs and objects appear like exhibits in a dim gallery: each with space around it, each the brightest thing on its screen. Type is light, small and sparse. The darkness is not a theme switch; it is a room, and the page is a slow walk through it. It suits subjects sold on atmosphere and material: an evening restaurant, a metal card, a record, a house at dusk.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
A single near-black or deep-toned ground runs the full page with no section bands. First screen: either the name at full width in a light weight along the bottom edge with one dim photograph above it, or one object or photograph centred at 40–50% of the viewport with a line of text beneath at 16–18px. Each later screen holds one or two lit items at a generous size (the main one 40–60% of the screen width) with its text set beside it at full reading size; the darkness frames the items, it does not replace content. Images vary in size but all share the same darkness at their edges so they sit in the ground without frames. Practical details come last in a simple two-column text block. The only solid light element on the page is the single primary action.

## 3. Type — Imbue / Albert Sans
A tall, condensed high-contrast serif whose capitals read like a masthead or a shop fascia. Suits residences, hotels, restaurants and wine, where a short name can stand floor to ceiling.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Imbue:wght@400&family=Albert+Sans:wght@400;500&display=swap" rel="stylesheet">
```
- Display: **Imbue** — weight 400 with optical sizing on · tracking -0.01em · leading 0.9 · uppercase, sized so one short word fills its column (6–12vw)
- Text: **Albert Sans** — 400 for body, 500 for emphasis · leading 1.55 · tracking 0
```css
:root {
  --step-small: clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);
  --step-body: clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem);
  --step-lead: clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);
  --step-head: clamp(2rem, 1.3rem + 3.2vw, 4rem);
}
```
Light or regular weights; they glow on dark. Avoid heavy bold, which looks cheap on black. Headings 4–7vw at most; text 16–18px with leading 1.6 and a slightly lifted ink (not pure white).
The direction decides sizes and how many of them; the type system decides how this face is set. Where the two give different tracking or leading, use the values of the type system: they are tuned to this face.
The display size itself comes from the hero blueprint below.

## 4. Colour
Kept from the brand. A dark ground with a tint (blue-black, green-black, brown-black), a soft light ink, a dimmer ink for secondary text, and one warm or bright accent used once per screen at most.

## 5. Imagery
**There are no photographs of the product and none can be faked.** Wherever this sheet calls for a picture of the object, draw the object: its pieces as flat shapes in inline SVG, large, in one graphic language and in the colours that make it worth buying (a glaze, a finish, a material), never grey placeholders (references/imagery.md §8). **Around the object, use real pictures of its world** from the open collections: its material up close, its town in old postcards, its craft in engravings, a museum piece of the same kind, never one a visitor could take for the product itself (references/imagery.md §3). Start with `node /home/user/central-auto/.claude/skills/design-taste-frontend/scripts/assets.mjs "physical product"`, then queries from your inventory (its street, its materials, its trade's tools and history). Download what you use with `--get` and credit every one on the page (`--credits` prints the footer line). Type at scale and full colour fields carry the rest; the dealt photographs only where they plainly do not pretend to be the product. In your report, say that product photography is needed and which drawings it will replace, and list every found picture with its source and licence.

Low-key photographs: dark backgrounds, one light source, subjects emerging from shadow. Their dark edges should blend into the page ground.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "Hands and making" set (hands at work, craft and making)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
Treatment: If a photograph's background is lighter than the page, darken the image slightly (`filter: brightness(0.85) contrast(1.05)`) rather than adding a frame.
- `https://picsum.photos/id/491/1600/1000` — Axe, hammer, pliers and leather gloves laid out on dark wood · dark tone · dark brown, tan, steel grey · native landscape · photo: Todd Quackenbush
- `https://picsum.photos/id/785/1600/1000` — Two cupped hands holding a pile of green spruce tips · mid tone · fresh green, dark green, warm skin · native landscape · photo: Jean Lakosnyk
- `https://picsum.photos/id/407/1600/1000` — Hands lighting a sparkler that throws bright sparks in the dark · dark tone · charcoal, warm white, amber · calm area: right · native landscape · photo: Kelley Bozarth
- `https://picsum.photos/id/319/1600/1000` — Hands holding a vintage rangefinder camera against a denim jacket · mid tone · denim blue, mustard, silver · native landscape · photo: Kristian Karlsson
- `https://picsum.photos/id/674/1600/1000` — Cupped hands holding a heap of dark blue grapes · mid tone · pale blue, dark purple, tan · native landscape · photo: Maja Petric
- `https://picsum.photos/id/304/1600/1000` — Hand adjusting faders on an audio mixing console · mid tone · warm white, navy, amber · native landscape · photo: Drew Patrick Miller
- `https://picsum.photos/id/1060/1600/1000` — Kettle pouring water over a pour-over coffee dripper on a dark counter · dark tone · dark teal, black, warm brown · native landscape · photo: Karl Fredrickson
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: transport, desert-and-road, field-and-farm, forest — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Two doors on a dark wall
For a subject with two halves a visitor must choose between: two exhibitions, two audiences, two places, two collections. One near-black flat field. Two portrait photographs at 3:4, each 280×373px, stand side by side 80px apart, so the pair spans x 400–1040 (44% of the width) with their tops at 300px; square corners, no frame, the pictures supplying every colour on the screen. Each photograph is the link to its half, and directly beneath it, left-aligned to the frame, sit its name at 22px in the light ink and one line at 16px in the soft ink. The headline is centred above the pair: two lines at clamp(36px, 3.4vw, 52px), leading 1.05, its first line 104px from the top, at most 26 characters per line. Wordmark top-left and one text link top-right at 15px on 32px margins. About 150px of dark ground stays below the pair and 400px either side of it, closed by the two doors at the centre. Pointing at or focusing one door keeps it at full strength and dims the other to 50%. The page continues below with the two halves in order, so each door is also an anchor to its half.

On a phone: The pair stays side by side: each photograph 168px wide at 3:4 with a 14px gap, centred at 46% of the height, its name at 17px and its line at 16px beneath it. The headline sits above at 8vw on two lines, centred, 64px down. The wordmark and the link stay in the top corners.
Headline: A 4–8 word sentence on two lines that names the choice, at most 26 characters per line.

Adjusted for this page:
- It fades text: anything a visitor reads, inactive items of a list included, is `--ink` or `--muted` at full strength (contrast 4.5:1 or more). The active item is told apart by `--ink` against `--muted`, weight or the accent, not by fading the rest.
- It names colours (black): map them onto this palette's roles (ground `--bg`, panels `--surface` and the fields, text `--ink`/`--muted`, the accent `--accent` on the primary action only).
- It numbers things 01, 02: drop the numbers unless they are real data (a price, a date, a count).

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. showcase — Band of unequal panels (strip)
A modest heading, then one wide band of pictures. The heading, two to four words at 36–44px, starts at column 3, left of centre, with 64px beneath it. The band spans the full viewport width edge to edge and is 68svh tall: four photographs standing side by side with no gaps and deliberately unequal widths, a flex row with flex-grow values of 5, 2, 3 and 2. Each panel is cropped with object-fit: cover to a tall slice, so the band reads as one folded view. The first panel carries a two-line title at 28px in paper colour at its top-left, 24px in, over a neutral scrim that covers only that corner. Hovering a panel raises its flex-grow to 6 over 500ms while the others give way; without hover the widths simply stay. One caption line at 16px sits under the band at the left margin.
On a phone: The heading sits on the margin at 28px. The band becomes a two-by-two block with no gaps, 84svh tall in total: the first row split 64/36 and the second 36/64, so the slices stay unequal. The title stays on the first panel. No hover behaviour.

### 2. list — Sticky photograph, active list (split)
Two columns. The left, columns 1–5, is `position: sticky; top: 12vh` and holds one photograph or object at 4:5, 34vw wide, unframed on the ground. The right, columns 7–11, holds a vertical list of five to nine names (treatments, rooms, courses, services) at clamp(20px, 1.6vw, 24px), each row 58px tall with the name at the left and a price or duration right-aligned at 15px in the soft ink. The active row is full ink; the others rest at 40% opacity. Hovering, focusing or scrolling a row to the middle of the viewport makes it active, crossfades the left photograph to that item's image over 300ms, and opens a three-line description at 15px, 34ch wide, directly under the name, pushing later rows down. A heading of two or three words at clamp(32px, 3.4vw, 48px) sits above the list, aligned to its left edge, 48px above the first row.
On a phone: The photograph becomes a 4:3 band pinned to the top of the screen at 38svh while the list scrolls beneath it; the heading sits above the first row. Rows are 56px tall and the description opens on tap. The image changes with the row nearest the band.

Adjusted for this page:
- It fades text: anything a visitor reads, inactive items of a list included, is `--ink` or `--muted` at full strength (contrast 4.5:1 or more). The active item is told apart by `--ink` against `--muted`, weight or the accent, not by fading the rest.

### 3. about — Pinned title, portraits pass (pinned)
A wrapper tall enough for its portraits: about 90svh per person, up to six people. A `position: sticky; top: 0` layer of 100svh holds the heading, two words at clamp(88px, 12vw, 180px), leading 0.85, centred at mid-height, in white with `mix-blend-mode: difference` so it reads over ground and photographs alike. Beneath it in the stacking order, portraits scroll past in normal flow: each a 4:5 photograph 26–30vw wide, alternately starting at column 2 and ending at column 11, 60svh apart, so each one passes behind a different half of the heading. Under each portrait's left corner: the name at 18px, the role at 14px in the soft ink, and one sentence of up to 30 words in a 280px measure. The last portrait is followed by 40svh of empty ground before the heading releases. Square corners. Nothing else is on screen.
On a phone: The heading shrinks to 17vw and pins 16px from the top instead of at mid-height. Portraits become 72% wide, alternating between the left and right margins, 48px apart, each with name, role and sentence beneath at the portrait's width.

Adjusted for this page:
- It names colours (white): map them onto this palette's roles (ground `--bg`, panels `--surface` and the fields, text `--ink`/`--muted`, the accent `--accent` on the primary action only).
- It blends text with `difference`: over anything but black, white or grey that gives random hues. Use a solid ink chosen for each ground instead.

### 4. features — One scene, stepping statements (full-bleed)
A wrapper 350–450vh tall holds a sticky full-bleed photograph (100vw by 100svh) with a calm, symmetrical subject and a clear upper third; a neutral dark scrim covers only that upper third. At top centre, five or six short statements of two to five words are stacked at 18–20px with 10px between them; the first of them is the section's heading. One statement is at full white and the rest at 45% opacity; the active line steps down the stack as the reader scrolls (IntersectionObserver on invisible 70vh markers). For each statement, two small photographs with square corners, 160–240px wide and of different ratios, fade in left and right of the centre line at different heights, then leave when the next pair arrives. No other text. A low-key image on a deep ground works equally well.
On a phone: The photograph stays sticky at 100svh, cropped to its centre. The statement stack moves to the bottom third over a scrim, at 17px, left-aligned on the margin. Each statement brings one small photograph only, 44vw wide, placed in the top-right corner with a 16px margin.

Adjusted for this page:
- It fades text: anything a visitor reads, inactive items of a list included, is `--ink` or `--muted` at full strength (contrast 4.5:1 or more). The active item is told apart by `--ink` against `--muted`, weight or the accent, not by fading the rest.
- It names colours (white): map them onto this palette's roles (ground `--bg`, panels `--surface` and the fields, text `--ink`/`--muted`, the accent `--accent` on the primary action only).

### 5. gallery — Photographs gathered round a heading (mosaic)
A band about one screen tall on the plain page ground, used as the page's one deliberate rest. At its visual centre sits the heading, two lines at clamp(32px, 2.6vw, 40px) in a light weight, centred, with one sentence at 17px under it and a text link beneath that. Around it six to eight small photographs are scattered irregularly across the middle columns (x 320–1120; the outer 320px on each side stay empty, equally), each 160–200px wide at about 9:10, square corners, at different heights with 60–200px of air between them. Two of them come within 40px of the heading's block, which their drift never reaches, so the cluster reads as gathered round it rather than laid on a grid. No captions and no frames. Each photograph drifts at its own rate as the band passes (4–12% of its own height on a scroll-linked timeline), so the cluster loosens and tightens; under reduced motion it stays put. The pictures come from one place or one day and share one treatment.
On a phone: Five photographs at 30% of the width sit offset left and right around the centred heading, two above it and three below, none cut by an edge. The heading drops to 7vw on two lines.

### 6. cta — Question at both edges (statement)
For a closing choice between two answers: book or ask, this date or that, the tasting or the tour. A flat field exactly 100svh tall in the darkest tone. The question is a two-line heading at clamp(110px, 11vw, 168px), leading 1.0, centred, about 54% of the width: line one with its cap line 32px under the field's top edge, line two with its baseline 24px above the bottom edge. The band of about 560px between them is empty except for one row at its optical centre: two solid rectangular buttons, each about 200×56px with its label at 18px in medium weight, their inner edges 120px either side of the centre axis, and between them, exactly on the axis, the word 'or' at 18px in the soft ink. 16px under the row, centred, one line at 16px in the soft ink says what happens after either choice. The type above and below closes the empty band, so it reads as held breath rather than a gap.
On a phone: The question drops to 18vw, still two centred lines, line one 32px from the top and line two 24px above the bottom. The buttons stack at the centre at 72% of the width, 12px apart, with 'or' between them and the line of explanation under the second.

### 7. footer — Name across the last photograph (full-bleed)
The footer is the page's last photograph, full-bleed at 100vw by 100svh, darkened evenly with `filter: brightness(0.62)` so paper-coloured type reads everywhere on it. Three layers of text sit on the image. Top row, 32px from the edge: a short link list at 16px at the left margin and contact details at the right margin, each no wider than three columns. Mid-height is left to the photograph. Along the bottom, the wordmark runs the full width in the paper colour, letters about 12–20vw tall depending on the name's length, baseline 56px above the edge; under it one line of legal text at 13px. Choose an image whose interest is in its middle band, since the top and bottom carry text. No panel, no box and no colour block separates the footer from the image: the photograph is the footer.
On a phone: The photograph is 100vw by 88svh, cropped to its strongest vertical slice. Links stack at the top-left at 16px, contact beneath them. The wordmark is fitted to the width along the bottom, with the legal line under it at 12px.

Adjusted for this page:
- It sets text at 12px: use your small step (13px or more) instead.

## 8. Motion — Stillness
No showpiece. The page is simply there, instantly, and the discipline is the statement. Motion is limited to exact feedback: a 140ms press on the button, a 180ms colour change on links, focus rings that appear without delay. Do not add a load animation or scroll reveals to this direction.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 10. Where the richness comes from
Light against dark, and the slow pacing.

## 11. How this direction goes wrong
Grey text on black fails contrast quickly: check it. No glow effects, no neon accent, no coloured light blobs. A dark page with a bright busy photograph is not this direction; choose low-key images. Dark does not mean empty: every screen still carries its content at a readable size, and running text is a light ink at 7:1 or more, not a dim grey.

## 12. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **Deeo Studio** (One Page Love, studied score 7) `opl-deeo-studio-2`
  Idea: The studio's four letters as huge extruded iridescent 3D blocks tumbling across a black stage, with a quiet ultralight serif statement underneath.
  Hero: Near-black viewport. Four extruded 3D letters, each roughly 45-60% of the viewport tall, are scattered at different depths and tilts across the top 80% of the screen: one cropped by the top-left corner, one lower and left of centre, a larger one upper-right, the last cropped by the right edge. Faces are dark glass; edges catch lilac, orange and holographic rainbow light. Over them runs a slim nav: bold caps wordmark top-left at a 60px margin, three small caps links (one with a tiny yellow tag) and an outlined rounded button top-right. Bottom-left, a light serif headline at about 72px begins and is cut by the fold after two lines.
  Worth taking: Render the studio name as separate 3D letters at different depths and tilts, cropped by the viewport edges, instead of a flat wordmark.
- **IZANAMI** (Awwwards Site of the Day, studied score 7) `aww-izanami`
  Idea: Silence as design: one small sentence in fog, then a slow descent from mist into a dark glass pavilion.
  Hero: After a warm-black loader showing only one 18px serif sentence and a small counter, the hero is a full-bleed, desaturated grey-green image of pine forest dissolving into fog. The same sentence stays at 18px in white, left-aligned on a line about 17% from the left edge and exactly at vertical centre; it is the only text in the picture area. A small white seal-style logo sits top-left; a language switch and menu label in tiny tracked capitals sit top-right, each with a dot above. Along the bottom edge: copyright, two live city clocks, and a scroll cue at far right, all near 10px.
  Worth taking: Place a single 18px sentence at vertical centre on an offset left line over full-bleed fog, and let the absence of a headline be the statement.
- **poetry camera** (One Page Love, studied score 7.7) `opl-poetry-camera`
  Idea: A camera that prints poems is sold through its own output: copy arrives as thermal-paper slips, and a soft-focus bitmap wordmark lies over handheld footage.
  Hero: Full-bleed handheld video of two hands holding the white-and-red camera against out-of-focus blossom. The product name is centred over it in two lines of white lowercase bitmap lettering about 10vw tall, deliberately blurred so the pixels bloom into soft blobs; the block spans 70% of the width, from 25% to 70% of the height, directly on top of the camera. One text link sits top-left and two social icons top-right, all white. A yellow pill button about 165px wide with black lowercase text is centred near the bottom edge and stays fixed for the whole page. No tagline and no scrim.
  Worth taking: Blur a bitmap wordmark until the pixels bloom, turning a hard retro face into something soft enough to sit on video without a scrim.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. The frame: one h1 on the first screen that says what this is, equal outer margins, no
section huddled on one side with the other half empty, no blank stretch over half a screen, a heading on every section.
`inspect.mjs` measures all of it.

Saved to /home/user/central-auto/.taste-skill/direction.json · reprint with `node draw.mjs --show`
