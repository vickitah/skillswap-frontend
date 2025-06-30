import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_URL;

export const useFetchSkills = (filters) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchSkills = async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.category) params.append('category', filters.category);
      filters.tags.forEach(tag => params.append('tags', tag));

      const res = await fetch(`${API_BASE}/api/skills/?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch skills");

      const data = await res.json();
      setSkills(data);
    } catch (err) {
      console.error("❌ Failed to fetch skills:", err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [filters]);

  return { skills, loading, error, refetch: fetchSkills }; // ✅ expose refetch
};
