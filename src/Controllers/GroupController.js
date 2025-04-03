import { BACKEND_URL } from "./Config.js";
import { createFormData } from "../Helpers/FormData.js";

// Get All Groups
export const all = async (token) => {

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
export const create = async (data, token) => {

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
export const update = async (data, token) => {

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
export const destroy = async (slug, token) => {
    return await fetch(`${BACKEND_URL}/groups/${slug}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then((response) => response.json());
};


// Get Group by Slug
export const show = async (slug, token) => {

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
export const posts = async (slug, token) => {

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
export const members = async (slug, token) => {

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
export const changeStatus = async (slug, status, token) => {

    try {
        const response = await fetch(`${BACKEND_URL}/groups/status/${slug}`, {
            method: "PUT",
            body: JSON.stringify({ status }),
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.json();
    } catch (error) {
        return error;
    }
};


