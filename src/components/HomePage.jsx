import { useState, useMemo } from 'react';
import { companies, categories } from '../data/companies';
import CompanyCard from './CompanyCard';
import CompanyModal from './CompanyModal';
import styles from './HomePage.module.css';

export default function HomePage({ onApply }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [sortBy, setSortBy] = useState('featured');

  const filtered = useMemo(() => {
    let list = [...companies];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (activeCategory !== 'All') {
      list = list.filter(c => c.category.toLowerCase().includes(activeCategory.toLowerCase()));
    }

    if (sortBy === 'featured') {
      list.sort((a, b) => b.featured - a.featured || b.rating - a.rating);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'slots') {
      list.sort((a, b) => b.openSlots - a.openSlots);
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [search, activeCategory, sortBy]);

  const shortCategories = ['All', 'Fintech', 'Software Engineering', 'Telecommunications', 'E-Commerce / Tech', 'Enterprise Software', 'IT Solutions', 'Data & Marketing Tech'];

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>🎓 For Computer Engineering Students</div>
          <h1 className={styles.heroTitle}>
            Find Your <span className={styles.heroAccent}>IT Placement</span><br/>
            in Nigeria's Tech Scene
          </h1>
          <p className={styles.heroSub}>
            Discover top Nigerian tech companies offering industrial training. Browse, apply, and launch your engineering career.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>{companies.length}+</span>
              <span className={styles.statLabel}>Companies</span>
            </div>
            <div className={styles.statDiv}/>
            <div className={styles.stat}>
              <span className={styles.statNum}>{companies.reduce((a, c) => a + c.openSlots, 0)}</span>
              <span className={styles.statLabel}>Open Slots</span>
            </div>
            <div className={styles.statDiv}/>
            <div className={styles.stat}>
              <span className={styles.statNum}>6</span>
              <span className={styles.statLabel}>Cities</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search + Filters */}
      <div className={styles.controls}>
        <div className={styles.searchRow}>
          <div className={styles.searchBox}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search companies, tech stack, city..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className={styles.searchClear} onClick={() => setSearch('')}>✕</button>
            )}
          </div>
          <select className={styles.sortSelect} value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="featured">Featured First</option>
            <option value="rating">Top Rated</option>
            <option value="slots">Most Slots</option>
            <option value="name">A–Z</option>
          </select>
        </div>

        <div className={styles.categoryRow}>
          {shortCategories.map(cat => (
            <button
              key={cat}
              className={`${styles.catBtn} ${activeCategory === cat ? styles.catActive : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className={styles.results}>
        <div className={styles.resultsHeader}>
          <span className={styles.resultsCount}>
            {filtered.length} {filtered.length === 1 ? 'company' : 'companies'} found
          </span>
          {(search || activeCategory !== 'All') && (
            <button className={styles.clearFilters} onClick={() => { setSearch(''); setActiveCategory('All'); }}>
              Clear filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🔍</span>
            <h3>No companies found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((company, i) => (
              <div key={company.id} style={{ animationDelay: `${i * 0.05}s` }}>
                <CompanyCard
                  company={company}
                  onViewDetails={setSelectedCompany}
                  onApply={onApply}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedCompany && (
        <CompanyModal
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
          onApply={onApply}
        />
      )}
    </div>
  );
}
