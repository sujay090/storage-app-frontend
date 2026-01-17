import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFolderPlus,
  FaUpload,
  FaSignOutAlt,
  FaSignInAlt,
  FaThList,
  FaTh,
} from "react-icons/fa";
import "./DirectoryHeader.css";
function DirectoryHeader({
  directoryName,
  onCreateFolderClick,
  onUploadFilesClick,
  fileInputRef,
  handleFileSelect,
  disabled = false,
  refreshKey = 0, // When this changes, refetch user/storage data
  viewMode = 'list',
  toggleViewMode = () => {},
}) {
  // Use a constant for the API base URL
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest User");
  const [userEmail, setUserEmail] = useState("guest@example.com");
  const [userPic, setUserPic] = useState("https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=");
  
  // Storage state
  const [maxStorageInBytes, setMaxStorageInBytes] = useState(1 * 1024 * 1024 * 1024); // 1 GB default
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
  const percentUsed = maxStorageInBytes > 0 
    ? Math.min(100, Math.round((usedStorageInBytes / maxStorageInBytes) * 100)) 
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
          setMaxStorageInBytes(user.maxStorageInBytes || 1 * 1024 * 1024 * 1024);
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
  }
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
    <header className="directory-header">
      <h1>{directoryName}</h1>
      <div className="header-links">
        {/* View Mode Toggle */}
        <div className="view-toggle">
          <button
            className={`icon-button view-btn ${viewMode === 'list' ? 'active' : ''}`}
            title="List View"
            onClick={() => toggleViewMode('list')}
          >
            <FaThList />
          </button>
          <button
            className={`icon-button view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            title="Grid View"
            onClick={() => toggleViewMode('grid')}
          >
            <FaTh />
          </button>
        </div>

        <div className="header-divider"></div>

        {/* Create Folder (icon button) */}
        <button
          className="icon-button"
          title="Create Folder"
          onClick={onCreateFolderClick}
          disabled={disabled}
        >
          <FaFolderPlus />
        </button>

        {/* Upload Files (icon button) */}
        <button
          className="icon-button"
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
        <div className="user-menu-container" ref={userMenuRef}>
          <button
            className="icon-button"
            title="User Menu"
            onClick={handleUserIconClick}
          >
            <img
              style={{ height: "40px", borderRadius: "20px" }}
              src={userPic} alt="user-icon"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous" />
          </button>

          {showUserMenu && (
            <div className="user-menu">
              {loggedIn ? (
                <>
                  {/* Display name & email if logged in */}
                  <div className="user-menu-item user-info">
                    <span className="user-name">{userName}</span>
                    <span className="user-email">{userEmail}</span>
                  </div>
                  <div className="storage-limit">
                    <div className="storage-info">
                      <div className="storage-text">{formatStorage(usedStorageInBytes)} of {formatMaxStorage(maxStorageInBytes)} used</div>
                    </div>

                    <div className="storage-slider">
                      <input
                        type="range"
                        className="slider"
                        min={0}
                        max={100}
                        value={percentUsed}
                        readOnly
                        style={{ '--value': `${percentUsed}` }}
                      />
                    </div>
                  </div>
                  <div className="user-menu-divider" />
                  {/* get more storage redirect link */}
                  <div
                    className="user-menu-item login-btn"
                    onClick={() => {
                      navigate("/plans");
                      setShowUserMenu(false);
                    }}
                  >
                    <span>Get More Storage</span>
                  </div>
                  <div
                    className="user-menu-item login-btn"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="menu-item-icon" />
                    <span>Logout</span>
                  </div>
                  <div
                    className="user-menu-item login-btn"
                    onClick={handleLogoutAll}
                  >
                    <FaSignOutAlt className="menu-item-icon" />
                    <span>Logout All</span>
                  </div>
                </>
              ) : (
                <>
                  {/* Show Login if not logged in */}
                  <div
                    className="user-menu-item login-btn"
                    onClick={() => {
                      navigate("/login");
                      setShowUserMenu(false);
                    }}
                  >
                    <FaSignInAlt className="menu-item-icon" />
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
