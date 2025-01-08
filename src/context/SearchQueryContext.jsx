import { createContext, useState } from "react";

// create the search query context
export const SearchQueryContext = createContext();

export const SearchQueryProvider = ({ children }) => {
  const [searchText, setSearchText] = useState("");
  const [pagecountIncDec, setPageCountIncDec] = useState({
    value: 1,
    action: "plus",
  });

  return (
    <SearchQueryContext.Provider
      value={{ searchText, setSearchText, pagecountIncDec, setPageCountIncDec }}
    >
      {children}
    </SearchQueryContext.Provider>
  );
};
