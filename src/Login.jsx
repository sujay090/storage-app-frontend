import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "./Login.css";
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
      <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="50%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
    </defs>
    <path
      d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
      fill="url(#cloudGrad)"
    />
  </svg>
);

const Login = () => {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State management
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear errors and success messages when user starts typing
    if (serverError) setServerError("");
    if (successMessage) setSuccessMessage("");

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any existing messages and set loading state
    setServerError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (data.error) {
        setServerError(data.error);
      } else {
        setSuccessMessage("Login successful! Redirecting...");
        // Small delay to show success message before redirect
        setTimeout(() => {
          navigate("/");
        }, 100);
      }
    } catch (error) {
      console.error("Error:", error);
      setServerError(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Brand Header */}
        <div className="brand-header">
          <CloudLogo />
          <h1 className="brand-name">IronCloud</h1>
          <p className="brand-tagline">Secure cloud storage for everyone</p>
        </div>

        <h2>Welcome back</h2>
        <p className="login-subtitle">Sign in to access your files</p>

        <form onSubmit={handleSubmit}>
          {serverError && (
            <Toast
              message={serverError}
              type="error"
              duration={5000}
              onClose={() => setServerError("")}
            />
          )}

          {successMessage && (
            <Toast
              message={successMessage}
              type="success"
              duration={3000}
              onClose={() => setSuccessMessage("")}
            />
          )}

          <div className="input-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              disabled={isLoading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="btn-spinner"></span>
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <p className="or">or continue with</p>
        <div className="google-login-container">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              const data = await loginWithGoogle(credentialResponse.credential);
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

        <p className="signup-link">
          Don&apos;t have an account? <Link to="/register">Create account</Link>
        </p>

        {/* Terms Footer */}
        <div className="terms-footer">
          <p>
            By signing in, you agree to our{" "}
            <Link to="/terms">Terms of Service</Link> and{" "}
            <Link to="/privacy">Privacy Policy</Link>
          </p>
        </div>
      </div>

      {/* Page Footer */}
      <div className="login-page-footer">
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

export default Login;
