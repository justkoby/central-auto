import { publicVehicles, vehicles } from '../data/vehicles';

export default function CarFinder({ filters, setFilters, onSearch }) {
  const activeStock = publicVehicles || vehicles;
  const update = (field, value) => setFilters({ ...filters, [field]: value, ...(field === 'make' ? { model: '' } : {}) });
  return (
    <form className="finder" aria-label="Filter vehicles" onSubmit={(e) => { e.preventDefault(); onSearch(); }}>
      <label>Make
        <select value={filters.make} onChange={(e) => update('make', e.target.value)}>
          <option value="">All makes</option>
          {[...new Set(activeStock.map((v) => v.make))].map((m) => <option key={m}>{m}</option>)}
        </select>
      </label>
      <label>Model
        <select value={filters.model} onChange={(e) => update('model', e.target.value)}>
          <option value="">All models</option>
          {activeStock.filter((v) => !filters.make || v.make === filters.make).map((v) => <option key={v.id}>{v.model}</option>)}
        </select>
      </label>
      <label>Budget
        <select value={filters.budget} onChange={(e) => update('budget', e.target.value)}>
          <option value="">Any budget</option>
          <option value="250000">Under GH₵250k</option>
          <option value="350000">Under GH₵350k</option>
          <option value="500000">Under GH₵500k</option>
          <option value="600000">Under GH₵600k</option>
        </select>
      </label>
      <label>Availability
        <select value={filters.availability} onChange={(e) => update('availability', e.target.value)}>
          <option value="">All vehicles</option>
          <option>In Ghana</option>
          <option>To import</option>
        </select>
      </label>
      <button className="button button-solid">Filter</button>
    </form>
  );
}
