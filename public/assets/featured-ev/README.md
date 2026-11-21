# Central Auto — Rivian-style three-car EV showcase

## Vehicle correction / asset status
The Toyota Vitz marketed in Ghana is petrol-powered, not an EV. This pack uses **BYD Atto 3**, **BYD Dolphin**, and a **Sealion 7-inspired SUV concept**. All three images are AI-generated design assets, **not authenticated photographs of those exact production trims or Central Auto stock**. Replace concept imagery and placeholder prices with approved actual inventory before release.

## Contents
- `cars/*/full.png` and `full.webp`: transparent full side-view car cutout
- `cars/*/body-no-wheels.png` and `.webp`: car body with wheel areas cut out
- `cars/*/wheel-front.png`, `wheel-rear.png` and `.webp`: independent round wheel cutouts
- `manifest.json`: intrinsic image dimensions + exact wheel centres, diameters as fractions of the full image
- `overview.jpg`: quick reference
- `ANIMATION_PROMPT.md`: comprehensive implementation instructions for Antigravity

## Recommended implementation
The actual **spinning wheel effect** must be built in the browser, NOT baked into these static PNG files. Overlay the separate wheel layers on top of the body image using the supplied wheel centers. Use CSS absolute positioning from `manifest.json`; let wheel layers rotate with GSAP, while car body translates horizontally. Wheel artwork is generated from the initial image and crop edges may need fine-tuning by a designer.

Asset coordinate rule: all images in each vehicle are placed relative to the full PNG's *intrinsic* pixel size. For a responsive car wrapper of width W, the wheel center x = cx * W, y = cy * (W * imageHeight/imageWidth), and wheel diameter = diameter * W. Wheel `left = cx*100%`, `top = cy*100%`, `width = diameter*100%`, `transform: translate(-50%,-50%) rotate(...)`.

When the car travels x pixels in the displayed render and wheel radius is R displayed pixels, rotation in radians is `-x/R` (reverse sign if facing direction/scroll direction changes). Convert to degrees: `rotationDeg = -(distancePx / radiusPx) * 180 / Math.PI`. Do not indiscriminately rotate brakes or wheel arch overlays.

Recommended production validation: verify wheel mask alignment at 320px/768px/1440px; optimize LCP; respect `prefers-reduced-motion`; detach ScrollTrigger on unmount; retain keyboard and touch navigation.
