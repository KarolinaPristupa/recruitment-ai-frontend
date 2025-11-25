import React from 'react';
import styles from '@components/vacancy-details/index.module.scss';
import { currencySymbols } from '@constants/currencySymbols';

export const formatSalary = (
  value: string | number | null | undefined,
  currency?: string,
): string => {
  if (!value) return 'по договорённости';

  const num = Number(value);
  if (isNaN(num)) return 'по договорённости';

  const symbol = currency ? currencySymbols[currency] || currency : '';

  return `${new Intl.NumberFormat('ru-RU').format(num)} ${symbol}`.trim();
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

export const formatSkills = (text: string | null | undefined): React.ReactNode => {
  if (!text) return null;

  const items = text
    .split(/[\n-]+/)
    .map((t) => t.trim())
    .filter(Boolean);

  return items.map((item, index) => (
    <div key={index} className={styles.listItem}>
      {item}
    </div>
  ));
};

export const formatDate = (date: string | null) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};
