import { baseApi } from "./baseApi.js";

export const getStorageInfo = async () => {
  try {
    const response = await baseApi.get("/storage/info");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};