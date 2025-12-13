import api from '@/api/instance/index';
import { UserAccountData } from '@/types/user-account-data';
import { Enterprise } from '@/types/enterprise';

export const getHrAccount = async (): Promise<UserAccountData> => {
  const res = await api.get('/api/account');
  return res.data;
};

export const updateHrAccount = async (data: Partial<UserAccountData> & { password?: string }) => {
  const res = await api.put('/api/account', data);
  return res.data;
};

export const updateEnterprise = async (data: Partial<UserAccountData>) => {
  const res = await api.put('/api/account/enterprise', data);
  return res.data;
};
