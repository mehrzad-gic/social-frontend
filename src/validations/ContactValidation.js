import * as Yup from "yup";

export const ContactSchema = Yup.object().shape({
    fullname: Yup.string().required("fullname is required").max(255,'Name must be at most 255 characters'),
    photo: Yup.string().url("invalid url").required("photo is required"),
    mobile: Yup.number().required("mobile is required"),
    email: Yup.string().email("invalid email address").required("email is required"),
    job: Yup.string().nullable(),
    group: Yup.string().required("group is required"),
});
