import React from 'react';
import { motion } from 'framer-motion';
import { HrAccountData } from '@/types/hr-account-data';
import styles from './index.module.scss';

interface UserInfoProps {
  user: HrAccountData;
  onEdit: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ user, onEdit }) => {
  const infoItems = [
    {
      icon: (
        <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="56" height="56" rx="14" fill="#1e1e2e" />
          <circle cx="28" cy="18" r="9" stroke="#c084fc" strokeWidth="3" />
          <path
            d="M16 42 C16 34, 22 30, 28 30 S40 34, 40 42"
            stroke="#c084fc"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      ),
      value: user.firstName,
    },
    {
      icon: (
        <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="56" height="56" rx="14" fill="#1e1e2e" />
          <circle cx="28" cy="18" r="9" stroke="#f472b6" strokeWidth="3" />
          <path
            d="M16 42 C16 34, 22 30, 28 30 S40 34, 40 42"
            stroke="#f472b6"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <rect x="20" y="14" width="16" height="3" rx="1" fill="#f472b6" opacity="0.6" />
        </svg>
      ),
      value: user.lastName,
    },
    {
      icon: (
        <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="56" height="56" rx="14" fill="#1e1e2e" />
          <rect x="12" y="18" width="32" height="20" rx="6" stroke="#60a5fa" strokeWidth="3" />
          <path d="M12 18 L28 28 L44 18" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
      value: user.email,
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
        </svg>
      ),
      value: user.phone || '—',
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
        Личная инфорамация
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

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.98 }}
        onClick={onEdit}
        className={styles.editButton}
      >
        Редактировать профиль
      </motion.button>
    </div>
  );
};

export default UserInfo;
