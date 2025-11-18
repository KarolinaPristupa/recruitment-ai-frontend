import { EnterpriseRegisterFormData } from '@/types/enterprise-register-form-data';

export async function registerEnterprise(data: EnterpriseRegisterFormData) {
  const res = await fetch('http://localhost:8080/api/auth/enterprise/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Ошибка регистрации');
  }

  return res.json();
}
