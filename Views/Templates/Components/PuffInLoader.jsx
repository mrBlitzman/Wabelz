import React from "react";
import { PuffLoader } from "react-spinners";

const Loader = ({ isLoading }) => {
  return isLoading ? (
    <>
      <div className="custom-loader-overlay"></div>
      <div className="custom-loader-container">
        <div className="custom-loader-wrapper">
          <PuffLoader color="#8c8cec" loading={isLoading} size={50} />
        </div>
      </div>
    </>
  ) : null;
};

export default Loader;
