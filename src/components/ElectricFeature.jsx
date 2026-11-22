export default function ElectricFeature({ onEnquire }) {
  return (
    <section className="ev-feature field-photo" id="electric" aria-labelledby="ev-feature-title">
      <div className="ev-feature-media" data-reveal>
        <img src="/assets/id6-hero-reference.jpg" alt="Purple Volkswagen ID.6 electric SUV parked on a reflective studio floor" width="2560" height="1440" loading="lazy" decoding="async" />
      </div>
      <div className="ev-feature-copy" data-reveal>
        <span className="ev-feature-tag">Featured Executive 7-Seater</span>
        <h2 id="ev-feature-title">Volkswagen ID.6</h2>
        <p className="lead">Spacious three-row electric luxury engineered for family journeys across Ghana.</p>
        <p>Combining 588 km CLTC driving range with whisper-quiet cabin acoustics, expansive panoramic glass, and zero petrol stops. Speak with our team regarding verified overseas allocation and import logistics.</p>
        <div className="ev-feature-specs-chips">
          <span className="spec-chip">588 km Range</span>
          <span className="spec-chip">84.8 kWh Battery</span>
          <span className="spec-chip">7 Seats</span>
          <span className="spec-chip">Dual Motor AWD</span>
        </div>
        <div className="actions">
          <button className="button button-accent" onClick={() => onEnquire('Volkswagen ID.6 (premium electric SUV)')}>Enquire About Allocation</button>
        </div>
        <small>Pricing and arrival timelines confirmed directly by our advisory team on enquiry.</small>
      </div>
    </section>
  );
}
