import React, { useState } from 'react';
import { formatDate } from '@/utils/formatters';
import { VacancyResponseDTO } from '@/hooks/use-active-vacancies';
import { useToastStore } from '@/store/toast-store';
import styles from './index.module.scss';
import { motion } from 'framer-motion';
import VacancyResponses from '@components/vacancy-responses';
import api from '@/api/instance';

interface Props {
  vacancy: VacancyResponseDTO;
}

const TTL = 900_000; // 15 минут

const VacancyActive: React.FC<Props> = ({ vacancy }) => {
  const [fetching, setFetching] = useState(false);
  const [responses, setResponses] = useState<any[]>([]);
  const [opened, setOpened] = useState(false);
  const [lastFetched, setLastFetched] = useState<number | null>(null);

  const { success, error } = useToastStore();

  const shouldRefetch = () => {
    if (!lastFetched) return true;
    return Date.now() - lastFetched > TTL;
  };

  const handleToggle = async () => {
    if (opened) {
      setOpened(false);
      return;
    }

    if (!shouldRefetch()) {
      setOpened(true);
      return;
    }

    setFetching(true);
    try {
      const res = await api.post(`/api/external-responses/fetch/${vacancy.id}`);
      setResponses(res.data || []);
      setLastFetched(Date.now());
      success(`Получено откликов: ${res.data?.length || 0}`);
      setOpened(true);
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        'Не удалось получить отклики. Возможно, вакансия ещё не опубликована на HH.';
      error(msg);
    } finally {
      setFetching(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.item}>
        <div className={styles.infoWrapper}>
          <div className={styles.info}>
            <h3 className={styles.title}>{vacancy.title}</h3>
            <span className={styles.date}>Опубликовано {formatDate(vacancy.publishedAt)}</span>
          </div>

          <button onClick={handleToggle} disabled={fetching} className={styles.responsesBtn}>
            {fetching ? (
              <div className={styles.loader}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className={styles.spinner}
                />
              </div>
            ) : (
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
            )}
          </button>
        </div>
      </div>

      <VacancyResponses opened={opened} responses={responses} />
    </div>
  );
};

export default VacancyActive;
