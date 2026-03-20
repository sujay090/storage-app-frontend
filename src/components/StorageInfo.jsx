import React, { useState, useEffect } from 'react';
import { getStorageInfo } from '../apis/storage.api.js';

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
      <div className="bg-[#15191e] rounded-xl p-[28px] max-md:p-5 shadow-lg border border-slate-800 mb-[28px] relative overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:-translate-y-[2px] hover:border-[#00d4ff] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-[#00d4ff] before:to-[#0072ff]">
        <div className="text-center p-[40px_20px] text-slate-400 text-[0.95rem]">
          <div className="block w-8 h-8 border-4 border-slate-700 border-t-[#00d4ff] rounded-full mx-auto mb-4 animate-[spin_1s_linear_infinite]"></div>
          Loading storage info...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#15191e] rounded-xl p-[28px] max-md:p-5 shadow-lg border border-slate-800 mb-[28px] relative overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:-translate-y-[2px] hover:border-[#00d4ff] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-[#00d4ff] before:to-[#0072ff]">
        <div className="text-center p-[40px_20px] text-red-500 text-[0.95rem]">{error}</div>
        <div className="text-center">
          <button onClick={fetchStorageInfo} className="bg-slate-700 text-slate-100 border-none px-4 py-2 rounded-md mt-3 cursor-pointer hover:bg-slate-600">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!storageInfo) {
    return null;
  }

  const { subscription, usagePercentage, storageUsedGB, storageLimitGB, storageAvailableGB, isFreeUser } = storageInfo;

  const getUsageColor = (percentage) => {
    if (percentage < 50) return '#10b981'; // emerald-500
    if (percentage < 80) return '#f59e0b'; // amber-500
    return '#ef4444'; // red-500
  };

  return (
    <div className="bg-[#15191e] rounded-xl p-[28px] max-md:p-5 shadow-lg border border-slate-800 mb-[28px] relative overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:-translate-y-[2px] hover:border-[#00d4ff] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-[#00d4ff] before:to-[#0072ff]">
      <div className="flex justify-between items-center mb-[28px] max-md:flex-col max-md:items-start max-md:gap-3">
        <h3 className="m-0 text-slate-100 text-[1.2rem] font-bold flex items-center gap-3 before:content-['💾'] before:text-[1.4rem]">Storage Usage</h3>
        {subscription && (
          <span className={`px-[14px] py-1.5 rounded-full text-[0.75rem] font-bold uppercase tracking-[0.5px] text-white ${isFreeUser ? 'bg-gradient-to-br from-[#10b981] to-[#059669] shadow-[0_4px_12px_rgba(16,185,129,0.3)]' : 'bg-gradient-to-r from-[#00d4ff] to-[#0072ff] shadow-[0_0_15px_rgba(0,212,255,0.4)]'}`}>
            {subscription.planName}
          </span>
        )}
      </div>

      <div className="mb-[28px]">
        <div className="w-full h-3 bg-[#1e293b] rounded-full overflow-hidden mb-[14px]">
          <div 
            className="h-full transition-all duration-500 rounded-full relative"
            style={{
              width: `${Math.min(usagePercentage, 100)}%`,
              backgroundColor: getUsageColor(usagePercentage)
            }}
          ></div>
        </div>
        <div className="text-[0.875rem] text-slate-400 text-center font-medium">
          {usagePercentage}% used ({storageUsedGB}GB of {storageLimitGB}GB)
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6 max-md:grid-cols-2 max-[480px]:grid-cols-1">
        <div className="flex flex-col text-center p-4 bg-[#1f262e] rounded-md border border-slate-800 transition-all duration-200 hover:bg-[#1e293b] hover:border-[#00d4ff]">
          <span className="text-[0.75rem] text-slate-400 mb-1.5 uppercase tracking-[0.5px] font-semibold">Used:</span>
          <span className="text-[1.25rem] font-bold text-slate-100">{storageUsedGB} GB</span>
        </div>
        <div className="flex flex-col text-center p-4 bg-[#1f262e] rounded-md border border-slate-800 transition-all duration-200 hover:bg-[#1e293b] hover:border-[#00d4ff]">
          <span className="text-[0.75rem] text-slate-400 mb-1.5 uppercase tracking-[0.5px] font-semibold">Available:</span>
          <span className="text-[1.25rem] font-bold text-slate-100">{storageAvailableGB} GB</span>
        </div>
        <div className="flex flex-col text-center p-4 bg-[#1f262e] rounded-md border border-slate-800 transition-all duration-200 hover:bg-[#1e293b] hover:border-[#00d4ff]">
          <span className="text-[0.75rem] text-slate-400 mb-1.5 uppercase tracking-[0.5px] font-semibold">Total:</span>
          <span className="text-[1.25rem] font-bold text-slate-100">{storageLimitGB} GB</span>
        </div>
      </div>

      {subscription && !isFreeUser && (
        <div className="border-t border-slate-800 pt-5 mb-5">
          <div className="flex items-center gap-[10px] mb-2 text-[0.9rem] font-semibold text-emerald-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
            <span>Active Subscription</span>
          </div>
          {subscription.nextBillingDate && (
            <div className="text-[0.8rem] text-slate-400 pl-5">
              Next billing: {new Date(subscription.nextBillingDate).toLocaleDateString()}
            </div>
          )}
        </div>
      )}

      {isFreeUser && (
        <div className="border-t border-slate-800 pt-5 mb-5">
          <div className="flex items-center gap-[10px] mb-2 text-[0.9rem] font-semibold text-emerald-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
            <span>Free Plan (1GB)</span>
          </div>
          {usagePercentage > 80 && (
            <div className="border-t border-slate-800 pt-5 text-center">
              <p className="m-[0_0_16px_0] text-slate-400 text-[0.9rem]">⚠️ Running low on storage space!</p>
              <button 
                className="bg-gradient-to-r from-[#00d4ff] to-[#0072ff] text-white border-none py-2.5 px-5 rounded-md text-[0.9rem] font-semibold cursor-pointer transition-all shadow-[0_0_15px_rgba(0,212,255,0.4)] hover:-translate-y-[2px] hover:brightness-110"
                onClick={() => window.location.href = '/plans'}
              >
                Upgrade for More Storage
              </button>
            </div>
          )}
        </div>
      )}

      {isFreeUser && usagePercentage <= 80 && (
        <div className="border-t border-slate-800 pt-5 text-center">
          <p className="m-[0_0_16px_0] text-slate-400 text-[0.9rem]">📈 Need more storage?</p>
          <button 
            className="bg-transparent text-[#00d4ff] border border-[#00d4ff] shadow-none hover:bg-[#00d4ff]/10 py-2.5 px-5 rounded-md text-[0.9rem] font-semibold cursor-pointer transition-all"
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