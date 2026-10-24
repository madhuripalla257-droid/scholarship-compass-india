import React, { useState } from 'react';
import {
  Scholarship,
  MatchEvaluation,
  MatchStatus,
} from '../types/scholarship';
import { formatDate } from '../utils/formatters';
import {
  ExternalLink,
  Calendar,
  CheckCircle2,
  HelpCircle,
  AlertTriangle,
  Building2,
  GraduationCap,
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileText,
  Clock,
} from 'lucide-react';

interface ScholarshipCardProps {
  scholarship: Scholarship;
  matchEvaluation?: MatchEvaluation;
  onViewDetails: (scholarship: Scholarship) => void;
}

export const ScholarshipCard: React.FC<ScholarshipCardProps> = ({
  scholarship,
  matchEvaluation,
  onViewDetails,
}) => {
  const [showMatchDetails, setShowMatchDetails] = useState(false);

  // Status badge styling
  const renderMatchBadge = (status: MatchStatus) => {
    switch (status) {
      case 'Potential match':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Potential match
          </span>
        );
      case 'Check one more requirement':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-200">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            Check one more requirement
          </span>
        );
      case 'May not match':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-300">
            <AlertTriangle className="w-3.5 h-3.5 text-slate-500" />
            May not match
          </span>
        );
      case 'Needs verification':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-900 border border-sky-200">
            <Clock className="w-3.5 h-3.5 text-sky-600" />
            Needs verification
          </span>
        );
    }
  };

  const getProviderBadge = (type: Scholarship['providerType']) => {
    const map = {
      'Central Government': 'bg-blue-50 text-blue-700 border-blue-200',
      'State Government': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'University / UGC': 'bg-purple-50 text-purple-700 border-purple-200',
      'Corporate CSR': 'bg-amber-50 text-amber-800 border-amber-200',
      'Private Foundation': 'bg-indigo-50 text-indigo-700 border-indigo-200',
    };
    return map[type] || 'bg-slate-50 text-slate-700 border-slate-200';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden">
      <div className="p-5 sm:p-6">
        {/* Top Meta Header: Provider Type & Match Badge / Research Tag */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium border ${getProviderBadge(
                scholarship.providerType
              )}`}
            >
              <Building2 className="w-3 h-3" />
              {scholarship.providerType}
            </span>

            {scholarship.isFellowshipOrResearch && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
                <Sparkles className="w-3 h-3 text-teal-600" />
                Research & Fellowship
              </span>
            )}

            <span className="text-xs text-slate-500 font-medium">
              AY {scholarship.academicYear}
            </span>
          </div>

          {matchEvaluation && renderMatchBadge(matchEvaluation.status)}
        </div>

        {/* Scheme Name & Provider */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug">
            {scholarship.name}
          </h3>
          <p className="text-xs text-slate-600 mt-1 flex items-center gap-1.5 font-medium">
            <span>By:</span> {scholarship.provider}
          </p>
        </div>

        {/* Education Levels & Courses */}
        <div className="mb-4 pb-4 border-b border-slate-100">
          <div className="flex items-start gap-2 text-xs text-slate-700">
            <GraduationCap className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900">Education Levels: </span>
              {scholarship.educationLevels.join(' • ')}
            </div>
          </div>
          <div className="text-xs text-slate-600 mt-1.5 pl-6 line-clamp-2">
            <span className="font-medium text-slate-800">Eligible courses: </span>
            {scholarship.eligibleCourses.join(', ')}
          </div>
        </div>

        {/* Key Criteria Grid */}
        <div className="grid grid-cols-2 gap-2.5 text-xs mb-4 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
          <div>
            <span className="text-slate-500 block">Family Income:</span>
            <span className="font-semibold text-slate-900">
              {scholarship.incomeCriteria.maxAnnualFamilyIncome
                ? `≤ ₹${scholarship.incomeCriteria.maxAnnualFamilyIncome.toLocaleString('en-IN')}/yr`
                : scholarship.incomeCriteria.description.includes('No') ||
                  scholarship.incomeCriteria.description.includes('Purely')
                ? 'No income limit'
                : 'See official guidelines'}
            </span>
          </div>

          <div>
            <span className="text-slate-500 block">Academic Requirement:</span>
            <span className="font-semibold text-slate-900">
              {scholarship.academicCriteria.minPercentage
                ? `Min ${scholarship.academicCriteria.minPercentage}% marks`
                : 'Passing grades / Merit'}
            </span>
          </div>

          <div>
            <span className="text-slate-500 block">Fresh / Renewal:</span>
            <span className="font-semibold text-slate-900">
              {scholarship.freshOrRenewal}
            </span>
          </div>

          <div>
            <span className="text-slate-500 block">State / Domicile:</span>
            <span className="font-semibold text-slate-900">
              {scholarship.eligibleStates.join(', ')}
            </span>
          </div>
        </div>

        {/* Financial Benefit (Only Verified Amount Shown) */}
        <div className="mb-4">
          <span className="text-xs font-semibold text-slate-900 block mb-0.5">
            Benefit & Grant:
          </span>
          {scholarship.benefitAmount ? (
            <div className="text-sm font-bold text-teal-800 bg-teal-50/70 border border-teal-200/60 rounded-lg px-3 py-1.5 flex items-center justify-between">
              <span>{scholarship.benefitAmount}</span>
              <span className="text-[10px] text-teal-700 font-normal uppercase tracking-wider">
                Official Amount
              </span>
            </div>
          ) : (
            <div className="text-xs text-slate-600 bg-slate-100/80 border border-slate-200/60 rounded-lg px-3 py-1.5">
              <span>{scholarship.benefitsDescription}</span>
              <span className="block text-[10px] text-slate-500 mt-0.5 italic">
                (Amount depends on course category / institute fee structure)
              </span>
            </div>
          )}
        </div>

        {/* Application Deadline & Verification Info */}
        <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>
              <strong className="text-slate-800">Deadline: </strong>
              <span
                className={
                  scholarship.applicationDeadline
                    ? 'font-medium text-slate-900'
                    : 'text-amber-700 font-medium'
                }
              >
                {formatDate(scholarship.applicationDeadline)}
              </span>
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
            <span>
              Last verified: {scholarship.lastVerifiedAt || 'Pending check'}
            </span>
            <span
              className={
                scholarship.verificationStatus === 'Verified'
                  ? 'text-teal-700 font-medium'
                  : 'text-amber-700 font-medium'
              }
            >
              ● {scholarship.verificationStatus}
            </span>
          </div>
        </div>

        {/* Transparent Match Breakdown for Finder Results */}
        {matchEvaluation && (
          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={() => setShowMatchDetails(!showMatchDetails)}
              className="w-full flex items-center justify-between text-xs font-medium text-sky-700 hover:text-sky-900 py-1"
            >
              <span>Why this result appeared</span>
              {showMatchDetails ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {showMatchDetails && (
              <div className="mt-2.5 p-3 rounded-xl bg-slate-50 text-xs space-y-2.5 border border-slate-200">
                <p className="text-slate-700 font-medium leading-relaxed">
                  {matchEvaluation.reasonSummary}
                </p>

                {matchEvaluation.matchedCriteria.length > 0 && (
                  <div>
                    <span className="font-semibold text-emerald-800 block mb-1">
                      Criteria that appear to match:
                    </span>
                    <ul className="space-y-1 text-slate-700">
                      {matchEvaluation.matchedCriteria.map((m, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>
                            <strong>{m.label}:</strong> {m.detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {matchEvaluation.unknownCriteria.length > 0 && (
                  <div>
                    <span className="font-semibold text-amber-800 block mb-1">
                      Criteria to verify / unknown in profile:
                    </span>
                    <ul className="space-y-1 text-slate-700">
                      {matchEvaluation.unknownCriteria.map((u, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <HelpCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span>
                            <strong>{u.label}:</strong> {u.detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {matchEvaluation.conflictingCriteria.length > 0 && (
                  <div>
                    <span className="font-semibold text-rose-800 block mb-1">
                      Conditions conflicting with your profile:
                    </span>
                    <ul className="space-y-1 text-slate-700">
                      {matchEvaluation.conflictingCriteria.map((c, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                          <span>
                            <strong>{c.label}:</strong> {c.detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Card Actions Footer */}
      <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={() => onViewDetails(scholarship)}
          className="px-3.5 py-1.5 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-2xs transition-colors flex items-center gap-1"
        >
          <FileText className="w-3.5 h-3.5 text-slate-500" />
          View Details
        </button>

        <div className="flex items-center gap-2">
          {scholarship.officialApplicationUrl ? (
            <a
              href={scholarship.officialApplicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-2xs transition-colors"
              title="Apply on Official Portal (opens in a new tab)"
            >
              Official Portal
              <ExternalLink className="w-3 h-3" />
            </a>
          ) : (
            <a
              href={scholarship.officialInformationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors"
              title="Official Information Notice"
            >
              Official Notice
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
