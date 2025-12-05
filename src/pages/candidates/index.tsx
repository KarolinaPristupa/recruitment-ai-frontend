import React from 'react';
import { useActiveVacancies } from '@/hooks/use-active-vacancies';
import { useToastStore } from '@/store/toast-store';
import VacancyList from '@/components/vacancy-list';
import VacancyResponses from '@components/vacancy-responses';
import { useVacancyResponses } from '@/api/instance/responses-api';

import styles from './index.module.scss';
import { motion } from 'framer-motion';

const Candidates: React.FC = () => {
  const { vacancies, loading, error, refetch } = useActiveVacancies();
  const { error: toastError } = useToastStore();
  const { responsesMap, loading: responsesLoading } = useVacancyResponses(vacancies);

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
      <h1 className={styles.title}>Активные вакансии для откликов</h1>

      <VacancyList
        vacancies={vacancies}
        renderContent={(vacancy) => {
          const responses = responsesMap[vacancy.id] || [];
          return <VacancyResponses opened={true} responses={responses} />;
        }}
      />
    </div>
  );
};

export default Candidates;
