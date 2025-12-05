import React, { useEffect, useState } from 'react';
import UserInfo from '@components/user-info';
import UserEdit from '@components/user-form/edit-form';
import EnterpriseInfo from '@components/enterprise-info';
import { HrAccountData } from '@/types/hr-account-data';
import { getHrAccount, updateHrAccount } from '@/api/instance/hr-account-api';
import { useToastStore } from '@/store/toast-store';
import styles from './index.module.scss';
import { motion } from 'framer-motion';

const HrAccount: React.FC = () => {
  const [user, setUser] = useState<HrAccountData | null>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToastStore();

  useEffect(() => {
    getHrAccount()
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        addToast('error', 'Ошибка загрузки профиля');
        setLoading(false);
      });
  }, [addToast]);

  const handleSave = async (data: Partial<HrAccountData> & { password?: string }) => {
    try {
      const res = await updateHrAccount(data);
      localStorage.setItem('accessToken', res.token);
      setUser(res.profile);
      setEditing(false);
      addToast('success', 'Профиль успешно обновлён');
    } catch (err) {
      addToast('error', 'Не удалось сохранить изменения');
    }
  };

  if (loading) {
    return (
      <div className={styles.loader}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className={styles.spinner}
        />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className={styles.container}>
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className={styles.title}
      >
        Мой профиль
      </motion.h1>

      <div className={styles.grid}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={styles.card}
        >
          {editing ? (
            <UserEdit user={user} onCancel={() => setEditing(false)} onSave={handleSave} />
          ) : (
            <UserInfo user={user} onEdit={() => setEditing(true)} />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={styles.card}
        >
          <EnterpriseInfo enterprise={user} />
        </motion.div>
      </div>
    </div>
  );
};

export default HrAccount;
