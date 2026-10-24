export type EducationLevel =
  | 'Intermediate (Class 11-12)'
  | 'Undergraduate'
  | 'Diploma'
  | 'Postgraduate'
  | 'Doctoral / Research';

export type ProviderType =
  | 'Central Government'
  | 'State Government'
  | 'University / UGC'
  | 'Corporate CSR'
  | 'Private Foundation';

export type ApplicationStatus = 'Open' | 'Upcoming' | 'Closed' | 'Unverified';

export type VerificationStatus = 'Verified' | 'Needs verification';

export type FreshOrRenewal = 'Fresh' | 'Renewal' | 'Both';

export type SocialCategory = 'General' | 'OBC' | 'SC' | 'ST' | 'EWS' | 'Minority' | 'All';

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  providerType: ProviderType;
  educationLevels: EducationLevel[];
  eligibleCourses: string[];
  eligibleStates: string[]; // ['All India'] or specific state names
  domicileRequirements: string | null;
  yearOfStudy: string[]; // e.g. ['1st Year', '2nd Year', 'Any Year']
  incomeCriteria: {
    maxAnnualFamilyIncome: number | null; // e.g. 250000, 450000, 800000 or null if no ceiling or unverified
    description: string;
    preferNotToSayAccepted?: boolean;
  };
  academicCriteria: {
    minPercentage: number | null; // e.g. 60 or null if not specified/unverified
    boardOrUniversityRequirement?: string | null;
    description: string;
  };
  categoryCriteria: {
    eligibleCategories: SocialCategory[];
    description: string;
  };
  genderCriteria?: 'All' | 'Female only' | 'Male only' | 'Transgender';
  disabilityCriteria?: {
    required: boolean;
    minDisabilityPercentage?: number;
    description?: string;
  };
  freshOrRenewal: FreshOrRenewal;
  benefitsDescription: string;
  benefitAmount: string | null; // Verified amount string or null if unverified/variable
  requiredDocuments: string[];
  applicationStatus: ApplicationStatus;
  applicationStartDate: string | null;
  applicationDeadline: string | null; // ISO YYYY-MM-DD or null
  academicYear: string;
  officialInformationUrl: string;
  officialApplicationUrl: string | null;
  lastVerifiedAt: string; // ISO YYYY-MM-DD
  verificationStatus: VerificationStatus;
  sourceNotes: string;
  isFellowshipOrResearch?: boolean;
}

export type MatchStatus =
  | 'Potential match'
  | 'Check one more requirement'
  | 'May not match'
  | 'Needs verification';

export interface CriterionCheck {
  label: string;
  status: 'matched' | 'unknown' | 'conflicting';
  detail: string;
}

export interface MatchEvaluation {
  scholarship: Scholarship;
  status: MatchStatus;
  score: number;
  matchedCriteria: CriterionCheck[];
  unknownCriteria: CriterionCheck[];
  conflictingCriteria: CriterionCheck[];
  actionableChecklist: string[];
  reasonSummary: string;
}

export interface StudentProfile {
  educationLevel: EducationLevel | '';
  course: string;
  yearOfStudy: string;
  state: string;
  isStateResident: boolean | null; // Domicile confirmation
  incomeBand: string; // '<= 2.5 Lakh', '<= 4.5 Lakh', '<= 8 Lakh', '> 8 Lakh', 'Prefer not to say'
  category: SocialCategory | 'Prefer not to say' | '';
  percentage: number | null; // 0-100 or null if not provided
  applicationType: 'Fresh' | 'Renewal' | 'Not sure' | '';
  gender: 'Female' | 'Male' | 'Other / Prefer not to say' | '';
  hasDisability: boolean | null; // true, false, or null for "prefer not to say"
  isSingleGirlChild?: boolean | null;
  isMinority?: boolean | null;
}
