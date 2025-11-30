import React, { useEffect } from 'react';
import { useActiveVacancies } from '@/hooks/use-active-vacancies';
import { useToastStore } from '@/store/toast-store';
import ActiveVacancyItem from '@components/vacancy-active';
import styles from './index.module.scss';
import { motion } from 'framer-motion';

const Candidates: React.FC = () => {
  const { vacancies, loading, error, refetch } = useActiveVacancies();
  const { error: toastError } = useToastStore();

  useEffect(() => {
    if (error) {
      toastError('Не удалось загрузить активные вакансии');
    }
  }, [error, toastError]);

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

  if (vacancies.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>У вас пока нет активных вакансий</h2>
        <p>Создайте новую вакансию, чтобы начать получать отклики</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={styles.title}
      >
        Опубликованные вакансии
      </motion.h1>

      <div className={styles.list}>
        {vacancies.map((vacancy) => (
          <ActiveVacancyItem key={vacancy.id} vacancy={vacancy} />
        ))}
      </div>
    </div>
  );
};

export default Candidates;
