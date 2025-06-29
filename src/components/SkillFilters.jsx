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
    <div className="flex gap-4 items-center mb-4">
      <select
        value={filters.category}
        onChange={handleCategoryChange}
        className="border p-2 rounded-xl"
      >
        <option value="">All Categories</option>
        {categories.map((cat, i) => (
          <option key={i} value={cat}>{cat}</option>
        ))}
      </select>

      <button onClick={clearAll} className="text-sm text-red-500 underline">
        Clear All
      </button>
    </div>
  );
};

export default SkillFilters;
