import React, { useState } from 'react';
import { Compass, Menu, X, ShieldCheck, Search, BookOpen, ExternalLink } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string, params?: any) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [educationDropdownOpen, setEducationDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'finder', label: 'Find Scholarships' },
    { id: 'browse', label: 'All Scholarships' },
    { id: 'official-resources', label: 'Official Resources' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'about', label: 'About' },
  ];

  const educationLevels = [
    { id: 'Intermediate (Class 11-12)', label: 'Intermediate / Class 11–12' },
    { id: 'Undergraduate', label: 'Undergraduate Degrees & Diplomas' },
    { id: 'Postgraduate', label: 'Postgraduate Studies' },
    { id: 'Doctoral / Research', label: 'Research & Fellowships' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Advisory Banner */}
      <div className="bg-slate-900 text-slate-100 text-xs py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
        <span>
          <strong>Independent Student Discovery Tool:</strong> We are not a government portal. Final eligibility and approval are determined solely by official scheme providers.
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 text-left group focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-lg p-1"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-600 to-teal-700 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 block leading-tight">
                Scholarship Compass <span className="text-sky-700">India</span>
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Transparent Guidance • Official Sources
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 'home'
                  ? 'text-sky-700 bg-sky-50'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => onNavigate('finder')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentPage === 'finder'
                  ? 'text-sky-800 bg-sky-100'
                  : 'text-sky-700 hover:bg-sky-50'
              }`}
            >
              <Search className="w-4 h-4" />
              Find Scholarships
            </button>

            {/* Browse by Education Dropdown */}
            <div className="relative">
              <button
                onClick={() => setEducationDropdownOpen(!educationDropdownOpen)}
                onBlur={() => setTimeout(() => setEducationDropdownOpen(false), 200)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                  currentPage.startsWith('education-')
                    ? 'text-sky-700 bg-sky-50'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Browse by Education
                <span className="text-xs ml-0.5">▾</span>
              </button>

              {educationDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Education Levels
                  </div>
                  {educationLevels.map((lvl) => (
                    <button
                      key={lvl.id}
                      onClick={() => {
                        onNavigate('education', { level: lvl.id });
                        setEducationDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-800 transition-colors flex items-center justify-between"
                    >
                      <span>{lvl.label}</span>
                    </button>
                  ))}
                  <div className="border-t border-slate-100 mt-2 pt-2 px-3">
                    <button
                      onClick={() => {
                        onNavigate('browse');
                        setEducationDropdownOpen(false);
                      }}
                      className="text-xs text-sky-700 font-medium hover:underline"
                    >
                      View All Schemes →
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('browse')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 'browse'
                  ? 'text-sky-700 bg-sky-50'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              All Scholarships
            </button>

            <button
              onClick={() => onNavigate('official-resources')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                currentPage === 'official-resources'
                  ? 'text-sky-700 bg-sky-50'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5 text-teal-600" />
              Official Resources
            </button>

            <button
              onClick={() => onNavigate('how-it-works')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 'how-it-works'
                  ? 'text-sky-700 bg-sky-50'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              How It Works
            </button>

            <button
              onClick={() => onNavigate('about')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 'about'
                  ? 'text-sky-700 bg-sky-50'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              About
            </button>
          </nav>

          {/* Action CTA & Mobile Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('finder')}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              Find My Match
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
                currentPage === item.id
                  ? 'text-sky-700 bg-sky-50'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-2 border-t border-slate-100">
            <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Browse Education Levels
            </div>
            {educationLevels.map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => {
                  onNavigate('education', { level: lvl.id });
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:text-sky-700 hover:bg-sky-50 rounded-lg"
              >
                • {lvl.label}
              </button>
            ))}
          </div>

          <div className="pt-3">
            <button
              onClick={() => {
                onNavigate('finder');
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 text-center text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow"
            >
              Start Scholarship Finder
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
