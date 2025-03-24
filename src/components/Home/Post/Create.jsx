import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { all } from "../../../Controllers/TagController";
import { createPost } from "../../../Controllers/PostController";
import { getLocalStorage } from "../../../Helpers/Helpers";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Loading from "../Ui/Loading";

// Constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];

const schema = yup.object().shape({
  name: yup.string().required("Title is required"),
  imgs: yup.array().of(
    yup.mixed()
      .test("fileFormat", "Unsupported Format", value => {
        if (!value) return true;
        return ALLOWED_FILE_TYPES.includes(value.type);
      })
      .test("fileSize", "File too large", value => {
        if (!value) return true;
        return value.size <= MAX_FILE_SIZE;
      })
  ),
  text: yup.string().required("Content is required"),
  tags: yup.array().of(yup.string())
});

const Create = ({ isLoading }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      imgs: [],
      text: "",
      tags: []
    }
  });

  // Fetch tags using React Query
  const { data: tags = [], isLoading: tagsLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const token = JSON.parse(localStorage.getItem("user"))?.jwt;
      if (!token) {
        toast.error("You must be logged in to create a post.");
        navigate("/login");
        return [];
      }
      const res = await all(token);
      return res.data || [];
    },
    enabled: !isLoading
  });

  // Create post mutation
  const createPostMutation = useMutation({
    mutationFn: async (formData) => {
      const storage = JSON.parse(getLocalStorage("user"));
      const jwt = storage.jwt;
      return createPost(formData, jwt);
    },
    onSuccess: () => {
      toast.success("Post created successfully!");
      queryClient.invalidateQueries(['posts']); // Invalidate posts query to refetch
      navigate("/");
    },
    onError: (error) => {
      console.error("Error creating post:", error);
      toast.error("An error occurred while creating the post.");
    }
  });

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setValue("imgs", selectedFiles);
  };

  const handleTagChange = (e) => {
    const { value, checked } = e.target;
    const currentTags = watch("tags");
    const newTags = checked
      ? [...currentTags, value]
      : currentTags.filter((tag) => tag !== value);
    setValue("tags", newTags);
  };

  const onSubmit = async (data) => {
    // Validate files
    if (data.imgs.some((file) => file.size > MAX_FILE_SIZE)) {
      toast.error("File size must be less than 5MB.");
      return;
    }

    if (data.imgs.some((file) => !ALLOWED_FILE_TYPES.includes(file.type))) {
      toast.error("Only JPEG, PNG, and GIF files are allowed.");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("name", data.name);
    data.imgs.forEach((img) => formData.append("imgs[]", img));
    formData.append("text", data.text);
    data.tags.forEach((tag) => formData.append("tags[]", tag));

    createPostMutation.mutate(formData);
  };

  if (tagsLoading) return <Loading />;

  return (
    <div className="container">
      <h2 className="mt-5 text-info">Create Article</h2>
      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          {/* Title */}
          <div className="col-md-8">
            <label htmlFor="name" className="mb-2 fs-5">
              Title :
            </label>
            <input
              type="text"
              className={`form-control border ${errors.name ? "is-invalid" : ""}`}
              id="name"
              {...register("name")}
            />
            {errors.name && (
              <div className="text-danger mt-1">{errors.name.message}</div>
            )}
          </div>

          {/* Images */}
          <div className="col-md-4">
            <label htmlFor="imgs" className="mb-2 fs-5">
              Images :
            </label>
            <input
              type="file"
              className={`form-control border ${errors.imgs ? "is-invalid" : ""}`}
              id="imgs"
              multiple
              onChange={handleFileChange}
            />
            {errors.imgs && (
              <div className="text-danger mt-1">{errors.imgs.message}</div>
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
                    value={tag.id.toString()}
                    checked={watch("tags").includes(tag.id.toString())}
                    onChange={handleTagChange}
                  />
                  <label className="ms-1 fs-5" htmlFor={`tag-${tag.id}`}>
                    {tag.name}
                  </label>
                </div>
              ))}
            </div>
            {errors.tags && (
              <div className="text-danger mt-1">{errors.tags.message}</div>
            )}
          </div>

          {/* Text */}
          <div className="col-md-12 mt-5">
            <label htmlFor="text" className="fs-5 mb-2">
              Text :
            </label>
            <textarea
              className={`form-control ${errors.text ? "is-invalid" : ""}`}
              id="text"
              rows={7}
              {...register("text")}
            />
            {errors.text && (
              <div className="text-danger mt-1">{errors.text.message}</div>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-3">
            <button 
              type="submit" 
              className="btn btn-info" 
              disabled={createPostMutation.isPending}
            >
              {createPostMutation.isPending ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Create;