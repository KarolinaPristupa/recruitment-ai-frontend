import { useState, useCallback, useEffect } from 'react';
import api from '@/api/instance';
import { useToastStore } from '@/store/toast-store';

export type VacancyResponseDTO = {
  id: number;
  title: string;
  publishedAt: string;
};

export const useActiveVacancies = () => {
  const [vacancies, setVacancies] = useState<VacancyResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { error: toastError } = useToastStore();

  const fetchVacancies = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await api.get<VacancyResponseDTO[]>('/api/vacancies/my/active');
      setVacancies(res.data);
    } catch (err) {
      setError(true);
      toastError('Ошибка загрузки активных вакансий');
    } finally {
      setLoading(false);
    }
  }, [toastError]);

  useEffect(() => {
    fetchVacancies();
  }, [fetchVacancies]);

  return {
    vacancies,
    loading,
    error,
    refetch: fetchVacancies,
  };
};
