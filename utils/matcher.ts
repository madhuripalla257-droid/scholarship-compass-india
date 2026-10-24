import {
  Scholarship,
  StudentProfile,
  MatchEvaluation,
  CriterionCheck,
  MatchStatus,
} from '../types/scholarship';

export function evaluateScholarshipMatch(
  scholarship: Scholarship,
  profile: StudentProfile
): MatchEvaluation {
  const matchedCriteria: CriterionCheck[] = [];
  const unknownCriteria: CriterionCheck[] = [];
  const conflictingCriteria: CriterionCheck[] = [];
  const actionableChecklist: string[] = [];

  // 1. Verification status check
  const isUnverified = scholarship.verificationStatus === 'Needs verification';
  if (isUnverified) {
    unknownCriteria.push({
      label: 'Official Verification',
      status: 'unknown',
      detail: 'This scheme has not been verified for the current cycle. Official notification or deadline is pending.',
    });
    actionableChecklist.push(
      'Check the official source link directly before applying; current year terms may differ.'
    );
  }

  // 2. Education Level Check
  if (!profile.educationLevel) {
    unknownCriteria.push({
      label: 'Education Level',
      status: 'unknown',
      detail: `Scheme is for: ${scholarship.educationLevels.join(', ')}. Your education level was not provided.`,
    });
    actionableChecklist.push(`Confirm that you are pursuing one of: ${scholarship.educationLevels.join(', ')}.`);
  } else if (scholarship.educationLevels.includes(profile.educationLevel)) {
    matchedCriteria.push({
      label: 'Education Level',
      status: 'matched',
      detail: `Your level (${profile.educationLevel}) matches this scheme.`,
    });
  } else {
    conflictingCriteria.push({
      label: 'Education Level',
      status: 'conflicting',
      detail: `This scheme requires: ${scholarship.educationLevels.join(', ')}. You selected: ${profile.educationLevel}.`,
    });
  }

  // 3. Course / Stream Alignment
  if (!profile.course) {
    unknownCriteria.push({
      label: 'Course / Stream',
      status: 'unknown',
      detail: `Eligible courses: ${scholarship.eligibleCourses.join('; ')}. No course selected.`,
    });
  } else {
    const courseLower = profile.course.toLowerCase();
    const isAllCourses = scholarship.eligibleCourses.some(
      (c) =>
        c.toLowerCase().includes('all regular') ||
        c.toLowerCase().includes('all recognized') ||
        c.toLowerCase().includes('recognized post-matric') ||
        c.toLowerCase().includes('all streams') ||
        c.toLowerCase().includes('all disciplines') ||
        c.toLowerCase().includes('all post-graduate')
    );

    if (isAllCourses) {
      matchedCriteria.push({
        label: 'Course / Stream',
        status: 'matched',
        detail: `All recognized/regular courses are eligible, including ${profile.course}.`,
      });
    } else if (
      (scholarship.id.includes('inspire') || scholarship.id.includes('csir')) &&
      (courseLower.includes('arts') ||
        courseLower.includes('commerce') ||
        courseLower.includes('political science') ||
        courseLower.includes('social science') ||
        courseLower.includes('humanities') ||
        courseLower.includes('b.a'))
    ) {
      conflictingCriteria.push({
        label: 'Course / Stream',
        status: 'conflicting',
        detail: `This scheme is exclusively for Natural & Basic / Applied Sciences. You selected: ${profile.course}.`,
      });
    } else {
      const mentionsStream = scholarship.eligibleCourses.some((c) => {
        const cl = c.toLowerCase();
        if (
          (courseLower.includes('science') || courseLower.includes('physics') || courseLower.includes('chemistry') || courseLower.includes('math') || courseLower.includes('biology')) &&
          (cl.includes('science') || cl.includes('b.sc') || cl.includes('m.sc'))
        ) return true;
        if (
          (courseLower.includes('engineering') || courseLower.includes('tech') || courseLower.includes('b.e') || courseLower.includes('computer')) &&
          (cl.includes('engineering') || cl.includes('tech') || cl.includes('b.e') || cl.includes('degree') || cl.includes('polytechnic'))
        ) return true;
        if (
          (courseLower.includes('arts') || courseLower.includes('humanities') || courseLower.includes('history') || courseLower.includes('literature')) &&
          (cl.includes('arts') || cl.includes('humanities') || cl.includes('b.a') || cl.includes('m.a') || cl.includes('degree'))
        ) return true;
        if (
          (courseLower.includes('commerce') || courseLower.includes('business') || courseLower.includes('accounting') || courseLower.includes('management')) &&
          (cl.includes('commerce') || cl.includes('b.com') || cl.includes('m.com') || cl.includes('mca') || cl.includes('mba') || cl.includes('degree'))
        ) return true;
        if (
          (courseLower.includes('medical') || courseLower.includes('medicine') || courseLower.includes('pharmacy') || courseLower.includes('nursing')) &&
          (cl.includes('medicine') || cl.includes('medical') || cl.includes('mbbs') || cl.includes('pharmacy') || cl.includes('degree'))
        ) return true;
        if (courseLower.includes('diploma') && (cl.includes('diploma') || cl.includes('polytechnic'))) return true;
        return cl.includes(courseLower) || courseLower.includes(cl);
      });

      if (mentionsStream) {
        matchedCriteria.push({
          label: 'Course / Stream',
          status: 'matched',
          detail: `Your course (${profile.course}) is aligned with scheme guidelines.`,
        });
      } else {
        // Special case: check if scheme is STEM / technical and user is humanities
        if (
          (scholarship.id.includes('inspire') || scholarship.id.includes('csir')) &&
          (courseLower.includes('arts') || courseLower.includes('commerce'))
        ) {
          conflictingCriteria.push({
            label: 'Course / Stream',
            status: 'conflicting',
            detail: `This scheme is exclusively for Basic/Applied Sciences. You selected: ${profile.course}.`,
          });
        } else if (scholarship.id.includes('pragati') && !courseLower.includes('tech') && !courseLower.includes('engineering') && !courseLower.includes('diploma')) {
          conflictingCriteria.push({
            label: 'Course / Stream',
            status: 'conflicting',
            detail: `AICTE Pragati requires AICTE-approved Technical Degree/Diploma courses.`,
          });
        } else {
          unknownCriteria.push({
            label: 'Course Specifics',
            status: 'unknown',
            detail: `Verify your specific course (${profile.course}) against eligible courses: ${scholarship.eligibleCourses.join(', ')}.`,
          });
          actionableChecklist.push(`Verify if ${profile.course} is an eligible degree under this scheme.`);
        }
      }
    }
  }

  // 4. Year of Study
  if (!profile.yearOfStudy) {
    unknownCriteria.push({
      label: 'Year of Study',
      status: 'unknown',
      detail: `Scheme applies to: ${scholarship.yearOfStudy.join(', ')}. Year was not specified.`,
    });
  } else if (
    scholarship.yearOfStudy.includes(profile.yearOfStudy) ||
    scholarship.yearOfStudy.includes('Any Year')
  ) {
    matchedCriteria.push({
      label: 'Year of Study',
      status: 'matched',
      detail: `Your year of study (${profile.yearOfStudy}) qualifies.`,
    });
  } else {
    // If it's a renewal, subsequent years might be accepted
    if (profile.applicationType === 'Renewal' && scholarship.freshOrRenewal !== 'Fresh') {
      matchedCriteria.push({
        label: 'Year of Study (Renewal)',
        status: 'matched',
        detail: `Subsequent years are eligible under Renewal mode.`,
      });
    } else {
      conflictingCriteria.push({
        label: 'Year of Study',
        status: 'conflicting',
        detail: `Requires: ${scholarship.yearOfStudy.join(', ')}. You are in: ${profile.yearOfStudy}.`,
      });
    }
  }

  // 5. State / Domicile
  const isAllIndia = scholarship.eligibleStates.includes('All India');
  if (isAllIndia) {
    matchedCriteria.push({
      label: 'State / Domicile',
      status: 'matched',
      detail: 'Pan-India scheme open to students residing in any State or Union Territory.',
    });
  } else {
    if (!profile.state) {
      unknownCriteria.push({
        label: 'State / Domicile',
        status: 'unknown',
        detail: `Scheme is limited to: ${scholarship.eligibleStates.join(', ')}. You did not select a state.`,
      });
      actionableChecklist.push(`Confirm you hold permanent domicile in ${scholarship.eligibleStates.join(', ')}.`);
    } else if (scholarship.eligibleStates.includes(profile.state)) {
      if (scholarship.domicileRequirements) {
        if (profile.isStateResident === true) {
          matchedCriteria.push({
            label: 'State / Domicile',
            status: 'matched',
            detail: `Resident of ${profile.state} with domicile status confirmed.`,
          });
        } else if (profile.isStateResident === false) {
          conflictingCriteria.push({
            label: 'Domicile Requirement',
            status: 'conflicting',
            detail: `Scheme strictly requires permanent domicile/residence in ${scholarship.eligibleStates.join(', ')}.`,
          });
        } else {
          unknownCriteria.push({
            label: 'Domicile Certificate',
            status: 'unknown',
            detail: `Requires permanent domicile in ${profile.state}. Have your domicile/residence certificate ready.`,
          });
          actionableChecklist.push(`Obtain a valid Domicile Certificate from MeeSeva / Revenue Authority.`);
        }
      } else {
        matchedCriteria.push({
          label: 'State Eligibility',
          status: 'matched',
          detail: `Your state (${profile.state}) is eligible for this scheme.`,
        });
      }
    } else {
      conflictingCriteria.push({
        label: 'State Eligibility',
        status: 'conflicting',
        detail: `Scheme is restricted to: ${scholarship.eligibleStates.join(', ')}. You selected: ${profile.state}.`,
      });
    }
  }

  // 6. Income Ceiling Check
  const maxIncome = scholarship.incomeCriteria.maxAnnualFamilyIncome;
  if (maxIncome === null) {
    if (isUnverified) {
      unknownCriteria.push({
        label: 'Income Limit',
        status: 'unknown',
        detail: 'Income limit has not been officially updated for this cycle.',
      });
    } else {
      matchedCriteria.push({
        label: 'Family Income',
        status: 'matched',
        detail: scholarship.incomeCriteria.description || 'No income ceiling specified.',
      });
    }
  } else {
    if (!profile.incomeBand || profile.incomeBand === 'Prefer not to say') {
      unknownCriteria.push({
        label: 'Family Income Band',
        status: 'unknown',
        detail: `Scheme ceiling is ₹${maxIncome.toLocaleString('en-IN')}/year. You selected "Prefer not to say" or left it blank.`,
      });
      actionableChecklist.push(
        `Ensure gross family income is under ₹${maxIncome.toLocaleString('en-IN')}/year and obtain a verified Income Certificate.`
      );
    } else {
      let studentMaxEstimate = 99999999;
      if (profile.incomeBand === '<= 2.5 Lakh') studentMaxEstimate = 250000;
      else if (profile.incomeBand === '<= 4.5 Lakh') studentMaxEstimate = 450000;
      else if (profile.incomeBand === '<= 8 Lakh') studentMaxEstimate = 800000;
      else if (profile.incomeBand === '> 8 Lakh') studentMaxEstimate = 1200000;

      if (studentMaxEstimate <= maxIncome) {
        matchedCriteria.push({
          label: 'Family Income',
          status: 'matched',
          detail: `Your reported income band (${profile.incomeBand}) satisfies the ₹${maxIncome.toLocaleString('en-IN')} ceiling.`,
        });
      } else {
        conflictingCriteria.push({
          label: 'Family Income',
          status: 'conflicting',
          detail: `Income ceiling is ₹${maxIncome.toLocaleString('en-IN')}/year. Your selected band is ${profile.incomeBand}.`,
        });
      }
    }
  }

  // 7. Social Category / Community
  const eligibleCats = scholarship.categoryCriteria.eligibleCategories;
  if (eligibleCats.includes('All')) {
    matchedCriteria.push({
      label: 'Category / Reservation',
      status: 'matched',
      detail: 'Open to all categories (General, OBC, SC, ST, EWS).',
    });
  } else {
    if (!profile.category || profile.category === 'Prefer not to say') {
      unknownCriteria.push({
        label: 'Category / Community',
        status: 'unknown',
        detail: `This scheme is exclusively for: ${eligibleCats.join(', ')}. Category was not disclosed.`,
      });
      actionableChecklist.push(`Verify you possess a valid certificate for one of: ${eligibleCats.join(', ')}.`);
    } else if (eligibleCats.includes(profile.category)) {
      matchedCriteria.push({
        label: 'Category / Community',
        status: 'matched',
        detail: `Your category (${profile.category}) matches this targeted scheme.`,
      });
    } else {
      conflictingCriteria.push({
        label: 'Category / Community',
        status: 'conflicting',
        detail: `This scheme is exclusively for ${eligibleCats.join(', ')}. You selected ${profile.category}.`,
      });
    }
  }

  // 8. Academic Percentage / Cutoff
  const minPerc = scholarship.academicCriteria.minPercentage;
  if (minPerc === null) {
    if (isUnverified) {
      unknownCriteria.push({
        label: 'Academic Cutoff',
        status: 'unknown',
        detail: 'Academic cutoff criteria awaiting official publication.',
      });
    } else {
      matchedCriteria.push({
        label: 'Academic Requirement',
        status: 'matched',
        detail: scholarship.academicCriteria.description,
      });
    }
  } else {
    if (profile.percentage === null || profile.percentage === undefined) {
      unknownCriteria.push({
        label: 'Academic Percentage',
        status: 'unknown',
        detail: `Requires minimum ${minPerc}% (or top board percentile). Your percentage was not provided.`,
      });
      actionableChecklist.push(`Check if your qualifying percentage is at or above ${minPerc}%.`);
    } else if (profile.percentage >= minPerc) {
      matchedCriteria.push({
        label: 'Academic Percentage',
        status: 'matched',
        detail: `Your score (${profile.percentage}%) meets or exceeds the ${minPerc}% cutoff.`,
      });
    } else {
      conflictingCriteria.push({
        label: 'Academic Percentage',
        status: 'conflicting',
        detail: `Requires minimum ${minPerc}%. You entered ${profile.percentage}%.`,
      });
    }
  }

  // 9. Fresh vs Renewal Mode
  if (!profile.applicationType || profile.applicationType === 'Not sure') {
    if (scholarship.freshOrRenewal === 'Both') {
      matchedCriteria.push({
        label: 'Fresh / Renewal Mode',
        status: 'matched',
        detail: 'Accepts both Fresh and Renewal applicants.',
      });
    } else {
      unknownCriteria.push({
        label: 'Fresh / Renewal Mode',
        status: 'unknown',
        detail: `Scheme is exclusively for ${scholarship.freshOrRenewal} applicants. Your status is not specified.`,
      });
      actionableChecklist.push(`Confirm whether your application is a ${scholarship.freshOrRenewal} submission.`);
    }
  } else {
    if (scholarship.freshOrRenewal === 'Both') {
      matchedCriteria.push({
        label: 'Fresh / Renewal Mode',
        status: 'matched',
        detail: `Accepts both Fresh and Renewal applications (You selected: ${profile.applicationType}).`,
      });
    } else if (scholarship.freshOrRenewal === profile.applicationType) {
      matchedCriteria.push({
        label: 'Fresh / Renewal Mode',
        status: 'matched',
        detail: `Matches your application mode (${profile.applicationType}).`,
      });
    } else {
      conflictingCriteria.push({
        label: 'Fresh / Renewal Mode',
        status: 'conflicting',
        detail: `This scheme is strictly for ${scholarship.freshOrRenewal} applicants. You selected ${profile.applicationType}.`,
      });
    }
  }

  // 10. Gender Criteria
  if (scholarship.genderCriteria && scholarship.genderCriteria !== 'All') {
    if (scholarship.genderCriteria === 'Female only') {
      if (profile.gender === 'Female') {
        matchedCriteria.push({
          label: 'Gender Eligibility',
          status: 'matched',
          detail: 'Matches female applicant requirement.',
        });
      } else if (profile.gender === 'Male') {
        conflictingCriteria.push({
          label: 'Gender Eligibility',
          status: 'conflicting',
          detail: 'This scheme is exclusively for female students.',
        });
      } else {
        unknownCriteria.push({
          label: 'Gender Eligibility',
          status: 'unknown',
          detail: 'Exclusively for female students; gender was not specified.',
        });
      }
    }
  }

  // 11. Disability Criteria
  if (scholarship.disabilityCriteria?.required) {
    if (profile.hasDisability === true) {
      matchedCriteria.push({
        label: 'Disability Eligibility',
        status: 'matched',
        detail: `Applicant has indicated a disability. Certified min 40% benchmark disability required.`,
      });
      actionableChecklist.push('Keep your UDID / Medical Disability Certificate (40%+ disability) ready.');
    } else if (profile.hasDisability === false) {
      conflictingCriteria.push({
        label: 'Disability Eligibility',
        status: 'conflicting',
        detail: 'Exclusively for students with certified benchmark disabilities (40%+).',
      });
    } else {
      unknownCriteria.push({
        label: 'Disability Eligibility',
        status: 'unknown',
        detail: 'Requires minimum 40% certified benchmark disability. Not specified.',
      });
    }
  }

  // 12. Single Girl Child Criteria (e.g., UGC IG)
  if (scholarship.id.includes('single-girl-child')) {
    if (profile.isSingleGirlChild === true) {
      matchedCriteria.push({
        label: 'Single Girl Child Status',
        status: 'matched',
        detail: 'Applicant is the only child of parents.',
      });
      actionableChecklist.push('Prepare an SDM-attested Single Girl Child affidavit on ₹50 stamp paper.');
    } else if (profile.isSingleGirlChild === false) {
      conflictingCriteria.push({
        label: 'Single Girl Child Status',
        status: 'conflicting',
        detail: 'Exclusively for single girl children who have no other siblings.',
      });
    } else {
      unknownCriteria.push({
        label: 'Single Girl Child Status',
        status: 'unknown',
        detail: 'Requires parent affidavit proving single girl child status.',
      });
    }
  }

  // Calculate final status and score
  let status: MatchStatus;
  let reasonSummary: string;

  if (isUnverified) {
    status = 'Needs verification';
    reasonSummary = 'Official terms, deadline, or cutoff for the current academic session have not been formally gazetted. Check the official source directly.';
  } else if (conflictingCriteria.length > 0) {
    status = 'May not match';
    const firstConflict = conflictingCriteria[0];
    reasonSummary = `At least one condition conflicts: ${firstConflict.detail}`;
  } else if (unknownCriteria.length > 0) {
    status = 'Check one more requirement';
    const unknownCount = unknownCriteria.length;
    reasonSummary = `Key qualifications appear aligned, but ${unknownCount} condition${unknownCount > 1 ? 's need' : ' needs'} verification against your documents.`;
  } else {
    status = 'Potential match';
    reasonSummary = 'Based on the details provided, your profile appears to satisfy all recorded eligibility requirements.';
  }

  // Score for sorting: Potential matches highest (90-100), Check one more (60-80), Needs verification (40), May not match (10)
  let score = 0;
  if (status === 'Potential match') {
    score = 90 + Math.min(10, matchedCriteria.length);
  } else if (status === 'Check one more requirement') {
    score = 60 + Math.max(0, 20 - unknownCriteria.length * 3);
  } else if (status === 'Needs verification') {
    score = 40;
  } else {
    score = 10;
  }

  return {
    scholarship,
    status,
    score,
    matchedCriteria,
    unknownCriteria,
    conflictingCriteria,
    actionableChecklist,
    reasonSummary,
  };
}

export function filterScholarships(
  scholarships: Scholarship[],
  profile: StudentProfile
): MatchEvaluation[] {
  return scholarships
    .map((s) => evaluateScholarshipMatch(s, profile))
    .sort((a, b) => b.score - a.score);
}
