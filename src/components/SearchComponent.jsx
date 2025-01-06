import React from "react";
import { FcSearch } from "react-icons/fc";
import { MdKeyboardVoice } from "react-icons/md";

const SearchComponent = (props) => {
  const { searchQuery = " ", setSearchQuery } = props;
  return (
    <div className="relative w-full ">
      <input
        className="w-full p-3 pl-12 pr-10 text-lg border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
        value={searchQuery}
      />
      {/* search icon */}
      <FcSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400  text-2xl cursor-text " />
      <MdKeyboardVoice className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400  text-2xl cursor-text " />
    </div>
  );
};

export default SearchComponent;
