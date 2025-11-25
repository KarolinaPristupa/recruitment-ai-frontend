import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { publishVacancy } from '@/api/instance/vacancy-api';
import { checkHhToken } from '@/api/instance/check-hh-token';
import api from '@/api/instance';

export const usePublishVacancy = () => {
  const navigate = useNavigate();
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const publish = async (id: number) => {
    setLoadingId(id);
    try {
      const hasToken = await checkHhToken();
      if (!hasToken) {
        const res = await api.get('/api/hh/oauth/login-url');
        window.location.href = res.data;
        return;
      }

      const response = await publishVacancy(id);
      navigate('/hr/vacancies', { replace: true });
      return response;
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || 'Не удалось опубликовать вакансию';
      alert(message);
      throw err;
    } finally {
      setLoadingId(null);
    }
  };

  return {
    loadingId,
    publish,
  };
};
