import React, { useState } from 'react';
import { X, AlertCircle, CheckCircle2, ShieldCheck, Send } from 'lucide-react';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSchemeName?: string;
}

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({
  isOpen,
  onClose,
  defaultSchemeName = '',
}) => {
  const [schemeName, setSchemeName] = useState(defaultSchemeName);
  const [issueType, setIssueType] = useState('Outdated Application Deadline');
  const [officialUrl, setOfficialUrl] = useState('');
  const [description, setDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate safe local recording
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
    >
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Report Inaccuracy or Outdated Link</h3>
              <p className="text-xs text-slate-500">Help maintain 100% verified data for fellow students</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Thank You for Your Feedback!</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Our data verification review team will audit the reported scheme against the official gazette. Updates are reflected within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
            {/* Safety Assurance Notice */}
            <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl flex items-start gap-2.5 text-sky-900 text-xs">
              <ShieldCheck className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
              <span>
                <strong>Privacy Guaranteed:</strong> Do NOT provide Aadhaar number, OTP, bank account info, or confidential certificates. We only collect public corrections to scheme guidelines.
              </span>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Scholarship / Scheme Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={schemeName}
                onChange={(e) => setSchemeName(e.target.value)}
                placeholder="e.g. PM-USP CSSS or AP JnanaBhumi"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Nature of the Issue <span className="text-rose-500">*</span>
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs sm:text-sm bg-white"
              >
                <option value="Outdated Application Deadline">Application Deadline has changed / passed</option>
                <option value="Broken Official Link">Official Portal Link is broken (404 / moved)</option>
                <option value="Incorrect Eligibility Criteria">Eligibility condition / income limit is different</option>
                <option value="Disbursement Amount Discrepancy">Benefit amount differs from latest notice</option>
                <option value="New Academic Session Update">New academic year notification announced</option>
                <option value="Other">Other observation</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Official Source URL (if available)
              </label>
              <input
                type="url"
                value={officialUrl}
                onChange={(e) => setOfficialUrl(e.target.value)}
                placeholder="https://...gov.in or https://...nic.in link"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Correction Description / Details <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please describe what information needs revision based on the official notice..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Your Email Address (Optional — only if you would like confirmation)
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="student@example.com (optional)"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs sm:text-sm"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-sm flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Verification Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
