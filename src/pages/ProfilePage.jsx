import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileHeader from '../components/ProfileHeader';
import SkillSection from '../components/SkillSection';
import ExchangeList from '../components/ExchangeList';
import EditProfileModal from '../components/EditProfileModal';
import { getProfile, updateProfile } from '../utils/api';

const ProfilePage = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isOwner = currentUser?.name === username;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile(username);
        if (data) {
          setProfile(data);
          setError(null);
        } else {
          setError("Profile not found.");
        }
      } catch (err) {
        console.error(err);
        setError('Could not load profile. Please try again later.');
      }
    };

    fetchProfile();
  }, [username]);

  const handleSave = (updatedData) => {
    setProfile((prev) => ({
      ...prev,
      ...updatedData,
    }));
  };

  const handleDeleteSkill = async (skill, sectionKey) => {
    try {
      const token = localStorage.getItem("token");
      const updatedSkills = profile[sectionKey].filter(s => s.name !== skill.name);

      const updatePayload = {
        ...profile,
        [sectionKey]: updatedSkills
      };

      await updateProfile(updatePayload, token);

      setProfile(prev => ({
        ...prev,
        [sectionKey]: updatedSkills
      }));
    } catch (err) {
      console.error(`❌ Failed to delete skill:`, err);
      setError("Failed to delete skill. Please try again.");
    }
  };

  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!profile) return (
    <div className="p-4">
      <div>Loading profile...</div>
      <div className="spinner"></div> {/* Add a spinner or loading indicator here */}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ProfileHeader profile={profile} />
      {isOwner && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </div>
      )}
      <SkillSection
        title="Skills I Offer"
        skills={profile.skills_offered}
        onDelete={isOwner ? (skill) => handleDeleteSkill(skill, 'skills_offered') : undefined}
      />
      <SkillSection
        title="Skills I Want"
        skills={profile.skills_wanted}
        isPriority
        onDelete={isOwner ? (skill) => handleDeleteSkill(skill, 'skills_wanted') : undefined}
      />
      <h2 className="text-xl font-semibold mt-6 mb-2">Active Exchanges</h2>
      <ExchangeList exchanges={profile.exchanges} />

      {showModal && (
        <EditProfileModal
          profile={profile}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ProfilePage;
