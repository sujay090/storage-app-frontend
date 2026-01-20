import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DirectoryHeader from "./components/DirectoryHeader";
import CreateDirectoryModal from "./components/CreateDirectoryModal";
import RenameModal from "./components/RenameModal";
import DetailsModal from "./components/DetailsModel";
import DirectoryList from "./components/DirectoryList";
import Breadcrumb from "./components/Breadcrumb";
import Toast from "./components/Toast";
import "./DirectoryView.css";

function DirectoryView() {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;
  const { dirId } = useParams();
  const navigate = useNavigate();

  // Displayed directory name
  const [directoryName, setDirectoryName] = useState("My Storage");

  // Lists of items
  const [directoriesList, setDirectoriesList] = useState([]);
  const [filesList, setFilesList] = useState([]);

  // Error state
  const [errorMessage, setErrorMessage] = useState("");

  // Modal states
  const [showCreateDirModal, setShowCreateDirModal] = useState(false);
  const [newDirname, setNewDirname] = useState("New Folder");

  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameType, setRenameType] = useState(null); // "directory" or "file"
  const [renameId, setRenameId] = useState(null);
  const [renameValue, setRenameValue] = useState("");

  // Details modal states
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Uploading states
  const fileInputRef = useRef(null);
  const [uploadXhrMap, setUploadXhrMap] = useState({}); // track XHR per item
  const [progressMap, setProgressMap] = useState({}); // track progress per item
  const [isUploading, setIsUploading] = useState(false); // indicates if an upload is in progress

  // Context menu
  const [activeContextMenu, setActiveContextMenu] = useState(null);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });

  // Storage refresh key - increment to trigger storage refetch in header
  const [storageRefreshKey, setStorageRefreshKey] = useState(0);

  // Toast messages
  const [successMessage, setSuccessMessage] = useState("");

  // Breadcrumb state
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [rootDirId, setRootDirId] = useState(null);

  // View mode state (list or grid)
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem("viewMode") || "list";
  });

  // Save view mode to localStorage
  const toggleViewMode = (mode) => {
    setViewMode(mode);
    localStorage.setItem("viewMode", mode);
  };

  /**
   * Utility: handle fetch errors
   */
  async function handleFetchErrors(response) {
    if (!response.ok) {
      let errMsg = `Request failed with status ${response.status}`;
      try {
        const data = await response.json();
        if (data.error) errMsg = data.error;
      } catch {
        // If JSON parsing fails, default errMsg stays
      }
      throw new Error(errMsg);
    }
    return response;
  }

  /**
   * Fetch directory contents
   */
  async function getDirectoryItems() {
    setErrorMessage(""); // clear any existing error
    try {
      const response = await fetch(`${BASE_URL}/directory/${dirId || ""}`, {
        credentials: "include",
      });

      if (response.status === 401) {
        navigate("/login");
        return;
      }

      await handleFetchErrors(response);
      const data = await response.json();

      // Set directory name
      setDirectoryName(dirId ? data.name : "My Storage");

      // Reverse directories and files so new items show on top
      setDirectoriesList([...data.directories].reverse());
      setFilesList([...data.files].reverse());

      // Set breadcrumb data
      if (data.breadcrumb && data.breadcrumb.length > 0) {
        setBreadcrumb(data.breadcrumb);
        setRootDirId(data.breadcrumb[0].id);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  useEffect(() => {
    getDirectoryItems();
    // Reset context menu
    setActiveContextMenu(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dirId]);

  /**
   * Decide file icon
   */
  function getFileIcon(filename) {
    const ext = filename.split(".").pop().toLowerCase();
    switch (ext) {
      case "pdf":
        return "pdf";
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
        return "image";
      case "mp4":
      case "mov":
      case "avi":
        return "video";
      case "zip":
      case "rar":
      case "tar":
      case "gz":
        return "archive";
      case "js":
      case "jsx":
      case "ts":
      case "tsx":
      case "html":
      case "css":
      case "py":
      case "java":
        return "code";
      default:
        return "alt";
    }
  }

  /**
   * Click row to open directory or file
   */
  function handleRowClick(type, id) {
    if (type === "directory") {
      navigate(`/directory/${id}`);
    } else {
      window.location.href = `${BASE_URL}/file/${id}`;
    }
  }

  /**
   * Select single file and upload immediately
   */
  async function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file || isUploading) return;
    e.target.value = "";

    const tempId = `temp-${Date.now()}`;

    // 1️⃣ Add temp file to UI
    setFilesList((prev) => [
      {
        _id: tempId,
        name: file.name,
        size: file.size,
        isDirectory: false,
        isUploading: true,
      },
      ...prev,
    ]);

    setProgressMap({ [tempId]: 0 });
    setIsUploading(true);

    let uploadUrl, fileId;

    // 2️⃣ Get presigned URL
    const initRes = await fetch(`${BASE_URL}/file/uploads/initiate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name: file.name,
        size: file.size,
        parentDirId: dirId || null,
        contentType: file.type,
      }),
    });

    const initData = await initRes.json();
    uploadUrl = initData.url;
    fileId = initData.fileId;

    // 3️⃣ Upload using XHR
    const xhr = new XMLHttpRequest();
    setUploadXhrMap({ [tempId]: xhr });

    xhr.open("PUT", uploadUrl, true);
    xhr.setRequestHeader("Content-Type", file.type);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        setProgressMap((prev) => ({ ...prev, [tempId]: percent }));
      }
    };

    xhr.onload = async () => {
      if (xhr.status !== 200) {
        setErrorMessage("Upload failed");
        setIsUploading(false);
        return;
      }

      // 4️⃣ Notify backend
      await fetch(`${BASE_URL}/file/uploads/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ fileId }),
      });

      // 5️⃣ Cleanup temp + refresh
      setFilesList((prev) => prev.filter((f) => f._id !== tempId));
      setProgressMap({});
      setUploadXhrMap({});
      setIsUploading(false);
      getDirectoryItems();
      setStorageRefreshKey((p) => p + 1);
      setSuccessMessage("File uploaded successfully!");
    };

    xhr.onerror = () => {
      setErrorMessage("Upload error");
      setIsUploading(false);
    };

    xhr.send(file);
  }

  // (processUploadQueue removed for single file upload)

  /**
   * Cancel an in-progress upload
   */
  function handleCancelUpload(fileId) {
    const xhr = uploadXhrMap[fileId];
    if (xhr) xhr.abort();

    setProgressMap({});
    setUploadXhrMap({});
    setIsUploading(false);
  }

  /**
   * Delete a file/directory
   */
  async function handleDeleteFile(id) {
    setErrorMessage("");
    try {
      const response = await fetch(`${BASE_URL}/file/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      await handleFetchErrors(response);
      getDirectoryItems();
      setStorageRefreshKey((prev) => prev + 1); // Refresh storage display
      setSuccessMessage("File deleted successfully!");
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  async function handleDeleteDirectory(id) {
    setErrorMessage("");
    try {
      const response = await fetch(`${BASE_URL}/directory/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      await handleFetchErrors(response);
      getDirectoryItems();
      setStorageRefreshKey((prev) => prev + 1); // Refresh storage display
      setSuccessMessage("Folder deleted successfully!");
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  /**
   * Create a directory
   */
  async function handleCreateDirectory(e) {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await fetch(`${BASE_URL}/directory/${dirId || ""}`, {
        method: "POST",
        headers: {
          dirname: newDirname,
        },
        credentials: "include",
      });
      await handleFetchErrors(response);
      setNewDirname("New Folder");
      setShowCreateDirModal(false);
      getDirectoryItems();
      setSuccessMessage("Folder created successfully!");
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  /**
   * Rename
   */
  function openRenameModal(type, id, currentName) {
    setRenameType(type);
    setRenameId(id);
    setRenameValue(currentName);
    setShowRenameModal(true);
  }

  /**
   * Open Details Modal
   */
  function openDetailsModal(type, id) {
    // Find the item from directoriesList or filesList
    let item;
    if (type === "directory") {
      item = directoriesList.find((d) => d._id === id);
    } else {
      item = filesList.find((f) => f._id === id);
    }

    if (item) {
      setSelectedItem({ ...item, isDirectory: type === "directory" });
      setShowDetailsModal(true);
    }
  }

  async function handleRenameSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    try {
      const url =
        renameType === "file"
          ? `${BASE_URL}/file/${renameId}`
          : `${BASE_URL}/directory/${renameId}`;
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          renameType === "file"
            ? { newFilename: renameValue }
            : { newDirName: renameValue },
        ),
        credentials: "include",
      });
      await handleFetchErrors(response);

      setShowRenameModal(false);
      setRenameValue("");
      setRenameType(null);
      setRenameId(null);
      getDirectoryItems();
      setSuccessMessage("Renamed successfully!");
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  /**
   * Context Menu
   */
  function handleContextMenu(e, id) {
    e.stopPropagation();
    e.preventDefault();
    // Get click position
    const clickX = e.clientX;
    const clickY = e.clientY;

    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Context menu approximate dimensions
    const menuWidth = 180;
    const menuHeight = 160;

    // Calculate position to keep menu in viewport
    let posX = clickX;
    let posY = clickY;

    // Adjust if menu would go off right edge
    if (clickX + menuWidth > viewportWidth) {
      posX = clickX - menuWidth;
    }

    // Adjust if menu would go off bottom edge
    if (clickY + menuHeight > viewportHeight) {
      posY = clickY - menuHeight;
    }

    if (activeContextMenu === id) {
      setActiveContextMenu(null);
    } else {
      setActiveContextMenu(id);
      setContextMenuPos({ x: posX, y: posY });
    }
  }

  useEffect(() => {
    function handleDocumentClick(e) {
      // Don't close if clicking on context menu or its trigger
      if (
        e.target.closest(".context-menu") ||
        e.target.closest(".context-menu-trigger") ||
        e.target.closest(".grid-menu-trigger")
      ) {
        return;
      }
      setActiveContextMenu(null);
    }
    // Use mousedown instead of click for better event handling
    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, []);

  // Combine directories & files into one list for rendering
  const combinedItems = [
    ...directoriesList.map((d) => ({ ...d, isDirectory: true })),
    ...filesList.map((f) => ({ ...f, isDirectory: false })),
  ];
  return (
    <div className="directory-view">
      {/* Toast notification for errors */}
      {errorMessage &&
        errorMessage !==
          "Directory not found or you do not have access to it!" && (
          <Toast
            message={errorMessage}
            type="error"
            duration={5000}
            onClose={() => setErrorMessage("")}
          />
        )}

      {/* Toast notification for success */}
      {successMessage && (
        <Toast
          message={successMessage}
          type="success"
          duration={4000}
          onClose={() => setSuccessMessage("")}
        />
      )}

      <DirectoryHeader
        onCreateFolderClick={() => setShowCreateDirModal(true)}
        onUploadFilesClick={() => fileInputRef.current.click()}
        fileInputRef={fileInputRef}
        handleFileSelect={handleFileSelect}
        refreshKey={storageRefreshKey}
        // Disable if the user doesn't have access
        disabled={
          errorMessage ===
          "Directory not found or you do not have access to it!"
        }
      />

      {/* Breadcrumb Navigation - Hidden on Desktop, Shown on Mobile */}
      <div className="mobile-breadcrumb">
        <Breadcrumb items={breadcrumb} rootDirId={rootDirId} />
      </div>

      {/* View Mode Toggle with Breadcrumb on Desktop */}
      <div className="view-toggle-bar">
        {/* Desktop Breadcrumb - Left side */}
        <div className="desktop-breadcrumb-toggle">
          <Breadcrumb items={breadcrumb} rootDirId={rootDirId} />
        </div>

        {/* Files count and view toggle - Right side */}
        <div className="toggle-right-section">
          <span className="files-count">
            {combinedItems.length}{" "}
            {combinedItems.length === 1 ? "item" : "items"}
          </span>
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === "list" ? "active" : ""}`}
              title="List View"
              onClick={() => toggleViewMode("list")}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <button
              className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
              title="Grid View"
              onClick={() => toggleViewMode("grid")}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Create Directory Modal */}
      {showCreateDirModal && (
        <CreateDirectoryModal
          newDirname={newDirname}
          setNewDirname={setNewDirname}
          onClose={() => setShowCreateDirModal(false)}
          onCreateDirectory={handleCreateDirectory}
        />
      )}

      {/* Rename Modal */}
      {showRenameModal && (
        <RenameModal
          renameType={renameType}
          renameValue={renameValue}
          setRenameValue={setRenameValue}
          onClose={() => setShowRenameModal(false)}
          onRenameSubmit={handleRenameSubmit}
        />
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedItem && (
        <DetailsModal
          item={selectedItem}
          isOpen={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedItem(null);
          }}
        />
      )}

      {combinedItems.length === 0 ? (
        // Check if the error is specifically the "no access" error
        errorMessage ===
        "Directory not found or you do not have access to it!" ? (
          <p className="no-data-message">
            Directory not found or you do not have access to it!
          </p>
        ) : (
          <p className="no-data-message">
            This folder is empty. Upload files or create a folder to see some
            data.
          </p>
        )
      ) : (
        <DirectoryList
          items={combinedItems}
          handleRowClick={handleRowClick}
          activeContextMenu={activeContextMenu}
          contextMenuPos={contextMenuPos}
          handleContextMenu={handleContextMenu}
          closeContextMenu={() => setActiveContextMenu(null)}
          getFileIcon={getFileIcon}
          isUploading={isUploading}
          progressMap={progressMap}
          handleCancelUpload={handleCancelUpload}
          handleDeleteFile={handleDeleteFile}
          handleDeleteDirectory={handleDeleteDirectory}
          openRenameModal={openRenameModal}
          openDetailsModal={openDetailsModal}
          BASE_URL={BASE_URL}
          viewMode={viewMode}
        />
      )}
    </div>
  );
}

export default DirectoryView;
