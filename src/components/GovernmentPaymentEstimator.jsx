import { useState, useMemo, useEffect, useRef } from 'react';
import { business } from '../data/business';
import '../styles/governmentPaymentEstimator.css';

const PRESET_VEHICLES = [
  {
    id: 'atto-3',
    name: 'BYD Atto 3 (Electric SUV)',
    price: 340000,
    image: '/assets/featured-ev/cars/atto-3/full.webp',
    tag: 'Featured EV',
    specs: [
      { label: 'Range', val: '420 km WLTP' },
      { label: 'Battery', val: '60.5 kWh Blade' },
      { label: 'Seats', val: '5 Seats' },
    ],
  },
  {
    id: 'dolphin',
    name: 'BYD Dolphin (Electric Hatchback)',
    price: 265000,
    image: '/assets/featured-ev/cars/dolphin/full.webp',
    tag: 'Featured EV',
    specs: [
      { label: 'Range', val: '427 km WLTP' },
      { label: 'Battery', val: '44.9 kWh Blade' },
      { label: 'Seats', val: '5 Seats' },
    ],
  },
  {
    id: 'sealion-7',
    name: 'BYD Sealion 7 (Concept SUV)',
    price: 450000,
    image: '/assets/featured-ev/cars/sealion-7-concept/full.webp',
    tag: 'Concept',
    specs: [
      { label: 'Range', val: '502 km WLTP' },
      { label: 'Battery', val: '82.5 kWh Blade' },
      { label: 'Seats', val: '5 Seats' },
    ],
  },
  {
    id: 'nammi-01',
    name: 'Dongfeng Nammi 01 (City EV)',
    price: 220000,
    image: '/assets/01_nammi_concept.png',
    tag: 'Affordable EV',
    specs: [
      { label: 'Range', val: '430 km CLTC' },
      { label: 'Battery', val: '42.3 kWh' },
      { label: 'Seats', val: '5 Seats' },
    ],
  },
  {
    id: 'atto-2',
    name: 'BYD Atto 2 / Yuan UP (Crossover)',
    price: 295000,
    image: '/assets/02_atto2_concept.png',
    tag: 'Crossover EV',
    specs: [
      { label: 'Range', val: '401 km CLTC' },
      { label: 'Battery', val: '45.1 kWh Blade' },
      { label: 'Seats', val: '5 Seats' },
    ],
  },
  {
    id: 'id-6',
    name: 'Volkswagen ID.6 (7-Seat SUV)',
    price: 520000,
    image: '/assets/id6-hero-reference.jpg',
    tag: 'Premium EV',
    specs: [
      { label: 'Range', val: '588 km CLTC' },
      { label: 'Battery', val: '84.8 kWh' },
      { label: 'Seats', val: '7 Seats' },
    ],
  },
  {
    id: 'xpeng-g9',
    name: 'XPeng G9 (Flagship Luxury)',
    price: 580000,
    image: '/assets/03_g9_concept.png',
    tag: 'Luxury EV',
    specs: [
      { label: 'Range', val: '702 km CLTC' },
      { label: 'Battery', val: '98 kWh 800V' },
      { label: 'Seats', val: '5 Seats' },
    ],
  },
  {
    id: 'custom',
    name: 'Custom Vehicle / Other Model',
    price: 300000,
    image: null,
    tag: 'Custom',
    specs: [],
  },
];

const PERIOD_OPTIONS = [12, 24, 36, 48, 60];

