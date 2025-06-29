import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

// 🗓️ Schedule a session
export const scheduleSession = async ({ recipient_email, scheduled_time, message }) => {
  const token = localStorage.getItem('jwt');
  if (!token) throw new Error("No auth token found");

  const res = await axios.post(`${API_BASE}/sessions/`, {
    recipient_email,
    scheduled_time,
    message,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });

  return res.data;
};

// 📥 Get all sessions for the logged-in user
export const getSessions = async () => {
  const token = localStorage.getItem('jwt');
  if (!token) throw new Error("No auth token found");

  const res = await axios.get(`${API_BASE}/sessions/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  return res.data;
};

// ✅ Accept or reject a session
export const updateSessionStatus = async (sessionId, newStatus) => {
  const token = localStorage.getItem('jwt');
  if (!token) throw new Error("No auth token found");

  const res = await axios.patch(`${API_BASE}/sessions/${sessionId}/`, {
    status: newStatus
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  return res.data;
};
