const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const getAllUsers = async () => {
    const response = await fetch(`${BASE_URL}/admin/getusers`, {
        credentials: "include"
    });
    let data;
    if (response.ok) {
        data = await response.json();

    } else if (response.status === 403) {
        return null;
    }
    return data;
}

export const logoutUser = async (userId) => {
    const response = await fetch(`${BASE_URL}/admin/logout-user`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId })
    })
    let data;
    if (response.ok) {
        data = await response.json();
    } else {
        data = null;
    }
    return data;
}

export const deleteUser = async (userId) => {
    const response = await fetch(`${BASE_URL}/admin`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId })
    })
    let data;
    if (response.ok) {
        data = await response.json();
    } else {
        data = null;
    }
    return data;
}