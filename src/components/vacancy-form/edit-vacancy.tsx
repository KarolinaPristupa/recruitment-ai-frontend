import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { createVacancySchema, CreateVacancyFormData } from './validation-schema';
import styles from './index.module.scss';

interface EditVacancyFormProps {
  vacancy: CreateVacancyFormData | null;
  isSubmitting?: boolean;
  onSubmit: SubmitHandler<CreateVacancyFormData>;
  onCancel: () => void;
}

export const EditVacancyForm: React.FC<EditVacancyFormProps> = ({
  vacancy,
  isSubmitting = false,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateVacancyFormData>({
    resolver: yupResolver(createVacancySchema) as any,
  });

  useEffect(() => {
    if (vacancy) {
      reset({
        ...vacancy,
        salaryMin: vacancy.salaryMin ? vacancy.salaryMin.split('.')[0] : '',
        salaryMax: vacancy.salaryMax ? vacancy.salaryMax.split('.')[0] : '',
        status: vacancy.status ?? 'DRAFT',
        skills: vacancy.skills ?? '',
        workFormat: vacancy.workFormat || undefined,
        employmentType: vacancy.employmentType || undefined,
        experience: vacancy.experience || undefined,
        schedule: vacancy.schedule || undefined,
        category: vacancy.category || undefined,
      });
    }
  }, [vacancy, reset]);

  if (!vacancy) {
    return <div>Загрузка вакансии...</div>;
  }

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
        <textarea {...register('requirements')} rows={5} placeholder="Требования" />
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
        <label>Валюта</label>
        <div className={styles.selectWrapper}>
          <select {...register('currency')} className={styles.select} defaultValue="">
            <option value="" disabled hidden>
              Выберите валюту
            </option>
            <option value="RUB">₽ (RUB) — Россия</option>
            <option value="EUR">€ (EUR) — Европа</option>
            <option value="USD">$ (USD) — США</option>
          </select>
        </div>
        {errors.currency && <span className={styles.error}>{errors.currency.message}</span>}
      </div>

      <div className={styles.field}>
        <label>Навыки (через "-")</label>
        <input {...register('skills')} placeholder="React-JavaScript-TypeScript" />
        {errors.skills && <span className={styles.error}>{errors.skills.message}</span>}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label>Формат работы</label>
          <select {...register('workFormat')} className={styles.select}>
            <option value="" disabled hidden>
              Выберите формат
            </option>
            <option value="OFFICE">Офис</option>
            <option value="REMOTE">Удалённая</option>
            <option value="HYBRID">Гибрид</option>
          </select>
          {errors.workFormat && <span className={styles.error}>{errors.workFormat.message}</span>}
        </div>

        <div className={styles.field}>
          <label>Тип занятости</label>
          <select {...register('employmentType')} className={styles.select}>
            <option value="" disabled hidden>
              Выберите тип занятости
            </option>
            <option value="FULL_TIME">Полная занятость</option>
            <option value="PART_TIME">Частичная занятость</option>
            <option value="PROJECT">Проектная работа</option>
            <option value="VOLUNTEER">Волонтёрство</option>
            <option value="TRAINING">Стажировка</option>
          </select>
          {errors.employmentType && (
            <span className={styles.error}>{errors.employmentType.message}</span>
          )}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label>Опыт работы</label>
          <select {...register('experience')} className={styles.select}>
            <option value="" disabled hidden>
              Выберите опыт
            </option>
            <option value="NO_EXPERIENCE">Нет опыта</option>
            <option value="1_3_YEARS">1-3 года</option>
            <option value="3_6_YEARS">3-6 лет</option>
            <option value="6_PLUS_YEARS">Более 6 лет</option>
          </select>
          {errors.experience && <span className={styles.error}>{errors.experience.message}</span>}
        </div>

        <div className={styles.field}>
          <label>График работы</label>
          <select {...register('schedule')} className={styles.select}>
            <option value="" disabled hidden>
              Выберите график
            </option>
            <option value="FULL_DAY">Полный день</option>
            <option value="REMOTE">Удалённо</option>
            <option value="FLEXIBLE">Гибкий график</option>
          </select>
          {errors.schedule && <span className={styles.error}>{errors.schedule.message}</span>}
        </div>
      </div>

      <div className={styles.field}>
        <label>Категория вакансии</label>
        <input {...register('category')} placeholder="например, IT, Продажи" />
        {errors.category && <span className={styles.error}>{errors.category.message}</span>}
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
            <span>Опубликовать</span>
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
            'Сохранить изменения'
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
