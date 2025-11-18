import React from 'react';
import StagesSection from '@components/stages-section';
import ResultsSection from '@/components/results-section';
import MainSection from '@components/main-section';
import FaqSection from '@components/faq-section';

import styles from './index.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <MainSection />
      <StagesSection />
      <ResultsSection />
      <FaqSection />
    </div>
  );
};

export default Home;
