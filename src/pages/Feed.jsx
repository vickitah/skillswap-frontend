import React, { useState } from 'react';
import SkillFilters from '../components/SkillFilters';
import PopularTags from '../components/PopularTags';
import SkillCard from '../components/SkillCard';
import SearchBar from '../components/SearchBar';
import PostExchangeModal from '../components/PostExchangeModal';
import { useFetchSkills } from '../hooks/useFetchSkills'; // ✅ custom hook

const Feed = () => {
  const [filters, setFilters] = useState({ category: '', search: '', tags: [] });
  const [showModal, setShowModal] = useState(false);

  const { skills, loading, error, refetch } = useFetchSkills(filters); // ✅ include refetch

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Skill Exchange Feed</h1>
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

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid gap-4 mt-6">
          {skills.map(skill => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      )}

      {showModal && (
        <PostExchangeModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);  
            refetch();           
          }}
        />
      )}
    </div>
  );
};

export default Feed;
