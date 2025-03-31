import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";  
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updateInfo, uploadImage } from "../../../Controllers/UserController";
import { Link } from "react-router-dom";
import { FaUsers, FaComments, FaHeart, FaBookmark, FaChartLine, FaBell, FaCog } from "react-icons/fa";
import { toast } from "react-toastify";

const schema = yup.object({
    name: yup.string().required("Name is required").max(255),
    slug: yup.string()
        .required("User name is required")
        .max(255),
    title: yup.string().max(255).nullable(),
    bio: yup.string().nullable(),
    birthday: yup.date().nullable(),
    x: yup.string().url().nullable(),
    github: yup.string().url().nullable(),
    img: yup.mixed().nullable()
        .test("fileFormat", "Unsupported Format", value => {
            if (!value) return true;
            return ["image/jpeg", "image/png", "image/webp", "image/jpg", "image/gif"].includes(value.type);
        })
        .test("fileSize", "File too large", value => {
            if (!value) return true;
            return value.size <= 2048 * 1024; // 2MB
        }),
    img_bg: yup.mixed().nullable()
        .test("fileFormat", "Unsupported Format", value => {
            if (!value) return true;
            return ["image/jpeg", "image/png", "image/webp", "image/jpg", "image/gif"].includes(value.type);
        })
        .test("fileSize", "File too large", value => {
            if (!value) return true;
            return value.size <= 2048 * 1024; // 2MB
        }),
});

const Info = () => {
    const { user, token } = useOutletContext();
    const [isLoading, setIsLoading] = useState(false);
    const [previewImg, setPreviewImg] = useState(null);
    const [previewImgBg, setPreviewImgBg] = useState(null);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: user.name,
            slug: user.slug,
            title: user.title || '',
            bio: user.bio || '',
            birthday: user.birthday || '',
            x: user.x || '',
            github: user.github || '',
        }
    });

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            
            console.log('Raw form data:', data);
            
            // Create a clean data object without null/undefined values
            const cleanData = Object.entries(data).reduce((acc, [key, value]) => {
                if (value !== null && value !== undefined && value !== '') {
                    acc[key] = value;
                }
                return acc;
            }, {});

            console.log('Cleaned data:', cleanData);

            // Ensure required fields are present
            if (!cleanData.name) {
                throw new Error('Name is required');
            }
            if (!cleanData.slug) {
                throw new Error('Username is required');
            }

            const res = await updateInfo(cleanData, user.slug, token);
            
            if(res.success) {
                const localUser = JSON.parse(localStorage.getItem("user")); 
                localUser.user = res.user;
                localStorage.setItem("user", JSON.stringify(localUser));
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.error('Submission error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            setValue(fieldName, file);
            
            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            
            // Update preview state
            if (fieldName === 'img') {
                setPreviewImg(previewUrl);
            } else if (fieldName === 'img_bg') {
                setPreviewImgBg(previewUrl);
            }
        }
    };

    // Cleanup preview URLs on component unmount
    useEffect(() => {
        return () => {
            if (previewImg) URL.revokeObjectURL(previewImg);
            if (previewImgBg) URL.revokeObjectURL(previewImgBg);
        };
    }, [previewImg, previewImgBg]);

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Main Content */}
                <div className="col-12">
                    {/* Page Header */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 className="mb-0">Dashboard Overview</h4>
                        <div className="d-flex gap-2">
                            <button className="btn btn-light">
                                <FaBell className="me-2" /> Notifications
                            </button>
                            <button className="btn btn-light">
                                <FaCog className="me-2" /> Settings
                            </button>
                        </div>
                    </div>

                    {/* Profile Form */}
                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-header bg-transparent border-0">
                            <h5 className="card-title mb-0">Profile Information</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                            {...register("name")}
                                        />
                                        {errors.name && (
                                            <div className="invalid-feedback">{errors.name.message}</div>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Username</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.slug ? "is-invalid" : ""}`}
                                            {...register("slug")}
                                        />
                                        {errors.slug && (
                                            <div className="invalid-feedback">{errors.slug.message}</div>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Title</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.title ? "is-invalid" : ""}`}
                                            {...register("title")}
                                        />
                                        {errors.title && (
                                            <div className="invalid-feedback">{errors.title.message}</div>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Birthday</label>
                                        <input
                                            // defaultValue={user.birthday}
                                            type="date"
                                            className={`form-control ${errors.birthday ? "is-invalid" : ""}`}
                                            {...register("birthday")}
                                        />
                                        {errors.birthday && (
                                            <div className="invalid-feedback">{errors.birthday.message}</div>
                                        )}
                                        {user.birthday && (
                                            <div className="form-text">
                                                Current birthday: {new Date(user.birthday).toLocaleDateString()}
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">GitHub</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.github ? "is-invalid" : ""}`}
                                            {...register("github")}
                                        />
                                        {errors.github && (
                                            <div className="invalid-feedback">{errors.github.message}</div>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">X (Twitter)</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.x ? "is-invalid" : ""}`}
                                            {...register("x")}
                                        />
                                        {errors.x && (
                                            <div className="invalid-feedback">{errors.x.message}</div>
                                        )}
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Bio</label>
                                        <textarea
                                            className={`form-control ${errors.bio ? "is-invalid" : ""}`}
                                            rows="3"
                                            {...register("bio")}
                                        />
                                        {errors.bio && (
                                            <div className="invalid-feedback">{errors.bio.message}</div>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Profile Image</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className={`form-control ${errors.img ? "is-invalid" : ""}`}
                                            onChange={(e) => handleFileChange(e, "img")}
                                        />
                                        {(previewImg || user.img) && (
                                            <div className="mt-2">
                                                <img 
                                                    src={previewImg || JSON.parse(user.img).url} 
                                                    alt="Profile" 
                                                    className="img-thumbnail" 
                                                    style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'cover' }}
                                                />
                                            </div>
                                        )}
                                        {errors.img && (
                                            <div className="invalid-feedback">{errors.img.message}</div>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Background Image</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className={`form-control ${errors.img_bg ? "is-invalid" : ""}`}
                                            onChange={(e) => handleFileChange(e, "img_bg")}
                                        />
                                        {(previewImgBg || user.img_bg) && (
                                            <div className="mt-2">
                                                <img 
                                                    src={previewImgBg || JSON.parse(user.img_bg).url} 
                                                    alt="Background" 
                                                    className="img-thumbnail" 
                                                    style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'cover' }}
                                                />
                                            </div>
                                        )}
                                        {errors.img_bg && (
                                            <div className="invalid-feedback">{errors.img_bg.message}</div>
                                        )}
                                    </div>
                                    <div className="col-12">
                                        <button 
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Updating..." : "Update Profile"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Info;
