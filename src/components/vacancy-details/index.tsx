import React, { useMemo } from 'react';
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
  const {
    title,
    status,
    salaryMin,
    salaryMax,
    currency,
    createdAt,
    publishedAt,
    externalIds,
    description,
    requirements,
    skills,
    employmentType,
    workFormat,
    experience,
    schedule,
    category,
  } = vacancy;

  const isActive = status === 'ACTIVE';

  const salaryText = useMemo(() => {
    if (!salaryMin && !salaryMax) return 'Зарплата по договорённости';

    const min = salaryMin ? formatSalary(salaryMin, currency) : '';
    const max = salaryMax ? ` – ${formatSalary(salaryMax, currency)}` : '';

    return `${min}${max}`;
  }, [salaryMin, salaryMax, currency]);

  const dateText = useMemo(
    () =>
      isActive ? `Опубликовано ${formatDate(publishedAt)}` : `Черновик от ${formatDate(createdAt)}`,
    [isActive, publishedAt, createdAt],
  );

  const formattedSkills = useMemo(() => {
    if (!skills) return null;
    return formatSkills(skills.split('-').join('\n'));
  }, [skills]);

  return (
    <div className={styles.details}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>

        <span className={`${styles.status} ${styles[status.toLowerCase()]}`}>
          {isActive ? 'Активна' : 'Черновик'}
        </span>
      </div>

      <div className={styles.salary}>{salaryText}</div>

      <div className={styles.info}>
        <span>{dateText}</span>
        {externalIds && <span>· ID: {externalIds}</span>}
      </div>

      <section className={styles.section}>
        <h2>Описание</h2>
        <div className={styles.description}>{formatListText(description)}</div>
      </section>

      <section className={styles.section}>
        <h2>Требования</h2>
        <div className={styles.requirements}>{formatListText(requirements)}</div>
      </section>

      {formattedSkills && (
        <section className={styles.section}>
          <h2>Навыки</h2>
          <div className={styles.skills}>{formattedSkills}</div>
        </section>
      )}

      <section className={styles.section}>
        <h2>Занятость</h2>
        <div className={styles.detailsRow}>
          <div className={styles.detailItem}>
            <span className={styles.label}>Тип занятости:</span>
            <span className={styles.value}>
              {EMPLOYMENT_TYPE_LABELS[employmentType] ?? employmentType}
            </span>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.label}>Формат работы:</span>
            <span className={styles.value}>{WORK_FORMAT_LABELS[workFormat] ?? workFormat}</span>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Опыт и график</h2>
        <div className={styles.detailsRow}>
          <div className={styles.detailItem}>
            <span className={styles.label}>Опыт:</span>
            <span className={styles.value}>{EXPERIENCE_LABELS[experience] ?? experience}</span>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.label}>График:</span>
            <span className={styles.value}>{SCHEDULE_LABELS[schedule] ?? schedule}</span>
          </div>
        </div>
      </section>

      {category && (
        <section className={styles.section}>
          <h2>Категория</h2>
          <div className={styles.category}>{category}</div>
        </section>
      )}
    </div>
  );
};
