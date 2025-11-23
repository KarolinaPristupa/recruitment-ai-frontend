import React, { useState } from 'react';
import NavigationLinks from '@components/navigation-links';
import styles from './index.module.scss';
import NavItem from '@/types/nav-item';

interface BurgerMenuProps {
  items: (NavItem & {
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  })[];
  extraContent?: React.ReactNode;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ items, extraContent }) => {
  const [open, setOpen] = useState(false);

  const handleItemClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    const href = e.currentTarget.getAttribute('href');
    const item = items.find((i) => i.to === href);

    if (item?.onClick) {
      e.preventDefault();
      item.onClick(e);
    }

    setOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.burger} ${open ? styles.open : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Меню"
        aria-expanded={open}
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <div className={styles.dropdown}>
          <div className={styles.backdrop} onClick={() => setOpen(false)} />

          <nav className={styles.menu}>
            <NavigationLinks
              items={items.map((item) => ({
                ...item,
                onClick: handleItemClick,
              }))}
              className={styles.mobileLink}
            />
            {extraContent && <div className={styles.extra}>{extraContent}</div>}
          </nav>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
