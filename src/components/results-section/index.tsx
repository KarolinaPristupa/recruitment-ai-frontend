// src/components/results-section/create-vacancy.tsx
import React from 'react';
import { motion } from 'framer-motion';
import styles from './index.module.scss';

const ResultsSection: React.FC = () => {
  return (
    <section id="results" className={styles.resultsSection}>
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className={styles.title}
      >
        Результаты внедрения
      </motion.h2>

      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.graphSide}
        >
          <div className={styles.graphCard}>
            <div className={styles.graph}>
              <div className={styles.bar} style={{ height: '70%' }} />
              <div className={styles.bar} style={{ height: '90%' }} />
              <div className={styles.bar} style={{ height: '55%' }} />
              <div className={styles.bar} style={{ height: '100%' }} />
              <div className={styles.bar} style={{ height: '80%' }} />
            </div>

            <div className={styles.stats}>
              <motion.div whileHover={{ scale: 1.15, rotate: 5 }} className={styles.statItem}>
                <div className={styles.iconWrapper}>
                  <svg viewBox="0 0 64 64" fill="none">
                    <rect width="64" height="64" rx="16" fill="#1e1e2e" />
                    <path
                      d="M18 42L26 34L36 40L46 28"
                      stroke="#70e0c8"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <circle cx="46" cy="28" r="5" fill="#70e0c8" />
                  </svg>
                </div>
                <span className={styles.statNumber}>+40%</span>
                <span className={styles.statLabel}>релевантных откликов</span>
              </motion.div>

              <motion.div whileHover={{ scale: 1.15, rotate: -5 }} className={styles.statItem}>
                <div className={styles.iconWrapper}>
                  <svg viewBox="0 0 64 64" fill="none">
                    <rect width="64" height="64" rx="16" fill="#1e1e2e" />
                    <circle cx="32" cy="32" r="14" stroke="#a78bfa" strokeWidth="4" />
                    <path d="M32 18L32 46" stroke="#a78bfa" strokeWidth="4" />
                    <path d="M18 32L46 32" stroke="#a78bfa" strokeWidth="4" />
                  </svg>
                </div>
                <span className={styles.statNumber}>–60%</span>
                <span className={styles.statLabel}>времени на отбор</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={styles.textSide}
        >
          <p className={styles.text}>
            С <strong>V.AI</strong> вы закрываете вакансии{' '}
            <span className={styles.highlight}>в 3–5 раз быстрее</span> и{' '}
            <span className={styles.highlight}>в 2 раза дешевле</span>:
          </p>

          <ul className={styles.benefits}>
            <motion.li whileHover={{ x: 12 }}>
              <span className={styles.bullet}>✦</span> Одна кнопка — вакансия мгновенно на площадках
            </motion.li>
            <motion.li whileHover={{ x: 12 }}>
              <span className={styles.bullet}>✦</span> Все отклики и резюме автоматически собираются
              в систему — никаких ручных скачиваний
            </motion.li>
            <motion.li whileHover={{ x: 12 }}>
              <span className={styles.bullet}>✦</span> ИИ за секунды анализирует сотни резюме и
              выдаёт только тех, кто реально подходит (точность 92%+)
            </motion.li>
            <motion.li whileHover={{ x: 12 }}>
              <span className={styles.bullet}>✦</span> Вы видите рейтинг кандидатов, прогноз
              закрытия вакансии и рекомендации — кто из них примет оффер с вероятностью 80%+
            </motion.li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsSection;
