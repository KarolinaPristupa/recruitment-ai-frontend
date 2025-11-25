import api from '@/api/instance';

export const publishVacancy = async (id: number) => {
  const res = await api.post(`/api/hh/vacancies/${id}/publish`);
  return res.data;
};
