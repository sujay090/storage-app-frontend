import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Toast({ message, type = 'error', duration = 5000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Start progress bar animation
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      
      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 16);

    const timer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, 300);
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [duration, onClose]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300);
  };

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'warning':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'info':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case 'error':
      default:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
    }
  };

  const getVariantStyles = () => {
    switch (type) {
      case 'success':
        return {
          containerClass: "bg-[#14281e]/95 border-[#00ff9d]/30 shadow-[0_20px_40px_rgba(0,255,157,0.2),0_0_30px_rgba(0,255,157,0.15),inset_0_1px_0_rgba(0,255,157,0.2)]",
          iconClass: "text-[#00ff9d] bg-[#00ff9d]/20 shadow-[0_0_15px_rgba(0,255,157,0.3)]",
          progressClass: "bg-gradient-to-r from-[#00ff9d] to-[#00e891]"
        };
      case 'warning':
        return {
          containerClass: "bg-[#282314]/95 border-[#ffa502]/30 shadow-[0_20px_40px_rgba(255,165,2,0.2),0_0_30px_rgba(255,165,2,0.15),inset_0_1px_0_rgba(255,165,2,0.2)]",
          iconClass: "text-[#ffa502] bg-[#ffa502]/20 shadow-[0_0_15px_rgba(255,165,2,0.3)]",
          progressClass: "bg-gradient-to-r from-[#ffa502] to-[#ffb733]"
        };
      case 'info':
        return {
          containerClass: "bg-[#141e28]/95 border-[#00d4ff]/30 shadow-[0_20px_40px_rgba(0,212,255,0.2),0_0_30px_rgba(0,212,255,0.15),inset_0_1px_0_rgba(0,212,255,0.2)]",
          iconClass: "text-[#00d4ff] bg-[#00d4ff]/20 shadow-[0_0_15px_rgba(0,212,255,0.3)]",
          progressClass: "bg-gradient-to-r from-[#00d4ff] to-[#33e0ff]"
        };
      case 'error':
      default:
        return {
          containerClass: "bg-[#281414]/95 border-[#ff4757]/30 shadow-[0_20px_40px_rgba(255,71,87,0.2),0_0_30px_rgba(255,71,87,0.15),inset_0_1px_0_rgba(255,71,87,0.2)]",
          iconClass: "text-[#ff4757] bg-[#ff4757]/20 shadow-[0_0_15px_rgba(255,71,87,0.3)]",
          progressClass: "bg-gradient-to-r from-[#ff4757] to-[#ff6b7a]"
        };
    }
  };

  const variant = getVariantStyles();

  const toastContent = (
    <div className={`fixed bottom-5 left-5 z-[999999] transition-all duration-300 transform ${isLeaving ? 'translate-x-[-150%] opacity-0' : 'translate-x-[0%] opacity-100'} max-[480px]:top-[10px] max-[480px]:right-[10px] max-[480px]:bottom-auto max-[480px]:left-[10px]`}>
      <div className={`flex items-center gap-3 min-w-[320px] max-w-[450px] p-[18px_24px] rounded-lg backdrop-blur-[20px] border relative overflow-hidden text-slate-100 max-[480px]:min-w-0 max-[480px]:max-w-none max-[480px]:p-[14px_16px] ${variant.containerClass}`}>
        <div className={`flex items-center justify-center w-[44px] h-[44px] rounded-md shrink-0 relative overflow-hidden ${variant.iconClass}`}>
          <div className="absolute inset-0 bg-white/10 opacity-50 blur-md rounded-full animate-pulse" />
          <div className="relative z-10">{getIcon()}</div>
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[0.9rem] font-medium leading-[1.5] break-words block">{message}</span>
        </div>
        <button className="flex items-center justify-center w-8 h-8 bg-transparent border-none rounded-sm cursor-pointer text-slate-400 transition-all shrink-0 hover:bg-[#334155] hover:text-slate-100" onClick={handleClose}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1e293b] overflow-hidden">
          <div 
            className={`h-full w-full ${variant.progressClass}`}
            style={{ 
              transform: `scaleX(${progress / 100})`, 
              transformOrigin: 'left'
            }}
          />
        </div>
      </div>
    </div>
  );

  return createPortal(toastContent, document.body);
}

export default Toast;
