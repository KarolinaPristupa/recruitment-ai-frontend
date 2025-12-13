import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserAccountData } from '@/types/user-account-data';
import { useToastStore } from '@/store/toast-store';
import {
  getEnterpriseEmployees,
  updateEmployee,
  deleteEmployee,
} from '@/api/instance/employees-api';
import { getHrAccount } from '@/api/instance/hr-account-api';

import EmployeeList from '@components/employee-list';
import EmployeeLogs from '@components/employee-logs';
import UserCreateForm from '@components/user-form/user-create-form';
import UserEdit from '@components/user-form/user-edit-form';

import styles from './index.module.scss';

const EntEmployees: React.FC = () => {
  const [users, setUsers] = useState<UserAccountData[]>([]);
  const [enterpriseName, setEnterpriseName] = useState('');
  const [selectedUserEmail, setSelectedUserEmail] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserAccountData | null>(null);

  const toast = useToastStore();

  const fetchUsers = async () => {
    try {
      const hr = await getHrAccount();
      setEnterpriseName(hr.enterpriseName);
      const employees = await getEnterpriseEmployees(hr.enterpriseId);
      setUsers(employees);
    } catch {
      toast.error('Не удалось загрузить пользователей');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Сотрудники "{enterpriseName}"</h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={styles.createBtn}
          onClick={() => setIsCreateOpen(true)}
        >
          <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Добавить сотрудника
        </motion.button>
      </header>

      {isCreateOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsCreateOpen(false)}>
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <UserCreateForm
              onSuccess={() => {
                setIsCreateOpen(false);
                fetchUsers();
              }}
              onCancel={() => setIsCreateOpen(false)}
            />
          </motion.div>
        </div>
      )}

      {editingUser && (
        <div className={styles.modalOverlay} onClick={() => setEditingUser(null)}>
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <UserEdit
              user={editingUser}
              onCancel={() => setEditingUser(null)}
              onSave={async (data) => {
                try {
                  if (editingUser) {
                    await updateEmployee(editingUser.email, data);
                    toast.success('Пользователь обновлён');
                    setEditingUser(null);
                    fetchUsers();
                  }
                } catch {
                  toast.error('Ошибка обновления');
                }
              }}
            />
          </motion.div>
        </div>
      )}

      <div className={styles.columns}>
        <div className={styles.left}>
          <EmployeeList
            users={users}
            onSelect={setSelectedUserEmail}
            onEdit={(email) => {
              const user = users.find((u) => u.email === email);
              if (user) setEditingUser(user);
            }}
            onDelete={async (email) => {
              try {
                await deleteEmployee(email);
                toast.success('Пользователь удалён');
                fetchUsers();
              } catch {
                toast.error('Ошибка удаления');
              }
            }}
          />
        </div>

        <div className={styles.right}>
          <EmployeeLogs userEmail={selectedUserEmail} />
        </div>
      </div>
    </div>
  );
};

export default EntEmployees;
