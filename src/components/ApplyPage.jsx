import { useState } from 'react';
import { companies } from '../data/companies';
import styles from './ApplyPage.module.css';

export default function ApplyPage({ preSelectedCompany, setActivePage }) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    university: '',
    department: '',
    level: '',
    matric: '',
    cgpa: '',
    company: preSelectedCompany ? String(preSelectedCompany.id) : '',
    position: '',
    startDate: '',
    skills: '',
    about: '',
    linkedin: '',
    portfolio: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const selectedCompany = companies.find(c => String(c.id) === form.company);

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.university.trim()) e.university = 'University is required';
    if (!form.department.trim()) e.department = 'Department is required';
    if (!form.level) e.level = 'Level is required';
    if (!form.company) e.company = 'Select a company';
    if (!form.position) e.position = 'Select a position';
    if (!form.about.trim()) e.about = 'Please write something about yourself';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      // Save to localStorage
      const existing = JSON.parse(localStorage.getItem('it_applications') || '[]');
      const newApp = {
        ...form,
        id: Date.now(),
        companyName: selectedCompany?.name,
        appliedAt: new Date().toISOString(),
        status: 'Pending',
      };
      existing.push(newApp);
      localStorage.setItem('it_applications', JSON.stringify(existing));
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className={styles.successPage}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>✅</div>
          <h2 className={styles.successTitle}>Application Submitted!</h2>
          <p className={styles.successText}>
            Your application to <strong>{selectedCompany?.name}</strong> has been submitted. They will reach out via <strong>{form.email}</strong> or <strong>{form.phone}</strong>.
          </p>
          <div className={styles.successDetails}>
            <div className={styles.successDetail}>
              <span>Position</span>
              <strong>{form.position}</strong>
            </div>
            <div className={styles.successDetail}>
              <span>Student</span>
              <strong>{form.fullName}</strong>
            </div>
            <div className={styles.successDetail}>
              <span>Status</span>
              <strong className={styles.pending}>Pending Review</strong>
            </div>
          </div>
          <div className={styles.successActions}>
            <button className={styles.successBtn} onClick={() => setActivePage('applications')}>
              View My Applications →
            </button>
            <button className={styles.successBtnSec} onClick={() => { setSubmitted(false); setForm({ fullName: '', email: '', phone: '', university: '', department: '', level: '', matric: '', cgpa: '', company: '', position: '', startDate: '', skills: '', about: '', linkedin: '', portfolio: '' }); }}>
              Apply to Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerBg} />
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Apply for <span className={styles.accent}>IT Placement</span></h1>
          <p className={styles.subtitle}>Fill out the form below to apply directly. Your info will be saved and sent to the company.</p>
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {/* Personal Info */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.sectionNum}>01</span>
            Personal Information
          </h3>
          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label className={styles.label}>Full Name *</label>
              <input className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`} name="fullName" value={form.fullName} onChange={handleChange} placeholder="e.g. Chukwuemeka Obi" />
              {errors.fullName && <span className={styles.error}>{errors.fullName}</span>}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Email Address *</label>
              <input className={`${styles.input} ${errors.email ? styles.inputError : ''}`} name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Phone Number *</label>
              <input className={`${styles.input} ${errors.phone ? styles.inputError : ''}`} name="phone" value={form.phone} onChange={handleChange} placeholder="+234 xxx xxxx xxxx" />
              {errors.phone && <span className={styles.error}>{errors.phone}</span>}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>LinkedIn Profile</label>
              <input className={styles.input} name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="linkedin.com/in/yourname" />
            </div>
          </div>
        </div>

        {/* Academic Info */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.sectionNum}>02</span>
            Academic Information
          </h3>
          <div className={styles.formGrid}>
            <div className={`${styles.field} ${styles.fieldFull}`}>
              <label className={styles.label}>University / Polytechnic *</label>
              <input className={`${styles.input} ${errors.university ? styles.inputError : ''}`} name="university" value={form.university} onChange={handleChange} placeholder="e.g. University of Lagos" />
              {errors.university && <span className={styles.error}>{errors.university}</span>}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Department *</label>
              <input className={`${styles.input} ${errors.department ? styles.inputError : ''}`} name="department" value={form.department} onChange={handleChange} placeholder="Computer Engineering" />
              {errors.department && <span className={styles.error}>{errors.department}</span>}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Level *</label>
              <select className={`${styles.input} ${errors.level ? styles.inputError : ''}`} name="level" value={form.level} onChange={handleChange}>
                <option value="">Select Level</option>
                <option>100 Level</option>
                <option>200 Level</option>
                <option>300 Level</option>
                <option>400 Level</option>
                <option>500 Level</option>
              </select>
              {errors.level && <span className={styles.error}>{errors.level}</span>}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Matric Number</label>
              <input className={styles.input} name="matric" value={form.matric} onChange={handleChange} placeholder="ENG/20/0001" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Current CGPA</label>
              <input className={styles.input} name="cgpa" value={form.cgpa} onChange={handleChange} placeholder="e.g. 4.2 / 5.0" />
            </div>
          </div>
        </div>

        {/* Company & Position */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.sectionNum}>03</span>
            Placement Details
          </h3>
          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label className={styles.label}>Company *</label>
              <select className={`${styles.input} ${errors.company ? styles.inputError : ''}`} name="company" value={form.company} onChange={handleChange}>
                <option value="">Select a company</option>
                {companies.map(c => (
                  <option key={c.id} value={String(c.id)}>{c.name} ({c.openSlots} slots)</option>
                ))}
              </select>
              {errors.company && <span className={styles.error}>{errors.company}</span>}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Position *</label>
              <select className={`${styles.input} ${errors.position ? styles.inputError : ''}`} name="position" value={form.position} onChange={handleChange} disabled={!selectedCompany}>
                <option value="">Select a position</option>
                {selectedCompany?.positions.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              {errors.position && <span className={styles.error}>{errors.position}</span>}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Preferred Start Date</label>
              <input className={styles.input} name="startDate" type="date" value={form.startDate} onChange={handleChange} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Portfolio / GitHub</label>
              <input className={styles.input} name="portfolio" value={form.portfolio} onChange={handleChange} placeholder="github.com/yourname" />
            </div>
          </div>
        </div>

        {/* Skills & Personal Statement */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.sectionNum}>04</span>
            Skills & Statement
          </h3>
          <div className={styles.formGridFull}>
            <div className={styles.field}>
              <label className={styles.label}>Technical Skills</label>
              <input className={styles.input} name="skills" value={form.skills} onChange={handleChange} placeholder="e.g. Python, JavaScript, React, AWS, Networking..." />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>About Yourself *</label>
              <textarea className={`${styles.input} ${styles.textarea} ${errors.about ? styles.inputError : ''}`} name="about" value={form.about} onChange={handleChange} placeholder="Tell the company why you're a great candidate. What projects have you worked on? What are your goals?" rows={5} />
              {errors.about && <span className={styles.error}>{errors.about}</span>}
            </div>
          </div>
        </div>

        {/* Company Preview */}
        {selectedCompany && (
          <div className={styles.companyPreview} style={{ '--logo-color': selectedCompany.logoColor }}>
            <div className={styles.previewLogo}>{selectedCompany.logo}</div>
            <div>
              <p className={styles.previewName}>{selectedCompany.name}</p>
              <p className={styles.previewLocation}>📍 {selectedCompany.location}</p>
              <p className={styles.previewContact}>✉ {selectedCompany.email}</p>
            </div>
            <div className={styles.previewSlots}>
              <span>{selectedCompany.openSlots}</span>
              <span>open slots</span>
            </div>
          </div>
        )}

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? (
            <span className={styles.loader}>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
            </span>
          ) : (
            'Submit Application →'
          )}
        </button>
      </form>
    </div>
  );
}
