import { Link } from "react-router-dom";

const Comment = ({ comment, BACKEND_ROUTE, toggleReplies, visibleReplies, commentLikes, likePostComment, scrollToCommentForm }) => {
    // Check if the comment is liked by the user  
    const isLiked = commentLikes.includes(comment.id);

    return (
        <li key={comment.id} className="comment-item mt-3">
            <div className="d-flex position-relative">
                <div className="avatar avatar-xs">
                    <Link to="#!">
                        <img
                            className="avatar-img rounded-circle"
                            src={comment.user.img ? `${BACKEND_ROUTE}/${comment.user.img}` : 'assets/images/avatar/placeholder.jpg'}
                            alt={comment.user.name}
                        />
                    </Link>
                </div>
                <div className="ms-2">
                    <div className="bg-light rounded-start-top-0 p-3 rounded">
                        <div className="d-flex justify-content-between">
                            <h6 className="mb-1">
                                <Link to="#!">{comment.user.name}</Link>
                            </h6>
                            <small className="ms-2">{comment.updated_at}</small>
                        </div>
                        <p className="small mb-0">{comment.text}</p>
                    </div>
                    <ul className="nav nav-divider py-2 small">
                        <li className="nav-item">
                            <Link onClick={() => { likePostComment(comment.id); }} className={`nav-link ${isLiked ? "active" : ""}`} to="#!">
                                Like ({comment.likes})
                            </Link>
                        </li>
                        {comment.deep < 3 && (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link" style={{ cursor: 'pointer' }} onClick={() => scrollToCommentForm(comment.id)}>Reply</span>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="#!" onClick={() => toggleReplies(comment.id)}>
                                        View {Array.isArray(comment.replies) ? comment.replies.length : 0} replies
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>

            {visibleReplies[comment.id] && Array.isArray(comment.replies) && comment.replies.length > 0 && (
                <ul className="comment-item-nested list-unstyled">
                    {comment.replies.map(reply => (
                        <Comment
                            key={reply.id}
                            comment={reply}
                            BACKEND_ROUTE={BACKEND_ROUTE}
                            toggleReplies={toggleReplies} // Pass down toggleReplies  
                            visibleReplies={visibleReplies} // Pass down visibleReplies  
                            commentLikes={commentLikes} // Pass down commentLikes  
                            likePostComment={likePostComment} // Pass down likePostComment  
                            scrollToCommentForm={scrollToCommentForm}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default Comment;