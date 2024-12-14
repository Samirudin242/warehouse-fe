"use client";
import React, { useState } from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const pageNumbers = generatePageNumbers(totalPages, currentPage);

  return (
    <div className="flex items-center justify-center gap-2 mt-4 text-sm">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 border rounded ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "hover:bg-gray-100"
        }`}
      >
        ← Previous
      </button>

      {pageNumbers.map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-3 py-2">
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => onPageChange(Number(page))}
            className={`px-3 py-2 border rounded ${
              currentPage === page
                ? "bg-gray-200 font-bold"
                : "hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 border rounded ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "hover:bg-gray-100"
        }`}
      >
        Next →
      </button>
    </div>
  );
};

function generatePageNumbers(totalPages: number, currentPage: number) {
  const pages: (number | string)[] = [];
  const delta = 2;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return pages;
}

export default Pagination;
