import React from 'react';
import { formatSalary, formatDate, formatListText } from '@/utils/formatters';
import { Vacancy } from '@/types/vacancy';
import styles from './index.module.scss';

interface VacancyDetailsProps {
  vacancy: Vacancy;
}

export const VacancyDetails: React.FC<VacancyDetailsProps> = ({ vacancy }) => {
  const isActive = vacancy.status === 'ACTIVE';

  return (
    <div className={styles.details}>
      <div className={styles.header}>
        <h1 className={styles.title}>{vacancy.title}</h1>
        <span className={`${styles.status} ${styles[vacancy.status.toLowerCase()]}`}>
          {isActive ? 'Активна' : 'Черновик'}
        </span>
      </div>

      <div className={styles.salary}>
        {vacancy.salaryMin || vacancy.salaryMax ? (
          <>
            {vacancy.salaryMin && formatSalary(vacancy.salaryMin)}
            {vacancy.salaryMax && ` – ${formatSalary(vacancy.salaryMax)} ₽`}
          </>
        ) : (
          'Зарплата по договорённости'
        )}
      </div>

      <div className={styles.info}>
        <span>
          {isActive ? (
            <>Опубликовано {formatDate(vacancy.publishedAt)}</>
          ) : (
            <>Черновик от {formatDate(vacancy.createdAt)}</>
          )}
        </span>
        {vacancy.externalIds && <span> · ID: {vacancy.externalIds}</span>}
      </div>

      <section className={styles.section}>
        <h2>Описание</h2>
        <div className={styles.description}>{formatListText(vacancy.description)}</div>
      </section>

      <section className={styles.section}>
        <h2>Требования</h2>
        <div className={styles.requirements}>{formatListText(vacancy.requirements)}</div>
      </section>
    </div>
  );
};
