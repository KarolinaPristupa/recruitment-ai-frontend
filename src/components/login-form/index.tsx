import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './index.module.scss';
import loginSchema from './validation-schema';
import { LoginFormData } from '@/types/login-form-data';

interface LoginFormProps {
  isLoading: boolean;
  onSubmit: (data: LoginFormData) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({ isLoading, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema) as any,
    mode: 'onChange',
  });

  const handleFormSubmit = async (data: LoginFormData) => {
    try {
      await onSubmit(data);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Неверный email или пароль';
      setError('email', { message });
      setError('password', { message });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <div className={styles.inputWrapper}>
        <input
          type="email"
          placeholder="Email"
          {...register('email')}
          className={errors.email ? styles.errorInput : ''}
          disabled={isLoading}
        />
        {errors.email && <span className={styles.errorMsg}>{errors.email.message}</span>}
      </div>

      <div className={styles.inputWrapper}>
        <input
          type="password"
          placeholder="Пароль"
          {...register('password')}
          className={errors.password ? styles.errorInput : ''}
          disabled={isLoading}
        />
        {errors.password && <span className={styles.errorMsg}>{errors.password.message}</span>}
      </div>

      <button type="submit" disabled={isLoading} className={styles.submit}>
        {isLoading ? 'Входим...' : 'Войти'}
      </button>

      <p className={styles.loginText}>
        Ещё нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
      </p>
    </form>
  );
};

export default LoginForm;
