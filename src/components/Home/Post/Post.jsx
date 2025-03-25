import { Link } from "react-router-dom";
import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import { addPostComment, postComments, savePost,likePost } from "../../../Controllers/PostController";
import Comment from "../Comment/Comment";
import LikesContext from "../../../Context/LikesContext";
import SavesContext from "../../../Context/SavesContext";
import { BACKEND_ROUTE } from "../../../Controllers/Config";
import { likeComment } from "../../../Controllers/CommentController";
import AnswerText from "../Comment/AnswerText";
import Slider from "react-slick"; // Import Slider
import "slick-carousel/slick/slick.css"; // Import Slick CSS
import "slick-carousel/slick/slick-theme.css"; // Import Slick Theme CSS
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Post = ({ value, setPosts }) => {
  
  const [rep, setRep] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [commentPage, setCommentPage] = useState(0);

  const [loading, setLoading] = useState(false);
  const {postSaves,setPostSaves } = useContext(SavesContext);
  const {postLikes,commentLikes,setCommentLikes,setPostLikes } = useContext(LikesContext);
  const queryClient = useQueryClient();
  const [visibleReplies, setVisibleReplies] = useState({});
  const commentForm = useRef(null);
  const realCommentForm = useRef(null);
  
  const toggleReplies = useCallback((commentId) => {
    setVisibleReplies((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  }, []);

  const loadComments = useCallback(() => {
    const token = JSON.parse(localStorage.getItem("user"))?.jwt;
    if (!token || !value) return;

    setLoading(true);

    postComments(token, value.id, commentPage + 1)
      .then((res) => {
        console.log(res);
        
        if (!res?.success) {
          toast.error(res?.message || 'Failed to load comments');
          return;
        }

        if (!res.comments || res.comments.length === 0) {
          toast.error('Nothing to show anymore!');
          return;
        }

        setComments((prevComments) => [...prevComments, ...res.comments]);
        if (res.comment_likes) {
          setCommentLikes((prevLikes) => [...prevLikes, ...res.comment_likes]);
        }
        setCommentPage((prevPage) => prevPage + 1);
      })
      .catch((error) => {
        toast.error('Failed to load comments');
        console.error('Error loading comments:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [value, commentPage, setCommentLikes]);

  const addComment = async (e) => {
    e.preventDefault();
    setLoading(true);
    const text = commentText.trim();
    const body = { text, parent_comment_id: rep || null };

    if (text.length < 1) {
      toast.error("Comment Text is Required");
      setLoading(false);
      return;
    }

    const token = JSON.parse(localStorage.getItem("user"))?.jwt;

    try {
      const res = await addPostComment(token, body, value.id);
      
      if (res.success) {
        queryClient.setQueryData(['posts'], (oldData) => ({
          ...oldData,
          pages: oldData.pages.map(page => ({
            ...page,
            posts: page.posts.map(post =>
              post.id === value.id
                ? {
                    ...post,
                    comments_count: post.comments_count + 1,
                  }
                : post
            )
          }))
        }));
        if (res.comment) {
          setComments(prevComments => [...prevComments, res.comment]);
        }
        setCommentText("");
        toast.success("Comment Created Successfully");
      } else {
        toast.error(res.message || "Failed to create comment");
      }
    } catch (e) {
      toast.error(e.message || "Failed to create comment");
    } finally {
      setLoading(false);
    }
  };

  const likePostComment = async (commentId) => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("user"))?.jwt;

    try {
      const result = await likeComment(commentId, token);
      if (result.success) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId
              ? { ...comment, likes: result.type === "decrement" ? comment.likes - 1 : comment.likes + 1 }
              : comment
          )
        );
        setCommentLikes((prev) => 
          result.type === "increment" ? [...prev, commentId] : prev.filter((id) => id !== commentId)
        );
        toast.success(result.type === "decrement" ? "Comment unliked successfully!" : "Comment liked successfully!");
      } else {
        toast.error(result.message || "Failed to like/unlike comment");
      }
    } catch (error) {
      toast.error("An error occurred while liking/unliking the comment.");
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    setLoading(true);
    const postId = value.id;
    const token = JSON.parse(localStorage.getItem("user")).jwt;

    try {
      const result = await savePost(postId, token);
      if (result.success) {
        setPostSaves((prevSaves) => 
          result.type === 'saved' ? [...prevSaves, postId] : prevSaves.filter(id => id !== postId)
        );
        toast.success(result.type === 'saved' ? "Post saved successfully!" : "Post unsaved successfully!");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("An error occurred while saving/unSaving the Post.");
    } finally {
      setLoading(false);
    }
  };


  // Like post mutation
  const likeMutation = useMutation({
    mutationFn: async (postId) => {
      const token = JSON.parse(localStorage.getItem("user")).jwt;
      return await likePost(postId, token);
    },
    onSuccess: (result, postId) => {
      if (result.success) {
        queryClient.setQueryData(['posts'], (oldData) => ({
          ...oldData,
          pages: oldData.pages.map(page => ({
            ...page,
            posts: page.posts.map(post =>
              post.id === postId
                ? {
                    ...post,
                    likes: result.type === "decrement" ? post.likes - 1 : post.likes + 1,
                  }
                : post
            )
          }))
        }));

        setPostLikes((prev) => {
          if (result.type === "increment") {
            return [...prev, postId];
          } else {
            return prev.filter((id) => id !== postId);
          }
        });

        toast.success(
          result.type === "decrement"
            ? "Post unliked successfully!"
            : "Post liked successfully!"
        );
        
      } else {
        toast.error(result.error);
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error("An error occurred while liking/unliking the post.");
    }
  });

  const like = () => {
    likeMutation.mutate(value.id);
  };

  const scrollToCommentForm = (id) => {
    commentForm.current.scrollIntoView({ behavior: "smooth" });
    realCommentForm.current.focus();
    setRep(id);
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Debugging: Log the value prop
  const imagePaths = value.imgs ? JSON.parse(value.imgs) : []; // Parse here

  return (
    <div className="card">
      {/* Card header */}
      <div className="card-header border-0 pb-0">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            {/* Avatar */}
            <div className="avatar avatar-story me-2">
              <Link to="#!">
                <img
                  className="avatar-img rounded-circle"
                  src={value.User.img ? `${BACKEND_ROUTE}/${value.User.img}` : "assets/images/avatar/placeholder.jpg"}
                  alt=""
                />
              </Link>
            </div>
            {/* Info */}
            <div>
              <div className="nav nav-divider">
                <h6 className="nav-item card-title mb-0">
                  <Link to="#!">{value.User.name}</Link>
                </h6>
                <span className="nav-item small">{value.updated_at}</span>
              </div>
              <p className="mb-0 small">{value.User.title}</p>
            </div>
          </div>
          {/* Card feed action dropdown */}
          <div className="dropdown">
            <Link
              to="#"
              className="text-secondary btn btn-secondary-soft-hover py-1 px-2"
              id="cardFeedAction"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-three-dots"></i>
            </Link>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="cardFeedAction">
              <li>
                <Link className="dropdown-item" to="#" onClick={save}>
                  {postSaves && postSaves.includes(value.id) ? (
                    <>
                      <i className="bi bi-bookmark-fill fa-fw pe-2"></i>
                      Unsave post
                    </>
                  ) : (
                    <>
                      <i className="bi bi-bookmark fa-fw pe-2"></i>
                      Save post
                    </>
                  )}
                </Link>
              </li>
              {/* Other dropdown items */}
            </ul>
          </div>
        </div>
      </div>
      {/* Card body */}
      <div className="card-body">
        <h5 className="text-gray">{value.name}</h5>
        <p className="mt-3">{value.text}</p>

        {/* Image Slider */}
        {imagePaths.length > 0 ? (
          <Slider {...sliderSettings} className="mb-4">
            {imagePaths.map((image, index) => (
              <div key={index}>
                <img
                  className="card-img"
                  src={image.url}
                  alt={`Post image ${index}`}
                />
              </div>
            ))}
          </Slider>
        ) : value.img ? (
          <img
            className="card-img"
            src={JSON.parse(value.img).url} // Ensure value.img has a 'url' property
            alt="Post"
          />
        ) : (
          <p>No images available</p> // Fallback message if no images are found
        )}

        {/* Feed react */}
        <ul className="nav nav-stack py-3 small">
          <li className="nav-item" onClick={like}>
            <Link
              className={`nav-link ${postLikes.includes(value.id) ? "active" : ""}`}
              to="#!"
            >
              <i className="bi bi-hand-thumbs-up-fill pe-1"></i>
              Liked ({value.likes})
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#!">
              <i className="bi bi-chat-fill pe-1"></i>Comments ({value.comments_count})
            </Link>
          </li>
          {/* Card share action */}
          <li className="nav-item dropdown ms-sm-auto">
            <Link
              className="nav-link mb-0"
              to="#"
              id="cardShareAction"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-reply-fill flip-horizontal ps-1"></i>
              Share (3)
            </Link>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="cardShareAction">
              <li>
                <Link className="dropdown-item" to="#">
                  <i className="bi bi-envelope fa-fw pe-2"></i>
                  Send via Direct Message
                </Link>
              </li>
              {/* Other dropdown items */}
            </ul>
          </li>
        </ul>

        {/* Add comment */}
        <AnswerText rep={rep} setRep={setRep} realCommentForm={realCommentForm} />

        <div className="d-flex mb-3">
          <div className="avatar avatar-xs me-2">
            <Link to="#!">
              <img
                className="avatar-img rounded-circle"
                src={value.User.img ? `${BACKEND_ROUTE}/${value.User.img}` : "assets/images/avatar/placeholder.jpg"}
                alt=""
              />
            </Link>
          </div>
          <form className="nav nav-item w-100 position-relative" id="comment-form" onSubmit={addComment}>
            <textarea
              className="form-control pe-5 bg-light"
              ref={realCommentForm}
              rows="3"
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
            />
            <button
              disabled={loading}
              type="submit"
              className="nav-link bg-transparent px-3 position-absolute top-50 end-0 translate-middle-y border-0"
            >
              <i className="bi bi-send-fill"></i>
            </button>
          </form>
        </div>

        {comments.length > 0 && (
          <ul className="comment-wrap list-unstyled">
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                BACKEND_ROUTE={BACKEND_ROUTE}
                toggleReplies={toggleReplies}
                visibleReplies={visibleReplies}
                commentLikes={commentLikes}
                likePostComment={likePostComment}
                scrollToCommentForm={scrollToCommentForm}
              />
            ))}
          </ul>
        )}
      </div>
      {/* Card footer */}
      {value.comments_count > 0 ? (
        <div className="card-footer border-0 pt-0">
          <Link
            to="#!"
            role="button"
            className="btn btn-link btn-link-loader btn-sm text-secondary d-flex align-items-center"
          >
            {loading ? (
              <div className="spinner-border me-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <span onClick={loadComments} className="me-2 btn btn-sm btn-outline-info">Load { comments.length > 0 ? "more" : "" } comments</span>
            )}
          </Link>
        </div>
      ) : (
        <p className="ms-3">No Comment Yet!</p>
      )}
    </div>
  );
};

export default Post;
