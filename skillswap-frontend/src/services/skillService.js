const API_BASE = import.meta.env.VITE_API_URL;

export const fetchSkills = async (filters) => {
  try {
    const params = new URLSearchParams();

if (filters.search) params.append("search", filters.search);
if (filters.category) params.append("category", filters.category);
filters.tags?.forEach(tag => params.append("tags", tag));

const res = await fetch(`${API_BASE}/skills?${params.toString()}`);
return await res.json();
  } catch (err) {
    console.error("Error fetching skills:", err);
    return [];
  }
};

export const postSkill = async (skillData) => {
  try {
    const token = localStorage.getItem("jwt"); 

const res = await fetch(`${API_BASE}/skills`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}` 
  },
  body: JSON.stringify(skillData)
});

if (!res.ok) throw new Error("Failed to post skill");
return await res.json();
  } catch (err) {
    console.error("Error posting skill:", err);
    return null;
  }
};

