// src/components/ProfileSkillCard.jsx
import React from 'react';

const SkillCard = ({ skill, isPriority, onDelete }) => {
  const name = skill?.name || 'Unnamed Skill';
  const level = skill?.level ?? 'N/A';
  const priority = skill?.priority ?? 'Medium';
  const exchanges = skill?.exchanges ?? skill?.exchanges_completed ?? 0;

  return (
    <div className="border rounded-xl p-4 bg-white shadow hover:shadow-md transition relative">
      <h3 className="font-semibold text-lg mb-1 text-gray-800">{name}</h3>
      <p className="text-sm text-gray-600">
        {isPriority ? `🎯 Priority: ${priority}` : `📈 Level: ${level}`}
      </p>
      {!isPriority && (
        <p className="text-xs text-gray-400 mt-1">{exchanges} exchanges</p>
      )}

      {onDelete && (
        <button
          onClick={onDelete}
          className="absolute top-2 right-2 text-sm text-red-500 hover:text-red-700"
        >
          ✖
        </button>
      )}
    </div>
  );
};

export default SkillCard;
