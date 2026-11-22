import { useState, useMemo } from 'react';
import '../styles/runningCostComparison.css';

// Baseline vehicles for comparison
const VEHICLE_PRESETS = [
  {
    id: 'byd-atto-3',
    name: 'BYD Atto 3 (Electric SUV)',
    powertrain: 'Electric',
    efficiency: 15.5, // kWh / 100 km
    efficiencyUnit: 'kWh/100km',
    monthlyMaintenance: 180, // estimated GH₵ / mo
    image: '/assets/featured-ev/cars/atto-3/full.webp',
  },
  {
    id: 'byd-dolphin',
    name: 'BYD Dolphin (Compact EV)',
    powertrain: 'Electric',
    efficiency: 13.0, // kWh / 100 km
    efficiencyUnit: 'kWh/100km',
    monthlyMaintenance: 150,
    image: '/assets/featured-ev/cars/dolphin/full.webp',
  },
  {
    id: 'toyota-corolla-cross-hybrid',
    name: 'Comparable Compact Hybrid SUV',
    powertrain: 'Hybrid',
    efficiency: 4.8, // Litres / 100 km
    efficiencyUnit: 'L/100km',
    monthlyMaintenance: 420,
    image: null,
  },
  {
    id: 'typical-petrol-suv',
    name: 'Typical 2.0L Petrol SUV',
    powertrain: 'Petrol',
    efficiency: 9.5, // Litres / 100 km
    efficiencyUnit: 'L/100km',
    monthlyMaintenance: 650,
    image: null,
  },
];

