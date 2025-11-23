export const formatSalary = (value: string | null | undefined): string => {
  if (!value) return 'по договорённости';

  const num = parseFloat(value);
  if (isNaN(num)) return 'по договорённости';

  return new Intl.NumberFormat('ru-RU').format(num) + ' ₽';
};

export const formatSalaryRange = (min: string | null, max: string | null): string => {
  if (!min && !max) return 'Зарплата по договорённости';
  if (!max) return `от ${formatSalary(min)}`;
  if (!min) return `до ${formatSalary(max)}`;
  return `${formatSalary(min)} – ${formatSalary(max)}`;
};

export const formatDate = (date: string | null) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};
