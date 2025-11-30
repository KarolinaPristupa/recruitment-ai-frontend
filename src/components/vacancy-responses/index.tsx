import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './index.module.scss';

interface Props {
  opened: boolean;
  responses: any[];
}

const VacancyResponses: React.FC<Props> = ({ opened, responses }) => {
  const getResumeLink = (fileUrl: string | null) =>
    fileUrl ? `http://localhost:8080${fileUrl}` : null;

  return (
    <AnimatePresence initial={false}>
      {opened && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className={styles.responsesBlock}
        >
          {responses.length === 0 ? (
            <p className={styles.empty}>Нет откликов</p>
          ) : (
            <div className={styles.responsesList}>
              {responses.map((r) => (
                <div key={r.id} className={styles.responseItem}>
                  <h4>{r.applicantName || 'Неизвестный кандидат'}</h4>
                  <p className={styles.message}>
                    {r.messageText || 'Без сопроводительного сообщения'}
                  </p>
                  {r.fileUrl && (
                    <a
                      href={getResumeLink(r.fileUrl)}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.resumeLink}
                    >
                      Резюме
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VacancyResponses;
