import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

const Logo: React.FC = () => {
  return (
    <Link to="/" className={styles.logo}>
      <span>V.AI</span>
    </Link>
  );
};

export default Logo;
