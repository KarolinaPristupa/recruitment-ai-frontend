import React from 'react';
import { formatSalary, formatDate, formatListText, formatSkills } from '@/utils/formatters';
import { Vacancy } from '@/types/vacancy';
import styles from './index.module.scss';
import { EMPLOYMENT_TYPE_LABELS } from '@constants/employmet-type-labels';
import { WORK_FORMAT_LABELS } from '@constants/work-format-labels';
import { EXPERIENCE_LABELS } from '@constants/experiance-labels';
import { SCHEDULE_LABELS } from '@constants/schedule-labels';

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
            {vacancy.salaryMin && formatSalary(vacancy.salaryMin, vacancy.currency)}
            {vacancy.salaryMax && ` – ${formatSalary(vacancy.salaryMax, vacancy.currency)}`}
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

      {vacancy.skills && (
        <section className={styles.section}>
          <h2>Навыки</h2>
          <div className={styles.skills}>{formatSkills(vacancy.skills.split('-').join('\n'))}</div>
        </section>
      )}

      <section className={styles.section}>
        <h2>Занятость</h2>
        <div className={styles.detailsRow}>
          <div className={styles.detailItem}>
            <span className={styles.label}>Тип занятости:</span>
            <span className={styles.value}>
              {EMPLOYMENT_TYPE_LABELS[vacancy.employmentType] ?? vacancy.employmentType}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Формат работы:</span>
            <span className={styles.value}>
              {WORK_FORMAT_LABELS[vacancy.workFormat] ?? vacancy.workFormat}
            </span>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Опыт и график</h2>
        <div className={styles.detailsRow}>
          <div className={styles.detailItem}>
            <span className={styles.label}>Опыт:</span>
            <span className={styles.value}>
              {EXPERIENCE_LABELS[vacancy.experience] ?? vacancy.experience}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>График:</span>
            <span className={styles.value}>
              {SCHEDULE_LABELS[vacancy.schedule] ?? vacancy.schedule}
            </span>
          </div>
        </div>
      </section>

      {vacancy.category && (
        <section className={styles.section}>
          <h2>Категория</h2>
          <div>{vacancy.category}</div>
        </section>
      )}
    </div>
  );
};
