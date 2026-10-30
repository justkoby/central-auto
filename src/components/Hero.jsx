import { useEffect, useRef, useState } from 'react';
import EvDrawing from './EvDrawing';
import { evSlides } from '../data/electric';

const SLIDE_MS = 8000;
const palettes = {
  city: { body: '#03211a', glass: '#07342a', edge: '#8fe3c4', ring: '#0f4a3b' },
  crossover: { body: '#081748', glass: '#0e2670', edge: '#a9bcff', ring: '#1a3a9a' },
};

export default function Hero({ onEnquire }) {
  const reduce = useRef(matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(!reduce.current);
  const [hover, setHover] = useState(false);
  const running = playing && !hover;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % evSlides.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [running, active]);

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="Electric vehicles at Central Auto"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <div className="hero-stage" aria-live={running ? 'off' : 'polite'}>
        {evSlides.map((s, i) => {
          const Title = i === active ? 'h1' : 'h2';
          return (
            <div
              key={s.id}
              className={`hero-slide field-${s.field} ${i === active ? 'is-active' : ''}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${evSlides.length}: ${s.label}`}
              aria-hidden={i !== active}
              inert={i !== active}
            >
              <div className="hero-art">
                {s.image ? (
                  <img src={s.image} alt={s.alt} width="2560" height="1440" fetchPriority={i === 0 ? 'high' : 'auto'} loading={i === 2 ? 'lazy' : 'eager'} decoding="async" />
                ) : (
                  <EvDrawing variant={s.art} {...palettes[s.art]} />
                )}
              </div>
              <div className="hero-copy">
                <Title>{s.title}</Title>
                <p>{s.text}</p>
                <div className="hero-actions">
                  <button className="button button-accent" onClick={() => onEnquire(s.enquiry)}>{s.cta}</button>
                  <a className="text-link" href="#inventory">Browse all vehicles</a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="charge" role="group" aria-label="Choose an electric range">
        {evSlides.map((s, i) => {
          const state = i < active ? 'full' : i === active ? 'live' : 'empty';
          return (
            <button key={s.id} className={`charge-step is-${state} ${running && i === active ? 'is-running' : ''}`} aria-current={i === active} onClick={() => setActive(i)} style={{ '--slide-ms': `${SLIDE_MS}ms` }}>
              <span className="charge-bar" aria-hidden="true"><span /></span>
              <span className="charge-label">{s.label}</span>
            </button>
          );
        })}
        <button className="charge-toggle" onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause slideshow' : 'Play slideshow'} aria-pressed={!playing}>
          {playing ? (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>
          )}
        </button>
      </div>
    </section>
  );
}
