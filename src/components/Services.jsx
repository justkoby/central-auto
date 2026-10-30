import { services } from '../data/electric';

export default function Services({ onEnquire }) {
  return (
    <section className="section services-section" id="services" aria-labelledby="services-title">
      <div className="section-head" data-reveal>
        <h2 id="services-title">More than the vehicle.</h2>
        <p>Sourcing, after-sales support, spare parts and commercial equipment, handled by one team.</p>
      </div>
      <div className="service-list">
        {services.map((s, i) => (
          <article key={s.title} className={`service ${i % 2 ? 'is-flip' : ''}`} data-reveal>
            <div className="service-media">
              <img src={s.image} alt={s.alt} loading="lazy" decoding="async" />
            </div>
            <div className="service-copy">
              <h3>{s.title}</h3>
              <p>{s.copy}</p>
              <button className="button button-outline" onClick={() => onEnquire(s.enquiry)}>{s.button}</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
