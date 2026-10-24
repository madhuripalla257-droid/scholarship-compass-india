import React, { useState } from 'react';
import { Scholarship } from '../types/scholarship';
import { formatDate, copyTextToClipboard } from '../utils/formatters';
import {
  X,
  ExternalLink,
  Copy,
  Check,
  Calendar,
  Building2,
  GraduationCap,
  Sparkles,
  ShieldAlert,
  FileCheck2,
  Info,
  Award,
  AlertCircle,
} from 'lucide-react';

interface ScholarshipModalProps {
  scholarship: Scholarship | null;
  onClose: () => void;
  onOpenReportModal: (scholarshipName?: string) => void;
}

export const ScholarshipModal: React.FC<ScholarshipModalProps> = ({
  scholarship,
  onClose,
  onOpenReportModal,
}) => {
  const [copied, setCopied] = useState(false);

  if (!scholarship) return null;

  const handleCopyChecklist = async () => {
    const checklistText = `Document Checklist for ${scholarship.name} (Source: Scholarship Compass India)\n\n` +
      scholarship.requiredDocuments.map((doc, idx) => `${idx + 1}. [ ] ${doc}`).join('\n') +
      `\n\nOfficial Information Link: ${scholarship.officialInformationUrl}\n` +
      `Note: Please verify specific document formats on the official portal before uploading.`;

    const success = await copyTextToClipboard(checklistText);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-sky-100 text-sky-800">
                <Building2 className="w-3.5 h-3.5" />
                {scholarship.providerType}
              </span>

              {scholarship.isFellowshipOrResearch && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-teal-100 text-teal-800">
                  <Sparkles className="w-3.5 h-3.5" />
                  Research Fellowship
                </span>
              )}

              <span className="text-xs text-slate-500 font-medium">
                Academic Year: {scholarship.academicYear}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
              {scholarship.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              Administered by: {scholarship.provider}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Official Provider Authoritative Disclaimer Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-amber-900">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <strong>Official Notice & Authority:</strong> Scholarship Compass India is a discovery guide. The scholarship issuing authority determines final eligibility, quota cutoffs, application validation, and fund disbursement. Always check the official notification before applying.
            </div>
          </div>

          {/* Key Overview & Application Window */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 block mb-1">Application Window</span>
              <span className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                <Calendar className="w-4 h-4 text-sky-700" />
                {scholarship.applicationStatus}
              </span>
              <span className="text-xs text-slate-600 block mt-1">
                Deadline: {formatDate(scholarship.applicationDeadline)}
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 block mb-1">Application Type</span>
              <span className="font-bold text-slate-900 text-sm block">
                {scholarship.freshOrRenewal} Applicants
              </span>
              <span className="text-xs text-slate-600 block mt-1">
                Year of Study: {scholarship.yearOfStudy.join(', ')}
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 block mb-1">State / Scope</span>
              <span className="font-bold text-slate-900 text-sm block">
                {scholarship.eligibleStates.join(', ')}
              </span>
              <span className="text-xs text-slate-600 block mt-1">
                {scholarship.domicileRequirements || 'No state domicile restriction'}
              </span>
            </div>
          </div>

          {/* Benefit Details */}
          <div className="border border-teal-200 bg-teal-50/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2 text-teal-900 font-bold">
              <Award className="w-5 h-5 text-teal-700" />
              <span>Scholarship Benefit & Financial Support</span>
            </div>
            <p className="text-slate-800 leading-relaxed mb-2">
              {scholarship.benefitsDescription}
            </p>
            {scholarship.benefitAmount && (
              <div className="inline-block bg-white text-teal-900 font-bold px-3 py-1 rounded-lg border border-teal-300 text-xs">
                Verified Amount: {scholarship.benefitAmount}
              </div>
            )}
          </div>

          {/* Who May Qualify / Detailed Eligibility Conditions */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-sky-700" />
              Eligibility & Qualifying Conditions
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <span className="font-semibold text-slate-900 text-xs uppercase tracking-wider block mb-1">
                  Education Level & Enrolled Courses
                </span>
                <p className="text-slate-700">
                  Applicable for: <strong>{scholarship.educationLevels.join(', ')}</strong>
                </p>
                <p className="text-slate-600 text-xs mt-1">
                  Eligible Streams: {scholarship.eligibleCourses.join('; ')}
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <span className="font-semibold text-slate-900 text-xs uppercase tracking-wider block mb-1">
                  Academic Performance & Merit Cutoff
                </span>
                <p className="text-slate-700">
                  {scholarship.academicCriteria.description}
                </p>
                {scholarship.academicCriteria.boardOrUniversityRequirement && (
                  <p className="text-slate-600 text-xs mt-1 italic">
                    Note: {scholarship.academicCriteria.boardOrUniversityRequirement}
                  </p>
                )}
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <span className="font-semibold text-slate-900 text-xs uppercase tracking-wider block mb-1">
                  Family Income Limit
                </span>
                <p className="text-slate-700">
                  {scholarship.incomeCriteria.description}
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <span className="font-semibold text-slate-900 text-xs uppercase tracking-wider block mb-1">
                  Category & Social Group Reservations
                </span>
                <p className="text-slate-700">
                  {scholarship.categoryCriteria.description}
                </p>
              </div>

              {scholarship.disabilityCriteria?.required && (
                <div className="p-3.5 rounded-xl border border-teal-200 bg-teal-50/40">
                  <span className="font-semibold text-teal-900 text-xs uppercase tracking-wider block mb-1">
                    Disability Criterion
                  </span>
                  <p className="text-slate-700">
                    {scholarship.disabilityCriteria.description || 'Minimum 40% certified benchmark disability required.'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Required Documents & Copy Checklist */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-sky-700" />
                Required Documents Checklist
              </h3>

              <button
                onClick={handleCopyChecklist}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200 transition-colors"
                title="Copy checklist to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied Checklist!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Checklist</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <ul className="space-y-2">
                {scholarship.requiredDocuments.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-700 text-xs sm:text-sm">
                    <span className="w-5 h-5 rounded-md bg-white border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-slate-500 mt-3 pt-3 border-t border-slate-200 italic">
                * Note: Upload original scanned documents or gazetted self-attested copies as specified by the issuing portal.
              </p>
            </div>
          </div>

          {/* Application Steps Guidance */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-sky-700" />
              General Application Steps
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-700">
              <li>Register on the official scheme portal (e.g., NSP with Aadhaar-based One-Time Registration OTR).</li>
              <li>Fill in applicant profile, educational qualification, and family income details accurately.</li>
              <li>Upload required supporting documents within the specified file format and size limits.</li>
              <li>Submit application and note down the permanent Application Reference Number for tracking.</li>
              <li>Follow up with your college/institute nodal officer for institutional e-verification.</li>
            </ol>
          </div>

          {/* Verification & Audit Trail */}
          <div className="p-3 bg-slate-100/70 rounded-xl border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="font-medium text-slate-800">Source Verification Note: </span>
              {scholarship.sourceNotes}
            </div>
            <div className="shrink-0 text-slate-500">
              Last verified: {scholarship.lastVerifiedAt || 'Pending verification'}
            </div>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onOpenReportModal(scholarship.name)}
            className="text-xs text-slate-600 hover:text-slate-900 underline flex items-center gap-1"
          >
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            Report outdated link or incorrect info
          </button>

          <div className="flex items-center gap-2.5">
            <a
              href={scholarship.officialInformationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-2xs transition-colors inline-flex items-center gap-1.5"
            >
              Official Scheme Guidelines
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>

            {scholarship.officialApplicationUrl && (
              <a
                href={scholarship.officialApplicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-2xs transition-colors inline-flex items-center gap-1.5"
              >
                Apply on Official Portal
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
