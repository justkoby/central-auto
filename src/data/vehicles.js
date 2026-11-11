export const vehicles = [
  {id:10,make:'Dongfeng',model:'Nammi 01 EV',year:2025,price:220000,type:'Hatchback',fuel:'Electric',km:'Brand New',status:'To import',image:'/assets/01_nammi_concept.png',collections:['Everyday','Ride-hailing','Electric']},
  {id:11,make:'BYD',model:'Atto 2 (Yuan UP)',year:2025,price:295000,type:'SUV',fuel:'Electric',km:'Brand New',status:'To import',image:'/assets/02_atto2_concept.png',collections:['Everyday','SUV','Electric']},
  {id:13,make:'BYD',model:'Atto 3',year:2025,price:340000,type:'SUV',fuel:'Electric',km:'Brand New',status:'To import',image:'photo-1593941707882-a5bba14938c7',collections:['Everyday','SUV','Electric']},
  {id:14,make:'BYD',model:'Dolphin',year:2025,price:265000,type:'Hatchback',fuel:'Electric',km:'Brand New',status:'To import',image:'photo-1617788138017-80ad40651399',collections:['Everyday','Ride-hailing','Electric']},
  {id:15,make:'Volkswagen',model:'ID.6',year:2025,price:520000,type:'SUV',fuel:'Electric',km:'Brand New',status:'To import',image:'photo-1619767886558-efdc259cde1a',collections:['Premium','SUV','Electric']},
  {id:12,make:'XPeng',model:'G9 Flagship EV',year:2025,price:580000,type:'SUV',fuel:'Electric',km:'Brand New',status:'To import',image:'/assets/03_g9_concept.png',collections:['Premium','SUV','Electric']},
  {id:7,make:'Toyota',model:'Corolla LE',year:2018,price:185000,type:'Sedan',fuel:'Petrol',km:'64,000',status:'In Ghana',image:'/assets/corolla-studio.png',collections:['Everyday','Ride-hailing']},
  {id:8,make:'Toyota',model:'Vitz',year:2016,price:115000,type:'Hatchback',fuel:'Petrol',km:'72,000',status:'In Ghana',image:'/assets/vitz-studio.png',collections:['Everyday','Ride-hailing']},
  {id:9,make:'Chevrolet',model:'Matiz',year:2010,price:65000,type:'Hatchback',fuel:'Petrol',km:'89,000',status:'In Ghana',image:'/assets/matiz-studio.png',collections:['Everyday']},
  {id:1,make:'Toyota',model:'Land Cruiser Prado',year:2023,price:1250000,type:'SUV',fuel:'Diesel',km:'18,500',status:'In Ghana',image:'/assets/accra-suv.png',collections:['Premium']},
  {id:6,make:'Toyota',model:'Camry SE',year:2022,price:395000,type:'Sedan',fuel:'Petrol',km:'41,000',status:'In Ghana',image:'photo-1621007947382-bb3c3994e3fb',collections:['Everyday']},
];

export const collectionFilters = [
  {id:'All',label:'All vehicles'},
  {id:'Electric',label:'Electric (EV)'},
  {id:'Everyday',label:'Everyday & work'},
  {id:'Ride-hailing',label:'Ride-hailing'},
  {id:'Premium',label:'Premium'},
  {id:'SUV',label:'SUVs'},
  {id:'Sedan',label:'Sedans'},
  {id:'Hatchback',label:'Hatchbacks'},
];

export const matchesCollection = (vehicle, category) => category==='All'||vehicle.type===category||vehicle.fuel===category||vehicle.collections.includes(category);
export const money = n => 'GH₵ ' + n.toLocaleString('en-GH');
export const vehicleImage = (v,w=900) => v.image.startsWith('/')?v.image:`https://images.unsplash.com/${v.image}?auto=format&fit=crop&w=${w}&q=80`;
