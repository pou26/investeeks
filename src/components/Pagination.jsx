
import React from 'react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-between mt-4">
      <button 
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={`px-3 py-1 text-sm rounded-md ${
          currentPage === 1 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        Previous
      </button>
      <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>
      <button 
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 text-sm rounded-md ${
          currentPage === totalPages 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;