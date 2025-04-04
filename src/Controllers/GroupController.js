import { BACKEND_URL } from "./Config.js";
import { createFormData } from "../Helpers/FormData.js";

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Request failed');
    }
    return await response.json();
};

// Get All Groups
export const all = async (token) => {
    try {
        const response = await fetch(`${BACKEND_URL}/groups`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return await handleResponse(response);
    } catch (error) {
        throw new Error(`Failed to fetch groups: ${error.message}`);
    }
};

// Create Group
export const create = async (data, token) => {
    try {
        const formData = createFormData(data);
        const response = await fetch(`${BACKEND_URL}/groups/create`, {
            method: "POST",
            body: formData,
            headers: { "Authorization": `Bearer ${token}` }
        });
        return await handleResponse(response);
    } catch (error) {
        throw new Error(`Group creation failed: ${error.message}`);
    }
};

// Update Group
export const update = async (data, token) => {
    try {
        const formData = createFormData(data);
        const response = await fetch(`${BACKEND_URL}/groups/${data.id}`, {
            method: "PUT",
            body: formData,
            headers: { "Authorization": `Bearer ${token}` }
        });
        return await handleResponse(response);
    } catch (error) {
        throw new Error(`Group update failed: ${error.message}`);
    }
};

// Delete Group
export const destroy = async (slug, token) => {
    try {
        const response = await fetch(`${BACKEND_URL}/groups/${slug}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });
        return await handleResponse(response);
    } catch (error) {
        throw new Error(`Deletion failed: ${error.message}`);
    }
};

// Get Group by Slug
export const show = async (slug, token) => {
    try {
        const response = await fetch(`${BACKEND_URL}/groups/${slug}`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });
        return await handleResponse(response);
    } catch (error) {
        throw new Error(`Failed to fetch group: ${error.message}`);
    }
};

// Get Group Posts
export const posts = async (slug, token) => {
    try {
        const response = await fetch(`${BACKEND_URL}/groups/posts/${slug}`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });
        return await handleResponse(response);
    } catch (error) {
        throw new Error(`Failed to fetch posts: ${error.message}`);
    }
};

// Get Group Members
export const members = async (slug, token) => {
    try {
        const response = await fetch(`${BACKEND_URL}/groups/members/${slug}`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });
        return await handleResponse(response);
    } catch (error) {
        throw new Error(`Failed to fetch members: ${error.message}`);
    }
};

// Change Group Status
export const changeStatus = async (slug, status, token) => {
    try {
        const response = await fetch(`${BACKEND_URL}/groups/status/${slug}`, {
            method: "PUT",
            body: JSON.stringify({ status }),
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        return await handleResponse(response);
    } catch (error) {
        throw new Error(`Status change failed: ${error.message}`);
    }
};