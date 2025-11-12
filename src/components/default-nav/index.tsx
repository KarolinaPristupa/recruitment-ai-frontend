import React, { useState, useEffect } from 'react';
import type NavItem from '@/types/nav-item';

import styles from './index.module.scss';

const items: NavItem[] = [
  { to: 'main', label: 'Основное' },
  { to: 'stages', label: 'Этапы' },
  { to: 'results', label: 'Результаты' },
  { to: 'faq', label: 'FAQ' },
  { to: 'support', label: 'Поддержка' },
];

const DefaultNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(items[0].to);

  useEffect(() => {
    const handleScroll = () => {
      items.forEach((item) => {
        const section = document.getElementById(item.to);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom > 100) {
            setActiveSection(item.to);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {items.map((item) => (
        <button
          key={item.label}
          className={`${styles.navItem} ${activeSection === item.to ? styles.active : ''}`}
          onClick={() => scrollToSection(item.to)}
        >
          {item.label}
        </button>
      ))}
    </>
  );
};

export default DefaultNav;
