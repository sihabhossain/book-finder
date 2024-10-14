import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <div className="loader"></div>
        <p className="mt-4 text-lg text-gray-700">Loading...</p>
      </div>

      <style jsx>{`
        .loader {
          border: 8px solid rgba(229, 229, 229, 0.6);
          border-top: 8px solid #6366f1; /* Tailwind indigo-600 */
          border-radius: 50%;
          width: 64px; /* Adjust size */
          height: 64px; /* Adjust size */
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
