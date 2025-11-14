import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Logo from '@components/logo';
import DefaultNav from '@components/default-nav';
import BurgerMenu from '@components/burger-menu';

import styles from './index.module.scss';
import type NavItem from '@/types/nav-item';

const authNav: NavItem[] = [
  { to: '/login', label: 'Вход' },
  { to: '/register', label: 'Регистрация' },
];

const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className={styles.header}>
      <Logo />

      <nav className={styles.navigationDesktop}>{isHomePage ? <DefaultNav /> : null}</nav>

      <div className={styles.navigationMobile}>{isHomePage ? <BurgerMenu /> : null}</div>

      <div className={styles.authButtons}>
        {authNav.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className={`${styles.navItem} ${
              item.label === 'Регистрация' ? styles.register : styles.login
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;
