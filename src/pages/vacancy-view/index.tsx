import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { VacancyDetails } from '@components/vacancy-details';
import { VacancyActions } from '@components/vacancy-actions';
import styles from './index.module.scss';
import { useIdVacancy } from '@/hooks/use-id-vacancy';

const VacancyView: React.FC = () => {
  const { vacancy, loading, error, deleteVacancy } = useIdVacancy();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteVacancy();
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
        <VacancyDetails vacancy={vacancy} />
        <VacancyActions vacancyId={vacancy.id} onDelete={handleDelete} isDeleting={isDeleting} />
      </motion.div>
    </section>
  );
};

export default VacancyView;
