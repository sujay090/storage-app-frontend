const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const REDIRECT_URI = `http://localhost:5174/google-drive/callback`;
const SCOPES = "https://www.googleapis.com/auth/drive.readonly";

const ConnectionAppList = () => {
    const handleGoogleDriveConnect = () => {
        const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
        authUrl.searchParams.set("client_id", GOOGLE_CLIENT_ID);
        authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
        authUrl.searchParams.set("response_type", "code");
        authUrl.searchParams.set("scope", SCOPES);
        authUrl.searchParams.set("access_type", "offline");
        authUrl.searchParams.set("prompt", "consent");

        // Open in a popup window
        window.open(authUrl.toString(), "GoogleDriveAuth", "width=600,height=700,resizable=yes,scrollbars=yes");
    };

    return (
        <div className="absolute top-full right-0 pt-3 z-50">
            <div className="bg-[var(--bg-panel)] border border-[var(--border-subtle)] rounded-xl p-4 shadow-[var(--shadow-lg)] whitespace-nowrap flex flex-col items-center gap-3">
                <span className="text-xs font-semibold text-[var(--text-dim)] uppercase tracking-wider mb-1">
                    Connect Apps
                </span>

                <div className="flex flex-row gap-2.5 justify-center">
                    <button 
                        title="Google Drive"
                        onClick={handleGoogleDriveConnect}
                        className="flex items-center justify-center p-2.5 bg-transparent border-none rounded-full cursor-pointer transition-all hover:bg-[#1f262e] active:scale-[0.92]"
                    >
                        <img src="/drive.png" alt="Google Drive" className="w-9 h-9 object-cover rounded-full" />
                    </button>
                    {/* Add more app buttons here side by side as needed */}
                </div>
            </div>
        </div>
    )
}

export default ConnectionAppList;