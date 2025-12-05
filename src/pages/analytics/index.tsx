import React from 'react';
import { useActiveVacancies } from '@/hooks/use-active-vacancies';
import VacancyList from '@/components/vacancy-list';
import VacancyAnalytics from '@components/vacancy-analytics';
import { motion } from 'framer-motion';

import styles from './index.module.scss';
import { useToastStore } from '@/store/toast-store';

const Analytics: React.FC = () => {
  const { vacancies, loading, error, refetch } = useActiveVacancies();
  const { error: toastError } = useToastStore();

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
  if (error) {
    return <p className={styles.error}>Ошибка загрузки вакансий</p>;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Активные вакансии для аналитики</h1>
      <VacancyList
        vacancies={vacancies}
        renderContent={(vacancy) => <VacancyAnalytics vacancyId={vacancy.id} />}
      />
    </div>
  );
};

export default Analytics;
