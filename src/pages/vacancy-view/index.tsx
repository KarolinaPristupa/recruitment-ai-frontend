import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { VacancyDetails } from '@components/vacancy-details';
import { VacancyActions } from '@components/vacancy-actions';
import styles from './index.module.scss';
import { useIdVacancy } from '@/hooks/use-id-vacancy';
import { useToastStore } from '@/store/toast-store';

const VacancyView: React.FC = () => {
  const { vacancy, loading, error: loadError, deleteVacancy } = useIdVacancy();
  const { success, error: toastError } = useToastStore();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Удалить вакансию навсегда?')) return;

    setIsDeleting(true);

    try {
      await deleteVacancy();
      success('Вакансия удалена');
    } catch (e) {
      toastError('Не удалось удалить вакансию');
    } finally {
      setIsDeleting(false);
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

  if (loadError || !vacancy) {
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
