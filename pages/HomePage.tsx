import React from 'react';
import { Scholarship } from '../types/scholarship';
import { ScholarshipCard } from '../components/ScholarshipCard';
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Search,
  BookOpen,
  GraduationCap,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface HomePageProps {
  scholarships: Scholarship[];
  onNavigate: (page: string, params?: any) => void;
  onViewDetails: (scholarship: Scholarship) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  scholarships,
  onNavigate,
  onViewDetails,
}) => {
  // Highlight 3 diverse verified schemes
  const featuredSchemes = scholarships
    .filter((s) => s.verificationStatus === 'Verified')
    .slice(0, 3);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-slate-50 pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Subtle trust badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 border border-sky-200 text-sky-900 text-xs font-semibold mb-6 shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-sky-700" />
            <span>Guiding Indian Students to Verified Education Grants</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Find scholarships that fit your education.
          </h1>

          <p className="mt-5 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Explore opportunities, understand eligibility and apply through official sources.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('finder')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-white bg-sky-700 hover:bg-sky-800 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-base focus:ring-4 focus:ring-sky-200"
            >
              <Search className="w-5 h-5" />
              Find My Scholarships
            </button>

            <button
              onClick={() => onNavigate('browse')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs transition-all flex items-center justify-center gap-2 text-base"
            >
              <BookOpen className="w-5 h-5 text-slate-500" />
              Browse All Scholarships
            </button>
          </div>

          {/* Required Prominent Note */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="p-3 bg-white/90 border border-slate-200/90 rounded-xl shadow-2xs text-xs text-slate-600 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
              <span>
                Free discovery tool. Final eligibility and approval are determined by the scholarship provider.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Education-Level Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Browse by Your Education Level
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Every scholarship scheme is targeted at a specific academic stage. Select your education stage to see tailored schemes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Intermediate / Class 11-12 */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-sky-800 uppercase tracking-wider block mb-1">
                Stage 1
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Intermediate / Class 11–12
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Pre-University, Junior College, Higher Secondary (+2), and intermediate board schemes like NMMSS and state merit-cum-means awards.
              </p>
              <div className="space-y-1.5 text-xs text-slate-500 pb-4">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>State & Central Board percentiles</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>School education maintenance grants</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('education', { level: 'Intermediate (Class 11-12)' })}
              className="w-full mt-2 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-sky-50 text-sky-800 font-semibold text-xs transition-colors flex items-center justify-between border border-slate-200"
            >
              <span>Explore Intermediate Schemes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Undergraduate / Diploma */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-blue-800 uppercase tracking-wider block mb-1">
                Stage 2
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Undergraduate / Diploma
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                B.Tech, B.Sc, B.Com, B.A, MBBS, Polytechnic, and Technical Diplomas. Includes PM-USP CSSS, AICTE Pragati, and AP JnanaBhumi RTF.
              </p>
              <div className="space-y-1.5 text-xs text-slate-500 pb-4">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>Tuition fee waivers & annual stipends</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>Fresh admissions & year-on-year renewals</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('education', { level: 'Undergraduate' })}
              className="w-full mt-2 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-sky-50 text-sky-800 font-semibold text-xs transition-colors flex items-center justify-between border border-slate-200"
            >
              <span>Explore UG & Diploma Schemes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: Postgraduate / Research */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-teal-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block mb-1">
                Stage 3
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Postgraduate / Research
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Master degrees, single girl child PG grants, and doctoral fellowships (CSIR-UGC NET JRF, DST INSPIRE Ph.D) with clearly separated research tracks.
              </p>
              <div className="space-y-1.5 text-xs text-slate-500 pb-4">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>UGC PG scholarships (₹15,000/mo)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>Fellowships clearly separated from general scholarships</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('education', { level: 'Postgraduate' })}
              className="w-full mt-2 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-teal-50 text-teal-800 font-semibold text-xs transition-colors flex items-center justify-between border border-slate-200"
            >
              <span>Explore PG & Research Fellowships</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Verified Scholarships */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 uppercase tracking-wider mb-1">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              100% Source-Verified
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Featured Verified Scholarships
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Audited against official government gazettes with active links.
            </p>
          </div>

          <button
            onClick={() => onNavigate('browse')}
            className="text-xs sm:text-sm font-semibold text-sky-700 hover:text-sky-900 flex items-center gap-1 shrink-0"
          >
            <span>View all {scholarships.length} scholarships</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredSchemes.map((scheme) => (
            <ScholarshipCard
              key={scheme.id}
              scholarship={scheme}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </section>

      {/* Transparency & Safety Principles */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Built on Transparency, Trust & Student Safety
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Applying for education benefits should be transparent, safe, and free from misleading claims or scam portals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/60">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-4">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Transparent Rules-Based Matching
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We explain exactly why each scholarship matches or requires verification. Missing information is never assumed to be a match.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/60">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Zero Sensitive Information Collected
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We never ask for your Aadhaar number, OTP, bank details, or document uploads. You browse and filter completely privately.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/60">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <ExternalLink className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Direct Official Government Links
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every application link connects directly to official portals (.gov.in / .nic.in). No hidden redirects or application fee markups.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('how-it-works')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-teal-400 hover:text-teal-300 underline"
            >
              <span>Read our 4-step student guide to avoid scholarship scams</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Official Directory Gateway */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-sky-50 to-teal-50 rounded-3xl p-8 sm:p-12 border border-sky-100 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-sky-800 uppercase tracking-wider block mb-2">
              Authoritative Portal Access
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
              Need direct access to the National Scholarship Portal or UGC?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
              Explore our curated directory of 11 verified central and state portals, including NSP, AP JnanaBhumi, UGC Student Corner, Tribal Affairs, and DST INSPIRE.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => onNavigate('official-resources')}
              className="px-6 py-3 rounded-xl font-bold text-white bg-sky-700 hover:bg-sky-800 shadow transition-all text-xs sm:text-sm text-center"
            >
              View Official Resources Directory
            </button>
            <button
              onClick={() => onNavigate('finder')}
              className="px-6 py-3 rounded-xl font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs text-xs sm:text-sm text-center"
            >
              Start Scholarship Finder
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
