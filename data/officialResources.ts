export interface OfficialResource {
  id: string;
  title: string;
  category: 'National Portal' | 'Higher Education & Research' | 'Ministry Schemes' | 'State Government Portals';
  organization: string;
  url: string;
  description: string;
  domainVerification: string; // e.g. "official .gov.in domain"
  primaryUse: string;
  trustTips: string[];
}

export const OFFICIAL_RESOURCES: OfficialResource[] = [
  {
    id: 'nsp-home',
    title: 'National Scholarship Portal (NSP)',
    category: 'National Portal',
    organization: 'National Informatics Centre (NIC) & Ministry of Electronics and IT',
    url: 'https://scholarships.gov.in/',
    description: 'The single-window electronic platform for central government, state government, and UGC/AICTE scholarship schemes across India.',
    domainVerification: 'scholarships.gov.in (Official Govt of India portal)',
    primaryUse: 'One-Time Registration (OTR), fresh application submission, renewal tracking, and DBT disbursement verification.',
    trustTips: [
      'Always ensure the URL ends with scholarships.gov.in and shows a secure HTTPS padlock.',
      'NSP never charges any application fee or processing fee.',
      'Never share your OTR credentials, Aadhaar OTP, or login password with cyber cafes or unknown intermediaries.',
    ],
  },
  {
    id: 'nsp-all-scholarships',
    title: 'NSP — All Scholarships Directory',
    category: 'National Portal',
    organization: 'Ministry of Electronics and Information Technology',
    url: 'https://scholarships.gov.in/All-Scholarships',
    description: 'Comprehensive directory listing central schemes, UGC/AICTE schemes, and participating state government schemes with current scheme status and guidelines.',
    domainVerification: 'scholarships.gov.in/All-Scholarships',
    primaryUse: 'Browsing active schemes by Ministry, opening dates, and closing deadlines.',
    trustTips: [
      'Check whether the specific scheme opening date for the current academic session has been announced.',
      'Verify whether your state processes renewals directly on NSP or via their state portal.',
    ],
  },
  {
    id: 'nsp-students-corner',
    title: 'NSP — Student Corner',
    category: 'National Portal',
    organization: 'National Scholarship Portal',
    url: 'https://scholarships.gov.in/Students',
    description: 'Dedicated student portal containing application guidelines, OTR registration guides, eligibility search, and renewal instructions.',
    domainVerification: 'scholarships.gov.in/Students',
    primaryUse: 'Accessing student registration instructions, checking application status, and finding FAQs.',
    trustTips: [
      'Download and read the Student Guidelines PDF before starting your application.',
      'Keep your bonafide student certificate and bank account IFSC verified before uploading.',
    ],
  },
  {
    id: 'ap-jnanabhumi',
    title: 'Andhra Pradesh JnanaBhumi Portal',
    category: 'State Government Portals',
    organization: 'Department of Higher Education & Social Welfare, Govt. of Andhra Pradesh',
    url: 'https://jnanabhumi.ap.gov.in/',
    description: 'Official digital welfare portal of Andhra Pradesh for Post-Matric Scholarships, Jagananna Vidya Deevena (RTF), and Vasathi Deevena (MTF).',
    domainVerification: 'jnanabhumi.ap.gov.in (Official AP Government Portal)',
    primaryUse: 'State domicile scholarship application, college confirmation, and biometric authentication for AP students.',
    trustTips: [
      'Official AP portal url is strictly jnanabhumi.ap.gov.in (beware of fake clone sites ending in .com or .org).',
      'Requires Aadhaar e-KYC and MeeSeva income/caste certification integration.',
    ],
  },
  {
    id: 'ugc-student-corner',
    title: 'UGC Student Corner',
    category: 'Higher Education & Research',
    organization: 'University Grants Commission (UGC)',
    url: 'https://www.ugc.gov.in/Home/student_Corner',
    description: 'Official repository of UGC student fellowships, national scholarships, grievances redressal, and higher education academic guidelines.',
    domainVerification: 'ugc.gov.in (Statutory Body under Ministry of Education)',
    primaryUse: 'Accessing UGC fellowship notifications, JRF/SRF guidelines, and PG scholarship circulars.',
    trustTips: [
      'UGC notices are always published with official letter reference numbers and signed circulars.',
      'Application links for UGC schemes typically redirect to NSP for direct submission.',
    ],
  },
  {
    id: 'ugc-pg-scholarship',
    title: 'UGC National Scholarship for Post Graduate Studies Scheme Notice',
    category: 'Higher Education & Research',
    organization: 'University Grants Commission (UGC)',
    url: 'https://www.ugc.gov.in/Scholarships/stu_Scholarship6',
    description: 'Detailed official scheme document and guidelines for UGC PG studies financial support for students pursuing regular master programmes.',
    domainVerification: 'ugc.gov.in/Scholarships/stu_Scholarship6',
    primaryUse: 'Reading precise eligibility criteria, duration of award, and selection methodology for PG scholarships.',
    trustTips: [
      'Review university accreditation status; colleges must be recognized under UGC Section 2(f) & 12(B).',
    ],
  },
  {
    id: 'social-justice-schemes',
    title: 'Ministry of Social Justice and Empowerment Schemes',
    category: 'Ministry Schemes',
    organization: 'Ministry of Social Justice and Empowerment, Govt. of India',
    url: 'https://socialjustice.gov.in/schemes',
    description: 'Comprehensive welfare schemes list including Centrally Sponsored Post-Matric and Top-Class Education for SC students, OBC, and EBC students.',
    domainVerification: 'socialjustice.gov.in (Official Union Ministry Portal)',
    primaryUse: 'Reading statutory scheme guidelines, income ceilings, component rates, and state funding rules.',
    trustTips: [
      'Government welfare guidelines are updated periodically; check the "Revised Guidelines" section for latest amendments.',
    ],
  },
  {
    id: 'tribal-affairs-scholarships',
    title: 'Ministry of Tribal Affairs — Scholarship Division',
    category: 'Ministry Schemes',
    organization: 'Ministry of Tribal Affairs, Govt. of India',
    url: 'https://tribal.nic.in/Scholarship.aspx',
    description: 'Central portal for Scheduled Tribe (ST) students: Pre-Matric, Post-Matric, National Overseas, and National Fellowship for Ph.D/M.Phil.',
    domainVerification: 'tribal.nic.in (Official Union Ministry Portal on NIC)',
    primaryUse: 'Accessing list of 246 notified premier institutes and doctoral fellowship guidelines for tribal scholars.',
    trustTips: [
      'Check the published list of approved institutions eligible for the full fee reimbursement scheme.',
    ],
  },
  {
    id: 'depwd-scholarships',
    title: 'Department of Empowerment of Persons with Disabilities (DEPwD)',
    category: 'Ministry Schemes',
    organization: 'DEPwD, Ministry of Social Justice & Empowerment',
    url: 'https://depwd.gov.in/en/scholarship/',
    description: 'Dedicated schemes for students with disabilities including Pre-Matric, Post-Matric, Top Class Education, and National Fellowship for PwD.',
    domainVerification: 'depwd.gov.in (Official Departmental Portal)',
    primaryUse: 'Reviewing disability entitlement slabs, reader allowances, and medical certificate requirements.',
    trustTips: [
      'A Unique Disability ID (UDID) or government hospital medical certificate with 40%+ disability is mandatory.',
    ],
  },
  {
    id: 'inspire-portal',
    title: 'DST INSPIRE Portal (Innovation in Science Pursuit for Inspired Research)',
    category: 'Higher Education & Research',
    organization: 'Department of Science and Technology (DST), Ministry of Science and Technology',
    url: 'https://online-inspire.gov.in/',
    description: 'Official portal for INSPIRE Scholarship for Higher Education (SHE) and INSPIRE Fellowship for Ph.D doctoral research in natural and basic sciences.',
    domainVerification: 'online-inspire.gov.in (Official DST Portal)',
    primaryUse: 'Direct application for INSPIRE SHE and Doctoral Fellowship, web-based progress report submission, and financial sanction tracking.',
    trustTips: [
      'INSPIRE does not operate through third-party agents; all submissions occur strictly through online-inspire.gov.in.',
      'Keep your board advisory note (Class 12) or university rank certificate ready.',
    ],
  },
  {
    id: 'pm-usp-faq',
    title: 'PM-USP Central Sector Scholarship Official FAQs & Guidelines',
    category: 'Higher Education & Research',
    organization: 'Department of Higher Education, Ministry of Education, Govt. of India',
    url: 'https://www.education.gov.in/sites/upload_files/mhrd/files/upload_document/FAQs_PM_USP_CSSS_scheme.pdf',
    description: 'Authoritative Ministry FAQ document answering critical questions regarding eligibility percentiles, renewal rules, quota distributions across state boards, and DBT disbursals.',
    domainVerification: 'education.gov.in (Ministry of Education PDF Document)',
    primaryUse: 'Clarifying board quota percentiles, change of course rules, and renewal requirements across undergraduate years.',
    trustTips: [
      'Read FAQ Q.5 regarding board percentile cutoffs; 80% marks does not always equal 80th percentile.',
    ],
  },
];
