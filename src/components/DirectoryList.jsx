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
    <div className={`mt-2 sm:mt-4 ${viewMode === 'grid' ? 'grid gap-3 sm:gap-4 grid-cols-[repeat(auto-fill,minmax(100px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(120px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]' : 'flex flex-col gap-2 sm:gap-4'}`}>
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
