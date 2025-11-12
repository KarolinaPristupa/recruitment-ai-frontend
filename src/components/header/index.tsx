import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './index.module.scss';
import Logo from '@components/logo';

type NavItem = {
  to: string;
  label: string;
};

const mainNav: NavItem[] = [
  { to: '/', label: 'Главная' },
  { to: '/stages', label: 'Этапы' },
  { to: '/results', label: 'Результаты' },
  { to: '/faq', label: 'FAQ' },
  { to: '/support', label: 'Поддержка' },
];

const authNav: NavItem[] = [
  { to: '/login', label: 'Вход' },
  { to: '/register', label: 'Регистрация' },
];

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <Logo />
      <nav className={styles.navigation}>
        {mainNav.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.label}
              to={item.to}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className={styles.authButtons}>
        {authNav.map((item) => {
          const isActive = location.pathname === item.to;
          const classNames = [
            styles.navItem,
            item.label === 'Регистрация' ? styles.register : '',
            item.label === 'Вход' ? styles.login : '',
            isActive ? styles.active : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <Link key={item.label} to={item.to} className={classNames}>
              {item.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
};

export default Header;
