import { useState } from 'react';
import { SCHOLARSHIPS_DATA } from './data/scholarships';
import { Scholarship } from './types/scholarship';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScholarshipModal } from './components/ScholarshipModal';
import { ReportIssueModal } from './components/ReportIssueModal';
import { HomePage } from './pages/HomePage';
import { FinderPage } from './pages/FinderPage';
import { BrowsePage } from './pages/BrowsePage';
import { EducationBrowsePage } from './pages/EducationBrowsePage';
import { OfficialResourcesPage } from './pages/OfficialResourcesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyDisclaimerPage } from './pages/PrivacyDisclaimerPage';

export function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedEducationLevel, setSelectedEducationLevel] = useState<string>('Undergraduate');
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportSchemeName, setReportSchemeName] = useState('');

  // Scroll to top on navigation
  const handleNavigate = (page: string, params?: any) => {
    setCurrentPage(page);
    if (params?.level) {
      setSelectedEducationLevel(params.level);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenReportModal = (schemeName: string = '') => {
    setReportSchemeName(schemeName);
    setReportModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-sky-200 selection:text-sky-900">
      {/* Universal Header */}
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            scholarships={SCHOLARSHIPS_DATA}
            onNavigate={handleNavigate}
            onViewDetails={(s) => setSelectedScholarship(s)}
          />
        )}

        {currentPage === 'finder' && (
          <FinderPage
            scholarships={SCHOLARSHIPS_DATA}
            onViewDetails={(s) => setSelectedScholarship(s)}
          />
        )}

        {currentPage === 'browse' && (
          <BrowsePage
            scholarships={SCHOLARSHIPS_DATA}
            onViewDetails={(s) => setSelectedScholarship(s)}
          />
        )}

        {currentPage === 'education' && (
          <EducationBrowsePage
            level={selectedEducationLevel}
            scholarships={SCHOLARSHIPS_DATA}
            onViewDetails={(s) => setSelectedScholarship(s)}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'official-resources' && <OfficialResourcesPage />}

        {currentPage === 'how-it-works' && (
          <HowItWorksPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'about' && <AboutPage />}

        {currentPage === 'privacy-disclaimer' && <PrivacyDisclaimerPage />}
      </main>

      {/* Details Modal */}
      <ScholarshipModal
        scholarship={selectedScholarship}
        onClose={() => setSelectedScholarship(null)}
        onOpenReportModal={handleOpenReportModal}
      />

      {/* Report Outdated / Inaccurate Information Modal */}
      <ReportIssueModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        defaultSchemeName={reportSchemeName}
      />

      {/* Universal Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenReportModal={() => handleOpenReportModal('')}
      />
    </div>
  );
}

export default App;
