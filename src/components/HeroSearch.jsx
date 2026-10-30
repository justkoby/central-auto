import { useState } from 'react';

const suggestions = ['Corolla under 200k', 'A car for Bolt under 150k', 'SUV in Ghana', 'A truck for my business'];

export default function HeroSearch({ onSearch }) {
  const [value, setValue] = useState('');
  function submit(text = value) {
    if (text.trim()) onSearch(text.trim());
  }
  return (
    <div className="finder-band" data-reveal>
      <div className="finder-intro">
        <h2>Tell us what you need.</h2>
        <p>Describe the car, your budget or how you will use it. We search the vehicles we list.</p>
      </div>
      <div className="finder-body">
        <form className="natural-search" role="search" onSubmit={(e) => { e.preventDefault(); submit(); }}>
          <label className="sr-only" htmlFor="hero-query">Describe the vehicle you need</label>
          <input id="hero-query" value={value} onChange={(e) => setValue(e.target.value)} required maxLength={400} placeholder="An automatic Corolla under GH₵200k" autoComplete="off" />
          <button type="submit" className="button button-accent">Search</button>
        </form>
        <div className="query-suggestions" aria-label="Example searches">
          {suggestions.map((s) => (
            <button key={s} type="button" onClick={() => { setValue(s); submit(s); }}>{s}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
