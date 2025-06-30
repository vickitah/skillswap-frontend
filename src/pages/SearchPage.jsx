import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import SkillFilters from '../components/SkillFilters';
import PopularTags from '../components/PopularTags';
import ExchangeList from '../components/ExchangeList';
import { debounce } from 'lodash';  // For debouncing search input

const API_BASE = import.meta.env.VITE_API_URL;

const SearchPage = () => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    tags: [],
  });

  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);  // Error state for API failures

  // Debounce the search input to reduce the frequency of API calls
  const debouncedSearch = debounce((searchTerm) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: searchTerm,
    }));
  }, 500);

  // Fetch skills from backend whenever filters change
  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      setError(null);  // Reset error state before fetching

      try {
        const params = new URLSearchParams();
        if (filters.search) params.append('search', filters.search);
        if (filters.category) params.append('category', filters.category);
        filters.tags.forEach(tag => params.append('tags', tag));

        const res = await fetch(`${API_BASE}/api/skills?${params.toString()}`);
        if (!res.ok) {
          throw new Error('Failed to fetch data from the server.');
        }

        const data = await res.json();
        setExchanges(data);
      } catch (error) {
        setError(error.message);  // Set error message
        console.error("Failed to fetch skill exchanges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [filters]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4 text-center">Find Your Perfect Skill Match</h2>
      <p className="text-center text-gray-600 mb-6">
        Search through hundreds of skill exchange opportunities. Find someone to teach you what you want to learn.
      </p>

      <SearchBar
        filters={filters}
        setFilters={(newFilters) => {
          setFilters(newFilters);
          debouncedSearch(newFilters.search);
        }}
      />
      <PopularTags setFilters={setFilters} />
      <SkillFilters filters={filters} setFilters={setFilters} />

      {loading ? (
        <div className="text-center mt-10">
          {/* You can replace this with a spinner */}
          <p className="text-gray-500">Loading skill exchanges...</p>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 mt-10">
          <p>{error}</p>  {/* Display the error message */}
        </div>
      ) : exchanges.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p>No matching results found.</p>
        </div>
      ) : (
        <ExchangeList exchanges={exchanges} />
      )}
    </div>
  );
};

export default SearchPage;
