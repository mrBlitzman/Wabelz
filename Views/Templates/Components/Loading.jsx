import React from "react";
import { RiseLoader } from "react-spinners";

function Loading() {
  return (
    <div className="loading-container">
      <RiseLoader color="#8c8cec" size={15} />
    </div>
  );
}

export default Loading;
