import DirectoryItem from "./DirectoryItem";

function DirectoryList({
  items,
  handleRowClick,
  activeContextMenu,
  contextMenuPos,
  handleContextMenu,
  getFileIcon,
  isUploading,
  progressMap,
  handleCancelUpload,
  handleDeleteFile,
  handleDeleteDirectory,
  openRenameModal,
  openDetailsModal,
  BASE_URL,
}) {
  return (
    <div className="directory-list">
      {items.map((item) => {
        const itemId = item._id || item.id; // ✅ FIX
        const uploadProgress = progressMap[itemId] || 0;

        return (
          <DirectoryItem
            key={itemId}               // ✅ FIX
            item={item}
            itemId={itemId}            // ✅ pass explicitly (recommended)
            handleRowClick={handleRowClick}
            activeContextMenu={activeContextMenu}
            contextMenuPos={contextMenuPos}
            handleContextMenu={handleContextMenu}
            getFileIcon={getFileIcon}
            isUploading={isUploading}
            uploadProgress={uploadProgress}
            handleCancelUpload={handleCancelUpload}
            handleDeleteFile={handleDeleteFile}
            handleDeleteDirectory={handleDeleteDirectory}
            openRenameModal={openRenameModal}
            openDetailsModal={openDetailsModal}
            BASE_URL={BASE_URL}
          />
        );
      })}
    </div>
  );
}

export default DirectoryList;
