import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { createVacancySchema, CreateVacancyFormData } from './validation-schema';
import styles from './index.module.scss';

interface VacancyFormProps {
  defaultValues?: Partial<CreateVacancyFormData>;
  isSubmitting?: boolean;
  onSubmit: SubmitHandler<CreateVacancyFormData>;
  onCancel: () => void;
}

export const CreateVacancyForm: React.FC<VacancyFormProps> = ({
  defaultValues,
  isSubmitting = false,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateVacancyFormData>({
    resolver: yupResolver(createVacancySchema) as any,
    defaultValues: {
      status: 'DRAFT',
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.field}>
        <label>Название вакансии</label>
        <input {...register('title')} placeholder="Название вакансии" />
        {errors.title && <span className={styles.error}>{errors.title.message}</span>}
      </div>

      <div className={styles.field}>
        <label>Описание</label>
        <textarea
          {...register('description')}
          rows={6}
          placeholder="Расскажите о проекте, задачах, команде..."
        />
        {errors.description && <span className={styles.error}>{errors.description.message}</span>}
      </div>

      <div className={styles.field}>
        <label>Требования к кандидату</label>
        <textarea {...register('requirements')} rows={5} placeholder="Необходимые требования" />
        {errors.requirements && <span className={styles.error}>{errors.requirements.message}</span>}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label>Зарплата от (₽)</label>
          <input {...register('salaryMin')} type="text" inputMode="numeric" placeholder="0" />
          {errors.salaryMin && <span className={styles.error}>{errors.salaryMin.message}</span>}
        </div>
        <div className={styles.field}>
          <label>Зарплата до (₽)</label>
          <input {...register('salaryMax')} type="text" inputMode="numeric" placeholder="0" />
          {errors.salaryMax && <span className={styles.error}>{errors.salaryMax.message}</span>}
        </div>
      </div>

      <div className={styles.field}>
        <label>Статус публикации</label>
        <div className={styles.radioGroup}>
          <label className={styles.radio}>
            <input type="radio" value="DRAFT" {...register('status')} />
            <span>Черновик</span>
          </label>
          <label className={styles.radio}>
            <input type="radio" value="ACTIVE" {...register('status')} />
            <span>Опубликовать сразу</span>
          </label>
        </div>
        {errors.status && <span className={styles.error}>{errors.status.message}</span>}
      </div>

      <div className={styles.actions}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={isSubmitting}
          className={styles.submitBtn}
        >
          {isSubmitting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className={styles.spinner}
            />
          ) : (
            'Создать вакансию'
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onCancel}
          className={styles.cancelBtn}
        >
          Отмена
        </motion.button>
      </div>
    </form>
  );
};
