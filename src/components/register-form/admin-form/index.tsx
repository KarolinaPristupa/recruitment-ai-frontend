'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { adminRegisterSchema } from './validation-schema';
import { AdminRegisterFormData } from '@/types/admin-register-form-data';
import { registerAdmin } from '@/api/registerAdmin';

import styles from '../index.module.scss';

const AdminRegisterForm: React.FC<{ enterpriseId: number }> = ({ enterpriseId }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminRegisterFormData>({
    resolver: yupResolver(adminRegisterSchema) as any,
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: AdminRegisterFormData) => {
    await registerAdmin({
      ...data,
      enterpriseId,
    });
    setTimeout(() => {
      navigate('/login');
    }, 800);

    alert('Администратор зарегистрирован!');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Имя"
            {...register('firstName')}
            className={errors.firstName ? styles.errorInput : ''}
          />
          {errors.firstName && <span className={styles.errorMsg}>{errors.firstName.message}</span>}
        </div>

        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Фамилия"
            {...register('lastName')}
            className={errors.lastName ? styles.errorInput : ''}
          />
          {errors.lastName && <span className={styles.errorMsg}>{errors.lastName.message}</span>}
        </div>

        <div className={styles.inputWrapper}>
          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            className={errors.email ? styles.errorInput : ''}
          />
          {errors.email && <span className={styles.errorMsg}>{errors.email.message}</span>}
        </div>

        <div className={styles.inputWrapper}>
          <input
            type="tel"
            placeholder="Телефон"
            {...register('phone')}
            className={errors.phone ? styles.errorInput : ''}
          />
          {errors.phone && <span className={styles.errorMsg}>{errors.phone.message}</span>}
        </div>

        <div className={styles.inputWrapper}>
          <input
            type="password"
            placeholder="Пароль"
            {...register('password')}
            className={errors.password ? styles.errorInput : ''}
          />
          {errors.password && <span className={styles.errorMsg}>{errors.password.message}</span>}
        </div>

        <div className={styles.inputWrapper}>
          <input
            type="password"
            placeholder="Повторите пароль"
            {...register('confirmPassword')}
            className={errors.confirmPassword ? styles.errorInput : ''}
          />
          {errors.confirmPassword && (
            <span className={styles.errorMsg}>{errors.confirmPassword.message}</span>
          )}
        </div>

        <button type="submit" disabled={isSubmitting} className={styles.submit}>
          Создать администратора
        </button>
      </form>
    </div>
  );
};

export default AdminRegisterForm;
