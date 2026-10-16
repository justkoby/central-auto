export const vehicles = [
 {id:7,make:'Toyota',model:'Corolla LE',year:2018,price:185000,type:'Sedan',fuel:'Petrol',km:'64,000',status:'In Ghana',image:'/assets/corolla-studio.png',collections:['Everyday','Ride-hailing']},
 {id:8,make:'Toyota',model:'Vitz',year:2016,price:115000,type:'Hatchback',fuel:'Petrol',km:'72,000',status:'In Ghana',image:'/assets/vitz-studio.png',collections:['Everyday','Ride-hailing']},
 {id:9,make:'Chevrolet',model:'Matiz',year:2010,price:65000,type:'Hatchback',fuel:'Petrol',km:'89,000',status:'In Ghana',image:'/assets/matiz-studio.png',collections:['Everyday']},
 {id:1,make:'Toyota',model:'Land Cruiser Prado',year:2023,price:1250000,type:'SUV',fuel:'Diesel',km:'18,500',status:'In Ghana',image:'/assets/accra-suv.png',collections:['Premium']},
 {id:2,make:'Mercedes-Benz',model:'GLE 450 4MATIC',year:2022,price:980000,type:'SUV',fuel:'Petrol',km:'26,400',status:'In Ghana',image:'photo-1618843479313-40f8afb4b4d8',collections:['Premium']},
 {id:3,make:'BMW',model:'530i M Sport',year:2021,price:580000,type:'Sedan',fuel:'Petrol',km:'34,200',status:'In Ghana',image:'photo-1555215695-3004980ad54e',collections:['Premium']},
 {id:4,make:'Land Rover',model:'Range Rover Sport',year:2023,price:1650000,type:'SUV',fuel:'Petrol',km:'12,800',status:'To import',image:'photo-1606664515524-ed2f786a0bd6',collections:['Premium']},
 {id:5,make:'Porsche',model:'911 Carrera',year:2022,price:1900000,type:'Coupe',fuel:'Petrol',km:'16,100',status:'To import',image:'photo-1503376780353-7e6692767b70',collections:['Premium']},
 {id:6,make:'Toyota',model:'Camry SE',year:2022,price:395000,type:'Sedan',fuel:'Petrol',km:'41,000',status:'In Ghana',image:'photo-1621007947382-bb3c3994e3fb',collections:['Everyday']}
];
export const collectionFilters=[{id:'All',label:'All vehicles'},{id:'Everyday',label:'Everyday & work'},{id:'Ride-hailing',label:'Ride-hailing options'},{id:'Premium',label:'Premium'},{id:'SUV',label:'SUVs'},{id:'Sedan',label:'Sedans'},{id:'Hatchback',label:'Hatchbacks'},{id:'Coupe',label:'Coupes'}];
export const matchesCollection = (vehicle, category) => category==='All'||vehicle.type===category||vehicle.collections.includes(category);
export const money = n => 'GH₵ ' + n.toLocaleString('en-GH');
export const vehicleImage = (v,w=900) => v.image.startsWith('/')?v.image:`https://images.unsplash.com/${v.image}?auto=format&fit=crop&w=${w}&q=80`;
