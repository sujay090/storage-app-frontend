import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { exchangeAuthCode } from "../apis/googleDrive.api";

const GoogleDriveCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("connecting");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      setStatus("error");
      setErrorMessage("Google Drive authorization was cancelled or denied.");
      return;
    }

    if (!code) {
      setStatus("error");
      setErrorMessage("No authorization code received from Google.");
      return;
    }

    // Exchange the auth code for tokens
    const handleAuth = async () => {
      try {
        await exchangeAuthCode(code);
        setStatus("success");

        // If opened as popup, navigate parent window and close popup
        if (window.opener) {
          window.opener.location.href = "/google-drive/picker";
          setTimeout(() => window.close(), 1500);
        } else {
          // Navigate to the Drive picker
          setTimeout(() => navigate("/google-drive/picker"), 1500);
        }
      } catch (err) {
        setStatus("error");
        setErrorMessage(
          err.error || err.message || "Failed to connect Google Drive. Please try again."
        );
      }
    };

    handleAuth();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_center,_#1f2933_0%,_#0b0e11_100%)] p-4 font-sans">
      <div className="bg-[#15191e]/80 backdrop-blur-xl p-10 border border-slate-800 rounded-3xl shadow-2xl w-full max-w-[420px] text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {status === "connecting" && (
          <>
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00d4ff]/20 to-[#0072ff]/20 flex items-center justify-center">
                <div className="w-10 h-10 border-[3px] border-[#00d4ff]/30 border-t-[#00d4ff] rounded-full animate-spin" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-100 mb-2">Connecting Google Drive</h2>
            <p className="text-slate-400 text-sm">Please wait while we authorize your account...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-100 mb-2">Connected Successfully!</h2>
            <p className="text-slate-400 text-sm">
              {window.opener 
                ? "This window will close automatically..." 
                : "Redirecting to your Drive files..."}
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-100 mb-2">Connection Failed</h2>
            <p className="text-red-400 text-sm mb-6">{errorMessage}</p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-gradient-to-br from-[#00d4ff] to-[#0072ff] text-white border-none rounded-xl text-sm font-semibold cursor-pointer transition-all shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:brightness-110 hover:-translate-y-0.5"
            >
              Back to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GoogleDriveCallback;
