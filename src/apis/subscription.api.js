import api from "./baseApi.js";


export const createSubscription = async (planId) => {
    try {
        const response = await api.post("/subscription/create", { planId });
        return response.data;
    } catch (error) {
        console.error("Error creating subscription:", error);
        throw error;
    }
};
