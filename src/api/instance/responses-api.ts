import api from '@/api/instance';

export const fetchResponsesForVacancy = async (vacancyId: number) => {
  const res = await api.post(`/api/external-responses/fetch/${vacancyId}`);
  return res.data;
};
