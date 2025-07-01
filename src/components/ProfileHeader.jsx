import React, { useState, useEffect } from 'react';
import EditProfileModal from './EditProfileModal';
import { getProfile } from '../utils/api';

const ProfileHeader = ({ profile, setProfile }) => {
  const [showModal, setShowModal] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  // Helper to get token from localStorage
  const getToken = () => localStorage.getItem('token') || localStorage.getItem('jwt');

  // Check if current user is the owner of the profile
  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const emailUsername = (payload.email || '').split('@')[0];
        setIsCurrentUser(emailUsername === profile.name);
      } catch (e) {
        console.warn('Failed to decode token:', e);
        setIsCurrentUser(false);
      }
    }
  }, [profile.name]);

  // Generate initials (e.g., "JD" from "John Doe")
  const initials = profile?.name
    ? profile.name.split(' ').map((n) => n[0]).join('').toUpperCase()
    : 'SS';

  return (
    <div className="flex items-start gap-4 border-b pb-4">
      <div className="bg-blue-600 text-white font-bold rounded-full w-16 h-16 flex items-center justify-center text-xl">
        {initials}
      </div>
      <div className="flex-1">
        <h1 className="text-2xl font-bold">{profile.name || 'User'}</h1>
        <p className="text-gray-600">{profile.tagline || 'No tagline provided'}</p>
        <div className="text-sm text-gray-500 mt-1">
          ⭐ {profile.rating ?? 0} ({profile.reviews ?? 0} reviews) ·{' '}
          {profile.total_exchanges ?? 0} exchanges completed
        </div>

        {isCurrentUser && (
          <button
            onClick={() => setShowModal(true)}
            className="mt-2 px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit Profile
          </button>
        )}
      </div>

      {showModal && (
        <EditProfileModal
          profile={profile}
          onClose={() => setShowModal(false)}
          onSave={async () => {
            try {
              const updated = await getProfile(profile.email);

              setProfile(updated);
            } catch (err) {
              console.error('Error fetching updated profile:', err);
            } finally {
              setShowModal(false);
            }
          }}
        />
      )}
    </div>
  );
};

export default ProfileHeader;
