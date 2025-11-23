import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '@components/logo';
import NavigationLinks from '@components/navigation-links';
import BurgerMenu from '@components/burger-menu';
import { useUserRole } from '@/hooks/use-user-role';
import { useToastStore } from '@/store/toast-store';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { authStorage } from '@/utils/auth-storage';
import { BellIcon } from '@constants/bell-icon';
import { LogoutIcon } from '@constants/logout-icon';

const Header: React.FC = () => {
  const location = useLocation();
  const userRole = useUserRole();
  const navigate = useNavigate();
  const { success } = useToastStore();

  const isHomePage = location.pathname === '/';

  const anchorNav = [
    { to: '#main', label: 'Главная' },
    { to: '#stages', label: 'Этапы' },
    { to: '#results', label: 'Результаты' },
    { to: '#faq', label: 'FAQ' },
    { to: '#contacts', label: 'Контакты' },
  ];

  const hrNav = [
    { to: '/hr/vacancies', label: 'Вакансии' },
    { to: '/hr/candidates', label: 'Кандидаты' },
    { to: '/hr/analytics', label: 'Аналитика' },
    { to: '/hr/profile', label: 'Профиль' },
  ];

  const centerNav = isHomePage ? anchorNav : userRole === 'HR' ? hrNav : [];

  const handleLogout = () => {
    authStorage.clearAuth();
    success('Вы вышли из аккаунта');
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <Logo />

      {centerNav.length > 0 && (
        <>
          <nav className={styles.navigationDesktop}>
            <NavigationLinks
              items={centerNav.map((item) => ({
                ...item,
                onClick: isHomePage
                  ? (e) => {
                      e.preventDefault();
                      document.querySelector(item.to)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  : undefined,
              }))}
              className={styles.desktopLink}
            />
          </nav>

          <div className={styles.navigationMobile}>
            <BurgerMenu
              items={centerNav.map((item) => ({
                ...item,
                onClick: isHomePage
                  ? (e) => {
                      e.preventDefault();
                      document.querySelector(item.to)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  : undefined,
              }))}
            />
          </div>
        </>
      )}

      <div className={styles.rightSection}>
        {userRole === 'HR' ? (
          <div className={styles.userActions}>
            <button className={styles.iconButton} aria-label="Уведомления">
              <BellIcon />
              <span className={styles.badge}>3</span>
            </button>
            <button onClick={handleLogout} className={styles.iconButton} aria-label="Выйти">
              <LogoutIcon />
            </button>
          </div>
        ) : (
          <div className={styles.authButtons}>
            <Link to="/login" className={`${styles.navItem} ${styles.login}`}>
              Вход
            </Link>
            <Link to="/register" className={`${styles.navItem} ${styles.register}`}>
              Регистрация
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
