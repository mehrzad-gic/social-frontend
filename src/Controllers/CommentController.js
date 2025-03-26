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
