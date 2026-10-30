import { useEffect, useState } from 'react';
import { money, vehicleImage, collectionFilters } from '../data/vehicles';
import CarFinder from './CarFinder';

function VehiclePicture({ vehicle, className }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [vehicle.id]);
  if (failed) {
    return <div className={`${className} picture-missing`} role="img" aria-label={`${vehicle.make} ${vehicle.model}, photograph to be added`}><span>{vehicle.make}<br />{vehicle.model}</span></div>;
  }
  return <img className={className} src={vehicleImage(vehicle, 1200)} alt={`Illustrative ${vehicle.make} ${vehicle.model}`} width="1200" height="750" loading="lazy" decoding="async" onError={() => setFailed(true)} />;
}

const contextCopy = {
  'Ride-hailing': 'Considering a car for Bolt or Uber? Explore these options, then check current platform, city and vehicle requirements before choosing. No listing here guarantees platform eligibility.',
  Everyday: 'Practical cars for commuting, family life and work. Tell us about running costs, maintenance and spare-parts access when making your enquiry.',
};

export default function Inventory({ filters, setFilters, onFilterSearch, searchSummary, onClearQuery, onRequest, list, bodyType, setBodyType, savedOnly, setSavedOnly, saved, toggleSaved, sort, setSort, onDetail, onReset }) {
  const [activeId, setActiveId] = useState(null);
  const active = list.find((v) => v.id === activeId) || list[0];

  return (
    <section className="section inventory" id="inventory" aria-labelledby="inventory-title">
      <div className="section-head" data-reveal>
        <h2 id="inventory-title">Browse the collection.</h2>
        <p>From your first car to your next workhorse. Everyday favourites, compact cars and premium finds.</p>
      </div>

      <CarFinder filters={filters} setFilters={setFilters} onSearch={onFilterSearch} />

      {searchSummary?.raw && (
        <div className="search-results-summary" role="status">
          <div>
            <h3>“{searchSummary.raw}”</h3>
            {!searchSummary.meaningful && <p>We could not read a make, model, body style or budget in that. Try one, or send the description to the team.</p>}
            <div className="interpreted-filters">{searchSummary.labels.map((label) => <span key={label}>{label}</span>)}</div>
            {searchSummary.notes.map((note) => <p key={note}>{note}</p>)}
            {searchSummary.meaningful && <p>{list.length ? `${list.length} ${searchSummary.notes.length ? 'potential matches' : 'matching listings'} in the demo collection.` : 'No listed vehicles match these preferences.'}</p>}
          </div>
          <div className="search-summary-actions">
            <button className="button button-outline" onClick={onClearQuery}>Clear search</button>
            <button className="button button-accent" onClick={onRequest}>Ask the team</button>
          </div>
        </div>
      )}

      <div className="inventory-tools">
        <div className="tabs" role="group" aria-label="Vehicle collections">
          {collectionFilters.map(({ id, label }) => (
            <button key={id} className={`tab ${!savedOnly && bodyType === id ? 'active' : ''}`} aria-pressed={!savedOnly && bodyType === id} onClick={() => { setBodyType(id); setSavedOnly(false); }}>{label}</button>
          ))}
          <button className={`tab ${savedOnly ? 'active' : ''}`} aria-pressed={savedOnly} onClick={() => setSavedOnly(!savedOnly)}>Saved</button>
        </div>
        <div className="tools-right">
          <span role="status">{list.length} {list.length === 1 ? 'vehicle' : 'vehicles'}</span>
          <label>Sort
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
              <option value="year">Newest year</option>
            </select>
          </label>
          <button className="text-link" onClick={onReset}>Reset</button>
        </div>
      </div>
      {contextCopy[bodyType] && <p className="collection-context">{contextCopy[bodyType]}</p>}

      {list.length ? (
        <div className="discover">
          <div className="discover-preview">
            <VehiclePicture vehicle={active} className="preview-image" />
            <div className="preview-body">
              <p className="preview-status">{active.status === 'In Ghana' ? 'Available in Ghana' : 'Available to import'}</p>
              <h3>{active.make} {active.model}</h3>
              <p className="preview-specs">{active.year} · Automatic · {active.fuel} · {active.km} km</p>
              <p className="preview-price">{money(active.price)}</p>
              <div className="actions">
                <button className="button button-solid" onClick={() => onDetail(active)}>View details</button>
                <button className="button button-outline" onClick={() => toggleSaved(active.id)} aria-pressed={saved.includes(active.id)}>{saved.includes(active.id) ? 'Saved' : 'Save'}</button>
              </div>
            </div>
          </div>
          <ul className="discover-list">
            {list.map((v) => (
              <li key={v.id} className={v.id === active.id ? 'is-active' : ''}>
                <button className="row-main" aria-current={v.id === active.id} onMouseEnter={() => setActiveId(v.id)} onFocus={() => setActiveId(v.id)} onClick={() => { setActiveId(v.id); if (matchMedia('(max-width: 899px)').matches) window.scrollTo({ top: document.querySelector('.discover').getBoundingClientRect().top + scrollY - 80, behavior: 'smooth' }); }}>
                  <span className="row-name"><small>{v.make}</small>{v.model}</span>
                  <span className="row-price">{money(v.price)}</span>
                </button>
                <button className={`save ${saved.includes(v.id) ? 'selected' : ''}`} onClick={() => toggleSaved(v.id)} aria-label={`${saved.includes(v.id) ? 'Unsave' : 'Save'} ${v.make} ${v.model}`} aria-pressed={saved.includes(v.id)}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9-9.4C2.1 8 4 5.5 6.8 5.5c1.9 0 3.3 1 5.2 3 1.9-2 3.3-3 5.2-3 2.8 0 4.7 2.5 3.8 5.6-1.5 4.8-9 9.4-9 9.4Z" /></svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="empty">
          <h3>No cars match just yet.</h3>
          <p>Try another filter or ask us to source your car.</p>
          <div className="actions">
            <button className="button button-accent" onClick={onRequest}>Send my request on WhatsApp</button>
            <button className="button button-outline" onClick={onReset}>Reset filters</button>
          </div>
        </div>
      )}
      <div className="inventory-foot">
        <span>Concept inventory. Prices and imagery are illustrative.</span>
        <a className="text-link" href="#source">Can’t find your car? We’ll source it</a>
      </div>
    </section>
  );
}
