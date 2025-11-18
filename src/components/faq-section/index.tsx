import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { faqItems } from '@/constants/faqItems';

import styles from './index.module.scss';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className={styles.faqSection}>
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className={styles.sectionTitle}
      >
        Часто задаваемые вопросы
      </motion.h2>

      <div className={styles.faqContainer}>
        {faqItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={styles.faqCard}
          >
            <button
              className={`${styles.faqQuestion} ${openIndex === index ? styles.open : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <span>{item.question}</span>
            </button>

            <div className={`${styles.faqAnswerWrapper} ${openIndex === index ? styles.open : ''}`}>
              <div className={styles.faqAnswer}>{item.answer}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
