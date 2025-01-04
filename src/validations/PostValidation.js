import * as Yup from 'yup';  

const validationSchema = Yup.object().shape({  
    name: Yup.string()  
        .required('Title is required')  
        .min(4, 'Title must be at least 4 characters') // Corrected to 4 characters
        .max(100, 'Title must be 100 characters or less'),  
    imgs: Yup.array()  // Changed from img to imgs for multiple files
        .required('At least one image is required')  
        .min(1, 'At least one image is required') // Ensure at least one image is uploaded
        .test('fileType', 'Unsupported File Format', value => {  
            return value && value.every(file => file.type.includes('image/')); // Check all files
        }),  
    text: Yup.string()  
        .required('Text is required')  
        .min(10, 'Text must be at least 10 characters'),  
    tags: Yup.array()  
        .min(1, 'At least one tag is required')  
        .required('Tags are required'),  
});  

export default validationSchema;
