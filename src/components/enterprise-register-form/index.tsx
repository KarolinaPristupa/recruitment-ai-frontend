import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import enterpriseRegisterSchema from './validation-schema';
import styles from './index.module.scss';
import { EnterpriseRegisterFormData } from '@/types/enterprise-register-form-data';
import { Link } from 'react-router-dom';

const EnterpriseRegisterForm: React.FC = () => {
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
  });

  const onSubmit: SubmitHandler<EnterpriseRegisterFormData> = async (data) => {
    try {
      const res = await fetch('http://localhost:8080/api/auth/enterprise/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Ошибка регистрации');
      alert('Компания зарегистрирована!');
    } catch (err) {
      alert(err);
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
