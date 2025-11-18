import React from 'react';
import heroImage from '@assets/ai-human.png';

import styles from './index.module.scss';

const MainSection: React.FC = () => {
  return (
    <section id="main" className={styles.mainSection}>
      <div className={styles.mainContent}>
        <h1 className={styles.title}>V.AI</h1>
        <p className={styles.subtitle}>
          Онлайн-платформа для автоматизации подбора персонала.
          <br />
          Публикуйте вакансии, собирайте отклики и получайте <strong>AI-анализ кандидатов</strong>.
        </p>
        <p className={styles.slogan}>Меньше рутинной работы — больше качественных кандидатов.</p>
      </div>
      <img src={heroImage} alt="AI cooperation" className={styles.heroImage} />
    </section>
  );
};

export default MainSection;
