import DirectoryItem from "./DirectoryItem";

function DirectoryList({
  items,
  handleRowClick,
  activeContextMenu,
  contextMenuPos,
  handleContextMenu,
  closeContextMenu,
  getFileIcon,
  isUploading,
  progressMap,
  handleCancelUpload,
  handleDeleteFile,
  handleDeleteDirectory,
  openRenameModal,
  openDetailsModal,
  BASE_URL,
  viewMode = 'list',
}) {
  return (
    <div className={`directory-list ${viewMode === 'grid' ? 'grid-view' : 'list-view'}`}>
      {items.map((item) => {
        const itemId = item._id || item.id;
        const uploadProgress = progressMap[itemId] || 0;

        return (
          <DirectoryItem
            key={itemId}
            item={item}
            itemId={itemId}
            handleRowClick={handleRowClick}
            activeContextMenu={activeContextMenu}
            contextMenuPos={contextMenuPos}
            handleContextMenu={handleContextMenu}
            closeContextMenu={closeContextMenu}
            getFileIcon={getFileIcon}
            isUploading={isUploading}
            uploadProgress={uploadProgress}
            handleCancelUpload={handleCancelUpload}
            handleDeleteFile={handleDeleteFile}
            handleDeleteDirectory={handleDeleteDirectory}
            openRenameModal={openRenameModal}
            openDetailsModal={openDetailsModal}
            BASE_URL={BASE_URL}
            viewMode={viewMode}
          />
        );
      })}
    </div>
  );
}

export default DirectoryList;
