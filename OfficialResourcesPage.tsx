import React, { useState } from 'react';
import { OFFICIAL_RESOURCES } from '../data/officialResources';
import {
  ExternalLink,
  ShieldCheck,
  Lock,
  Search,
  CheckCircle2,
} from 'lucide-react';

export const OfficialResourcesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'National Portal',
    'Higher Education & Research',
    'Ministry Schemes',
    'State Government Portals',
  ];

  const filteredResources = OFFICIAL_RESOURCES.filter((res) => {
    if (selectedCategory !== 'All' && res.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        res.title.toLowerCase().includes(q) ||
        res.organization.toLowerCase().includes(q) ||
        res.description.toLowerCase().includes(q) ||
        res.domainVerification.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Title & Trust Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-semibold mb-3">
          <ShieldCheck className="w-4 h-4 text-teal-700" />
          <span>Authoritative Source Directory</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Official Government & Statutory Portals
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
          The 11 primary official starting points for Indian student scholarships. All application submissions and fund disbursements are managed through these genuine government portals (.gov.in / .nic.in).
        </p>
      </div>

      {/* Trust & Safety Guidance Box */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 mb-3">
          <Lock className="w-5 h-5 text-teal-400" />
          How to Verify Genuine Government Scholarship Portals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-300">
          <div className="space-y-1.5">
            <span className="font-bold text-white block">1. Look for .gov.in or .nic.in</span>
            <p className="text-slate-400 text-xs leading-relaxed">
              Legitimate Union Ministries and State Government departments in India use strictly <strong>.gov.in</strong> or <strong>.nic.in</strong> top-level domains. Avoid clone portals hosted on commercial domains.
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="font-bold text-white block">2. Government Schemes Never Charge Fees</span>
            <p className="text-slate-400 text-xs leading-relaxed">
              Official scholarship portals (NSP, JnanaBhumi, UGC) never demand registration fees, processing charges, or commissions to release funds.
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="font-bold text-white block">3. Protect OTR Credentials</span>
            <p className="text-slate-400 text-xs leading-relaxed">
              When applying via cyber cafes or computer centers, enter your own password and keep your Aadhaar OTP confidential. All Direct Benefit Transfer (DBT) funds are credited strictly to your bank account.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-sky-700 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search official portals..."
            className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
          />
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200">
                  {res.category}
                </span>
                <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {res.domainVerification}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {res.title}
              </h3>
              <p className="text-xs font-medium text-slate-500 mb-3">
                Authority: {res.organization}
              </p>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                {res.description}
              </p>

              <div className="bg-slate-50 rounded-xl p-3 text-xs mb-4 border border-slate-100 space-y-2">
                <div>
                  <span className="font-semibold text-slate-900 block">Primary Purpose:</span>
                  <span className="text-slate-600">{res.primaryUse}</span>
                </div>

                <div>
                  <span className="font-semibold text-slate-900 block">Safety & Verification Tips:</span>
                  <ul className="space-y-1 mt-1 text-slate-600">
                    {res.trustTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Official Portal</span>
              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold shadow-2xs transition-colors"
              >
                <span>Visit Official Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
