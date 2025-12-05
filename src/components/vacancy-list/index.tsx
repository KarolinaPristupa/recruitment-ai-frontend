import React from 'react';
import { VacancyResponseDTO } from '@/hooks/use-active-vacancies';
import VacancyItem from '@components/vacancy-item';
import styles from './index.module.scss';

interface Props {
  vacancies: VacancyResponseDTO[];
  renderContent: (vacancy: VacancyResponseDTO) => React.ReactNode;
}

const VacancyList: React.FC<Props> = ({ vacancies, renderContent }) => {
  if (vacancies.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>Нет активных вакансий</h2>
        <p>Создайте новую вакансию, чтобы начать работу</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {vacancies.map((vacancy) => (
        <VacancyItem key={vacancy.id} vacancy={vacancy}>
          {renderContent(vacancy)}
        </VacancyItem>
      ))}
    </div>
  );
};

export default VacancyList;
