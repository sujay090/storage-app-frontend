import { createPortal } from 'react-dom';

// Custom SVG Icons for Context Menu
const DetailsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="detailsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="18" height="18" rx="3" stroke="url(#detailsGrad)" strokeWidth="2" fill="none"/>
    <path d="M7 8h10M7 12h10M7 16h6" stroke="url(#detailsGrad)" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const RenameIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="renameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#ef4444" />
      </linearGradient>
    </defs>
    <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" stroke="url(#renameGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const DeleteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="deleteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
    </defs>
    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z" stroke="url(#deleteGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M10 11v6M14 11v6" stroke="url(#deleteGrad)" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="downloadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="url(#downloadGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <polyline points="7 10 12 15 17 10" stroke="url(#downloadGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <line x1="12" y1="15" x2="12" y2="3" stroke="url(#downloadGrad)" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const CancelIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="cancelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ef4444" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" stroke="url(#cancelGrad)" strokeWidth="2" fill="none"/>
    <path d="M15 9l-6 6M9 9l6 6" stroke="url(#cancelGrad)" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

function ContextMenu({
  item,
  contextMenuPos,
  isUploadingItem,
  handleCancelUpload,
  handleDeleteFile,
  handleDeleteDirectory,
  openRenameModal,
  openDetailsModal,
  BASE_URL,
  closeMenu = () => {},
}) {
  const itemId = item._id || item.id;
  
  const handleClick = (e, callback) => {
    e.stopPropagation();
    callback();
    closeMenu(); // Close menu after action
  };

  const menuContent = (
    <div
      className="context-menu"
      style={{ 
        position: 'fixed',
        top: `${contextMenuPos.y}px`, 
        left: `${contextMenuPos.x}px`,
        zIndex: 99999
      }}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {item.isDirectory ? (
        <>
          <div
            className="context-menu-item"
            onClick={(e) => handleClick(e, () => openDetailsModal("directory", itemId))}
          >
            <DetailsIcon /> Details
          </div>
          <div
            className="context-menu-item"
            onClick={(e) => handleClick(e, () => openRenameModal("directory", itemId, item.name))}
          >
            <RenameIcon /> Rename
          </div>
          <div
            className="context-menu-item danger"
            onClick={(e) => handleClick(e, () => handleDeleteDirectory(itemId))}
          >
            <DeleteIcon /> Delete
          </div>
        </>
      ) : isUploadingItem && item.isUploading ? (
        <div
          className="context-menu-item"
          onClick={(e) => handleClick(e, () => handleCancelUpload(itemId))}
        >
          <CancelIcon /> Cancel
        </div>
      ) : (
        <>
          <div 
            className="context-menu-item"
            onClick={(e) => handleClick(e, () => openDetailsModal("file", itemId))}
          >
            <DetailsIcon /> Details
          </div>
          <div
            className="context-menu-item"
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `${BASE_URL}/file/${itemId}?action=download`;
              closeMenu();
            }}
          >
            <DownloadIcon /> Download
          </div>
          <div
            className="context-menu-item"
            onClick={(e) => handleClick(e, () => openRenameModal("file", itemId, item.name))}
          >
            <RenameIcon /> Rename
          </div>
          <div
            className="context-menu-item danger"
            onClick={(e) => handleClick(e, () => handleDeleteFile(itemId))}
          >
            <DeleteIcon /> Delete
          </div>
        </>
      )}
    </div>
  );

  // Use portal to render menu at document body level
  return createPortal(menuContent, document.body);
}

export default ContextMenu;
