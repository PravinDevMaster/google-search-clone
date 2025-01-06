import React, { useContext, useEffect } from "react";
import { SearchQueryContext } from "../context/SearchQueryContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const { setSearchText } = useContext(SearchQueryContext); //get the search text from the search context
  const location = useLocation();
  const searchQuery = sessionStorage.getItem("searchQuery");
  useEffect(() => {
    if (searchQuery) {
      setSearchText(searchQuery);
    }
  }, [searchQuery]);
  if (!searchQuery && location.pathname === "/search") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
