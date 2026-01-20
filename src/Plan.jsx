import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getPlans } from "./apis/plan.api.js";
import "./Plan.css";
import { createSubscription } from "./apis/subscription.api.js";
import { UserContext } from "./App.jsx";

// Cloud Logo Component
const CloudLogo = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    className="plan-brand-logo"
  >
    <defs>
      <linearGradient id="planGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
    <path
      d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
      fill="url(#planGrad)"
    />
  </svg>
);

const Plan = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(null);

  // Get user from context and navigation
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // Load Razorpay SDK dynamically
  useEffect(() => {
    loadRazorpaySDK();
  }, []);

  const loadRazorpaySDK = () => {
    return new Promise((resolve) => {
      // Check if Razorpay is already loaded
      if (window.Razorpay) {
        setRazorpayLoaded(true);
        resolve(true);
        return;
      }

      // Create script tag for Razorpay
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        setRazorpayLoaded(true);
        resolve(true);
      };
      script.onerror = () => {
        console.error("Failed to load Razorpay SDK");
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  // Fetch plans from the database
  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const data = await getPlans();
      const plansArray = Array.isArray(data) ? data : data.plans || [];
      setPlans(plansArray);
    } catch (err) {
      setError("Failed to load plans");
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  const handleGetStarted = async (planId) => {
    try {
      // Check if Razorpay is loaded
      if (!razorpayLoaded) {
        alert("Payment system is loading, please try again in a moment");
        await loadRazorpaySDK();
        if (!razorpayLoaded) {
          alert("Failed to load payment system. Please refresh and try again.");
          return;
        }
      }

      setProcessingPayment(planId);

      // Create subscription and get subscription details
      const response = await createSubscription(planId);
      console.log("Subscription created:", response);

      if (response.subscription && response.subscription.id) {
        // Open Razorpay checkout
        openRazorpayCheckout(response.subscription, planId);
      } else {
        throw new Error("Invalid subscription response");
      }
    } catch (error) {
      console.error("Subscription creation error:", error);
      alert(`Failed to create subscription: ${error.message}`);
    } finally {
      setProcessingPayment(null);
    }
  };

  const handlePaymentSuccess = (
    paymentResponse,
    subscription,
    selectedPlan,
  ) => {
    console.log("Payment successful:", paymentResponse);

    // Reset processing state
    setProcessingPayment(null);

    // Navigate to success page with payment details
    navigate("/payment-success", {
      state: {
        planName: selectedPlan?.name,
        planSize: selectedPlan?.size,
        planPrice: selectedPlan?.price,
        paymentId: paymentResponse.razorpay_payment_id,
        subscriptionId: paymentResponse.razorpay_subscription_id,
        timestamp: new Date().toISOString(),
      },
    });
  };

  const openRazorpayCheckout = (subscription, planId) => {
    const selectedPlan = plans.find((plan) => plan._id === planId);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Your Razorpay key ID from env
      subscription_id: subscription.id,
      name: "Storage App",
      description: `${selectedPlan?.name} Plan Subscription`,
      handler: function (response) {
        handlePaymentSuccess(response, subscription, selectedPlan);
      },
      prefill: {
        name: user?.name || user?.username || "User",
        email: user?.email || "",
        contact: user?.phone || "",
      },
      notes: {
        plan_name: selectedPlan?.name,
        plan_id: planId,
        subscription_id: subscription.id,
        user_id: user?._id,
      },
      theme: {
        color: "#3399cc",
      },
      modal: {
        ondismiss: function () {
          console.log("Payment modal dismissed");
          setProcessingPayment(null);
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (loading) {
    return (
      <div className="plan-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="plan-page">
        <div className="error-container">
          <h2>Unable to Load Plans</h2>
          <p>{error}</p>
          <button onClick={fetchPlans} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="plan-page">
      {/* Header with Branding */}
      <header className="plan-header">
        <Link to="/" className="plan-brand">
          <CloudLogo />
          <span className="plan-brand-name">IronCloud</span>
        </Link>
        <Link to="/" className="back-to-dashboard">
          ← Back to Dashboard
        </Link>
      </header>

      {/* Main content wrapper */}
      <main className="plan-main-content">
        <div className="plan-hero">
          <h1 className="plan-title">Choose Your Storage Plan</h1>
          <p className="plan-subtitle">
            Select the perfect plan for your storage needs. Upgrade or downgrade
            anytime.
          </p>
        </div>

        {plans.length === 0 ? (
          <div className="empty-plans">
            <div className="empty-icon">📦</div>
            <h3>No Plans Available</h3>
            <p>Our team is working on creating storage plans for you.</p>
          </div>
        ) : (
          <div className="plan-cards">
            {plans.map((plan, index) => (
              <div
                key={plan._id}
                className={`plan-card ${index === 1 ? "popular" : ""}`}
              >
                {index === 1 && (
                  <span className="popular-badge">Most Popular</span>
                )}

                <div className="plan-header">
                  <h2 className="plan-name">{plan.name}</h2>
                  <div className="plan-storage">{plan.size} GB</div>
                </div>

                <div className="plan-pricing">
                  <span className="currency">₹</span>
                  <span className="amount">{plan.price}</span>
                  <span className="period">/month</span>
                </div>

                <div className="plan-description">
                  <p>{plan.description}</p>
                </div>

                <div className="plan-features">
                  <div className="feature">
                    <span className="feature-icon">💾</span>
                    <span>{plan.size} GB Storage Space</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">🔒</span>
                    <span>Secure File Encryption</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">📱</span>
                    <span>Multi-device Access</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">🌐</span>
                    <span>24/7 Cloud Access</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">📞</span>
                    <span>Priority Support</span>
                  </div>
                </div>

                <button
                  className={`plan-btn ${processingPayment === plan._id ? "processing" : ""}`}
                  onClick={() => handleGetStarted(plan._id)}
                  disabled={processingPayment === plan._id}
                >
                  {processingPayment === plan._id ? (
                    <>
                      <span className="spinner"></span>
                      Processing...
                    </>
                  ) : (
                    "Get Started"
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="plan-footer">
          <div className="footer-info">
            <h3>🔐 All Plans Include</h3>
            <div className="footer-features">
              <div className="footer-feature">
                <span className="check">✅</span>
                <span>End-to-end encryption</span>
              </div>
              <div className="footer-feature">
                <span className="check">✅</span>
                <span>Automatic backups</span>
              </div>
              <div className="footer-feature">
                <span className="check">✅</span>
                <span>File sharing & collaboration</span>
              </div>
              <div className="footer-feature">
                <span className="check">✅</span>
                <span>30-day money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Company Footer */}
      <footer className="plan-page-footer">
        <div className="footer-content">
          <p>© 2026 IronCloud Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/refund">Refund Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Plan;
