import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";  
import { useFormik } from "formik";
import * as Yup from "yup"; // For validation
import { updateInfo, checkSlugUnique } from "../../../Controllers/UserController"; // Import necessary functions
import { Link } from "react-router-dom";
import { FaUsers, FaComments, FaHeart, FaBookmark, FaChartLine, FaBell, FaCog } from "react-icons/fa";

const Info = () => {
    const { user, token } = useOutletContext();  
    const [activeTab, setActiveTab] = useState('overview');

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
