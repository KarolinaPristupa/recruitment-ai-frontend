import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import loginSchema from './validation-schema';
import { useToastStore } from '@/store/toast-store';
import { LoginFormData } from '@/types/login-form-data';

interface LoginFormProps {
  isLoading: boolean;
  onSubmit: SubmitHandler<LoginFormData>;
}

const LoginForm: React.FC<LoginFormProps> = ({ isLoading, onSubmit }) => {
  const { error: showError } = useToastStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema) as any,
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onFormSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      await onSubmit(data);
      reset();
    } catch (err: any) {
      const message = err.message || err.response?.data?.message || 'Неверный email или пароль';

      showError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
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

      <button type="submit" disabled={isLoading || !isValid} className={styles.submit}>
        {isLoading ? 'Входим...' : 'Войти'}
      </button>

      <p className={styles.loginText}>
        Ещё нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
      </p>
    </form>
  );
};

export default LoginForm;
