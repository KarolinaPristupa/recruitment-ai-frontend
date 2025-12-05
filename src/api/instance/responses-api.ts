import { useState, useEffect } from 'react';
import api from '@/api/instance/index';

export const fetchResponsesForVacancy = async (vacancyId: number) => {
  const res = await api.post(`/api/external-responses/fetch/${vacancyId}`);
  return res.data || [];
};

export const useVacancyResponses = (vacancies: { id: number }[]) => {
  const [responsesMap, setResponsesMap] = useState<Record<number, any[]>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!vacancies || vacancies.length === 0) return;

    const fetchAll = async () => {
      setLoading(true);
      setError(false);

      try {
        const entries = await Promise.all(
          vacancies.map(async (v) => {
            const responses = await fetchResponsesForVacancy(v.id);
            return [v.id, responses] as [number, any[]];
          }),
        );

        setResponsesMap(Object.fromEntries(entries));
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [vacancies]);

  return { responsesMap, loading, error };
};
