import { BACKEND_URL } from "./Config";

export const updateInfo = async (params, token) => {
    try {
        const response = await fetch(`${BACKEND_URL}/dashboard/update-info`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: params,
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to update user information');
        }
        
        return data; // Return the response data for further processing
    } catch (err) {
        console.error(err);
        throw err; // Rethrow error for handling in the component
    }
};

export const checkSlugUnique = async (slug, email) => {
    const response = await fetch(`${BACKEND_URL}/dashboard/check-slug-unique/${slug}/${email}`);
    const data = await response.json();
    console.log('dataaaaaaaaaaaaa',data);
    
    return data.isUnique; // Assume the response contains an `isUnique` boolean
};