import React, { useEffect, useState } from 'react';
import { getSessions, updateSessionStatus } from '../services/scheduleSession';

const statusLabels = {
  all: 'All',
  pending: 'Pending',
  accepted: 'Accepted',
  rejected: 'Rejected',
};

const SessionsPage = () => {
  const [sessions, setSessions] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getCurrentUserEmail = () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return null;
    try {
      const payload = JSON.parse(atob(jwt.split('.')[1]));
      return payload.email;
    } catch (e) {
      console.error("Invalid JWT format:", e);
      return null;
    }
  };

  const currentUserEmail = getCurrentUserEmail();

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem("jwt");

    try {
      const data = await getSessions(token); // ✅ pass token
      setSessions(data);
    } catch (err) {
      setError('❌ Failed to load sessions. Please try again later.');
      console.error("❌ Error fetching sessions:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const token = localStorage.getItem("jwt");
    try {
      await updateSessionStatus(id, newStatus, token); // ✅ pass token
      fetchSessions(); // Refresh list
    } catch (err) {
      console.error(`❌ Failed to update session ${id}:`, err);
      setError('❌ Failed to update session status.');
    }
  };

  const filteredSessions = sessions.filter((s) =>
    filter === 'all' ? true : s.status === filter
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">📅 Your Scheduled Sessions</h1>

      {/* Filter buttons */}
      <div className="flex gap-3 mb-6">
        {Object.keys(statusLabels).map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border ${
              filter === key
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {statusLabels[key]}
          </button>
        ))}
      </div>

      {/* Error Message */}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Session cards */}
      {loading ? (
        <div className="text-center">
          <p className="text-gray-500">Loading sessions...</p>
        </div>
      ) : filteredSessions.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No sessions in this category.</p>
      ) : (
        <div className="space-y-4">
          {filteredSessions.map((sesh) => {
            const otherEmail =
              currentUserEmail === sesh.requester_email
                ? sesh.recipient_email
                : sesh.requester_email;

            return (
              <div key={sesh.id} className="border rounded-lg shadow-sm p-4 bg-white">
                <div className="mb-2">
                  <p className="text-sm text-gray-600">
                    <strong>Scheduled with:</strong>{' '}
                    <span className="text-gray-800">
                      {otherEmail || 'Unknown'}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Time:</strong>{' '}
                    {sesh.scheduled_time
                      ? new Date(sesh.scheduled_time).toLocaleString()
                      : 'Not set'}
                  </p>
                </div>

                {sesh.message && (
                  <p className="text-gray-700 mb-2">
                    <strong>Note:</strong> {sesh.message}
                  </p>
                )}

                <div className="flex items-center justify-between flex-wrap gap-4 mt-2">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      (sesh.status || 'pending') === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : sesh.status === 'accepted'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {(sesh.status === 'accepted' && '✅ ACCEPTED') ||
                      (sesh.status === 'rejected' && '❌ REJECTED') ||
                      '⏳ PENDING'}
                  </span>

                  {(sesh.status || 'pending') === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusChange(sesh.id, 'accepted')}
                        className="px-3 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-700"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatusChange(sesh.id, 'rejected')}
                        className="px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SessionsPage;
