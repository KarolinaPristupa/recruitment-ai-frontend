import api from '@/api/instance/index';
import { HrAccountData } from '@/types/hr-account-data';
import { Enterprise } from '@/types/enterprise';

export const getHrAccount = async (): Promise<HrAccountData> => {
  const res = await api.get('/api/account');
  return res.data;
};

export const updateHrAccount = async (data: Partial<HrAccountData> & { password?: string }) => {
  const res = await api.put('/api/account', data);
  return res.data;
};

export const updateEnterprise = async (data: Partial<HrAccountData>) => {
  const res = await api.put('/api/account/enterprise', data);
  return res.data;
};
