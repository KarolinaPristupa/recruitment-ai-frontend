import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import VacanciesGrid from '@components/vacancies-grid';
import { Vacancy } from '@/types/vacancy';
import api from '@/api/instance';
import styles from './index.module.scss';
import { useUserRole } from '@/hooks/use-user-role';

const VacanciesAll: React.FC = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const role = useUserRole();

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        setLoading(true);
        const res = await api.get<Vacancy[]>('/api/vacancies');
        setVacancies(res.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchVacancies();
  }, []);

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

  if (vacancies.length === 0) {
    return <div className={styles.empty}>Вакансий пока нет</div>;
  }

  return (
    <section className={styles.vacanciesSection}>
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.title}
      >
        Все вакансии
      </motion.h1>

      <VacanciesGrid
        vacancies={vacancies}
        deletingId={null}
        publishingId={null}
        onDelete={role === 'HR' ? (id: number) => {} : undefined}
        onPublish={role === 'HR' ? (id: number) => {} : undefined}
      />
    </section>
  );
};

export default VacanciesAll;
