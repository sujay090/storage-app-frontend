import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] font-sans text-slate-800">
      <div className="max-w-[900px] mx-auto px-6 max-[480px]:px-4">
        <div className="py-6 border-b border-[#e2e8f0] bg-white sticky top-0 z-[100] -mx-6 px-6 max-[480px]:-mx-4 max-[480px]:px-4">
          <Link to="/" className="inline-flex items-center gap-3 no-underline text-[1.25rem] font-bold text-[#1e293b] transition-opacity duration-200 hover:opacity-80">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_2px_4px_rgba(99,102,241,0.3)]">
              <defs>
                <linearGradient
                  id="logoGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <path
                d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
                fill="url(#logoGrad)"
              />
            </svg>
            <span>MaxHub Cloud</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-[48px] my-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] max-md:p-8 max-[480px]:p-5 max-[480px]:rounded-xl">
          <h1 className="text-[2.25rem] font-extrabold text-[#0f172a] mb-2 tracking-[-0.02em] max-md:text-[1.75rem] max-[480px]:text-[1.5rem]">Terms of Service</h1>
          <p className="text-[#64748b] text-[0.9rem] mb-10 pb-6 border-b-2 border-[#f1f5f9]">Last updated: January 19, 2026</p>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">1. Acceptance of Terms</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">
              By accessing and using MaxHub Cloud services (the
              &ldquo;Service&rdquo;), you accept and agree to be bound by the
              terms and provision of this agreement. If you do not agree to
              abide by the above, please do not use this service.
            </p>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">2. Description of Service</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">
              MaxHub Cloud provides cloud storage services that allow users to
              store, manage, and share files securely. Our services include:
            </p>
            <ul className="text-[#475569] leading-[1.8] text-[0.95rem] ml-6 mb-4 list-disc max-[480px]:ml-4">
              <li className="mb-2">Secure file storage and backup</li>
              <li className="mb-2">File sharing and collaboration tools</li>
              <li className="mb-2">Cross-device synchronization</li>
              <li className="mb-2">File organization and management</li>
            </ul>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">3. User Accounts</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">
              To use our Service, you must create an account. You are
              responsible for:
            </p>
            <ul className="text-[#475569] leading-[1.8] text-[0.95rem] ml-6 mb-4 list-disc max-[480px]:ml-4">
              <li className="mb-2">
                Maintaining the confidentiality of your account credentials
              </li>
              <li className="mb-2">All activities that occur under your account</li>
              <li className="mb-2">Notifying us immediately of any unauthorized use</li>
              <li className="mb-2">Providing accurate and complete registration information</li>
            </ul>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">4. Acceptable Use Policy</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">You agree not to use the Service to:</p>
            <ul className="text-[#475569] leading-[1.8] text-[0.95rem] ml-6 mb-4 list-disc max-[480px]:ml-4">
              <li className="mb-2">Upload, store, or share illegal content</li>
              <li className="mb-2">Violate any intellectual property rights</li>
              <li className="mb-2">Distribute malware or harmful software</li>
              <li className="mb-2">Attempt to gain unauthorized access to our systems</li>
              <li className="mb-2">Harass, abuse, or harm others</li>
              <li className="mb-2">Share content that promotes violence or discrimination</li>
            </ul>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">5. Storage Limits and Quotas</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">
              Your storage capacity depends on your subscription plan. Free
              accounts receive 500MB of storage. Paid plans offer increased
              storage as described in our pricing page. We reserve the right to
              modify storage limits with prior notice.
            </p>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">6. Payment Terms</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">For paid subscriptions:</p>
            <ul className="text-[#475569] leading-[1.8] text-[0.95rem] ml-6 mb-4 list-disc max-[480px]:ml-4">
              <li className="mb-2">All payments are processed securely through Razorpay</li>
              <li className="mb-2">Subscriptions are billed on a recurring basis</li>
              <li className="mb-2">Prices are in Indian Rupees (INR) unless otherwise stated</li>
              <li className="mb-2">You may cancel your subscription at any time</li>
              <li className="mb-2">Refunds are subject to our Refund Policy</li>
            </ul>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">7. Data Privacy and Security</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">
              We take your privacy seriously. Your data is encrypted both in
              transit and at rest. We will never sell your personal information
              to third parties. For more details, please review our{" "}
              <Link to="/privacy" className="text-[#6366f1] font-medium transition-colors hover:text-[#4f46e5] hover:underline">Privacy Policy</Link>.
            </p>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">8. Intellectual Property</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">
              You retain all rights to the content you upload. By using our
              Service, you grant us a limited license to store and process your
              files solely for the purpose of providing the Service.
            </p>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">9. Service Availability</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">
              We strive for 99.9% uptime but do not guarantee uninterrupted
              access. We may perform maintenance with prior notice when
              possible. We are not liable for any downtime or service
              interruptions.
            </p>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">10. Termination</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">
              We reserve the right to suspend or terminate your account if you
              violate these terms. Upon termination, you will have 30 days to
              download your data before it is permanently deleted.
            </p>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">11. Limitation of Liability</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">
              MaxHub Technologies Pvt. Ltd. shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages
              resulting from your use of the Service. Our total liability shall
              not exceed the amount paid by you in the 12 months preceding the
              claim.
            </p>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">12. Changes to Terms</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">
              We may update these terms from time to time. We will notify you of
              significant changes via email or through the Service. Continued
              use after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">13. Governing Law</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">
              These terms shall be governed by the laws of India. Any disputes
              shall be subject to the exclusive jurisdiction of the courts in
              Bangalore, Karnataka.
            </p>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">14. Contact Information</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">
              For questions about these Terms of Service, please contact us at:
            </p>
            <div className="bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] rounded-xl p-[20px_24px] mt-4 border-l-4 border-[#6366f1]">
              <p className="mb-1 text-[#0f172a]">
                <strong className="text-[#1e293b]">MaxHub Technologies Pvt. Ltd.</strong>
              </p>
              <p className="mb-1 text-[#334155]">Email: legal@maxhub.center</p>
              <p className="mb-1 text-[#334155]">Support: support@maxhub.center</p>
            </div>
          </section>
        </div>

        <div className="flex justify-between items-center py-6 pb-12 border-t border-[#e2e8f0] mt-0 max-md:flex-col max-md:gap-6 max-md:text-center">
          <Link to="/login" className="inline-flex items-center gap-2 py-3 px-6 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white no-underline rounded-xl font-semibold text-[0.9rem] transition-all duration-300 shadow-[0_4px_15px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(99,102,241,0.4)]">
            ← Back to Login
          </Link>
          <div className="flex gap-6 max-md:flex-wrap max-md:justify-center max-md:gap-4">
            <Link to="/privacy" className="text-[#64748b] no-underline text-[0.9rem] font-medium transition-colors hover:text-[#6366f1]">Privacy Policy</Link>
            <Link to="/refund" className="text-[#64748b] no-underline text-[0.9rem] font-medium transition-colors hover:text-[#6366f1]">Refund Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
