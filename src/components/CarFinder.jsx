import { vehicles } from '../data/vehicles';

export default function CarFinder({ filters, setFilters, onSearch }) {
  const update = (field, value) => setFilters({ ...filters, [field]: value, ...(field === 'make' ? { model: '' } : {}) });
  return (
    <form className="finder" aria-label="Filter vehicles" onSubmit={(e) => { e.preventDefault(); onSearch(); }}>
      <label>Make
        <select value={filters.make} onChange={(e) => update('make', e.target.value)}>
          <option value="">All makes</option>
          {[...new Set(vehicles.map((v) => v.make))].map((m) => <option key={m}>{m}</option>)}
        </select>
      </label>
      <label>Model
        <select value={filters.model} onChange={(e) => update('model', e.target.value)}>
          <option value="">All models</option>
          {vehicles.filter((v) => !filters.make || v.make === filters.make).map((v) => <option key={v.id}>{v.model}</option>)}
        </select>
      </label>
      <label>Budget
        <select value={filters.budget} onChange={(e) => update('budget', e.target.value)}>
          <option value="">Any budget</option>
          <option value="100000">Under GH₵100k</option>
          <option value="200000">Under GH₵200k</option>
          <option value="500000">Under GH₵500k</option>
          <option value="1000000">Under GH₵1m</option>
          <option value="2000000">Under GH₵2m</option>
        </select>
      </label>
      <label>Availability
        <select value={filters.availability} onChange={(e) => update('availability', e.target.value)}>
          <option value="">All vehicles</option>
          <option>In Ghana</option>
          <option>To import</option>
        </select>
      </label>
      <button className="button button-solid">Show vehicles</button>
    </form>
  );
}
