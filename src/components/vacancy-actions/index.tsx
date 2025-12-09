import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

interface VacancyActionsProps {
  vacancyId: number;
  onDelete: () => void;
  onPublish: () => void;
  isDeleting?: boolean;
  isPublishing?: boolean;
}

export const VacancyActions: React.FC<VacancyActionsProps> = ({
  vacancyId,
  onDelete,
  onPublish,
  isDeleting,
  isPublishing,
}) => {
  return (
    <div className={styles.actions}>
      <Link to={`/hr/vacancies/${vacancyId}/edit`}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={styles.btnEdit}
        >
          <svg viewBox="0 0 24 24">
            <path
              d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-18h-7"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path d="M18.5 2.5l3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" />
          </svg>
        </motion.button>
      </Link>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onDelete}
        disabled={isDeleting}
        className={styles.btnDelete}
      >
        {isDeleting ? (
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} />
        ) : (
          <svg viewBox="0 0 24 24">
            <path
              d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-8 0h10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M10 11v6M14 11v6M5 6l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        )}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPublish}
        disabled={isPublishing}
        className={styles.btnPublish}
      >
        {isPublishing ? (
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} />
        ) : (
          <svg viewBox="0 0 24 24">
            <path
              d="M3 11l17-8-7 18-2-7-8-3z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        )}
      </motion.button>
    </div>
  );
};