export default function RunningCostComparison({ onEnquire }) {
  // Configurable inputs
  const [monthlyKm, setMonthlyKm] = useState(1500);
  const [petrolPrice, setPetrolPrice] = useState(14.8); // GH₵ per litre in Ghana
  const [chargingMode, setChargingMode] = useState('home'); // 'home' | 'public'
  const [timeframe, setTimeframe] = useState('monthly'); // 'weekly' | 'monthly' | 'annual'
  const [selectedEvId, setSelectedEvId] = useState('byd-atto-3');
  const [selectedIceId, setSelectedIceId] = useState('typical-petrol-suv');

  // Charging rates in Ghana
  const kwhTariff = chargingMode === 'home' ? 1.65 : 3.20; // 1.65 ECG residential vs 3.20 commercial DC fast charger

  const evVehicle = useMemo(
    () => VEHICLE_PRESETS.find((v) => v.id === selectedEvId) || VEHICLE_PRESETS[0],
    [selectedEvId]
  );

  const iceVehicle = useMemo(
    () => VEHICLE_PRESETS.find((v) => v.id === selectedIceId) || VEHICLE_PRESETS[3],
    [selectedIceId]
  );

  // Multiplier for timeframe
  const timeframeMultiplier = timeframe === 'weekly' ? (1 / 4.333) : timeframe === 'annual' ? 12 : 1;
  const timeframeLabel = timeframe === 'weekly' ? 'Weekly' : timeframe === 'annual' ? 'Annual' : 'Monthly';

  // Calculations
  const stats = useMemo(() => {
    const km = Math.max(100, Number(monthlyKm) || 1500);

    // EV Monthly Energy Cost: (km / 100) * kWh/100km * GH₵/kWh
    const evKwhUsed = (km / 100) * evVehicle.efficiency;
    const evEnergyCost = evKwhUsed * Number(kwhTariff);
    const evTotalMonthly = evEnergyCost + evVehicle.monthlyMaintenance;

    // ICE / Comparison Monthly Fuel Cost: (km / 100) * Litres/100km * GH₵/L
    const iceLitresUsed = (km / 100) * iceVehicle.efficiency;
    const iceFuelCost = iceLitresUsed * Number(petrolPrice);
    const iceTotalMonthly = iceFuelCost + iceVehicle.monthlyMaintenance;

    const monthlyDifference = Math.max(0, iceTotalMonthly - evTotalMonthly);
    const annualSavings = monthlyDifference * 12;
    const fiveYearSavings = annualSavings * 5;

    // Applied timeframe values
    const currentEvCost = evEnergyCost * timeframeMultiplier;
    const currentEvTotal = evTotalMonthly * timeframeMultiplier;
    const currentIceCost = iceFuelCost * timeframeMultiplier;
    const currentIceTotal = iceTotalMonthly * timeframeMultiplier;
    const currentSavings = monthlyDifference * timeframeMultiplier;

    // CO2 savings rough estimate: 1L petrol ≈ 2.31 kg CO2
    const monthlyLitresSaved = iceLitresUsed - (evKwhUsed * 0.15); // rough grid offset
    const annualCo2Kg = Math.max(0, Math.round(monthlyLitresSaved * 2.31 * 12));

    return {
      km: Math.round(km * timeframeMultiplier),
      evEnergyCost: currentEvCost,
      evTotalMonthly: currentEvTotal,
      iceFuelCost: currentIceCost,
      iceTotalMonthly: currentIceTotal,
      savings: currentSavings,
      monthlyDifference,
      annualSavings,
      fiveYearSavings,
      annualCo2Kg,
    };
  }, [monthlyKm, petrolPrice, kwhTariff, evVehicle, iceVehicle, timeframeMultiplier]);

  const money = (val) => 'GH₵ ' + Math.round(val).toLocaleString('en-GH');

  return (
    <section className="cost-section" id="running-costs" aria-labelledby="running-costs-title">
      <div className="cost-container">
        {/* Section Header */}
        <header className="cost-header" data-reveal>
          <h2 id="running-costs-title" className="cost-title">
            Know the cost before you drive.
          </h2>
          <p className="cost-subtitle">
            Compare estimated charging and fuel costs.
          </p>

          {/* Timeframe & Mode Switchers */}
          <div className="cost-switchers-row">
            <div className="cost-btn-group" role="group" aria-label="Timeframe">
              <button
                type="button"
                className={`cost-toggle-btn ${timeframe === 'weekly' ? 'is-active' : ''}`}
                onClick={() => setTimeframe('weekly')}
              >
                Weekly
              </button>
              <button
                type="button"
                className={`cost-toggle-btn ${timeframe === 'monthly' ? 'is-active' : ''}`}
                onClick={() => setTimeframe('monthly')}
              >
                Monthly
              </button>
              <button
                type="button"
                className={`cost-toggle-btn ${timeframe === 'annual' ? 'is-active' : ''}`}
                onClick={() => setTimeframe('annual')}
              >
                Annual
              </button>
            </div>

            <div className="cost-btn-group" role="group" aria-label="Charging Mode">
              <button
                type="button"
                className={`cost-toggle-btn ${chargingMode === 'home' ? 'is-active' : ''}`}
                onClick={() => setChargingMode('home')}
              >
                Home (ECG)
              </button>
              <button
                type="button"
                className={`cost-toggle-btn ${chargingMode === 'public' ? 'is-active' : ''}`}
                onClick={() => setChargingMode('public')}
              >
                Public DC
              </button>
            </div>
          </div>
        </header>

        {/* Interactive Comparison Matrix */}
        <div className="cost-calculator-card" data-reveal>
          {/* Top Controls: Distance & Rates */}
          <div className="cost-controls-band">
            <div className="cost-control-group">
              <div className="cost-label-line">
                <label htmlFor="input-monthly-km">Distance ({timeframeLabel}):</label>
                <strong>{stats.km.toLocaleString()} km</strong>
              </div>
              <input
                id="input-monthly-km"
                type="range"
                min="500"
                max="4000"
                step="100"
                value={monthlyKm}
                onChange={(e) => setMonthlyKm(Number(e.target.value))}
                className="cost-slider"
              />
            </div>

            <div className="cost-control-group">
              <div className="cost-label-line">
                <label htmlFor="input-petrol-price">Petrol Price:</label>
                <strong>GH₵ {petrolPrice.toFixed(2)}/L</strong>
              </div>
              <input
                id="input-petrol-price"
                type="range"
                min="12.0"
                max="20.0"
                step="0.2"
                value={petrolPrice}
                onChange={(e) => setPetrolPrice(Number(e.target.value))}
                className="cost-slider"
              />
            </div>

            <div className="cost-control-group">
              <div className="cost-label-line">
                <label htmlFor="input-kwh-tariff">Electricity Tariff:</label>
                <strong>GH₵ {kwhTariff.toFixed(2)}/kWh</strong>
              </div>
              <input
                id="input-kwh-tariff"
                type="range"
                min="1.0"
                max="3.5"
                step="0.05"
                value={kwhTariff}
                onChange={(e) => setKwhTariff(Number(e.target.value))}
                className="cost-slider"
              />
            </div>
          </div>

          {/* Compact Comparison Display */}
          <div className="cost-compact-stage">
            {/* Primary Savings Banner */}
            <div className="cost-savings-compact">
              <span className="cost-savings-tag">Est. Savings</span>
              <div className="cost-savings-figure">
                <strong className="cost-savings-amount">{money(stats.savings)}</strong>
                <span className="cost-savings-period">/ {timeframe === 'weekly' ? 'week' : timeframe === 'annual' ? 'year' : 'month'}</span>
              </div>
            </div>

            {/* Side-by-Side Comparison */}
            <div className="cost-pair-grid">
              {/* EV Box */}
              <div className="cost-pair-card cost-pair-card--ev">
                <div className="cost-pair-head">
                  <span className="cost-badge-ev">100% Electric</span>
                  <select
                    value={selectedEvId}
                    onChange={(e) => setSelectedEvId(e.target.value)}
                    className="cost-mini-select"
                  >
                    <option value="byd-atto-3">BYD Atto 3</option>
                    <option value="byd-dolphin">BYD Dolphin</option>
                  </select>
                </div>
                <div className="cost-pair-price">
                  <span className="cost-pair-label">{timeframeLabel} Energy</span>
                  <strong className="cost-pair-val cost-pair-val--ev">{money(stats.evTotalMonthly)}</strong>
                </div>
                <span className="cost-pair-sub">{evVehicle.efficiency} kWh/100km</span>
              </div>

              {/* Petrol Box */}
              <div className="cost-pair-card cost-pair-card--ice">
                <div className="cost-pair-head">
                  <span className="cost-badge-ice">Petrol / Hybrid</span>
                  <select
                    value={selectedIceId}
                    onChange={(e) => setSelectedIceId(e.target.value)}
                    className="cost-mini-select"
                  >
                    <option value="typical-petrol-suv">2.0L Petrol SUV</option>
                    <option value="toyota-corolla-cross-hybrid">Hybrid SUV</option>
                  </select>
                </div>
                <div className="cost-pair-price">
                  <span className="cost-pair-label">{timeframeLabel} Fuel</span>
                  <strong className="cost-pair-val cost-pair-val--ice">{money(stats.iceTotalMonthly)}</strong>
                </div>
                <span className="cost-pair-sub">{iceVehicle.efficiency} L/100km</span>
              </div>
            </div>
          </div>

          {/* Expandable Breakdown and Long-Term Projections */}
          <details className="cost-expandable-details">
            <summary className="cost-expandable-summary">
              <span>View detailed cost breakdown & long-term projections</span>
              <svg viewBox="0 0 20 20" fill="currentColor" className="cost-expand-arrow" aria-hidden="true">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </summary>

            <div className="cost-expandable-content">
              <div className="cost-breakdown-columns">
                <div className="cost-column-detail">
                  <h4>Electric ({evVehicle.name})</h4>
                  <div className="cost-row">
                    <span>Power ({Math.round(stats.km * evVehicle.efficiency / 100)} kWh)</span>
                    <strong>{money(stats.evEnergyCost)}</strong>
                  </div>
                  <div className="cost-row">
                    <span>Routine servicing estimate</span>
                    <strong>{money(evVehicle.monthlyMaintenance * timeframeMultiplier)}</strong>
                  </div>
                </div>

                <div className="cost-column-detail">
                  <h4>Combustion ({iceVehicle.name})</h4>
                  <div className="cost-row">
                    <span>Fuel ({Math.round(stats.km * iceVehicle.efficiency / 100)} L)</span>
                    <strong>{money(stats.iceFuelCost)}</strong>
                  </div>
                  <div className="cost-row">
                    <span>Oil, filters & scheduled wear</span>
                    <strong>{money(iceVehicle.monthlyMaintenance * timeframeMultiplier)}</strong>
                  </div>
                </div>
              </div>

              <div className="cost-projections-band">
                <div className="cost-proj-box">
                  <span>1-Year Cumulative Savings:</span>
                  <strong>{money(stats.annualSavings)}</strong>
                </div>
                <div className="cost-proj-box">
                  <span>5-Year Total Projection:</span>
                  <strong>{money(stats.fiveYearSavings)}</strong>
                </div>
                <div className="cost-proj-box cost-proj-box--co2">
                  <span>Environmental Offset:</span>
                  <strong>~{stats.annualCo2Kg.toLocaleString()} kg CO₂ avoided / yr</strong>
                </div>
              </div>
            </div>
          </details>

          {/* Action CTA & Transparent Disclaimers */}
          <div className="cost-footer">
            <p className="cost-disclaimer">
              Calculations are illustrative estimates based on stated ratings, prevailing Ghana pump prices, and ECG residential tariffs. Not a financial guarantee.
            </p>
            <button
              type="button"
              className="cost-action-btn"
              onClick={() => onEnquire && onEnquire(`Running Cost Consultation: ${evVehicle.name}`)}
            >
              Discuss EV Running Costs With Our Team
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
