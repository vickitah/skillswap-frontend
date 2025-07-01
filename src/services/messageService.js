import { auth } from "../firebase"; // ✅ Adjust if needed
import { waitForAuthReady } from "../utils/authHelpers";

const API_BASE = import.meta.env.VITE_API_URL;

// ✅ Refresh JWT token
const refreshJwtToken = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not logged in");

  const idToken = await user.getIdToken(true);
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Token refresh failed");

  localStorage.setItem("token", data.token);
  return data.token;
};

// ✅ Send a message (normal or swap request)
export const sendMessage = async (messageData, token) => {
  try {
    if (!token) token = localStorage.getItem("token");
    if (!token) {
      console.warn("⚠️ No JWT token provided.");
      return null;
    }

    // Optional: Ensure message type is present
    if (!messageData.type) messageData.type = "message"; // or "swap_request"

    console.log("📤 [sendMessage] Sending:", messageData);

    let res = await fetch(`${API_BASE}/messages/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(messageData),
    });

    if (res.status === 401) {
      const errorData = await res.json();
      if (errorData.message === "Token expired") {
        console.log("🔁 Token expired, refreshing...");
        token = await refreshJwtToken();

        res = await fetch(`${API_BASE}/messages/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(messageData),
        });
      }
    }

    const data = await res.json();
    if (!res.ok) {
      console.error("❌ [sendMessage] Failed:", res.status, data);
      return null;
    }

    console.log("✅ [sendMessage] Success:", data);
    return data;
  } catch (err) {
    console.error("💥 [sendMessage] Network or fetch error:", err.message);
    return null;
  }
};

// ✅ Fetch all messages for logged-in user
export const getMessages = async (token) => {
  try {
    if (!token) token = localStorage.getItem("token");
    if (!token) {
      console.warn("⚠️ No JWT token provided.");
      return [];
    }

    console.log("📥 [getMessages] Fetching messages...");

    let res = await fetch(`${API_BASE}/messages/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401) {
      const errorData = await res.json();
      if (errorData.message === "Token expired") {
        console.log("🔁 Token expired, refreshing...");
        token = await refreshJwtToken();

        res = await fetch(`${API_BASE}/messages/`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    }

    const data = await res.json();
    if (!res.ok) {
      console.error("❌ [getMessages] Failed:", res.status, data);
      return [];
    }

    console.log("✅ [getMessages] Received:", data.length, "messages");
    return data;
  } catch (err) {
    console.error("💥 [getMessages] Error:", err.message);
    return [];
  }
};
