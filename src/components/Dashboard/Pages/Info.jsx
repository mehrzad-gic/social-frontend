import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";  
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInfo, checkSlugUnique } from "../../../Controllers/UserController";
import { Link } from "react-router-dom";
import { FaUsers, FaComments, FaHeart, FaBookmark, FaChartLine, FaBell, FaCog } from "react-icons/fa";
import { toast } from "react-toastify";

const schema = yup.object({
    name: yup.string().required("Name is required").max(255),
    slug: yup.string()
        .required("User name is required")
        .max(255)
        .test('unique', 'This username is already taken', async (value) => {
            if (!value) return true;
            const isUnique = await checkSlugUnique(value);
            return isUnique;
        }),
    title: yup.string().max(255).nullable(),
    bio: yup.string().nullable(),
    birthday: yup.date().nullable(),
    x: yup.number().integer().nullable(),
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
            return updateInfo(params, token);
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
        updateInfoMutation.mutate(data);
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
                                            type="submit" 
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

                    {/* Stats Cards */}
                    <div className="row g-4 mb-4">
                        <div className="col-sm-6 col-xl-3">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0">
                                            <div className="avatar avatar-lg bg-primary bg-opacity-10 rounded">
                                                <FaUsers className="text-primary fs-4" />
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h6 className="card-title mb-1">Total Followers</h6>
                                            <h2 className="mb-0">2.4k</h2>
                                            <small className="text-success">
                                                <FaChartLine className="me-1" /> 12% increase
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0">
                                            <div className="avatar avatar-lg bg-success bg-opacity-10 rounded">
                                                <FaComments className="text-success fs-4" />
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h6 className="card-title mb-1">Comments</h6>
                                            <h2 className="mb-0">1.2k</h2>
                                            <small className="text-success">
                                                <FaChartLine className="me-1" /> 8% increase
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0">
                                            <div className="avatar avatar-lg bg-warning bg-opacity-10 rounded">
                                                <FaHeart className="text-warning fs-4" />
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h6 className="card-title mb-1">Likes</h6>
                                            <h2 className="mb-0">3.8k</h2>
                                            <small className="text-success">
                                                <FaChartLine className="me-1" /> 15% increase
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0">
                                            <div className="avatar avatar-lg bg-info bg-opacity-10 rounded">
                                                <FaBookmark className="text-info fs-4" />
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h6 className="card-title mb-1">Saved Posts</h6>
                                            <h2 className="mb-0">856</h2>
                                            <small className="text-success">
                                                <FaChartLine className="me-1" /> 5% increase
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="row g-4">
                        {/* Activity Feed */}
                        <div className="col-lg-8">
                            <div className="card border-0 shadow-sm">
                                <div className="card-header bg-transparent border-0">
                                    <h5 className="card-title mb-0">Recent Activity</h5>
                                </div>
                                <div className="card-body">
                                    <div className="activity-feed">
                                        {/* Activity Item */}
                                        <div className="d-flex mb-4">
                                            <div className="flex-shrink-0">
                                                <div className="avatar avatar-md rounded-circle bg-primary bg-opacity-10">
                                                    <FaUsers className="text-primary" />
                                                </div>
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <h6 className="mb-1">New Follower</h6>
                                                <p className="mb-0 text-muted">John Doe started following you</p>
                                                <small className="text-muted">2 hours ago</small>
                                            </div>
                                        </div>

                                        {/* Activity Item */}
                                        <div className="d-flex mb-4">
                                            <div className="flex-shrink-0">
                                                <div className="avatar avatar-md rounded-circle bg-success bg-opacity-10">
                                                    <FaComments className="text-success" />
                                                </div>
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <h6 className="mb-1">New Comment</h6>
                                                <p className="mb-0 text-muted">Jane Smith commented on your post</p>
                                                <small className="text-muted">4 hours ago</small>
                                            </div>
                                        </div>

                                        {/* Activity Item */}
                                        <div className="d-flex mb-4">
                                            <div className="flex-shrink-0">
                                                <div className="avatar avatar-md rounded-circle bg-warning bg-opacity-10">
                                                    <FaHeart className="text-warning" />
                                                </div>
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <h6 className="mb-1">New Like</h6>
                                                <p className="mb-0 text-muted">Mike Johnson liked your post</p>
                                                <small className="text-muted">6 hours ago</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Posts */}
                        <div className="col-lg-4">
                            <div className="card border-0 shadow-sm">
                                <div className="card-header bg-transparent border-0">
                                    <h5 className="card-title mb-0">Recent Posts</h5>
                                </div>
                                <div className="card-body">
                                    <div className="recent-posts">
                                        {/* Post Item */}
                                        <div className="d-flex mb-3">
                                            <img src="assets/images/post/01.jpg" className="rounded" width="60" height="60" alt="Post" />
                                            <div className="ms-3">
                                                <h6 className="mb-1">Beautiful Sunset</h6>
                                                <small className="text-muted">2 hours ago</small>
                                            </div>
                                        </div>

                                        {/* Post Item */}
                                        <div className="d-flex mb-3">
                                            <img src="assets/images/post/02.jpg" className="rounded" width="60" height="60" alt="Post" />
                                            <div className="ms-3">
                                                <h6 className="mb-1">City Life</h6>
                                                <small className="text-muted">4 hours ago</small>
                                            </div>
                                        </div>

                                        {/* Post Item */}
                                        <div className="d-flex">
                                            <img src="assets/images/post/03.jpg" className="rounded" width="60" height="60" alt="Post" />
                                            <div className="ms-3">
                                                <h6 className="mb-1">Nature Walk</h6>
                                                <small className="text-muted">6 hours ago</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Info;
