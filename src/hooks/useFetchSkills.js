import { useEffect, useState } from 'react';
import { fetchSkills } from '../services/skillService';

export const useFetchSkills = (filters) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');

      try {
        console.log("🌀 [useFetchSkills] Fetching with filters:", filters); // Debug
        const data = await fetchSkills(filters);
        console.log("✅ [useFetchSkills] Received data:", data); // Debug
        setSkills(data);
      } catch (err) {
        console.error("❌ [useFetchSkills] Error loading skills:", err);
        setError('Failed to load skills.');
      } finally {
        setLoading(false);
        console.log("🔚 [useFetchSkills] Finished loading.");
      }
    };

    load();
  }, [filters]);

  return { skills, loading, error };
};
