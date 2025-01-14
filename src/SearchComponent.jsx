import React, { useEffect, useState } from "react";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  //   function to handle the form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const API_KEY = import.meta.env.VITE_API_KEY;
    const CX = import.meta.env.VITE_SEARCH_ID;
    try {
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${searchQuery}`
      );
      const data = await response.json();
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
};

export default SearchComponent;
