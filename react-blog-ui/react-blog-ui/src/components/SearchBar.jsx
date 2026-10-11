export default function SearchBar({ value, onChange }) {
  return (
    <label className="search-box">
      <span className="search-symbol" aria-hidden="true">⌕</span>
      <span className="sr-only">Search stories</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search stories..."
      />
      {value && (
        <button type="button" className="clear-search" onClick={() => onChange("")} aria-label="Clear search">
          ×
        </button>
      )}
    </label>
  );
}
