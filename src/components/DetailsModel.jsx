import React from 'react';

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
      <div className="text-right flex flex-col gap-1 md:text-left md:items-start max-md:text-left">
        <div className="font-semibold text-slate-100 text-[0.875rem]">{formattedDate}</div>
        <div className="font-normal text-slate-400 text-[0.8rem]">{formattedTime}</div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-5 animate-in fade-in transition-all max-md:p-4 max-md:items-end" onClick={onClose}>
      <div className="bg-[#15191e] rounded-lg w-full max-w-[480px] shadow-lg border border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 max-h-[85vh] max-md:rounded-tr-lg max-md:rounded-tl-lg max-md:rounded-b-none" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-5 md:px-6 bg-[#1f262e] border-b border-slate-800">
          <h3 className="m-0 text-[1.1rem] font-bold text-slate-100 flex items-center gap-2.5 before:content-['📄'] before:text-[1.2rem]">{item.isDirectory ? 'Folder Details' : 'File Details'}</h3>
          <button className="bg-[#111318] border border-slate-800 text-[1.25rem] text-slate-400 cursor-pointer p-0 w-9 h-9 flex items-center justify-center rounded-md transition-all hover:bg-slate-700 hover:text-slate-100 hover:border-[#00d4ff]" onClick={onClose}>×</button>
        </div>

        <div className="p-6 max-md:p-5 overflow-y-auto">
          <div className="flex flex-col gap-0">
            <div className="flex justify-between items-start py-3.5 border-b border-slate-800 gap-4 max-md:flex-col max-md:gap-1.5 max-md:items-start">
              <span className="font-medium text-slate-400 text-[0.875rem] min-w-[100px] shrink-0">Name</span>
              <span className="font-medium text-slate-100 text-[0.875rem] text-right break-words max-w-[280px] max-md:text-left max-md:max-w-full">{item.name}</span>
            </div>

            <div className="flex justify-between items-start py-3.5 border-b border-slate-800 gap-4 max-md:flex-col max-md:gap-1.5 max-md:items-start">
              <span className="font-medium text-slate-400 text-[0.875rem] min-w-[100px] shrink-0">Location</span>
              <span className="font-mono text-[0.8rem] bg-[#111318] px-3 py-2 rounded-sm text-slate-500 max-w-[260px] overflow-x-auto whitespace-nowrap border border-slate-800 max-md:text-left max-md:max-w-full">{item.path || '/'}</span>
            </div>

            <div className="flex justify-between items-start py-3.5 border-b border-slate-800 gap-4 max-md:flex-col max-md:gap-1.5 max-md:items-start">
              <span className="font-medium text-slate-400 text-[0.875rem] min-w-[100px] shrink-0">Size</span>
              <span className="font-medium text-slate-100 text-[0.875rem] text-right break-words max-w-[280px] max-md:text-left max-md:max-w-full">{formatFileSize(item.size)}</span>
            </div>

            <div className="flex justify-between items-start py-3.5 border-b border-slate-800 gap-4 max-md:flex-col max-md:gap-1.5 max-md:items-start">
              <span className="font-medium text-slate-400 text-[0.875rem] min-w-[100px] shrink-0">Created</span>
              {formatDate(item.createdAt)}
            </div>

            <div className="flex justify-between items-start py-3.5 border-slate-800 gap-4 max-md:flex-col max-md:gap-1.5 max-md:items-start border-b last:border-b-0">
              <span className="font-medium text-slate-400 text-[0.875rem] min-w-[100px] shrink-0">Modified</span>
              {formatDate(item.updatedAt)}
            </div>

            {!item.isDirectory && item.extension && (
              <div className="flex justify-between items-start py-3.5 border-slate-800 gap-4 max-md:flex-col max-md:gap-1.5 max-md:items-start border-b last:border-b-0">
                <span className="font-medium text-slate-400 text-[0.875rem] min-w-[100px] shrink-0">Type</span>
                <span className="font-medium text-slate-100 text-[0.875rem] text-right break-words max-w-[280px] max-md:text-left max-md:max-w-full">{item.extension.replace('.', '').toUpperCase()} File</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-5 bg-[#1f262e] border-t border-slate-800 max-md:flex-col max-md:px-5 max-md:py-4">
          <button className="px-5 py-2.5 rounded-md text-[0.875rem] font-semibold cursor-pointer transition-all inline-flex items-center justify-center gap-2 bg-[#111318] border border-slate-800 text-slate-400 hover:bg-slate-700 hover:border-slate-500 hover:text-slate-100 max-md:w-full" onClick={onClose}>Close</button>
          {!item.isDirectory && (
            <button 
              className="px-5 py-2.5 rounded-md text-[0.875rem] font-semibold cursor-pointer transition-all inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#00d4ff] to-[#0072ff] border-none text-white shadow-[0_0_15px_rgba(0,212,255,0.4)] hover:brightness-110 hover:-translate-y-px active:translate-y-0 max-md:w-full"
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
