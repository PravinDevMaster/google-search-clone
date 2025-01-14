import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { SearchQueryContext } from "../../context/SearchQueryContext";

const WebTap = (props) => {
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
    const startIndex = page <= 1 ? page : page * 10;

    try {
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${text}&start=${startIndex}`
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
    if (searchResultData?.searchInformation?.totalResults) {
      setTotalPages(
        Math.ceil(
          parseInt(searchResultData?.searchInformation?.totalResults) / 10
        )
      );
    }
  }, [searchResultData]);

  useEffect(() => {
    if (page > 0 && text) fetchSearchResult();
  }, [page, text]);
  return (
    <div className="w-full pt-3 pb-3">
      {" "}
      <div className="flex flex-col gap-5 w-full lg:w-4/6">
        {!isLoading
          ? searchResultData &&
            searchResultData?.items &&
            searchResultData?.items?.length > 0 &&
            searchResultData?.items?.map((item, index) => {
              return (
                <div key={index}>
                  <div>
                    <Link
                      to={item?.formattedUrl || ""}
                      className="flex gap-2 items-center w-fit"
                    >
                      {(item?.pagemap?.metatags?.[0]?.["og:image"] ||
                        item?.pagemap?.cse_thumbnail?.[0]?.src) && (
                        <img
                          className="w-[25px] h-[25px] object-fill rounded-full"
                          src={
                            item?.pagemap?.metatags?.[0]?.["og:image"]
                              ? item?.pagemap?.metatags?.[0]?.["og:image"]
                              : item?.pagemap?.cse_thumbnail?.[0]?.src
                          }
                          alt=""
                        />
                      )}
                      <p className="text-blue-700 text-sm underline">
                        {item?.displayLink || ""}
                      </p>{" "}
                    </Link>
                  </div>
                  <Link
                    to={item?.formattedUrl || ""}
                    dangerouslySetInnerHTML={{
                      __html: item?.htmlTitle
                        ? item.htmlTitle
                        : item?.title || "",
                    }}
                    className="text-[22px] text-blue-700 font-[500]"
                  ></Link>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: item?.htmlSnippet
                        ? item.htmlSnippet
                        : item?.snippet || "",
                    }}
                  ></p>
                </div>
              );
            })
          : Array.from({ length: 15 }).map((_, index) => (
              <div
                key={index}
                className="w-full animate-pulse flex flex-col gap-3"
              >
                {/* image container */}
                <div className="flex gap-2 items-center">
                  <p className="bg-gray-300 h-[25px] w-[25px] rounded-full" />
                  <p className="bg-gray-300 w-1/3 h-2 rounded-full" />
                </div>
                <div className="bg-gray-300 w-3/4 h-5 rounded-full"></div>
                <div className="bg-gray-300 w-full h-3 rounded-full"></div>
              </div>
            ))}{" "}
      </div>
      {!isLoading && !isNoData && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          setCurrentPage={setPage}
        />
      )}
    </div>
  );
};

export default WebTap;
