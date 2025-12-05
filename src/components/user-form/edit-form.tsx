import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { HrAccountData } from '@/types/hr-account-data';
import { UserEditSchema } from '@components/user-form/validation-schema';
import { UserEditFormData } from '@/types/user-edit-form-data';

import styles from './index.module.scss';

interface UserEditProps {
  user: HrAccountData;
  onCancel: () => void;
  onSave: (data: Partial<HrAccountData> & { password?: string }) => void;
}

const UserEdit: React.FC<UserEditProps> = ({ user, onCancel, onSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserEditFormData>({
    defaultValues: {
      ...user,
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(UserEditSchema) as any,
  });

  const submit = (data: UserEditFormData) => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      ...(data.password ? { password: data.password } : {}),
    };
    onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label}>Имя</label>
        <input
          {...register('firstName')}
          className={`${styles.input} ${errors.firstName ? styles.error : ''}`}
        />
        {errors.firstName && <p className={styles.error}>{errors.firstName.message}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Фамилия</label>
        <input
          {...register('lastName')}
          className={`${styles.input} ${errors.lastName ? styles.error : ''}`}
        />
        {errors.lastName && <p className={styles.error}>{errors.lastName.message}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Email</label>
        <input
          {...register('email')}
          type="email"
          className={`${styles.input} ${errors.email ? styles.error : ''}`}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Телефон</label>
        <input {...register('phone')} className={styles.input} />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Новый пароль</label>
        <input
          type="password"
          {...register('password')}
          className={`${styles.input} ${errors.password ? styles.error : ''}`}
        />
        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Повторите пароль</label>
        <input
          type="password"
          {...register('confirmPassword')}
          className={`${styles.input} ${errors.confirmPassword ? styles.error : ''}`}
        />
        {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
      </div>

      <div className={styles.actions}>
        <button type="submit" className={`${styles.btn} ${styles.save}`}>
          Сохранить
        </button>
        <button type="button" onClick={onCancel} className={`${styles.btn} ${styles.cancel}`}>
          Отмена
        </button>
      </div>
    </form>
  );
};

export default UserEdit;
