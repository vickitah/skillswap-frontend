import React from 'react';
import SkillCard from './ProfileSkillCard';

const SkillSection = ({ title, skills = [], isPriority = false, onDelete = () => {} }) => {
  if (!skills.length) {
    return (
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p>No skills available.</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {skills.map((skill) => (
          <SkillCard
            key={skill.id || skill.name}  // Assuming 'id' or 'name' is a unique identifier
            skill={skill}
            isPriority={isPriority}
            onDelete={() => onDelete(skill)} // Ensure onDelete is always a function
          />
        ))}
      </div>
    </div>
  );
};

export default SkillSection;
