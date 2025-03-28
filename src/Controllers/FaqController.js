import { BACKEND_URL } from './Config';

export const index = async (jwt) => {
    try {
        const response = await fetch(`${BACKEND_URL}/faqs`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const show = async (slug, jwt) => {
    try {
        const response = await fetch(`${BACKEND_URL}/faqs/show/${slug}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const create = async (data, jwt) => {
    try {
        const response = await fetch(`${BACKEND_URL}/faqs/create`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const update = async (slug, data, jwt) => {
    try {
        const response = await fetch(`${BACKEND_URL}/faqs/update/${slug}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const destroy = async (slug, jwt) => {
    try {
        const response = await fetch(`${BACKEND_URL}/faqs/delete/${slug}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const changeStatus = async (slug, jwt) => {
    try {
        const response = await fetch(`${BACKEND_URL}/faqs/change-status/${slug}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: error.message };
    }
};
