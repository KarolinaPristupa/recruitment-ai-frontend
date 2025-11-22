'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './index.module.scss';
import { useToastStore } from '@/store/toast-store';
import { ToastIcon } from '@constants/toastIcons';
import { CloseIcon } from '@/constants/closeIcon';

const ToastContainer: React.FC = () => {
  const { toasts, remove } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className={styles.container}>
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: -60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 400, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={`${styles.toast} ${styles[toast.type]}`}
            onClick={() => remove(toast.id)}
          >
            <div className={styles.icon}>
              <ToastIcon type={toast.type as any} />
            </div>

            <p className={styles.message}>{toast.message}</p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                remove(toast.id);
              }}
              className={styles.close}
              aria-label="Закрыть"
            >
              <CloseIcon />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
