import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
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
          <h1 className="text-[2.25rem] font-extrabold text-[#0f172a] mb-2 tracking-[-0.02em] max-md:text-[1.75rem] max-[480px]:text-[1.5rem]">Privacy Policy</h1>
          <p className="text-[#64748b] text-[0.9rem] mb-10 pb-6 border-b-2 border-[#f1f5f9]">Last updated: January 19, 2026</p>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">1. Introduction</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">
              MaxHub Technologies Pvt. Ltd. (&ldquo;we,&rdquo;
              &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting
              your privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use our cloud
              storage service.
            </p>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">2. Information We Collect</h2>
            <h3 className="text-[1.05rem] font-semibold text-[#334155] m-[20px_0_12px]">Personal Information</h3>
            <ul className="text-[#475569] leading-[1.8] text-[0.95rem] ml-6 mb-4 list-disc max-[480px]:ml-4">
              <li className="mb-2">Name and email address</li>
              <li className="mb-2">Account credentials (securely hashed)</li>
              <li className="mb-2">Payment information (processed by Razorpay)</li>
              <li className="mb-2">Profile information you choose to provide</li>
            </ul>
            <h3 className="text-[1.05rem] font-semibold text-[#334155] m-[20px_0_12px]">Usage Information</h3>
            <ul className="text-[#475569] leading-[1.8] text-[0.95rem] ml-6 mb-4 list-disc max-[480px]:ml-4">
              <li className="mb-2">Device information and browser type</li>
              <li className="mb-2">IP address and location data</li>
              <li className="mb-2">Usage patterns and feature interactions</li>
              <li className="mb-2">Log data and error reports</li>
            </ul>
            <h3 className="text-[1.05rem] font-semibold text-[#334155] m-[20px_0_12px]">File Information</h3>
            <ul className="text-[#475569] leading-[1.8] text-[0.95rem] ml-6 mb-4 list-disc max-[480px]:ml-4">
              <li className="mb-2">File metadata (name, size, type)</li>
              <li className="mb-2">Upload and download timestamps</li>
              <li className="mb-2">Folder structure and organization</li>
            </ul>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">3. How We Use Your Information</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">We use the collected information to:</p>
            <ul className="text-[#475569] leading-[1.8] text-[0.95rem] ml-6 mb-4 list-disc max-[480px]:ml-4">
              <li className="mb-2">Provide and maintain our cloud storage services</li>
              <li className="mb-2">Process transactions and send billing information</li>
              <li className="mb-2">Send important service updates and notifications</li>
              <li className="mb-2">Respond to customer support requests</li>
              <li className="mb-2">Analyze usage to improve our services</li>
              <li className="mb-2">Detect and prevent fraud or abuse</li>
              <li className="mb-2">Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">4. Data Security</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">
              We implement industry-standard security measures to protect your
              data:
            </p>
            <ul className="text-[#475569] leading-[1.8] text-[0.95rem] ml-6 mb-4 list-disc max-[480px]:ml-4">
              <li className="mb-2">
                <strong className="text-[#1e293b]">Encryption in Transit:</strong> All data is transmitted
                using TLS 1.3 encryption
              </li>
              <li className="mb-2">
                <strong className="text-[#1e293b]">Encryption at Rest:</strong> Files are encrypted using
                AES-256 encryption
              </li>
              <li className="mb-2">
                <strong className="text-[#1e293b]">Access Controls:</strong> Strict authentication and
                authorization protocols
              </li>
              <li className="mb-2">
                <strong className="text-[#1e293b]">Regular Audits:</strong> Security assessments and
                vulnerability testing
              </li>
              <li className="mb-2">
                <strong className="text-[#1e293b]">Secure Infrastructure:</strong> Data stored in certified
                data centers
              </li>
            </ul>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">5. Data Sharing and Disclosure</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">
              We do not sell your personal information. We may share data only
              in these circumstances:
            </p>
            <ul className="text-[#475569] leading-[1.8] text-[0.95rem] ml-6 mb-4 list-disc max-[480px]:ml-4">
              <li className="mb-2">
                <strong className="text-[#1e293b]">Service Providers:</strong> With trusted partners who
                assist in operating our service (e.g., Razorpay for payments)
              </li>
              <li className="mb-2">
                <strong className="text-[#1e293b]">Legal Requirements:</strong> When required by law or to
                protect our rights
              </li>
              <li className="mb-2">
                <strong className="text-[#1e293b]">Business Transfers:</strong> In connection with mergers
                or acquisitions
              </li>
              <li className="mb-2">
                <strong className="text-[#1e293b]">With Your Consent:</strong> When you explicitly
                authorize sharing
              </li>
            </ul>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">6. Your Rights</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">You have the right to:</p>
            <ul className="text-[#475569] leading-[1.8] text-[0.95rem] ml-6 mb-4 list-disc max-[480px]:ml-4">
              <li className="mb-2">
                <strong className="text-[#1e293b]">Access:</strong> Request a copy of your personal data
              </li>
              <li className="mb-2">
                <strong className="text-[#1e293b]">Rectification:</strong> Correct inaccurate information
              </li>
              <li className="mb-2">
                <strong className="text-[#1e293b]">Deletion:</strong> Request deletion of your data
                (subject to legal requirements)
              </li>
              <li className="mb-2">
                <strong className="text-[#1e293b]">Data Portability:</strong> Export your data in a
                standard format
              </li>
              <li className="mb-2">
                <strong className="text-[#1e293b]">Withdraw Consent:</strong> Opt-out of marketing
                communications
              </li>
              <li className="mb-2">
                <strong className="text-[#1e293b]">Complaint:</strong> Lodge a complaint with a supervisory
                authority
              </li>
            </ul>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">7. Data Retention</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">
              We retain your personal information for as long as your account is
              active. After account deletion, we keep data for 30 days before
              permanent deletion. Some data may be retained longer for legal,
              tax, or audit purposes.
            </p>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">8. Cookies and Tracking</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">We use essential cookies for:</p>
            <ul className="text-[#475569] leading-[1.8] text-[0.95rem] ml-6 mb-4 list-disc max-[480px]:ml-4">
              <li className="mb-2">Authentication and session management</li>
              <li className="mb-2">Security and fraud prevention</li>
              <li className="mb-2">Remembering your preferences</li>
            </ul>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">
              We do not use third-party advertising cookies. You can manage
              cookie preferences in your browser settings.
            </p>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">9. Third-Party Services</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">We use the following third-party services:</p>
            <ul className="text-[#475569] leading-[1.8] text-[0.95rem] ml-6 mb-4 list-disc max-[480px]:ml-4">
              <li className="mb-2">
                <strong className="text-[#1e293b]">Google OAuth:</strong> For secure sign-in authentication
              </li>
              <li className="mb-2">
                <strong className="text-[#1e293b]">Razorpay:</strong> For secure payment processing
              </li>
            </ul>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">
              These services have their own privacy policies, and we encourage
              you to review them.
            </p>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">10. Children&apos;s Privacy</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">
              Our Service is not intended for children under 13 years of age. We
              do not knowingly collect personal information from children. If
              you believe we have collected data from a child, please contact us
              immediately.
            </p>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">11. International Data Transfers</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">
              Your data may be processed on servers located outside your
              country. We ensure appropriate safeguards are in place for
              international transfers in compliance with applicable laws.
            </p>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">12. Changes to This Policy</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">
              We may update this Privacy Policy periodically. We will notify you
              of significant changes via email or a prominent notice on our
              Service. Your continued use after changes indicates acceptance of
              the updated policy.
            </p>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">13. Contact Us</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">For privacy-related inquiries, please contact:</p>
            <div className="bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] rounded-xl p-[20px_24px] mt-4 border-l-4 border-[#6366f1]">
              <p className="mb-1 text-[#0f172a]">
                <strong className="text-[#1e293b]">Data Protection Officer</strong>
              </p>
              <p className="mb-1 text-[#334155]">MaxHub Technologies Pvt. Ltd.</p>
              <p className="mb-1 text-[#334155]">Email: privacy@maxhub.center</p>
              <p className="mb-1 text-[#334155]">Support: support@maxhub.center</p>
            </div>
          </section>
        </div>

        <div className="flex justify-between items-center py-6 pb-12 border-t border-[#e2e8f0] mt-0 max-md:flex-col max-md:gap-6 max-md:text-center">
          <Link to="/login" className="inline-flex items-center gap-2 py-3 px-6 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white no-underline rounded-xl font-semibold text-[0.9rem] transition-all duration-300 shadow-[0_4px_15px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(99,102,241,0.4)]">
            ← Back to Login
          </Link>
          <div className="flex gap-6 max-md:flex-wrap max-md:justify-center max-md:gap-4">
            <Link to="/terms" className="text-[#64748b] no-underline text-[0.9rem] font-medium transition-colors hover:text-[#6366f1]">Terms of Service</Link>
            <Link to="/refund" className="text-[#64748b] no-underline text-[0.9rem] font-medium transition-colors hover:text-[#6366f1]">Refund Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
