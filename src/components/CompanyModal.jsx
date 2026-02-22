import { useEffect } from 'react';
import styles from './CompanyModal.module.css';

export default function CompanyModal({ company, onClose, onApply }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!company) return null;

  return (
    <div className={styles.overlay} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose} aria-label="Close">✕</button>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.logo} style={{ '--logo-color': company.logoColor }}>
            {company.logo}
          </div>
          <div>
            <h2 className={styles.name}>{company.name}</h2>
            <p className={styles.category}>{company.category}</p>
            <p className={styles.location}>📍 {company.address}</p>
          </div>
          <div className={styles.ratingBadge}>
            <span className={styles.ratingVal}>{company.rating} ★</span>
            <span className={styles.ratingNum}>{company.reviews} reviews</span>
          </div>
        </div>

        <div className={styles.body}>
          {/* About */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>About</h3>
            <p className={styles.sectionText}>{company.description}</p>
          </section>

          {/* Positions */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Available Positions</h3>
            <div className={styles.positionsList}>
              {company.positions.map(pos => (
                <div key={pos} className={styles.positionItem}>
                  <span className={styles.posIcon}>→</span>
                  {pos}
                </div>
              ))}
            </div>
          </section>

          {/* Details Grid */}
          <div className={styles.detailsGrid}>
            <div className={styles.detailCard}>
              <span className={styles.detailIcon}>⏱</span>
              <span className={styles.detailLabel}>Duration</span>
              <span className={styles.detailValue}>{company.duration}</span>
            </div>
            <div className={styles.detailCard}>
              <span className={styles.detailIcon}>👥</span>
              <span className={styles.detailLabel}>Open Slots</span>
              <span className={styles.detailValue} style={{ color: company.openSlots <= 5 ? 'var(--accent-orange)' : 'var(--accent-green)' }}>
                {company.openSlots} available
              </span>
            </div>
            <div className={styles.detailCard}>
              <span className={styles.detailIcon}>🏷</span>
              <span className={styles.detailLabel}>Focus Areas</span>
              <span className={styles.detailValue}>{company.tags.join(', ')}</span>
            </div>
          </div>

          {/* Contact */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Contact Details</h3>
            <div className={styles.contactGrid}>
              <a href={`mailto:${company.email}`} className={styles.contactItem}>
                <span className={styles.contactIcon}>✉</span>
                <div>
                  <span className={styles.contactLabel}>Email</span>
                  <span className={styles.contactValue}>{company.email}</span>
                </div>
              </a>
              <a href={`tel:${company.phone}`} className={styles.contactItem}>
                <span className={styles.contactIcon}>📞</span>
                <div>
                  <span className={styles.contactLabel}>Phone</span>
                  <span className={styles.contactValue}>{company.phone}</span>
                </div>
              </a>
              <a href={company.website} target="_blank" rel="noreferrer" className={styles.contactItem}>
                <span className={styles.contactIcon}>🌐</span>
                <div>
                  <span className={styles.contactLabel}>Website</span>
                  <span className={styles.contactValue}>{company.website.replace('https://', '')}</span>
                </div>
              </a>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>💼</span>
                <div>
                  <span className={styles.contactLabel}>LinkedIn</span>
                  <span className={styles.contactValue}>linkedin.com/company/{company.linkedin}</span>
                </div>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📸</span>
                <div>
                  <span className={styles.contactLabel}>Instagram</span>
                  <span className={styles.contactValue}>{company.instagram}</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>Close</button>
          <button className={styles.applyBtn} onClick={() => { onClose(); onApply(company); }}>
            Apply for IT Placement →
          </button>
        </div>
      </div>
    </div>
  );
}
