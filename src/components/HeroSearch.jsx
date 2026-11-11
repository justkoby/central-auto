import { useState } from 'react';

const suggestions = [
  { label: 'Corolla under GH₵200k', query: 'Corolla under GH₵200k' },
  { label: 'Car for Bolt', query: 'car for Bolt' },
  { label: 'Family SUV', query: 'family SUV' },
  { label: 'Business pickup', query: 'business pickup' },
];

export default function HeroSearch({ onSearch }) {
  const [value, setValue] = useState('');
  function submit(text = value) {
    const next = String(text || '').trim();
    if (next) onSearch(next);
  }
  return (
    <section className="finder-band" aria-labelledby="finder-title" data-reveal>
      <div className="finder-intro">
        <h2 id="finder-title">Tell us what you&apos;re looking for.</h2>
        <p>Have a car or budget in mind? Describe it and we&apos;ll help you explore your options.</p>
      </div>
      <div className="finder-body">
        <form className="natural-search" role="search" onSubmit={(e) => { e.preventDefault(); submit(); }}>
          <label className="sr-only" htmlFor="hero-query">Describe the vehicle you need</label>
          <input
            id="hero-query"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            maxLength={400}
            placeholder="e.g. Corolla under GH₵200k"
            autoComplete="off"
            enterKeyHint="search"
          />
          <button type="submit" className="button button-brand">Find my car</button>
        </form>
        <div className="query-suggestions" aria-label="Suggested searches">
          {suggestions.map((s) => (
            <button
              key={s.query}
              type="button"
              onClick={() => { setValue(s.query); submit(s.query); }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
