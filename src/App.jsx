import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ApplyPage from './components/ApplyPage';
import ApplicationsPage from './components/ApplicationsPage';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [applyTarget, setApplyTarget] = useState(null);

  const handleApply = (company) => {
    setApplyTarget(company);
    setActivePage('apply');
  };

  const handlePageChange = (page) => {
    setActivePage(page);
    if (page !== 'apply') setApplyTarget(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <Navbar activePage={activePage} setActivePage={handlePageChange} />
      <main>
        {activePage === 'home' && (
          <HomePage onApply={handleApply} />
        )}
        {activePage === 'apply' && (
          <ApplyPage preSelectedCompany={applyTarget} setActivePage={handlePageChange} />
        )}
        {activePage === 'applications' && (
          <ApplicationsPage setActivePage={handlePageChange} />
        )}
      </main>
      <Footer />
    </div>
  );
}
