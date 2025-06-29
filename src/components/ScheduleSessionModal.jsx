import React, { useState } from 'react';
import { scheduleSession } from '../services/scheduleSession';

export default function ScheduleSessionModal({ isOpen, onClose, recipientEmail }) {
  const [datetime, setDatetime] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSchedule = async () => {
    if (!datetime) {
      alert("⚠️ Please select a date and time.");
      return;
    }

    setLoading(true);
    try {
      await scheduleSession({
        recipient_email: recipientEmail,
        scheduled_time: datetime,
        message,
      });

      alert("✅ Session scheduled!");
      onClose();
    } catch (err) {
      console.error("❌ Scheduling error:", err);
      const msg = err.response?.data?.message || err.message || "Unknown error";
      alert(`❌ Error scheduling session: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">📅 Schedule a Session</h2>

        <input
          type="datetime-local"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Optional message..."
          className="w-full p-2 border rounded mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSchedule}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Scheduling...' : 'Schedule'}
          </button>
        </div>
      </div>
    </div>
  );
}
