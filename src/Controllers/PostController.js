import { BACKEND_URL } from './Config';

// Create Post
export const createPost = async (params,token) => {

    return fetch(`${BACKEND_URL}/posts/create`, {
        method: "POST",
        headers: {
            'Authorization' : `Bearer ${token}`
        },
        body: params, 
    })
    .then((response) => response.json())
    .catch((err) => err);

};


// Like Post
export const likePost = async (id, token) => {  

    try {  
        
        const response = await fetch(`${BACKEND_URL}/posts/like/${id}`, {  
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


// Save Post
export const savePost = async (id, token) => {  

    try {  
        
        const response = await fetch(`${BACKEND_URL}/posts/save/${id}`, {  
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

        console.error('Error during the save post request:', error);  
        return { success: false, error: error.message }; // Return error response format  
    }  

};  
 

export const all = (token,page = 1) => {

    return fetch(`${BACKEND_URL}/posts/?page=${page}`,{
        method: "GET",

        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },

    })
    .then((res) => res.json())
    .catch((err) => err);

}  
 

export const addPostComment = async (token, body, id) => { 

    const response = await fetch(`${BACKEND_URL}/comments/create/?id=${id}&model=posts`, { // Corrected URL construction  
        method: "POST",  
        headers: {  
            'Content-Type': 'application/json',  // It is a good practice to set content type for JSON payload  
            'Authorization': `Bearer ${token}`  
        },  
        body: JSON.stringify(body), // Wrap the params in an object and stringify  
    });  

    // Check if the response is ok  
    if (!response.ok) {  
        const errorData = await response.json();  
        throw new Error(errorData.error || 'Failed to add comment.'); // Throw error for non-200 responses  
    }  

    // Return the JSON response  
    return await response.json();  
};  


export const postComments = (token,id,page = 1) => {

    return fetch(`${BACKEND_URL}/comments/?id=${id}&page=${page}&model=posts&parent_id=0`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
    })
    .then((res) => res.json())
    .catch((err) => err);

}

// change status
export const changeStatus = (slug,token) => {
    return fetch(`${BACKEND_URL}/posts/change-status/${slug}`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
    })
    .then((res) => res.json())
    .catch((err) => err);
}


// destroy
export const destroy = (slug,token) => {
    return fetch(`${BACKEND_URL}/posts/delete/${slug}`,{
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
    })
    .then((res) => res.json())
    .catch((err) => err);
}


// show
export const show = (slug,token) => {
    return fetch(`${BACKEND_URL}/posts/show/${slug}`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
    })
    .then((res) => res.json())
    .catch((err) => err);
}


// update
export const update = (slug,data,token) => {
    return fetch(`${BACKEND_URL}/posts/update/${slug}`,{
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
