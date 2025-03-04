import { createContext, useCallback, useMemo, useState } from "react";

const LikesContext = createContext();

export const LikesProvider = ({ children }) => {

  const [postLikes, setPostLikes] = useState([]);
  const [commentLikes, setCommentLikes] = useState([]);

  const memoizedSetPostLikes = useCallback((value) => setPostLikes(value), []);
  const memoizedSetCommentLikes = useCallback((value) => setCommentLikes(value), []);

  const likesContextValue = useMemo(() => ({
    postLikes,
    setPostLikes: memoizedSetPostLikes,
    commentLikes,
    setCommentLikes: memoizedSetCommentLikes,
  }), [postLikes, commentLikes, memoizedSetPostLikes, memoizedSetCommentLikes]);

  return (
    <LikesContext.Provider value={likesContextValue}>
      {children}
    </LikesContext.Provider>
  );
  
};

export default LikesContext;