import { createContext } from "react";

const AppContext = createContext({
    loading : false,
    setLoading : () => {},
    postLikes : null,
    setPostLikes : () => {},
    commentLikes : null,
    setCommentLikes : () => {},
    postSaves : null,
    setPostSaves : () => {},
    error:null,
    setError : () => {}
});

export default AppContext;