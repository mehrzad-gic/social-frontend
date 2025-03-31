import { BACKEND_URL } from "./Config";

export const updateInfo = async (params, slug, token) => {
    try {
        console.log('Params received:', params);
        
        // Create FormData object
        const formData = new FormData();
        
        // Append all fields to FormData
        Object.entries(params).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                if (key === 'img' || key === 'img_bg') {
                    // Handle file fields
                    if (value instanceof File) {
                        formData.append(key, value);
                    }
                } else {
                    // Handle regular fields
                    formData.append(key, value);
                }
            }
        });

        console.log('FormData fields:', Object.fromEntries(formData.entries()));
        
        const response = await fetch(`${BACKEND_URL}/users/update/${slug}`, {
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
    console.log('dataaaaaaaaaaaaa',data);
    
    return data.isUnique; // Assume the response contains an `isUnique` boolean
};

export const show = async (slug,token) => {

    return fetch(`${BACKEND_URL}/users/show/${slug}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }.then((res) => {
        if (!res.ok) {
            throw new Error('Failed to fetch user data');
        }
        return res.json();
    }).catch((err) => {
        console.error(err);
        throw err; // Rethrow error for handling in the component
    }));

}