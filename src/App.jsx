import { useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero';
import Header from './components/Header';
import Services from './components/Services';
import WhatsAppButton from './components/WhatsAppButton';
import HeroSearch from './components/HeroSearch';
import Inventory from './components/Inventory';
import EnquiryDialog from './components/EnquiryDialog';
import ElectricFeature from './components/ElectricFeature';
import ElectricGhana from './components/ElectricGhana';
import Categories from './components/Categories';
import useReveal from './components/useReveal';
import { vehicles, matchesCollection } from './data/vehicles';
import { interpretVehicleQuery, matchesVehicleQuery } from './lib/vehicleSearch';

const emptyFilters = { make: '', model: '', budget: '', availability: '' };
const scrollToInventory = () =>
  document.getElementById('inventory')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });

const steps = [
  ['Find what feels right.', 'Explore by body style, budget or brand. Save your favourites and take a closer look at the details.'],
  ['Let’s talk about it.', 'Ask about a vehicle, request a viewing or share the specifications of a car you want us to source.'],
  ['Know your next step.', 'Discuss availability, vehicle information and delivery arrangements with the team before proceeding.'],
];

export default function App() {
  const [filters, setFilters] = useState(emptyFilters);
  const [bodyType, setBodyType] = useState('All');
  const [savedOnly, setSavedOnly] = useState(false);
  const [sort, setSort] = useState('featured');
  const [saved, setSaved] = useState(() => {
    try {
      const value = JSON.parse(localStorage.getItem('central-auto-saved') || '[]');
      return Array.isArray(value) ? value.filter((id) => vehicles.some((v) => v.id === id)) : [];
    } catch {
      return [];
    }
  });
  const [activeQuery, setActiveQuery] = useState('');
  const [view, setView] = useState(null);
  const [toast, setToast] = useState('');

  useReveal();
  useEffect(() => {
    try { localStorage.setItem('central-auto-saved', JSON.stringify(saved)); } catch {}
  }, [saved]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  const searchSummary = useMemo(() => interpretVehicleQuery(activeQuery), [activeQuery]);
  const list = useMemo(() => {
    const result = vehicles.filter((v) =>
      matchesVehicleQuery(v, searchSummary) &&
      matchesCollection(v, bodyType) &&
      (!savedOnly || saved.includes(v.id)) &&
      (!filters.make || v.make === filters.make) &&
      (!filters.model || v.model === filters.model) &&
      (!filters.budget || v.price < Number(filters.budget)) &&
      (!filters.availability || v.status === filters.availability));
    if (sort === 'low') result.sort((a, b) => a.price - b.price);
    if (sort === 'high') result.sort((a, b) => b.price - a.price);
    if (sort === 'year') result.sort((a, b) => b.year - a.year);
    return result;
  }, [filters, bodyType, savedOnly, saved, sort, searchSummary]);

  function reset() {
    setActiveQuery('');
    setFilters(emptyFilters);
    setBodyType('All');
    setSavedOnly(false);
    setSort('featured');
  }
  function explore(type = 'All') { reset(); setBodyType(type); scrollToInventory(); }
  function toggleSaved(id) {
    setSaved((prev) => (prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]));
    setToast(saved.includes(id) ? 'Removed from saved cars' : 'Added to your saved cars');
  }
  function search(text) { reset(); setActiveQuery(text); scrollToInventory(); }
  const enquire = (service) => setView({ kind: 'enquiry', service });

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header savedCount={saved.length} savedOnly={savedOnly} onSaved={() => { setSavedOnly(true); scrollToInventory(); }} onContact={() => enquire('General enquiries')} />
      <main id="main">
        <Hero onEnquire={enquire} />
        <HeroSearch onSearch={search} />
        <ElectricFeature onEnquire={enquire} />
        <ElectricGhana onEnquire={enquire} />
        <Categories onExplore={explore} onEnquire={enquire} />
        <Inventory
          filters={filters}
          setFilters={setFilters}
          onFilterSearch={() => { setSavedOnly(false); setBodyType('All'); scrollToInventory(); }}
          searchSummary={searchSummary}
          onClearQuery={() => setActiveQuery('')}
          onRequest={() => setView({ kind: 'enquiry', channel: 'whatsapp', description: activeQuery })}
          list={list}
          bodyType={bodyType}
          setBodyType={setBodyType}
          savedOnly={savedOnly}
          setSavedOnly={setSavedOnly}
          saved={saved}
          toggleSaved={toggleSaved}
          sort={sort}
          setSort={setSort}
          onDetail={(vehicle) => setView({ kind: 'vehicle', vehicle })}
          onReset={reset}
        />
        <Services onEnquire={enquire} />

        <section className="source" id="source" aria-labelledby="source-title">
          <h2 id="source-title">Not on the site? Tell us.</h2>
          <div className="source-actions" data-reveal>
            <p>A city EV for your commute, a family SUV, a specific truck or machine. Describe what you need and your budget. You don’t need the exact model.</p>
            <div className="choice">
              <button className="button button-accent" onClick={() => setView({ kind: 'enquiry', channel: 'whatsapp' })}>Describe it on WhatsApp</button>
              <span aria-hidden="true">or</span>
              <button className="button button-outline" onClick={() => setView({ kind: 'enquiry', channel: 'email' })}>Send an email enquiry</button>
            </div>
          </div>
        </section>

        <section className="section approach" id="approach" aria-labelledby="approach-title">
          <h2 id="approach-title">From first look to next move.</h2>
          <ol className="steps">
            {steps.map(([title, copy]) => (
              <li key={title} data-reveal><h3>{title}</h3><p>{copy}</p></li>
            ))}
          </ol>
        </section>
      </main>

      <footer>
        <div className="footer-top">
          <div className="footer-cols">
            <nav aria-label="Explore">
              <h2>Explore</h2>
              <a href="#electric">Electric vehicles</a>
              <a href="#inventory">Our collection</a>
              <a href="#source">Vehicle sourcing</a>
              <a href="#services">After-sales & spare parts</a>
              <a href="#services">Equipment & manufacturing</a>
              <a href="#approach">Our approach</a>
            </nav>
            <div>
              <h2>Central Auto Ltd</h2>
              <p>Ghana</p>
              <p>Showroom details coming soon</p>
              <p>Contact details to be confirmed</p>
            </div>
          </div>
          <button className="button button-accent" onClick={() => enquire('General enquiries')}>Start a conversation</button>
        </div>
        <a className="footer-logo" href="#" aria-label="Central Auto Ltd, back to top">
          <img src="/logo.svg" alt="" width="1035" height="426" decoding="async" loading="lazy" />
        </a>
        <p className="footer-legal">© {new Date().getFullYear()} Central Auto Ltd. Design concept. Demo vehicles, images and prices.</p>
      </footer>

      <WhatsAppButton onEnquire={() => enquire('General enquiries')} />
      <EnquiryDialog view={view} onClose={() => setView(null)} />
      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  );
}
