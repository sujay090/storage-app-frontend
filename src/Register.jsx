import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "./Register.css";
import { loginWithGoogle } from "./apis/loginWithGoogle";
import Toast from "./components/Toast";

// Cloud Logo Component
const CloudLogo = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    className="brand-logo-svg"
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

  // State management
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false); // ✅ NEW STATE
  const [verifyingOtp, setVerifyingOtp] = useState(false); // ✅ NEW STATE

  const navigate = useNavigate();

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear errors when user starts typing
    if (serverError) setServerError("");
    if (otpError) setOtpError("");
    if (successMessage) setSuccessMessage("");

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Check if OTP is verified
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

  // ✅ NEW FUNCTION - Verify OTP
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
    <div className="register-page">
      <div className="card">
        <header className="card-header">
          <CloudLogo />
          <h1 className="brand-name">IronCloud</h1>
          <h2 className="heading">Create your account</h2>
          <p className="sub">Join us and start storing your files securely</p>
        </header>

        <form className="form" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label htmlFor="name" className="label">
              Name
            </label>
            <input
              className="input"
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
          <div className="form-group">
            <label htmlFor="email" className="label">
              Email
            </label>
            <div className="email-input-group">
              <input
                className={`input ${otpError || serverError ? "input-error" : ""} ${otpVerified ? "input-success" : ""}`}
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
                className={`otp-button ${otpSent ? "sent" : ""} ${otpVerified ? "verified" : ""}`}
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

            {otpError && <span className="error-msg">{otpError}</span>}
          </div>

          {/* OTP Input - Show only after OTP is sent */}
          {showOtpInput && !otpVerified && (
            <div className="form-group otp-group">
              <label htmlFor="otp" className="label">
                Enter OTP Code
              </label>
              <div className="otp-input-group">
                <input
                  className={`input otp-input ${otpError ? "input-error" : ""}`}
                  type="text"
                  id="otp"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="Enter 4-digit code"
                  maxLength="4"
                  required
                />
                {/* ✅ NEW VERIFY BUTTON */}
                <button
                  type="button"
                  className="verify-button"
                  onClick={handleVerifyOtp}
                  disabled={verifyingOtp || !formData.otp}
                >
                  {verifyingOtp ? "Verifying..." : "Verify"}
                </button>
                <button
                  type="button"
                  className="resend-button"
                  onClick={handleResendOtp}
                  disabled={otpLoading || verifyingOtp}
                >
                  Resend
                </button>
              </div>
              <p className="otp-help">
                Check your email for the verification code. It expires in 30
                seconds.
              </p>
            </div>
          )}

          {/* ✅ Show verified message */}
          {otpVerified && (
            <div className="verified-badge">
              <span className="verified-icon">✓</span>
              Email verified successfully
            </div>
          )}

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              className="input"
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
            className={`submit-button ${isLoading ? "loading" : ""} ${successMessage ? "success" : ""}`}
            disabled={isLoading || !otpVerified}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Creating Account...
              </>
            ) : successMessage ? (
              "Registration Successful ✓"
            ) : (
              "Create Account"
            )}
          </button>

          {/* Terms Agreement */}
          <p className="terms-agreement">
            By creating an account, you agree to our{" "}
            <Link to="/terms">Terms of Service</Link> and{" "}
            <Link to="/privacy">Privacy Policy</Link>
          </p>
        </form>

        <footer className="card-footer">
          <p className="or">or continue with</p>
          <div className="google-login-container">
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
              useOneTap
              onError={() => {
                setServerError("Google login failed. Please try again.");
              }}
            />
          </div>
          <p className="link-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </footer>
      </div>

      {/* Page Footer */}
      <div className="register-page-footer">
        <p>© 2026 IronCloud Technologies Pvt. Ltd.</p>
        <div className="footer-links">
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/refund">Refund</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
