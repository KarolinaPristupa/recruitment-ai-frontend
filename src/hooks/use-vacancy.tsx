import { useState, useCallback } from 'react';
import api from '@/api/instance';
import type { Vacancy } from '@/types/vacancy';

export const useVacancies = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchVacancies = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await api.get<Vacancy[]>('/api/vacancies/my');
      setVacancies(res.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteVacancy = async (id: number) => {
    try {
      await api.delete(`/api/vacancies/${id}`);
      setVacancies((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      alert('Не удалось удалить вакансию');
      throw err;
    }
  };

  return {
    vacancies,
    loading,
    error,
    refetch: fetchVacancies,
    deleteVacancy,
  };
};
