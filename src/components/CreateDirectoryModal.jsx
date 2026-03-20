import { useEffect, useRef } from "react";

function CreateDirectoryModal({
  newDirname,
  setNewDirname,
  onClose,
  onCreateDirectory,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus and select text only once on mount
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }

    // Listen for "Escape" key to close the modal
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup keydown event listener on unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Stop propagation when clicking inside the content
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  // Close when clicking outside the modal content
  const handleOverlayClick = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-[2000] animate-in fade-in" onClick={handleOverlayClick}>
      <div className="bg-[#0f172a] p-8 w-[90%] max-w-[440px] rounded-lg shadow-[0_25px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(0,212,255,0.15),inset_0_1px_0_rgba(255,255,255,0.1)] border border-[#334155] animate-in zoom-in-95 backdrop-blur-xl" onClick={handleContentClick}>
        <h2 className="mb-6 text-[1.25rem] text-slate-50 font-bold text-center">Create a new directory</h2>
        <form onSubmit={onCreateDirectory}>
          <input
            ref={inputRef}
            type="text"
            className="w-full p-[14px_16px] bg-[#1e293b] border-2 border-[#334155] text-slate-50 rounded-md mb-6 text-[0.95rem] transition-all focus:border-[#00d4ff] focus:shadow-[0_0_0_3px_rgba(0,212,255,0.3)] focus:outline-none focus:bg-[#334155] placeholder-slate-400"
            placeholder="Enter folder name"
            value={newDirname}
            onChange={(e) => setNewDirname(e.target.value)}
          />
          <div className="flex justify-end gap-4">
            <button className="bg-[#00d4ff] text-white border-none py-3 px-6 rounded-md font-semibold text-[0.9rem] cursor-pointer transition-all shadow-[0_0_15px_rgba(0,212,255,0.4)] hover:bg-[#0072ff] hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] hover:-translate-y-px active:translate-y-0" type="submit">
              Create
            </button>
            <button
              className="bg-transparent text-slate-400 border border-slate-800 py-3 px-6 rounded-md font-medium text-[0.9rem] cursor-pointer transition-all hover:bg-[#1f262e] hover:text-slate-100 hover:border-[#00d4ff]"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateDirectoryModal;
