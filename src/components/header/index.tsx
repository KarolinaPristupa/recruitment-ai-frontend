import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './index.module.scss';
import Logo from '@components/logo';
import DefaultNav from '@components/default-nav';
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

      <nav className={styles.navigation}>{isHomePage ? <DefaultNav /> : null}</nav>

      <div className={styles.authButtons}>
        {authNav.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className={`${styles.navItem} ${
              item.label === 'Регистрация' ? styles.register : ''
            } ${item.label === 'Вход' ? styles.login : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;
