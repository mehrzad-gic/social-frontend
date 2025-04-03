import { BACKEND_URL } from "./Config";
import { createFormData } from "../Helpers/FormData";

export const updateInfo = async (params, slug, token) => {

    try {

        // Create FormData object
        const formData = createFormData(params);
        
        const response = await fetch(`${BACKEND_URL}/users/update-info/${slug}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to update user information');
        }
        
        return data;

    } catch (err) {

        console.error('Update error:', err);
        throw err;
    }
};


export const checkSlugUnique = async (slug, email) => {
    const response = await fetch(`${BACKEND_URL}/dashboard/check-slug-unique/${slug}/${email}`);
    const data = await response.json();    
    return data.isUnique; // Assume the response contains an `isUnique` boolean
};


export const show = async (slug,token) => {

    return fetch(`${BACKEND_URL}/users/show/${slug}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }).then((res) => res.json())
    .catch((err) => err);

}


export const all = (token) => {
    return fetch(`${BACKEND_URL}/users/`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
    })
    .then((res) => res.json())
    .catch((err) => err);
}  


export const create = async (data,token) => {

    try {

        const formData = createFormData(data);

        const response = await fetch(`${BACKEND_URL}/users/create`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        return await response.json();

    } catch (err) {
        console.error('error:', err);
        throw err;
    }
}  

// Controllers/UserController.js
export const update = async (slug, data, token) => {
   
    try {

        const formData = createFormData(data);

        const response = await fetch(`${BACKEND_URL}/users/update/${slug}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        return await response.json();

    } catch (err) {
        console.error('Update error:', err);
        throw err;
    }
};
export const changeStatus = (slug,token) => {
    return fetch(`${BACKEND_URL}/users/change-status/${slug}`,{
        method: "put",
        headers: {
            'Authorization' : `Bearer ${token}`
        },
    })
    .then((res) => res.json())  
    .catch((err) => err);
}   

export const destroy = (slug,token) => {
    return fetch(`${BACKEND_URL}/users/delete/${slug}`,{
        method: "DELETE",
        headers: {
            'Authorization' : `Bearer ${token}`
        },
    })
    .then((res) => res.json())
    .catch((err) => err);
}   

export const getUser = (slug, token) => {
    return fetch(`${BACKEND_URL}/users/show/${slug}`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
    })
    .then((res) => res.json())
    .catch((err) => err);
}