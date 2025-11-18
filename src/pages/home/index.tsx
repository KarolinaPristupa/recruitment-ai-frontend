import React, { useState } from 'react';
import chartImage from '@/assets/ai-graph.png';
import { faqItems } from '@/constants/faqItems';
import MainSection from '@components/main-section';

import styles from './index.module.scss';
import StagesSection from '@components/stages-section';

const Home: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.home}>
      <MainSection />
      <StagesSection />
      <section id="results" className={styles.resultsSection}>
        <h2 className={styles.sectionTitle}>Результаты внедрения</h2>
        <p className={styles.resultsText}>
          После внедрения Recruitment AI компании экономят до <strong>60% времени</strong> на отбор
          кандидатов и получают <strong>на 40% больше релевантных откликов</strong>. Аналитика
          помогает точно определить, какие каналы приносят лучших кандидатов.
        </p>
        <img src={chartImage} alt="AI analytics graph" className={styles.resultImage} />
      </section>

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
