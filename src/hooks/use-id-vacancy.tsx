import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '@/api/instance';
import type { Vacancy } from '@/types/vacancy';

export const useIdVacancy = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchVacancy = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await api.get<Vacancy>(`/api/vacancies/${id}`);
      setVacancy(res.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const deleteVacancy = async () => {
    if (!id || !window.confirm('Удалить вакансию навсегда?')) return;
    try {
      await api.delete(`/api/vacancies/${id}`);
      navigate('/hr/vacancies', { replace: true });
    } catch (err: any) {
      alert(err.response?.data?.message || 'Не удалось удалить');
    }
  };

  useEffect(() => {
    fetchVacancy();
  }, [id]);

  return {
    vacancy,
    loading,
    error,
    deleteVacancy,
    refetch: fetchVacancy,
  };
};
