import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToastStore } from '@/store/toast-store';
import api from '@/api/instance';

import { AddUserData } from '@/types/add-user';
import { userCreateSchema } from './validation-schema';
import styles from '../index.module.scss';
import { getHrAccount } from '@/api/instance/hr-account-api';

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

const UserCreateForm: React.FC<Props> = ({ onSuccess, onCancel }) => {
  const { success, error } = useToastStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<AddUserData>({
    resolver: yupResolver(userCreateSchema) as any,
    mode: 'onChange',
  });

  const onSubmit = async (data: AddUserData) => {
    try {
      let payload = (({ confirmPassword, ...rest }) => rest)(data);

      if (data.role === 'HR') {
        const hr = await getHrAccount();
        payload = { ...payload, enterpriseId: hr.enterpriseId };
      }

      await api.post('/api/enterprise/users', payload);
      success('Сотрудник создан');
      onSuccess();
    } catch (e: any) {
      error(e?.message || 'Ошибка создания');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} ${styles.scrollable}`}>
      <h3>Создание сотрудника</h3>

      <div className={styles.field}>
        <label className={styles.label}>Имя</label>
        <input
          {...register('firstName')}
          className={`${styles.input} ${errors.firstName ? styles.error : ''}`}
        />
        {errors.firstName && <span className={styles.error}>{errors.firstName.message}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Фамилия</label>
        <input
          {...register('lastName')}
          className={`${styles.input} ${errors.lastName ? styles.error : ''}`}
        />
        {errors.lastName && <span className={styles.error}>{errors.lastName.message}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Email</label>
        <input
          {...register('email')}
          className={`${styles.input} ${errors.email ? styles.error : ''}`}
        />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Телефон</label>
        <input
          {...register('phone')}
          className={`${styles.input} ${errors.phone ? styles.error : ''}`}
        />
        {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Пароль</label>
        <input
          type="password"
          {...register('password')}
          className={`${styles.input} ${errors.password ? styles.error : ''}`}
        />
        {errors.password && <span className={styles.error}>{errors.password.message}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Повторите пароль</label>
        <input
          type="password"
          {...register('confirmPassword')}
          className={`${styles.input} ${errors.confirmPassword ? styles.error : ''}`}
        />
        {errors.confirmPassword && (
          <span className={styles.error}>{errors.confirmPassword.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Роль</label>
        <select {...register('role')} className={styles.input}>
          <option value="HR">HR</option>
          <option value="ENT_ADMIN">Администратор</option>
        </select>
      </div>

      <div className={styles.actions}>
        <button type="button" className={`${styles.btn} ${styles.cancel}`} onClick={onCancel}>
          Отмена
        </button>
        <button
          type="submit"
          className={`${styles.btn} ${styles.save}`}
          disabled={!isValid || isSubmitting}
        >
          Создать
        </button>
      </div>
    </form>
  );
};

export default UserCreateForm;
