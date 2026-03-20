import { Link } from "react-router-dom";

const RefundPolicy = () => {
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
          <h1 className="text-[2.25rem] font-extrabold text-[#0f172a] mb-2 tracking-[-0.02em] max-md:text-[1.75rem] max-[480px]:text-[1.5rem]">Refund Policy</h1>
          <p className="text-[#64748b] text-[0.9rem] mb-10 pb-6 border-b-2 border-[#f1f5f9]">Last updated: January 19, 2026</p>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">1. Overview</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">
              At MaxHub Cloud, we want you to be completely satisfied with our
              services. This Refund Policy outlines the conditions under which
              refunds may be granted for our subscription plans.
            </p>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">2. Subscription Refunds</h2>
            <h3 className="text-[1.05rem] font-semibold text-[#334155] m-[20px_0_12px]">Monthly Subscriptions</h3>
            <ul className="text-[#475569] leading-[1.8] text-[0.95rem] ml-6 mb-4 list-disc max-[480px]:ml-4">
              <li className="mb-2">Full refund available within 7 days of initial purchase</li>
              <li className="mb-2">No refunds after the 7-day period</li>
              <li className="mb-2">
                Subscription can be cancelled anytime; access continues until
                period ends
              </li>
            </ul>
            <h3 className="text-[1.05rem] font-semibold text-[#334155] m-[20px_0_12px]">Annual Subscriptions</h3>
            <ul className="text-[#475569] leading-[1.8] text-[0.95rem] ml-6 mb-4 list-disc max-[480px]:ml-4">
              <li className="mb-2">Full refund available within 14 days of purchase</li>
              <li className="mb-2">
                Pro-rated refund available within 30 days (less days used)
              </li>
              <li className="mb-2">No refunds after 30 days from purchase date</li>
            </ul>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">3. Eligible Refund Reasons</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">Refunds may be granted for:</p>
            <ul className="text-[#475569] leading-[1.8] text-[0.95rem] ml-6 mb-4 list-disc max-[480px]:ml-4">
              <li className="mb-2">Duplicate or accidental charges</li>
              <li className="mb-2">Service not working as described</li>
              <li className="mb-2">Technical issues preventing service use</li>
              <li className="mb-2">Billing errors on our part</li>
            </ul>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">4. Non-Refundable Situations</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">Refunds will not be provided for:</p>
            <ul className="text-[#475569] leading-[1.8] text-[0.95rem] ml-6 mb-4 list-disc max-[480px]:ml-4">
              <li className="mb-2">Change of mind after the refund period</li>
              <li className="mb-2">Failure to cancel before renewal</li>
              <li className="mb-2">Account suspension due to policy violations</li>
              <li className="mb-2">Partial month usage after cancellation</li>
              <li className="mb-2">Third-party service fees (payment gateway charges)</li>
            </ul>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">5. How to Request a Refund</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">To request a refund:</p>
            <ol className="text-[#475569] leading-[1.8] text-[0.95rem] ml-6 mb-4 list-decimal max-[480px]:ml-4">
              <li className="mb-2">
                Email us at{" "}
                <a href="mailto:billing@maxhub.center" className="text-[#6366f1] font-medium transition-colors hover:text-[#4f46e5] hover:underline">billing@maxhub.center</a>
              </li>
              <li className="mb-2">Include your registered email address</li>
              <li className="mb-2">Provide transaction ID or order number</li>
              <li className="mb-2">Explain the reason for refund request</li>
            </ol>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">
              We will review your request and respond within 3-5 business days.
            </p>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">6. Refund Processing</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">Once approved:</p>
            <ul className="text-[#475569] leading-[1.8] text-[0.95rem] ml-6 mb-4 list-disc max-[480px]:ml-4">
              <li className="mb-2">Refunds are processed to the original payment method</li>
              <li className="mb-2">Processing time: 5-10 business days</li>
              <li className="mb-2">Bank processing may take additional 3-5 days</li>
              <li className="mb-2">
                You will receive email confirmation when refund is initiated
              </li>
            </ul>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">7. Plan Downgrade</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">
              If you downgrade your plan, no refund is provided for the current
              billing period. The new plan pricing will apply from the next
              billing cycle. Your storage will be adjusted according to the new
              plan limits.
            </p>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">8. Free Trial</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">
              Free tier accounts are not eligible for refunds as no payment is
              required. If you upgrade from free to paid and are unsatisfied,
              the standard refund policy applies from the upgrade date.
            </p>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">9. Cancellation</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">
              You can cancel your subscription at any time from your account
              settings. After cancellation:
            </p>
            <ul className="text-[#475569] leading-[1.8] text-[0.95rem] ml-6 mb-4 list-disc max-[480px]:ml-4">
              <li className="mb-2">You retain access until the current billing period ends</li>
              <li className="mb-2">No further charges will be made</li>
              <li className="mb-2">Your files remain accessible until period expiry</li>
              <li className="mb-2">After expiry, account reverts to free tier limits</li>
            </ul>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">10. Disputes</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">
              If you believe a charge was made in error, please contact us
              before initiating a dispute with your bank. We are committed to
              resolving issues quickly and fairly.
            </p>
          </section>

          <section className="mb-9">
            <h2 className="text-[1.35rem] font-bold text-[#1e293b] mb-4 pl-4 border-l-4 border-[#6366f1] max-md:text-[1.2rem]">11. Contact Us</h2>
            <p className="text-[#475569] leading-[1.8] text-[0.95rem] mb-4">For refund requests or billing inquiries:</p>
            <div className="bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] rounded-xl p-[20px_24px] mt-4 border-l-4 border-[#6366f1]">
              <p className="mb-1 text-[#0f172a]">
                <strong className="text-[#1e293b]">Billing Support</strong>
              </p>
              <p className="mb-1 text-[#334155]">MaxHub Technologies Pvt. Ltd.</p>
              <p className="mb-1 text-[#334155]">Email: billing@maxhub.center</p>
              <p className="mb-1 text-[#334155]">Response time: 24-48 hours</p>
            </div>
          </section>
        </div>

        <div className="flex justify-between items-center py-6 pb-12 border-t border-[#e2e8f0] mt-0 max-md:flex-col max-md:gap-6 max-md:text-center">
          <Link to="/login" className="inline-flex items-center gap-2 py-3 px-6 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white no-underline rounded-xl font-semibold text-[0.9rem] transition-all duration-300 shadow-[0_4px_15px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(99,102,241,0.4)]">
            ← Back to Login
          </Link>
          <div className="flex gap-6 max-md:flex-wrap max-md:justify-center max-md:gap-4">
            <Link to="/terms" className="text-[#64748b] no-underline text-[0.9rem] font-medium transition-colors hover:text-[#6366f1]">Terms of Service</Link>
            <Link to="/privacy" className="text-[#64748b] no-underline text-[0.9rem] font-medium transition-colors hover:text-[#6366f1]">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
