# Antigravity build brief — Central Auto featured EV showcase

Repo: https://github.com/justkoby/central-auto (React 19 + Vite). Work on a new feature branch; do not push to main or deploy without review.

Build a responsive, high-impact Rivian-inspired vehicle rail **directly after the existing hero**. Replicate the visual principles of the screenshot the user provided: warm-white canvas, oversized dark or light-gray model label behind the car, huge side-profile cutouts, second vehicle partly visible at the right edge, generous space, bottom-center tagline/specs and two pill CTAs. Do not use Rivian logos or copy their site-specific artwork. Preserve Central Auto branding and other existing sections.

### Featured models
1. BYD ATTO 3 — electric C-SUV, image `cars/atto-3/`
2. BYD DOLPHIN — compact electric hatchback, image `cars/dolphin/`
3. SEALION 7 — electric performance SUV, image `cars/sealion-7-concept/` (**this graphic is AI concept, not an official model photograph**)

Never invent confirmed Central Auto prices, stock status, range, horsepower or financing offers. Show a `Price on enquiry` placeholder until connected to real inventory; or read actual values already in `src/data/vehicles` if specifically verified. Button labels: `Explore vehicle` and `Estimate payment`. The estimator opens the previously discussed *illustrative only* financing section (government-worker interest enquiries, not an approved CAGD scheme).

### Wheel animation (priority)
Each car has `body-no-wheels.webp`, `wheel-front.webp`, `wheel-rear.webp`, and `full.webp` fallback. Use manifest normalized coordinates to position two wheel layers precisely relative to the full body image; render body and wheels in the same aspect-ratio box. Use CSS `transform-origin: center center`; wheels turn in proportion to *actual horizontal distance* traveled in the rendered coordinate system, `degrees = distancePx/radiusPx * (180/Math.PI)`, reversing sign as appropriate. The body and wheels translate as one group; rotate wheels in child wrappers so transforms do not overwrite translation. Body may bob by 1-2px, never jump vertically. Do not rotate the entire car or mask. Use subtle ground shadow, speed eases, and small parallax in typography, with no huge motion blur. Match wheel direction with direction of car travel.

### Scroll motion
Use `gsap` and `ScrollTrigger` (`npm i gsap`) on desktop. Pin the showcase when it reaches the top of the viewport; scrub across three featured vehicles with a forward drive/exit from center towards left and next vehicle entering from the right. Keep all title/content and wheels synchronized with scroll progress. The following car should be slightly visible on initial view, like user's Rivian screenshot. Release pin after third car. Keep vertical scroll functioning normally.

### Responsive and accessibility
Mobile under 768px: use a touch/swipeable horizontal carousel with scroll snapping, no pinned scrolling (or a much shorter motion); still add wheel rotation linked to swipe position. Never lock the document. Buttons must be tappable; copy must fit. For `prefers-reduced-motion: reduce`, disable pin/rotating wheels and use static images and manually accessible carousel. Keyboard navigation via prev/next buttons and visible focus rings. Lazy-load out-of-view images, reserve aspect ratio, optimize images.

### Implementation details
- Make `FeaturedEVShowcase.jsx` plus adjacent CSS; import in `src/App.jsx` after `<Hero .../>` and before the car finder/inventory.
- Populate via a small car manifest; ideally use actual values in `src/data/vehicles` where verified.
- Place assets under `public/assets/featured-ev/`. Preserve the folder names and files.
- Recalculate geometry with ResizeObserver/ScrollTrigger.refresh() on breakpoint changes and orientation changes; cleanup all GSAP context and listeners on React unmount.
- Validate `npm run build`, actual image asset paths and 320px, 390px, 768px, 1440px layouts.
- Do not add an unapproved financing offer or a fake starting price.

### Important: about the asset extraction
These are AI-generated cutouts and automatically separated wheel layers for prototyping. Expect minor misalignment at the wheel arch; inspect the body-plus-wheels composition at 100% size. The original `full.webp` image is fallback if layer alignment is imperfect. A production replacement should use approved manufacturer/model assets with more exact wheel extractions.
