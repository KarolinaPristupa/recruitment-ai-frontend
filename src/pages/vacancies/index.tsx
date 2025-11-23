import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useVacancies } from '@/hooks/use-vacancy';
import { formatSalary, formatDate } from '@/utils/formatters';
import styles from './index.module.scss';

const Vacancies: React.FC = () => {
  const { vacancies, loading, error, refetch, deleteVacancy } = useVacancies();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    if (!window.confirm('Удалить вакансию навсегда?')) return;
    setDeletingId(id);
    await deleteVacancy(id);
    setDeletingId(null);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

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

  if (error) {
    return <p className={styles.error}>Ошибка загрузки вакансий</p>;
  }

  return (
    <section className={styles.vacanciesSection}>
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.header}
      >
        <h1 className={styles.title}>Мои вакансии</h1>
        <Link to="/hr/vacancies/create">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.createBtn}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Создать вакансию
          </motion.button>
        </Link>
      </motion.div>

      {vacancies.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.empty}>
          <p>У вас пока нет вакансий</p>
          <Link to="/hr/vacancies/create" className={styles.emptyLink}>
            Создать первую вакансию
          </Link>
        </motion.div>
      ) : (
        <div className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {vacancies.map((vacancy) => (
              <motion.article
                key={vacancy.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: -30 }}
                transition={{ duration: 0.4 }}
                className={styles.card}
                whileHover={{ y: -8 }}
              >
                <div className={styles.cardHeader}>
                  <h3 className={styles.vacancyTitle}>{vacancy.title}</h3>
                  <span className={`${styles.status} ${styles[vacancy.status.toLowerCase()]}`}>
                    {vacancy.status === 'ACTIVE' ? 'Активна' : 'Черновик'}
                  </span>
                </div>

                <div className={styles.salary}>
                  {vacancy.salaryMin && vacancy.salaryMax
                    ? `${formatSalary(vacancy.salaryMin)} – ${formatSalary(vacancy.salaryMax)} ₽`
                    : vacancy.salaryMin
                      ? `от ${formatSalary(vacancy.salaryMin)} ₽`
                      : 'Зарплата по договорённости'}
                </div>

                <p className={styles.description}>{vacancy.description?.slice(0, 120)}...</p>

                <div className={styles.footer}>
                  <span className={styles.date}>
                    {vacancy.status === 'ACTIVE' ? (
                      <>Опубликовано {formatDate(vacancy.publishedAt)}</>
                    ) : (
                      <>Черновик от {formatDate(vacancy.createdAt)}</>
                    )}
                  </span>

                  <div className={styles.actions}>
                    <Link to={`/hr/vacancies/${vacancy.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className={styles.btnDetail}
                        title="Подробнее"
                      >
                        <svg viewBox="0 0 24 24">
                          <path
                            d="M12 9v3m0 0v3m0-3h3m-3 0H9"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                          />
                        </svg>
                      </motion.button>
                    </Link>

                    <Link to={`/hr/vacancies/${vacancy.id}/edit`}>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className={styles.btnEdit}
                        title="Редактировать"
                      >
                        <svg viewBox="0 0 24 24">
                          <path
                            d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-18h-7"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                          />
                          <path
                            d="M18.5 2.5l3 3L12 15l-4 1 1-4 9.5-9.5z"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                      </motion.button>
                    </Link>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => vacancy.id && handleDelete(vacancy.id)}
                      disabled={deletingId === vacancy.id}
                      className={styles.btnDelete}
                      title="Удалить"
                    >
                      {deletingId === vacancy.id ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
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
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
};

export default Vacancies;
