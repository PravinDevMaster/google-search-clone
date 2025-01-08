import React, { useContext, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { SearchQueryContext } from "../context/SearchQueryContext";
const generateNumbers = (start, total, length) => {
  const numbers = [];
  for (let i = start; i < start + length && i <= total; i++) {
    numbers.push(i);
  }
  return numbers;
};
const generateEndNumbers = (end, length) => {
  const numbers = [];
  for (let i = Math.max(1, end - length + 1); i <= end; i++) {
    numbers.push(i);
  }
  return numbers;
};
const Pagination = (props) => {
  const {
    totalPages = 0,
    isLoading = false,
    setCurrentPage,
    currentPage,
  } = props;

  const { pagecountIncDec, setPageCountIncDec } =
    useContext(SearchQueryContext);
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    if (pagecountIncDec && totalPages) {
      if (pagecountIncDec?.action === "plus")
        setNumbers(generateNumbers(pagecountIncDec?.value, totalPages, 10));
      else setNumbers(generateEndNumbers(pagecountIncDec?.value, 10));
    }
  }, [pagecountIncDec, totalPages]);

  // function to handle the page onclick
  const handlePageClick = (selectedPage, index) => {
    setCurrentPage(selectedPage);
  };

  // function to forward the page
  const handleForward = () => {
    let isLastIndex = currentPage === numbers[numbers?.length - 1];
    let lastIndexPage = numbers[numbers?.length - 1];
    if (!isLastIndex) {
      setCurrentPage(currentPage + 1);
    } else {
      // const newNumber = generateNumbers(lastIndexPage + 1, totalPages, 10);
      // setNumbers(newNumber);
      setPageCountIncDec({ value: lastIndexPage + 1, action: "plus" });
      setCurrentPage(lastIndexPage + 1);
    }
  };

  // function to handle the backward page
  const handleBackward = () => {
    let startIndexPage = numbers[0];
    if (startIndexPage === currentPage) {
      // let newNumber = generateEndNumbers(startIndexPage - 1, 10);
      setPageCountIncDec({ value: startIndexPage - 1, action: "minus" });
      // setNumbers(newNumber);
    }
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="w-full lg:w-4/6 mt-5 flex justify-center pt-3 ">
      <div className="flex flex-col">
        <h1 className="text-3xl">
          <span className="text-googleBlue">G</span>
          {/* <span className="text-googleRed">o</span> */}
          {numbers &&
            numbers.length > 0 &&
            numbers.map((item, index) => {
              return (
                <span
                  key={index}
                  className={`${
                    currentPage === item
                      ? "text-googleRed"
                      : "text-googleYellow"
                  }`}
                >
                  o
                </span>
              );
            })}
          <span className="text-googleBlue">g</span>
          <span className="text-googleGreen">l</span>
          <span className="text-googleRed inline-block transform -rotate-12">
            e
          </span>
        </h1>
        <div className="flex items-center gap-[8.5px]">
          {numbers && numbers.length > 0 && currentPage !== 1 && (
            <FaChevronLeft
              onClick={() => handleBackward()}
              className="hover:text-googleBlue cursor-pointer"
            />
          )}
          {numbers &&
            numbers.length > 0 &&
            numbers.map((item, index) => {
              return (
                <p
                  onClick={() => handlePageClick(item, index + 1)}
                  className={`${
                    item === currentPage && "text-googleBlue"
                  } cursor-pointer hover:text-googleBlue`}
                  key={index}
                >
                  {item}
                </p>
              );
            })}
          {numbers && numbers.length > 0 && currentPage !== totalPages && (
            <FaChevronRight
              className="hover:text-googleBlue cursor-pointer"
              onClick={handleForward}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
