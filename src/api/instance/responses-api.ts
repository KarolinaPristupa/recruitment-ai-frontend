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
  const vacancyKey = JSON.stringify(vacancies.map((v) => v.id));

  useEffect(() => {
    if (!vacancies || vacancies.length === 0) return;

    let ignore = false;

    const fetchAll = async () => {
      setLoading(true);
      try {
        const entries = await Promise.all(
          vacancies.map(async (v) => {
            const responses = await fetchResponsesForVacancy(v.id);
            return [v.id, responses] as [number, any[]];
          }),
        );
        if (!ignore) setResponsesMap(Object.fromEntries(entries));
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchAll();

    return () => {
      ignore = true;
    };
  }, [vacancyKey]);

  return { responsesMap, loading, error };
};
