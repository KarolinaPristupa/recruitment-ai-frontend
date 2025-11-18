import React, { useState } from 'react';
import DefaultNav from '@components/default-nav';
import styles from './index.module.scss';

const BurgerMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.burger} ${open ? styles.open : ''}`}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <div className={styles.dropdown}>
          <DefaultNav />
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
