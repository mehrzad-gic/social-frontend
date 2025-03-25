import { createContext, useCallback, useMemo, useState } from "react";

const SavesContext = createContext();

export const SavesProvider = ({ children }) => {
  
  const [postSaves, setPostSaves] = useState([]);

  const memoizedSetPostSaves = useCallback((value) => setPostSaves(value), []);

  const savesContextValue = useMemo(() => ({
    postSaves,
    setPostSaves: memoizedSetPostSaves,
  }), [postSaves, memoizedSetPostSaves]);

  return (
    <SavesContext.Provider value={savesContextValue}>
      {children}
    </SavesContext.Provider>
  );

};

export default SavesContext;