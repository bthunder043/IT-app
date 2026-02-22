import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span>⚡</span>
          <span>IT<span className={styles.accent}>Finder</span> NG</span>
        </div>
        <p className={styles.text}>
          Connecting Nigeria's future engineers with the best tech companies for industrial training.
        </p>
        <p className={styles.copy}>© 2025 ITFinder Nigeria — Built for Computer Engineering Students 🇳🇬</p>
      </div>
    </footer>
  );
}
