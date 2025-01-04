import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";  
import { useFormik } from "formik";
import * as Yup from "yup"; // For validation
import { updateInfo, checkSlugUnique } from "../../../Controllers/UserController"; // Import necessary functions

const Info = () => {
    const { user, token } = useOutletContext();  

    const formik = useFormik({
        initialValues: {
            name: user.name || '',
            title: user.title || '',
            slug: user.slug || '',
            bio: user.bio || '',
            birthday: user.birthday || '',
            github: user.github || '',
            x: user.x || '',
            img: null,
            img_bg: null,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required").max(255),
            slug: Yup.string()
                .required("User name is required")
                .max(255)
                .test('unique', 'This username is already taken', async (value) => {
                    if (!value) return true; // Skip validation if slug is empty
                    const isUnique = await checkSlugUnique(value,user.email); // Call to backend to check uniqueness
                    return isUnique;
                }),
            title: Yup.string().max(255).nullable(),
            bio: Yup.string().nullable(),
            birthday: Yup.date().nullable(),
            x: Yup.number().integer().nullable(),
            github: Yup.string().max(255).nullable(),
            img: Yup.mixed().nullable()
                .test("fileFormat", "Unsupported Format", value => {
                    if (!value) return true; // Skip validation if no file
                    return ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(value.type);
                })
                .test("fileSize", "File too large", value => {
                    if (!value) return true; // Skip validation if no file
                    return value.size <= 2048 * 1024; // 2MB
                }),
            img_bg: Yup.mixed().nullable()
                .test("fileFormat", "Unsupported Format", value => {
                    if (!value) return true; // Skip validation if no file
                    return ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(value.type);
                })
                .test("fileSize", "File too large", value => {
                    if (!value) return true; // Skip validation if no file
                    return value.size <= 2048 * 1024; // 2MB
                }),
        }),
        onSubmit: async (values) => {
            const params = new FormData();
            Object.keys(values).forEach(key => {
                params.append(key, values[key]);
            });

            try {
                const token = JSON.parse(localStorage.getItem('user')).value.jwt;
                const result = await updateInfo(params, token);
                console.log(result);
                
                alert(result.message); // Show success message
            } catch (error) {
                // Check if the error has a response
                if (error.response) {
                    // You can customize the message based on the status code or response
                    alert(`Error: ${error.response.data.message || 'An error occurred'}`);
                } else {
                    alert('An unexpected error occurred. Please try again later.');
                }
            }
        },
    });

    useEffect(() => {
        if (user) {
            formik.setValues({
                name: user.name || '',
                title: user.title || '',
                slug: user.slug || '',
                bio: user.bio || '',
                birthday: user.birthday || '',
                github: user.github || '',
                x: user.x || '',
                img: null,
                img_bg: null,
            });
        }
    }, [user]);

    return (
        <div>
            <div className="card mb-4">
                <div className="card-header border-0 pb-0">
                    <h1 className="h5 card-title">Account Settings</h1>
                    <p className="mb-0">He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy.</p>
                </div>
                <div className="card-body">
                    <form className="row g-3" onSubmit={formik.handleSubmit}>
                        <div className="col-sm-6 col-lg-6">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter your name"
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="invalid-feedback">{formik.errors.name}</div>
                            ) : null}
                        </div>
                        <div className="col-sm-6 col-lg-6">
                            <label className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter your title"
                            />
                        </div>
                        <div className="col-sm-6">
                            <label className="form-label">User Name</label>
                            <input
                                type="text"
                                className={`form-control ${formik.touched.slug && formik.errors.slug ? 'is-invalid' : ''}`}
                                name="slug"
                                value={formik.values.slug}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter your username"
                            />
                            {formik.touched.slug && formik.errors.slug ? (
                                <div className="invalid-feedback">{formik.errors.slug}</div>
                            ) : null}
                        </div>
                        <div className="col-lg-6">
                            <label className="form-label">Birthday</label>
                            <input
                                type="date"
                                className={`form-control ${formik.touched.birthday && formik.errors.birthday ? 'is-invalid' : ''}`}
                                name="birthday"
                                value={formik.values.birthday}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.birthday && formik.errors.birthday ? (
                                <div className="invalid-feedback">{formik.errors.birthday}</div>
                            ) : null}
                        </div>
                        <div className="col-sm-6">
                            <label className="form-label">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                value={user.email}
                                readOnly
                                placeholder="Your email address"
                            />
                        </div>
                        <div className="col-sm-6">
                            <label className="form-label">Image Background</label>
                            <input
                                type="file"
                                className="form-control"
                                name="img_bg"
                                onChange={(event) => {
                                    formik.setFieldValue("img_bg", event.currentTarget.files[0]);
                                }}
                            />
                        </div>
                        <div className="col-sm-6">
                            <label className="form-label">Image</label>
                            <input
                                type="file"
                                className="form-control"
                                name="img"
                                onChange={(event) => {
                                    formik.setFieldValue("img", event.currentTarget.files[0]);
                                }}
                            />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Overview</label>
                            <textarea
                                className="form-control"
                                rows="4"
                                name="bio"
                                value={formik.values.bio}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Write a brief overview about yourself"
                            />
                            <small>Character limit: 555</small>
                        </div>
                        <hr />
                        <div className="col-12">
                            <h5 className="card-title mb-0">Social Links</h5>
                        </div>
                        <div className="col-sm-6">
                            <label className="form-label">Github</label>
                            <input
                                type="text"
                                className="form-control"
                                name="github"
                                value={formik.values.github}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter your GitHub profile link"
                            />
                        </div>
                        <div className="col-sm-6">
                            <label className="form-label">X</label>
                            <input
                                type="text"
                                className="form-control"
                                name="x"
                                value={formik.values.x}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter your X (Twitter) handle"
                            />
                        </div>
                        <div className="col-12 text-end">
                            <button type="submit" className="btn btn-sm btn-primary mb-0">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Password Change Section */}
            <div className="card">
                <div className="card-header border-0 pb-0">
                    <h5 className="card-title">Change your password</h5>
                    <p className="mb-0">See resolved goodness felicity shy civility domestic had but.</p>
                </div>
                <div className="card-body">
                    <form className="row g-3">
                        <div className="col-12">
                            <label className="form-label">Current password</label>
                            <input type="password" className="form-control" placeholder="Enter your current password" />
                        </div>
                        <div className="col-12">
                            <label className="form-label">New password</label>
                            <div className="input-group">
                                <input className="form-control" type="password" placeholder="Enter new password" />
                                <span className="input-group-text p-0">
                                    <i className="fa-solid fa-eye-slash cursor-pointer p-2 w-40px"></i>
                                </span>
                            </div>
                            <div className="mt-2 password-strength-meter">
                                <div className="password-strength-meter-score"></div>
                            </div>
                            <div className="rounded mt-1">Write your password...</div>
                        </div>
                        <div className="col-12">
                            <label className="form-label">Confirm password</label>
                            <input type="password" className="form-control" placeholder="Confirm your new password" />
                        </div>
                        <div className="col-12 text-end">
                            <button type="submit" className="btn btn-primary mb-0">Change Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Info;
