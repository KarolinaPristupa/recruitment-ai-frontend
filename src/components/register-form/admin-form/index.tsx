'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { adminRegisterSchema } from './validation-schema';
import { AdminRegisterFormData } from '@/types/admin-register-form-data';
import { registerEnterpriseWithAdmin } from '@/api/register-enterprise-with-admin';
import { useRegistrationStore } from '@/store/registration-store';
import { useToastStore } from '@/store/toast-store';
import styles from '../index.module.scss';

const resolver = yupResolver(adminRegisterSchema) as any;

const AdminRegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { success, error } = useToastStore();
  const { data: companyData, reset } = useRegistrationStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<AdminRegisterFormData>({
    resolver,
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<AdminRegisterFormData> = async (adminData) => {
    if (!companyData?.name) {
      error('Данные компании не найдены. Начните заново.');
      return;
    }

    const payload = {
      name: companyData.name,
      address: companyData.address,
      contactEmail: companyData.contactEmail,
      contactPhone: companyData.contactPhone,

      firstName: adminData.firstName,
      lastName: adminData.lastName,
      email: adminData.email,
      phone: adminData.phone,
      password: adminData.password,
    };

    try {
      const { token } = await registerEnterpriseWithAdmin(payload);

      success('Компания и администратор успешно созданы!');
      localStorage.setItem('token', token);
      reset();

      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err: any) {
      error(err.message);
    }
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

        <button type="submit" disabled={isSubmitting || !isValid} className={styles.submit}>
          {isSubmitting ? 'Создаём...' : 'Создать администратора'}
        </button>
      </form>
    </div>
  );
};

export default AdminRegisterForm;
