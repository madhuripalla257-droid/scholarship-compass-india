import React, { useState } from 'react';
import {
  Compass,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Send,
  HelpCircle,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 3000);
  };

  const faqs = [
    {
      q: 'Is Scholarship Compass India an official government website?',
      a: 'No. Scholarship Compass India is an independent, free discovery and educational guidance tool built to help students discover verified opportunities. We are not affiliated with the National Scholarship Portal (NSP), the University Grants Commission (UGC), or any state/central ministry.',
    },
    {
      q: 'Does Scholarship Compass India charge any fee for using this tool?',
      a: 'Never. Our discovery tool, eligibility matching engine, and official source links are 100% free and open to all students, parents, and educators.',
    },
    {
      q: 'Can Scholarship Compass India guarantee my scholarship acceptance?',
      a: 'No. We provide transparent rules-based matching to identify potential eligibility. Final application approval, verification, merit rank cutoffs, and fund disbursements are determined solely and exclusively by the official scheme authority.',
    },
    {
      q: 'Why do some scholarships have &quot;Needs verification&quot; or null deadlines?',
      a: 'We adhere to strict data-quality standards. If the issuing authority has not gazetted the official notification for the upcoming academic cycle, we leave the deadline as null rather than fabricating dates or making false claims. Students are guided to the official source.',
    },
    {
      q: 'Do you store or sell my academic and income profile?',
      a: 'Never. All filtering and matching occur entirely inside your browser. We do not transmit or store your family income or academic profile on remote servers.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Title */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-semibold mb-3">
          <Compass className="w-4 h-4 text-sky-700" />
          <span>Our Purpose & Standards</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About Scholarship Compass India
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
          Bridging the information divide for students across India with reliable eligibility rules, transparent matching logic, and verified direct links to official government sources.
        </p>
      </div>

      {/* Mission & Transparency Manifesto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900">The Problem We Solve</h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Millions of students in India miss out on legitimate government scholarships and higher education grants each year simply because they do not know a scheme exists, whether it applies to their education stage, or where to find official notifications without falling prey to commercial aggregator traps and scam agencies.
          </p>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            <strong>Scholarship Compass India</strong> was designed with a simple philosophy: give students a transparent, clean, and completely free discovery tool with zero data exploitation, no government impersonation, and direct links to authentic portals like scholarships.gov.in and ugc.gov.in.
          </p>
        </div>

        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-teal-400" />
            Our Editorial Standards
          </h2>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span>
                <strong>No Fabricated Data:</strong> If an official deadline or benefit amount cannot be verified from a published gazette, it is marked as unverified.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span>
                <strong>No Government Emblems:</strong> We strictly avoid crests or deceptive styling that would mislead students into believing this is an official government entity.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span>
                <strong>Zero Sensitive Data:</strong> We will never ask for Aadhaar numbers, OTPs, caste certificates, or banking passwords.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-sky-700" />
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">{faq.q}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact & Feedback Form */}
      <div className="max-w-xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          <Mail className="w-5 h-5 text-sky-700" />
          Contact & Feedback
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Questions, suggestions, or editorial feedback? Send us a message.
        </p>

        {sent ? (
          <div className="p-6 text-center space-y-2 bg-emerald-50 border border-emerald-200 rounded-xl">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <span className="font-bold text-slate-900 text-sm block">Message Received!</span>
            <p className="text-xs text-slate-600">
              Thank you for reaching out. We appreciate your feedback.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Student / Teacher Name"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Your Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Message</label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your suggestions or inquiries..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-sky-700 hover:bg-sky-800 text-white font-semibold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
