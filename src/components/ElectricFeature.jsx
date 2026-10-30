export default function ElectricFeature({ onEnquire }) {
  return (
    <section className="ev-feature field-photo" id="electric" aria-labelledby="ev-feature-title">
      <div className="ev-feature-media" data-reveal>
        <img src="/assets/id6-hero-reference.jpg" alt="Purple Volkswagen ID.6 electric SUV parked on a reflective studio floor" width="2560" height="1440" loading="lazy" decoding="async" />
      </div>
      <div className="ev-feature-copy" data-reveal>
        <h2 id="ev-feature-title">Volkswagen ID.6</h2>
        <p className="lead">An electric SUV with room for seven.</p>
        <p>Space for the family, a quiet cabin and no petrol stops. Ask us about availability, import timing and what it would cost you to run.</p>
        <p className="facts">Electric. Seven seats. SUV.</p>
        <div className="actions">
          <button className="button button-accent" onClick={() => onEnquire('Volkswagen ID.6 (premium electric SUV)')}>Enquire about the ID.6</button>
        </div>
        <small>Pricing and availability are confirmed by our team on enquiry.</small>
      </div>
    </section>
  );
}
