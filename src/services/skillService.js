const API_BASE = import.meta.env.VITE_API_URL;

// ✅ Fetch skill posts with optional filters
export const fetchSkills = async (filters = {}) => {
  try {
    const params = new URLSearchParams();

    if (filters.search) params.append("search", filters.search.trim());
    if (filters.category) params.append("category", filters.category);
    if (Array.isArray(filters.tags)) {
      filters.tags.forEach(tag => params.append("tags", tag));
    }

    const fullUrl = `${API_BASE}/skills?${params.toString()}`;
    console.log("🔎 [fetchSkills] URL:", fullUrl);

    const res = await fetch(fullUrl);
    const data = await res.json();

    if (!res.ok) {
      console.error("❌ [fetchSkills] Server error:", res.status, data);
      return [];
    }

    console.log("✅ [fetchSkills] Success:", data);
    return data;
  } catch (err) {
    console.error("💥 [fetchSkills] Network error:", err);
    return [];
  }
};

// ✅ Post a new skill exchange (requires JWT)
export const postSkill = async (skillData, token = null) => {
  try {
    const jwt = token || localStorage.getItem("token");
    if (!jwt) {
      console.warn("⚠️ [postSkill] No JWT token found");
      return null;
    }

    const res = await fetch(`${API_BASE}/skills`, { // 🔧 fixed trailing slash
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(skillData),
    });

    let data;
    try {
      data = await res.json();
    } catch (jsonError) {
      console.error("❌ [postSkill] Failed to parse JSON:", jsonError);
      return null;
    }

    if (!res.ok) {
      console.error("❌ [postSkill] Server error:", res.status, data);
      return null;
    }

    console.log("✅ [postSkill] Success:", data);
    return data;
  } catch (err) {
    console.error("💥 [postSkill] Network or fetch error:", err);
    return null;
  }
};
