import api from '@/api/instance/index';
import { HrAccountData } from '@/types/hr-account-data';

export const getHrAccount = async (): Promise<HrAccountData> => {
  const res = await api.get('/api/hr/account');
  return res.data;
};

export const updateHrAccount = async (data: Partial<HrAccountData> & { password?: string }) => {
  const res = await api.put('/api/hr/account', data);
  return res.data;
};
