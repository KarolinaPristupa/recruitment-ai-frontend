import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './index.module.scss';
import { stages } from '@/constants/stages';

const StageIcon = ({ type }: { type: string }) => {
  const icons: Record<string, React.ReactNode> = {
    company: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="16" fill="#1e1e2e" />
        <rect x="18" y="14" width="28" height="36" rx="4" stroke="#a78bfa" strokeWidth="3" />
        <rect x="14" y="28" width="36" height="8" rx="2" fill="#a78bfa" opacity="0.25" />
        <rect x="22" y="20" width="6" height="6" rx="1" fill="#a78bfa" />
        <rect x="34" y="20" width="6" height="6" rx="1" fill="#a78bfa" />
      </svg>
    ),
    user: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="16" fill="#1e1e2e" />
        <circle cx="32" cy="20" r="9" stroke="#f472b6" strokeWidth="3" />
        <path
          d="M18 46C18 36 24 32 32 32 32C40 32 46 36 46 46"
          stroke="#f472b6"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    ),
    users: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="16" fill="#1e1e2e" />
        <circle cx="20" cy="20" r="7" stroke="#70e0c8" strokeWidth="3" />
        <circle cx="44" cy="20" r="7" stroke="#70e0c8" strokeWidth="3" />
        <path d="M12 44C12 36 16 32 20 32C28 32 32 36 32 44" stroke="#70e0c8" strokeWidth="3" />
        <path d="M32 44C32 36 36 32 44 32C52 32 56 36 56 44" stroke="#70e0c8" strokeWidth="3" />
      </svg>
    ),
    vacancy: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="16" fill="#1e1e2e" />
        <rect x="16" y="18" width="32" height="32" rx="6" stroke="#ffd93d" strokeWidth="3" />
        <path
          d="M24 18V12C24 10 26 8 30 8H34C38 8 40 10 40 12V18"
          stroke="#ffd93d"
          strokeWidth="3"
        />
        <circle cx="32" cy="30" r="5" fill="#ffd93d" opacity="0.3" />
      </svg>
    ),
  };
  return icons[type] || icons.company;
};

const StagesSection: React.FC = () => {
  const [page, setPage] = useState(0);

  const itemsPerPage = window.innerWidth > 1024 ? 2 : 1;
  const totalPages = Math.ceil(stages.length / itemsPerPage);
  const currentStages = stages.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  useEffect(() => {
    const handleResize = () => {
      const newItems = window.innerWidth > 1024 ? 2 : 1;
      if (newItems === 1) setPage(0);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="stages" className={styles.stagesSection}>
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-100px' }}
        className={styles.title}
      >
        Этапы запуска
      </motion.h2>

      <div className={styles.wrapper}>
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className={styles.arrowBtn}
          aria-label="Назад"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M15 18L9 12L15 6" />
          </svg>
        </button>

        <div className={styles.cardsWrapper}>
          <AnimatePresence mode="wait">
            {currentStages.map((stage, idx) => (
              <motion.div
                key={stage.num}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={styles.card}
              >
                <div className={styles.icon}>
                  <StageIcon type={stage.icon || 'company'} />
                </div>

                <div className={styles.content}>
                  <div className={styles.header}>
                    <span className={styles.num}>{stage.num}</span>
                    <h3 className={styles.stageTitle}>{stage.text}</h3>
                  </div>

                  <ul className={styles.list}>
                    {stage.fields.map((field, i) => (
                      <li key={i}>
                        <span className={styles.bullet}>✦</span>
                        {field}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <button
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page >= totalPages - 1}
          className={styles.arrowBtn}
          aria-label="Вперёд"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M9 18L15 12L9 6" />
          </svg>
        </button>
      </div>

      <div className={styles.dots}>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={page === i ? styles.dotActive : styles.dot}
          />
        ))}
      </div>
    </section>
  );
};

export default StagesSection;
