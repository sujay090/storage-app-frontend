import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listDriveFiles, importDriveFiles } from "../apis/googleDrive.api";
import Toast from "../components/Toast";

// File type → icon mapping
function getDriveFileIcon(mimeType) {
    if (!mimeType) return "📄";
    if (mimeType.includes("folder")) return "📁";
    if (mimeType.includes("image")) return "🖼️";
    if (mimeType.includes("video")) return "🎬";
    if (mimeType.includes("audio")) return "🎵";
    if (mimeType.includes("pdf")) return "📕";
    if (mimeType.includes("spreadsheet") || mimeType.includes("excel")) return "📊";
    if (mimeType.includes("document") || mimeType.includes("word")) return "📝";
    if (mimeType.includes("presentation") || mimeType.includes("powerpoint")) return "📽️";
    if (mimeType.includes("zip") || mimeType.includes("archive") || mimeType.includes("compressed")) return "📦";
    if (mimeType.includes("text")) return "📃";
    return "📄";
}

// Format bytes to human readable
function formatFileSize(bytes) {
    if (!bytes || bytes === "0") return "—";
    const num = parseInt(bytes, 10);
    if (num === 0) return "—";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(num) / Math.log(k));
    return parseFloat((num / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

// Format date string
function formatDate(dateStr) {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

const GoogleDrivePicker = () => {
    const navigate = useNavigate();

    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [importing, setImporting] = useState(false);
    const [importProgress, setImportProgress] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [selectAll, setSelectAll] = useState(false);

    // Fetch Drive files on mount
    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await listDriveFiles();
            // Handle both { files: [...] } and direct array response
            const fileList = Array.isArray(data) ? data : (data.files || []);
            setFiles(fileList);
        } catch (err) {
            setError(err.error || err.message || "Failed to load Google Drive files.");
        } finally {
            setLoading(false);
        }
    };

    // Toggle a single file selection
    const toggleFile = (fileId) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(fileId)) {
                next.delete(fileId);
            } else {
                next.add(fileId);
            }
            return next;
        });
    };

    // Toggle select all (only non-folder files)
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedIds(new Set());
        } else {
            const importableFiles = files
                .filter((f) => !f.mimeType?.includes("folder"))
                .map((f) => f.id);
            setSelectedIds(new Set(importableFiles));
        }
        setSelectAll(!selectAll);
    };

    // Import selected files
    const handleImport = async () => {
        if (selectedIds.size === 0) return;

        try {
            setImporting(true);
            setImportProgress(`Importing ${selectedIds.size} file${selectedIds.size > 1 ? "s" : ""}...`);

            const result = await importDriveFiles(Array.from(selectedIds), null);

            setSuccessMessage(
                result.message || `Successfully imported ${selectedIds.size} file${selectedIds.size > 1 ? "s" : ""}!`
            );
            setSelectedIds(new Set());
            setSelectAll(false);

            // Navigate to directory after a moment
            setTimeout(() => navigate("/"), 2000);
        } catch (err) {
            setError(err.error || err.message || "Import failed. Please try again.");
        } finally {
            setImporting(false);
            setImportProgress("");
        }
    };

    const importableCount = files.filter((f) => !f.mimeType?.includes("folder")).length;

    return (
        <div className="p-6 max-w-[1000px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 text-[var(--text-main)]">
            {/* Toast notifications */}
            {error && (
                <Toast message={error} type="error" duration={5000} onClose={() => setError("")} />
            )}
            {successMessage && (
                <Toast
                    message={successMessage}
                    type="success"
                    duration={4000}
                    onClose={() => setSuccessMessage("")}
                />
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <img src="/drive.png" alt="Google Drive" className="w-10 h-10 object-cover rounded-lg" />
                    <div>
                        <h1 className="text-xl font-bold text-[var(--text-main)] m-0">Google Drive</h1>
                        <p className="text-sm text-[var(--text-muted)] m-0">
                            Select files to import into IronCloud
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate("/")}
                        className="px-4 py-2.5 bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-subtle)] rounded-xl text-sm font-medium cursor-pointer transition-all hover:border-[var(--border-light)] hover:text-[var(--text-main)]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleImport}
                        disabled={selectedIds.size === 0 || importing}
                        className="px-5 py-2.5 bg-gradient-to-br from-[#00d4ff] to-[#0072ff] text-white border-none rounded-xl text-sm font-semibold cursor-pointer transition-all shadow-[0_0_15px_rgba(0,212,255,0.3)] flex items-center gap-2 hover:brightness-110 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100 disabled:hover:translate-y-0"
                    >
                        {importing ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Importing...
                            </>
                        ) : (
                            <>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                                Import {selectedIds.size > 0 ? `(${selectedIds.size})` : ""}
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Import progress bar */}
            {importing && (
                <div className="mb-4 p-4 bg-[var(--bg-panel)] border border-[var(--border-subtle)] rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-[#00d4ff]/30 border-t-[#00d4ff] rounded-full animate-spin" />
                        <span className="text-sm text-[var(--text-muted)]">{importProgress}</span>
                    </div>
                    <div className="mt-3 h-1.5 bg-[var(--bg-surface)] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#00d4ff] to-[#0072ff] rounded-full animate-[indeterminate_1.5s_ease-in-out_infinite] w-1/3" />
                    </div>
                </div>
            )}

            {/* File list */}
            <div className="bg-[var(--bg-panel)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
                {/* Select all header */}
                {!loading && files.length > 0 && (
                    <div className="flex items-center gap-4 px-5 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                        <label className="flex items-center gap-3 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleSelectAll}
                                className="w-4 h-4 rounded accent-[#00d4ff] cursor-pointer"
                            />
                            <span className="text-sm font-medium text-[var(--text-muted)]">
                                Select all files ({importableCount})
                            </span>
                        </label>
                        {selectedIds.size > 0 && (
                            <span className="text-xs font-semibold text-[#00d4ff] bg-[#00d4ff]/10 px-2.5 py-1 rounded-full">
                                {selectedIds.size} selected
                            </span>
                        )}
                    </div>
                )}

                {/* Loading state */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="w-12 h-12 border-[3px] border-[#00d4ff]/20 border-t-[#00d4ff] rounded-full animate-spin" />
                        <p className="text-slate-400 text-sm m-0">Loading your Drive files...</p>
                    </div>
                )}

                {/* Empty state */}
                {!loading && files.length === 0 && !error && (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <span className="text-5xl opacity-50">📂</span>
                        <p className="text-[var(--text-muted)] text-sm m-0">No files found in your Google Drive.</p>
                    </div>
                )}

                {/* File rows */}
                {!loading &&
                    files.map((file) => {
                        const isFolder = file.mimeType?.includes("folder");
                        const isSelected = selectedIds.has(file.id);

                        return (
                            <div
                                key={file.id}
                                onClick={() => !isFolder && toggleFile(file.id)}
                                className={`flex items-center gap-4 px-5 py-3.5 border-b border-[var(--border-subtle)] last:border-b-0 transition-all cursor-pointer group
                  ${isSelected ? "bg-[#00d4ff]/5" : "hover:bg-[var(--bg-surface)]"}
                  ${isFolder ? "opacity-50 cursor-default" : ""}`}
                            >
                                {/* Checkbox */}
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => !isFolder && toggleFile(file.id)}
                                    disabled={isFolder}
                                    className="w-4 h-4 rounded accent-[#00d4ff] cursor-pointer shrink-0 disabled:opacity-30"
                                    onClick={(e) => e.stopPropagation()}
                                />

                                {/* Icon */}
                                <span className="text-xl shrink-0 w-8 text-center">
                                    {file.iconLink ? (
                                        <img src={file.iconLink} alt="" className="w-6 h-6 inline-block" />
                                    ) : (
                                        getDriveFileIcon(file.mimeType)
                                    )}
                                </span>

                                {/* File info */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-[var(--text-main)] m-0 truncate">
                                        {file.name}
                                    </p>
                                    {isFolder && (
                                        <span className="text-xs text-[var(--text-dim)]">Folder — cannot import</span>
                                    )}
                                </div>

                                {/* Size */}
                                <span className="text-xs text-[var(--text-muted)] shrink-0 hidden sm:block w-20 text-right">
                                    {formatFileSize(file.size)}
                                </span>

                                {/* Date */}
                                <span className="text-xs text-[var(--text-muted)] shrink-0 hidden md:block w-28 text-right">
                                    {formatDate(file.modifiedTime)}
                                </span>
                            </div>
                        );
                    })}
            </div>

            {/* Indeterminate animation keyframes */}
            <style>{`
        @keyframes indeterminate {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
        </div>
    );
};

export default GoogleDrivePicker;
