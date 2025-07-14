import { API_BASE, fetchWithAuth, handleResponse } from '../utils/api';

// 🔁 POST a new skill exchange (requires JWT)
export const postSkill = async (skillData) => {
  try {
    const res = await fetchWithAuth(`${API_BASE}/skills`, {
      method: 'POST',
      body: JSON.stringify(skillData),
    });
    return await handleResponse(res);
  } catch (err) {
    console.error("❌ Error in postSkill:", err.message);
    return null;
  }
};

// 🔍 Get all skill exchanges (public endpoint)
export const getSkills = async () => {
  try {
    const res = await fetch(`${API_BASE}/skills`);
    return await handleResponse(res);
  } catch (err) {
    console.error("❌ Error fetching skills:", err.message);
    return [];
  }
};
