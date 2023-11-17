import React, { CSSProperties } from "react";

export interface IBackground {
  background?: string;
}

const LoadingSpinner: React.FC<IBackground> = ({ background = 'bg-white dark:bg-gray-900' }) => {
  const containerStyles: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  };

  const spinnerStyles: CSSProperties = {
    width: "50px",
    height: "50px",
    border: "6px solid transparent",
    borderTop: "6px solid #0E7490",
    borderRadius: "50%",
    animation: "spin 2s linear infinite",
  };

  return (
    <div style={containerStyles} className={background}>
      <div style={spinnerStyles}></div>
    </div>
  );
};

export default LoadingSpinner;
