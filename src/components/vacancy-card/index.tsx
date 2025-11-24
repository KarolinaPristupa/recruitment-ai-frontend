import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatSalary, formatDate } from '@/utils/formatters';
import { Vacancy } from '@/types/vacancy';
import styles from './index.module.scss';

interface Props {
  vacancy: Vacancy;
  deleting: boolean;
  onDelete: (id: number) => void;
}

const VacancyCard: React.FC<Props> = ({ vacancy, deleting, onDelete }) => {
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.vacancyTitle}>{vacancy.title}</h3>
        <span className={`${styles.status} ${styles[vacancy.status.toLowerCase()]}`}>
          {vacancy.status === 'ACTIVE' ? 'Активна' : 'Черновик'}
        </span>
      </div>

      <div className={styles.salary}>
        {vacancy.salaryMin && vacancy.salaryMax
          ? `${formatSalary(vacancy.salaryMin)} – ${formatSalary(vacancy.salaryMax)}`
          : vacancy.salaryMin
            ? `от ${formatSalary(vacancy.salaryMin)}`
            : 'Зарплата по договорённости'}
      </div>

      <p className={styles.description}>{vacancy.description?.slice(0, 120)}...</p>

      <div className={styles.footer}>
        <span className={styles.date}>
          {vacancy.status === 'ACTIVE' ? (
            <>Опубликовано {formatDate(vacancy.publishedAt)}</>
          ) : (
            <>Черновик от {formatDate(vacancy.createdAt)}</>
          )}
        </span>

        <div className={styles.actions}>
          <Link to={`/hr/vacancies/${vacancy.id}`}>
            <motion.button whileHover={{ scale: 1.1 }} className={styles.btnDetail}>
              <svg viewBox="0 0 24 24">
                <path d="M12 9v3m0 0v3m0-3h3m-3 0H9" stroke="currentColor" strokeWidth="2" />
              </svg>
            </motion.button>
          </Link>

          <Link to={`/hr/vacancies/${vacancy.id}/edit`}>
            <motion.button whileHover={{ scale: 1.1 }} className={styles.btnEdit}>
              <svg viewBox="0 0 24 24">
                <path
                  d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-18h-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M18.5 2.5l3 3L12 15l-4 1 1-4 9.5-9.5z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={styles.btnDelete}
            onClick={() => onDelete(vacancy.id)}
            disabled={deleting}
          >
            {deleting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity }}
              />
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
        </div>
      </div>
    </article>
  );
};

export default VacancyCard;
