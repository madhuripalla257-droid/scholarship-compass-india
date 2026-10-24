import { describe, it, expect } from 'vitest';
import { evaluateScholarshipMatch, filterScholarships } from '../matcher';
import { SCHOLARSHIPS_DATA } from '../../data/scholarships';
import { StudentProfile, Scholarship } from '../../types/scholarship';
import { formatDate, isDeadlineExpired } from '../formatters';

describe('Scholarship Compass India — Matching Engine', () => {
  const baseProfile: StudentProfile = {
    educationLevel: 'Undergraduate',
    course: 'B.Sc Physics',
    yearOfStudy: '1st Year',
    state: 'Karnataka',
    isStateResident: true,
    incomeBand: '<= 2.5 Lakh',
    category: 'General',
    percentage: 85,
    applicationType: 'Fresh',
    gender: 'Female',
    hasDisability: false,
    isSingleGirlChild: false,
    isMinority: false,
  };

  it('correctly matches a qualified student for PM-USP CSSS as "Potential match"', () => {
    const csss = SCHOLARSHIPS_DATA.find((s) => s.id === 'pm-usp-csss')!;
    const match = evaluateScholarshipMatch(csss, baseProfile);

    expect(match.status).toBe('Potential match');
    expect(match.conflictingCriteria).toHaveLength(0);
    expect(match.matchedCriteria.some((c) => c.label === 'Education Level')).toBe(true);
    expect(match.matchedCriteria.some((c) => c.label === 'Family Income')).toBe(true);
  });

  it('marks as "May not match" when education level conflicts', () => {
    const nmms = SCHOLARSHIPS_DATA.find((s) => s.id === 'nmms-class11-12')!; // Class 11-12 only
    const match = evaluateScholarshipMatch(nmms, baseProfile); // Profile is Undergraduate

    expect(match.status).toBe('May not match');
    expect(match.conflictingCriteria.some((c) => c.label === 'Education Level')).toBe(true);
  });

  it('marks as "May not match" when income ceiling is exceeded', () => {
    const csss = SCHOLARSHIPS_DATA.find((s) => s.id === 'pm-usp-csss')!; // Max 4.5 Lakh
    const wealthyProfile: StudentProfile = {
      ...baseProfile,
      incomeBand: '> 8 Lakh',
    };
    const match = evaluateScholarshipMatch(csss, wealthyProfile);

    expect(match.status).toBe('May not match');
    expect(match.conflictingCriteria.some((c) => c.label === 'Family Income')).toBe(true);
  });

  it('marks as "Check one more requirement" when income is "Prefer not to say" or missing', () => {
    const csss = SCHOLARSHIPS_DATA.find((s) => s.id === 'pm-usp-csss')!;
    const discreetProfile: StudentProfile = {
      ...baseProfile,
      incomeBand: 'Prefer not to say',
    };
    const match = evaluateScholarshipMatch(csss, discreetProfile);

    expect(match.status).toBe('Check one more requirement');
    expect(match.unknownCriteria.some((c) => c.label === 'Family Income Band')).toBe(true);
    expect(match.conflictingCriteria).toHaveLength(0);
  });

  it('marks as "May not match" when state domicile requirement is not met', () => {
    const apScheme = SCHOLARSHIPS_DATA.find((s) => s.id === 'ap-jnanabhumi-rtf')!; // Andhra Pradesh only
    const nonAPProfile: StudentProfile = {
      ...baseProfile,
      state: 'Karnataka',
    };
    const match = evaluateScholarshipMatch(apScheme, nonAPProfile);

    expect(match.status).toBe('May not match');
    expect(match.conflictingCriteria.some((c) => c.label === 'State Eligibility')).toBe(true);
  });

  it('marks as "Potential match" when student meets Andhra Pradesh state & domicile requirement', () => {
    const apScheme = SCHOLARSHIPS_DATA.find((s) => s.id === 'ap-jnanabhumi-rtf')!;
    const apProfile: StudentProfile = {
      ...baseProfile,
      state: 'Andhra Pradesh',
      isStateResident: true,
      category: 'OBC',
      course: 'B.Tech Computer Science',
    };
    const match = evaluateScholarshipMatch(apScheme, apProfile);

    expect(match.status).toBe('Potential match');
    expect(match.conflictingCriteria).toHaveLength(0);
  });

  it('marks as "Needs verification" for schemes with unverified records regardless of profile', () => {
    const unverifiedScheme = SCHOLARSHIPS_DATA.find(
      (s) => s.verificationStatus === 'Needs verification'
    )!;
    const match = evaluateScholarshipMatch(unverifiedScheme, baseProfile);

    expect(match.status).toBe('Needs verification');
    expect(match.unknownCriteria.some((c) => c.label === 'Official Verification')).toBe(true);
  });

  it('correctly handles Fresh vs Renewal matching', () => {
    const freshOnlyScheme: Scholarship = {
      ...SCHOLARSHIPS_DATA[0],
      id: 'fresh-only-test',
      freshOrRenewal: 'Fresh',
    };

    const renewalProfile: StudentProfile = {
      ...baseProfile,
      applicationType: 'Renewal',
    };

    const match = evaluateScholarshipMatch(freshOnlyScheme, renewalProfile);
    expect(match.status).toBe('May not match');
    expect(match.conflictingCriteria.some((c) => c.label === 'Fresh / Renewal Mode')).toBe(true);
  });

  it('evaluates gender-restricted schemes accurately', () => {
    const pragati = SCHOLARSHIPS_DATA.find((s) => s.id === 'aicte-pragati-degree-diploma')!; // Female only
    const maleProfile: StudentProfile = {
      ...baseProfile,
      gender: 'Male',
      course: 'B.Tech Mechanical',
    };

    const match = evaluateScholarshipMatch(pragati, maleProfile);
    expect(match.status).toBe('May not match');
    expect(match.conflictingCriteria.some((c) => c.label === 'Gender Eligibility')).toBe(true);
  });

  it('evaluates disability-restricted schemes accurately', () => {
    const depwd = SCHOLARSHIPS_DATA.find((s) => s.id === 'depwd-post-matric')!;
    const noDisabilityProfile: StudentProfile = {
      ...baseProfile,
      hasDisability: false,
    };

    const match = evaluateScholarshipMatch(depwd, noDisabilityProfile);
    expect(match.status).toBe('May not match');
    expect(match.conflictingCriteria.some((c) => c.label === 'Disability Eligibility')).toBe(true);

    const withDisabilityProfile: StudentProfile = {
      ...baseProfile,
      hasDisability: true,
    };
    const matchWithPwD = evaluateScholarshipMatch(depwd, withDisabilityProfile);
    expect(matchWithPwD.status).toBe('Potential match');
  });

  it('formats unverified deadlines safely as "Deadline not verified — check official source"', () => {
    expect(formatDate(null)).toBe('Deadline not verified — check official source');
    expect(formatDate('')).toBe('Deadline not verified — check official source');
    expect(formatDate('2025-11-30')).toContain('2025');
  });

  it('detects expired deadlines accurately', () => {
    expect(isDeadlineExpired('2020-01-01')).toBe(true);
    expect(isDeadlineExpired('2030-12-31')).toBe(false);
    expect(isDeadlineExpired(null)).toBe(false);
  });

  it('ranks potential matches higher than unknown requirements and conflicts', () => {
    const results = filterScholarships(SCHOLARSHIPS_DATA, baseProfile);
    expect(results.length).toBe(SCHOLARSHIPS_DATA.length);
    // Highest score should be at top
    expect(results[0].score).toBeGreaterThanOrEqual(results[results.length - 1].score);
  });

  it('marks as "Check one more requirement" when domicile residence is unknown for state scheme', () => {
    const apScheme = SCHOLARSHIPS_DATA.find((s) => s.id === 'ap-jnanabhumi-rtf')!;
    const apUnknownResidentProfile: StudentProfile = {
      ...baseProfile,
      state: 'Andhra Pradesh',
      isStateResident: null, // User did not answer domicile status
      category: 'OBC',
    };
    const match = evaluateScholarshipMatch(apScheme, apUnknownResidentProfile);
    expect(match.status).toBe('Check one more requirement');
    expect(match.unknownCriteria.some((c) => c.label === 'Domicile Certificate')).toBe(true);
  });

  it('correctly conflicts when an Arts student applies for pure science schemes', () => {
    const inspireScheme = SCHOLARSHIPS_DATA.find((s) => s.id === 'dst-inspire-she')!;
    const artsProfile: StudentProfile = {
      ...baseProfile,
      course: 'B.A. Political Science & Arts',
    };
    const match = evaluateScholarshipMatch(inspireScheme, artsProfile);
    expect(match.status).toBe('May not match');
    expect(match.conflictingCriteria.some((c) => c.label === 'Course / Stream')).toBe(true);
  });

  it('correctly conflicts when a student with siblings applies for UGC Single Girl Child scheme', () => {
    const singleGirlScheme = SCHOLARSHIPS_DATA.find((s) => s.id === 'ugc-pg-single-girl-child')!;
    const girlWithSiblingsProfile: StudentProfile = {
      ...baseProfile,
      educationLevel: 'Postgraduate',
      gender: 'Female',
      isSingleGirlChild: false,
    };
    const match = evaluateScholarshipMatch(singleGirlScheme, girlWithSiblingsProfile);
    expect(match.status).toBe('May not match');
    expect(match.conflictingCriteria.some((c) => c.label === 'Single Girl Child Status')).toBe(true);
  });

  it('marks as "Potential match" for UGC Single Girl Child when student is verified single girl child', () => {
    const singleGirlScheme = SCHOLARSHIPS_DATA.find((s) => s.id === 'ugc-pg-single-girl-child')!;
    const singleGirlProfile: StudentProfile = {
      ...baseProfile,
      educationLevel: 'Postgraduate',
      course: 'M.A. English Literature',
      gender: 'Female',
      isSingleGirlChild: true,
    };
    const match = evaluateScholarshipMatch(singleGirlScheme, singleGirlProfile);
    expect(match.status).toBe('Potential match');
    expect(match.conflictingCriteria).toHaveLength(0);
  });

  it('validates that every starter scholarship record has valid official source URLs', () => {
    SCHOLARSHIPS_DATA.forEach((s) => {
      expect(s.officialInformationUrl).toMatch(/^https?:\/\//);
      if (s.officialApplicationUrl) {
        expect(s.officialApplicationUrl).toMatch(/^https?:\/\//);
      }
    });
  });

  it('validates that all schemes marked as "Needs verification" have unknown deadline or explicit caveats', () => {
    const unverifiedSchemes = SCHOLARSHIPS_DATA.filter((s) => s.verificationStatus === 'Needs verification');
    expect(unverifiedSchemes.length).toBeGreaterThanOrEqual(2);
    unverifiedSchemes.forEach((s) => {
      expect(s.applicationDeadline).toBeNull();
      expect(s.benefitAmount).toBeNull();
      expect(s.sourceNotes.length).toBeGreaterThan(10);
    });
  });
});
