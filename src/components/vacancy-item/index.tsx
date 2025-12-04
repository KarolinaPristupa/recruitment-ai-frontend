import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { VacancyResponseDTO } from '@/hooks/use-active-vacancies';
import styles from './index.module.scss';

interface Props {
  vacancy: VacancyResponseDTO;
  children: React.ReactNode;
}

const VacancyItem: React.FC<Props> = ({ vacancy, children }) => {
  const [opened, setOpened] = useState(false);

  const handleToggle = () => {
    setOpened(!opened);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.item}>
        <div className={styles.infoWrapper}>
          <div className={styles.info}>
            <h3 className={styles.title}>{vacancy.title}</h3>
            <span className={styles.date}>Опубликовано {vacancy.publishedAt}</span>
          </div>

          <button onClick={handleToggle} className={styles.responsesBtn}>
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              animate={{ rotate: opened ? 90 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <path
                d="M6 12H18M12 6L18 12L12 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </button>
        </div>
      </div>

      {opened && <div className={styles.content}>{children}</div>}
    </div>
  );
};

export default VacancyItem;
