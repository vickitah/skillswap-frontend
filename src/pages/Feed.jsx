feed.jsx
import React, { useState, useEffect } from 'react';
import SkillFilters from '../components/SkillFilters';
import PopularTags from '../components/PopularTags';
import SkillCard from '../components/SkillCard';
import SearchBar from '../components/SearchBar';
import { fetchSkills } from '../services/skillService';
import PostExchangeModal from '../components/PostExchangeModal';

const Feed = () => {
  const [skills, setSkills] = useState([]);
  const [filters, setFilters] = useState({ category: '', search: '', tags: [] });
  const [showModal, setShowModal] = useState(false);

  const loadSkills = async () => {
    try {
      const data = await fetchSkills(filters);
      setSkills(data);
    } catch (err) {
      console.error("Failed to load skills:", err);
    }
  };

  useEffect(() => {
    loadSkills();
  }, [filters]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Skill Exchange Feed</h1>
        {/* No auth check — always show post button */}
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-xl"
        >
          Post New Exchange
        </button>
      </div>

  <SkillFilters filters={filters} setFilters={setFilters} />
  <SearchBar filters={filters} setFilters={setFilters} />
  <PopularTags setFilters={setFilters} />

  <div className="grid gap-4 mt-6">
    {skills.map(skill => (
      <SkillCard key={skill.id} skill={skill} />
    ))}
  </div>

  {showModal && (
    <PostExchangeModal
      onClose={() => setShowModal(false)}
      onSuccess={loadSkills}
    />
  )}
</div>
  );
};

export default Feed;