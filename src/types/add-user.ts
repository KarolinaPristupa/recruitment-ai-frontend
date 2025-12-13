export interface AddUserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  enterpriseId: number;
  role: 'HR' | 'ENT_ADMIN';
}
