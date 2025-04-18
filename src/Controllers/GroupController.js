import { BACKEND_URL } from "./Config.js";
import { createFormData } from "../Helpers/FormData.js";



// Get All Groups
export const all = async (token,page) => {
    return fetch(`${BACKEND_URL}/groups?page=${page}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json())
    .catch(error => {
        throw new Error(`Failed to fetch groups: ${error.message}`);
    });
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

        if (!response.ok) throw new Error('Failed to create group');

        return await response.json();
  
    } catch (error) {

        throw new Error(`Group creation failed: ${error.message}`);
    }

};


// Update Group
export const update = async (slug, data, token) => {

    try {

        const formData = createFormData(data);

        const response = await fetch(`${BACKEND_URL}/groups/update/${slug}`, {
            method: "PUT",
            body: formData,
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!response.ok) throw new Error('Failed to update group');

        return await response.json();

    } catch (error) {

        throw new Error(`Group update failed: ${error.message}`);
    }

};


// Delete Group
export const destroy = async (slug, token) => {

    try {

        const response = await fetch(`${BACKEND_URL}/groups/delete/${slug}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!response.ok) throw new Error('Failed to delete group');

        return await response.json();

    } catch (error) {
        throw new Error(`Deletion failed: ${error.message}`);
    }

};

// Get Group by Slug
export const show = async (slug, token) => {

    try {

        const response = await fetch(`${BACKEND_URL}/groups/show/${slug}`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });
        console.log(response);
        if (!response.ok) throw new Error('Failed to fetch group');
        
        return await response.json();

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

        if (!response.ok) throw new Error('Failed to fetch posts');

        return await response.json();

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

        if (!response.ok) throw new Error('Failed to fetch members');

        return await response.json();

    } catch (error) {
        throw new Error(`Failed to fetch members: ${error.message}`);
    }
};


// Change Group Status
export const changeStatus = async (slug, token) => {

    try {

        const response = await fetch(`${BACKEND_URL}/groups/change-status/${slug}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) throw new Error('Failed to change status');

        return await response.json();

    } catch (error) {
        throw new Error(`Status change failed: ${error.message}`);
    }
};