export default function GovernmentPaymentEstimator({ selectedVehicle, onEnquire }) {
  const [vehicleId, setVehicleId] = useState(PRESET_VEHICLES[0].id);
  const [customPrice, setCustomPrice] = useState(PRESET_VEHICLES[0].price);
  const [downPercent, setDownPercent] = useState(20);
  const [periodMonths, setPeriodMonths] = useState(36);
  const [interestRate, setInterestRate] = useState(22);
  const sectionRef = useRef(null);

  // If a vehicle was selected from the Featured EV rail or elsewhere, preselect it
  useEffect(() => {
    if (!selectedVehicle) return;
    const match = PRESET_VEHICLES.find(
      (v) => v.id === selectedVehicle.id || v.id === selectedVehicle.slug
    );
    if (match) {
      setVehicleId(match.id);
      setCustomPrice(match.price);
    } else if (selectedVehicle.priceValue) {
      setVehicleId('custom');
      setCustomPrice(selectedVehicle.priceValue);
    }
  }, [selectedVehicle]);

  const activeVehicle = useMemo(
    () => PRESET_VEHICLES.find((v) => v.id === vehicleId) || PRESET_VEHICLES[0],
    [vehicleId]
  );

  const vehiclePrice = vehicleId === 'custom' ? customPrice : activeVehicle.price;

  // Loan Calculation Engine
  const calculation = useMemo(() => {
    const price = Math.max(1000, Number(vehiclePrice) || 0);
    const downAmount = Math.round(price * (downPercent / 100));
    const principal = Math.max(0, price - downAmount);
    const n = Number(periodMonths);
    const annualRate = Number(interestRate);

    let monthly = 0;
    if (annualRate <= 0) {
      monthly = n > 0 ? principal / n : 0;
    } else {
      const r = annualRate / (12 * 100);
      const factor = Math.pow(1 + r, n);
      monthly = principal * (r * factor) / (factor - 1);
    }

    const roundedMonthly = Math.round(monthly);
    const totalPayments = roundedMonthly * n;
    const totalFinancingCost = Math.max(0, totalPayments - principal);
    const totalCommitment = downAmount + totalPayments;

    return {
      price,
      downAmount,
      principal,
      monthly: roundedMonthly,
      totalPayments,
      totalFinancingCost,
      totalCommitment,
    };
  }, [vehiclePrice, downPercent, periodMonths, interestRate]);

  const formatCedis = (num) => 'GH₵ ' + Math.round(num).toLocaleString('en-GH');

  // Handle WhatsApp Click with prefilled message
  const handleWhatsAppEnquiry = () => {
    const vehicleName = vehicleId === 'custom' ? 'a vehicle' : activeVehicle.name;
    const message = [
      `Hello Central Auto Ltd,`,
      `I'm a government worker interested in possible monthly payment arrangements for the ${vehicleName}.`,
      `I used the website's illustrative calculator with the following estimate:`,
      `• Estimated Monthly Repayment: ${formatCedis(calculation.monthly)} / month`,
      `• Repayment Period: ${periodMonths} months`,
      `• Indicative Vehicle Price: ${formatCedis(calculation.price)}`,
      `• Illustrative Down Payment: ${formatCedis(calculation.downAmount)} (${downPercent}%)`,
      `• Financed Amount: ${formatCedis(calculation.principal)}`,
      `I understand this is an illustrative estimate and would like to discuss whether any payment options may be available for government employees.`,
    ].join('\n\n');

    if (business.whatsappNumber) {
      const url = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else if (onEnquire) {
      onEnquire(`Government Worker Financing Enquiry: ${vehicleName}`);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="gov-estimator-section"
      id="financing-estimator"
      aria-labelledby="gov-estimator-title"
    >
      <div className="gov-estimator-container">
        {/* Section Header */}
        <header className="gov-estimator-header">
          <div className="gov-pill-badge">
            <svg viewBox="0 0 20 20" fill="currentColor" className="gov-badge-icon" aria-hidden="true">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Public Sector & Civil Service Guidance
          </div>
          <h2 id="gov-estimator-title" className="gov-title">
            Your next car. A smarter way to plan.
          </h2>
          <p className="gov-subtitle">
            Are you a government worker interested in flexible payment options? Explore an illustrative monthly repayment estimate and speak with our team about possible arrangements.
          </p>
        </header>

        {/* Two-Column Interactive Card */}
        <div className="gov-calculator-card">
          {/* Left Column: Vehicle Preview & Guidance */}
          <div className="gov-preview-col">
            <div className="gov-vehicle-card">
              {activeVehicle.image ? (
                <div className="gov-vehicle-img-wrap">
                  <img
                    src={activeVehicle.image}
                    alt={activeVehicle.name}
                    className="gov-vehicle-img"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="gov-vehicle-badge">{activeVehicle.tag}</span>
                </div>
              ) : (
                <div className="gov-vehicle-img-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="4" width="18" height="16" rx="3" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span>Custom Vehicle Calculation</span>
                </div>
              )}

              <div className="gov-vehicle-summary">
                <span className="gov-vehicle-selected-label">Selected Vehicle</span>
                <h3 className="gov-vehicle-name">{activeVehicle.name}</h3>
                <div className="gov-vehicle-price-tag">
                  {formatCedis(calculation.price)}
                </div>
                {activeVehicle.specs && activeVehicle.specs.length > 0 && (
                  <div className="gov-vehicle-spec-pills">
                    {activeVehicle.specs.map((s) => (
                      <span key={s.label} className="gov-vehicle-spec-pill">
                        <strong>{s.label}:</strong> {s.val}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Public Sector Advisory Notes */}
            <div className="gov-advisory-box">
              <h4 className="gov-advisory-title">
                <svg viewBox="0 0 20 20" fill="currentColor" className="gov-check-icon" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Planning & Transparency Principles
              </h4>
              <ul className="gov-advisory-list">
                <li>
                  <strong>Customer-led exploration:</strong> Tailored for teachers, healthcare workers, and public service professionals planning EV transition.
                </li>
                <li>
                  <strong>Zero sensitive data requested:</strong> We will never ask for CAGD passwords, Ghana Card numbers, payslips, or banking credentials.
                </li>
                <li>
                  <strong>Direct consultation:</strong> Speak directly with our team to understand import timing, battery health, and practical running costs in Ghana.
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive Loan Calculator */}
          <div className="gov-controls-col">
            {/* Input 1: Vehicle Selector */}
            <div className="gov-field-group">
              <label htmlFor="gov-vehicle-select" className="gov-label">
                Select Model
              </label>
              <select
                id="gov-vehicle-select"
                className="gov-select"
                value={vehicleId}
                onChange={(e) => {
                  const id = e.target.value;
                  setVehicleId(id);
                  const found = PRESET_VEHICLES.find((v) => v.id === id);
                  if (found && id !== 'custom') {
                    setCustomPrice(found.price);
                  }
                }}
              >
                {PRESET_VEHICLES.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} — {formatCedis(v.price)}
                  </option>
                ))}
              </select>
            </div>

            {/* Input 2: Price in GH₵ */}
            <div className="gov-field-group">
              <div className="gov-label-row">
                <label htmlFor="gov-price-input" className="gov-label">
                  Indicative Vehicle Price
                </label>
                <span className="gov-label-val">{formatCedis(calculation.price)}</span>
              </div>
              <input
                id="gov-price-input"
                type="number"
                min="50000"
                max="1500000"
                step="5000"
                className="gov-input"
                value={vehiclePrice}
                onChange={(e) => {
                  setVehicleId('custom');
                  setCustomPrice(Number(e.target.value) || 0);
                }}
              />
            </div>

            {/* Input 3: Down Payment Slider */}
            <div className="gov-field-group">
              <div className="gov-label-row">
                <label htmlFor="gov-down-slider" className="gov-label">
                  Down Payment
                </label>
                <span className="gov-label-val">
                  {downPercent}% ({formatCedis(calculation.downAmount)})
                </span>
              </div>
              <input
                id="gov-down-slider"
                type="range"
                min="10"
                max="50"
                step="5"
                className="gov-slider"
                value={downPercent}
                onChange={(e) => setDownPercent(Number(e.target.value))}
              />
              <div className="gov-slider-ticks">
                <span>10%</span>
                <span>20% (Typical)</span>
                <span>30%</span>
                <span>40%</span>
                <span>50%</span>
              </div>
            </div>

            {/* Input 4: Repayment Period (Months) */}
            <div className="gov-field-group">
              <label className="gov-label">Repayment Period</label>
              <div className="gov-period-pills" role="radiogroup" aria-label="Repayment period in months">
                {PERIOD_OPTIONS.map((months) => (
                  <button
                    key={months}
                    type="button"
                    role="radio"
                    aria-checked={periodMonths === months}
                    className={`gov-period-pill ${periodMonths === months ? 'is-active' : ''}`}
                    onClick={() => setPeriodMonths(months)}
                  >
                    <span className="gov-period-num">{months}</span>
                    <span className="gov-period-text">months</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input 5: Illustrative Annual Interest Rate */}
            <div className="gov-field-group">
              <div className="gov-label-row">
                <label htmlFor="gov-rate-slider" className="gov-label">
                  Illustrative Annual Rate
                </label>
                <span className="gov-label-val">{interestRate}% p.a.</span>
              </div>
              <input
                id="gov-rate-slider"
                type="range"
                min="12"
                max="32"
                step="1"
                className="gov-slider"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
              />
              <div className="gov-slider-ticks">
                <span>12%</span>
                <span>18%</span>
                <span>22% (Illustrative)</span>
                <span>26%</span>
                <span>32%</span>
              </div>
            </div>

            {/* Calculation Output Box */}
            <div className="gov-result-box">
              <div className="gov-result-primary">
                <span className="gov-result-label">Estimated Monthly Repayment</span>
                <div className="gov-result-amount">
                  {formatCedis(calculation.monthly)}
                  <span className="gov-result-freq">/ month</span>
                </div>
                <span className="gov-result-subtext">
                  Amortized over {periodMonths} months based on {interestRate}% illustrative rate
                </span>
              </div>

              <div className="gov-breakdown-grid">
                <div className="gov-breakdown-item">
                  <span className="gov-breakdown-label">Down Payment</span>
                  <strong className="gov-breakdown-val">{formatCedis(calculation.downAmount)}</strong>
                </div>
                <div className="gov-breakdown-item">
                  <span className="gov-breakdown-label">Financed Amount</span>
                  <strong className="gov-breakdown-val">{formatCedis(calculation.principal)}</strong>
                </div>
                <div className="gov-breakdown-item">
                  <span className="gov-breakdown-label">Total Financing Cost</span>
                  <strong className="gov-breakdown-val">{formatCedis(calculation.totalFinancingCost)}</strong>
                </div>
                <div className="gov-breakdown-item">
                  <span className="gov-breakdown-label">Total Commitment</span>
                  <strong className="gov-breakdown-val">{formatCedis(calculation.totalCommitment)}</strong>
                </div>
              </div>

              {/* Action Button: Discuss Payment Options */}
              <button
                type="button"
                className="gov-action-btn"
                onClick={handleWhatsAppEnquiry}
              >
                <svg viewBox="0 0 32 32" fill="currentColor" className="gov-whatsapp-icon" aria-hidden="true">
                  <path d="M16 3a12 12 0 0 0-10.4 18L4 28l7.2-1.6A12 12 0 1 0 16 3Zm0 22a10 10 0 0 1-5-1.3l-.4-.2-4.1.9.9-4-.3-.5A10 10 0 1 1 16 25Z" />
                  <path d="M11 9c-.4 0-.9.2-1.1.6-.5.6-.8 1.3-.8 2.1 0 2.3 2 4.8 3.5 6.1 2.2 2 4.7 3 6.2 2.8 1-.2 2-1.1 2.2-1.9.2-.7.2-1-.2-1.2l-2.5-1.2c-.3-.1-.5-.1-.7.2l-1.1 1.3c-.2.2-.4.2-.7.1-1.7-.7-3.1-1.9-4-3.5-.2-.3-.1-.5.1-.7l.8-1c.2-.3.3-.5.1-.8L11.7 9c-.1-.2-.4-.2-.7-.2Z" />
                </svg>
                Discuss Payment Options
              </button>
            </div>

            {/* Mandatory Unhidden Legal Disclaimer */}
            <p className="gov-legal-disclaimer">
              <strong>Important Notice:</strong> Estimates are for illustration only and do not constitute a financing offer. Central Auto does not currently operate a formal vehicle-financing programme. Any potential arrangement would require further discussion and approval by the relevant parties.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
