import * as yup from 'yup';

// schema
const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    // email: yup.string().email('Invalid email').required('Email is required'),
    title: yup.string().required('Title is required'),
    birthday: yup.date().nullable(),
    github: yup.string().nullable(),
    x: yup.string().nullable(),
    img: yup.mixed().nullable(),
    img_bg: yup.mixed().nullable(),
    bio: yup.string().nullable(),
    status: yup.number().oneOf([0, 1], 'Invalid status value'),
    roles: yup.array().optional().of(yup.number())
});

export { schema };
