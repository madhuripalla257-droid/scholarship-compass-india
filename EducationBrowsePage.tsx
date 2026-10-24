import React from 'react';
import { Scholarship, EducationLevel } from '../types/scholarship';
import { ScholarshipCard } from '../components/ScholarshipCard';
import {
  GraduationCap,
  BookOpen,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface EducationBrowsePageProps {
  level: string;
  scholarships: Scholarship[];
  onViewDetails: (scholarship: Scholarship) => void;
  onNavigate: (page: string, params?: any) => void;
}

export const EducationBrowsePage: React.FC<EducationBrowsePageProps> = ({
  level,
  scholarships,
  onViewDetails,
  onNavigate,
}) => {
  const getLevelMeta = (lvl: string) => {
    switch (lvl) {
      case 'Intermediate (Class 11-12)':
        return {
          title: 'Intermediate / Classes 11–12 Scholarships',
          subtitle: 'Higher Secondary, PUC, +2, Junior College, and Pre-University Schemes',
          description:
            'Scholarships in this tier support secondary school completion and bridge the gap to higher education. Most schemes require admission into recognized government or aided schools and evaluate board marks alongside family income thresholds.',
          icon: <BookOpen className="w-8 h-8 text-sky-700" />,
          color: 'sky',
          tips: [
            'Class 10 passing certificate and marksheets are primary evaluation documents.',
            'Keep your family income certificate updated as most schemes require an annual income below ₹3.5 Lakh.',
            'Renewal for Class 12 requires passing Class 11 with specified minimum marks.',
          ],
        };
      case 'Undergraduate':
      case 'Diploma':
        return {
          title: 'Undergraduate Degrees & Polytechnic Diplomas',
          subtitle: 'B.Tech, B.Sc, B.Com, B.A, MBBS, Professional & Technical Courses',
          description:
            'Undergraduate schemes provide tuition fee reimbursement and monthly stipends to ensure students can afford degree programmes. Schemes include the Central Sector PM-USP CSSS, AICTE Pragati, state welfare freeships, and PwD support.',
          icon: <GraduationCap className="w-8 h-8 text-blue-700" />,
          color: 'blue',
          tips: [
            'Many flagship central schemes accept Fresh applications only in the 1st Year of college.',
            'Subsequent years require annual renewal applications on the National Scholarship Portal (NSP).',
            'Minimum 75% attendance and passing all semester subjects are standard continuation conditions.',
          ],
        };
      case 'Postgraduate':
        return {
          title: 'Postgraduate Degree Scholarships',
          subtitle: 'Master Degrees (M.Sc, M.Tech, M.A, M.Com, MCA, MBA)',
          description:
            'Postgraduate schemes are designed to promote advanced learning and specialized academic qualifications. Notable schemes include UGC National Scholarships for PG Studies and the Single Girl Child PG Grant.',
          icon: <GraduationCap className="w-8 h-8 text-purple-700" />,
          color: 'purple',
          tips: [
            'Undergraduate graduation marks and university merit percentiles are paramount.',
            'Ensure the university or affiliated college is recognized under UGC Section 2(f) & 12(B).',
            'Admissions under distance education mode are generally not eligible for central PG scholarships.',
          ],
        };
      case 'Doctoral / Research':
      default:
        return {
          title: 'Research & Doctoral Fellowships (Ph.D / JRF)',
          subtitle: 'Research Fellowships, CSIR-UGC NET JRF, and DST INSPIRE',
          description:
            'Research fellowships are distinctly separate from ordinary undergraduate/postgraduate scholarships. Fellowships provide monthly stipends (₹37,000 to ₹42,000/month) and research contingency grants to support full-time doctoral scholars contributing to scientific and academic knowledge.',
          icon: <Sparkles className="w-8 h-8 text-teal-700" />,
          color: 'teal',
          isResearch: true,
          tips: [
            'Fellowships are merit and entrance examination driven (e.g. CSIR-UGC NET, GATE, INSPIRE University Gold Medal).',
            'Full-time Ph.D registration in a recognized university or national laboratory is mandatory.',
            'Fellows are not permitted to accept other salary or concurrent financial assistance.',
          ],
        };
    }
  };

  const meta = getLevelMeta(level);

  // Filter schemes
  const levelSchemes = scholarships.filter((s) => {
    if (level === 'Doctoral / Research') {
      return s.isFellowshipOrResearch || s.educationLevels.includes('Doctoral / Research');
    }
    return s.educationLevels.includes(level as EducationLevel);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shrink-0">
            {meta.icon}
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-800 uppercase tracking-wider mb-1">
              <span>Education Stage Directory</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {meta.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              {meta.subtitle}
            </p>
          </div>
        </div>

        <p className="mt-5 text-xs sm:text-sm text-slate-700 leading-relaxed max-w-4xl">
          {meta.description}
        </p>

        {/* Level Specific Important Guidance */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
            Essential Advice for this Academic Level:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {meta.tips.map((tip, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {meta.isResearch && (
          <div className="mt-4 p-3 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-700 shrink-0" />
            <span>
              <strong>Note on Research Tracks:</strong> Fellowships like CSIR-UGC NET JRF and INSPIRE Fellowship are distinguished by competitive qualifying exams and monthly stipends rather than annual tuition subsidies.
            </span>
          </div>
        )}
      </div>

      {/* Schemes Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Available Schemes ({levelSchemes.length})
          </h2>

          <button
            onClick={() => onNavigate('finder')}
            className="text-xs font-semibold text-sky-700 hover:text-sky-900 flex items-center gap-1"
          >
            <span>Run personal eligibility check</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levelSchemes.map((scholarship) => (
            <ScholarshipCard
              key={scholarship.id}
              scholarship={scholarship}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
