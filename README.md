# Central Auto — React dealership concept

React 19 + Vite, with a reference-inspired full-bleed automotive hero and interactive inventory.

## Develop
```sh
npm install
npm run dev
```

## Build and deploy
```sh
npm run build
npm run preview
```
Deploy `dist/` to any static host. The Vite entry is root `index.html`.

## Structure
- `src/App.jsx`: application state, filters, saved cars and page composition
- `src/components/Hero.jsx`: three-slide EV hero with the charge-level control (autoplay has a pause button and is off under reduced motion)
- `src/components/EvDrawing.jsx`: teaser silhouettes used where no EV photograph exists
- `src/components/ElectricFeature.jsx`, `ElectricGhana.jsx`: featured EV and the "going electric" guidance
- `src/components/Categories.jsx`: conventional and commercial categories
- `src/components/Inventory.jsx`, `CarFinder.jsx`: sticky-preview vehicle discovery, filters, sort, saved cars
- `src/components/Services.jsx`, `EnquiryDialog.jsx`, `WhatsAppButton.jsx`: services and enquiry flows
- `src/data/electric.js`: EV categories, guidance and services copy (no stock or prices)
- `src/styles/tokens.css`, `src/styles/site.css`: design tokens and styles

See `experiment-report/REPORT.md` for the design experiment (branch `experiment/four-design-skills`).

## Demo scope
All stock, pricing, mileage and availability are illustrative. Unsplash inventory images may differ from named models. The Volkswagen hero photograph is temporarily taken from the user-supplied Swiss Group reference (`https://swissgroupauto.com/media/homepage/IDCROZZ.jpg`) for concept review; replace it with approved/licensed Central Auto photography before public launch. Brand names are text placeholders. No testimonials or performance statistics are invented.

Favourites persist only in the visitor's browser. Enquiries preview validation and confirmation but do not send data. CMS, live leads and order tracking are deferred. No private credentials are included.

## Everyday vehicles and enquiries
Collection filters include Everyday & work, Ride-hailing options, Premium and body styles. Ride-hailing is a browsing category, not a certification of platform eligibility. The demo includes Corolla, Vitz and Matiz records with illustrative specifications and prices. Customers can describe any vehicle, use case, budget or service need and prepare an email or WhatsApp message. Set the approved contact details in `src/data/business.js` to enable handoff; until then the demo offers message copying and clearly confirms nothing was sent.

The added studio car images and Accra SUV setting are AI-generated concept imagery, not photographs of dealership stock. Replace them with consistent approved vehicle photography before launch.

## Hero text finder
`src/components/HeroSearch.jsx` provides the reusable search UI. `src/lib/vehicleSearch.js` interprets common makes/model aliases, body styles, automatic/manual, fuel type, budgets (including k/m), year ranges, availability and curated use-case tags. This first release is deterministic browser-local search, not a live AI integration, with no model API fees or credentials. Results come only from inventory. Unsupported preferences are surfaced for confirmation, and unrecognised or negative requests ask for clarification rather than returning arbitrary stock. Unmatched requests carry the original description into the WhatsApp/email draft. For another website, reuse the UI and replace the domain-specific interpreter and catalogue fields.

Services use six tiles in three columns and two rows on desktop. Light studio images blend into matching grey tiles through CSS compositing and soft edge masks; existing product shadows and reflections are retained. Tablet and phone layouts adapt to their available width.

## Mobile layout
Below 600px the hero uses a stacked composition: search, an uncropped vehicle image, compact specifications and slide controls. Text entry and native form controls use 16px text, main controls have touch-sized targets, and narrow layouts reflow without relying on desktop image cropping. Phone safe-area spacing is included for the WhatsApp widget. Visual browser QA was unavailable in this environment; mobile changes were based on the supplied iPhone screenshot and code/render checks.
