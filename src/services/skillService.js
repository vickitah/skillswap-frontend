import { API_BASE, fetchWithAuth, handleResponse } from '../utils/api';

// 🔁 POST a new skill exchange
export const postSkill = async (skillData) => {
  const res = await fetchWithAuth(`${API_BASE}/skills`, {
    method: 'POST',
    body: JSON.stringify(skillData),
  });
  return handleResponse(res);
};

// 🔍 Get all skill exchanges (optional - public or protected)
export const getSkills = async () => {
  try {
    const res = await fetch(`${API_BASE}/skills`);
    return await handleResponse(res);
  } catch (err) {
    console.error("❌ Error fetching skills:", err);
    return [];
  }
};
