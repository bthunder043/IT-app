import { useState, useEffect } from 'react';
import styles from './ApplicationsPage.module.css';

const statusConfig = {
  Pending: { color: 'var(--accent-orange)', bg: 'rgba(255,107,53,0.1)', icon: '⏳' },
  Reviewed: { color: 'var(--accent-cyan)', bg: 'rgba(0,229,255,0.1)', icon: '👁' },
  Shortlisted: { color: 'var(--accent-green)', bg: 'rgba(0,255,157,0.1)', icon: '⭐' },
  Accepted: { color: '#00ff9d', bg: 'rgba(0,255,157,0.15)', icon: '✅' },
  Rejected: { color: '#ff4d4d', bg: 'rgba(255,77,77,0.1)', icon: '✕' },
};

export default function ApplicationsPage({ setActivePage }) {
  const [applications, setApplications] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('it_applications') || '[]');
    setApplications(saved.reverse()); // newest first
  }, []);

  const deleteApp = (id) => {
    const updated = applications.filter(a => a.id !== id);
    setApplications(updated);
    localStorage.setItem('it_applications', JSON.stringify([...updated].reverse()));
    if (selected?.id === id) setSelected(null);
  };

  if (applications.length === 0) {
    return (
      <div className={styles.emptyPage}>
        <div className={styles.emptyIcon}>📋</div>
        <h2 className={styles.emptyTitle}>No Applications Yet</h2>
        <p className={styles.emptySub}>You haven't applied to any companies. Start exploring opportunities!</p>
        <button className={styles.emptyBtn} onClick={() => setActivePage('home')}>
          Browse Companies →
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerBg} />
        <div className={styles.headerContent}>
          <h1 className={styles.title}>My <span className={styles.accent}>Applications</span></h1>
          <p className={styles.subtitle}>{applications.length} application{applications.length !== 1 ? 's' : ''} submitted</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.list}>
          {applications.map(app => {
            const st = statusConfig[app.status] || statusConfig.Pending;
            return (
              <div
                key={app.id}
                className={`${styles.appCard} ${selected?.id === app.id ? styles.appCardActive : ''}`}
                onClick={() => setSelected(app)}
              >
                <div className={styles.appLeft}>
                  <div className={styles.appCompany}>{app.companyName}</div>
                  <div className={styles.appPosition}>{app.position}</div>
                  <div className={styles.appDate}>Applied {new Date(app.appliedAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                </div>
                <div className={styles.appRight}>
                  <span className={styles.statusBadge} style={{ color: st.color, background: st.bg }}>
                    {st.icon} {app.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {selected && (
          <div className={styles.detail}>
            <div className={styles.detailHeader}>
              <div>
                <h3 className={styles.detailCompany}>{selected.companyName}</h3>
                <p className={styles.detailPos}>{selected.position}</p>
              </div>
              <button className={styles.closeDetail} onClick={() => setSelected(null)}>✕</button>
            </div>

            {(() => {
              const st = statusConfig[selected.status] || statusConfig.Pending;
              return (
                <div className={styles.detailStatus} style={{ color: st.color, background: st.bg }}>
                  {st.icon} Status: {selected.status}
                </div>
              );
            })()}

            <div className={styles.detailGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Full Name</span>
                <span className={styles.detailValue}>{selected.fullName}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Email</span>
                <span className={styles.detailValue}>{selected.email}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Phone</span>
                <span className={styles.detailValue}>{selected.phone}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>University</span>
                <span className={styles.detailValue}>{selected.university}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Department</span>
                <span className={styles.detailValue}>{selected.department}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Level</span>
                <span className={styles.detailValue}>{selected.level}</span>
              </div>
              {selected.cgpa && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>CGPA</span>
                  <span className={styles.detailValue}>{selected.cgpa}</span>
                </div>
              )}
              {selected.matric && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Matric No</span>
                  <span className={styles.detailValue}>{selected.matric}</span>
                </div>
              )}
              {selected.skills && (
                <div className={`${styles.detailItem} ${styles.detailFull}`}>
                  <span className={styles.detailLabel}>Skills</span>
                  <span className={styles.detailValue}>{selected.skills}</span>
                </div>
              )}
              {selected.startDate && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Start Date</span>
                  <span className={styles.detailValue}>{selected.startDate}</span>
                </div>
              )}
              {selected.portfolio && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Portfolio</span>
                  <span className={styles.detailValue}>{selected.portfolio}</span>
                </div>
              )}
              {selected.linkedin && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>LinkedIn</span>
                  <span className={styles.detailValue}>{selected.linkedin}</span>
                </div>
              )}
            </div>

            {selected.about && (
              <div className={styles.aboutSection}>
                <span className={styles.detailLabel}>Personal Statement</span>
                <p className={styles.aboutText}>{selected.about}</p>
              </div>
            )}

            <div className={styles.detailDate}>
              Applied on {new Date(selected.appliedAt).toLocaleString('en-NG')}
            </div>

            <button className={styles.deleteBtn} onClick={() => deleteApp(selected.id)}>
              🗑 Delete Application
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
