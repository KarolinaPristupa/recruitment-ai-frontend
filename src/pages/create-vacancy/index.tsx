import React from 'react';
import { motion } from 'framer-motion';
import { CreateVacancyForm } from '@components/vacancy-form/create-vacancy';
import { useCreateVacancy } from '@/hooks/use-create-vacancy';
import styles from './index.module.scss';

const CreateVacancy: React.FC = () => {
  const { isSubmitting, submit, cancel } = useCreateVacancy();

  return (
    <section className={styles.section}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.container}
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={styles.title}
        >
          Новая вакансия
        </motion.h1>

        <CreateVacancyForm onSubmit={submit} onCancel={cancel} isSubmitting={isSubmitting} />
      </motion.div>
    </section>
  );
};

export default CreateVacancy;
