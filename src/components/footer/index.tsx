import React, { useEffect, useState } from 'react';
import { FaGithub, FaTelegram, FaInstagram, FaLinkedin } from 'react-icons/fa';
import styles from './index.module.scss';
import NavItem from '@/types/nav-item';

const navItems: NavItem[] = [
  { to: 'main', label: 'Основное' },
  { to: 'stages', label: 'Этапы' },
  { to: 'results', label: 'Результаты' },
  { to: 'faq', label: 'FAQ' },
  { to: 'support', label: 'Поддержка' },
];

const Footer: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(navItems[0].to);

  useEffect(() => {
    const handleScroll = () => {
      navItems.forEach((item) => {
        const section = document.getElementById(item.to);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight && rect.bottom >= 0) {
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
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id={'contacts'} className={styles.footer}>
      <div className={styles.nav}>
        {navItems.map((item) => (
          <button
            key={item.label}
            className={styles.navItem}
            onClick={() => scrollToSection(item.to)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className={styles.socials}>
        <a
          href="https://github.com/KarolinaPristupa/recruitment-ai-frontend"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <FaGithub size={24} />
        </a>
        <a href="https://t.me/feltaa" target="_blank" rel="noreferrer" aria-label="Telegram">
          <FaTelegram size={24} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
          <FaInstagram size={24} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <FaLinkedin size={24} />
        </a>
      </div>

      <div className={styles.contact}>
        <span>
          Email: <a href="mailto:v@ai.com">v@ai.com</a>
        </span>
        <span>
          Телефон: <a href="tel:+375323035678">+375 32 303 56 78</a>
        </span>
      </div>

      <div className={styles.copyright}>
        &copy; {new Date().getFullYear()} V.AI. Все права защищены.
      </div>
    </footer>
  );
};

export default Footer;
