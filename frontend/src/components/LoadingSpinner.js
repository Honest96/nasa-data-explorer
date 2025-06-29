import React from "react";

function LoadingSpinner({
  message = "Loading...",
  size = "large",
  className = "load",
}) {
  return (
    <div className={`loading-spinner ${size} ${className}`}>
      <div className="spinner-circle"></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
}

export default LoadingSpinner;
