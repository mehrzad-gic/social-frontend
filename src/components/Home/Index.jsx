import { Link } from "react-router-dom";
import Sidebar from "./Ui/Sidebar";
import { useState, useEffect, useRef, useContext } from "react";
import { all, likePost } from "../../Controllers/PostController";
import ShareFeed from "./Ui/ShareFeed";
import AppContext from "../../Context/AppContext";
import Loading from "./Ui/Loading";
import { toast } from "react-toastify";
import Post from "./Post/Post";

// Index Component
const Index = () => {

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const showMoreButton = useRef(null);

  const { setPostLikes, loading, setLoading , setPostSaves } = useContext(AppContext);

  useEffect(() => {

    const token = JSON.parse(localStorage.getItem("user")).value.jwt;

    setLoading(true); // Set loading to true before fetching

    const fetchPosts = async () => { 
     
      try {

        const res = await all(token, page); // Fetch posts with pagination
        
        if (res.success) {

          setPosts((prevPosts) => [...prevPosts, ...res.data.posts]); // Merge new posts with existing posts
          
          setPostLikes(res.data.post_likes);

          setPostSaves(res.data.saved_posts);
      
        } else {

          console.log(res);
          
          toast.error("Server Error ");
        }

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false); // Set loading to false after fetching
      }

    };

    const timeoutId = setTimeout(fetchPosts, 1000);

    return () => clearTimeout(timeoutId);

  }, [page]);

  const loadMore = () => {
    console.log("Loading more posts...");
    setPage((prevPage) => prevPage + 1); // Increment page to load more posts
  };

  // Function to handle the like action
  const like = async (id) => {

    setLoading(true);
    
    const token = JSON.parse(localStorage.getItem("user")).value.jwt;

    try {
    
      const result = await likePost(id, token);
    
      if (result.success) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === id
              ? {
                  ...post,
                  likes:
                    result.type === "decrement"
                      ? post.likes - 1
                      : post.likes + 1,
                }
              : post
          )
        );
        // Update postLikes array based on action
        setPostLikes((prev) => {
          if (result.type === "increment") {
            return [...prev, id]; // Add id if liked
          } else {
            return prev.filter((postId) => postId !== id); // Remove id if unliked
          }
        });

        // Optional: Update the posts state if necessary...

        // Display toast messages based on action
        toast.success(
          result.type === "decrement"
            ? "Post unliked successfully!"
            : "Post liked successfully!"
        );
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while liking/unliking the post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <main className="mt-4 mb-4">
            {/*Container START */}
            <div className="container">
              <div className="row g-4">
                {/*Sidenav START */}
                <Sidebar />
                {/*Sidenav END */}

                {/*Main content START */}
                <div className="col-md-8 col-lg-6 vstack gap-4">
                  {/*Share feed START */}
                  <ShareFeed />
                  {/*Share feed END */}

                  {posts.length > 0 ? (
                    posts.map((value, index) => (
                      <Post
                        key={index}
                        value={value}
                        setPosts={setPosts}
                        like={like}
                      />
                    ))
                  ) : (
                    <div></div>
                  )}

                  {/*Load more button START */}
                  {posts.length > 1 && (
                    <span
                      ref={showMoreButton}
                      className="btn btn-loader btn-primary-soft"
                      onClick={loadMore}
                    >
                      {loading ? (
                        <div className="load-icon">
                          <div
                            className="spinner-grow spinner-grow-sm"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      ) : (
                        <span className="load-text">Load more</span>
                      )}
                    </span>
                  )}
                  {/*Load more button END */}
                </div>
                {/*Main content END */}

                {/*Right sidebar START */}
                <div className="col-lg-3">
                  <div className="row g-4">
                    {/*Card follow START */}
                    <div className="col-sm-6 col-lg-12">
                      <div className="card">
                        {/*Card header START */}
                        <div className="card-header pb-0 border-0">
                          <h5 className="card-title mb-0">Who to follow</h5>
                        </div>
                        {/*Card header END */}
                        {/*Card body START */}
                        <div className="card-body">
                          {/*Connection item START */}
                          <div className="hstack gap-2 mb-3">
                            {/*Avatar */}
                            <div className="avatar">
                              <Link to="#!">
                                <img
                                  className="avatar-img rounded-circle"
                                  src="assets/images/avatar/04.jpg"
                                  alt=""
                                ></img>
                              </Link>
                            </div>
                            {/*Title */}
                            <div className="overflow-hidden">
                              <Link className="h6 mb-0" to="#!">
                                Judy Nguyen
                              </Link>
                              <p className="mb-0 small text-truncate">
                                News anchor
                              </p>
                            </div>
                            {/*Button */}
                            <Link
                              className="btn btn-primary-soft rounded-circle icon-md ms-auto"
                              to="#"
                            >
                              <i className="fa-solid fa-plus"> </i>
                            </Link>
                          </div>
                          {/*Connection item END */}
                          {/*Connection item START */}
                          <div className="hstack gap-2 mb-3">
                            {/*Avatar */}
                            <div className="avatar avatar-story">
                              <Link to="#!">
                                <img
                                  className="avatar-img rounded-circle"
                                  src="assets/images/avatar/05.jpg"
                                  alt=""
                                ></img>
                              </Link>
                            </div>
                            {/*Title */}
                            <div className="overflow-hidden">
                              <Link className="h6 mb-0" to="#!">
                                Amanda Reed
                              </Link>
                              <p className="mb-0 small text-truncate">
                                Web Developer
                              </p>
                            </div>
                            {/*Button */}
                            <Link
                              className="btn btn-primary-soft rounded-circle icon-md ms-auto"
                              to="#"
                            >
                              <i className="fa-solid fa-plus"> </i>
                            </Link>
                          </div>
                          {/*Connection item END */}

                          {/*Connection item START */}
                          <div className="hstack gap-2 mb-3">
                            {/*Avatar */}
                            <div className="avatar">
                              <Link to="#">
                                <img
                                  className="avatar-img rounded-circle"
                                  src="assets/images/avatar/11.jpg"
                                  alt=""
                                ></img>
                              </Link>
                            </div>
                            {/*Title */}
                            <div className="overflow-hidden">
                              <Link className="h6 mb-0" to="#!">
                                Billy Vasquez
                              </Link>
                              <p className="mb-0 small text-truncate">
                                News anchor
                              </p>
                            </div>
                            {/*Button */}
                            <Link
                              className="btn btn-primary rounded-circle icon-md ms-auto"
                              to="#"
                            >
                              <i className="bi bi-person-check-fill"> </i>
                            </Link>
                          </div>
                          {/*Connection item END */}

                          {/*Connection item START */}
                          <div className="hstack gap-2 mb-3">
                            {/*Avatar */}
                            <div className="avatar">
                              <Link to="#">
                                <img
                                  className="avatar-img rounded-circle"
                                  src="assets/images/avatar/01.jpg"
                                  alt=""
                                ></img>
                              </Link>
                            </div>
                            {/*Title */}
                            <div className="overflow-hidden">
                              <Link className="h6 mb-0" to="#!">
                                Lori Ferguson
                              </Link>
                              <p className="mb-0 small text-truncate">
                                Web Developer at Webestica
                              </p>
                            </div>
                            {/*Button */}
                            <Link
                              className="btn btn-primary-soft rounded-circle icon-md ms-auto"
                              to="#"
                            >
                              <i className="fa-solid fa-plus"> </i>
                            </Link>
                          </div>
                          {/*Connection item END */}

                          {/*Connection item START */}
                          <div className="hstack gap-2 mb-3">
                            {/*Avatar */}
                            <div className="avatar">
                              <Link to="#">
                                <img
                                  className="avatar-img rounded-circle"
                                  src="assets/images/avatar/placeholder.jpg"
                                  alt=""
                                ></img>
                              </Link>
                            </div>
                            {/*Title */}
                            <div className="overflow-hidden">
                              <Link className="h6 mb-0" to="#!">
                                Carolyn Ortiz
                              </Link>
                              <p className="mb-0 small text-truncate">
                                News anchor
                              </p>
                            </div>
                            {/*Button */}
                            <Link
                              className="btn btn-primary-soft rounded-circle icon-md ms-auto"
                              to="#"
                            >
                              <i className="fa-solid fa-plus"> </i>
                            </Link>
                          </div>
                          {/*Connection item END */}

                          {/*View more button */}
                          <div className="d-grid mt-3">
                            <Link
                              className="btn btn-sm btn-primary-soft"
                              to="#!"
                            >
                              View more
                            </Link>
                          </div>
                        </div>
                        {/*Card body END */}
                      </div>
                    </div>
                    {/*Card follow START */}

                    {/*Card News START */}
                    <div className="col-sm-6 col-lg-12">
                      <div className="card">
                        {/*Card header START */}
                        <div className="card-header pb-0 border-0">
                          <h5 className="card-title mb-0">Today’s news</h5>
                        </div>
                        {/*Card header END */}
                        {/*Card body START */}
                        <div className="card-body">
                          {/*News item */}
                          <div className="mb-3">
                            <h6 className="mb-0">
                              <Link to="blog-details.html">
                                Ten questions you should answer truthfully
                              </Link>
                            </h6>
                            <small>2hr</small>
                          </div>
                          {/*News item */}
                          <div className="mb-3">
                            <h6 className="mb-0">
                              <Link to="blog-details.html">
                                Five unbelievable facts about money
                              </Link>
                            </h6>
                            <small>3hr</small>
                          </div>
                          {/*News item */}
                          <div className="mb-3">
                            <h6 className="mb-0">
                              <Link to="blog-details.html">
                                Best Pinterest Boards for learning about
                                business
                              </Link>
                            </h6>
                            <small>4hr</small>
                          </div>
                          {/*News item */}
                          <div className="mb-3">
                            <h6 className="mb-0">
                              <Link to="blog-details.html">
                                Skills that you can learn from business
                              </Link>
                            </h6>
                            <small>6hr</small>
                          </div>
                          {/*Load more comments */}
                          <Link
                            to="#!"
                            role="button"
                            className="btn btn-link btn-link-loader btn-sm text-secondary d-flex align-items-center"
                            data-bs-toggle="button"
                            aria-pressed="true"
                          >
                            <div className="spinner-dots me-2">
                              <span className="spinner-dot"></span>
                              <span className="spinner-dot"></span>
                              <span className="spinner-dot"></span>
                            </div>
                            View all latest news
                          </Link>
                        </div>
                        {/*Card body END */}
                      </div>
                    </div>
                    {/*Card News END */}
                  </div>
                </div>
                {/*Right sidebar END */}
              </div>
            </div>
            {/*Container END */}
          </main>

          <div
            className="modal fade"
            id="modalCreateFeed"
            aria-labelledby="modalLabelCreateFeed"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="modalLabelCreateFeed">
                    Create post
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="d-flex mb-3">
                    <div className="avatar avatar-xs me-2">
                      <img
                        className="avatar-img rounded-circle"
                        src="assets/images/avatar/03.jpg"
                        alt=""
                      ></img>
                    </div>

                    <form className="w-100">
                      <textarea
                        className="form-control pe-4 fs-3 lh-1 border-0"
                        rows="4"
                        placeholder="Share your thoughts..."
                        autoFocus
                      ></textarea>
                    </form>
                  </div>

                  <div className="hstack gap-2">
                    <Link
                      className="icon-md bg-success bg-opacity-10 text-success rounded-circle"
                      to="#"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Photo"
                    >
                      <i className="bi bi-image-fill"></i>
                    </Link>
                    <Link
                      className="icon-md bg-info bg-opacity-10 text-info rounded-circle"
                      to="#"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Video"
                    >
                      <i className="bi bi-camera-reels-fill"></i>
                    </Link>
                    <Link
                      className="icon-md bg-danger bg-opacity-10 text-danger rounded-circle"
                      to="#"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Events"
                    >
                      <i className="bi bi-calendar2-event-fill"></i>
                    </Link>
                    <Link
                      className="icon-md bg-warning bg-opacity-10 text-warning rounded-circle"
                      to="#"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Feeling/Activity"
                    >
                      <i className="bi bi-emoji-smile-fill"></i>
                    </Link>
                    <Link
                      className="icon-md bg-light text-secondary rounded-circle"
                      to="#"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Check in"
                    >
                      <i className="bi bi-geo-alt-fill"></i>
                    </Link>
                    <Link
                      className="icon-md bg-primary bg-opacity-10 text-primary rounded-circle"
                      to="#"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Tag people on top"
                    >
                      <i className="bi bi-tag-fill"></i>
                    </Link>
                  </div>
                </div>

                <div className="modal-footer row justify-content-between">
                  <div className="col-lg-3">
                    <select
                      className="form-select js-choice choice-select-text-none"
                      data-position="top"
                      data-search-enabled="false"
                    >
                      <option value="PB">Public</option>
                      <option value="PV">Friends</option>
                      <option value="PV">Only me</option>
                      <option value="PV">Custom</option>
                    </select>
                  </div>
                  <div className="col-lg-8 text-sm-end">
                    <button type="button" className="btn btn-danger-soft me-2">
                      <i className="bi bi-camera-video-fill pe-1"></i> Live
                      video
                    </button>
                    <button type="button" className="btn btn-success-soft">
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="feedActionPhoto"
            aria-labelledby="feedActionPhotoLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="feedActionPhotoLabel">
                    Add post photo
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="d-flex mb-3">
                    <div className="avatar avatar-xs me-2">
                      <img
                        className="avatar-img rounded-circle"
                        src="assets/images/avatar/03.jpg"
                        alt=""
                      ></img>
                    </div>

                    <form className="w-100">
                      <textarea
                        className="form-control pe-4 fs-3 lh-1 border-0"
                        rows="2"
                        placeholder="Share your thoughts..."
                      ></textarea>
                    </form>
                  </div>

                  <div>
                    <label className="form-label">Upload attachment</label>
                    <div
                      className="dropzone dropzone-default card shadow-none"
                      data-dropzone='{"maxFiles":2}'
                    >
                      <div className="dz-message">
                        <i className="bi bi-images display-3"></i>
                        <p>Drag here or click to upload photo.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer ">
                  <button
                    type="button"
                    className="btn btn-danger-soft me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="button" className="btn btn-success-soft">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="feedActionVideo"
            aria-labelledby="feedActionVideoLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="feedActionVideoLabel">
                    Add post video
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="d-flex mb-3">
                    <div className="avatar avatar-xs me-2">
                      <img
                        className="avatar-img rounded-circle"
                        src="assets/images/avatar/03.jpg"
                        alt=""
                      ></img>
                    </div>

                    <form className="w-100">
                      <textarea
                        className="form-control pe-4 fs-3 lh-1 border-0"
                        rows="2"
                        placeholder="Share your thoughts..."
                      ></textarea>
                    </form>
                  </div>

                  <div>
                    <label className="form-label">Upload attachment</label>
                    <div
                      className="dropzone dropzone-default card shadow-none"
                      data-dropzone='{"maxFiles":2}'
                    >
                      <div className="dz-message">
                        <i className="bi bi-camera-reels display-3"></i>
                        <p>Drag here or click to upload video.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-danger-soft me-2">
                    <i className="bi bi-camera-video-fill pe-1"></i> Live video
                  </button>
                  <button type="button" className="btn btn-success-soft">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="modalCreateEvents"
            aria-labelledby="modalLabelCreateAlbum"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="modalLabelCreateAlbum">
                    Create event
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <div className="modal-body">
                  <form className="row g-4">
                    <div className="col-12">
                      <label className="form-label">Title</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Event name here"
                      ></input>
                    </div>

                    <div className="col-12">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        placeholder="Ex: topics, schedule, etc."
                      ></textarea>
                    </div>

                    <div className="col-sm-4">
                      <label className="form-label">Date</label>
                      <input
                        type="text"
                        className="form-control flatpickr"
                        placeholder="Select date"
                      ></input>
                    </div>

                    <div className="col-sm-4">
                      <label className="form-label">Time</label>
                      <input
                        type="text"
                        className="form-control flatpickr"
                        placeholder="Select time"
                      ></input>
                    </div>

                    <div className="col-sm-4">
                      <label className="form-label">Duration</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="1hr 23m"
                      ></input>
                    </div>

                    <div className="col-12">
                      <label className="form-label">Location</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Logansport, IN 46947"
                      ></input>
                    </div>

                    <div className="col-12">
                      <label className="form-label">Add guests</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Guest email"
                      ></input>
                    </div>

                    <div className="col-12 mt-3">
                      <ul className="avatar-group list-unstyled align-items-center mb-0">
                        <li className="avatar avatar-xs">
                          <img
                            className="avatar-img rounded-circle"
                            src="assets/images/avatar/01.jpg"
                            alt="avatar"
                          ></img>
                        </li>
                        <li className="avatar avatar-xs">
                          <img
                            className="avatar-img rounded-circle"
                            src="assets/images/avatar/02.jpg"
                            alt="avatar"
                          ></img>
                        </li>
                        <li className="avatar avatar-xs">
                          <img
                            className="avatar-img rounded-circle"
                            src="assets/images/avatar/03.jpg"
                            alt="avatar"
                          ></img>
                        </li>
                        <li className="avatar avatar-xs">
                          <img
                            className="avatar-img rounded-circle"
                            src="assets/images/avatar/04.jpg"
                            alt="avatar"
                          ></img>
                        </li>
                        <li className="avatar avatar-xs">
                          <img
                            className="avatar-img rounded-circle"
                            src="assets/images/avatar/05.jpg"
                            alt="avatar"
                          ></img>
                        </li>
                        <li className="avatar avatar-xs">
                          <img
                            className="avatar-img rounded-circle"
                            src="assets/images/avatar/06.jpg"
                            alt="avatar"
                          ></img>
                        </li>
                        <li className="avatar avatar-xs">
                          <img
                            className="avatar-img rounded-circle"
                            src="assets/images/avatar/07.jpg"
                            alt="avatar"
                          ></img>
                        </li>
                        <li className="ms-3">
                          <small> +50 </small>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <label className="form-label">Upload attachment</label>
                      <div
                        className="dropzone dropzone-default card shadow-none"
                        data-dropzone='{"maxFiles":2}'
                      >
                        <div className="dz-message">
                          <i className="bi bi-file-earmark-text display-3"></i>
                          <p>
                            Drop presentation and document here or click to
                            upload.
                          </p>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger-soft me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="button" className="btn btn-success-soft">
                    Create now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Index;
