// Local, deterministic query interpretation. No API calls or external model dependency.
const aliases={
 make:{Toyota:['toyota','toyata'],Chevrolet:['chevrolet','chevy','daewoo'],'Mercedes-Benz':['mercedes benz','mercedes','benz'],BMW:['bmw'],'Land Rover':['land rover','range rover'],Porsche:['porsche'],Kia:['kia'],Hyundai:['hyundai'],Honda:['honda'],Nissan:['nissan'],Volkswagen:['volkswagen','vw'],Ford:['ford']},
 model:{'Corolla':['corolla','corola'],'Vitz':['vitz','yaris'],'Matiz':['matiz'],'Prado':['prado'],'Land Cruiser':['land cruiser'],'Camry':['camry'],'GLE':['gle'],'530i':['530i'],'Range Rover Sport':['range rover sport'],'911':['911','carrera'],'Picanto':['picanto'],'Elantra':['elantra'],'Civic':['civic'],'Sentra':['sentra']},
 type:{SUV:['suv','sport utility'],Sedan:['sedan','saloon'],Hatchback:['hatchback','hatch back'],Truck:['truck','lorry','pickup','pick up'],Equipment:['excavator','equipment','machinery']},
 fuel:{Diesel:['diesel'],Petrol:['petrol','gasoline'],Electric:['electric','ev'],Hybrid:['hybrid']},
 transmission:{Automatic:['automatic','auto'],Manual:['manual']}
};
const normalize=s=>s.toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9.,₵\s-]/g,' ').replace(/\s+/g,' ').trim();
const has=(text,term)=>new RegExp('(^|[^a-z0-9])'+term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?=$|[^a-z0-9])','i').test(text);
const amount=(number,suffix='')=>Number(number.replace(/,/g,''))*(suffix.toLowerCase().startsWith('m')?1e6:suffix.toLowerCase().startsWith('k')||suffix.toLowerCase()==='thousand'?1000:1);
export function interpretVehicleQuery(raw){
 const text=normalize(raw);const filters={},labels=[],notes=[];
 for(const [field,values]of Object.entries(aliases)){
  const found=Object.entries(values).filter(([,terms])=>terms.some(t=>has(text,t))).sort((a,b)=>Math.max(...b[1].map(t=>t.length))-Math.max(...a[1].map(t=>t.length)))[0];
  if(found){filters[field]=found[0];labels.push(found[0]);}
 }
 const range=text.match(/(?:between\s+|from\s+)?(?:gh[₵s]?\s*|ghs\s*|₵\s*)?(\d[\d,.]*)\s*(k|m|million|thousand)?\s*(?:to|and|-)\s*(?:gh[₵s]?\s*|ghs\s*|₵\s*)?(\d[\d,.]*)\s*(k|m|million|thousand)?/);
 // Do not interpret plain year ranges as money.
 if(range&&!(Number(range[1])>=1990&&Number(range[1])<=2035&&Number(range[3])>=1990&&Number(range[3])<=2035&&!range[2]&&!range[4])){
  filters.minPrice=amount(range[1],range[2]||range[4]||'');filters.maxPrice=amount(range[3],range[4]||range[2]||'');
 }else{
  const money=text.match(/(?:under|below|less than|up to|maximum|max|budget(?:\s+of)?|around|about)\s*(?:gh[₵s]?\s*|ghs\s*|₵\s*)?(\d[\d,.]*)\s*(million|thousand|k|m)?/)
   ||text.match(/(?:ghs|gh₵|₵)\s*(\d[\d,.]*)\s*(million|thousand|k|m)?/)
   ||text.match(/(\d[\d,.]*)\s*(million|thousand|k|m)(?=$|\s)/);
  if(money)filters.maxPrice=amount(money[1],money[2]||'');
 }
 if(filters.maxPrice!==undefined){if(!Number.isFinite(filters.maxPrice)||filters.maxPrice<=0){delete filters.maxPrice;notes.push('Please check the budget amount.')}else labels.push('Up to GH₵'+filters.maxPrice.toLocaleString());}
 if(filters.minPrice!==undefined)labels.push('From GH₵'+filters.minPrice.toLocaleString());
 const yearRange=text.match(/\b(19\d{2}|20[0-3]\d)\s*(?:to|and|-)\s*(19\d{2}|20[0-3]\d)\b/);if(yearRange){filters.minYear=Number(yearRange[1]);filters.maxYear=Number(yearRange[2]);labels.push(filters.minYear+'–'+filters.maxYear);}
 const year=!yearRange&&text.match(/\b(19\d{2}|20[0-3]\d)\b/);if(year){filters.year=Number(year[1]);filters.yearMode=/(?:newer|onwards|onward|or later|at least)/.test(text)?'min':/(?:older|or earlier)/.test(text)?'max':'exact';labels.push(filters.year+(filters.yearMode==='min'?' or newer':filters.yearMode==='max'?' or older':''));}
 if(/\b(uber|bolt|ride hailing|ride-hailing|taxi)\b/.test(text)){filters.collection='Ride-hailing';labels.push('Ride-hailing options');notes.push('Platform eligibility needs checking for the actual vehicle.');}
 else if(/\b(everyday|commut\w*|work|small car|city car|affordable|budget car|cheap|maintenance|spare parts)\b/.test(text)){filters.collection='Everyday';labels.push('Everyday & work');}
 if(/\b(premium|luxury)\b/.test(text)){filters.collection='Premium';labels.push('Premium');}
 if(/\b(in ghana|locally available|available now|local stock)\b/.test(text)){filters.status='In Ghana';labels.push('In Ghana');}
 if(/\b(import|imported|to import)\b/.test(text)){filters.status='To import';labels.push('To import');}
 if(/\b(red|black|white|blue|silver|grey|gray|green|gold)\b/.test(text))notes.push('Colour is not recorded in this demo; the team can confirm it.');
 if(/\b(fuel efficient|fuel economy|economical|reliable|maintenance|spare parts|cheap to run)\b/.test(text))notes.push('Running costs, condition and parts access need confirmation from the team.');
 if(/\b(seats?|seater|mileage|km|kilometres?|kilometers?|condition|accident)\b/.test(text))notes.push('Seat count, mileage limits and condition preferences need confirmation from the team.');
 if(/\b(not|except|excluding|avoid|without)\b/.test(text))notes.push('Exclusions are not interpreted yet; please use the filters or ask the team.');
 if(has(text,'small car')&&!filters.type){filters.type='Hatchback';labels.push('Hatchback');}
 const meaningful=Object.keys(filters).length>0&&!/\b(not|except|excluding|avoid|without)\b/.test(text);return {raw:raw.trim(),filters,labels:[...new Set(labels)],notes:[...new Set(notes)],meaningful};
}
export function matchesVehicleQuery(v,query){
 if(!query?.raw)return true;if(!query.meaningful)return false;const f=query.filters;
 return (!f.make||v.make===f.make)&&(!f.model||normalize(v.model).includes(normalize(f.model)))&&(!f.type||v.type===f.type)&&(!f.fuel||v.fuel===f.fuel)&&(!f.transmission||(v.transmission||'Automatic')===f.transmission)&&(!f.status||v.status===f.status)&&(!f.collection||v.collections.includes(f.collection))&&(f.maxPrice===undefined||v.price<=f.maxPrice)&&(f.minPrice===undefined||v.price>=f.minPrice)&&(!f.minYear||v.year>=f.minYear)&&(!f.maxYear||v.year<=f.maxYear)&&(!f.year||(f.yearMode==='min'?v.year>=f.year:f.yearMode==='max'?v.year<=f.year:v.year===f.year));
}
