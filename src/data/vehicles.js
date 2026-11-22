export const vehicles = [
  {
    id: 13,
    make: 'BYD',
    model: 'Atto 3',
    year: 2025,
    price: 435000,
    priceLabel: 'Indicative Price',
    priceNote: 'Indicative pricing in Ghana. Final price confirmed on order.',
    type: 'SUV',
    fuel: 'Electric',
    km: '0 km (Brand New)',
    range: '420 km WLTP',
    battery: '60.5 kWh Blade',
    seats: 5,
    charging: '88 kW DC Fast Charge (30–80% in 29 mins)',
    transmission: 'Automatic',
    status: 'Enquire for Availability',
    availabilityTier: 'Enquire for Availability',
    ghanaAvailability: 'A', // Verified in Ghanaian market
    visibility: 'public',
    image: '/assets/featured-ev/cars/atto-3/full.webp',
    collections: ['Everyday', 'SUV', 'Enquire for Availability']
  },
  {
    id: 14,
    make: 'BYD',
    model: 'Dolphin',
    year: 2025,
    price: 285000,
    priceLabel: 'Indicative Price',
    priceNote: 'Indicative pricing in Ghana. Final price confirmed on order.',
    type: 'Hatchback',
    fuel: 'Electric',
    km: '0 km (Brand New)',
    range: '427 km WLTP',
    battery: '44.9 kWh Blade',
    seats: 5,
    charging: '60 kW DC Fast Charge',
    transmission: 'Automatic',
    status: 'Enquire for Availability',
    availabilityTier: 'Enquire for Availability',
    ghanaAvailability: 'A', // Verified in Ghanaian market
    visibility: 'public',
    image: '/assets/featured-ev/cars/dolphin/full.webp',
    collections: ['Everyday', 'Ride-hailing', 'City', 'Hatchback', 'Enquire for Availability']
  },
  {
    id: 10,
    make: 'Dongfeng',
    model: 'Nammi 01 EV',
    year: 2025,
    price: 220000,
    priceLabel: 'Indicative Price',
    priceNote: 'Indicative pricing in Ghana. Final price confirmed on order.',
    type: 'Hatchback',
    fuel: 'Electric',
    km: '0 km (Brand New)',
    range: '430 km CLTC',
    battery: '42.3 kWh LFP',
    seats: 5,
    charging: 'DC Fast Charge (30–80% in 30 mins)',
    transmission: 'Automatic',
    status: 'Enquire for Availability',
    availabilityTier: 'Enquire for Availability',
    ghanaAvailability: 'A', // Verified in Ghanaian market
    visibility: 'public',
    image: '/assets/01_nammi_concept.png',
    collections: ['Everyday', 'Ride-hailing', 'City', 'Hatchback', 'Enquire for Availability']
  },
  {
    id: 11,
    make: 'BYD',
    model: 'Atto 2 (Yuan UP)',
    year: 2025,
    price: 310000,
    priceLabel: 'Indicative Price',
    priceNote: 'Indicative import price. Sourcing & arrival logistics confirmed by Central Auto.',
    type: 'SUV',
    fuel: 'Electric',
    km: '0 km (Brand New)',
    range: '401 km CLTC',
    battery: '45.1 kWh Blade',
    seats: 5,
    charging: '65 kW DC Fast Charge',
    transmission: 'Automatic',
    status: 'Available to Order',
    availabilityTier: 'Available to Order',
    ghanaAvailability: 'B', // Central Auto verified sourcing capability
    visibility: 'public',
    image: '/assets/02_atto2_concept.png',
    collections: ['Everyday', 'SUV', 'Available to Order']
  },
  {
    id: 16,
    make: 'BYD',
    model: 'Sealion 7',
    year: 2025,
    price: 680000,
    priceLabel: 'Indicative Price',
    priceNote: 'Indicative import price. Sourcing & arrival logistics confirmed by Central Auto.',
    type: 'SUV',
    fuel: 'Electric',
    km: '0 km (Brand New)',
    range: '502 km WLTP',
    battery: '82.5 kWh Blade',
    seats: 5,
    charging: '150 kW Ultra-Fast DC Charge',
    transmission: 'Automatic',
    status: 'Available to Order',
    availabilityTier: 'Available to Order',
    ghanaAvailability: 'B', // Central Auto verified sourcing capability
    visibility: 'public',
    image: '/assets/featured-ev/cars/sealion-7-concept/full.webp',
    collections: ['Premium', 'SUV', 'Available to Order']
  },
  {
    id: 12,
    make: 'XPeng',
    model: 'G9 Flagship EV',
    year: 2025,
    price: 690000,
    priceLabel: 'Indicative Price',
    priceNote: 'Indicative import price. Sourcing & arrival logistics confirmed by Central Auto.',
    type: 'SUV',
    fuel: 'Electric',
    km: '0 km (Brand New)',
    range: '702 km CLTC',
    battery: '98 kWh 800V',
    seats: 5,
    charging: '800V Silicon Carbide (200km in 5 mins)',
    transmission: 'Automatic',
    status: 'Available to Order',
    availabilityTier: 'Available to Order',
    ghanaAvailability: 'B', // Central Auto verified sourcing capability
    visibility: 'public',
    image: '/assets/03_g9_concept.png',
    collections: ['Premium', 'SUV', 'Available to Order']
  },
  {
    id: 15,
    make: 'Volkswagen',
    model: 'ID.6',
    year: 2025,
    price: 540000,
    priceLabel: 'Indicative Price',
    priceNote: 'Indicative import price. Sourcing & arrival logistics confirmed by Central Auto.',
    type: 'SUV',
    fuel: 'Electric',
    km: '0 km (Brand New)',
    range: '588 km CLTC',
    battery: '84.8 kWh',
    seats: 7,
    charging: '100 kW DC Fast Charge',
    transmission: 'Automatic',
    status: 'Available to Order',
    availabilityTier: 'Available to Order',
    ghanaAvailability: 'B', // Central Auto verified sourcing capability
    visibility: 'public',
    image: '/assets/id6-hero-reference.jpg',
    collections: ['Premium', 'SUV', 'Available to Order']
  },
];

// Active public inventory filtering out non-public or unverified models
export const publicVehicles = vehicles.filter(v => v.visibility === 'public');

export const collectionFilters = [
  { id: 'All', label: 'All Electric' },
  { id: 'Available to Order', label: 'Available to Order' },
  { id: 'Enquire for Availability', label: 'Enquire for Availability' },
  { id: 'SUV', label: 'Electric SUVs' },
  { id: 'Hatchback', label: 'Hatchbacks' },
  { id: 'Everyday', label: 'City & Commute' },
  { id: 'Premium', label: 'Executive & Luxury' },
];

export const matchesCollection = (vehicle, category) =>
  category === 'All' ||
  vehicle.type === category ||
  vehicle.status === category ||
  vehicle.availabilityTier === category ||
  vehicle.collections?.includes(category);
export const money = n => 'GH₵ ' + n.toLocaleString('en-GH');
export const vehicleImage = (v,w=900) => v.image.startsWith('/')?v.image:`https://images.unsplash.com/${v.image}?auto=format&fit=crop&w=${w}&q=80`;
