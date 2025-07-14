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

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCancel = () => {
    if (typeof onClose === 'function') onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("❌ You must be logged in to post a skill exchange.");
      setSubmitting(false);
      return;
    }

    const formattedData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim())
    };

    try {
      const result = await postSkill(formattedData, token);
      if (result) {
        onSuccess?.();
        onClose?.();
      } else {
        setErrorMsg("Failed to post skill. Please try again.");
      }
    } catch (err) {
      console.error("🔥 Error submitting skill exchange:", err);
      setErrorMsg("Something went wrong while posting. Check console.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
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

          {errorMsg && (
            <div className="text-red-600 text-sm font-medium">{errorMsg}</div>
          )}

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleCancel}
              className="text-gray-600 hover:underline"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-xl text-white ${
                submitting
                  ? 'bg-green-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostExchangeModal;
