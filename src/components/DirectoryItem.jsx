import {
  FaFolder,
  FaFilePdf,
  FaFileImage,
  FaFileVideo,
  FaFileArchive,
  FaFileCode,
  FaFileAlt,
} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import ContextMenu from "../components/ContextMenu";

function DirectoryItem({
  item,
  handleRowClick,
  activeContextMenu,
  contextMenuPos,
  handleContextMenu,
  getFileIcon,
  isUploading,
  uploadProgress,
  handleCancelUpload,
  handleDeleteFile,
  handleDeleteDirectory,
  openRenameModal,
  openDetailsModal,
  BASE_URL,
}) {
  // unified id (IMPORTANT)
  const itemId = item._id || item.id;

  // temp upload detection (SAFE)
  const isUploadingItem =
    typeof itemId === "string" && itemId.startsWith("temp-");

  function renderFileIcon(iconString) {
    switch (iconString) {
      case "pdf":
        return <FaFilePdf />;
      case "image":
        return <FaFileImage />;
      case "video":
        return <FaFileVideo />;
      case "archive":
        return <FaFileArchive />;
      case "code":
        return <FaFileCode />;
      default:
        return <FaFileAlt />;
    }
  }

  return (
    <div
      className="list-item hoverable-row"
      onClick={() =>
        !(activeContextMenu || isUploading)
          ? handleRowClick(item.isDirectory ? "directory" : "file", itemId)
          : null
      }
      onContextMenu={(e) => handleContextMenu(e, itemId)}
    >
      <div className="item-left-container">
        <div className="item-left">
          {item.isDirectory ? (
            <FaFolder className="folder-icon" />
          ) : (
            renderFileIcon(getFileIcon(item.name))
          )}
          <span>{item.name}</span>
        </div>

        <div
          className="context-menu-trigger"
          onClick={(e) => handleContextMenu(e, itemId)}
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
        />
      )}
    </div>
  );
}

export default DirectoryItem;
