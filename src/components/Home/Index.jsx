import { Link } from "react-router-dom";
import Sidebar from "./Ui/Sidebar";
import { useRef, useContext } from "react";
import { all, likePost } from "../../Controllers/PostController";
import ShareFeed from "./Ui/ShareFeed";
import LikesContext from "../../Context/LikesContext";
import SavesContext from "../../Context/SavesContext";
import Loading from "./Ui/Loading";
import { toast } from "react-toastify";
import Post from "./Post/Post";
import { setLocalStorage } from "../../Helpers/Helpers";
import { useQueryClient, useMutation, useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { server_auth_errors } from "../../Helpers/Messages";


// Index Component
const Index = () => {

  const showMoreButton = useRef(null);
  const { setPostLikes } = useContext(LikesContext);
  const { setPostSaves } = useContext(SavesContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch posts query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam = 1 }) => {
      
      const token = JSON.parse(localStorage.getItem("user"))?.jwt;
      console.log(token);
      const res = await all(token, pageParam);
      
      console.log(res);

      if (res.success) {
        setPostLikes(res.likedPosts);
        setPostSaves(res.savedPosts);
        
        if(res.token && res.token !== token) {
          setLocalStorage("user", res.token, 21, res.user);
        }
        
        return res;
      } else {

        if(server_auth_errors.includes(res.message)) {
          localStorage.removeItem("user");
          toast.error(res.message);
          navigate("/login");
        } 
         
        throw new Error(res.error || "Failed to fetch posts");
    
      }
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.posts.length > 0 ? pages.length + 1 : undefined;
    },
    onError: (error) => {
      toast.error("An error occurred while fetching posts.");
      console.error(error);
    },
    retry: 1, // Only retry once 
  });

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

  const loadMore = () => {
    fetchNextPage();
  };

  const like = (id) => {
    likeMutation.mutate(id);
  };

  const allPosts = data?.pages.flatMap(page => page.posts) ?? [];

  if (isError) {
    return <div>Error loading posts</div>;
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <main className="mt-4 mb-4">
            <div className="container">
              <div className="row g-4">
                <Sidebar />
                <div className="col-md-8 col-lg-6 vstack gap-4">
                  <ShareFeed />
                  {allPosts.length > 0 ? (
                    allPosts.map((value, index) => (
                      <Post key={index} value={value} like={like} />
                    ))
                  ) : (
                    <div>No posts available</div>
                  )}
                  {hasNextPage && (
                    <span
                      ref={showMoreButton}
                      className="btn btn-loader btn-primary-soft"
                      onClick={loadMore}
                    >
                      {isFetchingNextPage ? (
                        <div className="load-icon">
                          <div className="spinner-grow spinner-grow-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      ) : (
                        <span className="load-text">Load more</span>
                      )}
                    </span>
                  )}
                </div>
                <div className="col-lg-3">
                  <div className="row g-4">
                    <div className="col-sm-6 col-lg-12">
                      <div className="card">
                        <div className="card-header pb-0 border-0">
                          <h5 className="card-title mb-0">Who to follow</h5>
                        </div>
                        <div className="card-body">
                          <div className="hstack gap-2 mb-3">
                            <div className="avatar">
                              <Link to="#!">
                                <img
                                  className="avatar-img rounded-circle"
                                  src="assets/images/avatar/04.jpg"
                                  alt=""
                                ></img>
                              </Link>
                            </div>
                            <div className="overflow-hidden">
                              <Link className="h6 mb-0" to="#!">
                                Judy Nguyen
                              </Link>
                              <p className="mb-0 small text-truncate">News anchor</p>
                            </div>
                            <Link
                              className="btn btn-primary-soft rounded-circle icon-md ms-auto"
                              to="#"
                            >
                              <i className="fa-solid fa-plus"> </i>
                            </Link>
                          </div>
                          <div className="hstack gap-2 mb-3">
                            <div className="avatar avatar-story">
                              <Link to="#!">
                                <img
                                  className="avatar-img rounded-circle"
                                  src="assets/images/avatar/05.jpg"
                                  alt=""
                                ></img>
                              </Link>
                            </div>
                            <div className="overflow-hidden">
                              <Link className="h6 mb-0" to="#!">
                                Amanda Reed
                              </Link>
                              <p className="mb-0 small text-truncate">Web Developer</p>
                            </div>
                            <Link
                              className="btn btn-primary-soft rounded-circle icon-md ms-auto"
                              to="#"
                            >
                              <i className="fa-solid fa-plus"> </i>
                            </Link>
                          </div>
                          <div className="hstack gap-2 mb-3">
                            <div className="avatar">
                              <Link to="#">
                                <img
                                  className="avatar-img rounded-circle"
                                  src="assets/images/avatar/11.jpg"
                                  alt=""
                                ></img>
                              </Link>
                            </div>
                            <div className="overflow-hidden">
                              <Link className="h6 mb-0" to="#!">
                                Billy Vasquez
                              </Link>
                              <p className="mb-0 small text-truncate">News anchor</p>
                            </div>
                            <Link
                              className="btn btn-primary rounded-circle icon-md ms-auto"
                              to="#"
                            >
                              <i className="bi bi-person-check-fill"> </i>
                            </Link>
                          </div>
                          <div className="hstack gap-2 mb-3">
                            <div className="avatar">
                              <Link to="#">
                                <img
                                  className="avatar-img rounded-circle"
                                  src="assets/images/avatar/01.jpg"
                                  alt=""
                                ></img>
                              </Link>
                            </div>
                            <div className="overflow-hidden">
                              <Link className="h6 mb-0" to="#!">
                                Lori Ferguson
                              </Link>
                              <p className="mb-0 small text-truncate">
                                Web Developer at Webestica
                              </p>
                            </div>
                            <Link
                              className="btn btn-primary-soft rounded-circle icon-md ms-auto"
                              to="#"
                            >
                              <i className="fa-solid fa-plus"> </i>
                            </Link>
                          </div>
                          <div className="hstack gap-2 mb-3">
                            <div className="avatar">
                              <Link to="#">
                                <img
                                  className="avatar-img rounded-circle"
                                  src="assets/images/avatar/placeholder.jpg"
                                  alt=""
                                ></img>
                              </Link>
                            </div>
                            <div className="overflow-hidden">
                              <Link className="h6 mb-0" to="#!">
                                Carolyn Ortiz
                              </Link>
                              <p className="mb-0 small text-truncate">News anchor</p>
                            </div>
                            <Link
                              className="btn btn-primary-soft rounded-circle icon-md ms-auto"
                              to="#"
                            >
                              <i className="fa-solid fa-plus"> </i>
                            </Link>
                          </div>
                          <div className="d-grid mt-3">
                            <Link className="btn btn-sm btn-primary-soft" to="#!">
                              View more
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6 col-lg-12">
                      <div className="card">
                        <div className="card-header pb-0 border-0">
                          <h5 className="card-title mb-0">Today's news</h5>
                        </div>
                        <div className="card-body">
                          <div className="mb-3">
                            <h6 className="mb-0">
                              <Link to="blog-details.html">
                                Ten questions you should answer truthfully
                              </Link>
                            </h6>
                            <small>2hr</small>
                          </div>
                          <div className="mb-3">
                            <h6 className="mb-0">
                              <Link to="blog-details.html">
                                Five unbelievable facts about money
                              </Link>
                            </h6>
                            <small>3hr</small>
                          </div>
                          <div className="mb-3">
                            <h6 className="mb-0">
                              <Link to="blog-details.html">
                                Best Pinterest Boards for learning about business
                              </Link>
                            </h6>
                            <small>4hr</small>
                          </div>
                          <div className="mb-3">
                            <h6 className="mb-0">
                              <Link to="blog-details.html">
                                Skills that you can learn from business
                              </Link>
                            </h6>
                            <small>6hr</small>
                          </div>
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default Index;