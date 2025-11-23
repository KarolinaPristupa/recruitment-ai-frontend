import { AuthResponse } from '@/types/auth-response';
import { RegistrationData } from '@/types/registration-data';
import { authStorage } from '@/utils/auth-storage';

export const registerEnterpriseWithAdmin = async (
  data: RegistrationData,
): Promise<AuthResponse> => {
  const res = await fetch('http://localhost:8080/api/auth/enterprise/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();

    if (text.includes('EnterpriseEmailExistsException')) {
      throw new Error('Компания с таким email уже зарегистрирована');
    }
    if (text.includes('EnterprisePhoneExistsException')) {
      throw new Error('Компания с таким телефоном уже зарегистрирована');
    }

    throw new Error(text || 'Ошибка регистрации');
  }
  const result: AuthResponse = await res.json();

  authStorage.setToken(result.token);
  authStorage.setUserRole(result.role || 'ENT_ADMIN');

  return result;
};
