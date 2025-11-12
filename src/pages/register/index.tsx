import React from 'react';
import EnterpriseRegisterForm from '@components/enterprise-register-form';

import styles from './index.module.scss';

const Register: React.FC = () => {
  return (
    <div className={styles.background}>
      <span className={styles.stepNumber}>01</span>
      <div className={styles.container}>
        <h1 className={styles.animatedText}>Зарегистрируйте свою компанию</h1>
        <EnterpriseRegisterForm />
      </div>
    </div>
  );
};

export default Register;
