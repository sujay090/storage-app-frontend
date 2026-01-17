import React from 'react';
import './DetailsModel.css';

const DetailsModal = ({ item, isOpen, onClose }) => {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;
  
  if (!isOpen || !item) return null;

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 KB';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    
    const formattedDate = date.toLocaleDateString('en-US', dateOptions);
    const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
    
    return (
      <div className="date-time">
        <div className="date">{formattedDate}</div>
        <div className="time">{formattedTime}</div>
      </div>
    );
  };

  return (
    <div className="details-modal-overlay" onClick={onClose}>
      <div className="details-modal" onClick={(e) => e.stopPropagation()}>
        <div className="details-header">
          <h3>{item.isDirectory ? '📁 Folder Details' : '📄 File Details'}</h3>
          <button className="details-close" onClick={onClose}>×</button>
        </div>

        <div className="details-content">
          <div className="details-grid">
            <div className="detail-row">
              <span className="detail-label">Name</span>
              <span className="detail-value">{item.name}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Location</span>
              <span className="detail-value detail-path">{item.path || '/'}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Size</span>
              <span className="detail-value">{formatFileSize(item.size)}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Created</span>
              {formatDate(item.createdAt)}
            </div>

            <div className="detail-row">
              <span className="detail-label">Modified</span>
              {formatDate(item.updatedAt)}
            </div>

            {!item.isDirectory && item.extension && (
              <div className="detail-row">
                <span className="detail-label">Type</span>
                <span className="detail-value">{item.extension.replace('.', '').toUpperCase()} File</span>
              </div>
            )}
          </div>
        </div>

        <div className="details-footer">
          <button className="btn-close" onClick={onClose}>Close</button>
          {!item.isDirectory && (
            <button 
              className="btn-download"
              onClick={() => window.location.href = `${BASE_URL}/file/${item._id}?action=download`}
            >
              Download
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
