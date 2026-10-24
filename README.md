# Scholarship Compass India 🧭

> **A polished, transparent, and student-first scholarship discovery website for Indian education.**

**Scholarship Compass India** helps intermediate (Class 11–12), undergraduate, diploma, postgraduate, and doctoral research students discover verified educational benefits, understand real eligibility rules, and navigate directly to official government and university portals (.gov.in / .nic.in).

---

## 📌 Important Trust & Non-Government Notice

- **Independent Platform**: Scholarship Compass India is **NOT** a government website and is not affiliated with any central ministry, state welfare department, or university.
- **No Guarantee**: This is a discovery and guidance tool. It does **not** guarantee eligibility, application acceptance, scholarship approval, or fund disbursement.
- **Authoritative Issuers**: Final decisions are made exclusively by official scholarship providers (such as the National Scholarship Portal, state welfare departments, UGC, CSIR, and DST).
- **Zero Sensitive Data**: We **never** ask for Aadhaar numbers, OTPs, passwords, bank account details, caste certificate numbers, or uploaded identity documents. All filtering occurs 100% inside your browser.

---

## 🚀 Key Features

1. **Transparent Rules-Based Matching Engine**:
   - Compares student profiles against published criteria across education stage, course stream, study year, domicile state, income band, category, academic marks, and application type.
   - Every result is categorized into one of four explicit labels:
     - 🟢 **Potential match** — Available profile details meet recorded criteria.
     - 🟡 **Check one more requirement** — Specific conditions are unknown or pending student verification.
     - ⚪ **May not match** — At least one explicit published condition conflicts with the profile.
     - 🔵 **Needs verification** — Official notification, cutoff, or deadline has not yet been formally gazetted.
   - For every card, an expandable breakdown explains *why* the scheme appeared, which criteria match, which are unknown, and which conflict. Missing information is never treated as a match.

2. **Multi-Step Scholarship Finder**:
   - 5-step non-intrusive wizard explaining *why* each question is asked.
   - Easy navigation to go back, edit responses, or reset.
   - Dynamic tabbed filtering across match categories.

3. **Browse All Scholarships Directory**:
   - Full search by scheme title, sponsoring body, stream, or state.
   - Filter by Education Level, Provider Type, Fresh/Renewal, and Verification Status.
   - Dedicated toggle for **Research & Fellowships** (clearly separated from general scholarships).
   - Safe sorting: only sorts by application deadline when the deadline is officially verified.

4. **Dedicated Education-Level Pages**:
   - Intermediate / Class 11–12
   - Undergraduate & Diploma
   - Postgraduate Degrees
   - Doctoral & Research Fellowships (CSIR-UGC NET JRF, DST INSPIRE Ph.D)

5. **Official Resources Directory**:
   - Curated directory of 11 authentic portals with official `.gov.in` and `.nic.in` domains.
   - Practical safety tips to identify genuine portals and avoid phishing and scam middlemen.

6. **Scholarship Details & Copy Checklist**:
   - Comprehensive detail view with required documents, application stages, and provider authority notices.
   - **One-click "Copy Checklist"** feature to copy document requirements directly to the clipboard.
   - **"Report Outdated or Incorrect Information"** form that collects corrections without requesting sensitive data.

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: [Vitest](https://vitest.dev/)
- **Data Architecture**: Structured TypeScript records with strict verification metadata and source audit notes.

---

## 💻 Local Setup & Development Instructions

### Prerequisites
- Node.js (v18.0.0 or higher recommended; tested on v24)
- npm (v9.0.0 or higher; tested on v11)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 3. Run the Test Suite
```bash
npm test
```
Runs 19 automated unit tests verifying matching logic, conflicting criteria handling, domicile requirements, and unverified date formatting.

### 4. Build for Production
```bash
npm run build
```
Creates an optimized production bundle inside the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 📋 Starter Dataset Quality & Verification Audit

Scholarship records are structured with audit timestamps and official source notices:

| Scheme Name | Provider / Ministry | Target Education | Verification Status | Notes |
|---|---|---|---|---|
| **PM-USP CSSS** | Dept. of Higher Education, MoE | Undergraduate, PG | **Verified** | Verified against official Ministry FAQ circular & NSP. |
| **National Means-cum-Merit (NMMSS)** | Dept. of School Education, MoE | Class 11–12 | **Verified** | Verified on NSP School Education division. |
| **Post-Matric for PwD** | DEPwD, MoSJE | 11-12, UG, Diploma, PG | **Verified** | Verified via DEPwD operational guidelines. |
| **UGC PG Studies Scholarship** | University Grants Commission | Postgraduate | **Verified** | Verified via UGC circular (stu_Scholarship6). |
| **UGC Single Girl Child PG** | University Grants Commission | Postgraduate | **Verified** | Verified via UGC Student Corner. |
| **DST INSPIRE (SHE)** | Dept. of Science & Technology | UG, PG (Natural Sciences) | **Verified** | Verified on online-inspire.gov.in. |
| **DST INSPIRE Ph.D Fellowship** | Dept. of Science & Technology | Doctoral / Research | **Verified** | High-level research fellowship; verified. |
| **CSIR-UGC NET JRF** | CSIR & UGC | Doctoral / Research | **Verified** | Verified against CSIR-NET & NTA guidelines. |
| **AP JnanaBhumi JVD (RTF)** | Govt. of Andhra Pradesh | UG, Diploma, PG | **Verified** | Verified via jnanabhumi.ap.gov.in. |
| **AICTE Pragati for Girls** | AICTE, Ministry of Education | UG & Diploma (Tech) | **Verified** | Verified via NSP AICTE division. |
| **Post-Matric for SC Students** | MoSJE, Govt. of India | 11-12, UG, PG, Research | **Verified** | Verified via socialjustice.gov.in. |
| **ST Higher Education & Fellowship** | Ministry of Tribal Affairs | UG, PG, Research | **Verified** | Verified via tribal.nic.in. |
| **State Minority Post-Matric Scheme** | State Directorate | 11-12, UG, PG | **Needs verification** | Official notification for upcoming cycle pending gazette. Deadline left null. |
| **Corporate CSR STEM Grant** | Tech Foundation CSR | UG, Diploma | **Needs verification** | CSR cycle guidelines under annual review. Deadline and benefit amount left null. |

---

## 🔒 Safety, Privacy & Scam Prevention

- **Never Pay Fees**: Government scholarships never charge application or processing fees.
- **Do Not Share OTPs**: Never hand over your Aadhaar OTP or NSP login credentials to cyber cafes or third-party middlemen.
- **Direct Benefit Transfer (DBT)**: All central scholarship disbursements are routed directly to your Aadhaar-seeded bank account through the PFMS / NPCI bridge.

---

## 📄 License & Attribution

Free educational and discovery tool for Indian students. Scheme names and official portal links are properties of their respective statutory bodies and government departments.
