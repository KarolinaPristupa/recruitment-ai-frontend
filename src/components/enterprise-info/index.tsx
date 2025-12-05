import React from 'react';
import { motion } from 'framer-motion';
import { HrAccountData } from '@/types/hr-account-data';
import styles from './index.module.scss';

interface EnterpriseInfoProps {
  enterprise: HrAccountData;
}

const EnterpriseInfo: React.FC<EnterpriseInfoProps> = ({ enterprise }) => {
  if (!enterprise.enterpriseId) return null;

  const infoItems = [
    {
      icon: (
        <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="56" height="56" rx="14" fill="#1e1e2e" />
          <rect x="14" y="12" width="28" height="32" rx="5" stroke="#a78bfa" strokeWidth="3" />
          <rect x="18" y="18" width="6" height="6" rx="1.5" fill="#a78bfa" opacity="0.7" />
          <rect x="32" y="18" width="6" height="6" rx="1.5" fill="#a78bfa" opacity="0.7" />
          <rect x="18" y="30" width="20" height="3" rx="1" fill="#a78bfa" opacity="0.4" />
        </svg>
      ),
      value: enterprise.enterpriseName || '—',
    },

    {
      icon: (
        <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="56" height="56" rx="14" fill="#1e1e2e" />
          <circle cx="28" cy="24" r="9" stroke="#60a5fa" strokeWidth="3" />
          <circle cx="28" cy="24" r="4" fill="#60a5fa" opacity="0.5" />
          <path d="M28 33 V42 M20 42 H36" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
      value: enterprise.enterpriseAddress || '—',
    },

    {
      icon: (
        <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="56" height="56" rx="14" fill="#1e1e2e" />
          <rect x="12" y="18" width="32" height="20" rx="6" stroke="#f472b6" strokeWidth="3" />
          <path d="M12 18 L28 28 L44 18" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
          <path d="M18 25 L28 32 L38 25" stroke="#f472b6" strokeWidth="2.5" opacity="0.6" />
        </svg>
      ),
      value: enterprise.enterpriseContactEmail || '—',
    },
    {
      icon: (
        <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="56" height="56" rx="14" fill="#1e1e2e" />
          <path
            d="M18 14 H38 A6 6 0 0 1 44 20 V36 A6 6 0 0 1 38 42 H18 A6 6 0 0 1 12 36 V20 A6 6 0 0 1 18 14 Z"
            stroke="#86efac"
            strokeWidth="3"
          />
          <circle cx="28" cy="20" r="3" fill="#86efac" opacity="0.6" />
          <rect x="20" y="28" width="16" height="2" rx="1" fill="#86efac" opacity="0.7" />
          <rect x="20" y="32" width="12" height="2" rx="1" fill="#86efac" opacity="0.7" />
        </svg>
      ),
      value: enterprise.enterpriseContactPhone || '—',
    },
  ];

  return (
    <div className={styles.container}>
      <motion.h3
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={styles.title}
      >
        Информация о предприятии
      </motion.h3>

      <div className={styles.grid}>
        {infoItems.map((item, index) => (
          <motion.div
            key={index}
            className={styles.item}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ x: 8, scale: 1.02 }}
          >
            <div className={styles.iconWrapper}>{item.icon}</div>
            <div className={styles.content}>
              <p className={styles.value}>{item.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className={styles.spacerButton} />
    </div>
  );
};

export default EnterpriseInfo;
