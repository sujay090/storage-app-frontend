import { BsThreeDotsVertical } from "react-icons/bs";
import ContextMenu from "../components/ContextMenu";

// Colorful file type icons using modern design
const FileIcons = {
  folder: (
    <div className="file-icon folder-icon-wrapper">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 6C2 4.89543 2.89543 4 4 4H9L11 6H20C21.1046 6 22 6.89543 22 8V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6Z" fill="url(#folder-gradient)"/>
        <defs>
          <linearGradient id="folder-gradient" x1="2" y1="4" x2="22" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FCD34D"/>
            <stop offset="1" stopColor="#F59E0B"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  ),
  pdf: (
    <div className="file-icon pdf-icon">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2H6Z" fill="url(#pdf-gradient)"/>
        <path d="M14 2V8H20" fill="#DC2626" fillOpacity="0.3"/>
        <text x="12" y="16" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">PDF</text>
        <defs>
          <linearGradient id="pdf-gradient" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EF4444"/>
            <stop offset="1" stopColor="#DC2626"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  ),
  image: (
    <div className="file-icon image-icon">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="url(#image-gradient)"/>
        <circle cx="8.5" cy="8.5" r="2" fill="white" fillOpacity="0.9"/>
        <path d="M21 15L16 10L6 21H18C19.6569 21 21 19.6569 21 18V15Z" fill="white" fillOpacity="0.4"/>
        <defs>
          <linearGradient id="image-gradient" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
            <stop stopColor="#10B981"/>
            <stop offset="1" stopColor="#059669"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  ),
  video: (
    <div className="file-icon video-icon">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="4" width="20" height="16" rx="3" fill="url(#video-gradient)"/>
        <path d="M10 8.5V15.5L16 12L10 8.5Z" fill="white"/>
        <defs>
          <linearGradient id="video-gradient" x1="2" y1="4" x2="22" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8B5CF6"/>
            <stop offset="1" stopColor="#7C3AED"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  ),
  audio: (
    <div className="file-icon audio-icon">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="url(#audio-gradient)"/>
        <circle cx="12" cy="12" r="4" fill="white"/>
        <circle cx="12" cy="12" r="1.5" fill="#EC4899"/>
        <defs>
          <linearGradient id="audio-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EC4899"/>
            <stop offset="1" stopColor="#DB2777"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  ),
  archive: (
    <div className="file-icon archive-icon">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4C4 2.89543 4.89543 2 6 2H18C19.1046 2 20 2.89543 20 4V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4Z" fill="url(#archive-gradient)"/>
        <rect x="10" y="2" width="4" height="2" fill="white" fillOpacity="0.5"/>
        <rect x="10" y="6" width="4" height="2" fill="white" fillOpacity="0.5"/>
        <rect x="10" y="10" width="4" height="2" fill="white" fillOpacity="0.5"/>
        <rect x="9" y="14" width="6" height="4" rx="1" fill="white" fillOpacity="0.8"/>
        <defs>
          <linearGradient id="archive-gradient" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F59E0B"/>
            <stop offset="1" stopColor="#D97706"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  ),
  code: (
    <div className="file-icon code-icon">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2H6Z" fill="url(#code-gradient)"/>
        <path d="M9 10L6 13L9 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 10L18 13L15 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 9L11 17" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <defs>
          <linearGradient id="code-gradient" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#06B6D4"/>
            <stop offset="1" stopColor="#0891B2"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  ),
  document: (
    <div className="file-icon document-icon">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2H6Z" fill="url(#doc-gradient)"/>
        <path d="M14 2V8H20" fill="#2563EB" fillOpacity="0.3"/>
        <path d="M8 13H16M8 17H13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <defs>
          <linearGradient id="doc-gradient" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3B82F6"/>
            <stop offset="1" stopColor="#2563EB"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  ),
  spreadsheet: (
    <div className="file-icon spreadsheet-icon">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2H6Z" fill="url(#sheet-gradient)"/>
        <rect x="7" y="10" width="4" height="3" fill="white" fillOpacity="0.8"/>
        <rect x="13" y="10" width="4" height="3" fill="white" fillOpacity="0.5"/>
        <rect x="7" y="15" width="4" height="3" fill="white" fillOpacity="0.5"/>
        <rect x="13" y="15" width="4" height="3" fill="white" fillOpacity="0.8"/>
        <defs>
          <linearGradient id="sheet-gradient" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#10B981"/>
            <stop offset="1" stopColor="#059669"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  ),
  default: (
    <div className="file-icon default-icon">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2H6Z" fill="url(#default-gradient)"/>
        <path d="M14 2V8H20" fill="#6366F1" fillOpacity="0.3"/>
        <defs>
          <linearGradient id="default-gradient" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6366F1"/>
            <stop offset="1" stopColor="#4F46E5"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  ),
};

// Helper function to format file size
function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function DirectoryItem({
  item,
  handleRowClick,
  activeContextMenu,
  contextMenuPos,
  handleContextMenu,
  closeContextMenu,
  getFileIcon,
  isUploading,
  uploadProgress,
  handleCancelUpload,
  handleDeleteFile,
  handleDeleteDirectory,
  openRenameModal,
  openDetailsModal,
  BASE_URL,
  viewMode = 'list',
}) {
  // unified id (IMPORTANT)
  const itemId = item._id || item.id;

  // temp upload detection (SAFE)
  const isUploadingItem =
    typeof itemId === "string" && itemId.startsWith("temp-");

  function renderFileIcon(iconString) {
    switch (iconString) {
      case "pdf":
        return FileIcons.pdf;
      case "image":
        return FileIcons.image;
      case "video":
        return FileIcons.video;
      case "audio":
        return FileIcons.audio;
      case "archive":
        return FileIcons.archive;
      case "code":
        return FileIcons.code;
      case "document":
        return FileIcons.document;
      case "spreadsheet":
        return FileIcons.spreadsheet;
      default:
        return FileIcons.default;
    }
  }

  // Grid view layout
  if (viewMode === 'grid') {
    return (
      <div
        className="grid-item"
        onClick={() =>
          !(activeContextMenu || isUploading)
            ? handleRowClick(item.isDirectory ? "directory" : "file", itemId)
            : null
        }
        onContextMenu={(e) => handleContextMenu(e, itemId)}
      >
        <div
          className="grid-menu-trigger"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleContextMenu(e, itemId);
          }}
        >
          <BsThreeDotsVertical />
        </div>
        
        <div className="grid-icon">
          {item.isDirectory ? FileIcons.folder : renderFileIcon(getFileIcon(item.name))}
        </div>
        
        <div className="grid-info">
          <span className="grid-name" title={item.name}>{item.name}</span>
          {item.size && <span className="grid-meta">{formatFileSize(item.size)}</span>}
        </div>

        {isUploadingItem && (
          <div className="grid-progress">
            <div
              className="grid-progress-bar"
              style={{
                width: `${uploadProgress || 0}%`,
                backgroundColor: uploadProgress === 100 ? "#039203" : "#007bff",
              }}
            />
          </div>
        )}

        {activeContextMenu === itemId && (
          <ContextMenu
            item={item}
            contextMenuPos={contextMenuPos}
            isUploadingItem={isUploadingItem}
            handleCancelUpload={handleCancelUpload}
            handleDeleteFile={handleDeleteFile}
            handleDeleteDirectory={handleDeleteDirectory}
            openRenameModal={openRenameModal}
            openDetailsModal={openDetailsModal}
            BASE_URL={BASE_URL}
            closeMenu={closeContextMenu}
          />
        )}
      </div>
    );
  }

  // List view layout (default)
  return (
    <div
      className="list-item hoverable-row"
      onClick={(e) => {
        // Don't navigate if clicking on context menu trigger
        if (e.target.closest('.context-menu-trigger')) {
          return;
        }
        if (!(activeContextMenu || isUploading)) {
          handleRowClick(item.isDirectory ? "directory" : "file", itemId);
        }
      }}
      onContextMenu={(e) => handleContextMenu(e, itemId)}
    >
      <div className="item-left-container">
        <div className="item-left">
          {item.isDirectory ? (
            FileIcons.folder
          ) : (
            renderFileIcon(getFileIcon(item.name))
          )}
          <div className="item-info">
            <span className="item-name">{item.name}</span>
            {item.size && <span className="item-meta">{formatFileSize(item.size)}</span>}
          </div>
        </div>

        <div
          className="context-menu-trigger"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
              handleContextMenu(e, itemId);
          }}
        >
          <BsThreeDotsVertical />
        </div>
      </div>

      {isUploadingItem && (
        <div className="progress-container">
          <span className="progress-value">
            {Math.floor(uploadProgress || 0)}%
          </span>
          <div
            className="progress-bar"
            style={{
              width: `${uploadProgress || 0}%`,
              backgroundColor:
                uploadProgress === 100 ? "#039203" : "#007bff",
            }}
          />
        </div>
      )}

      {activeContextMenu === itemId && (
        <ContextMenu
          item={item}
          contextMenuPos={contextMenuPos}
          isUploadingItem={isUploadingItem}
          handleCancelUpload={handleCancelUpload}
          handleDeleteFile={handleDeleteFile}
          handleDeleteDirectory={handleDeleteDirectory}
          openRenameModal={openRenameModal}
          openDetailsModal={openDetailsModal}
          BASE_URL={BASE_URL}
          closeMenu={closeContextMenu}
        />
      )}
    </div>
  );
}

export default DirectoryItem;
