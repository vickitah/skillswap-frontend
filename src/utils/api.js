import { auth } from "../firebase"; // ✅ Make sure this path is correct

// ✅ Make sure there's NO trailing slash in your .env value
export const API_BASE = import.meta.env.VITE_API_URL;

// 🔁 Token refresh helper
const refreshJwtToken = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const idToken = await user.getIdToken(true); // Force refresh
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "JWT refresh failed");

  localStorage.setItem("token", data.token); // ✅ Consistent key
  return data.token;
};

// 🔐 Secure fetch wrapper with retry logic
export const fetchWithAuth = async (url, options = {}) => {
  let token = localStorage.getItem("token");

  const makeRequest = async (tokenToUse) => {
    return fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
        Authorization: `Bearer ${tokenToUse}`,
      },
    });
  };

  let res = await makeRequest(token);

  if (res.status === 401) {
    let data = {};
    try {
      data = await res.json();
    } catch (_) {}

    if (data.message === "Token expired") {
      try {
        await new Promise((r) => setTimeout(r, 300)); // Small delay
        token = await refreshJwtToken();
        return await makeRequest(token);
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        throw new Error("Session expired. Please log in again.");
      }
    }

    // 🔴 Unauthorized for another reason
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
    throw new Error(data.message || "Unauthorized. Please log in again.");
  }

  return res;
};

// 🔁 Central error handler
export const handleResponse = async (res) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "API Error");
  }
  return await res.json();
};

//
// 🔽 Profile Utilities (Authenticated)
//

export const getProfile = async (username) => {
  const res = await fetch(`${API_BASE}/profile/${username}`);
  return handleResponse(res);
};

export const updateProfile = async (data) => {
  const res = await fetchWithAuth(`${API_BASE}/profile/update`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const deleteSkill = async (skill, type) => {
  const res = await fetchWithAuth(`${API_BASE}/profile/delete-skill`, {
    method: "POST",
    body: JSON.stringify({ skill, type }),
  });
  return handleResponse(res);
};
