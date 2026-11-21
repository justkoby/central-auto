import { conventionalCategories } from '../data/electric';

export default function Categories({ onExplore, onEnquire }) {
  return (
    <section className="section categories" aria-labelledby="categories-title">
      <div className="section-head" data-reveal>
        <h2 id="categories-title">Electric for every lifestyle.</h2>
        <p>Explore city hatchbacks, family electric SUVs, commercial vehicles, and equipment curated for Ghana.</p>
      </div>
      <ul className="panels">
        {conventionalCategories.map((c) => (
          <li key={c.id} className={`panel panel-${c.id}`}>
            <button onClick={() => (c.action.type === 'explore' ? onExplore(c.action.value) : onEnquire(c.action.value))}>
              <img src={c.image} alt={c.alt} loading="lazy" decoding="async" width="1672" height="941" />
              <span className="panel-text">
                <strong>{c.label}</strong>
                <span>{c.copy}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
