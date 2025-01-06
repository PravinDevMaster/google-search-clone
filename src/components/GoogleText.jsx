import React from "react";

const GoogleText = ({ className = "landing-page-google-text" }) => {
  return (
    <h1 className={className}>
      <span className="text-googleBlue">G</span>
      <span className="text-googleRed">o</span>
      <span className="text-googleYellow">o</span>
      <span className="text-googleBlue">g</span>
      <span className="text-googleGreen">l</span>
      <span className="text-googleRed inline-block transform -rotate-12">
        e
      </span>
    </h1>
  );
};

export default GoogleText;
