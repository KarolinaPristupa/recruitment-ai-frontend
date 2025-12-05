import api from '@/api/instance/index';

export const getAllAnalytics = async (vacancyId: number, limit: number = 5) => {
  const res = await api.get(`/api/vacancies/${vacancyId}/analytics/all?limit=${limit}`);
  return res.data;
};

export const runResponsesAnalysis = async (vacancyId: number) => {
  const res = await api.post(`/api/vacancies/${vacancyId}/analyze-responses`);
  return res.data;
};
