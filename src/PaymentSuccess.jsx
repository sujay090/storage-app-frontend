import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
    <div className="min-h-screen bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7] flex items-center justify-center p-6 text-white relative overflow-hidden">
      {/* Background blobs for visual flavor */}
      <div className="absolute w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_70%)] rounded-full -top-[300px] -right-[300px] animate-pulse"></div>
      <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)] rounded-full -bottom-[200px] -left-[200px] animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>

      <div className="bg-white/95 backdrop-blur-xl rounded-[28px] p-12 max-w-[520px] w-full text-center shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.3)] text-[#333] relative z-10 animate-in slide-in-from-bottom-10 duration-700 max-md:m-5 max-md:p-[30px_20px]">
        
        <svg className="w-[90px] h-[90px] text-emerald-500 mx-auto mb-6 animate-in zoom-in duration-500 max-md:w-[60px] max-md:h-[60px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>

        <h1 className="text-[2.25rem] font-extrabold mb-3 text-[#18181b] tracking-tight max-md:text-[1.7rem]">Payment Successful! 🎉</h1>
        <p className="text-[1.15rem] text-[#71717a] mb-9">Your subscription has been activated successfully</p>

        <div className="mb-9">
          <div className="bg-gradient-to-br from-[#f8faff] to-[#f4f4f5] rounded-2xl p-6 border-l-[5px] border-emerald-500 text-left">
            <h3 className="m-[0_0_18px_0] text-[#18181b] text-[1.25rem] font-bold">Subscription Details</h3>
            <div className="flex justify-between items-center py-2.5 border-b border-[#e4e4e7] last:border-b-0">
              <span className="font-medium text-[#6c757d]">Plan:</span>
              <span className="font-semibold text-[#2c3e50]">{paymentDetails.planName || 'Premium Plan'}</span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-[#e4e4e7] last:border-b-0">
              <span className="font-medium text-[#6c757d]">Storage:</span>
              <span className="font-semibold text-[#2c3e50]">{paymentDetails.planSize || 'N/A'}GB</span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-[#e4e4e7] last:border-b-0">
              <span className="font-medium text-[#6c757d]">Amount:</span>
              <span className="font-semibold text-[#2c3e50]">₹{paymentDetails.planPrice || 'N/A'}</span>
            </div>
            {paymentDetails.paymentId && (
              <div className="flex justify-between items-center py-2.5 border-b border-[#e4e4e7] last:border-b-0">
                <span className="font-medium text-[#6c757d]">Payment ID:</span>
                <span className="font-mono text-[0.9rem] bg-[#e9ecef] px-2 py-1 rounded font-semibold text-[#2c3e50]">{paymentDetails.paymentId}</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-3 mb-[30px]">
          <div className="flex items-center bg-emerald-500/10 p-[12px_16px] rounded-lg gap-3">
            <span className="text-[1.2rem]">✅</span>
            <span className="text-[#2c3e50] font-medium">Storage space activated</span>
          </div>
          <div className="flex items-center bg-emerald-500/10 p-[12px_16px] rounded-lg gap-3">
            <span className="text-[1.2rem]">✅</span>
            <span className="text-[#2c3e50] font-medium">Upload and manage files</span>
          </div>
          <div className="flex items-center bg-emerald-500/10 p-[12px_16px] rounded-lg gap-3">
            <span className="text-[1.2rem]">✅</span>
            <span className="text-[#2c3e50] font-medium">Secure cloud storage</span>
          </div>
          <div className="flex items-center bg-emerald-500/10 p-[12px_16px] rounded-lg gap-3">
            <span className="text-[1.2rem]">✅</span>
            <span className="text-[#2c3e50] font-medium">24/7 access to your files</span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-[#6c757d] mb-5 text-[1rem]">Redirecting to your dashboard in {countdown} seconds...</p>
          <button 
            className="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white border-none py-3 px-8 rounded-full text-[1rem] font-semibold cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(102,126,234,0.4)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(102,126,234,0.6)] active:translate-y-0" 
            onClick={handleGoHome}
          >
            Go to Dashboard Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;