import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";  
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInfo } from "../../../Controllers/UserController";
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
    x: yup.string().nullable(),
    github: yup.string().max(255).nullable(),
    img: yup.mixed().nullable()
        .test("fileFormat", "Unsupported Format", value => {
            if (!value) return true;
            return ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(value.type);
        })
        .test("fileSize", "File too large", value => {
            if (!value) return true;
            return value.size <= 2048 * 1024; // 2MB
        }),
    img_bg: yup.mixed().nullable()
        .test("fileFormat", "Unsupported Format", value => {
            if (!value) return true;
            return ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(value.type);
        })
        .test("fileSize", "File too large", value => {
            if (!value) return true;
            return value.size <= 2048 * 1024; // 2MB
        }),
});

const Info = () => {
    
    const { user, token } = useOutletContext();
    const [activeTab, setActiveTab] = React.useState('overview');
    const queryClient = useQueryClient();    

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: user.name || '',
            title: user.title || '',
            slug: user.slug || '',
            bio: user.bio || '',
            birthday: user.birthday || '',
            github: user.github || '',
            x: user.x || '',
            img: null,
            img_bg: null,
        }
    });

    // Update form values when user data changes
    useEffect(() => {
        if (user) {
            setValue("name", user.name || '');
            setValue("title", user.title || '');
            setValue("slug", user.slug || '');
            setValue("bio", user.bio || '');
            setValue("birthday", user.birthday || '');
            setValue("github", user.github || '');
            setValue("x", user.x || '');
            setValue("img", null);
            setValue("img_bg", null);
        }
    }, [user, setValue]);

    // Update info mutation
    const updateInfoMutation = useMutation({
        mutationFn: async (data) => {
            const params = new FormData();
            Object.keys(data).forEach(key => {
                params.append(key, data[key]);
            });
            console.log(params);
            
        },
        onSuccess: (result) => {
            toast.success(result.message);
            queryClient.invalidateQueries(['user']); // Invalidate user query to refetch
        },
        onError: (error) => {
            if (error.response) {
                toast.error(error.response.data.message || 'An error occurred');
            } else {
                toast.error('An unexpected error occurred. Please try again later.');
            }
        }
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        setValue(fieldName, file);
    };

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
                                            type="date"
                                            className={`form-control ${errors.birthday ? "is-invalid" : ""}`}
                                            {...register("birthday")}
                                        />
                                        {errors.birthday && (
                                            <div className="invalid-feedback">{errors.birthday.message}</div>
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
                                            className={`form-control ${errors.img ? "is-invalid" : ""}`}
                                            onChange={(e) => handleFileChange(e, "img")}
                                        />
                                        {errors.img && (
                                            <div className="invalid-feedback">{errors.img.message}</div>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Background Image</label>
                                        <input
                                            type="file"
                                            className={`form-control ${errors.img_bg ? "is-invalid" : ""}`}
                                            onChange={(e) => handleFileChange(e, "img_bg")}
                                        />
                                        {errors.img_bg && (
                                            <div className="invalid-feedback">{errors.img_bg.message}</div>
                                        )}
                                    </div>
                                    <div className="col-12">
                                        <button 
                                            onSubmit={onSubmit}
                                            className="btn btn-primary"
                                            disabled={updateInfoMutation.isPending}
                                        >
                                            {updateInfoMutation.isPending ? "Updating..." : "Update Profile"}
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
