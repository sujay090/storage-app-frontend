import api from "./baseApi.js";

/**
 * Exchange the OAuth authorization code for access tokens on the backend
 */
export const exchangeAuthCode = async (code) => {
  try {
    const response = await api.post("/user/google-drive/auth", { code });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * List files from the user's connected Google Drive
 */
export const listDriveFiles = async () => {
  try {
    const response = await api.get("/user/google-drive/files");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Import selected Google Drive files into IronCloud storage
 * @param {string[]} fileIds - Array of Google Drive file IDs to import
 * @param {string|null} targetDirId - Target directory ID in IronCloud (null for root)
 */
export const importDriveFiles = async (fileIds, targetDirId = null) => {
  try {
    const response = await api.post("/user/google-drive/import", {
      fileIds,
      targetDirId,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Check if a user has already connected their Google Drive
 */
export const checkDriveConnection = async () => {
  try {
    const response = await api.get("/user/google-drive/status");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Disconnect Google Drive from the user's account
 */
export const disconnectDrive = async () => {
  try {
    const response = await api.delete("/user/google-drive/disconnect");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
