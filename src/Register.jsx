import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "./apis/loginWithGoogle";
import Toast from "./components/Toast";

// Cloud Logo Component
const CloudLogo = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    className="drop-shadow-[0_0_15px_rgba(0,212,255,0.4)] mb-3 text-[#00d4ff] mx-auto"
  >
    <defs>
      <linearGradient id="regCloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="50%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
    </defs>
    <path
      d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
      fill="url(#regCloudGrad)"
    />
  </svg>
);

const Register = () => {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });

  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (serverError) setServerError("");
    if (otpError) setOtpError("");
    if (successMessage) setSuccessMessage("");

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      setServerError("Please verify your email with OTP first");
      return;
    }

    setIsLoading(true);
    setServerError("");

    try {
      const response = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.error) {
        setServerError(data.error);
      } else {
        setSuccessMessage("Registration successful! Redirecting...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      setServerError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      setOtpError("Please enter your email first");
      return;
    }

    setOtpLoading(true);
    setOtpError("");
    setServerError("");

    try {
      const response = await fetch(`${BASE_URL}/user/otp-send`, {
        method: "POST",
        body: JSON.stringify({ email: formData.email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        setOtpSent(true);
        setShowOtpInput(true);
        setSuccessMessage("OTP sent successfully! Check your email.");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setOtpError(data.error || "Failed to send OTP");
      }
    } catch (err) {
      console.error("OTP Error:", err);
      setOtpError("Failed to send OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!formData.otp) {
      setOtpError("Please enter the OTP code");
      return;
    }

    if (formData.otp.length !== 4) {
      setOtpError("OTP must be 4 digits");
      return;
    }

    setVerifyingOtp(true);
    setOtpError("");
    setServerError("");

    try {
      const response = await fetch(`${BASE_URL}/user/verify-otp`, {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        setOtpVerified(true);
        setSuccessMessage("✓ Email verified successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setOtpError(data.error || "Invalid OTP code");
        setOtpVerified(false);
      }
    } catch (err) {
      console.error("Verify OTP Error:", err);
      setOtpError("Failed to verify OTP. Please try again.");
      setOtpVerified(false);
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleResendOtp = async () => {
    setOtpVerified(false);
    setFormData((prev) => ({ ...prev, otp: "" }));
    await handleSendOtp({ preventDefault: () => {} });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_center,_#1f2933_0%,_#0b0e11_100%)] p-4 sm:p-6 text-slate-100 font-sans relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(0,212,255,0.05)_0%,_transparent_70%)] rounded-full -top-[300px] -right-[300px] animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(0,114,255,0.05)_0%,_transparent_70%)] rounded-full -bottom-[200px] -left-[200px] animate-[pulse_10s_ease-in-out_infinite_reverse]" />

      <div className="bg-[#15191e]/80 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl w-full max-w-[500px] p-0 relative z-10 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
        <header className="px-6 sm:px-9 py-8 sm:py-10 pb-6 sm:pb-7 text-center bg-gradient-to-br from-[#1f262e] to-[#15191e] border-b border-slate-800">
          <CloudLogo />
          <h1 className="text-2xl font-extrabold text-slate-100 m-0 tracking-tight">IronCloud</h1>
          <h2 className="text-2xl sm:text-3xl mt-4 font-extrabold text-slate-100 m-0 mb-2 leading-tight tracking-tight">Create your account</h2>
          <p className="text-base text-slate-400 m-0 leading-relaxed">Join us and start storing your files securely</p>
        </header>

        <form className="p-6 sm:p-9" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-6 relative">
            <label htmlFor="name" className="block mb-2 text-sm font-semibold text-slate-400">
              Name
            </label>
            <input
              className="w-full p-[14px_16px] border border-slate-800 rounded-xl text-base text-slate-100 bg-[#1f262e] outline-none transition-all focus:border-[#00d4ff] focus:ring-2 focus:ring-[#00d4ff]/20 disabled:bg-slate-800 disabled:opacity-70 disabled:cursor-not-allowed"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-6 relative">
            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-slate-400">
              Email
            </label>
            <div className="flex flex-col sm:flex-row gap-3 items-stretch">
              <input
                className={`flex-1 p-[14px_16px] border border-slate-800 rounded-xl text-base text-slate-100 bg-[#1f262e] outline-none transition-all focus:border-[#00d4ff] focus:ring-2 focus:ring-[#00d4ff]/20 disabled:bg-slate-800 disabled:opacity-70 disabled:cursor-not-allowed ${otpError || serverError ? "border-red-500 ring-4 ring-red-500/10" : ""} ${otpVerified ? "border-[#00ff9d] ring-4 ring-[#00ff9d]/10" : ""}`}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                disabled={otpVerified}
              />
              <button
                type="button"
                className={`w-full sm:w-auto px-5 py-[14px] bg-gradient-to-br from-[#00d4ff] to-[#0072ff] text-white rounded-xl text-sm font-semibold whitespace-nowrap min-w-[110px] transition-all hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,212,255,0.4)] disabled:bg-slate-700 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none ${otpSent ? "bg-emerald-500" : ""} ${otpVerified ? "!bg-emerald-500 pointer-events-none" : ""}`}
                onClick={handleSendOtp}
                disabled={otpLoading || otpVerified}
              >
                {otpLoading
                  ? "Sending..."
                  : otpVerified
                    ? "✓ Verified"
                    : otpSent
                      ? "✓ Sent"
                      : "Send OTP"}
              </button>
            </div>

            {otpError && <span className="text-red-500 text-sm mt-2 block">{otpError}</span>}
          </div>

          {/* OTP Input - Show only after OTP is sent */}
          {showOtpInput && !otpVerified && (
            <div className="bg-[#1f262e] border border-slate-800 rounded-xl p-6 my-6 animate-in fade-in slide-in-from-top-2">
              <label htmlFor="otp" className="block mb-2 text-sm font-semibold text-slate-400">
                Enter OTP Code
              </label>
              <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
                <input
                  className={`flex-1 text-center text-lg sm:text-2xl tracking-[4px] font-semibold bg-transparent w-full p-[14px_16px] border border-slate-800 rounded-xl text-slate-100 outline-none transition-all focus:border-[#00d4ff] focus:ring-2 focus:ring-[#00d4ff]/20 ${otpError ? "border-red-500" : ""}`}
                  type="text"
                  id="otp"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="Enter 4-digit code"
                  maxLength="4"
                  required
                />
                <button
                  type="button"
                  className="px-4 py-3 sm:py-2 bg-slate-700 text-slate-100 border border-slate-700 rounded-xl sm:rounded-lg font-semibold hover:bg-[#00d4ff] hover:text-white transition-all whitespace-nowrap w-full sm:w-auto"
                  onClick={handleVerifyOtp}
                  disabled={verifyingOtp || !formData.otp}
                >
                  {verifyingOtp ? "Verifying..." : "Verify"}
                </button>
                <button
                  type="button"
                  className="px-4 py-3 sm:py-2 text-slate-400 hover:text-white transition-all w-full sm:w-auto font-medium"
                  onClick={handleResendOtp}
                  disabled={otpLoading || verifyingOtp}
                >
                  Resend
                </button>
              </div>
              <p className="text-sm text-slate-500 mt-4 text-center">
                Check your email for the verification code. It expires in 30
                seconds.
              </p>
            </div>
          )}

          {/* Show verified message */}
          {otpVerified && (
            <div className="flex items-center gap-2 p-[12px_16px] bg-[#00ff9d]/10 border border-[#00ff9d] text-[#00ff9d] rounded-xl font-semibold mb-6 animate-in slide-in-from-left">
              <span className="flex items-center justify-center w-6 h-6 bg-[#00ff9d] text-black rounded-full text-sm">✓</span>
              Email verified successfully
            </div>
          )}

          {/* Password */}
          <div className="mb-6 relative">
            <label htmlFor="password" className="block mb-2 text-sm font-semibold text-slate-400">
              Password
            </label>
            <input
              className="w-full p-[14px_16px] border border-slate-800 rounded-xl text-base text-slate-100 bg-[#1f262e] outline-none transition-all focus:border-[#00d4ff] focus:ring-2 focus:ring-[#00d4ff]/20 disabled:bg-slate-800 disabled:opacity-70 disabled:cursor-not-allowed"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Success/Error Toast Messages */}
          {successMessage && (
            <Toast
              message={successMessage}
              type="success"
              duration={4000}
              onClose={() => setSuccessMessage("")}
            />
          )}

          {serverError && (
            <Toast
              message={serverError}
              type="error"
              duration={5000}
              onClose={() => setServerError("")}
            />
          )}

          <button
            type="submit"
            className={`w-full p-4 bg-gradient-to-br from-[#00d4ff] to-[#0072ff] text-white rounded-xl text-base font-semibold flex items-center justify-center gap-2 transition-all hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,212,255,0.4)] disabled:bg-slate-700 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none disabled:text-slate-400 ${isLoading ? "!bg-slate-700" : ""} ${successMessage ? "!bg-emerald-500" : ""}`}
            disabled={isLoading || !otpVerified}
          >
            {isLoading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Creating Account...
              </>
            ) : successMessage ? (
              "Registration Successful ✓"
            ) : (
              "Create Account"
            )}
          </button>

          {/* Terms Agreement */}
          <p className="text-[0.85rem] text-slate-500 text-center mt-6">
            By creating an account, you agree to our{" "}
            <Link className="text-[#00d4ff] no-underline transition-colors hover:text-[#0072ff]" to="/terms">Terms of Service</Link> and{" "}
            <Link className="text-[#00d4ff] no-underline transition-colors hover:text-[#0072ff]" to="/privacy">Privacy Policy</Link>
          </p>
        </form>

        <footer className="px-8 py-8 pt-6 text-center bg-black/20 border-t border-slate-800">
          <p className="text-center text-slate-500 mb-4 relative before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-[calc(50%-60px)] before:h-px before:bg-slate-800 after:content-[''] after:absolute after:top-1/2 after:right-0 after:w-[calc(50%-60px)] after:h-px after:bg-slate-800">or continue with</p>
          <div className="google-btn-wrapper mb-6">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                const data = await loginWithGoogle(
                  credentialResponse.credential,
                );
                if (data.error) {
                  setServerError(data.error);
                  return;
                }
                navigate("/");
              }}
              shape="pill"
              theme="filled_blue"
              text="continue_with"
              width="300"
              useOneTap
              onError={() => {
                setServerError("Google login failed. Please try again.");
              }}
            />
          </div>
          <p className="text-[0.9rem] text-slate-400 m-0">
            Already have an account? <Link className="text-[#00d4ff] no-underline font-semibold transition-colors hover:text-[#0072ff] hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]" to="/login">Login</Link>
          </p>
        </footer>
      </div>

      {/* Page Footer */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-slate-500 z-10 w-full px-4">
        <p className="text-[0.8rem] m-0 mb-2">© 2026 IronCloud Technologies Pvt. Ltd.</p>
        <div className="flex gap-4 justify-center">
          <Link className="text-slate-400 no-underline text-[0.8rem] font-medium transition-colors hover:text-[#00d4ff]" to="/terms">Terms</Link>
          <Link className="text-slate-400 no-underline text-[0.8rem] font-medium transition-colors hover:text-[#00d4ff]" to="/privacy">Privacy</Link>
          <Link className="text-slate-400 no-underline text-[0.8rem] font-medium transition-colors hover:text-[#00d4ff]" to="/refund">Refund</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
