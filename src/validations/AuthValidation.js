import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
    name: Yup.string().required("name is required").min(4).max(255,'Name must be at most 255 characters'),
    email: Yup.string().email("invalid email address").required("email is required"),
    password: Yup.string().min(8).required(),
    password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required("Password confirmation is required"),
});

export const loginSchema = Yup.object().shape({
    email: Yup.string().email("invalid email address").required("email is required"),
    password: Yup.string().min(8).required("password is required"),
});