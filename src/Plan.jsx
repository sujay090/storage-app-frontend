import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getPlans } from "./apis/plan.api.js";
import { createSubscription } from "./apis/subscription.api.js";
import { UserContext } from "./App.jsx";

// Cloud Logo Component
const CloudLogo = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    className="drop-shadow-[0_0_10px_rgba(0,212,255,0.4)]"
  >
    <defs>
      <linearGradient id="planGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00d4ff" />
        <stop offset="100%" stopColor="#0072ff" />
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
      <div className="min-h-screen bg-[#111318] text-slate-100 relative overflow-hidden flex flex-col items-center justify-center">
        <div className="text-center p-10 cursor-not-allowed">
          <div className="w-14 h-14 border-4 border-slate-800 border-t-[#00d4ff] rounded-full animate-spin mx-auto mb-5"></div>
          <p>Loading plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#111318] text-slate-100 relative overflow-hidden flex flex-col items-center justify-center">
        <div className="text-center p-10">
          <h2 className="text-2xl font-bold mb-4">Unable to Load Plans</h2>
          <p className="mb-6">{error}</p>
          <button onClick={fetchPlans} className="bg-gradient-to-r from-[#00d4ff] to-[#0072ff] text-white border-none py-3 px-6 rounded-md font-semibold cursor-pointer">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111318] text-slate-100 relative overflow-hidden flex flex-col
      before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_10%_20%,rgba(0,212,255,0.04)_0%,transparent_50%),radial-gradient(circle_at_90%_80%,rgba(0,114,255,0.04)_0%,transparent_50%)] before:pointer-events-none before:z-0">
      
      {/* Header with Branding */}
      <header className="flex justify-between items-center py-5 px-8 bg-[#15191e]/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-[100] transition-colors shrink-0 max-md:py-4 max-md:px-6">
        <Link to="/" className="flex items-center gap-3 text-none">
          <CloudLogo />
          <span className="text-[1.35rem] font-bold text-slate-100 tracking-tight max-[480px]:hidden">IronCloud</span>
        </Link>
        <Link to="/" className="text-slate-400 no-underline text-[0.9rem] font-medium py-2.5 px-4 rounded-md transition-all border border-transparent hover:text-[#00d4ff] hover:bg-[#1f262e] hover:border-slate-800">
          ← Back to Dashboard
        </Link>
      </header>

      {/* Main content wrapper */}
      <main className="flex-1 flex flex-col z-[1]">
        <div className="text-center mb-[72px] pt-[60px] animate-in slide-in-from-bottom-8 fade-in duration-700">
          <h1 className="text-[3.5rem] font-extrabold mb-5 text-slate-100 leading-[1.15] tracking-tight max-md:text-[2.2rem] max-[480px]:text-[1.8rem]">
            Choose Your <span className="bg-gradient-to-r from-[#00d4ff] to-[#0072ff] text-transparent bg-clip-text">Storage Plan</span>
          </h1>
          <p className="text-[1.3rem] text-slate-400 mx-auto max-w-[650px] leading-[1.8]">
            Select the perfect plan for your storage needs. Upgrade or downgrade anytime.
          </p>
        </div>

        {plans.length === 0 ? (
          <div className="text-center p-10 text-slate-100">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-2xl font-bold mb-3">No Plans Available</h3>
            <p>Our team is working on creating storage plans for you.</p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-8 max-w-[1200px] mx-auto z-[1] max-md:px-4 max-md:gap-6">
            {plans.map((plan, index) => (
              <div
                key={plan._id}
                className={`bg-[#15191e]/80 backdrop-blur-xl border border-slate-800 rounded-xl p-[40px_32px] relative transition-all duration-300 shadow-lg hover:border-[#00d4ff] hover:shadow-[0_0_15px_rgba(0,212,255,0.4),0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] hover:-translate-y-2
                  ${index === 1 ? "border-[#00d4ff] shadow-[0_0_15px_rgba(0,212,255,0.4)] scale-[1.03] bg-[#1f262e]/80" : ""}`}
              >
                {index === 1 && (
                  <span className="absolute top-[-16px] left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#00d4ff] to-[#0072ff] text-white text-[0.75rem] font-extrabold py-2 px-5 rounded-full uppercase tracking-[1.5px] shadow-[0_0_15px_rgba(0,212,255,0.4)]">Most Popular</span>
                )}

                <div className="mb-8">
                  <h2 className="text-[1.6rem] font-extrabold mb-3.5 text-slate-100 tracking-tight">{plan.name}</h2>
                  <div className="bg-[#00d4ff]/10 text-[#00d4ff] font-bold text-[0.85rem] py-2 px-4 rounded-full inline-block border border-[#00d4ff]/20">{plan.size} GB</div>
                </div>

                <div className="flex justify-center items-baseline gap-1.5 my-8 p-6 bg-[#1f262e] rounded-lg border border-slate-800">
                  <span className="text-[1.6rem] text-slate-400 font-bold">₹</span>
                  <span className="text-[3.5rem] font-extrabold text-slate-100 leading-none tracking-tight max-[480px]:text-[2.5rem]">{plan.price}</span>
                  <span className="text-[1rem] text-slate-400 font-semibold">/month</span>
                </div>

                <div className="text-center mb-8 pb-8 border-b border-slate-800">
                  <p className="text-slate-400 text-[0.95rem] leading-[1.6] m-0">{plan.description}</p>
                </div>

                <div className="flex flex-col gap-0 mb-9">
                  <div className="flex items-center gap-4 py-3.5 text-[0.95rem] text-slate-400 border-b border-slate-800 font-medium last:border-b-0">
                    <span className="text-[1.1rem] w-7 h-7 flex items-center justify-center bg-emerald-500/10 text-emerald-500 rounded-full shrink-0">💾</span>
                    <span>{plan.size} GB Storage Space</span>
                  </div>
                  <div className="flex items-center gap-4 py-3.5 text-[0.95rem] text-slate-400 border-b border-slate-800 font-medium last:border-b-0">
                    <span className="text-[1.1rem] w-7 h-7 flex items-center justify-center bg-emerald-500/10 text-emerald-500 rounded-full shrink-0">🔒</span>
                    <span>Secure File Encryption</span>
                  </div>
                  <div className="flex items-center gap-4 py-3.5 text-[0.95rem] text-slate-400 border-b border-slate-800 font-medium last:border-b-0">
                    <span className="text-[1.1rem] w-7 h-7 flex items-center justify-center bg-emerald-500/10 text-emerald-500 rounded-full shrink-0">📱</span>
                    <span>Multi-device Access</span>
                  </div>
                  <div className="flex items-center gap-4 py-3.5 text-[0.95rem] text-slate-400 border-b border-slate-800 font-medium last:border-b-0">
                    <span className="text-[1.1rem] w-7 h-7 flex items-center justify-center bg-emerald-500/10 text-emerald-500 rounded-full shrink-0">🌐</span>
                    <span>24/7 Cloud Access</span>
                  </div>
                  <div className="flex items-center gap-4 py-3.5 text-[0.95rem] text-slate-400 border-b border-slate-800 font-medium last:border-b-0">
                    <span className="text-[1.1rem] w-7 h-7 flex items-center justify-center bg-emerald-500/10 text-emerald-500 rounded-full shrink-0">📞</span>
                    <span>Priority Support</span>
                  </div>
                </div>

                <button
                  className={`w-full bg-gradient-to-r from-[#00d4ff] to-[#0072ff] text-white border-none rounded-full py-4 px-7 text-[1rem] font-bold cursor-pointer transition-all duration-300 shadow-[0_0_15px_rgba(0,212,255,0.4)] relative overflow-hidden group 
                    ${processingPayment === plan._id ? "bg-slate-600 bg-none cursor-not-allowed shadow-none" : "hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0"}`}
                  onClick={() => handleGetStarted(plan._id)}
                  disabled={processingPayment === plan._id}
                >
                  <div className={`absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-all duration-500 group-hover:left-full ${processingPayment === plan._id ? "hidden" : ""}`} />
                  
                  {processingPayment === plan._id ? (
                    <div className="flex items-center justify-center gap-2">
                      <span className="w-5 h-5 border-2 border-slate-400 border-t-white rounded-full animate-spin"></span>
                      Processing...
                    </div>
                  ) : (
                    "Get Started"
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-20 text-center max-w-[800px] w-full mx-auto p-12 bg-[#15191e] rounded-xl shadow-lg border border-slate-800">
          <div className="mb-0">
            <h3 className="text-[1.5rem] mb-7 text-slate-100 font-bold">🔐 All Plans Include</h3>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 text-left">
              <div className="flex items-center gap-2.5 p-3 bg-[#1f262e] rounded-md text-[0.9rem] text-slate-400">
                <span className="text-[1.1rem]">✅</span>
                <span>End-to-end encryption</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 bg-[#1f262e] rounded-md text-[0.9rem] text-slate-400">
                <span className="text-[1.1rem]">✅</span>
                <span>Automatic backups</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 bg-[#1f262e] rounded-md text-[0.9rem] text-slate-400">
                <span className="text-[1.1rem]">✅</span>
                <span>File sharing & collaboration</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 bg-[#1f262e] rounded-md text-[0.9rem] text-slate-400">
                <span className="text-[1.1rem]">✅</span>
                <span>30-day money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Company Footer */}
      <footer className="bg-[#1f262e] border-t border-slate-800 p-[40px_24px] mt-auto relative bottom-0">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center text-slate-400 max-md:flex-col max-md:gap-5 max-md:text-center">
          <p>© 2026 IronCloud Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-5 max-md:gap-2.5 max-md:flex-wrap max-md:justify-center">
            <Link to="/terms" className="text-slate-500 transition-colors hover:text-[#00d4ff] no-underline">Terms of Service</Link>
            <Link to="/privacy" className="text-slate-500 transition-colors hover:text-[#00d4ff] no-underline">Privacy Policy</Link>
            <Link to="/refund" className="text-slate-500 transition-colors hover:text-[#00d4ff] no-underline">Refund Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Plan;
