// src/pages/SearchPage.jsx
import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import SkillFilters from '../components/SkillFilters';
import PopularTags from '../components/PopularTags';
import ExchangeList from '../components/ExchangeList';

const API_BASE = import.meta.env.VITE_API_URL;

const SearchPage = () => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    tags: [],
  });

  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch skills from backend whenever filters change
  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);

      try {
        const params = new URLSearchParams();
        if (filters.search) params.append('search', filters.search);
        if (filters.category) params.append('category', filters.category);
        filters.tags.forEach(tag => params.append('tags', tag));

        const res = await fetch(`${API_BASE}/api/skills?${params.toString()}`);
        const data = await res.json();
        setExchanges(data);
      } catch (error) {
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

      <SearchBar filters={filters} setFilters={setFilters} />
      <PopularTags setFilters={setFilters} />
      <SkillFilters filters={filters} setFilters={setFilters} />

      {loading ? (
        <p className="text-center text-gray-500 mt-10">Loading skill exchanges...</p>
      ) : exchanges.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No matching results found.</p>
      ) : (
        <ExchangeList exchanges={exchanges} />
      )}
    </div>
  );
};

export default SearchPage;
