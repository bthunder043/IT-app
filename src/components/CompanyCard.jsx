import styles from './CompanyCard.module.css';

export default function CompanyCard({ company, onViewDetails, onApply }) {
  return (
    <div className={`${styles.card} ${company.featured ? styles.featured : ''}`}>
      {company.featured && <span className={styles.featuredBadge}>⭐ Featured</span>}

      <div className={styles.header}>
        <div className={styles.logo} style={{ '--logo-color': company.logoColor }}>
          {company.logo}
        </div>
        <div className={styles.headerInfo}>
          <h3 className={styles.name}>{company.name}</h3>
          <p className={styles.location}>📍 {company.location}</p>
        </div>
        <div className={styles.rating}>
          <span className={styles.ratingValue}>{company.rating}</span>
          <span className={styles.ratingStars}>★</span>
          <span className={styles.ratingCount}>{company.reviews}</span>
        </div>
      </div>

      <p className={styles.description}>{company.description}</p>

      <div className={styles.tags}>
        {company.tags.map(tag => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>

      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Duration</span>
          <span className={styles.metaValue}>{company.duration}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Open Slots</span>
          <span className={styles.metaValue} style={{ color: company.openSlots <= 5 ? 'var(--accent-orange)' : 'var(--accent-green)' }}>
            {company.openSlots} spots
          </span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Category</span>
          <span className={styles.metaValue}>{company.category}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.btnSecondary} onClick={() => onViewDetails(company)}>
          View Details
        </button>
        <button className={styles.btnPrimary} onClick={() => onApply(company)}>
          Apply Now →
        </button>
      </div>
    </div>
  );
}
