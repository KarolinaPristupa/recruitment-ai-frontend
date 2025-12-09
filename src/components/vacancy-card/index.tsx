import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatSalary, formatDate } from '@/utils/formatters';
import { Vacancy } from '@/types/vacancy';
import styles from './index.module.scss';
import { useUserRole } from '@/hooks/use-user-role';
import { VacancyActions } from '@components/vacancy-actions';

interface Props {
  vacancy: Vacancy;
  deleting: boolean;
  publishing?: boolean;
  onDelete: (id: number) => void;
  onPublish?: (id: number) => void;
}

const VacancyCard: React.FC<Props> = ({ vacancy, deleting, publishing, onDelete, onPublish }) => {
  const isHR = useUserRole() === 'HR';

  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.vacancyTitle}>{vacancy.title}</h3>
        <span className={`${styles.status} ${styles[vacancy.status.toLowerCase()]}`}>
          {vacancy.status === 'ACTIVE' ? 'Активна' : 'Черновик'}
        </span>
      </div>

      <div className={styles.salary}>
        {vacancy.salaryMin || vacancy.salaryMax ? (
          <>
            {vacancy.salaryMin && formatSalary(vacancy.salaryMin, vacancy.currency)}
            {vacancy.salaryMax && ` – ${formatSalary(vacancy.salaryMax, vacancy.currency)}`}
          </>
        ) : (
          'Зарплата по договорённости'
        )}
      </div>

      <p className={styles.description}>{vacancy.description?.slice(0, 120)}...</p>

      <div className={styles.footer}>
        <span className={styles.date}>
          {vacancy.status === 'ACTIVE'
            ? `Опубликовано ${formatDate(vacancy.publishedAt)}`
            : `Черновик от ${formatDate(vacancy.createdAt)}`}
        </span>

        <div className={styles.actions}>
          {isHR && onPublish && (
            <VacancyActions
              vacancyId={vacancy.id}
              onDelete={() => onDelete(vacancy.id)}
              onPublish={() => onPublish(vacancy.id)}
              isDeleting={deleting}
              isPublishing={publishing}
            />
          )}
          <Link to={`/hr/vacancies/${vacancy.id}`}>
            <motion.button whileHover={{ scale: 1.1 }} className={styles.btnDetail}>
              <svg viewBox="0 0 24 24">
                <path d="M12 9v3m0 0v3m0-3h3m-3 0H9" stroke="currentColor" strokeWidth="2" />
              </svg>
            </motion.button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default VacancyCard;
