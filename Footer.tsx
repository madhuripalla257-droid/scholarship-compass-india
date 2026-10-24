import React from 'react';
import { Compass, ShieldCheck, Lock, AlertCircle, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string, params?: any) => void;
  onOpenReportModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenReportModal }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-slate-800">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-slate-800 text-teal-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Independent Discovery Platform</h4>
              <p className="text-xs text-slate-400 mt-1">
                Not a government website. Information is compiled strictly from published gazettes, university notices, and official portals.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-slate-800 text-sky-400 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">100% Client-Side Privacy</h4>
              <p className="text-xs text-slate-400 mt-1">
                We never ask for Aadhaar number, OTP, bank account details, or certificate uploads. Your profile stays in your browser.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-slate-800 text-amber-400 shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Official Provider Authority</h4>
              <p className="text-xs text-slate-400 mt-1">
                Matching results represent potential eligibility. Final sanction, approval, and disbursement rest exclusively with the scheme authority.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10 border-b border-slate-800">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-bold text-white text-lg">Scholarship Compass India</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering students across India with clear eligibility rules, transparent match explanations, and verified links to official government portals.
            </p>
            <div className="pt-1">
              <button
                onClick={onOpenReportModal}
                className="inline-flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-medium underline"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                Report outdated link / incorrect information
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Explore & Tools
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('finder')} className="hover:text-white transition-colors">
                  Multi-Step Scholarship Finder
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('browse')} className="hover:text-white transition-colors">
                  All Scholarships Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('how-it-works')} className="hover:text-white transition-colors">
                  How Discovery Matching Works
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('official-resources')} className="hover:text-white transition-colors">
                  Verified Official Portals Directory
                </button>
              </li>
            </ul>
          </div>

          {/* Education Streams */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Browse by Education
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('education', { level: 'Intermediate (Class 11-12)' })}
                  className="hover:text-white transition-colors"
                >
                  Intermediate / Classes 11–12
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('education', { level: 'Undergraduate' })}
                  className="hover:text-white transition-colors"
                >
                  Undergraduate Degrees & Diplomas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('education', { level: 'Postgraduate' })}
                  className="hover:text-white transition-colors"
                >
                  Postgraduate Degrees
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('education', { level: 'Doctoral / Research' })}
                  className="hover:text-white transition-colors text-teal-400 font-medium"
                >
                  Research & Fellowships (Dedicated)
                </button>
              </li>
            </ul>
          </div>

          {/* Official Central Portals */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Official Key Portals
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a
                  href="https://scholarships.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  National Scholarship Portal (NSP) <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.ugc.gov.in/Home/student_Corner"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  UGC Student Corner <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://online-inspire.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  DST INSPIRE Portal <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://jnanabhumi.ap.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  AP JnanaBhumi Portal <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="pt-8 text-xs text-slate-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-center md:text-left leading-relaxed">
            © {new Date().getFullYear()} Scholarship Compass India. Free educational resource. Not affiliated with the Government of India or any State Government.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <button onClick={() => onNavigate('privacy-disclaimer')} className="hover:text-slate-200 underline">
              Privacy Policy & Disclaimer
            </button>
            <button onClick={() => onNavigate('about')} className="hover:text-slate-200 underline">
              About & Methodology
            </button>
            <button onClick={onOpenReportModal} className="hover:text-teal-400 underline">
              Report Correction
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
