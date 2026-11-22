import { useState } from 'react';

const suggestions = [
  { label: 'BYD under GH₵300,000', query: 'BYD under 300k' },
  { label: 'Family electric SUV', query: 'family SUV' },
  { label: 'Affordable city electric car', query: 'city car' },
  { label: 'Electric vehicle for ride-hailing', query: 'ride hailing' },
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
        <p>Describe the electric model, body style, or budget you have in mind.</p>
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
            placeholder="e.g. BYD under GH₵300k or electric SUV"
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
