import { useEffect, useState } from "react";
import { all } from "../../../Controllers/TagController";
import { createPost } from "../../../Controllers/PostController";
import { getLocalStorage } from "../../../Helpers/Helpers";
import { toast } from "react-toastify";
import validationSchema from "../../../validations/PostValidation";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Loading from "../Ui/Loading";

// Constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];

// Create Post Component
const Create = ({ isLoading }) => {

    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Fetch tags on component mount
    useEffect(() => {
        const fetchTags = async () => {
            const token = JSON.parse(localStorage.getItem("user"))?.jwt;

            if (!token) {
                toast.error("You must be logged in to create a post.");
                navigate("/login");
                return;
            }

            try {
                const res = await all(token);
                setTags(res.data || []);
            } catch (err) {
                console.error("Error fetching tags:", err);
                toast.error("Failed to fetch tags. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (!isLoading) {
            fetchTags();
        }
    }, [isLoading, navigate]);

    // Formik setup
    const formik = useFormik({
        initialValues: {
            name: "",
            imgs: [],
            text: "",
            tags: [],
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsSubmitting(true);

            // Validate files
            if (values.imgs.some((file) => file.size > MAX_FILE_SIZE)) {
                toast.error("File size must be less than 5MB.");
                setIsSubmitting(false);
                return;
            }

            if (values.imgs.some((file) => !ALLOWED_FILE_TYPES.includes(file.type))) {
                toast.error("Only JPEG, PNG, and GIF files are allowed.");
                setIsSubmitting(false);
                return;
            } 

            // Prepare form data
            const storage = JSON.parse(getLocalStorage("user"));
            const data = new FormData();
            data.append("name", values.name);
            values.imgs.forEach((img) => data.append("imgs[]", img));
            data.append("text", values.text);
            values.tags.forEach((tag) => data.append("tags[]", tag));

            const jwt = storage.jwt;
            console.log(data);
            
            try {
                const res = await createPost(data, jwt);
                console.log(res);
                
                if (res.success) {
                    toast.success("Post created successfully!");
                    navigate("/");
                } else {
                    toast.error(res.message || "Failed to create post.");
                }
            } catch (error) {
                console.error("Error creating post:", error);
                toast.error("An error occurred while creating the post.");
            } finally {
                setIsSubmitting(false);
            }
        },
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;

        if (type === "file") {
            const selectedFiles = Array.from(e.target.files);
            formik.setFieldValue(name, selectedFiles);
        } else if (name === "tags") {
            const tags = checked
                ? [...formik.values.tags, value]
                : formik.values.tags.filter((tag) => tag !== value);
            formik.setFieldValue(name, tags);
        } else {
            formik.setFieldValue(name, value);
        }
    };

    // Show loading spinner while fetching tags
    if (loading) return <Loading />;

    return (
        <div className="container">
            <h2 className="mt-5 text-info">Create Article</h2>
            <form className="mt-4" onSubmit={formik.handleSubmit}>
                <div className="row">
                    {/* Title */}
                    <div className="col-md-8">
                        <label htmlFor="name" className="mb-2 fs-5">
                            Title :
                        </label>
                        <input
                            type="text"
                            className={`form-control border ${
                                formik.touched.name && formik.errors.name ? "is-invalid" : ""
                            }`}
                            id="name"
                            name="name"
                            value={formik.values.name}
                            onChange={handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <div className="text-danger mt-1">{formik.errors.name}</div>
                        )}
                    </div>

                    {/* Images */}
                    <div className="col-md-4">
                        <label htmlFor="imgs" className="mb-2 fs-5">
                            Images :
                        </label>
                        <input
                            type="file"
                            className={`form-control border ${
                                formik.touched.imgs && formik.errors.imgs ? "is-invalid" : ""
                            }`}
                            id="imgs"
                            name="imgs"
                            multiple
                            onChange={handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.imgs && formik.errors.imgs && (
                            <div className="text-danger mt-1">{formik.errors.imgs}</div>
                        )}
                    </div>

                    {/* Tags */}
                    <div className="col-md-12 mt-5">
                        <label className="fs-5 mb-2">Tags :</label>
                        <div className="d-flex gap-4">
                            {tags.map((tag) => (
                                <div key={tag.id}>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`tag-${tag.id}`}
                                        name="tags"
                                        value={tag.id.toString()}
                                        checked={formik.values.tags.includes(tag.id.toString())}
                                        onChange={handleChange}
                                    />
                                    <label className="ms-1 fs-5" htmlFor={`tag-${tag.id}`}>
                                        {tag.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {formik.touched.tags && formik.errors.tags && (
                            <div className="text-danger mt-1">{formik.errors.tags}</div>
                        )}
                    </div>

                    {/* Text */}
                    <div className="col-md-12 mt-5">
                        <label htmlFor="text" className="fs-5 mb-2">
                            Text :
                        </label>
                        <textarea
                            className={`form-control ${
                                formik.touched.text && formik.errors.text ? "is-invalid" : ""
                            }`}
                            name="text"
                            id="text"
                            rows={7}
                            value={formik.values.text}
                            onChange={handleChange}
                            onBlur={formik.handleBlur}
                        ></textarea>
                        {formik.touched.text && formik.errors.text && (
                            <div className="text-danger mt-1">{formik.errors.text}</div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="mt-3">
                        <button type="submit" className="btn btn-info" disabled={isSubmitting}>
                            {isSubmitting ? "Creating..." : "Create"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Create;