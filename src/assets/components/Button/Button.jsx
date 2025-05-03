import React from "react";


const Button = ({ children, onClick, type = "Button", className = "" }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
