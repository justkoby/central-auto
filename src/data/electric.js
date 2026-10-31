// Electric concept vehicles and guidance
export const evConceptVehicles = [
  {
    id: 'nammi-01',
    watermark: '01',
    name: 'Nammi 01',
    make: 'Dongfeng',
    fullName: 'Dongfeng Nammi 01',
    badge: 'City EV',
    tagline: 'Compact agility for everyday electric mobility',
    description: 'Effortless urban commuting with modern frameless styling and zero fuel expense.',
    priceLabel: 'Starting from GH₵ 220,000',
    priceValue: 220000,
    range: '430 km',
    acceleration: '9.5s',
    charging: '30 min fast charge',
    battery: '42.3 kWh',
    image: '/assets/01_nammi_concept.png',
    alt: 'White Dongfeng Nammi 01 compact electric car side profile',
    enquiry: 'Dongfeng Nammi 01 (City EV)',
    specs: [
      { label: 'Range', value: 'Up to 430 km (CLTC)' },
      { label: 'Battery', value: '42.3 kWh Lithium Iron' },
      { label: 'Charging', value: '30%–80% in 30 mins' },
      { label: 'Power', value: '70 kW (95 hp)' },
      { label: 'Cockpit', value: '12.8" Floating Touchscreen' },
      { label: 'Convenience', value: 'Frameless Doors & L2 Pilot' },
    ],
  },
  {
    id: 'atto-2',
    watermark: '02',
    name: 'BYD Atto 2',
    make: 'BYD',
    fullName: 'BYD Atto 2 (Yuan UP)',
    badge: 'Smart Crossover',
    tagline: 'The versatile crossover for modern family journeys',
    description: 'Powered by BYD’s ultra-safe Blade Battery and e-Platform 3.0, built for confidence on every Ghanaian road.',
    priceLabel: 'Starting from GH₵ 295,000',
    priceValue: 295000,
    range: '401 km',
    acceleration: '7.9s',
    charging: 'High-speed DC Fast Charge',
    battery: '45.1 kWh Blade',
    image: '/assets/02_atto2_concept.png',
    alt: 'Silver BYD Atto 2 electric crossover SUV side profile',
    enquiry: 'BYD Atto 2 / Yuan UP (Electric Crossover)',
    specs: [
      { label: 'Range', value: 'Up to 401 km (CLTC)' },
      { label: 'Battery', value: '45.1 kWh Ultra-Safe Blade' },
      { label: 'Platform', value: 'BYD e-Platform 3.0' },
      { label: 'Charging', value: 'DC Fast Charging' },
      { label: 'Tech', value: 'Rotating Screen & VTOL Power' },
      { label: 'Safety', value: '360° Cameras & L2 ADAS' },
    ],
  },
  {
    id: 'xpeng-g9',
    watermark: '03',
    name: 'XPeng G9',
    make: 'XPeng',
    fullName: 'XPeng G9 Flagship SUV',
    badge: 'Flagship Luxury',
    tagline: 'Flagship luxury with ultra-fast 800V charging',
    description: 'Pioneering 800V Silicon Carbide architecture, dual 2K displays and concert-grade acoustics for unmatched refinement.',
    priceLabel: 'Starting from GH₵ 580,000',
    priceValue: 580000,
    range: '702 km',
    acceleration: '3.9s',
    charging: '800V Ultra-Fast (200km in 5 min)',
    battery: '98 kWh 800V',
    image: '/assets/03_g9_concept.png',
    alt: 'Silver XPeng G9 luxury electric SUV side profile',
    enquiry: 'XPeng G9 Flagship Luxury SUV',
    specs: [
      { label: 'Range', value: 'Up to 702 km (CLTC)' },
      { label: 'Architecture', value: '800V Silicon Carbide' },
      { label: '0–100 km/h', value: '3.9s AWD Performance' },
      { label: 'Charging Speed', value: 'Up to 200 km in 5 mins' },
      { label: 'Sound System', value: 'Dynaudio 28-speaker 7.1.4' },
      { label: 'Suspension', value: 'Dual-Chamber Air Suspension' },
    ],
  },
];

export const evSlides = evConceptVehicles;

// General guidance for people considering an EV.
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
