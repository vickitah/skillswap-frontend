import React from 'react';

const tags = ['Web Dev', 'Music', 'Languages', 'Cooking', 'Design', 'Math'];

const PopularTags = ({ setFilters }) => {
  const handleTagClick = (tag) => {
    setFilters(prev => ({
      ...prev,
      tags: [...new Set([...prev.tags, tag])]
    }));
  };

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map((tag, i) => (
        <button
          key={i}
          onClick={() => handleTagClick(tag)}
          className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-300"
        >
          #{tag}
        </button>
      ))}
    </div>
  );
};

export default PopularTags;
