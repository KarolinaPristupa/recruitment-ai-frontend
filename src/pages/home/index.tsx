import React, { useState } from 'react';
import { faqItems } from '@/constants/faqItems';
import MainSection from '@components/main-section';

import styles from './index.module.scss';
import StagesSection from '@components/stages-section';
import ResultsSection from '@/components/results-section';

const Home: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.home}>
      <MainSection />
      <StagesSection />
      <ResultsSection />

      <section id="faq" className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>Часто задаваемые вопросы</h2>
        <ul className={styles.faqList}>
          {faqItems.map((item, index) => (
            <li key={index} className={styles.faqItem}>
              <button
                className={`${styles.faqQuestion} ${openIndex === index ? styles.open : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                {item.question}
              </button>
              <div className={`${styles.faqAnswer} ${openIndex === index ? styles.show : ''}`}>
                {item.answer}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;
