import { AuthResponse } from '@/types/auth-response';

export interface LoginCredentials {
  email: string;
  password: string;
}

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await fetch('http://localhost:8080/api/auth/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const text = await response.text();

    if (text.includes('UserNotFoundException')) {
      throw new Error('Пользователь с таким email не найден');
    }
    if (text.includes('InvalidPasswordException')) {
      throw new Error('Неверный пароль');
    }
    if (text.includes('AccountLockedException')) {
      throw new Error('Аккаунт заблокирован');
    }
    if (text.includes('EmailNotVerifiedException')) {
      throw new Error('Email не подтверждён');
    }

    throw new Error(text || 'Ошибка входа. Попробуйте позже');
  }

  return await response.json();
};
