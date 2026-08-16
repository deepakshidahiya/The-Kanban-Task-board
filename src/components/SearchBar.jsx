function SearchBar({
  searchTerm,
  onSearchChange,
  totalCount,
  resultCount,
  isSearchActive,
}) {
  const hasNoResults = isSearchActive && resultCount === 0

  function handleKeyDown(event) {
    if (event.key === 'Escape' && searchTerm) {
      onSearchChange('')
    }
  }

  return (
    <div className="search-bar">
      <div className="search-bar-field">
        <svg className="search-bar-icon" aria-hidden="true" viewBox="0 0 20 20" fill="none">
          <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
          <line
            x1="13.4"
            y1="13.4"
            x2="17"
            y2="17"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>

        <input
          type="text"
          className="search-bar-input"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Search tasks"
        />

        {searchTerm && (
          <button
            type="button"
            className="search-bar-clear"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      <p className="search-bar-summary">
        {!isSearchActive
          ? `${totalCount} task${totalCount === 1 ? '' : 's'}`
          : hasNoResults
            ? 'No tasks found. Try a different search term.'
            : `${resultCount} task${resultCount === 1 ? '' : 's'} found`}
      </p>
    </div>
  )
}

export default SearchBar
