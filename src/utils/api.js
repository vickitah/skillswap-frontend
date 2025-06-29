import { auth } from "../firebase"; // ✅ Confirm this path is correct

const API_BASE = import.meta.env.VITE_API_URL;

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

  localStorage.setItem("token", data.token); // Store new JWT
  return data.token;
};

// ✅ Fetch with JWT, handles token refresh
const fetchWithAuth = async (url, options = {}) => {
  let token = localStorage.getItem("token");

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    let data = {};
    try {
      data = await res.json();
    } catch (_) {
      // Not a JSON response
    }

    if (data.message === "Token expired") {
      try {
        token = await refreshJwtToken();
        const retryRes = await fetch(url, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
            Authorization: `Bearer ${token}`,
          },
        });
        return retryRes;
      } catch (err) {
        // Optional: force logout if refresh fails
        // logoutUser();
        throw new Error("Session expired. Please log in again.");
      }
    }
  }

  return res;
};

// ✅ Central error handler
const handleResponse = async (res) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "API Error");
  }
  return await res.json();
};

// 👤 Get public profile by username
export const getProfile = async (username) => {
  const res = await fetch(`${API_BASE}/profile/${username}`);
  return handleResponse(res);
};

// ✏️ Update profile (JWT)
export const updateProfile = async (data) => {
  const res = await fetchWithAuth(`${API_BASE}/profile/update`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

// ❌ Delete skill (JWT)
export const deleteSkill = async (skill, type) => {
  const res = await fetchWithAuth(`${API_BASE}/profile/delete-skill`, {
    method: "POST",
    body: JSON.stringify({ skill, type }),
  });
  return handleResponse(res);
};

// (Optional helper, currently unused)
// const logoutUser = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("user");
//   window.location.href = "/login";
// };
