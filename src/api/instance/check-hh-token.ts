import api from '@/api/instance/index';

export const checkHhToken = async (): Promise<boolean> => {
  const res = await api.get<boolean>('/api/hh/oauth/check-token');
  return res.data;
};
