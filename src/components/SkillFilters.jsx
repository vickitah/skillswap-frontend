import React from 'react';
import { categories } from '../constants/skillCategories';

const SkillFilters = ({ filters, setFilters }) => {
  const handleCategoryChange = (e) => {
    setFilters(prev => ({ ...prev, category: e.target.value }));
  };

  const clearAll = () => {
    setFilters({ category: '', search: '', tags: [] });
  };

  return (
    <div className="flex flex-wrap gap-4 items-center mb-4">
      <label className="text-sm font-medium">
        Category:
        <select
          value={filters.category}
          onChange={handleCategoryChange}
          className="ml-2 border p-2 rounded-xl focus:outline-none focus:ring focus:ring-indigo-300"
        >
          <option value="">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>

      <button
        onClick={clearAll}
        className="text-sm text-red-600 underline hover:text-red-800 transition"
      >
        Clear All
      </button>
    </div>
  );
};

export default SkillFilters;
