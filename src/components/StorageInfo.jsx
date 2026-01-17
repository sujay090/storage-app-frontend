import React, { useState, useEffect } from 'react';
import { getStorageInfo } from '../apis/storage.api.js';
import './StorageInfo.css';

const StorageInfo = () => {
  const [storageInfo, setStorageInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStorageInfo();
  }, []);

  const fetchStorageInfo = async () => {
    try {
      setLoading(true);
      const data = await getStorageInfo();
      setStorageInfo(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch storage info:', err);
      setError(err.error || 'Failed to load storage information');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="storage-info-card">
        <div className="loading">Loading storage info...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="storage-info-card">
        <div className="error">{error}</div>
        <button onClick={fetchStorageInfo} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  if (!storageInfo) {
    return null;
  }

  const { subscription, usagePercentage, storageUsedGB, storageLimitGB, storageAvailableGB, isFreeUser } = storageInfo;

  const getUsageColor = (percentage) => {
    if (percentage < 50) return '#4caf50';
    if (percentage < 80) return '#ff9800';
    return '#f44336';
  };

  return (
    <div className="storage-info-card">
      <div className="storage-header">
        <h3>💾 Storage Usage</h3>
        {subscription && (
          <span className={`plan-badge ${isFreeUser ? 'free-plan' : ''}`}>
            {subscription.planName}
          </span>
        )}
      </div>

      <div className="storage-usage">
        <div className="usage-bar-container">
          <div 
            className="usage-bar"
            style={{
              width: `${Math.min(usagePercentage, 100)}%`,
              backgroundColor: getUsageColor(usagePercentage)
            }}
          ></div>
        </div>
        <div className="usage-text">
          {usagePercentage}% used ({storageUsedGB}GB of {storageLimitGB}GB)
        </div>
      </div>

      <div className="storage-details">
        <div className="detail-item">
          <span className="detail-label">Used:</span>
          <span className="detail-value">{storageUsedGB} GB</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Available:</span>
          <span className="detail-value">{storageAvailableGB} GB</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Total:</span>
          <span className="detail-value">{storageLimitGB} GB</span>
        </div>
      </div>

      {subscription && !isFreeUser && (
        <div className="subscription-info">
          <div className="subscription-status">
            <span className="status-dot active"></span>
            <span>Active Subscription</span>
          </div>
          {subscription.nextBillingDate && (
            <div className="next-billing">
              Next billing: {new Date(subscription.nextBillingDate).toLocaleDateString()}
            </div>
          )}
        </div>
      )}

      {isFreeUser && (
        <div className="free-user-info">
          <div className="free-status">
            <span className="status-dot free"></span>
            <span>Free Plan (1GB)</span>
          </div>
          {usagePercentage > 80 && (
            <div className="upgrade-prompt">
              <p>⚠️ Running low on storage space!</p>
              <button 
                className="upgrade-btn"
                onClick={() => window.location.href = '/plans'}
              >
                Upgrade for More Storage
              </button>
            </div>
          )}
        </div>
      )}

      {isFreeUser && usagePercentage <= 80 && (
        <div className="upgrade-prompt">
          <p>📈 Need more storage?</p>
          <button 
            className="upgrade-btn secondary"
            onClick={() => window.location.href = '/plans'}
          >
            View Premium Plans
          </button>
        </div>
      )}
    </div>
  );
};

export default StorageInfo;