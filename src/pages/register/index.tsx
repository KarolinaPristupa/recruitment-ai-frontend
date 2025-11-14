import React, { useState } from 'react';
import EnterpriseRegisterForm from '@components/register-form/enterprise-form';
import AdminRegisterForm from '@components/register-form/admin-form';

import styles from './index.module.scss';

const Register: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [enterpriseId, setEnterpriseId] = useState<number | null>(null);

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        {step === 1 && (
          <>
            <h1 className={styles.animatedText}>Зарегистрируйте свою компанию</h1>

            <EnterpriseRegisterForm
              onSuccess={(id) => {
                setEnterpriseId(id);
                setStep(2);
              }}
            />
          </>
        )}

        {step === 2 && enterpriseId && (
          <>
            <h1 className={styles.animatedText}>Создайте администратора компании</h1>

            <AdminRegisterForm enterpriseId={enterpriseId} />
          </>
        )}
        <p className={styles.stepNumber}> 0{step}</p>
      </div>
    </div>
  );
};

export default Register;
