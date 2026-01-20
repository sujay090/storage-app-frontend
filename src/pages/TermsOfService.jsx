import { Link } from "react-router-dom";
import "./Legal.css";

const TermsOfService = () => {
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
          <h1>Terms of Service</h1>
          <p className="legal-updated">Last updated: January 19, 2026</p>

          <section className="legal-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using MaxHub Cloud services (the
              &ldquo;Service&rdquo;), you accept and agree to be bound by the
              terms and provision of this agreement. If you do not agree to
              abide by the above, please do not use this service.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Description of Service</h2>
            <p>
              MaxHub Cloud provides cloud storage services that allow users to
              store, manage, and share files securely. Our services include:
            </p>
            <ul>
              <li>Secure file storage and backup</li>
              <li>File sharing and collaboration tools</li>
              <li>Cross-device synchronization</li>
              <li>File organization and management</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. User Accounts</h2>
            <p>
              To use our Service, you must create an account. You are
              responsible for:
            </p>
            <ul>
              <li>
                Maintaining the confidentiality of your account credentials
              </li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
              <li>Providing accurate and complete registration information</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. Acceptable Use Policy</h2>
            <p>You agree not to use the Service to:</p>
            <ul>
              <li>Upload, store, or share illegal content</li>
              <li>Violate any intellectual property rights</li>
              <li>Distribute malware or harmful software</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Harass, abuse, or harm others</li>
              <li>Share content that promotes violence or discrimination</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>5. Storage Limits and Quotas</h2>
            <p>
              Your storage capacity depends on your subscription plan. Free
              accounts receive 500MB of storage. Paid plans offer increased
              storage as described in our pricing page. We reserve the right to
              modify storage limits with prior notice.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Payment Terms</h2>
            <p>For paid subscriptions:</p>
            <ul>
              <li>All payments are processed securely through Razorpay</li>
              <li>Subscriptions are billed on a recurring basis</li>
              <li>Prices are in Indian Rupees (INR) unless otherwise stated</li>
              <li>You may cancel your subscription at any time</li>
              <li>Refunds are subject to our Refund Policy</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>7. Data Privacy and Security</h2>
            <p>
              We take your privacy seriously. Your data is encrypted both in
              transit and at rest. We will never sell your personal information
              to third parties. For more details, please review our{" "}
              <Link to="/privacy">Privacy Policy</Link>.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Intellectual Property</h2>
            <p>
              You retain all rights to the content you upload. By using our
              Service, you grant us a limited license to store and process your
              files solely for the purpose of providing the Service.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Service Availability</h2>
            <p>
              We strive for 99.9% uptime but do not guarantee uninterrupted
              access. We may perform maintenance with prior notice when
              possible. We are not liable for any downtime or service
              interruptions.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account if you
              violate these terms. Upon termination, you will have 30 days to
              download your data before it is permanently deleted.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Limitation of Liability</h2>
            <p>
              MaxHub Technologies Pvt. Ltd. shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages
              resulting from your use of the Service. Our total liability shall
              not exceed the amount paid by you in the 12 months preceding the
              claim.
            </p>
          </section>

          <section className="legal-section">
            <h2>12. Changes to Terms</h2>
            <p>
              We may update these terms from time to time. We will notify you of
              significant changes via email or through the Service. Continued
              use after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="legal-section">
            <h2>13. Governing Law</h2>
            <p>
              These terms shall be governed by the laws of India. Any disputes
              shall be subject to the exclusive jurisdiction of the courts in
              Bangalore, Karnataka.
            </p>
          </section>

          <section className="legal-section">
            <h2>14. Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us at:
            </p>
            <div className="contact-info">
              <p>
                <strong>MaxHub Technologies Pvt. Ltd.</strong>
              </p>
              <p>Email: legal@maxhub.center</p>
              <p>Support: support@maxhub.center</p>
            </div>
          </section>
        </div>

        <div className="legal-footer">
          <Link to="/login" className="legal-back-btn">
            ← Back to Login
          </Link>
          <div className="legal-nav-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/refund">Refund Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
