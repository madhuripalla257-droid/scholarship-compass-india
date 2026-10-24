import React, { useState, useMemo } from 'react';
import { Scholarship, EducationLevel } from '../types/scholarship';
import { ScholarshipCard } from '../components/ScholarshipCard';
import {
  Search,
  RotateCcw,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

interface BrowsePageProps {
  scholarships: Scholarship[];
  onViewDetails: (scholarship: Scholarship) => void;
  initialEducationLevel?: string;
}

export const BrowsePage: React.FC<BrowsePageProps> = ({
  scholarships,
  onViewDetails,
  initialEducationLevel = '',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEducation, setSelectedEducation] = useState<string>(initialEducationLevel);
  const [selectedProviderType, setSelectedProviderType] = useState<string>('');
  const [selectedFreshRenewal, setSelectedFreshRenewal] = useState<string>('');
  const [selectedVerification, setSelectedVerification] = useState<string>('');
  const [showOnlyResearch, setShowOnlyResearch] = useState(false);
  const [sortBy, setSortBy] = useState<'default' | 'verifiedDeadline' | 'name'>('default');

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedEducation('');
    setSelectedProviderType('');
    setSelectedFreshRenewal('');
    setSelectedVerification('');
    setShowOnlyResearch(false);
    setSortBy('default');
  };

  const filteredScholarships = useMemo(() => {
    return scholarships.filter((item) => {
      // Search query
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesProvider = item.provider.toLowerCase().includes(query);
        const matchesCourse = item.eligibleCourses.some((c) => c.toLowerCase().includes(query));
        const matchesState = item.eligibleStates.some((s) => s.toLowerCase().includes(query));
        if (!matchesName && !matchesProvider && !matchesCourse && !matchesState) {
          return false;
        }
      }

      // Education Level
      if (selectedEducation) {
        if (!item.educationLevels.includes(selectedEducation as EducationLevel)) {
          return false;
        }
      }

      // Provider Type
      if (selectedProviderType) {
        if (item.providerType !== selectedProviderType) {
          return false;
        }
      }

      // Fresh or Renewal
      if (selectedFreshRenewal) {
        if (item.freshOrRenewal !== selectedFreshRenewal && item.freshOrRenewal !== 'Both') {
          return false;
        }
      }

      // Verification Status
      if (selectedVerification) {
        if (item.verificationStatus !== selectedVerification) {
          return false;
        }
      }

      // Research & Fellowship Filter
      if (showOnlyResearch) {
        if (!item.isFellowshipOrResearch) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'verifiedDeadline') {
        // Only sort by verified deadline when both have non-null deadlines
        if (!a.applicationDeadline) return 1;
        if (!b.applicationDeadline) return -1;
        return new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime();
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [
    scholarships,
    searchTerm,
    selectedEducation,
    selectedProviderType,
    selectedFreshRenewal,
    selectedVerification,
    showOnlyResearch,
    sortBy,
  ]);

  const hasActiveFilters =
    searchTerm ||
    selectedEducation ||
    selectedProviderType ||
    selectedFreshRenewal ||
    selectedVerification ||
    showOnlyResearch ||
    sortBy !== 'default';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Title */}
      <div className="max-w-3xl">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          All Scholarships & Fellowships Directory
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
          Search and filter published Indian scholarships by education stage, sponsoring agency, application status, and verified official records.
        </p>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        {/* Search input + Research toggle */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by scheme title, ministry, degree, or state..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <button
            onClick={() => setShowOnlyResearch(!showOnlyResearch)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border flex items-center justify-center gap-2 transition-all ${
              showOnlyResearch
                ? 'bg-teal-700 text-white border-teal-700 shadow-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:border-teal-500'
            }`}
          >
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Research & Fellowships Only</span>
          </button>
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {/* Education Level */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Education Level
            </label>
            <select
              value={selectedEducation}
              onChange={(e) => setSelectedEducation(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="">All Education Levels</option>
              <option value="Intermediate (Class 11-12)">Intermediate (11-12)</option>
              <option value="Undergraduate">Undergraduate Degree</option>
              <option value="Diploma">Diploma / Polytechnic</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="Doctoral / Research">Doctoral / Research</option>
            </select>
          </div>

          {/* Provider Type */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Sponsoring Body
            </label>
            <select
              value={selectedProviderType}
              onChange={(e) => setSelectedProviderType(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="">All Providers</option>
              <option value="Central Government">Central Government</option>
              <option value="State Government">State Government</option>
              <option value="University / UGC">University / UGC</option>
              <option value="Corporate CSR">Corporate CSR</option>
              <option value="Private Foundation">Private Foundation</option>
            </select>
          </div>

          {/* Fresh / Renewal */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Application Type
            </label>
            <select
              value={selectedFreshRenewal}
              onChange={(e) => setSelectedFreshRenewal(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="">Fresh & Renewal</option>
              <option value="Fresh">Fresh Applicants Only</option>
              <option value="Renewal">Renewal Mode</option>
            </select>
          </div>

          {/* Verification Status */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Verification Status
            </label>
            <select
              value={selectedVerification}
              onChange={(e) => setSelectedVerification(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="">All Verification States</option>
              <option value="Verified">Verified by Official Notice</option>
              <option value="Needs verification">Needs Verification</option>
            </select>
          </div>

          {/* Sorting */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="default">Default / Recommended</option>
              <option value="verifiedDeadline">Verified Deadline (Upcoming)</option>
              <option value="name">Scheme Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Active Filters Summary & Reset Button */}
        {hasActiveFilters && (
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>
              Showing <strong>{filteredScholarships.length}</strong> matching schemes
            </span>
            <button
              onClick={handleResetFilters}
              className="text-sky-700 hover:text-sky-900 font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* Scholarships Grid */}
      {filteredScholarships.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900">No Scholarships Match Your Filters</h3>
          <p className="text-xs text-slate-500 mt-1">
            Try loosening search keywords or clearing education/provider filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-4 px-4 py-2 rounded-lg bg-sky-700 text-white font-semibold text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScholarships.map((scholarship) => (
            <ScholarshipCard
              key={scholarship.id}
              scholarship={scholarship}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};
