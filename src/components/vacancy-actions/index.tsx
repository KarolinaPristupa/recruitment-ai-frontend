import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

interface VacancyActionsProps {
  vacancyId: number;
  onDelete: () => void;
  isDeleting?: boolean;
}

export const VacancyActions: React.FC<VacancyActionsProps> = ({
  vacancyId,
  onDelete,
  isDeleting,
}) => {
  return (
    <div className={styles.actions}>
      <Link to={`/hr/vacancies/${vacancyId}/edit`}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={styles.editBtn}
        >
          Редактировать
        </motion.button>
      </Link>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onDelete}
        disabled={isDeleting}
        className={styles.deleteBtn}
      >
        {isDeleting ? 'Удаление...' : 'Удалить'}
      </motion.button>
    </div>
  );
};
