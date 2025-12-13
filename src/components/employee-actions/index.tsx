import React from 'react';
import { motion } from 'framer-motion';
import styles from './index.module.scss';

interface Props {
  onEdit: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
  disabled?: boolean;
}

export const EmployeeActions: React.FC<Props> = ({ onEdit, onDelete, isDeleting, disabled }) => {
  return (
    <div className={styles.actions}>
      <motion.button
        whileHover={!disabled ? { scale: 1.05 } : undefined}
        whileTap={!disabled ? { scale: 0.95 } : undefined}
        className={`${styles.btnEdit} ${disabled ? styles.disabled : ''}`}
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled) onEdit();
        }}
      >
        <svg viewBox="0 0 24 24">
          <path
            d="M18.5 2.5l3 3L12 15l-4 1 1-4 9.5-9.5z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </motion.button>

      <motion.button
        whileHover={!disabled ? { scale: 1.05 } : undefined}
        whileTap={!disabled ? { scale: 0.95 } : undefined}
        className={`${styles.btnDelete} ${disabled ? styles.disabled : ''}`}
        disabled={disabled || isDeleting}
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled) onDelete();
        }}
      >
        {isDeleting ? (
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} />
        ) : (
          <svg viewBox="0 0 24 24">
            <path
              d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-8 0h10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M10 11v6M14 11v6M5 6l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        )}
      </motion.button>
    </div>
  );
};
