export default function FilterBar({ categories, activeCategory, onChange }) {
  return (
    <div className="filter-bar" aria-label="Filter stories by category">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`filter-chip ${activeCategory === category ? "active" : ""}`}
          aria-pressed={activeCategory === category}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
