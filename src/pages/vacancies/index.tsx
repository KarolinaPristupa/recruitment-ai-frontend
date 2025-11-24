import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useVacancies } from '@/hooks/use-vacancy';
import styles from './index.module.scss';
import VacanciesGrid from '@components/vacancies-grid';

const Vacancies: React.FC = () => {
  const { vacancies, loading, error, refetch, deleteVacancy } = useVacancies();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Удалить вакансию навсегда?')) return;
    setDeletingId(id);
    await deleteVacancy(id);
    setDeletingId(null);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

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

  if (error) return <p className={styles.error}>Ошибка загрузки вакансий</p>;

  return (
    <section className={styles.vacanciesSection}>
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.header}
      >
        <h1 className={styles.title}>Мои вакансии</h1>

        <Link to="/hr/vacancies/create">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.createBtn}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Создать вакансию
          </motion.button>
        </Link>
      </motion.div>

      {vacancies.length === 0 ? (
        <div className={styles.empty}>
          <p>У вас пока нет вакансий</p>
          <Link to="/hr/vacancies/create" className={styles.emptyLink}>
            Создать первую вакансию
          </Link>
        </div>
      ) : (
        <VacanciesGrid vacancies={vacancies} deletingId={deletingId} onDelete={handleDelete} />
      )}
    </section>
  );
};

export default Vacancies;
