import { useEffect, useState } from "react";
import { all } from "../../../Controllers/TagController";
import { createPost } from "../../../Controllers/PostController";
import { getLocalStorage } from "../../../Helpers/Helpers";
import { toast } from "react-toastify";
import validationSchema from "../../../validations/PostValidation";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Loading from "../Ui/Loading";

// Create Post Component
const Create = ({ isLoading }) => {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTags = async () => {
            const token = JSON.parse(localStorage.getItem("user"))?.value?.jwt;
            if (token) {
                try {
                    const res = await all(token);
                    setTags(res.data || []);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            } else {
                console.error("No token found, user might not be logged in.");
                setLoading(false);
            }
        };

        if (!isLoading) {
            fetchTags();
        }
    }, [isLoading]);

    const formik = useFormik({
        initialValues: {
            name: "",
            imgs: [],
            text: "",
            tags: [],
        },
        validationSchema,
        onSubmit: async (values) => {
            const token = JSON.parse(getLocalStorage("user"));
            const data = new FormData();
            data.append("name", values.name);
            values.imgs.forEach((img) => data.append("imgs[]", img));
            data.append("text", values.text);
            values.tags.forEach((tag) => data.append("tags[]", tag));

            const jwt = token.value.jwt;

            try {
                const res = await createPost(data, jwt);
                if (res.success) {
                    navigate('/');
                    toast.success("Post Created Successfully");
                } else {
                    console.log(res);
                    toast.error("Failed to create post");
                }
            } catch (error) {
                console.error("Error creating post:", error);
                toast.error("Failed to create post");
            }
        },
    });

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;

        if (type === "file") {
            const selectedFiles = Array.from(e.target.files);
            formik.setFieldValue(name, selectedFiles);
        } else if (name === "tags") {
            // Handle checkbox changes
            const tags = checked
                ? [...formik.values.tags, value] // Add tag if checked
                : formik.values.tags.filter((tag) => tag !== value); // Remove tag if unchecked
            formik.setFieldValue(name, tags);
        } else {
            formik.setFieldValue(name, value);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="container">
            <h2 className="mt-5 text-info">Create Article</h2>
            <form className="mt-4" onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="col-md-8">
                        <label htmlFor="name" className="mb-2 fs-5">Title :</label>
                        <input
                            type="text"
                            className={`form-control border ${formik.touched.name && formik.errors.name ? "is-invalid" : ""}`}
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

                    <div className="col-md-4">
                        <label htmlFor="imgs" className="mb-2 fs-5">Images :</label>
                        <input
                            type="file"
                            className={`form-control border ${formik.touched.imgs && formik.errors.imgs ? "is-invalid" : ""}`}
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

                    <div className="col-md-12 mt-5">
                        <label htmlFor="text" className="fs-5 mb-2">Text :</label>
                        <textarea
                            className={`form-control ${formik.touched.text && formik.errors.text ? "is-invalid" : ""}`}
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

                    <div className="mt-3">
                        <button type="submit" className="btn btn-info">Create</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Create;
