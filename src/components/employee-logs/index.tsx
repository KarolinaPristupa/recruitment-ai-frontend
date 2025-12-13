import React, { useEffect, useState } from 'react';
import { getUserLogs } from '@/api/instance/employees-api';
import { useToastStore } from '@/store/toast-store';
import styles from './index.module.scss';
import { Log } from '@/types/log';

interface Props {
  userEmail: string | null;
}

const EmployeeLogs: React.FC<Props> = ({ userEmail }) => {
  const [logs, setLogs] = useState<Log[]>([]);
  const toast = useToastStore();

  useEffect(() => {
    if (!userEmail) return;

    const fetchLogs = async () => {
      try {
        const data = await getUserLogs(userEmail);
        setLogs(data);
      } catch {
        toast.error('Не удалось загрузить логи пользователя');
      }
    };

    fetchLogs();
  }, [userEmail]);

  if (!userEmail) return <p>Выберите сотрудника для отображения логов</p>;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Дата</th>
          <th>Действие</th>
          <th>Детали</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log.id}>
            <td>{new Date(log.timestamp).toLocaleString()}</td>
            <td>{log.action}</td>
            <td>{log.details}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeLogs;
