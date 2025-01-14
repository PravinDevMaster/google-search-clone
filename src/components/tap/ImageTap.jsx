import React, { useContext, useEffect, useState } from "react";
import { SearchQueryContext } from "../../context/SearchQueryContext";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";

const ImageTab = (props) => {
  const { text } = props;
  const { setPageCountIncDec } = useContext(SearchQueryContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isNoData, setIsNoData] = useState(false);
  const [page, setPage] = useState(1);
  const [searchResultData, setSearchResultData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  // Trigger search on text change
  useEffect(() => {
    if (text) {
      setPage(1);
      if (setPageCountIncDec)
        setPageCountIncDec({
          value: 1,
          action: "plus",
        });
    }
  }, [text]);

  // Fetch image search results
  const fetchSearchResult = async () => {
    setIsLoading(true);
    setIsNoData(false);

    const API_KEY = import.meta.env.VITE_API_KEY;
    const CX = import.meta.env.VITE_SEARCH_ID;

    const startIndex = Math.max((page - 1) * 10, 0);
    const maxResults = 12;

    if (!text || !API_KEY) {
      console.error("Search text or API key is missing.");
      setIsLoading(false);
      return;
    }

    const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${text}&searchType=image&start=${startIndex}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        setIsNoData(true);
        return;
      }

      const data = await response.json();

      if (data.searchInformation?.totalResults === 0) {
        setIsNoData(true);
      } else {
        setSearchResultData(data);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setIsNoData(true);
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

  // Fetch data when page or text changes
  useEffect(() => {
    if (text) fetchSearchResult();
  }, [page, text]);

  return (
    <div className="w-full pt-3 pb-3">
      <div className="flex flex-wrap gap-4">
        {!isLoading
          ? searchResultData &&
            searchResultData?.items?.length > 0 &&
            searchResultData?.items.map((item, index) => {
              return (
                <Link
                  to={item?.image?.contextLink}
                  key={index}
                  className={`bg-white shadow-lg flex-grow rounded-lg overflow-hidden border border-gray-200 w-[${item?.image?.thumbnailWidth}px]`}
                >
                  <img
                    className={`w-full h-[250px] object-fill`}
                    src={item?.image?.thumbnailLink}
                    alt=""
                    srcset=""
                  />
                  <p
                    className="pt-2 pb-2 pl-1 pr-1"
                    dangerouslySetInnerHTML={{
                      __html: item?.htmlTitle
                        ? item.htmlTitle
                        : item?.title || "",
                    }}
                  ></p>
                  {/* <a href={link} target="_blank" rel="noopener noreferrer">
                    {image?.thumbnailLink ? (
                      <img
                        src={image.thumbnailLink}
                        alt={title}
                        className="w-full h-64 object-cover"
                      />
                    ) : (
                      <MdOutlineImageNotSupported className="w-full h-64 text-gray-400" />
                    )}
                  </a>
                  <div className="p-4">
                    <h2 className="text-sm font-semibold text-gray-800">
                      {title.length > 50
                        ? `${title.substring(0, 50)}...`
                        : title}
                    </h2>
                  </div> */}
                </Link>
              );
            })
          : Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="min-w-96 flex-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 p-4 animate-pulse"
              >
                <div className="w-full h-64 bg-gray-300 rounded-lg"></div>
                <div className="p-4">
                  <div className="bg-gray-300 w-3/4 h-6 rounded-full mb-2"></div>
                  <div className="bg-gray-300 w-1/2 h-4 rounded-full"></div>
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

export default ImageTab;
