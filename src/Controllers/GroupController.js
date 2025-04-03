import { BACKEND_URL } from "../config";
import { createFormData } from "../Helpers/FormData.js";

// Get All Groups
export const all = async () => {

    try {
        const response = await fetch(`${BACKEND_URL}/groups`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.json();
    } catch (error) {
        return error;
    }
};

// Create Group
export const create = async (data) => {

    try {

        const formData = createFormData(data);

        const response = await fetch(`${BACKEND_URL}/groups`, {
            method: "POST",
            body: formData,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return response.json();
    
    } catch (error) {
        return error;
    }
};


// Update Group
export const update = async (data) => {

    try {

        const formData = createFormData(data);

        const response = await fetch(`${BACKEND_URL}/groups/${data.id}`, {
            method: "PUT",
            body: formData,
        });

        return response.json();

    } catch (error) {
        return error;
    }
};

// Delete Group
export const destroy = async (slug) => {
    return await fetch(`${BACKEND_URL}/groups/${slug}`, {
        method: "DELETE",
    }).then((response) => response.json());
};


// Get Group by Slug
export const show = async (slug) => {

    try {
        const response = await fetch(`${BACKEND_URL}/groups/${slug}`,{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.json();
    } catch (error) {
        return error;
    }
};


// Get Group Posts
export const posts = async (slug) => {

    try {
        const response = await fetch(`${BACKEND_URL}/groups/posts/${slug}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.json();
    } catch (error) {
        return error;
    }
};


// Get Group Members
export const members = async (slug) => {

    try {
        const response = await fetch(`${BACKEND_URL}/groups/members/${slug}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.json();
    } catch (error) {
        return error;
    }
};


// Change Group Status
export const changeStatus = async (slug, status) => {

    try {
        const response = await fetch(`${BACKEND_URL}/groups/status/${slug}`, {
            method: "PUT",
            body: JSON.stringify({ status }),
        });
        return response.json();
    } catch (error) {
        return error;
    }
};


