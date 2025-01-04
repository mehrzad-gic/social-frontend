
//! ----------------- Local Storage --------------------------------
import { verifyUser,genToken } from "../Controllers/AuthController";
import { BACKEND_URL } from "../Controllers/Config";

export const setLocalStorage = (key,value,expirationInDays) => {

    const now = new Date();

    const item = {
      value: value,
      expiration: now.getTime() + expirationInDays * 24 * 60 * 60 * 1000,
    };

    localStorage.setItem(key, JSON.stringify(item));  
};


export const getLocalStorage = (key) => {

    const itemStr = localStorage.getItem(key);
    
    if (!itemStr) {
    
        return null;
    }

    return itemStr;

};


const isValidJSON = (str) => {  
    if (typeof str !== 'string') return false; // Ensure it's a string  
    try {  
        JSON.parse(str); // Try parsing  
        return true;  
    } catch {  
        return false; // Return false if parsing fails  
    }  
};  



export const getFile = async (name) => { 
    
    const storage = JSON.parse(localStorage.getItem('user'));

    let token = '' ;

    if (storage?.value?.token) {  

        token = storage.value.token;
    
    } else {

        return false;
    } 

    try {  
        // Fetch the image file directly from the server  
        const response = await fetch(`${BACKEND_URL}/file/${name}`, {  
            method: "POST",  
            headers: {  
                'Content-Type': 'application/json',  
                'Authorization': `Bearer ${token}` // Include token for authorization if needed  
            },  
        });  

        // Check if the response is OK (status in the range 200-299)  
        if (!response.ok) {  
            throw new Error('Image not found or unable to access the file');  
        }  

        // Convert the image response to a Blob  
        const imageBlob = await response.blob();  
        const imageUrl = URL.createObjectURL(imageBlob); // Create a URL for the image  

        return imageUrl; // Return the image URL to display it in an <img> tag  

    } catch (error) {  
        console.error("Error fetching file:", error);  
        return false; // Return false in case of error  
    }  

};





//! ----------------- Authentication --------------------------------

export const login = async () => {  

    const user = getLocalStorage('user');  
    const storage = JSON.parse(user);  

    if (storage?.value) {

        // Validate the entire user string, not just user.value  
        if (isValidJSON(user)) {  

            const now = new Date();  

            if (now.getTime() > storage.expiration) {  

                localStorage.removeItem('user');  

                return false;  
            }  

            let final = false;  
            const res = await verifyUser(storage.value.jwt);  
            
            
            if (res.success === true) {     

                final = true;  

                let newStorage = storage;

                newStorage.value.user = res.user;

                console.log(`token => ${res.user}`)

                localStorage.setItem('user',JSON.stringify(newStorage))  
                
                console.log(newStorage);
                
                
            } else if (res.error === 'Token has expired') {  
                // Request a new token  
                const newTokenResponse = await genToken({ token: storage.value.jwt, user: storage.value.user });  
                
                if (newTokenResponse.success && newTokenResponse.message === 'Token Refreshed Successfully') {  
                                      
                    const now = new Date();
                    const item = {
                      value: newTokenResponse.data,
                      expiration: now.getTime() + 21 * 24 * 60 * 60 * 1000,
                    };
                    localStorage.setItem('user', JSON.stringify(item));

                    final = true;  

                } else if (newTokenResponse.message === 'Token is still valid') {  
                    final = true;  
                } else {  
                    final = false;  
                }  
            }  

            return final; // Return the final status  
        }  

        return false;  

    } else {  
        
        return false;  
    }  

};

