import React, { useState } from 'react';
import { postSkill } from '../services/skillService';

const PostExchangeModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    offering: '',
    wanting: '',
    description: '',
    category: '',
    tags: ''
  });
  const [posting, setPosting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
    if (typeof onClose === 'function') {
      onClose();
    } else {
      console.error("❌ onClose is not a function:", onClose);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (posting) return; // Prevent double submit

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to post a skill exchange.");
      return;
    }

    const formattedData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
    };

    setPosting(true);
    try {
      console.log("Submitting skill exchange:", formattedData);
      const result = await postSkill(formattedData, token);
      if (result) {
        onSuccess?.();
        onClose?.();
      } else {
        alert("Failed to post skill. Please try again.");
      }
    } catch (err) {
      console.error("Error posting skill:", err);
      alert("An error occurred. Please try again.");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Post a New Exchange</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="offering"
            placeholder="What skill are you offering?"
            value={formData.offering}
            onChange={handleChange}
            className="w-full p-2 border rounded-xl"
            required
          />
          <input
            type="text"
            name="wanting"
            placeholder="What skill are you looking for?"
            value={formData.wanting}
            onChange={handleChange}
            className="w-full p-2 border rounded-xl"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-xl"
          />
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma-separated)"
            value={formData.tags}
            onChange={handleChange}
            className="w-full p-2 border rounded-xl"
          />
          <textarea
            name="description"
            placeholder="Brief description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-xl"
          />
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="text-gray-600 hover:underline"
              disabled={posting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={posting}
              className={`bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 ${posting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {posting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostExchangeModal;
