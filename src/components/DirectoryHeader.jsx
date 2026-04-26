import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaFolderPlus,
    FaUpload,
    FaSignOutAlt,
    FaSignInAlt,
    FaCloud,
} from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import ConnectWithOtherApp from "./ConnectWithOtherApp";
function DirectoryHeader({
    onCreateFolderClick,
    onUploadFilesClick,
    fileInputRef,
    handleFileSelect,
    disabled = false,
    refreshKey = 0, // When this changes, refetch user/storage data
}) {
    // Use a constant for the API base URL
    const BASE_URL = import.meta.env.VITE_SERVER_URL;

    const [showUserMenu, setShowUserMenu] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName] = useState("Guest User");
    const [userEmail, setUserEmail] = useState("guest@example.com");
    const [userPic, setUserPic] = useState(
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
    );

    // Storage state
    const [maxStorageInBytes, setMaxStorageInBytes] = useState(
        1 * 1024 * 1024 * 1024,
    ); // 1 GB default
    const [usedStorageInBytes, setUsedStorageInBytes] = useState(0);

    const userMenuRef = useRef(null);
    const navigate = useNavigate();

    // Helper to format bytes to human readable format
    const formatStorage = (bytes) => {
        if (bytes < 1024) {
            return `${bytes} B`;
        } else if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(2)} KB`;
        } else if (bytes < 1024 * 1024 * 1024) {
            return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
        } else {
            return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
        }
    };

    // Format max storage (always show in GB)
    const formatMaxStorage = (bytes) => {
        return `${(bytes / (1024 * 1024 * 1024)).toFixed(0)} GB`;
    };

    // Calculate percentage used
    const percentUsed =
        maxStorageInBytes > 0
            ? Math.min(
                100,
                Math.round((usedStorageInBytes / maxStorageInBytes) * 100),
            )
            : 0;

    // -------------------------------------------
    // 1. Fetch user info from /user on mount
    // -------------------------------------------
    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(`${BASE_URL}/user`, {
                    credentials: "include",
                });
                if (response.ok) {
                    const user = await response.json();
                    setUserName(user.name);
                    setUserEmail(user.email);
                    setUserPic(user.picture);
                    setMaxStorageInBytes(
                        user.maxStorageInBytes || 1 * 1024 * 1024 * 1024,
                    );
                    setUsedStorageInBytes(user.usedStorageInBytes || 0);
                    setLoggedIn(true);
                } else if (response.status === 401) {
                    // User not logged in
                    setUserName("Guest User");
                    setUserEmail("guest@example.com");
                    setUserPic("");
                    setLoggedIn(false);
                } else {
                    // Handle other error statuses if needed
                    console.error("Error fetching user info:", response.status);
                }
            } catch (err) {
                console.error("Error fetching user info:", err);
            }
        }
        fetchUser();
    }, [BASE_URL, refreshKey]); // Refetch when refreshKey changes

    // -------------------------------------------
    // 2. Toggle user menu
    // -------------------------------------------
    const handleUserIconClick = () => {
        setShowUserMenu((prev) => !prev);
    };

    // -------------------------------------------
    // 3. Logout handler
    // -------------------------------------------
    const handleLogout = async () => {
        try {
            const response = await fetch(`${BASE_URL}/user/logout`, {
                method: "POST",
                credentials: "include",
            });
            if (response.ok) {
                console.log("Logged out successfully");
                // Optionally reset local state
                setLoggedIn(false);
                setUserName("Guest User");
                setUserEmail("guest@example.com");
                navigate("/login");
            } else {
                console.error("Logout failed");
            }
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            setShowUserMenu(false);
        }
    };

    // all logout
    const handleLogoutAll = async () => {
        try {
            const response = await fetch(`${BASE_URL}/user/logout-all`, {
                method: "POST",
                credentials: "include",
            });
            if (response.ok) {
                console.log("Logged out all successfully");
                // Optionally reset local state
                setLoggedIn(false);
                setUserName("Guest User");
                setUserEmail("guest@example.com");
                navigate("/login");
            } else {
                console.error("Logout failed");
            }
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            setShowUserMenu(false);
        }
    };
    // -------------------------------------------
    // 4. Close menu on outside click
    // -------------------------------------------
    useEffect(() => {
        function handleDocumentClick(e) {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setShowUserMenu(false);
            }
        }
        document.addEventListener("mousedown", handleDocumentClick);
        return () => {
            document.removeEventListener("mousedown", handleDocumentClick);
        };
    }, []);

    return (
        <header className="flex flex-wrap items-center text-[var(--text-main)] justify-between p-3 sm:p-4 md:p-6 bg-[var(--bg-panel)] border border-[var(--border-subtle)] rounded-lg shadow-[var(--shadow-md)] mb-3 sm:mb-6 sticky top-2 sm:top-5 z-[90]">
            {/* Left Side - Brand Only */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 shrink-0 max-md:gap-0">
                    {/* Mobile: Only logo */}
                    <div className="md:hidden w-8 h-8 bg-gradient-to-br from-[#00d4ff] to-[#0072ff] rounded-md flex items-center justify-center shadow-[var(--shadow-glow)]">
                        <FaCloud className="text-white text-base" />
                    </div>
                    {/* Desktop: Only text name */}
                    <h1 className="hidden md:block font-['Outfit'] text-[1.1rem] font-bold text-[var(--text-main)] tracking-[-0.5px] m-0 drop-shadow-[0_0_12px_rgba(0,212,255,0.6)]">IronCloud</h1>
                </div>
            </div>

            {/* Right Side - Actions + User Menu */}
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4 ml-auto">
                <ConnectWithOtherApp />
                <ThemeToggle />

                {/* Create Folder (icon button) */}
                <button
                    className="flex bg-[var(--bg-surface)] text-[var(--text-muted)] w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-md items-center justify-center text-[1rem] sm:text-[1.1rem] transition-all border border-[var(--border-subtle)] hover:bg-[#00d4ff] hover:text-white hover:border-[#00d4ff] hover:shadow-[0_0_10px_rgba(0,212,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Create Folder"
                    onClick={onCreateFolderClick}
                    disabled={disabled}
                >
                    <FaFolderPlus />
                </button>
                {/* Upload Files (icon button) */}
                <button
                    className="flex bg-[var(--bg-surface)] text-[var(--text-muted)] w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-md items-center justify-center text-[1rem] sm:text-[1.1rem] transition-all border border-[var(--border-subtle)] hover:bg-[#00d4ff] hover:text-white hover:border-[#00d4ff] hover:shadow-[0_0_10px_rgba(0,212,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Upload Files"
                    onClick={onUploadFilesClick}
                    disabled={disabled}
                >
                    <FaUpload />
                </button>

                {/* Hidden file input */}
                <input
                    ref={fileInputRef}
                    id="file-upload"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileSelect}
                />

                {/* User Icon & Dropdown Menu */}
                <div className="relative" ref={userMenuRef}>
                    <button
                        className="flex bg-[var(--bg-surface)] text-[var(--text-muted)] w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-md items-center justify-center text-[1rem] sm:text-[1.1rem] transition-all border border-[var(--border-subtle)] hover:border-[#00d4ff] disabled:opacity-50 disabled:cursor-not-allowed p-0 overflow-hidden"
                        title="User Menu"
                        onClick={handleUserIconClick}
                    >
                        <img
                            className="w-full h-full object-cover"
                            src={userPic}
                            alt="user-icon"
                            referrerPolicy="no-referrer"
                            crossOrigin="anonymous"
                        />
                    </button>

                    {showUserMenu && (
                        <div className="absolute top-[44px] sm:top-[50px] right-0 w-[calc(100vw-32px)] sm:w-[280px] max-w-[280px] bg-[var(--bg-panel)] border border-[var(--border-subtle)] rounded-lg shadow-[var(--shadow-lg)] p-3 sm:p-4 z-[100] animate-in fade-in slide-in-from-top-2">
                            {loggedIn ? (
                                <>
                                    {/* Display name & email if logged in */}
                                    <div className="flex flex-col items-start mb-4 bg-[var(--bg-surface)] p-4 pointer-events-none rounded-md">
                                        <span className="font-semibold text-[var(--text-main)] text-base">{userName}</span>
                                        <span className="text-[0.85rem] text-[var(--text-muted)]">{userEmail}</span>
                                    </div>
                                    <div className="mb-4">
                                        <div className="flex justify-between mb-[6px]">
                                            <div className="text-[0.75rem] text-[var(--text-dim)]">
                                                {formatStorage(usedStorageInBytes)} of{" "}
                                                {formatMaxStorage(maxStorageInBytes)} used
                                            </div>
                                        </div>

                                        <div className="h-[6px] bg-[#0f172a] rounded-full overflow-hidden relative">
                                            <div
                                                className="h-full rounded-full transition-all duration-300"
                                                style={{ 
                                                    width: `${Math.max(0, Math.min(100, percentUsed))}%`,
                                                    background: `linear-gradient(to right, #00d4ff, #0072ff)`
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="h-px bg-[var(--border-subtle)] my-2" />
                                    {/* get more storage redirect link */}
                                    <div
                                        className="px-4 py-2 cursor-pointer text-[var(--text-muted)] font-medium hover:bg-[var(--bg-surface)] hover:text-[#00d4ff] rounded-md transition-colors flex items-center gap-[10px]"
                                        onClick={() => {
                                            navigate("/plans");
                                            setShowUserMenu(false);
                                        }}
                                    >
                                        <span>Get More Storage</span>
                                    </div>
                                    <div
                                        className="px-4 py-2 cursor-pointer text-slate-400 font-medium hover:bg-[#1e293b] hover:text-[#00d4ff] rounded-md transition-colors flex items-center gap-[10px]"
                                        onClick={handleLogout}
                                    >
                                        <FaSignOutAlt className="text-[1rem]" />
                                        <span>Logout</span>
                                    </div>
                                    <div
                                        className="px-4 py-2 cursor-pointer text-slate-400 font-medium hover:bg-[#1e293b] hover:text-[#00d4ff] rounded-md transition-colors flex items-center gap-[10px]"
                                        onClick={handleLogoutAll}
                                    >
                                        <FaSignOutAlt className="text-[1rem]" />
                                        <span>Logout All</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Show Login if not logged in */}
                                    <div
                                        className="px-4 py-2 cursor-pointer text-[var(--text-muted)] font-medium hover:bg-[var(--bg-surface)] hover:text-[#00d4ff] rounded-md transition-colors flex items-center gap-[10px]"
                                        onClick={() => {
                                            navigate("/login");
                                            setShowUserMenu(false);
                                        }}
                                    >
                                        <FaSignInAlt className="text-[1rem]" />
                                        <span>Login</span>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default DirectoryHeader;
