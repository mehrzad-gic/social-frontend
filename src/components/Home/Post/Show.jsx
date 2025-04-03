import { Link, useParams } from "react-router-dom";
import { useState, useContext, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import { addPostComment, postComments, savePost, likePost, show } from "../../../Controllers/PostController";
import Comment from "../Comment/Comment";
import LikesContext from "../../../Context/LikesContext";
import SavesContext from "../../../Context/SavesContext";
import { BACKEND_ROUTE } from "../../../Controllers/Config";
import { likeComment } from "../../../Controllers/CommentController";
import AnswerText from "../Comment/AnswerText";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../Ui/Loading";

const Show = () => {
    const { slug } = useParams();
    const queryClient = useQueryClient();

    // Fetch post data using React Query
    const { data: postData, isLoading, error } = useQuery({
        queryKey: ['post', slug],
        queryFn: async () => {
            const token = JSON.parse(localStorage.getItem("user"))?.jwt;
            const response = await show(slug, token);
            if (!response.success) {
                throw new Error(response.message || 'Failed to load post');
            }
            return response.post;
        },
        retry: 1,
    });

    const [rep, setRep] = useState(null);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);
    const [commentPage, setCommentPage] = useState(0);
    const { postSaves, setPostSaves } = useContext(SavesContext);
    const { postLikes, commentLikes, setCommentLikes, setPostLikes } = useContext(LikesContext);
    const [visibleReplies, setVisibleReplies] = useState({});
    const commentForm = useRef(null);
    const realCommentForm = useRef(null);
    const [isAnyCommentLiked, setIsAnyCommentLiked] = useState(false);
    
    // Safely parse user image
    const userImg = postData?.User?.img ? JSON.parse(postData.User.img)[0] : { secure_url: "assets/images/avatar/placeholder.jpg" };

    const toggleReplies = useCallback((commentId) => {
        setVisibleReplies((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
    }, []);

    // Load comments mutation
    const loadComments = useCallback(() => {
        const token = JSON.parse(localStorage.getItem("user"))?.jwt;
        if (!token || !postData) return;

        postComments(token, postData.id, commentPage + 1)
            .then((res) => {
                if (!res?.success) {
                    toast.error(res?.message || 'Failed to load comments');
                    return;
                }

                if (!res.comments || res.comments.length === 0) {
                    toast.error('Nothing to show anymore!');
                    return;
                }

                const newComments = res.comments.filter(comment => !comments.some(c => c.id === comment.id));
                setComments((prevComments) => [...prevComments, ...newComments]);
                
                if (res.comment_likes) {
                    setCommentLikes((prevLikes) => [...prevLikes, ...res.comment_likes]);
                }

                setCommentPage((prevPage) => prevPage + 1);
            })
            .catch((error) => {
                toast.error('Failed to load comments');
                console.error('Error loading comments:', error);
            });
    }, [postData, commentPage, setCommentLikes]);

    // Add comment mutation
    const addCommentMutation = useMutation({
        mutationFn: async (body) => {
            const token = JSON.parse(localStorage.getItem("user"))?.jwt;
            return await addPostComment(token, body, postData.id);
        },
        onSuccess: (res) => {
            if (res.success) {
                queryClient.setQueryData(['post', slug], (oldData) => ({
                    ...oldData,
                    comments_count: oldData.comments_count + 1,
                }));

                if (res.comment) {
                    const newComment = {
                        ...res.comment,
                        User: {
                            id: JSON.parse(localStorage.getItem("user")).user.id,
                            name: JSON.parse(localStorage.getItem("user")).user.name,
                            img: JSON.parse(localStorage.getItem("user")).user.img,
                            title: JSON.parse(localStorage.getItem("user")).user.title
                        },
                    };

                    setComments(prevComments => {
                        if (rep) {
                            return prevComments.map(comment => {
                                if (comment.id === rep) {
                                    return {
                                        ...comment,
                                        replies: [...(comment.replies || []), newComment]
                                    };
                                }
                                if (comment.replies) {
                                    const updatedReplies = comment.replies.map(reply => {
                                        if (reply.id === rep) {
                                            return {
                                                ...reply,
                                                replies: [...(reply.replies || []), newComment]
                                            };
                                        }
                                        return reply;
                                    });
                                    return { ...comment, replies: updatedReplies };
                                }
                                return comment;
                            });
                        }
                        return [newComment, ...prevComments];
                    });

                    if (rep) {
                        setVisibleReplies(prev => ({
                            ...prev,
                            [rep]: true
                        }));
                    }
                }

                setIsAnyCommentLiked(true);
                setCommentText("");
                setRep(null);
                toast.success("Comment Created Successfully");
            } else {
                toast.error(res.message || "Failed to create comment");
            }
        },
        onError: (error) => {
            toast.error(error.message || "Failed to create comment");
        }
    });

    const addComment = async (e) => {
        e.preventDefault();
        const text = commentText.trim();    
        const body = { text, parent_id: rep || null };

        if (text.length < 1) {
            toast.error("Comment Text is Required");
            return;
        }

        addCommentMutation.mutate(body);
    };

    // Like post mutation
    const likeMutation = useMutation({
        mutationFn: async (postId) => {
            const token = JSON.parse(localStorage.getItem("user"))?.jwt;
            return await likePost(postId, token);
        },
        onSuccess: (result) => {
            if (result.success) {
                queryClient.setQueryData(['post', slug], (oldData) => ({
                    ...oldData,
                    likes: result.type === "decrement" ? oldData.likes - 1 : oldData.likes + 1,
                }));

                setPostLikes((prev) => {
                    if (result.type === "increment") {
                        return [...prev, postData.id];
                    } else {
                        return prev.filter((id) => id !== postData.id);
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
        likeMutation.mutate(postData.id);
    };

    // Save post mutation
    const saveMutation = useMutation({
        mutationFn: async (postId) => {
            const token = JSON.parse(localStorage.getItem("user"))?.jwt;
            return await savePost(postId, token);
        },
        onSuccess: (result) => {
            if (result.success) {
                setPostSaves((prevSaves) => 
                    result.type === 'increment' ? [...prevSaves, postData.id] : prevSaves.filter(id => id !== postData.id)
                );
                toast.success(result.type === 'increment' ? "Post saved successfully!" : "Post unsaved successfully!");
            } else {
                toast.error(result.error);
            }
        },
        onError: (error) => {
            toast.error("An error occurred while saving/unSaving the Post.");
        }
    });

    const save = () => {
        saveMutation.mutate(postData.id);
    };

    // Like comment mutation
    const likeCommentMutation = useMutation({
        mutationFn: async (commentId) => {
            const token = JSON.parse(localStorage.getItem("user"))?.jwt;
            return await likeComment(commentId, token);
        },
        onSuccess: (result) => {
            if (result.success) {
                setComments((prevComments) =>
                    prevComments.map((comment) =>
                        comment.id === result.commentId
                            ? { ...comment, likes: result.type === "decrement" ? comment.likes - 1 : comment.likes + 1 }
                            : comment
                    )
                );
                setCommentLikes((prev) => 
                    result.type === "increment" ? [...prev, result.commentId] : prev.filter((id) => id !== result.commentId)
                );
                toast.success(result.type === "decrement" ? "Comment unliked successfully!" : "Comment liked successfully!");
            } else {
                toast.error(result.message || "Failed to like/unlike comment");
            }
        },
        onError: (error) => {
            toast.error("An error occurred while liking/unliking the comment.");
        }
    });

    const likePostComment = (commentId) => {
        likeCommentMutation.mutate(commentId);
    };

    const scrollToCommentForm = (id) => {
        if (commentForm.current) {
            commentForm.current.scrollIntoView({ behavior: "smooth" });
        }
        if (realCommentForm.current) {
            realCommentForm.current.focus();
        }
        setRep(id);
    };

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="row">
                <div className="col-lg-8 mx-auto">
                    <div className="card card-body">
                        <div className="alert alert-danger" role="alert">
                            {error.message}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!postData) {
        return (
            <div className="row">
                <div className="col-lg-8 mx-auto">
                    <div className="card card-body">
                        <div className="alert alert-warning" role="alert">
                            Post not found
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="row">
            <div className="col-lg-8 mx-auto">
                <div className="card card-body">
                    {/* Post Image */}
                    {postData.imgs && JSON.parse(postData.imgs).length > 0 && (
                        <img className="card-img rounded" src={JSON.parse(postData.imgs)[0].url} alt="" />
                    )}
                    
                    {/* Post Meta */}
                    <div className="d-flex align-items-center justify-content-between my-3">
                        <div className="d-flex align-items-center">
                            <div className="avatar avatar-story me-2">
                                <Link to="#!">
                                    <img
                                        className="avatar-img rounded-circle"
                                        src={userImg.secure_url || "assets/images/avatar/placeholder.jpg"}
                                        alt=""
                                    />
                                </Link>
                            </div>
                            <div>
                                <div className="nav nav-divider">
                                    <h6 className="nav-item card-title mb-0">
                                        <Link to="#!">{postData.User?.name || 'Unknown User'}</Link>
                                    </h6>
                                    <span className="nav-item small">{postData.updated_at || 'Just now'}</span>
                                </div>
                                <p className="mb-0 small">{postData.User?.title || 'No title'}</p>
                            </div>
                        </div>
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
                                        {saveMutation.isLoading ? (
                                            <div className="spinner-border spinner-border-sm" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        ) : (
                                            <>
                                                {postSaves && postSaves.includes(postData.id) ? (
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
                                            </>
                                        )}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* Post Content */}
                    <h1 className="h4">{postData.name || 'Untitled Post'}</h1>
                    <p>{postData.text || 'No content available'}</p>
                    
                    {/* Post Actions */}
                    <ul className="nav nav-stack flex-wrap small mb-3">
                        <li className="nav-item" onClick={like}>
                            <Link
                                className={`nav-link ${postLikes.includes(postData.id) ? "active" : ""}`}
                                to="#!"
                            >
                                <i className="bi bi-hand-thumbs-up-fill pe-1"></i>
                                Liked ({postData.likes})
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#!">
                                <i className="bi bi-chat-fill pe-1"></i>
                                Comments ({postData.comments_count})
                            </Link>
                        </li>
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
                                <li>
                                    <Link className="dropdown-item" to="#">
                                        <i className="bi bi-bookmark-check fa-fw pe-2"></i>
                                        Bookmark
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="#">
                                        <i className="bi bi-link fa-fw pe-2"></i>
                                        Copy link to post
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="#">
                                        <i className="bi bi-share fa-fw pe-2"></i>
                                        Share post via …
                                    </Link>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <Link className="dropdown-item" to="#">
                                        <i className="bi bi-pencil-square fa-fw pe-2"></i>
                                        Share to News Feed
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    {/* Comment Form */}
                    <div ref={commentForm}>
                        <AnswerText rep={rep} setRep={setRep} realCommentForm={realCommentForm} />
                        <div className="d-flex mb-3">
                            <div className="avatar avatar-xs me-2">
                                <Link to="#!">
                                    <img
                                        className="avatar-img rounded-circle"
                                        src={userImg.secure_url ? `${userImg.secure_url}` : "assets/images/avatar/placeholder.jpg"}
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
                                    disabled={addCommentMutation.isLoading}
                                    type="submit"
                                    className="nav-link bg-transparent px-3 position-absolute top-50 end-0 translate-middle-y border-0"
                                >
                                    <i className="bi bi-send-fill"></i>
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Comments Section */}
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

                    {/* Load More Comments */}
                    {postData.comments_count > 0 || isAnyCommentLiked ? (
                        <div className="card-footer border-0 pt-0">
                            <Link
                                to="#!"
                                role="button"
                                className="btn btn-link btn-link-loader btn-sm text-secondary d-flex align-items-center"
                            >
                                {addCommentMutation.isLoading ? (
                                    <div className="spinner-border me-2" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ) : (
                                    <span onClick={loadComments} className="me-2 btn btn-sm btn-outline-info">
                                        Load {comments.length > 0 ? "more" : ""} comments
                                    </span>
                                )}
                            </Link>
                        </div>
                    ) : (
                        <p className="ms-3">No Comment Yet!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Show;