import React from "react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (newPage: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`${
            currentPage === 1 ? "cursor-not-allowed text-gray-400" : ""
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`${
            currentPage === totalPages ? "cursor-not-allowed text-gray-400" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Pagination
