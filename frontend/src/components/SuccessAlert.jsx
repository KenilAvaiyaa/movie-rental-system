import React from "react";

function SuccessAlert({ message, onClose }) {
  return (
    <div
      role="alert"
      className="mb-4 relative flex w-full p-3 text-sm text-white bg-green-600 rounded-md"
    >
      {message}
      <button
        onClick={onClose}
        className="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 absolute top-1.5 right-1.5"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-5 w-5"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

export default SuccessAlert;
