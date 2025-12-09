import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EntEditSchema } from './validation-schema';
import styles from '../index.module.scss';
import { HrAccountData } from '@/types/hr-account-data';

interface EntEditFormProps {
  enterprise: HrAccountData;
  onCancel: () => void;
  onSave: (data: HrAccountData) => void;
}

const EntEditForm: React.FC<EntEditFormProps> = ({ enterprise, onCancel, onSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HrAccountData>({
    defaultValues: enterprise,
    resolver: yupResolver(EntEditSchema) as any,
  });

  const submit = (data: HrAccountData) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label}>Название предприятия</label>
        <input
          {...register('enterpriseName')}
          className={`${styles.input} ${errors.enterpriseName ? styles.error : ''}`}
        />
        {errors.enterpriseName && <p className={styles.error}>{errors.enterpriseName.message}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Адрес</label>
        <input
          {...register('enterpriseAddress')}
          className={`${styles.input} ${errors.enterpriseAddress ? styles.error : ''}`}
        />
        {errors.enterpriseAddress && (
          <p className={styles.error}>{errors.enterpriseAddress.message}</p>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Контактный Email</label>
        <input
          type="email"
          {...register('enterpriseContactEmail')}
          className={`${styles.input} ${errors.enterpriseContactEmail ? styles.error : ''}`}
        />
        {errors.enterpriseContactEmail && (
          <p className={styles.error}>{errors.enterpriseContactEmail.message}</p>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Телефон</label>
        <input
          {...register('enterpriseContactPhone')}
          className={`${styles.input} ${errors.enterpriseContactPhone ? styles.error : ''}`}
        />
        {errors.enterpriseContactPhone && (
          <p className={styles.error}>{errors.enterpriseContactPhone.message}</p>
        )}
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

export default EntEditForm;
