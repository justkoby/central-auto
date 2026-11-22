import { useState } from 'react';
import { conventionalCategories } from '../data/electric';
import '../styles/categories.css';

export default function Categories({ onExplore, onEnquire }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="section categories-editorial" id="categories" aria-labelledby="categories-title">
      <div className="section-head" data-reveal>
        <div>
          <span className="editorial-eyebrow">Vehicle Segments</span>
          <h2 id="categories-title">Electric for every lifestyle.</h2>
        </div>
        <p>Explore city hatchbacks, family electric SUVs, commercial vehicles, and equipment curated for Ghana.</p>
      </div>

      <div className="editorial-gallery" role="region" aria-label="Vehicle Category Gallery">
        {conventionalCategories.map((c, index) => {
          const isHovered = hoveredId === c.id;
          return (
            <article
              key={c.id}
              className={`editorial-panel editorial-panel--${c.id}${isHovered ? ' is-active' : ''}`}
              onMouseEnter={() => setHoveredId(c.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(c.id)}
              onBlur={() => setHoveredId(null)}
            >
              <div className="editorial-media">
                <img
                  src={c.image}
                  alt={c.alt}
                  loading="lazy"
                  decoding="async"
                  width="1672"
                  height="941"
                  className="editorial-img"
                />
                <div className="editorial-scrim" aria-hidden="true" />
              </div>

              <div className="editorial-content">
                <div className="editorial-top-badge">
                  <span className="editorial-num">0{index + 1}</span>
                  <span className="editorial-tag">{c.id.toUpperCase()}</span>
                </div>

                <div className="editorial-bottom">
                  <h3 className="editorial-title">{c.label}</h3>
                  <p className="editorial-desc">{c.copy}</p>

                  <button
                    type="button"
                    className="editorial-explore-btn"
                    onClick={() =>
                      c.action.type === 'explore'
                        ? onExplore(c.action.value)
                        : onEnquire(c.action.value)
                    }
                  >
                    <span>{c.action.type === 'explore' ? 'Explore Category' : 'Enquire Now'}</span>
                    <svg viewBox="0 0 20 20" fill="currentColor" className="editorial-arrow" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
