import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "./apis/loginWithGoogle";
import Toast from "./components/Toast";

// Cloud Logo Component
const CloudLogo = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    className="drop-shadow-[0_0_15px_rgba(0,212,255,0.4)] mb-3 text-[#00d4ff]"
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_#1f2933_0%,_#0b0e11_100%)] p-4 sm:p-6 relative overflow-hidden font-sans text-slate-100">
      
      {/* Animated Background Elements */}
      <div className="absolute w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(0,212,255,0.05)_0%,_transparent_70%)] rounded-full -top-[400px] -right-[200px] animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(0,114,255,0.05)_0%,_transparent_70%)] rounded-full -bottom-[300px] -left-[200px] animate-[pulse_10s_ease-in-out_infinite_reverse]" />

      <div className="bg-[#15191e]/80 backdrop-blur-xl p-8 sm:p-12 border border-slate-800 rounded-3xl shadow-2xl w-full max-w-[440px] relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Brand Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <CloudLogo />
          <h1 className="text-2xl font-extrabold m-0 mb-1 tracking-tight text-slate-100">IronCloud</h1>
          <p className="text-sm text-slate-400 m-0">Secure cloud storage for everyone</p>
        </div>

        <h2 className="text-center m-0 mb-1 text-slate-100 text-[1.75rem] font-bold tracking-tight">Welcome back</h2>
        <p className="text-center text-slate-400 m-0 mb-8 text-[0.95rem]">Sign in to access your files</p>

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

          <div className="mb-5">
            <label className="block mb-2 font-medium text-slate-400 text-sm" htmlFor="email">Email address</label>
            <input
              className="w-full p-[14px_16px] border border-slate-800 rounded-xl text-[0.95rem] transition-all bg-[#1f262e] text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#00d4ff] focus:ring-2 focus:ring-[#00d4ff]/20 disabled:bg-slate-800 disabled:opacity-70 disabled:cursor-not-allowed"
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

          <div className="mb-5">
            <label className="block mb-2 font-medium text-slate-400 text-sm" htmlFor="password">Password</label>
            <input
              className="w-full p-[14px_16px] border border-slate-800 rounded-xl text-[0.95rem] transition-all bg-[#1f262e] text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#00d4ff] focus:ring-2 focus:ring-[#00d4ff]/20 disabled:bg-slate-800 disabled:opacity-70 disabled:cursor-not-allowed"
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

          <button 
            type="submit" 
            className="w-full p-[14px_24px] bg-gradient-to-br from-[#00d4ff] to-[#0072ff] text-white border-none rounded-xl text-base font-semibold cursor-pointer mt-2 mb-6 transition-all shadow-[0_0_15px_rgba(0,212,255,0.3)] flex flex-row items-center justify-center gap-2 hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,212,255,0.4)] active:translate-y-0 disabled:bg-slate-700 disabled:cursor-not-allowed disabled:shadow-none disabled:text-slate-400" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="w-[18px] h-[18px] border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <p className="text-center text-slate-500 text-[0.85rem] font-medium m-0 mb-4 relative before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-[calc(50%-60px)] before:h-px before:bg-slate-800 after:content-[''] after:absolute after:top-1/2 after:right-0 after:w-[calc(50%-60px)] after:h-px after:bg-slate-800">
          or continue with
        </p>

        <div className="google-btn-wrapper mb-6">
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
            width="380"
            useOneTap
            onError={() => {
              setServerError("Google login failed. Please try again.");
            }}
          />
        </div>

        <p className="text-center text-slate-400 text-[0.9rem] m-0 mb-5">
          Don&apos;t have an account? <Link className="text-[#00d4ff] no-underline font-semibold transition-colors hover:text-[#0072ff] hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]" to="/register">Create account</Link>
        </p>

        {/* Terms Footer */}
        <div className="pt-5 border-t border-slate-800 text-center">
          <p className="text-[0.8rem] text-slate-500 m-0 leading-relaxed">
            By signing in, you agree to our{" "}
            <Link className="text-slate-400 no-underline font-medium transition-colors hover:text-[#00d4ff]" to="/terms">Terms of Service</Link> and{" "}
            <Link className="text-slate-400 no-underline font-medium transition-colors hover:text-[#00d4ff]" to="/privacy">Privacy Policy</Link>
          </p>
        </div>
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

export default Login;
