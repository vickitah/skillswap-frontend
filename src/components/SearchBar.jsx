import React, { useState, useEffect } from 'react';

const SearchBar = ({ filters, setFilters }) => {
  const [localSearch, setLocalSearch] = useState(filters.search || '');

  // Sync external reset of filters with local state
  useEffect(() => {
    setLocalSearch(filters.search || '');
  }, [filters.search]);

  // Debounce local input before updating filters
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: localSearch }));
    }, 500);

    return () => clearTimeout(timeout);
  }, [localSearch]);

  return (
    <input
      type="text"
      aria-label="Search skills"
      placeholder="🔍 Search skills..."
      value={localSearch}
      onChange={(e) => setLocalSearch(e.target.value)}
      className="w-full mt-4 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default SearchBar;
