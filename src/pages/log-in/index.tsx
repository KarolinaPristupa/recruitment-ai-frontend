import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/login-form';
import { loginUser } from '@/api/login-user';
import { useToastStore } from '@/store/toast-store';
import styles from './index.module.scss';

const LogIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { success } = useToastStore();

  const handleLogin = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const { token, username, role } = await loginUser(data);

      localStorage.setItem('accessToken', token);
      localStorage.setItem('userEmail', username);
      localStorage.setItem('userRole', role);

      success('Добро пожаловать!');

      setTimeout(() => {
        if (role === 'HR') navigate('/admin/HR');
        else if (role === 'ENT_ADMIN') navigate('/enterprise/account');
        else navigate('/account');
      }, 800);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.animatedText}>Добро пожаловать обратно</h1>
          <LoginForm isLoading={isLoading} onSubmit={handleLogin} />
        </div>
      </div>
    </div>
  );
};

export default LogIn;
