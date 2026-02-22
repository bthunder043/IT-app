import { useState } from 'react';
import styles from './Navbar.module.css';

export default function Navbar({ activePage, setActivePage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Companies' },
    { id: 'apply', label: 'Apply' },
    { id: 'applications', label: 'My Applications' },
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div className={styles.brand} onClick={() => setActivePage('home')}>
          <span className={styles.brandIcon}>⚡</span>
          <span className={styles.brandName}>IT<span className={styles.brandAccent}>Finder</span></span>
          <span className={styles.brandBadge}>NG</span>
        </div>

        <div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {navItems.map(item => (
            <button
              key={item.id}
              className={`${styles.link} ${activePage === item.id ? styles.active : ''}`}
              onClick={() => { setActivePage(item.id); setMenuOpen(false); }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`}></span>
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`}></span>
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`}></span>
        </button>
      </div>
    </nav>
  );
}
