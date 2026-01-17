import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(5);
  
  // Get payment details from navigation state
  const paymentDetails = location.state || {};
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="payment-success-page">
      <div className="success-container">
        <div className="success-icon">
          <div className="checkmark">
            <div className="checkmark-circle"></div>
            <div className="checkmark-stem"></div>
            <div className="checkmark-kick"></div>
          </div>
        </div>

        <h1 className="success-title">Payment Successful! 🎉</h1>
        <p className="success-subtitle">Your subscription has been activated successfully</p>

        <div className="payment-details">
          <div className="detail-card">
            <h3>Subscription Details</h3>
            <div className="detail-row">
              <span className="label">Plan:</span>
              <span className="value">{paymentDetails.planName || 'Premium Plan'}</span>
            </div>
            <div className="detail-row">
              <span className="label">Storage:</span>
              <span className="value">{paymentDetails.planSize || 'N/A'}GB</span>
            </div>
            <div className="detail-row">
              <span className="label">Amount:</span>
              <span className="value">₹{paymentDetails.planPrice || 'N/A'}</span>
            </div>
            {paymentDetails.paymentId && (
              <div className="detail-row">
                <span className="label">Payment ID:</span>
                <span className="value payment-id">{paymentDetails.paymentId}</span>
              </div>
            )}
          </div>
        </div>

        <div className="success-message">
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">✅</span>
              <span>Storage space activated</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✅</span>
              <span>Upload and manage files</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✅</span>
              <span>Secure cloud storage</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✅</span>
              <span>24/7 access to your files</span>
            </div>
          </div>
        </div>

        <div className="redirect-info">
          <p>Redirecting to your dashboard in {countdown} seconds...</p>
          <button className="go-home-btn" onClick={handleGoHome}>
            Go to Dashboard Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;