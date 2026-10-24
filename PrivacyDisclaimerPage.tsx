import { ShieldCheck, Lock, AlertTriangle, FileText } from 'lucide-react';

export const PrivacyDisclaimerPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold mb-3">
          <FileText className="w-4 h-4 text-slate-700" />
          <span>Legal & Privacy Commitments</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Privacy Policy & Legal Disclaimer
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
          Last updated: February 2025 • Read our comprehensive terms regarding student data privacy, source authority, and non-government status.
        </p>
      </div>

      {/* Non-Government Status Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-amber-950 space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
          <h2 className="text-base sm:text-lg font-bold text-amber-900">
            Important Notice: Non-Government Platform
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
          <strong>Scholarship Compass India</strong> (scholarshipcompass.in / local discovery build) is an independent informational and guidance project. It is <strong>NOT</strong> an official portal of the Government of India, the Ministry of Education, the University Grants Commission (UGC), or any State Government department.
        </p>
        <p className="text-xs text-amber-800 leading-relaxed">
          We do not process applications, collect government fees, make candidate selections, or disburse funds. Official applications must be completed on verified government portals such as the National Scholarship Portal (scholarships.gov.in) or respective state portals.
        </p>
      </div>

      {/* No Guarantee of Approval Disclaimer */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-3">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-sky-700" />
          No Guarantee of Eligibility, Approval or Disbursement
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Matching evaluations labeled as &quot;Potential match&quot; indicate only that your self-reported academic profile and family income appear consistent with published scheme eligibility criteria.
        </p>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          A potential match does <strong>NOT</strong> constitute confirmed eligibility, approval, or guarantee of monetary disbursement. Final decisions are made solely by the scholarship-issuing authority following electronic scrutiny, physical document verification, and state/national merit ranking quotas.
        </p>
      </div>

      {/* Privacy & Zero-Data-Collection Pledge */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Lock className="w-5 h-5 text-teal-600" />
          Our Privacy & Data Protection Pledge
        </h2>

        <div className="space-y-3 text-xs sm:text-sm text-slate-700">
          <p className="leading-relaxed">
            We hold a firm commitment to student privacy and ethical technology:
          </p>

          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>
              <strong>No Sensitive Data Requested:</strong> We never ask for your 12-digit Aadhaar number, banking passwords, OTPs, caste certificate register numbers, or scanned identity files.
            </li>
            <li>
              <strong>Client-Side Execution:</strong> All multi-step scholarship filtering calculations occur directly within your local web browser using JavaScript. Your answers are not stored on any remote database.
            </li>
            <li>
              <strong>No Advertising Trackers:</strong> We do not track you across the web, profile your student identity, or sell data to commercial tutoring or loan companies.
            </li>
            <li>
              <strong>External Links:</strong> External links leading to official portals (.gov.in / .nic.in) are opened securely with <code>rel=&quot;noopener noreferrer&quot;</code> in a new tab.
            </li>
          </ul>
        </div>
      </div>

      {/* Source Verification & Outdated Information Notice */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-xs sm:text-sm text-slate-700 space-y-3">
        <h3 className="font-bold text-slate-900 text-base">
          Rule Changes & Reporting Outdated Information
        </h3>
        <p className="leading-relaxed text-slate-600">
          Scholarship rules, quotas, and application deadlines are subject to change at any time by central and state authorities. While we make every effort to maintain verified records and clearly label unverified schemes, students must always verify current guidelines on the official portal prior to application submission.
        </p>
        <p className="leading-relaxed text-slate-600">
          If you identify a deadline discrepancy, broken link, or revised guideline, please use our &quot;Report Outdated Information&quot; form to notify our verification team.
        </p>
      </div>
    </div>
  );
};
