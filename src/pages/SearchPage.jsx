import React, { useContext, useEffect, useState } from "react";
import GoogleText from "../components/GoogleText";
import SearchComponent from "../components/SearchComponent";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { IoPersonSharp } from "react-icons/io5";
import { searchMenuList } from "../helper/ArrayHelper";
import { FcSearch } from "react-icons/fc";
import { FaBook, FaImage, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { RiFileTextLine } from "react-icons/ri";
import { SearchQueryContext } from "../context/SearchQueryContext";
import SearchResult from "../components/SearchResult";

const SearchPage = () => {
  const [activeMenu, setActiveMenu] = useState("all"); //active menu handle state
  const [hoverMenu, setHoverMenu] = useState("active"); //active menu handle state
  const { setSearchText, searchText } = useContext(SearchQueryContext);
  const [searchQuery, setSearchQuery] = useState(searchText); //state handle for search input change
  // function to get the icon based on the icon name
  const getIcon = (icon) => {
    switch (icon) {
      case "search":
        return <FaSearch />;
      case "image":
        return <FaImage />;
      case "news":
        return <RiFileTextLine />;
      case "book":
        return <FaBook />;
      case "map":
        return <FaMapMarkerAlt />;
      default:
        return <FcSearch />;
    }
  };

  useEffect(() => {
    if (!searchQuery && searchText) setSearchQuery(searchText);
  }, [searchText]);
  // function to handle the form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      setSearchText(searchQuery);
      sessionStorage.setItem("searchQuery", searchQuery);
    }
  };

  // active menu container method
  const getActiveMenuContainer = (text) => {
    switch (activeMenu) {
      case "all":
        return <SearchResult text={text} />;
      default:
        return <p>No Data Found!</p>;
    }
  };

  return (
    <div className="p-2 sm:p-5">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between">
        {/* google text component */}
        <div className="flex flex-col gap-5 sm:items-center relative justify-start sm:flex-row  flex-1">
          <GoogleText className="search-page-google-text" />
          {/* search input field component */}
          <form
            className="w-[112%] sm:w-[60%] absolute sm:relative top-[120%]"
            onSubmit={handleFormSubmit}
          >
            <SearchComponent
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </form>
        </div>

        {/* logo  */}
        <div className="flex gap-2 sm:gap-5 items-center flex-grow-0">
          <BsFillGrid3X3GapFill className="cursor-pointer text-2xl" />
          <IoPersonSharp className="cursor-pointer bg-gray-300 text-3xl p-1 rounded-full" />
        </div>
      </div>
      {/* Search result container */}
      <div className=" w-full mt-[75px] sm:mt-5 ">
        {/* menu list */}
        <div className="container mx-auto flex justify-center sm:justify-start gap-2 sm:gap-6  font-semibold text:[10px] sm:text-[20px]">
          {searchMenuList &&
            searchMenuList.length > 0 &&
            searchMenuList.map((menu, index) => {
              return (
                <div
                  onMouseLeave={() => setHoverMenu("active")}
                  // onMouseEnter={() => setHoverMenu(menu?.text)}
                  onMouseEnter={() => setHoverMenu(menu?.text)}
                  // onClick={() => {
                  //   setActiveMenu(menu?.text);
                  //   setHoverMenu("active");
                  // }}
                  key={index}
                  className={`relative flex gap-1 sm:gap-2 pb-1 pr-2  hover:text-googleBlue search-menu-hover-underline ${
                    (menu?.text === activeMenu && hoverMenu === "active") ||
                    menu?.text === hoverMenu
                      ? "text-googleBlue after:absolute after:w-full after:bg-googleBlue after:left-0 after:bottom-0 after:h-[3px]"
                      : "text-gray-500"
                  }`}
                >
                  <p className="text-[12px] sm:text-[22px] pt-2 sm:pt-1">
                    {getIcon(menu?.icon)}
                  </p>
                  <p className="text">{menu?.title}</p>
                </div>
              );
            })}
        </div>
        {/* border */}
        <hr className="h-0.5 bg-gray-500 mt-[-2px]" />
      </div>
      <div className="container mx-auto">
        {getActiveMenuContainer(searchText)}
      </div>
    </div>
  );
};

export default SearchPage;
