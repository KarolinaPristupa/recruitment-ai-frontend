import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import UserInfo from '@components/user-info';
import UserEdit from '@components/user-form/user-edit-form';
import EnterpriseInfo from '@components/enterprise-info';
import EntEditForm from '@components/user-form/ent-edit-form';
import { UserAccountData } from '@types/user-account-data';
import { getHrAccount, updateEnterprise, updateHrAccount } from '@/api/instance/hr-account-api';
import { useToastStore } from '@/store/toast-store';
import styles from './index.module.scss';

const EntAdminAccount: React.FC = () => {
  const [user, setUser] = useState<UserAccountData | null>(null);
  const [editingUser, setEditingUser] = useState(false);
  const [editingEnterprise, setEditingEnterprise] = useState(false);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToastStore();

  useEffect(() => {
    getHrAccount()
      .then((data) => setUser(data))
      .catch(() => addToast('error', 'Ошибка загрузки профиля'))
      .finally(() => setLoading(false));
  }, [addToast]);

  const handleSaveUser = async (data: Partial<UserAccountData> & { password?: string }) => {
    if (!user) return;

    try {
      const res = await updateHrAccount(data);
      localStorage.setItem('accessToken', res.token);
      setUser((prev) => (prev ? { ...prev, ...res.profile } : prev));
      setEditingUser(false);
      addToast('success', 'Профиль успешно обновлён');
    } catch {
      addToast('error', 'Не удалось сохранить изменения');
    }
  };

  const handleSaveEnterprise = async (data: UserAccountData) => {
    if (!user) return;

    const payload: Partial<UserAccountData> = {
      enterpriseName: data.enterpriseName,
      enterpriseAddress: data.enterpriseAddress,
      enterpriseContactEmail: data.enterpriseContactEmail,
      enterpriseContactPhone: data.enterpriseContactPhone,
    };

    try {
      const res = await updateEnterprise(payload);
      setUser((prev) => (prev ? { ...prev, ...payload } : prev));
      setEditingEnterprise(false);
      addToast('success', 'Данные предприятия обновлены');
    } catch {
      addToast('error', 'Ошибка сохранения');
    }
  };

  if (loading) return <div className={styles.loader}>Loading...</div>;
  if (!user) return null;

  return (
    <div className={styles.container}>
      <motion.h1 className={styles.title}>Мой профиль</motion.h1>
      <div className={styles.grid}>
        <motion.div className={styles.card}>
          {editingUser ? (
            <UserEdit user={user} onCancel={() => setEditingUser(false)} onSave={handleSaveUser} />
          ) : (
            <UserInfo user={user} onEdit={() => setEditingUser(true)} />
          )}
        </motion.div>

        <motion.div className={styles.card}>
          {editingEnterprise ? (
            <EntEditForm
              enterprise={user}
              onCancel={() => setEditingEnterprise(false)}
              onSave={handleSaveEnterprise}
            />
          ) : (
            <EnterpriseInfo
              enterprise={{
                name: user.enterpriseName,
                address: user.enterpriseAddress,
                contactEmail: user.enterpriseContactEmail,
                contactPhone: user.enterpriseContactPhone,
              }}
              onEdit={() => setEditingEnterprise(true)}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default EntAdminAccount;
