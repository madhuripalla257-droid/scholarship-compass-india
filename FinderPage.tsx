import React, { useState } from 'react';
import {
  Scholarship,
  StudentProfile,
  MatchStatus,
} from '../types/scholarship';
import { filterScholarships } from '../utils/matcher';
import { ScholarshipCard } from '../components/ScholarshipCard';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  AlertTriangle,
  Clock,
  Info,
  Filter,
  Check,
} from 'lucide-react';

interface FinderPageProps {
  scholarships: Scholarship[];
  onViewDetails: (scholarship: Scholarship) => void;
}

const INITIAL_PROFILE: StudentProfile = {
  educationLevel: '',
  course: '',
  yearOfStudy: '',
  state: '',
  isStateResident: null,
  incomeBand: '',
  category: '',
  percentage: null,
  applicationType: '',
  gender: '',
  hasDisability: null,
  isSingleGirlChild: null,
  isMinority: null,
};

const INDIAN_STATES = [
  'All India',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi (NCT)',
  'Jammu and Kashmir',
  'Ladakh',
  'Puducherry',
  'Chandigarh',
];

export const FinderPage: React.FC<FinderPageProps> = ({
  scholarships,
  onViewDetails,
}) => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [profile, setProfile] = useState<StudentProfile>(INITIAL_PROFILE);
  const [resultsFilter, setResultsFilter] = useState<'All' | MatchStatus>('All');
  const [submitted, setSubmitted] = useState(false);

  const updateProfile = (fields: Partial<StudentProfile>) => {
    setProfile((prev) => ({ ...prev, ...fields }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    if (submitted) {
      setSubmitted(false);
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setProfile(INITIAL_PROFILE);
    setStep(1);
    setSubmitted(false);
    setResultsFilter('All');
  };

  // Run matching engine
  const evaluatedResults = filterScholarships(scholarships, profile);

  const potentialMatchesCount = evaluatedResults.filter(
    (r) => r.status === 'Potential match'
  ).length;
  const checkRequirementsCount = evaluatedResults.filter(
    (r) => r.status === 'Check one more requirement'
  ).length;
  const needsVerificationCount = evaluatedResults.filter(
    (r) => r.status === 'Needs verification'
  ).length;
  const mayNotMatchCount = evaluatedResults.filter(
    (r) => r.status === 'May not match'
  ).length;

  const filteredResults =
    resultsFilter === 'All'
      ? evaluatedResults
      : evaluatedResults.filter((r) => r.status === resultsFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header & Trust Banner */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-semibold mb-3">
          <Compass className="w-4 h-4 text-sky-700" />
          <span>Interactive Scholarship Finder</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Find Your Eligible Scholarships
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
          Answer 5 simple questions to filter central, state, and UGC schemes against your education profile.
        </p>

        {/* Security & Non-Intrusive Privacy Notice */}
        <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>
            <strong>Safe & Private:</strong> We never ask for Aadhaar numbers, OTPs, bank passwords, or document uploads. Your entries stay only in your local browser.
          </span>
        </div>
      </div>

      {/* Form Wizard or Results View */}
      {!submitted ? (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
              <span>Step {step} of {totalSteps}</span>
              <span>
                {step === 1 && 'Education Level & Stream'}
                {step === 2 && 'Year & Domicile State'}
                {step === 3 && 'Family Income & Category'}
                {step === 4 && 'Academic Marks & Mode'}
                {step === 5 && 'Special Scheme Eligibility'}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-sky-700 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 1: Education Level & Course */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-1">
                  1. What is your current or upcoming education level?
                </label>
                <div className="p-2.5 bg-slate-50 rounded-lg text-xs text-slate-500 mb-3 flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                  <span>Why we ask: Scholarships are created for specific academic stages. Selecting your level narrows down irrelevant schemes immediately.</span>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {(
                    [
                      { id: 'Intermediate (Class 11-12)', title: 'Intermediate / Class 11–12 (Higher Secondary, PUC, +2)' },
                      { id: 'Undergraduate', title: 'Undergraduate Degree (B.Tech, B.Sc, B.Com, B.A, MBBS, etc.)' },
                      { id: 'Diploma', title: 'Polytechnic / Technical Diploma' },
                      { id: 'Postgraduate', title: 'Postgraduate Degree (M.Sc, M.Tech, M.Com, M.A, etc.)' },
                      { id: 'Doctoral / Research', title: 'Doctoral / Research (Ph.D, Fellowship, JRF)' },
                    ] as const
                  ).map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => updateProfile({ educationLevel: lvl.id })}
                      className={`text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                        profile.educationLevel === lvl.id
                          ? 'border-sky-600 bg-sky-50/80 text-sky-950 ring-2 ring-sky-500/20'
                          : 'border-slate-200 hover:border-slate-300 text-slate-800'
                      }`}
                    >
                      <span>{lvl.title}</span>
                      {profile.educationLevel === lvl.id && (
                        <Check className="w-4 h-4 text-sky-700 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-1">
                  Course or Field of Study
                </label>
                <input
                  type="text"
                  value={profile.course}
                  onChange={(e) => updateProfile({ course: e.target.value })}
                  placeholder="e.g. Science, B.Sc Physics, Computer Engineering, Commerce, Arts..."
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>
          )}

          {/* Step 2: Year of Study & Domicile */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-1">
                  2. Current Year of Study
                </label>
                <div className="p-2.5 bg-slate-50 rounded-lg text-xs text-slate-500 mb-3 flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                  <span>Why we ask: Many national schemes (like PM-USP CSSS and INSPIRE SHE) only take fresh admissions in the 1st Year.</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {['1st Year', '2nd Year', '3rd Year', '4th Year'].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => updateProfile({ yearOfStudy: yr })}
                      className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                        profile.yearOfStudy === yr
                          ? 'border-sky-600 bg-sky-50 text-sky-900 ring-2 ring-sky-500/20'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-1">
                  State or Union Territory of Residence
                </label>
                <select
                  value={profile.state}
                  onChange={(e) => updateProfile({ state: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                >
                  <option value="">Select your State / UT</option>
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {profile.state && profile.state !== 'All India' && (
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <label className="block text-xs font-bold text-slate-800">
                    Do you hold permanent domicile / residence status in {profile.state}?
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateProfile({ isStateResident: true })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                        profile.isStateResident === true
                          ? 'bg-sky-700 text-white border-sky-700'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      Yes, permanent resident
                    </button>
                    <button
                      type="button"
                      onClick={() => updateProfile({ isStateResident: false })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                        profile.isStateResident === false
                          ? 'bg-sky-700 text-white border-sky-700'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      No / Studying from another state
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Income Band & Category */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-1">
                  3. Approximate Gross Annual Family Income Band
                </label>
                <div className="p-2.5 bg-slate-50 rounded-lg text-xs text-slate-500 mb-3 flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                  <span>Why we ask: Many welfare schemes have income ceilings (e.g., ₹2.5L, ₹4.5L, or ₹8L). Pure merit schemes (like INSPIRE) have no income limit.</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: '<= 2.5 Lakh', label: 'Up to ₹2.5 Lakh / year (Post-Matric/Welfare)' },
                    { id: '<= 4.5 Lakh', label: 'Up to ₹4.5 Lakh / year (PM-USP CSSS ceiling)' },
                    { id: '<= 8 Lakh', label: 'Up to ₹8.0 Lakh / year (AICTE Pragati ceiling)' },
                    { id: '> 8 Lakh', label: 'Above ₹8.0 Lakh / year' },
                    { id: 'Prefer not to say', label: 'Prefer not to say (Show all schemes)' },
                  ].map((band) => (
                    <button
                      key={band.id}
                      type="button"
                      onClick={() => updateProfile({ incomeBand: band.id })}
                      className={`text-left p-3 rounded-xl border text-xs font-medium transition-all ${
                        profile.incomeBand === band.id
                          ? 'border-sky-600 bg-sky-50 text-sky-900 ring-2 ring-sky-500/20'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      {band.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-1">
                  Category / Community (Optional)
                </label>
                <div className="p-2.5 bg-slate-50 rounded-lg text-xs text-slate-500 mb-3 flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                  <span>Why we ask: Schemes by the Ministry of Tribal Affairs or Social Justice have statutory reservation criteria. You can always select &quot;Prefer not to say&quot;.</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'General',
                    'OBC',
                    'SC',
                    'ST',
                    'EWS',
                    'Prefer not to say',
                  ].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => updateProfile({ category: cat as any })}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                        profile.category === cat
                          ? 'border-sky-600 bg-sky-50 text-sky-900 ring-2 ring-sky-500/20'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Academic Marks & Fresh/Renewal */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-1">
                  4. Academic Marks or Percentage in Previous Qualifying Exam
                </label>
                <div className="p-2.5 bg-slate-50 rounded-lg text-xs text-slate-500 mb-3 flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                  <span>Why we ask: Merit-based schemes like INSPIRE require top board percentiles or minimum percentage cutoffs.</span>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={profile.percentage ?? ''}
                    onChange={(e) =>
                      updateProfile({
                        percentage: e.target.value === '' ? null : Number(e.target.value),
                      })
                    }
                    placeholder="e.g. 78 (0-100)"
                    className="w-48 px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <button
                    type="button"
                    onClick={() => updateProfile({ percentage: null })}
                    className="text-xs text-slate-500 hover:text-slate-800 underline"
                  >
                    Clear / Skip
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-1">
                  Fresh Applicant or Renewal?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'Fresh', label: 'Fresh Applicant (Applying for the first time)' },
                    { id: 'Renewal', label: 'Renewal (Received this scholarship previously)' },
                    { id: 'Not sure', label: 'Not sure / Exploring both' },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => updateProfile({ applicationType: mode.id as any })}
                      className={`text-left p-3 rounded-xl border text-xs font-medium transition-all ${
                        profile.applicationType === mode.id
                          ? 'border-sky-600 bg-sky-50 text-sky-900 ring-2 ring-sky-500/20'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Special Criteria */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-1">
                  5. Optional Scheme Factors (Gender, Disability, Special Criteria)
                </label>
                <div className="p-2.5 bg-slate-50 rounded-lg text-xs text-slate-500 mb-4 flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                  <span>Why we ask: Certain landmark schemes are dedicated to female students (AICTE Pragati, UGC Indira Gandhi Single Girl Child) or students with disabilities (DEPwD).</span>
                </div>

                {/* Gender */}
                <div className="mb-4">
                  <span className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Gender Identity:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {['Female', 'Male', 'Other / Prefer not to say'].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => updateProfile({ gender: g as any })}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                          profile.gender === g
                            ? 'border-sky-600 bg-sky-50 text-sky-900 ring-2 ring-sky-500/20'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Disability */}
                <div className="mb-4">
                  <span className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Person with Benchmark Disability (PwD 40%+)?
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => updateProfile({ hasDisability: true })}
                      className={`p-2 rounded-xl border text-xs font-semibold text-center ${
                        profile.hasDisability === true
                          ? 'border-sky-600 bg-sky-50 text-sky-900 ring-2 ring-sky-500/20'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      Yes (PwD 40%+)
                    </button>
                    <button
                      type="button"
                      onClick={() => updateProfile({ hasDisability: false })}
                      className={`p-2 rounded-xl border text-xs font-semibold text-center ${
                        profile.hasDisability === false
                          ? 'border-sky-600 bg-sky-50 text-sky-900 ring-2 ring-sky-500/20'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      onClick={() => updateProfile({ hasDisability: null })}
                      className={`p-2 rounded-xl border text-xs font-semibold text-center ${
                        profile.hasDisability === null
                          ? 'border-sky-600 bg-sky-50 text-sky-900 ring-2 ring-sky-500/20'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      Prefer not to say
                    </button>
                  </div>
                </div>

                {/* Single Girl Child */}
                <div>
                  <span className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Single Girl Child in family (only child with no other brother/sister)?
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => updateProfile({ isSingleGirlChild: true })}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                        profile.isSingleGirlChild === true
                          ? 'bg-sky-700 text-white border-sky-700'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => updateProfile({ isSingleGirlChild: false })}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                        profile.isSingleGirlChild === false
                          ? 'bg-sky-700 text-white border-sky-700'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      onClick={() => updateProfile({ isSingleGirlChild: null })}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                        profile.isSingleGirlChild === null
                          ? 'bg-sky-700 text-white border-sky-700'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      Prefer not to say
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="mt-8 pt-5 border-t border-slate-200 flex items-center justify-between gap-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous Step
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-slate-500 hover:text-slate-800 underline"
              >
                Reset Answers
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs sm:text-sm shadow-sm flex items-center gap-2"
            >
              <span>{step === totalSteps ? 'Show Matching Scholarships' : 'Next Step'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Results Section */
        <div className="space-y-6">
          {/* Results Summary Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-sky-800 uppercase tracking-wider block mb-1">
                  Matching Engine Evaluation
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Scholarships Evaluated Against Your Profile
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Filtered by: {profile.educationLevel || 'Any Level'} • {profile.state || 'All States'} • Income: {profile.incomeBand || 'Disclosed/Any'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50"
                >
                  Edit Answers
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Start Over
                </button>
              </div>
            </div>

            {/* Filter Pills for Match Categories */}
            <div className="pt-4 flex flex-wrap items-center gap-2">
              <button
                onClick={() => setResultsFilter('All')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  resultsFilter === 'All'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Schemes ({evaluatedResults.length})
              </button>

              <button
                onClick={() => setResultsFilter('Potential match')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  resultsFilter === 'Potential match'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Potential Matches ({potentialMatchesCount})
              </button>

              <button
                onClick={() => setResultsFilter('Check one more requirement')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  resultsFilter === 'Check one more requirement'
                    ? 'bg-amber-700 text-white'
                    : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                Check 1+ Requirement ({checkRequirementsCount})
              </button>

              <button
                onClick={() => setResultsFilter('Needs verification')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  resultsFilter === 'Needs verification'
                    ? 'bg-sky-700 text-white'
                    : 'bg-sky-50 text-sky-900 border border-sky-200 hover:bg-sky-100'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                Needs Verification ({needsVerificationCount})
              </button>

              <button
                onClick={() => setResultsFilter('May not match')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  resultsFilter === 'May not match'
                    ? 'bg-slate-700 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                May Not Match ({mayNotMatchCount})
              </button>
            </div>
          </div>

          {/* Results Grid */}
          {filteredResults.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
              <Filter className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900">No Scholarships in This Tab</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try switching to &quot;All Schemes&quot; or editing your profile parameters.
              </p>
              <button
                onClick={() => setResultsFilter('All')}
                className="mt-4 px-4 py-2 rounded-lg bg-sky-700 text-white font-semibold text-xs"
              >
                View All Results
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResults.map((evalResult) => (
                <ScholarshipCard
                  key={evalResult.scholarship.id}
                  scholarship={evalResult.scholarship}
                  matchEvaluation={evalResult}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
