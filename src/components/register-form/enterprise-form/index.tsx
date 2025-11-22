import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import enterpriseRegisterSchema from './validation-schema';
import styles from '../index.module.scss';
import { EnterpriseRegisterFormData } from '@/types/enterprise-register-form-data';
import { Link } from 'react-router-dom';
import { useRegistrationStore } from '@/store/registration-store';
import { useToastStore } from '@/store/toast-store';

interface Props {
  onNext: () => void;
}

const EnterpriseRegisterForm: React.FC<Props> = ({ onNext }) => {
  const { success } = useToastStore();
  const setCompanyData = useRegistrationStore((s) => s.setCompanyData);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EnterpriseRegisterFormData>({
    resolver: yupResolver(enterpriseRegisterSchema) as any,
    defaultValues: {
      name: '',
      address: '',
      contactEmail: '',
      contactPhone: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    try {
      setCompanyData(data);
      success('Данные компании сохранены');
      onNext();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Название компании"
            {...register('name')}
            className={errors.name ? styles.errorInput : ''}
          />
          {errors.name && <span className={styles.errorMsg}>{errors.name.message}</span>}
        </div>

        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Адрес"
            {...register('address')}
            className={errors.address ? styles.errorInput : ''}
          />
          {errors.address && <span className={styles.errorMsg}>{errors.address.message}</span>}
        </div>

        <div className={styles.inputWrapper}>
          <input
            type="email"
            placeholder="Email"
            {...register('contactEmail')}
            className={errors.contactEmail ? styles.errorInput : ''}
          />
          {errors.contactEmail && (
            <span className={styles.errorMsg}>{errors.contactEmail.message}</span>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <input
            type="tel"
            placeholder="Телефон"
            {...register('contactPhone')}
            className={errors.contactPhone ? styles.errorInput : ''}
          />
          {errors.contactPhone && (
            <span className={styles.errorMsg}>{errors.contactPhone.message}</span>
          )}
        </div>

        <button type="submit" disabled={isSubmitting} className={styles.submit}>
          Зарегистрироваться
        </button>
      </form>
      <p className={styles.loginText}>
        Уже есть аккаунт? <Link to="/login">Войдите</Link>
      </p>
    </div>
  );
};

export default EnterpriseRegisterForm;
