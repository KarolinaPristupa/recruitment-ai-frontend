import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import VacancyCard from '@components/vacancy-card';
import { Vacancy } from '@/types/vacancy';
import styles from './index.module.scss';

interface Props {
  vacancies: Vacancy[];
  deletingId: number | null;
  publishingId: number | null;
  onDelete: (id: number) => void;
  onPublish: (id: number) => void;
}

const VacanciesGrid: React.FC<Props> = ({
  vacancies,
  deletingId,
  publishingId,
  onDelete,
  onPublish,
}) => {
  return (
    <div className={styles.grid}>
      <AnimatePresence mode="popLayout">
        {vacancies.map((v) => (
          <motion.div
            key={v.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -30 }}
            transition={{ duration: 0.4 }}
          >
            <VacancyCard
              vacancy={v}
              deleting={deletingId === v.id}
              publishing={publishingId === v.id}
              onDelete={onDelete}
              onPublish={onPublish}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default VacanciesGrid;
