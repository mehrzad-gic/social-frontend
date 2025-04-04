import { BACKEND_URL } from './Config';

// Like comment
export const likeComment = async (id, token) => {  

    try {  
        
        const response = await fetch(`${BACKEND_URL}/comments/like/${id}`, {  
            method: "POST",  
            headers: {  
                'Content-Type': 'application/json', // Ensure the content type is set to JSON  
                'Authorization': `Bearer ${token}`  
            },  
        });  

        if (!response.ok) {  
            throw new Error('Network response was not ok - ' + response.statusText);  
        }  

        return await response.json();  

    } catch (error) {  

        console.error('Error during the like post request:', error);  
        return { success: false, error: error.message }; // Return error response format  
    }  

};  

export const all = (token) => {
    return fetch(`${BACKEND_URL}/comments/`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
    })
    .then((res) => res.json())
    .catch((err) => err);
}  

export const create = (data,token) => {
    return fetch(`${BACKEND_URL}/comments/create`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .catch((err) => err);
}  

export const update = (slug,data,token) => {
    return fetch(`${BACKEND_URL}/comments/update/${slug}`,{
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .catch((err) => err);
}

export const changeStatus = (slug,token) => {
    return fetch(`${BACKEND_URL}/comments/change-status/${slug}`,{
        method: "PATCH",
        headers: {
            'Authorization' : `Bearer ${token}`
        },
    })
    .then((res) => res.json())  
    .catch((err) => err);
}   

export const destroy = (slug,token) => {
    return fetch(`${BACKEND_URL}/comments/delete/${slug}`,{
        method: "DELETE",
        headers: {
            'Authorization' : `Bearer ${token}`
        },
    })
    .then((res) => res.json())
    .catch((err) => err);
}   

export const getComment = (slug, token) => {
    return fetch(`${BACKEND_URL}/comments/show/${slug}`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
    })
    .then((res) => res.json())
    .catch((err) => err);
}  
