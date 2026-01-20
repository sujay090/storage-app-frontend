import { Link } from "react-router-dom";
import "./Legal.css";

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <div className="legal-header">
          <Link to="/" className="legal-logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
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

        <div className="legal-content">
          <h1>Privacy Policy</h1>
          <p className="legal-updated">Last updated: January 19, 2026</p>

          <section className="legal-section">
            <h2>1. Introduction</h2>
            <p>
              MaxHub Technologies Pvt. Ltd. (&ldquo;we,&rdquo;
              &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting
              your privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use our cloud
              storage service.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Information We Collect</h2>
            <h3>Personal Information</h3>
            <ul>
              <li>Name and email address</li>
              <li>Account credentials (securely hashed)</li>
              <li>Payment information (processed by Razorpay)</li>
              <li>Profile information you choose to provide</li>
            </ul>
            <h3>Usage Information</h3>
            <ul>
              <li>Device information and browser type</li>
              <li>IP address and location data</li>
              <li>Usage patterns and feature interactions</li>
              <li>Log data and error reports</li>
            </ul>
            <h3>File Information</h3>
            <ul>
              <li>File metadata (name, size, type)</li>
              <li>Upload and download timestamps</li>
              <li>Folder structure and organization</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul>
              <li>Provide and maintain our cloud storage services</li>
              <li>Process transactions and send billing information</li>
              <li>Send important service updates and notifications</li>
              <li>Respond to customer support requests</li>
              <li>Analyze usage to improve our services</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your
              data:
            </p>
            <ul>
              <li>
                <strong>Encryption in Transit:</strong> All data is transmitted
                using TLS 1.3 encryption
              </li>
              <li>
                <strong>Encryption at Rest:</strong> Files are encrypted using
                AES-256 encryption
              </li>
              <li>
                <strong>Access Controls:</strong> Strict authentication and
                authorization protocols
              </li>
              <li>
                <strong>Regular Audits:</strong> Security assessments and
                vulnerability testing
              </li>
              <li>
                <strong>Secure Infrastructure:</strong> Data stored in certified
                data centers
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>5. Data Sharing and Disclosure</h2>
            <p>
              We do not sell your personal information. We may share data only
              in these circumstances:
            </p>
            <ul>
              <li>
                <strong>Service Providers:</strong> With trusted partners who
                assist in operating our service (e.g., Razorpay for payments)
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to
                protect our rights
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with mergers
                or acquisitions
              </li>
              <li>
                <strong>With Your Consent:</strong> When you explicitly
                authorize sharing
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>
                <strong>Access:</strong> Request a copy of your personal data
              </li>
              <li>
                <strong>Rectification:</strong> Correct inaccurate information
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your data
                (subject to legal requirements)
              </li>
              <li>
                <strong>Data Portability:</strong> Export your data in a
                standard format
              </li>
              <li>
                <strong>Withdraw Consent:</strong> Opt-out of marketing
                communications
              </li>
              <li>
                <strong>Complaint:</strong> Lodge a complaint with a supervisory
                authority
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>7. Data Retention</h2>
            <p>
              We retain your personal information for as long as your account is
              active. After account deletion, we keep data for 30 days before
              permanent deletion. Some data may be retained longer for legal,
              tax, or audit purposes.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Cookies and Tracking</h2>
            <p>We use essential cookies for:</p>
            <ul>
              <li>Authentication and session management</li>
              <li>Security and fraud prevention</li>
              <li>Remembering your preferences</li>
            </ul>
            <p>
              We do not use third-party advertising cookies. You can manage
              cookie preferences in your browser settings.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul>
              <li>
                <strong>Google OAuth:</strong> For secure sign-in authentication
              </li>
              <li>
                <strong>Razorpay:</strong> For secure payment processing
              </li>
            </ul>
            <p>
              These services have their own privacy policies, and we encourage
              you to review them.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Children&apos;s Privacy</h2>
            <p>
              Our Service is not intended for children under 13 years of age. We
              do not knowingly collect personal information from children. If
              you believe we have collected data from a child, please contact us
              immediately.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. International Data Transfers</h2>
            <p>
              Your data may be processed on servers located outside your
              country. We ensure appropriate safeguards are in place for
              international transfers in compliance with applicable laws.
            </p>
          </section>

          <section className="legal-section">
            <h2>12. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. We will notify you
              of significant changes via email or a prominent notice on our
              Service. Your continued use after changes indicates acceptance of
              the updated policy.
            </p>
          </section>

          <section className="legal-section">
            <h2>13. Contact Us</h2>
            <p>For privacy-related inquiries, please contact:</p>
            <div className="contact-info">
              <p>
                <strong>Data Protection Officer</strong>
              </p>
              <p>MaxHub Technologies Pvt. Ltd.</p>
              <p>Email: privacy@maxhub.center</p>
              <p>Support: support@maxhub.center</p>
            </div>
          </section>
        </div>

        <div className="legal-footer">
          <Link to="/login" className="legal-back-btn">
            ← Back to Login
          </Link>
          <div className="legal-nav-links">
            <Link to="/terms">Terms of Service</Link>
            <Link to="/refund">Refund Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
