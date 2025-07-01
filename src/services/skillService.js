// src/services/skillService.js
import { API_BASE } from '../utils/api';

export const postSkill = async (skillData, token) => {
  try {
    const response = await fetch(`${API_BASE}/skills`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(skillData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ Failed to post skill:", errorData);
      return null;
    }

    const data = await response.json();
    console.log("✅ Skill posted:", data);
    return data;
  } catch (err) {
    console.error("❌ Error in postSkill:", err);
    return null;
  }
};
