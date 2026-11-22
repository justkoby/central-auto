import { useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero';
import Header from './components/Header';
import HowItWorks from './components/HowItWorks';
import WhatsAppButton from './components/WhatsAppButton';
import BackToTop from './components/BackToTop';
import Inventory from './components/Inventory';
import EnquiryDialog from './components/EnquiryDialog';
import ElectricGhana from './components/ElectricGhana';
import Categories from './components/Categories';
import FeaturedEVShowcase from './components/FeaturedEVShowcase';
import RunningCostComparison from './components/RunningCostComparison';
import useReveal from './components/useReveal';
import { vehicles, publicVehicles, matchesCollection } from './data/vehicles';
import { interpretVehicleQuery, matchesVehicleQuery } from './lib/vehicleSearch';

const emptyFilters = { make: '', model: '', budget: '', availability: '' };
const scrollToInventory = () =>
  document.getElementById('inventory')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });

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
    const sourceList = publicVehicles || vehicles;
    const result = sourceList.filter((v) =>
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
  const enquire = (service) => setView({ kind: 'enquiry', service });

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header savedCount={saved.length} savedOnly={savedOnly} onSaved={() => { setSavedOnly(true); scrollToInventory(); }} onContact={() => enquire('General enquiries')} />
      <main id="main">
        {/* 1. Cinematic hero video with SpecularButton CTA */}
        <Hero onEnquire={enquire} onDetail={(vehicle) => setView({ kind: 'vehicle', vehicle })} />

        {/* 2. Interactive EV showcase rail */}
        <FeaturedEVShowcase
          onEnquire={enquire}
          onDetail={(vehicle) => setView({ kind: 'vehicle', vehicle })}
          onEstimate={() => {
            const el = document.getElementById('running-costs');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 3. Browse the Collection */}
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

        {/* 4. How It Works (Going electric, made simple) */}
        <HowItWorks />

        {/* 5. Charging & Running-Cost Calculator */}
        <RunningCostComparison onEnquire={enquire} />

        {/* 6. Vehicle Segments & EV Education */}
        <Categories onExplore={explore} onEnquire={enquire} />
        <ElectricGhana onEnquire={enquire} />

        {/* 7. Final vehicle sourcing enquiry CTA */}
        <section className="source" id="source" aria-labelledby="source-title">
          <h2 id="source-title">Not on the site? Tell us.</h2>
          <div className="source-actions" data-reveal>
            <p>A city EV for your commute, a family SUV, a specific truck or machine. Describe what you need and your budget. You don’t need the exact model.</p>
            <div className="choice">
              <button className="button button-on-brand" onClick={() => setView({ kind: 'enquiry', channel: 'whatsapp' })}>Describe it on WhatsApp</button>
              <span aria-hidden="true">or</span>
              <button className="button button-outline" onClick={() => setView({ kind: 'enquiry', channel: 'email' })}>Send an email enquiry</button>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-brand-col">
              <a className="footer-logo" href="#" aria-label="Central Auto Ltd, back to top">
                <img src="/logo.svg" alt="Central Auto Ltd" width="1035" height="426" decoding="async" loading="lazy" />
              </a>
              <p className="footer-tagline">
                Premium electric vehicles, verified sourcing, and advisory for Ghana.
              </p>
            </div>

            <div className="footer-cols">
              <nav aria-label="Explore" className="footer-nav-col">
                <h2>Explore</h2>
                <div className="footer-nav-grid">
                  <a href="#featured-ev">Featured EVs</a>
                  <a href="#inventory">Browse Collection</a>
                  <a href="#how-it-works">How It Works</a>
                  <a href="#running-costs">Running Costs</a>
                  <a href="#source">Vehicle Sourcing</a>
                </div>
              </nav>
              <div className="footer-contact-col">
                <h2>Central Auto Ltd</h2>
                <p>Accra, Ghana</p>
                <p>EV Advisory & Certified Sourcing</p>
              </div>
            </div>

            <div className="footer-cta-col">
              <h2>Get in Touch</h2>
              <button className="button button-on-brand" onClick={() => enquire('General enquiries')}>Start a conversation</button>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-legal">© {new Date().getFullYear()} Central Auto Ltd. All rights reserved. Pricing and specifications illustrative.</p>
          </div>
        </div>
      </footer>

      <WhatsAppButton onEnquire={() => enquire('General enquiries')} />
      <BackToTop />
      <EnquiryDialog view={view} onClose={() => setView(null)} />
      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  );
}
