export const createFormData = (data) => {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
            if (key === 'roles' && Array.isArray(value)) {
                value.forEach(role => formData.append('roles[]', role));
            } else if (key === 'birthday' && value) {
                formData.append(key, new Date(value).toISOString().split('T')[0]);
            } else if (value instanceof File) {
                formData.append(key, value);
            } else {
                formData.append(key, value);
            }
        }
    });

    return formData;
};