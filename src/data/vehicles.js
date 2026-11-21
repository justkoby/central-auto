export const vehicles = [
  {id:10,make:'Dongfeng',model:'Nammi 01 EV',year:2025,price:220000,type:'Hatchback',fuel:'Electric',km:'Brand New',status:'To import',image:'/assets/01_nammi_concept.png',collections:['Everyday','Ride-hailing','City']},
  {id:14,make:'BYD',model:'Dolphin',year:2025,price:265000,type:'Hatchback',fuel:'Electric',km:'Brand New',status:'To import',image:'/assets/featured-ev/cars/dolphin/full.webp',collections:['Everyday','Ride-hailing','City']},
  {id:11,make:'BYD',model:'Atto 2 (Yuan UP)',year:2025,price:295000,type:'SUV',fuel:'Electric',km:'Brand New',status:'To import',image:'/assets/02_atto2_concept.png',collections:['Everyday','SUV']},
  {id:13,make:'BYD',model:'Atto 3',year:2025,price:340000,type:'SUV',fuel:'Electric',km:'Brand New',status:'To import',image:'/assets/featured-ev/cars/atto-3/full.webp',collections:['Everyday','SUV']},
  {id:16,make:'BYD',model:'Sealion 7',year:2025,price:450000,type:'SUV',fuel:'Electric',km:'Brand New',status:'To import',image:'/assets/featured-ev/cars/sealion-7-concept/full.webp',collections:['Premium','SUV']},
  {id:15,make:'Volkswagen',model:'ID.6',year:2025,price:520000,type:'SUV',fuel:'Electric',km:'Brand New',status:'To import',image:'/assets/id6-hero-reference.jpg',collections:['Premium','SUV']},
  {id:12,make:'XPeng',model:'G9 Flagship EV',year:2025,price:580000,type:'SUV',fuel:'Electric',km:'Brand New',status:'To import',image:'/assets/03_g9_concept.png',collections:['Premium','SUV']},
];

export const collectionFilters = [
  {id:'All',label:'All electric'},
  {id:'Everyday',label:'City & commute'},
  {id:'Ride-hailing',label:'Ride-hailing'},
  {id:'SUV',label:'Electric SUVs'},
  {id:'Hatchback',label:'Hatchbacks'},
  {id:'Premium',label:'Premium & luxury'},
];

export const matchesCollection = (vehicle, category) => category==='All'||vehicle.type===category||vehicle.fuel===category||vehicle.collections.includes(category);
export const money = n => 'GH₵ ' + n.toLocaleString('en-GH');
export const vehicleImage = (v,w=900) => v.image.startsWith('/')?v.image:`https://images.unsplash.com/${v.image}?auto=format&fit=crop&w=${w}&q=80`;
