import { createContext, useState } from "react";

// create the search query context
export const SearchQueryContext = createContext();

export const SearchQueryProvider = ({ children }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <SearchQueryContext.Provider value={{ searchText, setSearchText }}>
      {children}
    </SearchQueryContext.Provider>
  );
};
