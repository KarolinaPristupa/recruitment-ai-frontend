import React from 'react';
import styles from '@components/vacancy-details/index.module.scss';

export const formatSalary = (value: string | null | undefined): string => {
  if (!value) return 'по договорённости';

  const num = parseFloat(value);
  if (isNaN(num)) return 'по договорённости';

  return new Intl.NumberFormat('ru-RU').format(num) + ' ₽';
};

export const formatListText = (text: string | null | undefined): React.ReactNode => {
  if (!text) return null;

  return text
    .split('\n')
    .filter((line) => line.trim() !== '')
    .map((line, index) => {
      const trimmed = line.trim();

      if (/^[-—•·➢✦✧]\s/.test(trimmed) || /^[-—•·➢]\s/.test(trimmed)) {
        const content = trimmed.replace(/^[-—•·➢✦✧]\s*/, '');
        return (
          <div key={index} className={styles.listItem}>
            {content}
          </div>
        );
      }

      return (
        <p key={index} className={styles.paragraph}>
          {trimmed}
        </p>
      );
    });
};

export const formatDate = (date: string | null) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};
