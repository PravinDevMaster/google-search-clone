import React from "react";

const Pagination = (props) => {
  const { totalPages = 0, isLoading = false } = props;
  return (
    <div className="w-full lg:w-4/6 mt-5 flex justify-center pt-3 pb-3">
      <h1 className="text-3xl">
        <span className="text-googleBlue">G</span>
        <span className="text-googleRed">o</span>
        <span className="text-googleYellow">o</span>
        <span className="text-googleBlue">g</span>
        <span className="text-googleGreen">l</span>
        <span className="text-googleRed inline-block transform -rotate-12">
          e
        </span>
      </h1>
    </div>
  );
};

export default Pagination;
