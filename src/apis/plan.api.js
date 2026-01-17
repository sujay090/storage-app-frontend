const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const getPlans = async () => {
    const response = await fetch(`${BASE_URL}/plans`, {
        credentials: "include",
    });
    return response.json();
};

export const createPlan = async (planData) => {
    const response = await fetch(`${BASE_URL}/plans/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",

        },
        credentials: "include",
        body: JSON.stringify(planData),
    });
    return response.json();
};

export const updatePlan = async (id, planData) => {
    const response = await fetch(`${BASE_URL}/plans/update/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(planData),
    });
    return response.json();
};

export const deletePlan = async (id) => {
    const response = await fetch(`${BASE_URL}/plans/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
    });
    return response.json();
};
