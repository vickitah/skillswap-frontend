import React from 'react';
import SkillCard from './ProfileSkillCard';

const SkillSection = ({ title, skills = [], isPriority = false, onDelete = () => {} }) => {
  const hasSkills = Array.isArray(skills) && skills.length > 0;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>

      {!hasSkills ? (
        <p className="text-gray-500">No skills available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {skills.map((skill) => (
            <SkillCard
              key={skill.id || skill.name} // Fallback key if no id
              skill={skill}
              isPriority={isPriority}
              onDelete={() => onDelete(skill)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillSection;
