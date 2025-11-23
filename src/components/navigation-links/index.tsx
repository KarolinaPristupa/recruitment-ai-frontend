import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './index.module.scss';
import NavItem from '@/types/nav-item';

interface NavigationLinksProps {
  items: (NavItem & {
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  })[];
  className?: string;
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({ items, className = '' }) => {
  const location = useLocation();

  return (
    <>
      {items.map((item) => {
        const isAnchor = item.to.startsWith('#');

        const classNames = `${styles.link} ${className} ${
          location.pathname === item.to || location.hash === item.to ? styles.active : ''
        }`.trim();

        const commonProps = {
          className: classNames,
          onClick: item.onClick,
        };

        if (isAnchor) {
          return (
            <a key={item.to} href={item.to} {...commonProps}>
              {item.label}
            </a>
          );
        }

        return (
          <Link key={item.to} to={item.to} {...commonProps}>
            {item.label}
          </Link>
        );
      })}
    </>
  );
};

export default NavigationLinks;
