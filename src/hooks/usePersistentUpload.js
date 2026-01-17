import { useState, useEffect, useCallback } from 'react';
import uploadManager from '../utils/uploadManager.js';

export const useUploadWithPersistence = () => {
  const [uploads, setUploads] = useState(new Map());
  const [isUploading, setIsUploading] = useState(false);

  // Load existing uploads on mount
  useEffect(() => {
    const activeUploads = uploadManager.getAllActiveUploads();
    const uploadsMap = new Map();
    
    activeUploads.forEach(upload => {
      uploadsMap.set(upload.fileId, upload);
    });
    
    setUploads(uploadsMap);
    setIsUploading(uploadManager.hasActiveUploads());

    // Resume any pending uploads
    activeUploads.forEach(upload => {
      if (upload.needsResume) {
        uploadManager.resumeUpload(upload.fileId);
      }
    });
  }, []);

  // Listen for upload progress updates
  useEffect(() => {
    const handleProgress = (event) => {
      const { fileId, progress } = event.detail;
      setUploads(prev => {
        const newUploads = new Map(prev);
        const upload = newUploads.get(fileId);
        if (upload) {
          upload.progress = progress;
          newUploads.set(fileId, upload);
        }
        return newUploads;
      });
    };

    const handleUploadCompleted = (event) => {
      const { fileId } = event.detail;
      console.log(`Upload completed: ${fileId}`);
      
      // Remove from uploads after a short delay to show completion
      setTimeout(() => {
        setUploads(prev => {
          const newUploads = new Map(prev);
          newUploads.delete(fileId);
          return newUploads;
        });
        
        // Refresh page if there are no more active uploads
        if (uploadManager.getAllActiveUploads().length === 0) {
          window.location.reload();
        }
      }, 2000);
    };

    const handleUploadStateChange = () => {
      // Refresh uploads from manager
      const activeUploads = uploadManager.getAllActiveUploads();
      const uploadsMap = new Map();
      
      activeUploads.forEach(upload => {
        uploadsMap.set(upload.fileId, upload);
      });
      
      setUploads(uploadsMap);
      setIsUploading(uploadManager.hasActiveUploads());
    };

    window.addEventListener('uploadProgress', handleProgress);
    window.addEventListener('uploadCompleted', handleUploadCompleted);
    window.addEventListener('uploadStateChange', handleUploadStateChange);

    // Set up periodic refresh
    const interval = setInterval(handleUploadStateChange, 5000);

    return () => {
      window.removeEventListener('uploadProgress', handleProgress);
      window.removeEventListener('uploadCompleted', handleUploadCompleted);
      window.removeEventListener('uploadStateChange', handleUploadStateChange);
      clearInterval(interval);
    };
  }, []);

  // Start upload function
  const startUpload = useCallback(async (files, parentDirId = null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);

    for (const file of files) {
      try {
        // Step 1: Initialize upload
        console.log('Initializing upload for:', file.name, 'size:', file.size);
        
        const initResponse = await fetch('/file/uploads/initiate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            name: file.name,
            size: file.size,
            parentDirId: parentDirId,
            contentType: file.type
          })
        });

        console.log('Init response status:', initResponse.status);
        
        if (!initResponse.ok) {
          let errorMessage = `HTTP ${initResponse.status}`;
          try {
            const error = await initResponse.json();
            errorMessage = error.message || errorMessage;
          } catch (jsonError) {
            console.error('Failed to parse error response:', jsonError);
            // Try to get response as text for debugging
            try {
              const errorText = await initResponse.text();
              console.error('Error response body:', errorText);
            } catch (textError) {
              console.error('Cannot read error response');
            }
          }
          throw new Error(errorMessage);
        }

        let initData;
        try {
          initData = await initResponse.json();
        } catch (jsonError) {
          console.error('Failed to parse success response:', jsonError);
          throw new Error('Invalid server response');
        }

        const { url: uploadUrl, fileId } = initData;

        // Step 2: Start persistent upload
        await startPersistentUpload(file, fileId, uploadUrl);

      } catch (error) {
        console.error('Upload initiation failed:', error);
        alert(`Upload failed for ${file.name}: ${error.message}`);
      }
    }
  }, []);

  // Start persistent upload with file blob
  const startPersistentUpload = useCallback(async (file, fileId, uploadUrl) => {
    // Store file in IndexedDB for persistence across page refreshes
    await storeFileInIndexedDB(fileId, file);

    // Add upload to manager
    const uploadData = {
      fileId,
      fileName: file.name,
      fileSize: file.size,
      uploadUrl,
      progress: 0,
      status: 'uploading',
      startTime: Date.now(),
      xhr: null,
      needsResume: false
    };

    uploadManager.activeUploads.set(fileId, uploadData);
    uploadManager.saveToStorage();

    // Update local state
    setUploads(prev => new Map(prev).set(fileId, uploadData));

    // Start actual upload
    try {
      await performFileUpload(file, fileId, uploadUrl);
    } catch (error) {
      console.error('Upload failed:', error);
      uploadManager.handleUploadError(fileId, error);
    }
  }, []);

  // Perform the actual file upload
  const performFileUpload = useCallback(async (file, fileId, uploadUrl) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      // Store XHR reference
      const upload = uploadManager.activeUploads.get(fileId);
      if (upload) {
        upload.xhr = xhr;
      }

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100;
          uploadManager.notifyProgressUpdate(fileId, progress);
          
          // Update manager
          if (upload) {
            upload.progress = progress;
            uploadManager.saveToStorage();
          }
        }
      });

      xhr.addEventListener('load', async () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          // Mark upload as complete
          await uploadManager.markUploadComplete(fileId);
          uploadManager.completeUpload(fileId);
          
          // Clean up file from IndexedDB
          await removeFileFromIndexedDB(fileId);
          
          resolve();
        } else {
          reject(new Error(`Upload failed: ${xhr.status}`));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Upload network error'));
      });

      xhr.addEventListener('abort', () => {
        if (upload) {
          upload.status = 'paused';
          uploadManager.saveToStorage();
        }
      });

      // Start upload
      xhr.open('PUT', uploadUrl);
      xhr.setRequestHeader('Content-Type', file.type || 'application/octet-stream');
      xhr.send(file);
    });
  }, []);

  // Resume upload from IndexedDB
  const resumeUpload = useCallback(async (fileId) => {
    try {
      const upload = uploadManager.getUploadStatus(fileId);
      if (!upload) return;

      // Get file from IndexedDB
      const file = await getFileFromIndexedDB(fileId);
      if (!file) {
        console.error('File not found in IndexedDB for resume');
        uploadManager.failUpload(fileId);
        return;
      }

      // Resume upload
      upload.status = 'resuming';
      upload.needsResume = false;
      uploadManager.saveToStorage();

      await performFileUpload(file, fileId, upload.uploadUrl);

    } catch (error) {
      console.error('Resume upload failed:', error);
      uploadManager.handleUploadError(fileId, error);
    }
  }, [performFileUpload]);

  // Cancel upload
  const cancelUpload = useCallback(async (fileId) => {
    uploadManager.cancelUpload(fileId);
    await removeFileFromIndexedDB(fileId);
    
    setUploads(prev => {
      const newUploads = new Map(prev);
      newUploads.delete(fileId);
      return newUploads;
    });
  }, []);

  return {
    uploads: Array.from(uploads.values()),
    isUploading,
    startUpload,
    cancelUpload,
    resumeUpload
  };
};

// IndexedDB helpers for file persistence
const storeFileInIndexedDB = async (fileId, file) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('UploadFiles', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['files'], 'readwrite');
      const store = transaction.objectStore('files');
      
      store.put({ id: fileId, file: file });
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    };
    
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('files')) {
        db.createObjectStore('files', { keyPath: 'id' });
      }
    };
  });
};

const getFileFromIndexedDB = async (fileId) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('UploadFiles', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['files'], 'readonly');
      const store = transaction.objectStore('files');
      const getRequest = store.get(fileId);
      
      getRequest.onsuccess = () => {
        const result = getRequest.result;
        resolve(result ? result.file : null);
      };
      getRequest.onerror = () => reject(getRequest.error);
    };
  });
};

const removeFileFromIndexedDB = async (fileId) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('UploadFiles', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['files'], 'readwrite');
      const store = transaction.objectStore('files');
      
      store.delete(fileId);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    };
  });
};