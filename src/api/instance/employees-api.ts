import api from '@/api/instance';
import { UserAccountData } from '@/types/user-account-data';

export const getEnterpriseEmployees = async (enterpriseId: number): Promise<UserAccountData[]> => {
  const res = await api.get(`/api/enterprise/${enterpriseId}/users`);
  return res.data;
};

export const getUserLogs = async (userEmail: string) => {
  const res = await api.get(`/api/enterprise/users/${userEmail}/logs`);
  return res.data;
};

export const updateEmployee = async (
  email: string,
  data: Partial<UserAccountData> & { password?: string },
) => {
  const res = await api.put(`/api/enterprise/users/${email}`, data);
  return res.data;
};

export const deleteEmployee = async (email: string) => {
  const res = await api.delete(`/api/enterprise/users/${email}`);
  return res.data;
};
