import React from 'react';
import {
  Compass,
  FileCheck2,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

interface HowItWorksPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Title */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-semibold mb-3">
          <Compass className="w-4 h-4 text-sky-700" />
          <span>Student Application Handbook</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How Discovery & Official Application Works
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
          A step-by-step roadmap for Indian students from finding relevant schemes to preparing certificates and submitting error-free applications on genuine government portals.
        </p>
      </div>

      {/* 4 Steps Graphic Flow */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-sm mb-4">
              01
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">
              Discover & Match
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Use our multi-step finder to identify schemes matching your exact education level, stream, income band, and domicile.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            ✓ 100% Client-side matching
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm mb-4">
              02
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">
              Verify Official Notice
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Click the official guidelines link. Verify the scheme cutoff, closing deadline, and quota allocation for your current academic session.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            ✓ Direct links to .gov.in notices
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-sm mb-4">
              03
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">
              Prepare Checklist
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Use our &quot;Copy Checklist&quot; feature to assemble income certificates, marks transcripts, bonafide letters, and Aadhaar-seeded bank passbooks.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            ✓ Instant copyable checklist
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm mb-4">
              04
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">
              Apply on Official Portal
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Navigate to the official portal (e.g., NSP with your One-Time Registration OTR) to submit your form without paying any intermediary fees.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            ✓ Apply directly on NSP or state portal
          </div>
        </div>
      </div>

      {/* Critical Document Checklist Advice */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <FileCheck2 className="w-6 h-6 text-sky-700" />
          The Core Four Prerequisites for Government Scholarships
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-700">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block text-sm">
              1. Aadhaar-Seeded Active Bank Account (DBT Enabled)
            </span>
            <p className="text-slate-600 leading-relaxed">
              Scholarship grants are disbursed strictly through the Aadhaar Payment Bridge (APB) / Direct Benefit Transfer (DBT). Ensure your bank account has active NPCI Aadhaar seeding. You can check seeding status on the official UIDAI portal.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block text-sm">
              2. Valid Income Certificate by Competent Revenue Authority
            </span>
            <p className="text-slate-600 leading-relaxed">
              Income certificates issued by private notaries or non-statutory bodies are rejected during verification. Always obtain a valid certificate from the Tehsildar, Sub-Divisional Magistrate (SDM), or state citizen portal (e.g., MeeSeva in AP).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block text-sm">
              3. Institution Bonafide & AISHE Verification
            </span>
            <p className="text-slate-600 leading-relaxed">
              Your college or school must be registered on the All India Survey on Higher Education (AISHE) or U-DISE for schools. Applications require formal electronic endorsement by your institute nodal officer.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block text-sm">
              4. OTR (One-Time Registration) on National Scholarship Portal
            </span>
            <p className="text-slate-600 leading-relaxed">
              Central schemes now require a permanent 14-digit OTR generated via facial recognition or Aadhaar e-KYC. Keep your linked mobile number active to receive system updates and OTP confirmations.
            </p>
          </div>
        </div>
      </div>

      {/* Fraud Alert & Scam Red Flags */}
      <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 sm:p-8 text-rose-950 space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-rose-700" />
          <h2 className="text-xl sm:text-2xl font-bold text-rose-900">
            Scam Warning: Beware of Scholarship Fraud & Fake Agents
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-rose-800 leading-relaxed">
          Students frequently fall victim to deceptive social media posts, phishing SMS messages, and middlemen promising guaranteed approvals. Watch out for these red flags:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-white/80 p-4 rounded-xl border border-rose-200 space-y-1">
            <span className="font-bold text-rose-900 block">Demanding Processing Fees:</span>
            <p className="text-rose-800 leading-relaxed">
              Government schemes NEVER charge an application fee. Anyone asking for ₹500, ₹1000, or a percentage of the scholarship is running a scam.
            </p>
          </div>

          <div className="bg-white/80 p-4 rounded-xl border border-rose-200 space-y-1">
            <span className="font-bold text-rose-900 block">Fake &apos;Guaranteed Approval&apos; Claims:</span>
            <p className="text-rose-800 leading-relaxed">
              No private agency can guarantee selection. Scholarships are awarded strictly on merit percentiles and verifiable eligibility records.
            </p>
          </div>

          <div className="bg-white/80 p-4 rounded-xl border border-rose-200 space-y-1">
            <span className="font-bold text-rose-900 block">Phishing Forms & Social Media Links:</span>
            <p className="text-rose-800 leading-relaxed">
              Never enter your bank account password, ATM PIN, or Aadhaar OTP on Google Forms or unofficial URLs ending in .xyz, .online, or .cc.
            </p>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="text-center pt-4">
        <button
          onClick={() => onNavigate('finder')}
          className="px-8 py-3.5 rounded-xl font-bold text-white bg-sky-700 hover:bg-sky-800 shadow-md transition-all inline-flex items-center gap-2 text-sm"
        >
          <span>Find Scholarships Matching Your Profile</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
