import React from 'react';
import { motion } from 'framer-motion';
import { UserAccountData } from '@/types/user-account-data';
import styles from './index.module.scss';
import { EmployeeActions } from '@components/employee-actions';

interface Props {
  user: UserAccountData;
  onSelect: (email: string) => void;
  onEdit: (email: string) => void;
  onDelete: (email: string) => void;
}
const EmployeeCard: React.FC<Props> = ({ user, onSelect, onEdit, onDelete }) => {
  const currentUserEmail = localStorage.getItem('userEmail');
  const isSelf = currentUserEmail === user.email;

  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => onSelect(user.email)}
      >
        <h4 className={styles.name}>
          {user.firstName} {user.lastName}
        </h4>
        <p className={styles.email}>{user.email}</p>
        <p className={styles.phone}>{user.phone || '—'}</p>
      </motion.div>

      <EmployeeActions
        disabled={isSelf}
        onEdit={() => onEdit(user.email)}
        onDelete={() => onDelete(user.email)}
      />
    </div>
  );
};

export default EmployeeCard;
