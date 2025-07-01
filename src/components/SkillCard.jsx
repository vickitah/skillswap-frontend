// SkillCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { sendMessage } from '../services/messageService';

const SkillCard = ({ skill }) => {
  const navigate = useNavigate();

  const handleMessage = () => {
    navigate(`/messages?to=${skill.owner_email}`);
  };

  const handleSwapRequest = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to send a swap request.");
      return;
    }

    const content = `Hi! I'm interested in swapping my skill for your offering: "${skill.offering}"`;

    const result = await sendMessage({
      receiver_email: skill.owner_email,
      content,
    }, token); // ✅ token now passed correctly

    if (result) {
      alert("✅ Swap request sent!");
    } else {
      alert("❌ Failed to send swap request.");
    }
  };

  return (
    <div className="border rounded-2xl p-4 shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-1">
        {skill.offering} ➝ {skill.wanting}
      </h2>
      <p className="text-sm text-gray-600 mb-2">{skill.description}</p>
      <div className="flex flex-wrap gap-2 text-sm mb-2">
        {skill.tags.map((tag, i) => (
          <span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-500">⭐ {skill.rating || 5.0}</span>
        <div className="flex gap-2">
          <button
            onClick={handleMessage}
            className="bg-gray-200 text-gray-800 px-3 py-1 rounded-xl hover:bg-gray-300 text-sm"
          >
            Message
          </button>
          <button
            onClick={handleSwapRequest}
            className="bg-blue-600 text-white px-3 py-1 rounded-xl hover:bg-blue-700 text-sm"
          >
            Send Swap Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
