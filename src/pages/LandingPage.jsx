import React, { useContext, useEffect, useState } from "react";
import GoogleText from "../components/GoogleText";
import SearchComponent from "../components/SearchComponent";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { IoPersonSharp } from "react-icons/io5";
import { SearchQueryContext } from "../context/SearchQueryContext";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState(""); //state handle for search input change
  const { setSearchText, searchText } = useContext(SearchQueryContext);
  useEffect(() => {
    sessionStorage.setItem("searchQuery", "");
  }, []);
  const navigate = useNavigate();
  // function to handle the form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchText(searchQuery);
    sessionStorage.setItem("searchQuery", searchQuery);
    navigate("/search");
  };

  return (
    <div className="w-full h-screen flex justify-center items-start relative">
      <div className="w-full absolute top-0 left-0 flex justify-between p-4">
        <div className="flex gap-3 items-center">
          <p className="menu-hover-underline">About</p>
          <p className="menu-hover-underline">Store</p>
        </div>
        <div className="flex gap-3 items-center">
          <p className="menu-hover-underline">Gmail</p>
          <p className="menu-hover-underline">Images</p>
          <BsFillGrid3X3GapFill className="cursor-pointer text-2xl" />
          <IoPersonSharp className="cursor-pointer bg-gray-300 text-3xl p-1 rounded-full" />
        </div>
      </div>
      {/* logo and search component */}
      <form
        className=" mt-44 flex justify-center items-center flex-col gap-10"
        onSubmit={handleSearchSubmit}
      >
        <GoogleText />
        <div className="w-[120%] sm:w-[180%]">
          <SearchComponent
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <div className="flex gap-5">
          <p className="bg-gray-100 p-2 rounded-md cursor-pointer">
            Google Search
          </p>
          <p className="bg-gray-100 p-2 rounded-md cursor-pointer">
            I'm Feeling Lucky
          </p>
        </div>
      </form>
    </div>
  );
};

export default LandingPage;
