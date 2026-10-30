// Electric-first content. These are vehicle *categories*, not Central Auto stock:
// no prices, no stock counts and no performance figures are claimed. Availability and
// pricing are confirmed with the team through the enquiry flow.
export const evSlides = [
  {
    id: 'affordable',
    label: 'Affordable',
    title: 'Your first electric car.',
    text: 'Compact city EVs for the daily commute. Tell us your budget and we will look into what is available.',
    cta: 'Ask about city EVs',
    enquiry: 'Affordable electric vehicles',
    art: 'city',
    field: 'green',
  },
  {
    id: 'everyday',
    label: 'Everyday',
    title: 'Electric for every day.',
    text: 'Family-sized crossovers and hatchbacks for school runs, work and weekends away.',
    cta: 'Ask about everyday EVs',
    enquiry: 'Everyday electric vehicles',
    art: 'crossover',
    field: 'cobalt',
  },
  {
    id: 'premium',
    label: 'Premium',
    title: 'Seven seats. Zero tailpipe.',
    text: 'The Volkswagen ID.6 is an electric SUV built around space for the whole family.',
    cta: 'Enquire about the ID.6',
    enquiry: 'Volkswagen ID.6 (premium electric SUV)',
    image: '/assets/id6-hero-reference.jpg',
    alt: 'Purple Volkswagen ID.6 electric SUV in a blue studio',
    field: 'photo',
  },
];

// General guidance for people considering an EV. Deliberately qualitative: no tariffs,
// incentives or network statistics are asserted. Central Auto should confirm before launch.
export const evQuestions = [
  {
    q: 'Where will you charge?',
    a: 'Most charging happens at home or work overnight. Public charging in Ghana is still developing, so we talk through your daily routes before you choose.',
  },
  {
    q: 'Does the connector fit?',
    a: 'Electric cars are built for different charging connector standards. We check the car’s connector against the chargers you can actually use.',
  },
  {
    q: 'What about the battery?',
    a: 'The battery is the heart of an EV. Ask for its condition and warranty terms in writing, and we will help you get them.',
  },
  {
    q: 'Who looks after it?',
    a: 'Service and parts matter as much as the purchase. Central Auto’s after-sales team supports the cars we supply.',
  },
];

export const conventionalCategories = [
  { id: 'everyday', label: 'Everyday cars', copy: 'Corolla, Vitz and compact city cars.', image: '/assets/corolla-studio.png', alt: 'Silver Toyota Corolla in a blue studio', action: { type: 'explore', value: 'Everyday' } },
  { id: 'suv', label: 'SUVs', copy: 'Room for more, on every road.', image: '/assets/accra-suv.png', alt: 'Silver Toyota SUV in an Accra coastal setting at dusk', action: { type: 'explore', value: 'SUV' } },
  { id: 'ride', label: 'Ride-hailing', copy: 'Options for Bolt and Uber drivers.', image: '/assets/vitz-studio.png', alt: 'Silver Toyota Vitz hatchback in a blue studio', action: { type: 'explore', value: 'Ride-hailing' } },
  { id: 'commercial', label: 'Trucks & equipment', copy: 'Light and heavy-duty trucks, machinery.', image: '/assets/service-commercial.png', alt: 'Commercial truck and yellow excavator', action: { type: 'enquire', value: 'Trucks, equipment & machinery' } },
];

export const services = [
  { title: 'Vehicle sourcing', copy: 'Not on the site? Describe what you need and we facilitate sourcing from manufacturers or their designated representatives.', enquiry: 'Vehicle sourcing', button: 'Describe what you need', image: '/assets/accra-suv.png', alt: 'Toyota SUV in an Accra coastal setting' },
  { title: 'After-sales support', copy: 'Mechanical and technical support for the road ahead.', enquiry: 'Mechanical & technical support', button: 'Ask about servicing', image: '/assets/service-aftersales.png', alt: 'Technician inspecting a vehicle' },
  { title: 'Spare parts', copy: 'Tell us your make, model and the part you need. We will look into suitable options.', enquiry: 'Spare parts', button: 'Enquire about a part', image: '/assets/service-parts.png', alt: 'Brake discs, pads, filters and spark plugs' },
  { title: 'Trucks, equipment & assembly', copy: 'Light and heavy-duty trucks, machinery, vehicle assembly and component manufacturing for your business.', enquiry: 'Trucks, equipment, assembly & components', button: 'Discuss a project', image: '/assets/service-assembly.png', alt: 'Vehicle chassis and engine components' },
];
