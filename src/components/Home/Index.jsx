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
import RightSidebar from "./Ui/RightSidebar";

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
      const res = await all(token, pageParam);
      
      console.log(res);

      if (res.success) {
        
        setPostLikes(res.likedPosts);
        
        setPostSaves(res.savedPosts);
        
        if(res.token && res.token !== token) setLocalStorage("user", res.token, 21, res.user);
        console.log(res);
        

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

  const loadMore = () => {
    fetchNextPage();
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
                      <Post key={index} value={value} />
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
                <RightSidebar />
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
  
};

export default Index;