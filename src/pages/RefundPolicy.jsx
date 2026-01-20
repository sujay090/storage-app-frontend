import { Link } from "react-router-dom";
import "./Legal.css";

const RefundPolicy = () => {
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
          <h1>Refund Policy</h1>
          <p className="legal-updated">Last updated: January 19, 2026</p>

          <section className="legal-section">
            <h2>1. Overview</h2>
            <p>
              At MaxHub Cloud, we want you to be completely satisfied with our
              services. This Refund Policy outlines the conditions under which
              refunds may be granted for our subscription plans.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Subscription Refunds</h2>
            <h3>Monthly Subscriptions</h3>
            <ul>
              <li>Full refund available within 7 days of initial purchase</li>
              <li>No refunds after the 7-day period</li>
              <li>
                Subscription can be cancelled anytime; access continues until
                period ends
              </li>
            </ul>
            <h3>Annual Subscriptions</h3>
            <ul>
              <li>Full refund available within 14 days of purchase</li>
              <li>
                Pro-rated refund available within 30 days (less days used)
              </li>
              <li>No refunds after 30 days from purchase date</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. Eligible Refund Reasons</h2>
            <p>Refunds may be granted for:</p>
            <ul>
              <li>Duplicate or accidental charges</li>
              <li>Service not working as described</li>
              <li>Technical issues preventing service use</li>
              <li>Billing errors on our part</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. Non-Refundable Situations</h2>
            <p>Refunds will not be provided for:</p>
            <ul>
              <li>Change of mind after the refund period</li>
              <li>Failure to cancel before renewal</li>
              <li>Account suspension due to policy violations</li>
              <li>Partial month usage after cancellation</li>
              <li>Third-party service fees (payment gateway charges)</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>5. How to Request a Refund</h2>
            <p>To request a refund:</p>
            <ol>
              <li>
                Email us at{" "}
                <a href="mailto:billing@maxhub.center">billing@maxhub.center</a>
              </li>
              <li>Include your registered email address</li>
              <li>Provide transaction ID or order number</li>
              <li>Explain the reason for refund request</li>
            </ol>
            <p>
              We will review your request and respond within 3-5 business days.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Refund Processing</h2>
            <p>Once approved:</p>
            <ul>
              <li>Refunds are processed to the original payment method</li>
              <li>Processing time: 5-10 business days</li>
              <li>Bank processing may take additional 3-5 days</li>
              <li>
                You will receive email confirmation when refund is initiated
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>7. Plan Downgrade</h2>
            <p>
              If you downgrade your plan, no refund is provided for the current
              billing period. The new plan pricing will apply from the next
              billing cycle. Your storage will be adjusted according to the new
              plan limits.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Free Trial</h2>
            <p>
              Free tier accounts are not eligible for refunds as no payment is
              required. If you upgrade from free to paid and are unsatisfied,
              the standard refund policy applies from the upgrade date.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Cancellation</h2>
            <p>
              You can cancel your subscription at any time from your account
              settings. After cancellation:
            </p>
            <ul>
              <li>You retain access until the current billing period ends</li>
              <li>No further charges will be made</li>
              <li>Your files remain accessible until period expiry</li>
              <li>After expiry, account reverts to free tier limits</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>10. Disputes</h2>
            <p>
              If you believe a charge was made in error, please contact us
              before initiating a dispute with your bank. We are committed to
              resolving issues quickly and fairly.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Contact Us</h2>
            <p>For refund requests or billing inquiries:</p>
            <div className="contact-info">
              <p>
                <strong>Billing Support</strong>
              </p>
              <p>MaxHub Technologies Pvt. Ltd.</p>
              <p>Email: billing@maxhub.center</p>
              <p>Response time: 24-48 hours</p>
            </div>
          </section>
        </div>

        <div className="legal-footer">
          <Link to="/login" className="legal-back-btn">
            ← Back to Login
          </Link>
          <div className="legal-nav-links">
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
