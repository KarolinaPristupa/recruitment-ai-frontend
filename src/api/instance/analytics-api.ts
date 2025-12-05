import api from '@/api/instance/index';

export const getAllAnalytics = async (vacancyId: number, limit: number = 5) => {
  const res = await api.get(`/api/vacancies/${vacancyId}/analytics/all?limit=${limit}`);
  return res.data;
};
