import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { SearchQueryContext } from "../../context/SearchQueryContext";
import { tempData } from "../../helper/ArrayHelper";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";

const BooksTap = (props) => {
  const { text } = props;
  const { setPageCountIncDec } = useContext(SearchQueryContext);
  const [isNoData, setIsNotData] = useState(false);
  const [page, setPage] = useState(1); // Tracks the current page
  const [searchResultData, setSearchResultData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0); // total pages count handle state

  // search text change effect
  useEffect(() => {
    // call the search result api method
    if (text) {
      setPage(1);
      if (setPageCountIncDec)
        setPageCountIncDec({
          value: 1,
          action: "plus",
        });
    }
  }, [text]);
  // function to handle the search text based get the Google API response
  const fetchSearchResult = async () => {
    setIsLoading(true);
    const API_KEY = import.meta.env.VITE_API_KEY;
    const CX = import.meta.env.VITE_SEARCH_ID;
    const startIndex = page;

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          text
        )}&startIndex=${startIndex}&maxResults=${12}`
      );

      const data = await response.json();

      setSearchResultData(data);
    } catch (error) {
      setIsNotData(true);
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (searchResultData?.totalItems > 0) {
      setTotalPages(Math.ceil(parseInt(searchResultData?.totalItems) / 12));
    }
  }, [searchResultData]);

  useEffect(() => {
    if (page > 0 && text) fetchSearchResult();
  }, [page, text]);
  return (
    <div className="w-full pt-3 pb-3">
      {" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {!isLoading
          ? searchResultData &&
            searchResultData?.items &&
            searchResultData?.items?.length > 0 &&
            searchResultData?.items?.map((item, index) => {
              const { id, volumeInfo } = item;
              const {
                title,
                subtitle,
                authors,
                publisher,
                publishedDate,
                description,
                imageLinks,
                infoLink,
              } = volumeInfo;
              return (
                <div
                  key={id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
                >
                  <a href={infoLink} target="_blank" rel="noopener noreferrer">
                    {imageLinks?.thumbnail ? (
                      <img
                        src={imageLinks?.thumbnail || ""}
                        alt={title}
                        className="w-full h-64 object-cover"
                      />
                    ) : (
                      <CiImageOn className="w-full h-64" />
                    )}
                  </a>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {title}
                    </h2>
                    {subtitle && (
                      <h3 className="text-sm text-gray-500">{subtitle}</h3>
                    )}
                    <p className="text-sm text-gray-600">
                      {authors ? authors.join(", ") : "Unknown Author"}
                    </p>
                    {publisher && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Publisher:</span>{" "}
                        {publisher}
                      </p>
                    )}
                    {publishedDate && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Published:</span>{" "}
                        {publishedDate}
                      </p>
                    )}
                    {description && (
                      <p className="text-sm text-gray-700 mt-2">
                        {description.length > 100
                          ? `${description.substring(0, 100)}...`
                          : description}
                      </p>
                    )}
                    <a
                      href={infoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-blue-500 hover:underline text-sm"
                    >
                      View More Details
                    </a>
                  </div>
                </div>
              );
            })
          : Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 p-4 w-full animate-pulse"
              >
                {/* Image Placeholder */}
                <div className="w-full h-64 bg-gray-300 rounded-lg"></div>

                {/* Content Placeholder */}
                <div className="p-4">
                  {/* Title */}
                  <div className="bg-gray-300 w-3/4 h-6 rounded-full mb-2"></div>

                  {/* Subtitle */}
                  <div className="bg-gray-300 w-1/2 h-4 rounded-full mb-2"></div>

                  {/* Author */}
                  <div className="bg-gray-300 w-2/3 h-4 rounded-full mb-2"></div>

                  {/* Publisher */}
                  <div className="bg-gray-300 w-1/2 h-4 rounded-full mb-2"></div>

                  {/* Published Date */}
                  <div className="bg-gray-300 w-1/3 h-4 rounded-full mb-2"></div>

                  {/* Description */}
                  <div className="bg-gray-300 w-full h-4 rounded-full mb-2"></div>

                  {/* View More Link */}
                  <div className="bg-gray-300 w-1/3 h-4 rounded-full mt-4"></div>
                </div>
              </div>
            ))}
      </div>
      {!isLoading && !isNoData && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          setCurrentPage={setPage}
          fullWith={true}
        />
      )}
    </div>
  );
};

export default BooksTap;
