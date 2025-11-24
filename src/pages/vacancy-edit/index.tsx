import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { EditVacancyForm } from '@/components/vacancy-form/edit-vacancy';
import { useIdVacancy } from '@/hooks/use-id-vacancy';
import api from '@/api/instance';
import styles from './index.module.scss';

const VacancyEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { vacancy, loading, error } = useIdVacancy();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    if (!id) return;
    console.log('clicked');

    setIsSubmitting(true);
    try {
      await api.put(`/api/vacancies/${id}`, {
        ...data,
        salaryMin: data.salaryMin ? Number(data.salaryMin) : null,
        salaryMax: data.salaryMax ? Number(data.salaryMax) : null,
      });

      navigate('/hr/vacancies');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Не удалось сохранить');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loader}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className={styles.spinner}
        />
      </div>
    );
  }

  if (error || !vacancy) {
    return <div className={styles.error}>Вакансия не найдена</div>;
  }

  return (
    <section className={styles.section}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.container}
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={styles.title}
        >
          Редактирование вакансии
        </motion.h1>

        <EditVacancyForm
          vacancy={{
            ...vacancy,
            status: vacancy.status as 'ACTIVE' | 'DRAFT',
            salaryMin: vacancy.salaryMin ? String(vacancy.salaryMin) : '',
            salaryMax: vacancy.salaryMax ? String(vacancy.salaryMax) : '',
          }}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={() => navigate(-1)}
        />
      </motion.div>
    </section>
  );
};

export default VacancyEdit;
